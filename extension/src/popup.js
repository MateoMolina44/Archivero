import * as settings from './core/settings.js';
// Las 5 tipografías de Apariencia, por si el usuario eligió otra que no sea Inter.
import './library/fonts.js';
import { translate, translateDom, uiLang } from './core/i18n.js';

const $ = (id) => document.getElementById(id);
const board = $('board');
const status = $('status');
const UNSORTED = 'Sin clasificar';

// Mismo idioma que la librería (Apariencia → Idioma).
const LANG = uiLang();
const t = (s) => translate(s, LANG);
document.documentElement.lang = LANG;
translateDom(document.body, LANG);

// Como panel flotante (popup.html?frame, ver togglePanel en background.js) el popup vive en un
// iframe dentro de la página: avisa su alto y pide cerrarse o guardar con mensajes a la página.
const FRAME = new URLSearchParams(location.search).has('frame');
const tell = (msg) => window.parent.postMessage(msg, '*');
const close = () => (FRAME ? tell({ archivero: 'close' }) : window.close());
// Lugar extra debajo del panel para la lista abierta del selector (ver watchPicker).
let room = 0;
const tellSize = () => tell({ archivero: 'size', h: document.body.getBoundingClientRect().height + room });
if (FRAME) {
  new ResizeObserver(tellSize).observe(document.body);
  addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// La lista del selector (select personalizable, popup.css) se dibuja dentro del popup y no puede
// salir de él: mientras está abierta, el panel flotante (iframe) o la ventana del popup se estiran
// hacia abajo para que entre entera. El fondo del iframe es transparente, así que no se ve el estirón.
const isOpen = () => { try { return board.matches(':open'); } catch { return false; } };
function pickerRoom() {
  const opts = [...board.options].reduce((h, o) => h + o.getBoundingClientRect().height, 0);
  const listH = Math.min(230, opts + 12);
  return Math.max(0, Math.ceil(board.getBoundingClientRect().bottom + 6 + listH + 12 - document.body.getBoundingClientRect().height));
}
function setRoom(px) {
  room = px;
  if (FRAME) tellSize();
  else document.documentElement.style.paddingBottom = px ? px + 'px' : '';
}
let watching = false;
function watchPicker() {
  if (watching) return;
  watching = true;
  const t0 = performance.now();
  const tick = () => {
    const open = isOpen();
    const want = open ? pickerRoom() : 0;
    if (want !== room) setRoom(want);
    // Sigue mirando mientras esté abierta (y un momento después del clic, hasta que se abra).
    if (open || performance.now() - t0 < 400) requestAnimationFrame(tick);
    else watching = false;
  };
  requestAnimationFrame(tick);
}
board.addEventListener('pointerdown', watchPicker);
board.addEventListener('keydown', watchPicker);

async function render() {
  const s = await settings.load();
  const boards = s.boards.filter((b) => b !== UNSORTED);
  board.replaceChildren(new Option(t('Automático (según tus reglas)'), ''));
  boards.forEach((b) => board.appendChild(new Option(b, b, false, b === s.dest)));
  board.appendChild(new Option(t(UNSORTED), UNSORTED, false, s.dest === UNSORTED));
  if (s.dest && !boards.includes(s.dest) && s.dest !== UNSORTED) board.appendChild(new Option(s.dest, s.dest, false, true));
  $('board-hint').hidden = boards.length > 0;
}

board.addEventListener('change', () => settings.save({ dest: board.value }));

// (window.prompt no funciona en popups de extensión, por eso inputs propios)
function inlineCreate(button, row, input, ok, create) {
  button.addEventListener('click', () => { row.hidden = !row.hidden; if (!row.hidden) input.focus(); });
  const go = async () => {
    const name = input.value.trim();
    if (!name) return;
    await create(name);
    input.value = '';
    row.hidden = true;
    await render();
  };
  ok.addEventListener('click', go);
  input.addEventListener('keydown', (e) => e.key === 'Enter' && go());
}

inlineCreate($('new-board'), $('board-row'), $('board-name'), $('board-ok'), async (name) => {
  await chrome.runtime.sendMessage({ type: 'create-board', name });
  await settings.load();
  await settings.save({ dest: name });
});

$('save-page').addEventListener('click', async () => {
  // La página guarda después de cerrar el panel; el aviso al guardar confirma.
  if (FRAME) return tell({ archivero: 'save' });
  status.textContent = t('Guardando…');
  const res = await chrome.runtime.sendMessage({ type: 'save-current-page' });
  status.textContent = res?.ok ? t('Página guardada') : t('No se pudo guardar:') + ' ' + (res?.error || 'error');
  if (res?.ok) setTimeout(close, 700);
});

$('open-library').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('library.html') });
  close();
});

render();
