// Pantalla completa (vista 1), al estilo de the-005.com: una pieza a toda la pantalla que cambia
// sola, con corte seco, cada SLIDE_DELAY; abajo, arriba de la botonera, un carrete de miniaturas
// (tres a la vista, la del medio es la actual) que se desliza en cada cambio.
// - Pasar el mouse por el carrete lo detiene; arrastrarlo recorre las piezas; tocar una miniatura
//   salta a esa pieza.
// - Tocar la pieza abre su ficha completa (y el carrusel queda detenido mientras está abierta).
// - La rueda y las flechas del teclado pasan a la anterior o la siguiente.
// Reemplaza la plantilla del diseño (Main1.dc.html) entre el inicio y el buscador, y los
// controles de abajo; el buscador, la botonera, la ficha y Reglas y ajustes siguen siendo los del diseño.

const SLIDE_DELAY = 2000; // ms que queda cada pieza (lo mismo que en the-005)
const SLIDE_MS = 300; // deslizamiento del carrete
const TH = 64; // ancho de una miniatura (60) más el espacio entre ellas (4)
const DRAG_MIN = 5; // px: menos que esto todavía es un clic

const STAGE = '<div class="fs-stage" role="button" tabindex="0" aria-label="{{fs.label}}" onClick="{{fs.open}}" onKeyDown="{{fs.key}}">'
  + '<sc-for list="{{fs.slides}}" as="f" hint-placeholder-count="0"><div class="fs-s" style="{{f.style}}"><sc-if value="{{f.on}}">'
  + '<sc-if value="{{f.blur}}"><img class="fs-blur" src="{{f.src}}" alt="" aria-hidden="true" draggable="false"></sc-if>'
  + '<sc-if value="{{f.src}}"><img class="fs-img" src="{{f.src}}" alt="" draggable="false" style="{{f.imgStyle}}"></sc-if>'
  + '<sc-if value="{{f.card}}"><div class="fs-card"><span>{{f.dom}}</span><b>{{f.title}}</b></div></sc-if>'
  + '</sc-if></div></sc-for></div>';

const UI = '<sc-if value="{{fs.any}}">'
  + '<div class="fs-cap" aria-live="polite"><div><p><b>{{fs.title}}</b><sc-if value="{{fs.site}}"><span> · {{fs.site}}</span></sc-if></p>'
  + '<sc-if value="{{fs.meta}}"><p class="fs-meta">{{fs.meta}}</p></sc-if></div></div>'
  + '<div class="fs-reel" onPointerEnter="{{fs.enter}}" onPointerLeave="{{fs.leave}}" onPointerDown="{{fs.down}}" onPointerMove="{{fs.move}}" onPointerUp="{{fs.up}}" onPointerCancel="{{fs.up}}">'
  + '<div class="fs-track" style="{{fs.track}}"><sc-for list="{{fs.thumbs}}" as="r" hint-placeholder-count="0">'
  + '<button class="fs-th {{r.cls}}" style="left:{{r.x}}px" data-p="{{r.p}}" tabindex="-1" aria-label="{{r.label}}">'
  + '<sc-if value="{{r.src}}"><img src="{{r.src}}" alt="" draggable="false"></sc-if></button>'
  + '</sc-for></div></div>'
  + '</sc-if>'
  + '<sc-if value="{{fs.none}}"><div class="fs-none"><b>Todavía no hay nada para mostrar acá</b><span>La pantalla completa muestra tus imágenes y las páginas web que guardes.</span></div></sc-if>';

export function patchFullscreenTemplate(template) {
  const a = template.indexOf('<sc-for list="{{pieces}}"');
  const b = template.indexOf('\n  </sc-for>\n\n  <button class="sb"');
  const c = template.indexOf('<sc-if value="{{libAny}}"');
  const d = template.indexOf('<sc-if value="{{libEmpty}}"');
  if (a < 0 || b < a || c < b || d < c) {
    console.warn('[Archivero] El diseño de la pantalla completa cambió: no se pudo armar la vista nueva.');
    return template;
  }
  return template.slice(0, a) + STAGE + template.slice(b + '\n  </sc-for>'.length, c) + UI + '\n  ' + template.slice(d);
}

const mod = (a, n) => ((a % n) + n) % n;

// preview(inst, it) → { img } de un enlace (patches.js), para no importar en círculo.
export function fullscreenVals(inst, vals, preview) {
  const fs = inst._fs || (inst._fs = { pos: 0, anim: true, seen: new Set(), timer: null, ticket: 0, hover: false, drag: null });
  const items = inst.order();
  const N = items.length;
  if (!N) {
    stop(fs);
    vals.fs = { any: false, none: inst.lib().items.length > 0, slides: [], thumbs: [] };
    return;
  }

  // El carrete repite la lista tres veces para poder girar sin fin; la posición vive en la copia del
  // medio y, al salirse después de un deslizamiento, vuelve a ella sin animación (ver settle).
  if (fs.n !== N) { fs.n = N; fs.pos = N + mod(fs.pos, N); fs.anim = false; }
  const dragging = !!(fs.drag && fs.drag.moved);
  const shown = dragging ? fs.drag.p : fs.pos;
  const cur = mod(shown, N);
  [-1, 0, 1, 2].forEach((k) => fs.seen.add(items[mod(cur + k, N)].id));

  const media = (it) => {
    if (it.kind === 'img') return { src: inst.srcOf(it), thumb: inst.thumbOf(it), ow: it.ow || 0, oh: it.oh || 0 };
    const pv = preview(inst, it);
    const img = (pv && pv.img) || '';
    return { src: img, thumb: img, ow: 0, oh: 0 };
  };

  const FIT = (inst.ui && inst.ui().fit) || 'blur';
  const slides = items.map((it, i) => {
    const on = fs.seen.has(it.id);
    const m = on ? media(it) : { src: '' };
    const big = m.ow >= 1920 && m.oh >= 1080;
    const mode = big ? 'cover' : FIT;
    const bg = mode === 'color' ? (it.avg || 'var(--t1)') : mode === 'frame' ? 'var(--bg)' : 'var(--t1)';
    return {
      on, src: m.src, blur: !!m.src && mode === 'blur',
      card: !m.src, title: it.title || 'Sin título', dom: inst.dom(it.url),
      imgStyle: FIT_STYLE[mode] || FIT_STYLE.blur,
      style: 'background:' + bg + (i === cur ? ';visibility:visible;z-index:1' : ''),
    };
  });

  const thumbs = [];
  for (let p = 0; p < 3 * N; p++) {
    const it = items[mod(p, N)];
    // Las miniaturas se cargan al acercarse al centro (y quedan cargadas).
    if (Math.abs(p - shown) <= 4) fs.seen.add('th:' + it.id);
    thumbs.push({
      p, x: p * TH, cls: p === shown ? 'on' : '',
      src: fs.seen.has('th:' + it.id) ? media(it).thumb : '',
      label: it.title || 'Sin título',
    });
  }

  const it = items[cur];
  vals.fs = {
    any: true, none: false, slides, thumbs,
    title: it.title || 'Sin título', site: inst.dom(it.url),
    // Misma leyenda que en un tablero y en el mosaico: tamaño · forma · resolución.
    meta: inst.shapeOf ? inst.shapeOf(it).lab : '',
    label: (it.title || 'Sin título') + ': ver ficha completa',
    // La miniatura actual queda en el medio de las tres; al arrastrar, el carrete sigue al puntero.
    track: 'transform:translate3d(' + (dragging ? TH - fs.drag.p0 * TH + fs.drag.dx : TH - fs.pos * TH) + 'px,0,0)'
      + ';transition:' + (fs.anim && !dragging ? 'transform ' + SLIDE_MS + 'ms cubic-bezier(.4,0,.2,1)' : 'none'),
    open: () => openFicha(inst, items[mod(fs.pos, N)]),
    key: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFicha(inst, items[mod(fs.pos, N)]); } },
    // Solo el mouse: en pantallas táctiles tocar contaría como "pasar por encima" y lo dejaría detenido.
    enter: (e) => { if (e.pointerType === 'mouse') { fs.hover = true; stop(fs); } },
    leave: (e) => { if (e.pointerType === 'mouse') { fs.hover = false; inst.forceUpdate(); } },
    down: (e) => {
      if (e.button !== 0) return;
      const t = e.target.closest && e.target.closest('[data-p]');
      fs.drag = { x: e.clientX, dx: 0, p0: fs.pos, p: fs.pos, hit: t ? Number(t.dataset.p) : null, moved: false };
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* sin captura */ }
      stop(fs);
    },
    // Arrastrar: la pieza de fondo sigue a la miniatura que queda en el medio.
    move: (e) => {
      const d = fs.drag;
      if (!d) return;
      d.dx = e.clientX - d.x;
      if (!d.moved && Math.abs(d.dx) < DRAG_MIN) return;
      d.moved = true;
      d.p = Math.max(0, Math.min(3 * N - 1, Math.round(d.p0 - d.dx / TH)));
      inst.forceUpdate();
    },
    up: () => {
      const d = fs.drag;
      if (!d) return;
      fs.drag = null;
      if (d.moved) go(inst, fs, d.p);
      else if (d.hit != null) go(inst, fs, d.hit);
      else inst.forceUpdate();
    },
  };

  // La rueda y las flechas: anterior / siguiente.
  vals.wheel = (e) => {
    if (Math.abs(e.deltaY) < 8 || inst.state.edId || Date.now() < (fs.lock || 0)) return;
    fs.lock = Date.now() + 450;
    go(inst, fs, fs.pos + (e.deltaY > 0 ? 1 : -1));
  };
  if (!fs.keys) {
    fs.keys = (e) => {
      if (inst._dead) { window.removeEventListener('keydown', fs.keys); return; }
      if (inst.state.edId || inst.state.sq !== 'off' || inst.state.rq !== 'off') return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '')) return;
      if (e.key === 'ArrowRight') go(inst, fs, fs.pos + 1);
      else if (e.key === 'ArrowLeft') go(inst, fs, fs.pos - 1);
    };
    window.addEventListener('keydown', fs.keys);
  }

  // Avance automático: detenido con el mouse sobre el carrete, mientras se arrastra, con la ficha,
  // el buscador o Reglas y ajustes abiertos, o con la pestaña en segundo plano.
  const paused = N < 2 || fs.hover || fs.drag || inst.state.edId || inst.state.sq !== 'off' || inst.state.rq !== 'off' || document.hidden;
  if (paused) stop(fs);
  else if (!fs.timer) schedule(inst, fs, items);
  if (!fs.vis) {
    fs.vis = () => { if (inst._dead) document.removeEventListener('visibilitychange', fs.vis); else inst.forceUpdate(); };
    document.addEventListener('visibilitychange', fs.vis);
  }
}

// Imagen dentro de la pantalla según "Pantalla completa" en Apariencia (las de 1920×1080 o más
// siempre la llenan). El área libre deja lugar al buscador arriba y al carrete y la botonera abajo.
const FIT_STYLE = {
  cover: 'inset:0;width:100%;height:100%;object-fit:cover',
  blur: 'left:6%;top:80px;width:88%;height:calc(100% - 230px);object-fit:contain',
  color: 'left:6%;top:80px;width:88%;height:calc(100% - 230px);object-fit:contain',
  frame: 'left:50%;top:calc(50% - 75px);transform:translate(-50%,-50%);max-width:80%;max-height:calc(100% - 290px);padding:18px;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,.35)',
};

function openFicha(inst, it) {
  if (!it) return;
  inst.lib().selId = it.id;
  inst.commitNow();
  inst.setState({ edId: it.id });
}

function stop(fs) {
  clearTimeout(fs.timer);
  fs.timer = null;
  fs.ticket++;
}

// Pasa a la siguiente cuando su imagen ya está cargada (no corta a una a medio cargar).
function schedule(inst, fs, items) {
  const ticket = ++fs.ticket;
  fs.timer = setTimeout(() => {
    if (inst._dead || ticket !== fs.ticket) return;
    const next = items[mod(fs.pos + 1, items.length)];
    fs.seen.add(next.id);
    ready(inst, next).then(() => {
      if (inst._dead || ticket !== fs.ticket) return;
      fs.timer = null;
      go(inst, fs, fs.pos + 1);
    });
  }, SLIDE_DELAY);
}

function ready(inst, it) {
  const src = it.kind === 'img' ? inst.srcOf(it) : '';
  if (!src) return Promise.resolve();
  const im = new Image();
  im.src = src;
  return Promise.race([im.decode().catch(() => {}), new Promise((r) => setTimeout(r, 4000))]);
}

function go(inst, fs, p) {
  stop(fs);
  fs.pos = p;
  fs.anim = true;
  inst.forceUpdate();
  clearTimeout(fs.settle);
  fs.settle = setTimeout(() => settle(inst, fs), SLIDE_MS + 20);
}

// Después de deslizar, si quedó fuera de la copia del medio, vuelve a la misma miniatura de esa copia.
function settle(inst, fs) {
  if (inst._dead || !fs.n) return;
  const N = fs.n;
  if (fs.pos >= N && fs.pos < 2 * N) return;
  fs.pos = N + mod(fs.pos, N);
  fs.anim = false;
  inst.forceUpdate();
  requestAnimationFrame(() => { fs.anim = true; });
}
