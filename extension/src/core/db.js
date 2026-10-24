// IndexedDB compartida por el service worker, el popup y la librería (mismo origen de la extensión).
// - media: medios de cada pieza, con las claves del diseño: id (original), thumb:id, cover:boardId.
// - inbox: lo que guarda la extensión mientras la librería no lo incorporó todavía
//   ({ op: 'add', item } o { op: 'patch', id, patch }). La librería lo vacía al abrirse.
// Las stores de la versión anterior (items, collections, …) quedan sin usar.

const DB_NAME = 'archivero';
const DB_VERSION = 2;

let dbPromise;
const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('archivero') : null;

export function onChange(cb) {
  if (!channel) return () => {};
  const handler = (e) => cb(e.data);
  channel.addEventListener('message', handler);
  return () => channel.removeEventListener('message', handler);
}

export function notify(store) {
  channel?.postMessage({ store });
}

export function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('media')) db.createObjectStore('media');
      if (!db.objectStoreNames.contains('inbox')) db.createObjectStore('inbox', { autoIncrement: true });
    };
    req.onsuccess = () => {
      const db = req.result;
      // Si otra pestaña necesita actualizar la base, soltamos la conexión (si no, la bloqueamos).
      db.onversionchange = () => { db.close(); dbPromise = null; };
      resolve(db);
    };
    req.onerror = () => { dbPromise = null; reject(req.error); };
    // Una pestaña vieja (versión anterior o el prototipo) tiene la base abierta y no la suelta.
    req.onblocked = () => console.warn('[Archivero] Hay otra pestaña con una versión vieja de Archivero abierta: cerrala para que carguen las imágenes.');
  });
  return dbPromise;
}

const done = (t) =>
  new Promise((resolve, reject) => {
    t.oncomplete = () => resolve();
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  });

export async function mediaGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const r = db.transaction('media').objectStore('media').get(key);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

export async function mediaPut(key, value) {
  const db = await openDB();
  const t = db.transaction('media', 'readwrite');
  t.objectStore('media').put(value, key);
  await done(t);
}

export async function inboxAdd(op) {
  const db = await openDB();
  const t = db.transaction('inbox', 'readwrite');
  t.objectStore('inbox').add(op);
  await done(t);
  notify('inbox');
}

// Devuelve [{ key, op }] en el orden en que se guardaron.
export async function inboxAll() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const out = [];
    const r = db.transaction('inbox').objectStore('inbox').openCursor();
    r.onsuccess = () => {
      const c = r.result;
      if (!c) return resolve(out);
      out.push({ key: c.key, op: c.value });
      c.continue();
    };
    r.onerror = () => reject(r.error);
  });
}

export async function inboxDel(keys) {
  if (!keys.length) return;
  const db = await openDB();
  const t = db.transaction('inbox', 'readwrite');
  const os = t.objectStore('inbox');
  for (const k of keys) os.delete(k);
  await done(t);
}
