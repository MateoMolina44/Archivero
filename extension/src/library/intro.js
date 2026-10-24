// Intro del mosaico con el logo (Figma "Frame Animacion 1–6"): en lugar del cubo gira un cajón en 3D
// mientras el contador sube a 100 %, termina de frente (el logo: un rectángulo redondeado con una
// línea arriba), la cámara se acerca hasta que el frente llena la pantalla y aparecen los mosaicos.
// Los tiempos y el giro son los de la intro del diseño (introVals de Main.dc.html); acá cambia el
// modelo y hasta dónde se acerca la cámara. Los colores salen del tema (--bg, --ink, --t1…--t4).
//
// El cajón se arma con capas apiladas en profundidad (así los bordes redondeados también tienen volumen):
// - frente: el logo, de 174×150, con borde y tirador del color de la tinta;
// - el grosor del frente, del mismo color que el borde;
// - el cuerpo, un poco más chico, como la caja de un cajón detrás de su frente;
// - el tirador sobresale unos píxeles del frente.

const W = 174, H = 150, R = 24, STROKE = 7;
const PANEL = 12; // grosor del frente
const DEPTH = 110; // profundidad total
const STEP = 3; // separación entre capas
const INSET = 10; // cuánto más chica es la caja que el frente

function layer(z, style) {
  return '<div class="dw-l" style="transform:translateZ(' + z + 'px);' + style + '"></div>';
}

function drawer() {
  let html = '';
  // Del fondo hacia adelante, para que el orden de pintado ayude cuando no hay profundidad real.
  for (let z = -DEPTH; z < -PANEL; z += STEP) {
    const k = Math.round(((z + DEPTH) / (DEPTH - PANEL)) * 100); // 0 atrás … 100 adelante
    html += layer(z, 'inset:' + INSET + 'px;border-radius:' + (R - INSET / 2) + 'px;background:color-mix(in srgb,var(--t1) ' + k + '%,var(--t4))');
  }
  for (let z = -PANEL; z < 0; z += STEP) html += layer(z, 'border-radius:' + R + 'px;background:var(--ink)');
  html += layer(0, 'border-radius:' + R + 'px;background:var(--bg);border:' + STROKE + 'px solid var(--ink)');
  // Tirador: la línea del logo, al 35 % del alto y al 76 % del ancho.
  const hw = Math.round(W * 0.76), hx = Math.round((W - hw) / 2), hy = Math.round(H * 0.35 - STROKE / 2);
  for (let z = 0; z <= 4; z += 2) {
    html += layer(z + 0.5, 'left:' + hx + 'px;top:' + hy + 'px;width:' + hw + 'px;height:' + STROKE + 'px;border-radius:' + STROKE + 'px;background:var(--ink)');
  }
  return html;
}

const START = '<div style="position:relative;width:150px;height:150px;perspective:900px">';
const PCT = '<div style="font-size:15px;font-weight:600;color:var(--muted);';

export function patchIntroTemplate(template) {
  const a = template.indexOf(START);
  const b = template.indexOf(PCT);
  if (a < 0 || b < a) {
    console.warn('[Archivero] El diseño de la intro cambió: queda el cubo.');
    return template;
  }
  const model = '<div style="position:relative;width:' + W + 'px;height:' + H + 'px;perspective:900px">'
    + '<div style="{{io.cube}}">' + drawer() + '</div></div>\n    ';
  // El porcentaje, chico y en negrita como en Figma.
  return template.slice(0, a) + model + '<div style="font-size:12px;font-weight:700;color:var(--ink);' + template.slice(b + PCT.length);
}

// La cámara se acerca hasta que el frente mide ~4,6 veces más (como en el cuadro 2 de Figma) en lugar
// de atravesar el modelo: con perspectiva de 900 px, 900·(1 − 1/4,6) ≈ 700 px.
export function introVals(vals) {
  if (vals.io && vals.io.cube) vals.io.cube = vals.io.cube.replace('translateZ(1150px)', 'translateZ(700px)');
}
