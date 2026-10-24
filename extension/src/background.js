import { inboxAdd, mediaPut } from './core/db.js';
import * as settings from './core/settings.js';
import { applyRules } from './core/rules.js';
import { uid, siteTags } from './core/util.js';

const MENUS = [
  { id: 'save-image', title: 'Guardar imagen en Archivero', contexts: ['image'] },
  { id: 'save-video', title: 'Guardar video en Archivero', contexts: ['video'] },
  { id: 'save-link', title: 'Guardar enlace en Archivero', contexts: ['link'] },
  { id: 'save-selection', title: 'Guardar texto seleccionado en Archivero', contexts: ['selection'] },
  { id: 'save-page', title: 'Guardar esta página en Archivero', contexts: ['page'] },
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    for (const m of MENUS) chrome.contextMenus.create(m);
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  handleSave(info.menuItemId, info, tab).catch((e) => flashBadge('!', '#575757', e));
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'save-page') return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) handleSave('save-page', {}, tab).catch((e) => flashBadge('!', '#575757', e));
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  (async () => {
    if (msg?.type === 'save-current-page') {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) return sendResponse({ ok: false, error: 'No hay pestaña activa' });
      await handleSave('save-page', {}, tab);
      return sendResponse({ ok: true });
    }
    if (msg?.type === 'patch-item') {
      // Corrección desde el aviso: la librería la aplica al incorporar la bandeja.
      await inboxAdd({ op: 'patch', id: msg.id, patch: msg.patch });
      return sendResponse({ ok: true });
    }
    if (msg?.type === 'open-library') {
      await chrome.tabs.create({ url: chrome.runtime.getURL('library.html') });
      return sendResponse({ ok: true });
    }
    sendResponse({ ok: false });
  })().catch((e) => sendResponse({ ok: false, error: String(e) }));
  return true; // respuesta asíncrona
});

async function flashBadge(text, color, err) {
  if (err) console.error('[Archivero]', err);
  await chrome.action.setBadgeBackgroundColor({ color });
  await chrome.action.setBadgeText({ text });
  setTimeout(() => chrome.action.setBadgeText({ text: '' }), 2500);
}

// ---------- lectura de la página ----------
async function readPageMeta(tabId) {
  try {
    const [res] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const m = (n) => document.querySelector(`meta[property="${n}"],meta[name="${n}"]`)?.content || '';
        return { title: m('og:title') || document.title || '', description: m('og:description') || m('description') || '' };
      },
    });
    return res?.result || {};
  } catch {
    return {}; // chrome:// u otras páginas restringidas
  }
}

async function fetchMedia(url, prefix, maxMB) {
  if (!/^(https?:|data:)/.test(url || '')) return null;
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    const blob = await r.blob();
    if (!blob.type.startsWith(prefix) || blob.size > maxMB * 1024 * 1024) return null;
    return blob;
  } catch {
    return null;
  }
}

// ---------- armado de la pieza (formato del diseño) ----------
async function handleSave(kind, info, tab) {
  const page = info.pageUrl || tab?.url || '';
  const pageTitle = tab?.title || '';
  let item;
  let blob = null;

  if (kind === 'save-image') {
    blob = await fetchMedia(info.srcUrl, 'image/', 25);
    item = { kind: 'img', url: page, title: pageTitle };
  } else if (kind === 'save-video') {
    blob = await fetchMedia(info.srcUrl, 'video/', 60);
    item = blob ? { kind: 'video', url: page, title: pageTitle } : { kind: 'link', url: page, title: pageTitle };
  } else if (kind === 'save-link') {
    item = { kind: 'link', url: info.linkUrl, title: info.linkText || '' };
  } else if (kind === 'save-selection') {
    item = { kind: 'text', url: page, text: info.selectionText || '', title: '' };
  } else {
    const meta = tab?.id ? await readPageMeta(tab.id) : {};
    item = { kind: 'link', url: page, title: meta.title || pageTitle, note: meta.description || '' };
  }

  item = Object.assign({ id: uid(), t: Date.now(), page, note: '', tags: '', text: '' }, item);
  item.atags = siteTags(item.url || page);

  const s = await settings.load();
  let to = '';
  if (settings.pref(s, settings.PREF_APPLY_RULES)) {
    const r = applyRules(item, s.rules, { project: settings.activeProject(s) });
    to = r.to;
    item.tags = r.tags.join(', ');
  }
  item.to = to;

  if (blob) await mediaPut(item.id, blob);
  await inboxAdd({ op: 'add', item });
  await flashBadge('✓', '#575757');
  if (tab?.id && settings.pref(s, settings.PREF_SHOW_TOAST)) await showToast(tab.id, item, s);
}

// ---------- aviso en la página (Extension.dc.html) ----------
async function showToast(tabId, item, s) {
  const boards = s.boards.includes('Sin clasificar') ? s.boards : s.boards.concat('Sin clasificar');
  const payload = { id: item.id, board: item.to || 'Sin clasificar', tags: item.tags, boards };
  try {
    await chrome.scripting.executeScript({ target: { tabId }, func: injectToast, args: [payload] });
  } catch {
    /* página restringida: queda el ✓ del ícono */
  }
}

// Se ejecuta DENTRO de la página: debe ser autocontenida (sin imports ni variables de afuera).
function injectToast(p) {
  document.getElementById('archivero-toast-host')?.remove();
  const host = document.createElement('div');
  host.id = 'archivero-toast-host';
  host.style.cssText = 'all:initial;position:fixed;left:50%;bottom:34px;transform:translateX(-50%);z-index:2147483647;';
  const root = host.attachShadow({ mode: 'closed' });
  const css = `
    *{box-sizing:border-box}
    .t{font:13px/1.35 Inter,system-ui,sans-serif;background:#575757;color:#fff;border-radius:30px;width:440px;max-width:calc(100vw - 32px);
       padding:10px 12px 10px 20px;box-shadow:0 6px 20px rgba(0,0,0,.3);animation:in .45s cubic-bezier(.19,1,.22,1) both}
    .t.open{border-radius:18px;padding:14px 16px 16px 20px}
    .t.out{animation:out .3s cubic-bezier(.4,0,.2,1) both}
    @keyframes in{0%{opacity:0;transform:translateY(18px) scale(.98)}100%{opacity:1;transform:none}}
    @keyframes out{0%{opacity:1;transform:none}100%{opacity:0;transform:translateY(18px) scale(.98)}}
    .r{display:flex;align-items:center;gap:12px}
    .msg{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .ch{background:#d9d9d9;color:#111;border:0;border-radius:20px;padding:6px 14px;font:600 12px Inter,system-ui,sans-serif;cursor:pointer;transition:transform .15s,background-color .15s}
    .ch:hover{background:#fff;transform:scale(1.04)}
    .x{background:none;border:0;color:#fff;opacity:.7;font-size:16px;cursor:pointer;padding:0 4px;line-height:1}
    .x:hover{opacity:1}
    .ch:focus-visible,.x:focus-visible,select:focus-visible,input:focus-visible{outline:2px solid #fff;outline-offset:2px}
    .f{display:none;margin-top:12px;gap:8px;flex-direction:column}
    .open .f{display:flex}
    label{font-size:11px;font-weight:600;opacity:.85}
    select,input{width:100%;height:34px;border-radius:30px;border:1px solid rgba(255,255,255,.2);background:#464646;color:#fff;font:13px Inter,system-ui,sans-serif;padding:0 14px;outline:none}
    select option{color:#111}
  `;
  root.innerHTML = `<style>${css}</style>
    <div class="t" role="status">
      <div class="r"><span class="msg"></span><button class="ch">Cambiar</button><button class="x" aria-label="Cerrar">×</button></div>
      <div class="f">
        <label>Tablero</label><select aria-label="Tablero"></select>
        <label>Etiquetas (separadas por coma)</label><input type="text" aria-label="Etiquetas" />
      </div>
    </div>`;
  const box = root.querySelector('.t');
  const msg = root.querySelector('.msg');
  const select = root.querySelector('select');
  const input = root.querySelector('input');
  const state = { board: p.board, tags: p.tags };
  const render = () => {
    const tags = state.tags.split(',').map((t) => t.trim()).filter(Boolean).map((t) => '#' + t).join(' ');
    msg.innerHTML = '<b>Guardado</b> en ';
    msg.append(state.board + (tags ? ' · ' + tags : ''));
  };
  for (const b of p.boards) select.appendChild(new Option(b, b, false, b === p.board));
  input.value = p.tags;
  render();

  let timer;
  const close = () => { box.classList.add('out'); setTimeout(() => host.remove(), 300); };
  const arm = () => { clearTimeout(timer); timer = setTimeout(close, 7000); };
  const send = (patch) => chrome.runtime.sendMessage({ type: 'patch-item', id: p.id, patch });
  root.querySelector('.ch').addEventListener('click', () => { box.classList.toggle('open'); select.focus(); });
  root.querySelector('.x').addEventListener('click', close);
  select.addEventListener('change', () => { state.board = select.value; render(); send({ board: select.value }); });
  input.addEventListener('change', () => {
    state.tags = input.value.split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean).join(', ');
    render();
    send({ tags: state.tags });
  });
  host.addEventListener('mouseenter', () => clearTimeout(timer));
  host.addEventListener('mouseleave', arm);
  host.addEventListener('focusin', () => clearTimeout(timer));
  document.documentElement.appendChild(host);
  arm();
}
