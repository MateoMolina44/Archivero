import * as settings from './core/settings.js';
import './popup-fonts.js';

const $ = (id) => document.getElementById(id);
const select = $('project');
const status = $('status');

async function render() {
  const s = await settings.load();
  select.innerHTML = '';
  if (!s.projs.length) select.appendChild(new Option('Sin proyectos', ''));
  s.projs.forEach((p, i) => select.appendChild(new Option(p, String(i), false, i === s.proj)));
}

select.addEventListener('change', () => {
  if (select.value !== '') settings.save({ proj: Number(select.value) });
});

// (window.prompt no funciona en popups de extensión, por eso un input propio)
$('new-project').addEventListener('click', () => {
  $('new-row').hidden = false;
  $('new-name').focus();
});

async function createProject() {
  const name = $('new-name').value.trim();
  if (!name) return;
  const s = settings.get();
  const projs = s.projs.includes(name) ? s.projs : s.projs.concat(name);
  await settings.save({ projs, proj: projs.indexOf(name) });
  $('new-name').value = '';
  $('new-row').hidden = true;
  await render();
}
$('new-ok').addEventListener('click', createProject);
$('new-name').addEventListener('keydown', (e) => e.key === 'Enter' && createProject());

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
