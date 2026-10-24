// Ajustes de las pantallas del diseño para que funcionen como extensión real.
// Se aplican sobre las clases y plantillas generadas, así src/screens/*.js queda idéntico
// al diseño y se puede volver a importar sin perder nada.

import { openDB } from '../core/db.js';
import * as settings from '../core/settings.js';
import { applyRules, mergeTags } from '../core/rules.js';
import { embedOf } from '../core/embeds.js';
import { mosaicBox, packMosaic, clampPan } from './mosaic.js';

const UNSORTED = 'Sin clasificar';

// ---------- plantillas ----------

// Vista previa dentro de la tarjeta de un tablero (imagen o reproductor, sin interacción).
const CARD_PREVIEW = '<sc-if value="{{it.pvOn}}"><span style="flex:1;min-height:0;position:relative;overflow:hidden;background:#1f1f1f">'
  + '<sc-if value="{{it.pvImg}}"><img src="{{it.pvImg}}" alt="" loading="lazy" decoding="async" draggable="false" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></sc-if>'
  + '<sc-if value="{{it.pvFrame}}"><iframe src="{{it.pvFrame}}" title="Vista previa" loading="lazy" tabindex="-1" style="position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none"></iframe></sc-if>'
  + '<sc-if value="{{it.pvPlay}}"><span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:52px;height:52px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center"><svg width="22" height="22" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z" fill="#111"/></svg></span></sc-if>'
  + '</span></sc-if>';

// Reproductor de sitios sin portada (Spotify, X, TikTok, Vimeo) dentro de una pieza del mosaico.
const TILE_FRAME = '<sc-if value="{{t.pvFrame}}"><iframe src="{{t.pvFrame}}" title="Vista previa" loading="lazy" tabindex="-1" style="position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none;background:#1f1f1f"></iframe></sc-if>';

// Ficha completa: el reproductor real (se puede usar) o la imagen de la página.
const FICHA_PREVIEW = '<sc-if value="{{pe.pvOn}}"><div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">'
  + '<sc-if value="{{pe.pvFrame}}"><iframe src="{{pe.pvFrame}}" title="{{pe.title}}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write" allowfullscreen style="{{pe.pvStyle}};border:0;border-radius:10px;background:#000"></iframe></sc-if>'
  + '<sc-if value="{{pe.pvImg}}"><img src="{{pe.pvImg}}" alt="{{pe.title}}" style="flex:1;min-height:0;max-width:100%;object-fit:contain;border-radius:6px"></sc-if>'
  + '<a class="ob" href="{{pe.href}}" target="_blank" rel="noopener" style="display:inline-flex;text-decoration:none;flex:none">Abrir sitio</a>'
  + '</div></sc-if>';

// Pantalla completa (vista 1): reproductor en el lugar de la imagen.
const FULL_FRAME = '<sc-if value="{{p.pvFrame}}"><iframe src="{{p.pvFrame}}" title="{{p.name}}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write" allowfullscreen style="position:absolute;left:6%;top:260px;width:88%;height:calc(100% - 520px);border:0;border-radius:10px;background:#000"></iframe></sc-if>';

const TEMPLATE_PATCHES = {
  Archivo: [
    ['<sc-if value="{{it.isLink}}" hint-placeholder-val="{{false}}"><span style="display:flex;flex-direction:column;height:100%">', (m) => m + CARD_PREVIEW],
  ],
  Main: [['{{t.dom}}</span></sc-if>', (m) => m + TILE_FRAME]],
  Main1: [['\n      </div>\n      <div class="dark"', (m) => FULL_FRAME + m]],
  // La escala de la pantalla usaba {{fs}}, que en el Anotador pisa otro valor (estilos de texto).
  Anotador: [['scale({{fs}})', () => 'scale({{stageScale}})']],
};
const FICHA_ANCHOR = '<sc-if value="{{pe.isLink}}" hint-placeholder-val="{{false}}">';

function patchTemplate(name, template) {
  const list = (TEMPLATE_PATCHES[name] || []).slice();
  if (template.includes(FICHA_ANCHOR)) list.push([FICHA_ANCHOR, (m) => FICHA_PREVIEW + m]);
  for (const [find, make] of list) {
    if (!template.includes(find)) {
      console.warn('[Archivero] El diseño cambió: no encontré', find, 'en', name);
      continue;
    }
    template = template.split(find).join(make(find));
  }
  return template;
}

// ---------- vistas previas de enlaces ----------

// Estilo del reproductor en la ficha: los videos en 16:9, el resto (Spotify, X, TikTok) a todo el alto.
const frameStyle = (pv) => (pv.video ? 'width:100%;aspect-ratio:16/9;max-height:calc(100% - 50px);flex:none' : 'flex:1;width:100%;min-height:0');

function previewOf(inst, it) {
  if (!it || it.kind !== 'link') return null;
  const e = embedOf(it.url);
  const saved = it.pv ? inst.srcOf({ id: 'prev:' + it.id }) : '';
  if (e && e.thumb) return { img: e.thumb, frame: e.frame, cardFrame: '', play: true, video: true };
  if (e) return { img: '', frame: e.frame, cardFrame: e.frame, play: false, video: e.site === 'vimeo' };
  if (saved) return { img: saved, frame: '', cardFrame: '', play: false };
  return null;
}

// ---------- pantallas ----------

export function prepareScreen(screen) {
  patchClass(screen.name, screen.Component);
  return Object.assign({}, screen, { template: patchTemplate(screen.name, screen.template) });
}

function patchClass(name, Component) {
  const proto = Component.prototype;

  // Medios: la misma base IndexedDB que usa el service worker (versión 2, store 'media').
  proto.mediaDB = function (cb) {
    if (this._db) return cb(this._db);
    if (this._dbFail) return cb(null);
    openDB().then(
      (db) => { this._db = db; cb(db); },
      () => { this._dbFail = true; cb(null); }
    );
  };

  // Ficha completa con la vista previa real del enlace.
  if (proto.fichaVals) {
    const fichaVals = proto.fichaVals;
    proto.fichaVals = function (forceId, onClose) {
      const vals = fichaVals.call(this, forceId, onClose);
      const id = forceId || this.state.edId;
      const pv = id ? previewOf(this, this.lib().items.find((x) => x.id === id)) : null;
      if (pv && vals.pe) Object.assign(vals.pe, { pvOn: true, pvFrame: pv.frame, pvStyle: frameStyle(pv), pvImg: pv.frame ? '' : pv.img, isLink: false });
      return vals;
    };
  }

  if (name === 'Main') {
    proto.mchunk = function (its, VW, VH, G) {
      const key = its.map((i) => i.id + ':' + (i.ow || '') + 'x' + (i.oh || '')).join(',') + '|' + VW + 'x' + VH;
      if (this._mc && this._mc.key === key) return this._mc;
      const lay = packMosaic(its.map((it) => { const [w, h] = mosaicBox(this, it); return { it, w, h }; }), VW, VH, G);
      this._mc = { key, W: lay.W, H: lay.H, lay, cells: (ci, cj) => (ci === 0 && cj === 0 ? lay.cells : []) };
      return this._mc;
    };
  }

  const renderVals = proto.renderVals;
  proto.renderVals = function () {
    let mc = null;
    if (name === 'Main') {
      // Antes de armar la pantalla, el encuadre se limita al mosaico.
      const VW = window.innerWidth || 1440, VH = window.innerHeight || 900;
      const its = this.allItems();
      if (its.length) {
        mc = this.mchunk(its, VW, VH, 12);
        // La primera vez arranca arriba a la izquierda, con el margen del buscador.
        if (!this._panInit) { this._panInit = true; this.state.px = this.state.py = 1e6; }
        const [px, py] = clampPan(mc.W, mc.H, VW, VH, this.state.px, this.state.py);
        this.state.px = px;
        this.state.py = py;
      }
    }
    const vals = renderVals.call(this);

    // Buscador: sin la animación de escritura ni el brillo.
    if (vals.s) vals.s = { t: 'Buscar…', c: false };

    // Archivo arma su ficha acá y no en fichaVals().
    if (vals.edOn && vals.pe && !vals.pe.pvOn && this.state.edId) {
      const pv = previewOf(this, this.lib().items.find((x) => x.id === this.state.edId));
      if (pv) Object.assign(vals.pe, { pvOn: true, pvFrame: pv.frame, pvStyle: frameStyle(pv), pvImg: pv.frame ? '' : pv.img, isLink: false });
    }

    if (name === 'Main' && mc && vals.tiles) {
      vals.tiles.forEach((t, i) => {
        const c = mc.lay.cells[i];
        const pv = c && previewOf(this, c.it);
        if (!pv) return;
        if (pv.img) { t.bg = 'url("' + pv.img + '") center/cover no-repeat'; t.isLink = false; }
        else if (pv.cardFrame) { t.pvFrame = pv.cardFrame; t.isLink = false; }
      });
    }

    if (name === 'Archivo' && vals.cards && this.curBoard) {
      const b = this.curBoard();
      const its = b ? this.sortedItems(b) : [];
      vals.cards.forEach((c, i) => {
        const pv = previewOf(this, its[i]);
        if (!pv) return;
        Object.assign(c, { pvOn: true, pvImg: pv.img, pvFrame: pv.img ? '' : pv.cardFrame, pvPlay: pv.play, embPost: false, embDark: false });
      });
    }

    if (name === 'Main1' && vals.pieces) {
      const its = this.order();
      vals.pieces.forEach((p, i) => {
        const pv = previewOf(this, its[i]);
        if (!pv) return;
        if (pv.frame) p.pvFrame = pv.frame;
        else Object.assign(p, { src: pv.img, fgImg: true, blur: true, blurImg: true, fgStyle: 'position:absolute;left:6%;top:260px;width:88%;height:calc(100% - 520px);object-fit:contain', fitTag: '' });
      });
    }

    if (name === 'Anotador') {
      vals.stageScale = this.state.fs || 1;
      // La capa de la nota abierta se escondía solo con opacidad y desenfoque: quedaba "fantasma"
      // (borrosa) mientras cambiaba de estado. Ahora también se oculta del todo.
      if (vals.bookLyr) {
        const hidden = /opacity:0;/.test(vals.bookLyr);
        const instant = !this.notes || !this.notes.length;
        vals.bookLyr += hidden
          ? ';visibility:hidden;transition:' + (instant ? 'none' : 'opacity .7s cubic-bezier(.19,1,.22,1),transform .9s cubic-bezier(.19,1,.22,1),filter .7s cubic-bezier(.19,1,.22,1),visibility 0s .7s')
          : ';visibility:visible';
      }
    }
    return vals;
  };

  if (!proto.R) return;

  // Reglas, proyectos y preferencias: persistentes y compartidos con la extensión.
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

// Tablero por nombre (el que eligen las reglas, el popup o el aviso). Vacío → Sin clasificar.
// Si no existe se crea: desde la extensión se pueden crear tableros nuevos.
export function boardByName(inst, name) {
  const L = inst.lib();
  name = String(name || '').trim();
  if (!name || name === UNSORTED) return unsortedBoard(inst);
  let b = L.boards.find((x) => x.name === name);
  if (!b) {
    b = { id: inst.uid(), name, t: Date.now(), sort: 'recent', man: [] };
    L.boards.push(b);
  }
  return b;
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
