// Mosaico de la pantalla Principal (vista 2).
// En el diseño era un lienzo infinito: bloques del tamaño de la pantalla, repetidos en todas las
// direcciones y rellenados con un treemap que estiraba y recortaba las piezas.
// Acá es un solo bloque, sin repeticiones, que crece a medida que se agregan piezas,
// y cada pieza conserva sus proporciones (sin recortes ni ampliaciones por encima de su tamaño real).

const STEP = 4; // resolución del perfil de alturas, en px

// Tamaño de cada pieza: el de mbox() del diseño, pero corrigiendo las imágenes y videos chicos
// para que nunca se deformen.
export function mosaicBox(inst, it) {
  let [w, h] = inst.mbox(it);
  if (it.kind === 'img' || it.kind === 'video') {
    const r = (it.ow || it.w || 800) / (it.oh || it.h || 800);
    if (w / h > r) w = h * r;
    else h = w / r;
  }
  return [Math.round(w), Math.round(h)];
}

// Acomoda las piezas, en orden (lo más nuevo primero), en un ancho fijo: cada una cae en la
// posición más alta libre (perfil de alturas tipo "skyline").
export function packMosaic(entries, VW, VH, G) {
  if (!entries.length) return { W: 0, H: 0, cells: [] };
  const area = entries.reduce((t, e) => t + (e.w + G) * (e.h + G), 0);
  const widest = Math.max(...entries.map((e) => e.w));
  // Proporción parecida a la de la pantalla, sin pasarse del ancho que entra en ella.
  const ideal = Math.sqrt(area * 1.2 * (VW / Math.max(1, VH)));
  const W = Math.round(Math.max(widest, Math.min(ideal, VW - 80)));
  const cols = new Array(Math.ceil((W + G) / STEP)).fill(0);
  const cells = [];
  for (const e of entries) {
    const span = Math.max(1, Math.ceil((e.w + G) / STEP));
    let bestY = Infinity, bestS = 0;
    for (let s = 0; s + span <= cols.length; s++) {
      let y = 0;
      for (let k = s; k < s + span; k++) if (cols[k] > y) y = cols[k];
      if (y < bestY) { bestY = y; bestS = s; }
    }
    const x = bestS * STEP;
    cells.push({ it: e.it, x, y: bestY, w: e.w, h: e.h });
    for (let k = bestS; k < bestS + span; k++) cols[k] = bestY + e.h + G;
  }
  const right = Math.max(...cells.map((c) => c.x + c.w));
  const H = Math.max(...cols) - G;
  return { W: right, H, cells };
}

// Encuadre: si el mosaico entra en la pantalla queda centrado; si no, se puede recorrer
// solo hasta sus bordes (con margen para el buscador y la botonera).
export function clampPan(W, H, VW, VH, px, py) {
  const PAD = { l: 40, r: 40, t: 84, b: 104 };
  const axis = (size, view, a, b, p) =>
    size + a + b <= view ? Math.round((view - size + a - b) / 2) : Math.min(a, Math.max(view - size - b, p));
  return [axis(W, VW, PAD.l, PAD.r, px), axis(H, VH, PAD.t, PAD.b, py)];
}
