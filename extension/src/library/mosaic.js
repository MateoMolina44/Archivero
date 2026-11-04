// Mosaico de la pantalla Principal (vista 2).
// En el diseño era un lienzo infinito: bloques del tamaño de la pantalla, repetidos en todas las
// direcciones y rellenados con un treemap que estiraba y recortaba las piezas.
// Acá es un solo bloque, sin repeticiones, que crece a medida que se agregan piezas,
// y cada pieza conserva sus proporciones (sin recortes ni ampliaciones por encima de su tamaño real).
// El lienzo se sigue pudiendo arrastrar sin límite; fuera del bloque queda vacío.

import { SPOTIFY_W, SPOTIFY_H } from '../core/embeds.js';

// Tamaño de cada pieza: el de mbox() del diseño, pero corrigiendo las imágenes y videos chicos
// para que nunca se deformen. Spotify toma la forma horizontal de su reproductor y los textos
// crecen con la cantidad de caracteres (área proporcional al largo, siempre apaisados).
export function mosaicBox(inst, it, spotify) {
  if (spotify) return [460, Math.round(460 * SPOTIFY_H / SPOTIFY_W)];
  if (it.kind === 'text') {
    const area = 18000 + (it.text || '').trim().length * 260;
    const w = Math.max(200, Math.min(540, Math.sqrt(area * 1.6)));
    return [Math.round(w), Math.round(Math.max(120, Math.min(340, w / 1.6)))];
  }
  let [w, h] = inst.mbox(it);
  if (it.kind === 'img' || it.kind === 'video') {
    const r = (it.ow || it.w || 800) / (it.oh || it.h || 800);
    if (w / h > r) w = h * r;
    else h = w / r;
  }
  return [Math.round(w), Math.round(h)];
}

// Acomoda las piezas en espiral: la más nueva en el centro y cada una de las siguientes en el lugar
// libre más cercano a él, siempre pegada a otra a exactamente G px. Entre los lugares posibles se
// prefieren los que tocan más vecinas (rincones y huecos), para que el bloque quede compacto. Si un
// hueco le queda chico, la pieza se achica (sin deformarse, hasta SHRINK_MIN) para cerrarlo justo.
const SHRINK_MIN = 0.6;  // tamaño mínimo al achicar una pieza para que entre en un hueco
const CONTACT = 1.2;     // cuánto pesa tocar vecinas frente a la distancia al centro
const SHRINK_COST = 0.3; // cuánto cuesta achicar (por cada px que pierde el lado mayor)
const CELL = 256;        // grilla para encontrar vecinas rápido

export function packMosaic(entries, VW, VH, G) {
  if (!entries.length) return { W: 0, H: 0, cells: [], ox: 0, oy: 0 };
  // Distancia "achatada" para que el bloque crezca con la forma de la pantalla.
  const ar = Math.max(1, Math.min(2, VW / Math.max(1, VH)));
  const dist = (cx, cy) => Math.hypot(cx / ar, cy);
  const placed = [];
  const grid = new Map();
  const key = (i, j) => i * 65536 + j;
  let stamp = 0;
  const add = (r) => {
    placed.push(r);
    for (let i = Math.floor((r.x - G) / CELL); i <= Math.floor((r.x2 + G) / CELL); i++)
      for (let j = Math.floor((r.y - G) / CELL); j <= Math.floor((r.y2 + G) / CELL); j++) {
        const k = key(i, j);
        if (!grid.has(k)) grid.set(k, []);
        grid.get(k).push(r);
      }
  };
  const near = (x1, y1, x2, y2) => {
    const out = [];
    stamp++;
    for (let i = Math.floor((x1 - G) / CELL); i <= Math.floor((x2 + G) / CELL); i++)
      for (let j = Math.floor((y1 - G) / CELL); j <= Math.floor((y2 + G) / CELL); j++) {
        const list = grid.get(key(i, j));
        if (list) for (const r of list) if (r.seen !== stamp) { r.seen = stamp; out.push(r); }
      }
    return out;
  };

  // Escala máxima (<= 1) con la que una pieza w×h, que crece desde la esquina (ax, ay) hacia
  // (dx, dy) = (±1, ±1), entra sin acercarse a menos de G de ninguna otra.
  // `around`: las piezas de una zona (zone), buscadas una sola vez por cada pieza vecina. Si el lugar
  // se sale de esa zona, se buscan las piezas del lugar mismo (si no, podría pisar una que no ve).
  const inside = (b, x1, y1, x2, y2) => x1 >= b[0] && y1 >= b[1] && x2 <= b[2] && y2 <= b[3];
  const fit = (ax, ay, dx, dy, w, h, around) => {
    const x1 = dx > 0 ? ax : ax - w, y1 = dy > 0 ? ay : ay - h;
    const list = inside(around.b, x1, y1, x1 + w, y1 + h) ? around : near(x1, y1, x1 + w, y1 + h);
    let s = 1;
    for (const q of list) {
      const ex1 = q.x - G, ex2 = q.x2 + G, ey1 = q.y - G, ey2 = q.y2 + G;
      const sx = dx > 0 ? (ax >= ex2 ? Infinity : ax < ex1 ? (ex1 - ax) / w : 0)
        : (ax <= ex1 ? Infinity : ax > ex2 ? (ax - ex2) / w : 0);
      const sy = dy > 0 ? (ay >= ey2 ? Infinity : ay < ey1 ? (ey1 - ay) / h : 0)
        : (ay <= ey1 ? Infinity : ay > ey2 ? (ay - ey2) / h : 0);
      s = Math.min(s, Math.max(sx, sy));
      if (s < SHRINK_MIN) return 0;
    }
    return s;
  };

  // Largo del borde de la pieza que queda a exactamente G de otras piezas.
  const ov = (a1, a2, b1, b2) => Math.max(0, Math.min(a2, b2) - Math.max(a1, b1));
  const contact = (x, y, x2, y2, around) => {
    let c = 0;
    for (const q of inside(around.b, x - G, y - G, x2 + G, y2 + G) ? around : near(x, y, x2, y2)) {
      if (Math.abs(q.x - G - x2) < 1 || Math.abs(x - G - q.x2) < 1) c += ov(y, y2, q.y, q.y2);
      if (Math.abs(q.y - G - y2) < 1 || Math.abs(y - G - q.y2) < 1) c += ov(x, x2, q.x, q.x2);
    }
    return c;
  };

  // Lugares posibles junto a la pieza r (y en los rincones que forma con sus vecinas). Cada uno es
  // una esquina de anclaje y hacia dónde crece la pieza desde ella.
  const zone = (r, w, h) => {
    const b = [r.x - w - 2 * G, r.y - 2 * h - 2 * G, r.x2 + w + 2 * G, r.y2 + 2 * h + 2 * G];
    const list = near(b[0], b[1], b[2], b[3]);
    list.b = b;
    return list;
  };
  const spots = (r, w, h, around) => {
    const xs = [[r.x2 + G, 1], [r.x - G, -1]];      // al lado
    const ys = [[r.y2 + G, 1], [r.y - G, -1]];      // arriba / abajo
    const ax = [[r.x, 1], [r.x2, -1]];              // alineada con un borde de r
    const ay = [[r.y, 1], [r.y2, -1]];
    const out = [];
    for (const [x, dx] of xs) for (const [y, dy] of ay) out.push([x, y, dx, dy]);
    for (const [y, dy] of ys) for (const [x, dx] of ax) out.push([x, y, dx, dy]);
    for (const q of around) {
      if (q === r || q.x2 < r.x - w || q.x > r.x2 + w || q.y2 < r.y - h || q.y > r.y2 + h) continue;
      for (const [x, dx] of xs) for (const [y, dy] of [[q.y2 + G, 1], [q.y - G, -1]]) out.push([x, y, dx, dy]);
    }
    return out;
  };

  // La pieza más chica posible: si junto a una pieza no entra ni esa, ya no entra nada (el lugar libre
  // solo se achica) y no se vuelve a mirar.
  const pw = Math.min(...entries.map((e) => e.w)) * SHRINK_MIN, ph = Math.min(...entries.map((e) => e.h)) * SHRINK_MIN;
  const open = (r) => {
    const around = zone(r, pw, ph);
    return spots(r, pw, ph, around).some(([x, y, dx, dy]) => fit(x, y, dx, dy, pw, ph, around) > 0);
  };
  let live = [];

  entries.forEach((e, n) => {
    const { w, h } = e;
    if (!n) { const r = { it: e.it, x: -w / 2, y: -h / 2, x2: w / 2, y2: h / 2, d: 0 }; add(r); live.push(r); return; }
    let best = null;
    const reach = Math.hypot(w, h);
    for (const r of live) {
      // Ninguna posición junto a r puede quedar más cerca del centro que esto: si ya se pasó, cortar.
      const low = r.d - (Math.hypot(r.x2 - r.x, r.y2 - r.y) + reach) - CONTACT * 2 * (w + h);
      if (best && low > best.score) break;
      // Si al lado de r ya no entró una pieza igual o más chica, esta tampoco (el lugar solo se achica).
      if (r.fail && r.fail.some(([fw, fh]) => w >= fw && h >= fh)) continue;
      let any = false;
      const around = zone(r, w, h);
      for (const [x, y, dx, dy] of spots(r, w, h, around)) {
        const s = fit(x, y, dx, dy, w, h, around);
        if (!s) continue;
        any = true;
        const sw = w * s, sh = h * s;
        const x1 = dx > 0 ? x : x - sw, y1 = dy > 0 ? y : y - sh;
        const score = dist(x1 + sw / 2, y1 + sh / 2)
          - CONTACT * contact(x1, y1, x1 + sw, y1 + sh, around)
          + SHRINK_COST * (1 - s) * Math.max(w, h);
        if (!best || score < best.score - 0.01) best = { score, x: x1, y: y1, x2: x1 + sw, y2: y1 + sh };
      }
      if (!any) {
        if (!open(r)) r.dead = true;
        else (r.fail || (r.fail = [])).push([w, h]);
      }
    }
    const r = { it: e.it, x: best.x, y: best.y, x2: best.x2, y2: best.y2, d: dist((best.x + best.x2) / 2, (best.y + best.y2) / 2) };
    add(r);
    // Las vecinas de la pieza nueva pueden haber quedado sin lugar libre al lado.
    for (const q of near(r.x - pw, r.y - ph, r.x2 + pw, r.y2 + ph)) if (!q.dead && q !== r && !open(q)) q.dead = true;
    live = live.filter((q) => !q.dead);
    live.splice(live.findIndex((q) => q.d > r.d) >>> 0, 0, r); // ordenadas por distancia al centro
  });

  const mx = Math.min(...placed.map((r) => r.x)), my = Math.min(...placed.map((r) => r.y));
  const cells = placed.map((r) => {
    const x = Math.round(r.x - mx), y = Math.round(r.y - my);
    return { it: r.it, x, y, w: Math.round(r.x2 - mx) - x, h: Math.round(r.y2 - my) - y };
  });
  const W = Math.max(...cells.map((c) => c.x + c.w)), H = Math.max(...cells.map((c) => c.y + c.h));
  // (ox, oy): el centro de la pieza más nueva, para encuadrar la vista ahí.
  return { W, H, cells, ox: cells[0].x + cells[0].w / 2, oy: cells[0].y + cells[0].h / 2 };
}

// Encuadre inicial: si el mosaico entra en la pantalla queda centrado; si no, se centra en (px, py)
// (la pieza más nueva) sin dejar más margen que el del buscador y la botonera.
export function clampPan(W, H, VW, VH, px, py) {
  const PAD = { l: 40, r: 40, t: 84, b: 104 };
  const axis = (size, view, a, b, p) =>
    size + a + b <= view ? Math.round((view - size + a - b) / 2) : Math.min(a, Math.max(view - size - b, p));
  return [axis(W, VW, PAD.l, PAD.r, px), axis(H, VH, PAD.t, PAD.b, py)];
}
