// Runtime mínimo para las pantallas exportadas de Claude Design (.dc.html).
// Réplica de diseno/generador/shim.js, adaptada a la CSP de MV3: no usa eval ni new Function,
// y monta/desmonta pantallas dentro de una sola página (SPA) en lugar de recargar documentos.
//
// Plantilla: HTML con {{ruta.a.valor}}, <sc-for list="{{x}}" as="y"> y <sc-if value="{{x}}">.
// Los atributos on*="{{fn}}" se enganchan con addEventListener (nunca como handler inline).

export class DCLogic {
  constructor(props) {
    this.props = props || {};
    this.state = {};
  }
  setState(p) {
    const o = typeof p === 'function' ? p(this.state) : p;
    this.state = Object.assign({}, this.state, o);
    this._rq();
  }
  forceUpdate() {
    this._rq();
  }
  // Un render por cuadro. El setTimeout es respaldo: con la pestaña en segundo plano
  // requestAnimationFrame no corre y la pantalla quedaría sin actualizar.
  _rq() {
    if (this._q || this._dead) return;
    this._q = true;
    const run = () => {
      if (!this._q) return;
      this._q = false;
      cancelAnimationFrame(raf);
      clearTimeout(tmo);
      if (!this._dead && this._render) this._render();
    };
    const raf = requestAnimationFrame(run);
    const tmo = setTimeout(run, 100);
  }
}

function look(scope, path) {
  path = path.trim();
  if (path === 'true') return true;
  if (path === 'false') return false;
  let v = scope;
  for (const k of path.split('.')) {
    if (v == null) return undefined;
    v = v[k];
  }
  return v;
}

// Traducción (core/i18n.js): se aplica a los valores que se muestran como texto y a los atributos
// legibles. Las partes fijas de las plantillas ya vienen traducidas (localizeTemplate).
let tr = null;
export function setTranslator(fn) { tr = fn; }
const READABLE = new Set(['aria-label', 'placeholder', 'title', 'data-tip', 'alt']);
const say = (x) => (tr && typeof x === 'string' ? tr(x) : x);

const fill = (s, scope, t) => s.replace(/\{\{([^}]+)\}\}/g, (m, p) => {
  const x = look(scope, p);
  return x == null ? '' : t ? say(x) : x;
});
const inner = (attr) => attr.match(/\{\{(.*)\}\}/)[1];

// <sc-for>/<sc-if> se pasan a <template data-sc> antes de parsear: el parser de HTML descarta
// etiquetas desconocidas dentro de <select>, pero respeta <template> en cualquier lugar.
export function compile(html) {
  const t = document.createElement('template');
  t.innerHTML = html
    .replace(/<sc-(for|if)\b/g, '<template data-sc="$1"')
    .replace(/<\/sc-(for|if)>/g, '</template>');
  return t.content;
}

function childrenOf(node) {
  return node.content ? node.content.childNodes : node.childNodes;
}

function build(node, scope, out) {
  if (node.nodeType === 3) {
    out.push({ t: '#t', v: fill(node.textContent, scope, true) });
    return;
  }
  if (node.nodeType !== 1) return;
  const tag = node.localName;
  const sc = tag === 'template' ? node.getAttribute('data-sc') : null;
  if (sc === 'for') {
    const list = look(scope, inner(node.getAttribute('list'))) || [];
    const as = node.getAttribute('as');
    list.forEach((it, i) => {
      const s = Object.assign({}, scope, { [as]: it, $index: i });
      childrenOf(node).forEach((c) => build(c, s, out));
    });
    return;
  }
  if (sc === 'if') {
    if (look(scope, inner(node.getAttribute('value')))) childrenOf(node).forEach((c) => build(c, scope, out));
    return;
  }
  const attrs = {};
  const ev = {};
  let ref = null;
  for (const a of node.attributes) {
    if (a.name.startsWith('hint-')) continue;
    const m = a.value.match(/^\{\{(.*)\}\}$/);
    if (m) {
      const x = look(scope, m[1]);
      if (a.name === 'ref') { ref = x; continue; }
      if (/^on[a-z]/i.test(a.name)) { ev[a.name.slice(2).toLowerCase()] = x; continue; }
      attrs[a.name] = READABLE.has(a.name) ? say(x) : x;
    } else {
      attrs[a.name] = fill(a.value, scope, READABLE.has(a.name));
    }
  }
  const kids = [];
  childrenOf(node).forEach((c) => build(c, scope, kids));
  out.push({ t: tag, attrs, ev, ref, kids, ns: node.namespaceURI });
}

function mk(v) {
  if (v.t === '#t') return document.createTextNode(v.v);
  const el = v.ns ? document.createElementNS(v.ns, v.t) : document.createElement(v.t);
  el._h = {};
  patch(el, v);
  return el;
}

function setAttrs(el, v) {
  const old = el._a || {};
  for (const k in old) if (!(k in v.attrs)) el.removeAttribute(k);
  for (const k in v.attrs) {
    let x = v.attrs[k];
    if (x === false || x == null) { el.removeAttribute(k); continue; }
    if (typeof x !== 'string') x = String(x);
    if (old[k] !== v.attrs[k] || (k === 'value' && el.value !== x)) {
      el.setAttribute(k, x);
      if (k === 'value') el.value = x;
    }
  }
  el._a = v.attrs;
}

function patch(el, v) {
  setAttrs(el, v);
  el._h = el._h || {};
  for (const e in el._h) {
    if (!(e in v.ev)) { el.removeEventListener(e, el._h[e].f); delete el._h[e]; }
  }
  for (const e in v.ev) {
    if (!el._h[e]) {
      const o = { fn: null };
      o.f = (evt) => o.fn && o.fn(evt);
      el.addEventListener(e, o.f);
      el._h[e] = o;
    }
    el._h[e].fn = v.ev[e];
  }
  if (typeof v.ref === 'function') v.ref(el);
  morph(el, v.kids);
}

function morph(parent, kids) {
  let i = 0;
  for (; i < kids.length; i++) {
    const v = kids[i];
    const cur = parent.childNodes[i];
    if (!cur) { parent.appendChild(mk(v)); continue; }
    if (v.t === '#t') {
      if (cur.nodeType === 3) { if (cur.textContent !== v.v) cur.textContent = v.v; }
      else parent.replaceChild(mk(v), cur);
      continue;
    }
    if (cur.nodeType === 1 && cur.localName === v.t) patch(cur, v);
    else parent.replaceChild(mk(v), cur);
  }
  while (parent.childNodes.length > kids.length) parent.removeChild(parent.lastChild);
}

// Monta una pantalla ({ template, css, props, Component }) dentro de host. Devuelve la instancia;
// unmount(inst) la desmonta y saca su CSS.
export function mount(host, screen, extraProps) {
  const style = document.createElement('style');
  style.dataset.screen = screen.name;
  style.textContent = screen.css;
  document.head.appendChild(style);

  const tpl = compile(screen.template);
  const inst = new screen.Component(Object.assign({}, screen.props, extraProps));
  inst._style = style;
  inst._host = host;
  inst._render = () => {
    const vals = inst.renderVals();
    const kids = [];
    tpl.childNodes.forEach((c) => build(c, vals, kids));
    morph(host, kids);
  };
  return inst;
}

export function start(inst) {
  inst._render();
  if (inst.componentDidMount) inst.componentDidMount();
}

export function unmount(inst) {
  if (!inst || inst._dead) return;
  if (inst.componentWillUnmount) inst.componentWillUnmount();
  inst._dead = true;
  inst._host.replaceChildren();
  inst._style.remove();
}
