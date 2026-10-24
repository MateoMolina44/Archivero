// Reglas, proyectos y preferencias. Viven en chrome.storage.local para que el service worker,
// el popup y la librería lean lo mismo (localStorage no existe en el service worker).
// Fuera de la extensión (vite dev / vista previa en el navegador) se usa localStorage.

const KEY = 'archivero.settings';

// Valores iniciales: los mismos ejemplos que trae el diseño (Reglas y ajustes).
export const DEFAULTS = {
  rules: [
    { id: 'r1', name: 'Pinterest → Referencias', on: true, match: 'any', conds: [{ k: 'dom', v: 'pinterest.com' }], to: '', tags: 'referencia' },
    { id: 'r2', name: 'Paleta y color', on: true, match: 'any', conds: [{ k: 'kw', v: 'paleta, color, colores' }], to: '', tags: 'paleta' },
    { id: 'r4', name: 'Capturas de pantalla', on: false, match: 'all', conds: [{ k: 'tipo', v: 'captura' }], to: '', tags: 'captura' },
  ],
  rseq: 4,
  // Proyectos: la función se sacó por ahora (era confusa); se conservan los campos por compatibilidad.
  projs: [],
  proj: 0,
  prefs: [
    { label: 'Aplicar reglas al guardar', on: true },
    { label: 'Mostrar aviso al guardar', on: true },
    { label: 'Guardar también una copia automática en este equipo', on: false },
  ],
  // Nombres de los tableros, copiados por la librería para el aviso de la extensión.
  boards: [],
  // Tablero donde guarda la extensión. Vacío = automático (lo deciden las reglas).
  dest: '',
};

const hasChrome = typeof chrome !== 'undefined' && !!chrome.storage?.local;
let cache = null;

const clone = (o) => JSON.parse(JSON.stringify(o));

// Valores guardados + valores por defecto. Las reglas que dependían de "Proyecto activo" se quitan,
// porque esa condición ya no existe.
function normalize(raw) {
  const s = Object.assign(clone(DEFAULTS), raw || {});
  s.rules = (s.rules || []).filter((r) => !(r.conds || []).some((c) => c.k === 'proj'));
  return s;
}

export async function load() {
  let raw = null;
  if (hasChrome) raw = (await chrome.storage.local.get(KEY))[KEY];
  else { try { raw = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { raw = null; } }
  cache = normalize(raw);
  return cache;
}

// Lectura sincrónica (después de load()).
export function get() {
  return cache || clone(DEFAULTS);
}

// Escrituras propias todavía sin eco: onChanged también avisa al que escribió, y un eco viejo
// pisaría cambios más nuevos (por ejemplo, mientras se tipea el nombre de una regla).
const ownWrites = new Set();

export async function save(patch) {
  cache = Object.assign(get(), clone(patch));
  const json = JSON.stringify(cache);
  if (hasChrome) {
    ownWrites.add(json);
    await chrome.storage.local.set({ [KEY]: cache });
  } else {
    try { localStorage.setItem(KEY, json); } catch { /* sin espacio */ }
  }
}

export function onChange(cb) {
  if (hasChrome) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local' || !changes[KEY]) return;
      const json = JSON.stringify(changes[KEY].newValue);
      if (ownWrites.delete(json)) return;
      cache = normalize(changes[KEY].newValue);
      cb(cache);
    });
  } else {
    window.addEventListener('storage', (e) => {
      if (e.key === KEY) load().then(cb);
    });
  }
}

// Reglas de ejemplo (las de DEFAULTS) en los tres idiomas de la interfaz. Mientras el usuario no
// las cambie, al elegir otro idioma pasan a ese idioma: nombre, palabras clave y etiquetas.
// (El valor del tipo, 'captura', es interno del motor de reglas y no se traduce.)
const SAMPLE_RULES = {
  r1: {
    es: { name: 'Pinterest → Referencias', tags: 'referencia' },
    en: { name: 'Pinterest → References', tags: 'reference' },
    pt: { name: 'Pinterest → Referências', tags: 'referência' },
  },
  r2: {
    es: { name: 'Paleta y color', kw: 'paleta, color, colores', tags: 'paleta' },
    en: { name: 'Palette and color', kw: 'palette, color, colors', tags: 'palette' },
    pt: { name: 'Paleta e cor', kw: 'paleta, cor, cores', tags: 'paleta' },
  },
  r4: {
    es: { name: 'Capturas de pantalla', tags: 'captura' },
    en: { name: 'Screenshots', tags: 'screenshot' },
    pt: { name: 'Capturas de tela', tags: 'captura' },
  },
};

const isSample = (r, v) => r.name === v.name && r.tags === v.tags && (!v.kw || r.conds.some((c) => c.k === 'kw' && c.v === v.kw));

export function localizeRules(rules, lang) {
  return rules.map((r) => {
    const s = SAMPLE_RULES[r.id];
    if (!s || !s[lang] || !Object.values(s).some((v) => isSample(r, v))) return r;
    const t = s[lang];
    return Object.assign({}, r, {
      name: t.name,
      tags: t.tags,
      conds: t.kw ? r.conds.map((c) => (c.k === 'kw' ? Object.assign({}, c, { v: t.kw }) : c)) : r.conds,
    });
  });
}

export const activeProject = (s) => s.projs[s.proj] || '';
export const pref = (s, i) => !!(s.prefs[i] && s.prefs[i].on);
export const PREF_APPLY_RULES = 0;
export const PREF_SHOW_TOAST = 1;
