// Librería de Archivero: una sola página que monta las pantallas del diseño y cambia de sección
// sin recargar (evita el parpadeo que había en Claude Design).
import './fonts.js';
import './overrides.css';
import { mount, start, unmount, setTranslator } from '../dc/runtime.js';
import * as Main from '../screens/Main.js';
import * as Main1 from '../screens/Main1.js';
import * as Archivo from '../screens/Archivo.js';
import * as Anotador from '../screens/Anotador.js';
import * as Seleccion from '../screens/Seleccion.js';
import { prepareScreen } from './patches.js';
import { drain } from './ingest.js';
import { loadNotes, attachNotes, detachNotes, onNotesSaved } from './notes.js';
import { startCloud, attachCloud, schedule as cloudSync } from './cloud.js';
import * as settings from '../core/settings.js';
import { onChange } from '../core/db.js';
import { togglePanel } from '../core/panel.js';
import { translate, localizeTemplate, uiLang, trackMissing } from '../core/i18n.js';

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

// Idioma (Apariencia → Idioma): las plantillas se traducen una vez por idioma y los textos que
// arman las pantallas, al dibujar.
let lang = uiLang();
const localized = new Map();
function localScreen(screen) {
  const key = screen.name + ':' + lang;
  if (!localized.has(key)) localized.set(key, Object.assign({}, screen, { template: localizeTemplate(screen.template, lang) }));
  return localized.get(key);
}
setTranslator((s) => translate(s, lang));
document.documentElement.lang = lang;
trackMissing();

// La botonera, el buscador y el carrete aparecen con un fundido al entrar a la pantalla. Después se
// apaga: si un cambio de la pantalla los vuelve a crear (por ejemplo, al crear una nota en el
// Anotador) no tienen que animarse otra vez.
let uiTimer = null;
function uiEntrance() {
  host.dataset.ui = 'in';
  clearTimeout(uiTimer);
  uiTimer = setTimeout(() => { host.dataset.ui = 'done'; }, 1600);
}

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
  const inst = mount(host, localScreen(screen));
  uiEntrance();
  inst._leave = leave;
  const commit = inst.commit;
  inst.commit = function () {
    this._dirty = true;
    syncBoards(this);
    cloudSync();
    return commit.apply(this, arguments);
  };
  const commitNow = inst.commitNow;
  inst.commitNow = function () {
    syncBoards(this);
    cloudSync();
    return commitNow.apply(this, arguments);
  };
  if (init) init(inst);
  current = inst;
  attachCloud(inst);
  start(inst);
  if (after) after(inst);
  syncBoards(inst);
  syncUi();
  drain(inst);
}

// El aviso de la extensión necesita los nombres de los tableros.
function syncBoards(inst) {
  const names = inst.lib().boards.map((b) => b.name);
  if (JSON.stringify(names) !== JSON.stringify(settings.get().boards)) settings.save({ boards: names });
}

// …y la apariencia elegida (al cambiarla se copia en patches.js; esto cubre la que ya estaba elegida).
function syncUi() {
  let ui = null;
  try { ui = JSON.parse(localStorage.getItem('archivero.ui.v1') || 'null'); } catch { /* sin acceso */ }
  if (ui && JSON.stringify(ui) !== JSON.stringify(settings.get().ui)) settings.save({ ui });
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

// Cambio de idioma desde Apariencia: se vuelve a montar la pantalla y queda abierto Apariencia.
window.addEventListener('archivero:lang', () => {
  const next = uiLang();
  if (next === lang) return;
  lang = next;
  document.documentElement.lang = lang;
  show(routeFromHash());
  if (current && current.openR) {
    current.openR();
    current.setState({ rtab: 'apariencia' });
  }
});

// Piezas nuevas guardadas por la extensión mientras la librería está abierta.
onChange((m) => { if (m && m.store === 'inbox') drain(current); });
window.addEventListener('focus', () => drain(current));

// Cambios de proyecto activo o reglas hechos desde el popup.
settings.onChange(() => {
  if (!current) return;
  current.rules = null;
  current.forceUpdate();
});

onNotesSaved(() => cloudSync());

// Ícono de la extensión con la librería abierta: el panel flotante redondo, igual que en las páginas
// web (background.js no puede inyectarlo en una página de la extensión). Solo la pestaña tocada.
if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage && chrome.tabs?.getCurrent) {
  let myTabId = null;
  chrome.tabs.getCurrent().then((t) => { myTabId = t ? t.id : null; }, () => {});
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg?.type !== 'toggle-panel' || msg.tabId !== myTabId) return false;
    togglePanel(msg.src);
    sendResponse({ ok: true });
    return false;
  });
}

Promise.all([settings.load(), loadNotes()]).then(() => {
  show(routeFromHash());
  startCloud().catch((e) => console.warn('[Archivero] Nube no disponible', e));
});
