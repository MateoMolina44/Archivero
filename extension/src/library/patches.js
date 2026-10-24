// Ajustes de las pantallas del diseño para que funcionen como extensión real.
// Se aplican sobre los prototipos de las clases generadas, así src/screens/*.js queda idéntico
// al diseño y se puede volver a importar sin perder nada.

import { openDB } from '../core/db.js';
import * as settings from '../core/settings.js';
import { applyRules, mergeTags } from '../core/rules.js';

const UNSORTED = 'Sin clasificar';

export function patchScreen(Component) {
  const proto = Component.prototype;

  // 1) Medios: la misma base IndexedDB que usa el service worker (versión 2, store 'media').
  proto.mediaDB = function (cb) {
    if (this._db) return cb(this._db);
    if (this._dbFail) return cb(null);
    openDB().then(
      (db) => { this._db = db; cb(db); },
      () => { this._dbFail = true; cb(null); }
    );
  };

  if (!proto.R) return;

  // 2) Reglas, proyectos y preferencias: persistentes y compartidos con la extensión.
  proto.R = function () {
    if (!this.rules) {
      const s = settings.get();
      this.rules = s.rules;
      this.rseq = s.rseq;
      this.rprojs = s.projs;
      this.rprefs = s.prefs;
      this.state = Object.assign({}, this.state, { rproj: s.proj });
      this._rsaved = snapshot(this);
    }
    return this.rules;
  };

  const rulesVals = proto.rulesVals;
  proto.rulesVals = function () {
    const vals = rulesVals.call(this);
    // Cualquier cambio hecho desde el panel (editar, mover, activar, proyecto activo…) se guarda.
    const snap = snapshot(this);
    if (snap !== this._rsaved) {
      this._rsaved = snap;
      settings.save({ rules: this.rules, rseq: this.rseq, projs: this.rprojs, prefs: this.rprefs, proj: this.state.rproj || 0 });
    }
    // "Volver a aplicar" de verdad, sobre lo que está en Sin clasificar.
    vals.reapply = () => this.setState({ rmsg: reapply(this) });
    // El diseño suma "Sin clasificar" como tablero virtual; acá ya existe como tablero real.
    if (vals.ed && vals.ed.tos) vals.ed.tos = vals.ed.tos.filter((t, i, a) => a.findIndex((x) => x.v === t.v) === i);
    if (vals.rBoards) vals.rBoards = vals.rBoards.filter((b, i, a) => a.findIndex((x) => x.name === b.name) === i);
    return vals;
  };
}

function snapshot(inst) {
  return JSON.stringify([inst.rules, inst.rseq, inst.rprojs, inst.rprefs, inst.state.rproj || 0]);
}

export function unsortedBoard(inst) {
  const L = inst.lib();
  let b = L.boards.find((x) => x.name === UNSORTED);
  if (!b) {
    b = { id: inst.uid(), name: UNSORTED, t: Date.now(), sort: 'recent', man: [] };
    L.boards.push(b);
  }
  return b;
}

// Tablero por nombre (el que eligen las reglas o el aviso). Vacío o inexistente → Sin clasificar.
export function boardByName(inst, name) {
  const L = inst.lib();
  return (name && L.boards.find((x) => x.name === name)) || unsortedBoard(inst);
}

function reapply(inst) {
  const L = inst.lib();
  const s = settings.get();
  const known = new Set(L.boards.filter((b) => b.name !== UNSORTED).map((b) => b.id));
  const target = L.items.filter((i) => !known.has(i.bid));
  if (!target.length) return 'No hay piezas en Sin clasificar.';
  let moved = 0;
  for (const it of target) {
    const r = applyRules(it, inst.rules, { project: settings.activeProject(s) });
    if (r.tags.length) it.tags = mergeTags(it.tags, r.tags);
    const b = r.to && r.to !== UNSORTED && L.boards.find((x) => x.name === r.to);
    if (b) { it.bid = b.id; moved++; }
  }
  inst.commit();
  return 'Listo: ' + moved + ' piezas clasificadas, ' + (target.length - moved) + ' siguen en Sin clasificar.';
}
