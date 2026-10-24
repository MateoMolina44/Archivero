// Copia del script del <head> de los .dc.html (en MV3 no se permiten scripts inline).
try {
  var u = JSON.parse(localStorage.getItem('archivero.ui.v1') || 'null') || {};
  var P = { grafito: [0, 0], pizarra: [215, 14], oceano: [205, 38], turquesa: [178, 30], bosque: [145, 22], musgo: [80, 20], arena: [38, 24], ambar: [30, 46], terracota: [14, 40], vino: [345, 32], rosa: [325, 30], lavanda: [262, 24] }[u.pal || 'grafito'] || [0, 0];
  document.documentElement.style.background = 'hsl(' + P[0] + ' ' + P[1] + '% ' + (u.mode === 'dark' ? 9 : 85) + '%)';
} catch (e) {}
