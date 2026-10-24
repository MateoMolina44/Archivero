// Reglas, proyectos y preferencias. Viven en chrome.storage.local para que el service worker,
// el popup y la librería lean lo mismo (localStorage no existe en el service worker).
// Fuera de la extensión (vite dev / vista previa en el navegador) se usa localStorage.

const KEY = 'archivero.settings';

// Valores iniciales: los mismos ejemplos que trae el diseño (Reglas y ajustes).
export const DEFAULTS = {
  rules: [
    { id: 'r1', name: 'Pinterest → Referencias', on: true, match: 'any', conds: [{ k: 'dom', v: 'pinterest.com' }], to: '', tags: 'referencia' },
    { id: 'r2', name: 'Paleta y color', on: true, match: 'any', conds: [{ k: 'kw', v: 'paleta, color, colores' }], to: '', tags: 'paleta' },
    { id: 'r3', name: 'Lo que guardo en mi proyecto', on: true, match: 'all', conds: [{ k: 'proj', v: 'Interfaz western' }, { k: 'tipo', v: 'imagen' }], to: '', tags: 'interfaz-western' },
    { id: 'r4', name: 'Capturas de pantalla', on: false, match: 'all', conds: [{ k: 'tipo', v: 'captura' }], to: '', tags: 'captura' },
  ],
  rseq: 4,
  projs: ['Interfaz western', 'Tren de la morgue', 'Estudio Manteca Games'],
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

export async function load() {
  let raw = null;
  if (hasChrome) raw = (await chrome.storage.local.get(KEY))[KEY];
  else { try { raw = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { raw = null; } }
  cache = Object.assign(clone(DEFAULTS), raw || {});
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
      cache = Object.assign(clone(DEFAULTS), changes[KEY].newValue || {});
      cb(cache);
    });
  } else {
    window.addEventListener('storage', (e) => {
      if (e.key === KEY) load().then(cb);
    });
  }
}

export const activeProject = (s) => s.projs[s.proj] || '';
export const pref = (s, i) => !!(s.prefs[i] && s.prefs[i].on);
export const PREF_APPLY_RULES = 0;
export const PREF_SHOW_TOAST = 1;
