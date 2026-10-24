// Persistencia de las notas del Anotador (en el diseño vivían solo en memoria).
// Se guardan en la store 'media' de IndexedDB bajo una sola clave: { notes, seq, nsort }.
// Las imágenes y portadas de las notas ya son data URLs, así que todo el objeto se guarda tal cual.

import { mediaGet, mediaPut } from '../core/db.js';

const KEY = 'notes:v1';
let data = { notes: [], seq: 0, nsort: 'recent' };
let saved = '';
let timer = null;
let inst = null;
let onSaved = null;

// Aviso de cada guardado (la nube lo usa para sincronizar).
export function onNotesSaved(cb) {
  onSaved = cb;
}

export async function loadNotes() {
  try {
    const d = await mediaGet(KEY);
    if (d && Array.isArray(d.notes)) data = d;
  } catch (e) {
    console.warn('[Archivero] No se pudieron leer las notas', e);
  }
  saved = JSON.stringify(data);
}

function flush() {
  clearTimeout(timer);
  timer = null;
  if (!inst) return;
  data = { notes: inst.notes, seq: inst.seq, nsort: inst.nsort || 'recent' };
  const json = JSON.stringify(data);
  if (json === saved) return;
  saved = json;
  mediaPut(KEY, JSON.parse(json)).catch((e) => console.warn('[Archivero] No se pudieron guardar las notas', e));
  if (onSaved) onSaved();
}

// Conecta una instancia nueva del Anotador con las notas guardadas.
export function attachNotes(anotador) {
  inst = anotador;
  anotador.notes = data.notes;
  anotador.seq = data.seq || 0;
  anotador.nsort = data.nsort || 'recent';
  // Cada render puede venir de un cambio (escribir, dibujar, mover una imagen…):
  // como mucho cada 600 ms se compara con lo ya guardado y se guarda si cambió.
  // (No se reinicia el plazo: las animaciones renderizan seguido y lo postergarían.)
  const render = anotador._render;
  anotador._render = () => {
    render();
    if (!timer) timer = setTimeout(flush, 600);
  };
}

export function detachNotes() {
  flush();
  inst = null;
}

window.addEventListener('pagehide', flush);

// Copia local: las notas actuales (las de la pantalla abierta, si el Anotador está a la vista)…
export function notesBackup() {
  if (inst) data = { notes: inst.notes, seq: inst.seq, nsort: inst.nsort || 'recent' };
  return JSON.parse(JSON.stringify(data));
}

// …y al restaurar una copia, reemplazan a las guardadas.
export function restoreNotes(d) {
  data = { notes: d.notes, seq: d.seq || d.notes.length, nsort: d.nsort || 'recent' };
  saved = JSON.stringify(data);
  mediaPut(KEY, JSON.parse(saved)).catch((e) => console.warn('[Archivero] No se pudieron guardar las notas', e));
  if (inst) { inst.notes = data.notes; inst.seq = data.seq; inst.nsort = data.nsort; inst._render(); }
}

export const NOTES_KEY = KEY;
