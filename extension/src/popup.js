import * as settings from './core/settings.js';
import './popup-fonts.js';

const $ = (id) => document.getElementById(id);
const board = $('board');
const status = $('status');
const UNSORTED = 'Sin clasificar';

async function render() {
  const s = await settings.load();
  const boards = s.boards.filter((b) => b !== UNSORTED);
  board.replaceChildren(new Option('Automático (según tus reglas)', ''));
  boards.forEach((b) => board.appendChild(new Option(b, b, false, b === s.dest)));
  board.appendChild(new Option(UNSORTED, UNSORTED, false, s.dest === UNSORTED));
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
  status.textContent = 'Guardando…';
  const res = await chrome.runtime.sendMessage({ type: 'save-current-page' });
  status.textContent = res?.ok ? 'Página guardada' : 'No se pudo guardar: ' + (res?.error || 'error');
  if (res?.ok) setTimeout(() => window.close(), 700);
});

$('open-library').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('library.html') });
  window.close();
});

render();
