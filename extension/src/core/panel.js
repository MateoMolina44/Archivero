// Panel flotante del popup (popup.html?frame) dentro de una página, con esquinas redondas.
// Lo usan el service worker (lo inyecta en las páginas web con executeScript, por eso tiene que ser
// autocontenida: sin imports ni variables de afuera) y la librería, que lo abre en su propia página.

// Si el panel ya está abierto, lo cierra (el ícono funciona como interruptor).
export function togglePanel(src) {
  const ID = 'archivero-panel';
  const prev = document.getElementById(ID);
  if (prev) { prev.dispatchEvent(new Event('archivero-close')); return; }

  const host = document.createElement('div');
  host.id = ID;
  host.style.cssText = 'all:initial;position:fixed;top:10px;right:10px;z-index:2147483647';
  const root = host.attachShadow({ mode: 'closed' });
  root.innerHTML = '<style>'
    + 'iframe{display:block;width:342px;height:340px;border:0;border-radius:22px;background:transparent;color-scheme:normal;'
    + 'box-shadow:0 12px 40px rgba(0,0,0,.35);transform-origin:top right;animation:in .35s cubic-bezier(.4,0,.2,1) both}'
    + 'iframe.out{animation:out .2s cubic-bezier(.4,0,.2,1) both}'
    + '@keyframes in{from{opacity:0;transform:translateY(-8px) scale(.96)}}'
    + '@keyframes out{to{opacity:0;transform:translateY(-8px) scale(.96)}}'
    + '@media (prefers-reduced-motion:reduce){iframe,iframe.out{animation-duration:.01ms}}</style>';
  const frame = document.createElement('iframe');
  frame.src = src;
  frame.title = 'Archivero';
  root.appendChild(frame);
  document.documentElement.appendChild(host);

  let closed = false;
  const close = (then) => {
    if (closed) return;
    closed = true;
    removeEventListener('message', onMsg);
    removeEventListener('mousedown', onDown, true);
    removeEventListener('keydown', onKey, true);
    frame.classList.add('out');
    setTimeout(() => { host.remove(); if (then) then(); }, 200);
  };
  // Mensajes del popup: su alto, cerrar, y guardar (se cierra antes, para no salir en la captura).
  const onMsg = (e) => {
    if (e.source !== frame.contentWindow || !e.data || typeof e.data.archivero !== 'string') return;
    if (e.data.archivero === 'size') frame.style.height = Math.ceil(e.data.h) + 'px';
    if (e.data.archivero === 'close') close();
    if (e.data.archivero === 'save') close(() => chrome.runtime.sendMessage({ type: 'save-current-page' }));
  };
  // Los clics dentro del panel quedan en el iframe; los que llegan acá son de afuera.
  const onDown = (e) => { if (e.target !== host) close(); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  host.addEventListener('archivero-close', () => close());
  addEventListener('message', onMsg);
  addEventListener('mousedown', onDown, true);
  addEventListener('keydown', onKey, true);
}
