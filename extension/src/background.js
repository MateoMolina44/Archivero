import { inboxAdd, mediaPut } from './core/db.js';
import * as settings from './core/settings.js';
import { applyRules } from './core/rules.js';
import { uid, siteTags } from './core/util.js';
import { embedOf } from './core/embeds.js';
import { previewMeta, fetchBlob } from './core/pagemeta.js';

const MENUS = [
  { id: 'save-image', title: 'Guardar imagen en Archivero', contexts: ['image'] },
  { id: 'save-video', title: 'Guardar video en Archivero', contexts: ['video'] },
  { id: 'save-link', title: 'Guardar enlace en Archivero', contexts: ['link'] },
  { id: 'save-selection', title: 'Guardar texto seleccionado en Archivero', contexts: ['selection'] },
  { id: 'save-page', title: 'Guardar esta página en Archivero', contexts: ['page'] },
];

// Piezas que ya mostraron el aviso pero todavía se están descargando: las correcciones del aviso
// se aplican acá antes de guardarlas.
const pending = new Map();

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
      const item = pending.get(msg.id);
      if (item) {
        if ('board' in msg.patch) item.to = msg.patch.board;
        if ('tags' in msg.patch) item.tags = msg.patch.tags;
      } else {
        // Ya está guardada: la librería aplica la corrección al incorporar la bandeja.
        await inboxAdd({ op: 'patch', id: msg.id, patch: msg.patch });
      }
      return sendResponse({ ok: true });
    }
    if (msg?.type === 'create-board') {
      return sendResponse({ ok: true, boards: await createBoard(msg.name) });
    }
    sendResponse({ ok: false });
  })().catch((e) => sendResponse({ ok: false, error: String(e) }));
  return true; // respuesta asíncrona
});

// Tablero nuevo desde el popup o el aviso: queda en la lista enseguida y la librería lo crea al abrirse.
async function createBoard(name) {
  name = String(name || '').trim();
  const s = await settings.load();
  if (!name) return s.boards;
  if (!s.boards.includes(name)) {
    await settings.save({ boards: s.boards.concat(name) });
    await inboxAdd({ op: 'board', name });
  }
  return settings.get().boards;
}

async function flashBadge(text, color, err) {
  if (err) console.error('[Archivero]', err);
  await chrome.action.setBadgeBackgroundColor({ color });
  await chrome.action.setBadgeText({ text });
  setTimeout(() => chrome.action.setBadgeText({ text: '' }), 2500);
}

// ---------- lectura de la página abierta ----------
async function readPageMeta(tabId) {
  try {
    const [res] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const m = (n) => document.querySelector(`meta[property="${n}"],meta[name="${n}"]`)?.content || '';
        const img = m('og:image') || m('twitter:image');
        return {
          title: m('og:title') || document.title || '',
          description: m('og:description') || m('description') || '',
          image: img ? new URL(img, location.href).href : '',
        };
      },
    });
    return res?.result || {};
  } catch {
    return {}; // chrome:// u otras páginas restringidas
  }
}

async function captureTab(tab) {
  try {
    const dataUrl = await chrome.tabs.captureVisibleTab(tab?.windowId, { format: 'jpeg', quality: 75 });
    return await (await fetch(dataUrl)).blob();
  } catch {
    return null;
  }
}

// ---------- guardado ----------
// 1) Se arma la pieza con lo que ya se sabe y se muestra el aviso enseguida.
// 2) Después se descargan la imagen o el video y la vista previa, y se guarda.
async function handleSave(kind, info, tab) {
  const page = info.pageUrl || tab?.url || '';
  const pageTitle = tab?.title || '';
  let item;
  let capture = null; // captura de la pestaña, se saca antes de que aparezca el aviso
  let meta = {};

  if (kind === 'save-image') {
    item = { kind: 'img', url: page, title: pageTitle };
  } else if (kind === 'save-video') {
    item = { kind: 'video', url: page, title: pageTitle };
    if (!embedOf(page)) capture = await captureTab(tab);
  } else if (kind === 'save-link') {
    item = { kind: 'link', url: info.linkUrl, title: info.linkText || '' };
  } else if (kind === 'save-selection') {
    item = { kind: 'text', url: page, text: info.selectionText || '', title: '' };
  } else {
    meta = tab?.id ? await readPageMeta(tab.id) : {};
    item = { kind: 'link', url: page, title: meta.title || pageTitle, note: meta.description || '' };
    if (!embedOf(page) && !meta.image) capture = await captureTab(tab);
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
  // El tablero elegido en el popup manda sobre las reglas (las etiquetas se mantienen).
  if (s.dest) to = s.dest;
  item.to = to;

  pending.set(item.id, item);
  flashBadge('✓', '#575757');
  if (tab?.id && settings.pref(s, settings.PREF_SHOW_TOAST)) showToast(tab.id, item, s);

  try {
    let blob = null;
    let preview = null;
    if (kind === 'save-image') {
      blob = await fetchBlob(info.srcUrl, 'image/', 25);
    } else if (kind === 'save-video') {
      blob = await fetchBlob(info.srcUrl, 'video/', 60);
      if (!blob) { item.kind = 'link'; preview = capture; }
    } else if (kind === 'save-link') {
      const m = await previewMeta(info.linkUrl);
      if (!item.title) item.title = m.title || '';
      if (m.image) preview = await fetchBlob(m.image, 'image/', 8);
    } else if (kind === 'save-page') {
      if (meta.image) preview = await fetchBlob(meta.image, 'image/', 8);
      else if (!embedOf(page)) {
        const m = await previewMeta(page);
        if (m.image) preview = await fetchBlob(m.image, 'image/', 8);
      }
      if (!preview) preview = capture;
    }
    if (blob) await mediaPut(item.id, blob);
    if (preview) { await mediaPut('prev:' + item.id, preview); item.pv = true; }
    item.pvTry = true;
  } finally {
    pending.delete(item.id);
    await inboxAdd({ op: 'add', item });
  }
}

// ---------- aviso en la página (Extension.dc.html) ----------
async function showToast(tabId, item, s) {
  const boards = s.boards.filter((b) => b !== 'Sin clasificar').concat('Sin clasificar');
  const payload = { id: item.id, board: item.to || 'Sin clasificar', tags: item.tags, boards };
  try {
    await chrome.scripting.executeScript({ target: { tabId }, func: injectToast, args: [payload] });
  } catch {
    /* página restringida: queda el ✓ del ícono */
  }
}

// Se ejecuta DENTRO de la página: debe ser autocontenida (sin imports ni variables de afuera).
function injectToast(p) {
  const SHOW_MS = 5000;
  document.getElementById('archivero-toast-host')?.remove();
  const host = document.createElement('div');
  host.id = 'archivero-toast-host';
  host.style.cssText = 'all:initial;position:fixed;left:50%;bottom:34px;transform:translateX(-50%);z-index:2147483647;';
  const root = host.attachShadow({ mode: 'closed' });
  const css = `
    *{box-sizing:border-box}
    .t{font:13px/1.35 Inter,system-ui,sans-serif;background:#575757;color:#fff;border-radius:30px;width:440px;max-width:calc(100vw - 32px);
       padding:10px 12px 10px 20px;border:1px solid rgba(255,255,255,.12);box-shadow:0 6px 20px rgba(0,0,0,.3),inset 0 1px 1.5px rgba(255,255,255,.12);
       animation:in .35s cubic-bezier(.19,1,.22,1) both}
    .t.open{border-radius:18px;padding:14px 16px 16px 20px}
    .t.out{animation:out .3s cubic-bezier(.4,0,.2,1) both}
    @keyframes in{0%{opacity:0;transform:translateY(14px) scale(.98)}100%{opacity:1;transform:none}}
    @keyframes out{0%{opacity:1;transform:none}100%{opacity:0;transform:translateY(18px) scale(.98)}}
    .r{display:flex;align-items:center;gap:12px}
    .msg{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .ch{background:#d9d9d9;color:#111;border:0;border-radius:20px;padding:6px 14px;font:600 12px Inter,system-ui,sans-serif;cursor:pointer;flex:none;transition:transform .15s,background-color .15s}
    .ch:hover{background:#fff;transform:scale(1.04)}
    .x{background:none;border:0;color:#fff;opacity:.7;font-size:16px;cursor:pointer;padding:0 4px;line-height:1}
    .x:hover{opacity:1}
    .ch:focus-visible,.x:focus-visible,select:focus-visible,input:focus-visible{outline:2px solid #fff;outline-offset:2px}
    .f{display:none;margin-top:12px;gap:8px;flex-direction:column}
    .open .f{display:flex}
    .nb{display:none;gap:8px}
    .nb.on{display:flex}
    label{font-size:11px;font-weight:600;opacity:.85}
    select,input{width:100%;height:34px;border-radius:30px;border:1px solid rgba(255,255,255,.2);background:#464646;color:#fff;font:13px Inter,system-ui,sans-serif;padding:0 14px;outline:none}
    select:focus,input:focus{border-color:#fff}
    select option{color:#111}
    .hint{font-size:11px;opacity:.8}
  `;
  root.innerHTML = `<style>${css}</style>
    <div class="t" role="status">
      <div class="r"><span class="msg"></span><button class="ch">Cambiar</button><button class="x" aria-label="Cerrar">×</button></div>
      <div class="f">
        <label>Tablero</label><select aria-label="Tablero"></select>
        <div class="nb"><input class="nbi" type="text" maxlength="40" placeholder="Nombre del tablero nuevo" aria-label="Nombre del tablero nuevo" /><button class="ch nbo">Crear</button></div>
        <div class="hint" hidden>Todavía no tenés tableros: creá uno para guardar acá.</div>
        <label>Etiquetas (separadas por coma)</label><input class="tg" type="text" aria-label="Etiquetas" />
      </div>
    </div>`;
  const $ = (s) => root.querySelector(s);
  const box = $('.t');
  const msg = $('.msg');
  const select = $('select');
  const tagsIn = $('.tg');
  const newRow = $('.nb');
  const newIn = $('.nbi');
  const state = { board: p.board, tags: p.tags, boards: p.boards.slice() };
  const render = () => {
    const tags = state.tags.split(',').map((t) => t.trim()).filter(Boolean).map((t) => '#' + t).join(' ');
    msg.innerHTML = '<b>Guardado</b> en ';
    msg.append(state.board + (tags ? ' · ' + tags : ''));
  };
  const fillBoards = () => {
    select.replaceChildren();
    for (const b of state.boards) select.appendChild(new Option(b, b, false, b === state.board));
    select.appendChild(new Option('+ Nuevo tablero…', '__new'));
    const none = state.boards.every((b) => b === 'Sin clasificar');
    $('.hint').hidden = !none;
    if (none) newRow.classList.add('on');
  };
  fillBoards();
  tagsIn.value = p.tags;
  render();

  // Se va a los 5 s. Pasar el mouse lo pausa; cada cambio vuelve a contar 5 s.
  let timer;
  let hovering = false;
  const close = () => { clearTimeout(timer); box.classList.add('out'); setTimeout(() => host.remove(), 300); };
  const arm = () => { clearTimeout(timer); if (!hovering) timer = setTimeout(close, SHOW_MS - 300); }; // 300 ms de salida
  const send = (patch) => chrome.runtime.sendMessage({ type: 'patch-item', id: p.id, patch });
  const pickBoard = (name) => { state.board = name; render(); send({ board: name }); arm(); };
  const createBoard = async () => {
    const name = newIn.value.trim();
    if (!name) return;
    const res = await chrome.runtime.sendMessage({ type: 'create-board', name });
    if (res?.boards) state.boards = res.boards.filter((b) => b !== 'Sin clasificar').concat('Sin clasificar');
    state.board = name;
    newIn.value = '';
    newRow.classList.remove('on');
    fillBoards();
    pickBoard(name);
  };
  $('.ch').addEventListener('click', () => { box.classList.toggle('open'); arm(); });
  $('.x').addEventListener('click', close);
  select.addEventListener('change', () => {
    if (select.value === '__new') { newRow.classList.add('on'); newIn.focus(); select.value = state.board; arm(); return; }
    pickBoard(select.value);
  });
  $('.nbo').addEventListener('click', createBoard);
  newIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') createBoard(); });
  newIn.addEventListener('input', arm);
  tagsIn.addEventListener('input', arm);
  tagsIn.addEventListener('change', () => {
    state.tags = tagsIn.value.split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean).join(', ');
    render();
    send({ tags: state.tags });
    arm();
  });
  host.addEventListener('mouseenter', () => { hovering = true; clearTimeout(timer); });
  host.addEventListener('mouseleave', () => { hovering = false; arm(); });
  document.documentElement.appendChild(host);
  arm();
}
