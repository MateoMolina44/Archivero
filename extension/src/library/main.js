// Librería de Archivero: una sola página que monta las pantallas del diseño y cambia de sección
// sin recargar (evita el parpadeo que había en Claude Design).
import './fonts.js';
import './overrides.css';
import { mount, start, unmount } from '../dc/runtime.js';
import * as Main from '../screens/Main.js';
import * as Main1 from '../screens/Main1.js';
import * as Archivo from '../screens/Archivo.js';
import * as Anotador from '../screens/Anotador.js';
import * as Seleccion from '../screens/Seleccion.js';
import { prepareScreen } from './patches.js';
import { drain } from './ingest.js';
import { loadNotes, attachNotes, detachNotes } from './notes.js';
import * as settings from '../core/settings.js';
import { onChange } from '../core/db.js';

const S = Object.fromEntries([Main, Main1, Archivo, Anotador, Seleccion].map((s) => [s.name, prepareScreen(s)]));

// Ruta → pantalla. Tablero y Ajustes son Archivo arrancando en otro estado, como en el diseño.
const ROUTES = {
  Main: { screen: S.Main },
  Main1: { screen: S.Main1 },
  Archivo: { screen: S.Archivo },
  Tablero: { screen: S.Archivo, init: (inst) => { inst.START = 'board'; } },
  Ajustes: { screen: S.Archivo, after: (inst) => inst.openR() },
  Anotador: { screen: S.Anotador, init: attachNotes, leave: detachNotes },
  Seleccion: { screen: S.Seleccion },
};

const host = document.getElementById('app');
let current = null;

function routeFromHash() {
  const r = location.hash.replace(/^#\/?/, '');
  return ROUTES[r] ? r : 'Main';
}

function show(route) {
  if (current) {
    // Si quedó un guardado pendiente (commit espera 300 ms), se escribe antes de desmontar.
    if (current._dirty && current._lib) {
      try { localStorage.setItem('archivero.lib.v1', JSON.stringify(current._lib)); } catch { /* sin espacio */ }
    }
    if (current._leave) current._leave(current);
    unmount(current);
  }
  const { screen, init, after, leave } = ROUTES[route];
  host.dataset.screen = screen.name;
  const inst = mount(host, screen);
  inst._leave = leave;
  const commit = inst.commit;
  inst.commit = function () {
    this._dirty = true;
    syncBoards(this);
    return commit.apply(this, arguments);
  };
  const commitNow = inst.commitNow;
  inst.commitNow = function () {
    syncBoards(this);
    return commitNow.apply(this, arguments);
  };
  if (init) init(inst);
  current = inst;
  start(inst);
  if (after) after(inst);
  syncBoards(inst);
  drain(inst);
}

// El aviso de la extensión necesita los nombres de los tableros.
function syncBoards(inst) {
  const names = inst.lib().boards.map((b) => b.name);
  if (JSON.stringify(names) !== JSON.stringify(settings.get().boards)) settings.save({ boards: names });
}

// Los enlaces del diseño apuntan a "Pantalla.dc.html": se resuelven acá, sin recargar.
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a[href$=".dc.html"]');
  if (!a) return;
  e.preventDefault();
  const route = a.getAttribute('href').replace(/\.dc\.html$/, '');
  if (!ROUTES[route]) return;
  if (location.hash === '#/' + route) show(route);
  else location.hash = '#/' + route;
});
window.addEventListener('hashchange', () => show(routeFromHash()));

// Piezas nuevas guardadas por la extensión mientras la librería está abierta.
onChange((m) => { if (m && m.store === 'inbox') drain(current); });
window.addEventListener('focus', () => drain(current));

// Cambios de proyecto activo o reglas hechos desde el popup.
settings.onChange(() => {
  if (!current) return;
  current.rules = null;
  current.forceUpdate();
});

Promise.all([settings.load(), loadNotes()]).then(() => show(routeFromHash()));
