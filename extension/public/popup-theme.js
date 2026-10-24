// Colores y tipografías del popup según Apariencia (localStorage 'archivero.ui.v1', el mismo que usa
// la librería: el popup y library.html comparten el origen de la extensión).
// Los tonos son los de palTones() del diseño: panel = pill, campos = field, botón claro = chip
// y la línea del borde, 14 puntos más clara que el panel (como #7a7a7a sobre #575757).
// También marca si es el panel flotante (popup.html?frame) o la ventana del popup de Chrome.
document.documentElement.className = /[?&]frame\b/.test(location.search) ? 'is-frame' : 'is-window';
try {
  var u = JSON.parse(localStorage.getItem('archivero.ui.v1') || 'null') || {};
  var P = { grafito: [0, 0], pizarra: [215, 14], oceano: [205, 38], turquesa: [178, 30], bosque: [145, 22], musgo: [80, 20], arena: [38, 24], ambar: [30, 46], terracota: [14, 40], vino: [345, 32], rosa: [325, 30], lavanda: [262, 24] }[u.pal || 'grafito'] || [0, 0];
  var dark = u.mode === 'dark';
  var c = function (l) { return 'hsl(' + P[0] + ' ' + P[1] + '% ' + l + '%)'; };
  var L = dark ? { panel: 30, field: 19, chip: 84 } : { panel: 34, field: 27, chip: 85 };
  var F = { 'Inter': "'Inter',system-ui,sans-serif", 'Manrope': "'Manrope',system-ui,sans-serif", 'Space Grotesk': "'Space Grotesk',system-ui,sans-serif", 'Fraunces': "'Fraunces',Georgia,serif", 'JetBrains Mono': "'JetBrains Mono',ui-monospace,monospace" };
  var s = document.documentElement.style;
  s.setProperty('--panel', c(L.panel));
  s.setProperty('--field', c(L.field));
  s.setProperty('--line', c(L.panel + 14));
  s.setProperty('--chip', c(L.chip));
  if (F[u.f1]) s.setProperty('--f1', F[u.f1]);
  if (F[u.f2]) s.setProperty('--f2', F[u.f2]);
} catch (e) {}
