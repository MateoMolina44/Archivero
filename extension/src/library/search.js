// Buscador real. En el diseño el panel era una maqueta (decía "Buscar…" y no tenía campo):
// acá se le agrega el campo, la búsqueda por color con su selector y los resultados, sobre el
// mismo panel y con las mismas animaciones (.panel, .pin, .chip, .vt) de cada pantalla.
//
// Qué busca:
// - Texto: nombre, nota, texto guardado, sitio, tablero y tipo ("imagen", "video", "enlace"…).
//   Varias palabras tienen que estar todas. "#algo" busca solo en las etiquetas.
// - Color: uno o más colores; una pieza entra si tiene un color parecido a cada uno.
//   Los colores de cada pieza se sacan de su imagen (o de la vista previa del enlace) la primera
//   vez que se busca por color y quedan guardados en la pieza (campo cols).
// - Alcance: en un tablero, solo ese tablero; en el Anotador, las notas; en el resto, todo.

import { embedOf } from '../core/embeds.js';

const RECENT_KEY = 'archivero.search.v1';
const MAX_RESULTS = 60;
const MATCH = 22; // distancia máxima entre colores (ΔE94) para considerarlos parecidos

// ---------- plantillas ----------

const PAL_ICON = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">'
  + ['#ff5a5a', '#ffb347', '#ffe066', '#6bd66b', '#4fc3f7', '#5c7cfa', '#b07cff', '#ff7ab8']
    .map((c, i) => { const a = (i / 8) * Math.PI * 2 - Math.PI / 2; return '<circle cx="' + (9 + Math.cos(a) * 6).toFixed(2) + '" cy="' + (9 + Math.sin(a) * 6).toFixed(2) + '" r="1.7" fill="' + c + '"/>'; }).join('')
  + '</svg>';

const PLUS_ICON = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M7 2v10M2 7h10"/></svg>';

// Campo, colores elegidos y botón de color (en lugar del texto fijo "Buscar…").
const BAR = '<input class="srch-in" ref="{{sFocus}}" value="{{sQ}}" onInput="{{sInput}}" onKeyDown="{{sKey}}" placeholder="{{sPh}}" aria-label="Buscar" autocomplete="off" spellcheck="false">'
  + '<sc-for list="{{sCols}}" as="c" hint-placeholder-count="0"><button class="srch-col" onClick="{{c.rm}}" aria-label="Quitar el color {{c.hex}}" title="Quitar {{c.hex}}" style="background:{{c.hex}}"></button></sc-for>'
  + '<sc-if value="{{sPalOn}}" hint-placeholder-val="{{true}}"><button class="x srch-pal" onClick="{{sPalT}}" aria-label="Buscar por color" style="background:{{sPalBg}}">' + PAL_ICON + '</button></sc-if>\n        ';

// Selector de color (como el de la referencia): cuadro de saturación y brillo, barra de tono,
// color elegido con su código, "+" para sumar otro color y "Agregar".
const PICKER = '<sc-if value="{{sPickOn}}" hint-placeholder-val="{{false}}"><div class="srch-pick">'
  + '<div class="srch-sv" onMouseDown="{{pk.svDown}}" style="background:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,{{pk.hue}})">'
  + '<span class="srch-knob" style="left:{{pk.x}}%;top:{{pk.y}}%;background:{{pk.hex}}"></span></div>'
  + '<div class="srch-hue" onMouseDown="{{pk.hueDown}}"><span class="srch-knob" style="left:{{pk.hx}}%;top:50%;background:{{pk.hue}}"></span></div>'
  + '<div class="srch-row">'
  + '<label class="srch-hex"><span style="background:{{pk.hex}}"></span><input value="{{pk.hex}}" onChange="{{pk.hexIn}}" onKeyDown="{{pk.hexKey}}" maxlength="7" aria-label="Color en hexadecimal"></label>'
  + '<button class="srch-more" onClick="{{pk.more}}" aria-label="Sumar este color y elegir otro" title="Sumar este color y elegir otro">' + PLUS_ICON + '</button>'
  + '<span style="flex:1"></span>'
  + '<button class="srch-add" onClick="{{pk.add}}">Agregar</button>'
  + '</div></div></sc-if>';

const RESULTS = '<sc-if value="{{sResOn}}" hint-placeholder-val="{{false}}">'
  + '<div class="srch-h"><span>{{sResLbl}}</span><sc-if value="{{sBusy}}" hint-placeholder-val="{{false}}"><span style="opacity:.7">Mirando los colores…</span></sc-if></div>'
  + '<sc-if value="{{sNone}}" hint-placeholder-val="{{false}}"><div style="font-size:12px;opacity:.8">{{sNoneLbl}}</div></sc-if>'
  + '<div class="srch-grid"><sc-for list="{{sRes}}" as="v" hint-placeholder-count="0"><button class="vt srch-r" onClick="{{v.open}}" title="{{v.title}}" aria-label="Abrir {{v.title}}" style="--d:{{v.d}}">'
  + '<sc-if value="{{v.isImg}}" hint-placeholder-val="{{false}}"><img src="{{v.src}}" alt="" loading="lazy" draggable="false"></sc-if>'
  + '<sc-if value="{{v.isVid}}" hint-placeholder-val="{{false}}"><video src="{{v.src}}" muted playsinline preload="metadata"></video></sc-if>'
  + '<sc-if value="{{v.noImg}}" hint-placeholder-val="{{false}}"><span class="srch-t">{{v.title}}</span></sc-if>'
  + '</button></sc-for></div></sc-if>';

const RECENTS = '<div class="srch-h"><span>Recientes</span><sc-if value="{{sRecAny}}" hint-placeholder-val="{{false}}"><button class="srch-clr" onClick="{{sRecClear}}">Borrar</button></sc-if></div>'
  + '<sc-if value="{{sRecNone}}" hint-placeholder-val="{{true}}"><div style="font-size:12px;opacity:.8">Todavía no buscaste nada.</div></sc-if>'
  + '<div class="srch-recs"><sc-for list="{{sRec}}" as="r" hint-placeholder-count="0"><button class="chip srch-chip" onClick="{{r.go}}" style="--d:{{r.d}}">'
  + '<sc-for list="{{r.cols}}" as="c" hint-placeholder-count="0"><span class="srch-dot" style="background:{{c}}"></span></sc-for>{{r.l}}</button></sc-for></div>';

// Reemplaza el texto fijo del buscador por el campo y el contenido del panel por
// selector + resultados, conservando lo que había ("Guardado recientemente" / "Notas recientes")
// para cuando todavía no se escribió nada.
export function patchSearchTemplate(name, t) {
  const a = t.indexOf('<sc-if value="{{sOn}}"');
  if (a < 0) return t;
  const span = t.indexOf('<span style="flex:1;color:#ececec">', a);
  const x = t.indexOf('<button class="x"', span);
  const pin = t.indexOf('<div class="pin"', a);
  const pinIn = t.indexOf('>', pin) + 1;
  const rest = t.indexOf('Todavía no buscaste nada.</div>', pinIn);
  const end = t.indexOf('\n      </div>\n    </div>\n  </div>\n  </sc-if>', pinIn);
  if ([span, x, pin, rest, end].some((i) => i < 0) || !(span < x && x < pin && rest < end)) {
    console.warn('[Archivero] El diseño cambió: no encontré el panel del buscador en', name);
    return t;
  }
  const keep = t.slice(rest + 'Todavía no buscaste nada.</div>'.length, end);
  return t.slice(0, span) + BAR + t.slice(x, pinIn)
    + PICKER + RESULTS + '<sc-if value="{{sIdle}}" hint-placeholder-val="{{true}}">' + RECENTS + keep + '</sc-if>'
    + t.slice(end);
}

// ---------- texto ----------

const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const KIND_WORDS = { img: 'imagen imagenes foto fotos', video: 'video videos', link: 'enlace enlaces link links web pagina', text: 'texto textos nota' };

function haystack(inst, it) {
  const b = inst.lib().boards.find((x) => x.id === it.bid);
  let dom = '';
  try { dom = it.url ? new URL(it.url).hostname : ''; } catch { dom = it.url || ''; }
  return norm([it.title, it.note, it.text, it.url, dom, b && b.name, KIND_WORDS[it.kind], it.gif ? 'gif' : ''].join(' '));
}

const tagsOf = (it) => norm([].concat(it.atags || [], String(it.tags || '').split(',')).join(' ').replace(/#/g, ' ')).split(/\s+/).filter(Boolean);

function matchesText(inst, it, words) {
  if (!words.length) return true;
  const hay = haystack(inst, it);
  const tags = tagsOf(it);
  return words.every((w) => (w[0] === '#' ? tags.some((t) => t.startsWith(w.slice(1))) : hay.includes(w) || tags.some((t) => t.startsWith(w))));
}

// ---------- color ----------

function hexToRgb(h) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(h || '').trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const rgbToHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

function rgbToLab([r, g, b]) {
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const R = lin(r), G = lin(g), B = lin(b);
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const x = f((R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047);
  const y = f(R * 0.2126 + G * 0.7152 + B * 0.0722);
  const z = f((R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}
// Distancia CIE94 (p = color buscado): pesa menos las diferencias de saturación que la distancia
// Lab simple, así un azul intenso y un azul más apagado cuentan como parecidos.
function dE(p, q) {
  const C1 = Math.hypot(p[1], p[2]), C2 = Math.hypot(q[1], q[2]);
  const dL = p[0] - q[0], dC = C1 - C2;
  const dH2 = Math.max(0, (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2 - dC * dC);
  return Math.sqrt(dL * dL + (dC / (1 + 0.045 * C1)) ** 2 + dH2 / (1 + 0.015 * C1) ** 2);
}

function hsvToHex(h, s, v) {
  const f = (n) => { const k = (n + h / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return rgbToHex(f(5) * 255, f(3) * 255, f(1) * 255);
}
function hexToHsv(hex) {
  const c = hexToRgb(hex);
  if (!c) return null;
  const [r, g, b] = c.map((v) => v / 255);
  const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
  let h = 0;
  if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max };
}

// Colores principales de cada pieza (hasta 6), en Lab. null = todavía no se calcularon.
const labCache = new Map();
const pending = new Set();
const failed = new Set();
let saveTimer = null;

function colorSource(inst, it) {
  if (it.kind === 'img') return inst.thumbOf(it);
  if (it.kind === 'video') return it.th ? inst.srcOf({ id: 'thumb:' + it.id }) : '';
  if (it.kind === 'link') {
    const e = embedOf(it.url);
    if (e && e.thumb) return e.thumb;
    return it.pv ? inst.srcOf({ id: 'prev:' + it.id }) : '';
  }
  return '';
}

function colorsOf(inst, it) {
  if (labCache.has(it.id)) return labCache.get(it.id);
  if (Array.isArray(it.cols)) {
    const l = it.cols.map(hexToRgb).filter(Boolean).map(rgbToLab);
    labCache.set(it.id, l);
    return l;
  }
  const avg = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(it.avg || '');
  const fallback = avg ? [rgbToLab([+avg[1], +avg[2], +avg[3]])] : [];
  if (it.kind === 'text' || failed.has(it.id)) return fallback;
  const src = colorSource(inst, it);
  if (!src) return it.kind === 'img' || it.pv ? null : fallback; // la imagen todavía se está cargando
  if (!pending.has(it.id)) {
    pending.add(it.id);
    palette(src).then(
      (hex) => { it.cols = hex; labCache.set(it.id, hex.map(hexToRgb).map(rgbToLab)); },
      () => { failed.add(it.id); labCache.set(it.id, fallback); }
    ).finally(() => {
      pending.delete(it.id);
      if (inst._dead) return;
      inst.forceUpdate();
      // Los colores calculados se guardan en la librería (una vez por tanda).
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => { if (!inst._dead) inst.commit(); }, 800);
    });
  }
  return null;
}

// Reduce la imagen a 32×32, agrupa los píxeles en 512 tonos y devuelve los más frecuentes.
function palette(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (/^https?:/.test(src)) img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const N = 32, cv = document.createElement('canvas');
        cv.width = cv.height = N;
        const g = cv.getContext('2d', { willReadFrequently: true });
        g.drawImage(img, 0, 0, N, N);
        const d = g.getImageData(0, 0, N, N).data;
        const bins = new Map();
        let total = 0;
        for (let i = 0; i < d.length; i += 4) {
          if (d[i + 3] < 128) continue;
          const k = (d[i] >> 5) * 64 + (d[i + 1] >> 5) * 8 + (d[i + 2] >> 5);
          const e = bins.get(k) || [0, 0, 0, 0];
          e[0] += d[i]; e[1] += d[i + 1]; e[2] += d[i + 2]; e[3]++;
          bins.set(k, e);
          total++;
        }
        const top = [...bins.values()].sort((p, q) => q[3] - p[3]).filter((e) => e[3] >= total * 0.04).slice(0, 6);
        resolve(top.map((e) => rgbToHex(e[0] / e[3], e[1] / e[3], e[2] / e[3])));
      } catch (err) {
        reject(err); // imagen de otro sitio sin permiso de lectura
      }
    };
    img.onerror = reject;
    img.src = src;
  });
}

// ---------- búsquedas recientes ----------

function loadRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]').filter((r) => r && (r.q || (r.cols || []).length)); } catch { return []; }
}
function pushRecent(q, cols) {
  q = q.trim();
  if (!q && !cols.length) return;
  const key = JSON.stringify([q, cols]);
  const list = [{ q, cols }].concat(loadRecent().filter((r) => JSON.stringify([r.q, r.cols || []]) !== key)).slice(0, 8);
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch { /* sin espacio */ }
}

// ---------- valores para la plantilla ----------

function st(inst) {
  if (!inst._sr) inst._sr = { q: '', cols: [], pick: null };
  return inst._sr;
}

// Arrastre en el cuadro de color o en la barra de tono.
function dragOn(inst, e, apply) {
  e.preventDefault();
  const el = e.currentTarget;
  const go = (ev) => {
    const r = el.getBoundingClientRect();
    apply(Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)), Math.max(0, Math.min(1, (ev.clientY - r.top) / r.height)));
    inst.forceUpdate();
  };
  const up = () => { window.removeEventListener('mousemove', go); window.removeEventListener('mouseup', up); };
  window.addEventListener('mousemove', go);
  window.addEventListener('mouseup', up);
  go(e);
}

export function searchVals(inst, name, vals) {
  if (!('sOn' in vals)) return;
  const S = st(inst);
  const notes = name === 'Anotador';
  const render = () => inst.forceUpdate();

  // Al abrir, el buscador arranca vacío; al cerrar, lo buscado queda en Recientes.
  const openS = vals.openS, closeS = vals.closeS;
  vals.openS = () => { Object.assign(S, { q: '', cols: [], pick: null }); openS(); };
  vals.closeS = () => { pushRecent(S.q, S.cols); closeS(); };

  const words = norm(S.q).split(/\s+/).filter(Boolean);
  const cols = S.cols.map((h) => ({ hex: h, lab: rgbToLab(hexToRgb(h)) }));
  const active = words.length > 0 || cols.length > 0;

  vals.sQ = S.q;
  vals.sPh = notes ? 'Buscar en notas…' : vals.sPh || 'Buscar por nombre, #etiqueta, sitio o color…';
  vals.sFocus = (el) => { if (el && !el._f) { el._f = true; setTimeout(() => el.focus(), 60); } };
  vals.sInput = (e) => { S.q = e.target.value; render(); };
  vals.sKey = (e) => {
    if (e.key === 'Escape') vals.closeS();
    else if (e.key === 'Enter') { pushRecent(S.q, S.cols); render(); }
    else if (e.key === 'Backspace' && !e.target.value && S.cols.length) { S.cols.pop(); render(); }
  };
  vals.sCols = S.cols.map((hex, i) => ({ hex, rm: () => { S.cols.splice(i, 1); render(); } }));
  vals.sPalOn = !notes;
  vals.sPickOn = !notes && !!S.pick;
  vals.sPalBg = S.pick ? '#fff' : 'var(--chip)';
  vals.sPalT = () => { S.pick = S.pick ? null : (S.last || { h: 0, s: 1, v: 1 }); render(); };

  if (S.pick) {
    const P = S.pick;
    const hex = hsvToHex(P.h, P.s, P.v);
    const take = (close) => {
      if (!S.cols.includes(hex)) S.cols.push(hex);
      S.last = Object.assign({}, P);
      if (close) S.pick = null;
      render();
    };
    vals.pk = {
      hex, hue: hsvToHex(P.h, 1, 1), x: (P.s * 100).toFixed(2), y: ((1 - P.v) * 100).toFixed(2), hx: (P.h / 3.6).toFixed(2),
      svDown: (e) => dragOn(inst, e, (fx, fy) => { P.s = fx; P.v = 1 - fy; }),
      hueDown: (e) => dragOn(inst, e, (fx) => { P.h = Math.min(359.9, fx * 360); }),
      hexIn: (e) => { const v = hexToHsv(e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value); if (v) Object.assign(P, v); render(); },
      hexKey: (e) => { if (e.key === 'Enter') { vals.pk.hexIn(e); take(true); } },
      more: () => take(false),
      add: () => take(true),
    };
  } else vals.pk = {};

  // Resultados.
  let res = [];
  let busy = false;
  if (active) {
    if (notes) {
      res = (inst.notes || []).filter((nt) => words.every((w) => norm(nt.title + ' ' + (nt.t || '')).includes(w.replace(/^#/, ''))))
        .map((nt) => ({ title: nt.title || 'Sin título', noImg: true, open: () => { vals.closeS(); inst.open(inst.notes.indexOf(nt)); } }));
    } else {
      let its = inst.lib().items.slice().sort((p, q) => q.t - p.t);
      if (name === 'Archivo' && inst.state.view === 'board' && inst.state.bid) its = its.filter((it) => it.bid === inst.state.bid);
      its = its.filter((it) => matchesText(inst, it, words));
      if (cols.length) {
        const scored = [];
        for (const it of its) {
          const lab = colorsOf(inst, it);
          if (lab === null) { busy = true; continue; }
          if (!lab.length) continue;
          let worst = 0;
          const ok = cols.every((c) => { const m = Math.min(...lab.map((l) => dE(c.lab, l))); worst = Math.max(worst, m); return m <= MATCH; });
          if (ok) scored.push([worst, it]);
        }
        its = scored.sort((p, q) => p[0] - q[0]).map((s) => s[1]);
      }
      res = its.map((it) => {
        const src = it.kind === 'img' ? inst.thumbOf(it) : it.kind === 'video' ? inst.srcOf(it) : it.kind === 'link' ? colorSource(inst, it) : '';
        const isVid = it.kind === 'video' && !!src;
        const isImg = !isVid && !!src;
        return {
          title: it.title || (it.kind === 'text' ? String(it.text || '').slice(0, 60) : '') || 'Sin título',
          src, isImg, isVid, noImg: !isImg && !isVid,
          open: () => { vals.closeS(); inst.setState({ edId: it.id }); },
        };
      });
    }
  }
  const total = res.length;
  vals.sRes = res.slice(0, MAX_RESULTS).map((r, i) => Object.assign(r, { d: (0.05 + Math.min(i, 12) * 0.03).toFixed(2) + 's' }));
  vals.sResOn = active && !S.pick;
  vals.sBusy = busy;
  vals.sNone = total === 0 && !busy;
  vals.sNoneLbl = notes ? 'No hay notas con eso.' : 'No encontré nada con eso.';
  vals.sResLbl = total === 1 ? '1 resultado' : total + ' resultados' + (total > MAX_RESULTS ? ' (se muestran ' + MAX_RESULTS + ')' : '');
  vals.sIdle = !active && !S.pick;

  const rec = loadRecent();
  vals.sRec = rec.map((r, i) => ({
    l: r.q, cols: r.cols || [], d: (0.3 + i * 0.05).toFixed(2) + 's',
    go: () => { Object.assign(S, { q: r.q, cols: (r.cols || []).slice(), pick: null }); render(); },
  }));
  vals.sRecAny = rec.length > 0;
  vals.sRecNone = rec.length === 0;
  vals.sRecClear = () => { try { localStorage.removeItem(RECENT_KEY); } catch { /* nada */ } render(); };
}
