// Nube (Supabase): inicio de sesión con Google y sincronización de la librería entre la extensión,
// la web y otras computadoras. La librería sigue viviendo en el navegador como siempre; esto la copia
// a la cuenta y trae lo que se hizo en otro lado. Tablas y reglas de acceso: supabase/schema.sql.
//
// Cada cosa (pieza, tablero, nota, ajustes) es una fila de public.entities. Para saber qué cambió de
// cada lado se guarda la huella de cada fila tal como quedó en la última sincronización:
// - si lo local cambió desde entonces, gana lo local (se sube);
// - si no, se aplica lo que llegó de la nube.
// Las imágenes y videos van al bucket 'media', en <id del usuario>/<clave del medio>.

import { createClient } from '@supabase/supabase-js';
import { openDB, mediaGet } from '../core/db.js';
import * as settings from '../core/settings.js';
import { notesBackup, restoreNotes, NOTES_KEY } from './notes.js';

const SUPABASE_URL = 'https://dwtjnftbfdcswrojnzec.supabase.co';
// Clave pública (publishable): está pensada para ir dentro de la app; las reglas RLS protegen los datos.
const SUPABASE_KEY = 'sb_publishable_EcPpVIWQA4FivRirPsAPlA_UCtm1Ll3';
const STATE_KEY = 'archivero.cloud.v1';
const BACK_KEY = 'archivero.cloud.back';
const MAX_FILE = 50 * 1024 * 1024; // límite por archivo del plan gratis
const OVERLAP = 60 * 1000; // se vuelve a pedir el último minuto, por si una escritura llegó tarde

const isExt = typeof chrome !== 'undefined' && !!(chrome.identity && chrome.identity.launchWebAuthFlow);

const sb = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { flowType: 'pkce', detectSessionInUrl: !isExt, persistSession: true, autoRefreshToken: true },
});

// Estado para la pestaña Nube y copia.
const status = { user: null, phase: 'idle', msg: '', last: 0 };
let inst = null;
let timer = null;
let running = null;
let again = false;

function redraw() {
  if (inst && !inst._dead) inst.forceUpdate();
}

function set(p) {
  Object.assign(status, p);
  redraw();
}

// ---------- sesión ----------

export async function startCloud() {
  sb.auth.onAuthStateChange((ev, session) => {
    const user = session ? session.user : null;
    const changed = (user && user.id) !== (status.user && status.user.id);
    set({ user });
    if (changed && user) schedule(0);
  });
  const { data } = await sb.auth.getSession();
  set({ user: data.session ? data.session.user : null });
  // Volvió del inicio de sesión en la web: a la pantalla donde estaba.
  const back = sessionStorage.getItem(BACK_KEY);
  if (back !== null) {
    sessionStorage.removeItem(BACK_KEY);
    if (back && location.hash !== back) location.hash = back;
  }
  if (status.user) schedule(0);
  setInterval(() => schedule(0), 2 * 60 * 1000);
  window.addEventListener('focus', () => schedule(500));
}

export function attachCloud(screen) {
  inst = screen;
}

async function signIn() {
  set({ phase: 'idle', msg: '' });
  try {
    if (isExt) {
      // En la extensión, Google vuelve a https://<id>.chromiumapp.org/ y Chrome nos pasa esa dirección.
      const redirectTo = chrome.identity.getRedirectURL();
      const { data, error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo, skipBrowserRedirect: true } });
      if (error) throw error;
      const back = await chrome.identity.launchWebAuthFlow({ url: data.url, interactive: true });
      const code = back && new URL(back).searchParams.get('code');
      if (!code) throw new Error('Google no devolvió el código de acceso.');
      const r = await sb.auth.exchangeCodeForSession(code);
      if (r.error) throw r.error;
    } else {
      sessionStorage.setItem(BACK_KEY, location.hash);
      const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + location.pathname } });
      if (error) throw error;
    }
  } catch (e) {
    if (/cancel|closed|did not approve/i.test(String(e && e.message))) return;
    set({ phase: 'error', msg: errText(e) });
  }
}

async function signOut() {
  await sb.auth.signOut().catch(() => {});
  try { localStorage.removeItem(STATE_KEY); } catch { /* sin acceso */ }
  set({ user: null, phase: 'idle', msg: '', last: 0 });
}

// ---------- sincronización ----------

export function schedule(ms = 4000) {
  if (!status.user) return;
  clearTimeout(timer);
  timer = setTimeout(() => { sync(); }, ms);
}

function sync() {
  if (running) { again = true; return running; }
  running = (async () => {
    try {
      do {
        again = false;
        await syncOnce();
      } while (again);
      set({ phase: 'idle', msg: '', last: Date.now() });
    } catch (e) {
      console.warn('[Archivero] No se pudo sincronizar', e);
      set({ phase: 'error', msg: errText(e) });
    } finally {
      running = null;
    }
  })();
  return running;
}

function loadState(uid) {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STATE_KEY) || 'null'); } catch { s = null; }
  if (!s || s.uid !== uid) s = { uid, cursor: '', h: {}, up: {} };
  return s;
}

function saveState(s) {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(s)); } catch { /* sin espacio */ }
}

async function syncOnce() {
  if (!inst || inst._dead || !inst.lib || !status.user) return;
  const st = loadState(status.user.id);
  set({ phase: 'sync', msg: 'Sincronizando…' });

  // 1. Lo que cambió en la nube desde la última vez.
  const rows = await pull(st.cursor);
  const touched = applyRows(st, rows);
  if (rows.length) st.cursor = new Date(new Date(rows[rows.length - 1].updated_at).getTime() - OVERLAP).toISOString();
  if (touched) {
    dedupeBoards(inst.lib());
    inst._ml = false;
    inst.commitNow();
  }
  saveState(st);

  // 2. Lo que cambió acá: se sube.
  const gone = await push(st);
  saveState(st);
  if (gone.length) await sb.storage.from('media').remove(gone.map(path)).catch(() => {});

  // 3. Imágenes y videos.
  await syncMedia(st);
  saveState(st);
}

async function pull(cursor) {
  let out = [];
  for (let from = 0; ; from += 1000) {
    let q = sb.from('entities').select('kind,id,data,deleted,updated_at').order('updated_at').range(from, from + 999);
    if (cursor) q = q.gte('updated_at', cursor);
    const { data, error } = await q;
    if (error) throw error;
    out = out.concat(data);
    if (data.length < 1000) return out;
  }
}

// Todo lo que se sincroniza, con la clave "tipo:id".
function localEntities() {
  const L = inst.lib();
  const m = new Map();
  L.items.forEach((it) => m.set('item:' + it.id, it));
  L.boards.forEach((b) => m.set('board:' + b.id, b));
  const N = notesBackup();
  N.notes.forEach((n) => m.set('note:' + n.id, n));
  m.set('meta:lib', { bsort: L.bsort || 'recent', bman: L.bman || [] });
  m.set('meta:notes', { nsort: N.nsort || 'recent' });
  const s = settings.get();
  m.set('meta:settings', { rules: s.rules, rseq: s.rseq, prefs: s.prefs });
  if (inst.ui) m.set('meta:ui', inst.ui());
  return m;
}

function applyRows(st, rows) {
  if (!rows.length) return false;
  const local = localEntities();
  const L = inst.lib();
  let notes = null;
  let touched = false;
  for (const r of rows) {
    const key = r.kind + ':' + r.id;
    const cur = local.get(key);
    const curH = cur === undefined ? null : hash(cur);
    const remoteH = r.deleted ? null : hash(r.data);
    if (curH === remoteH) { setH(st, key, remoteH); continue; }
    // Cambió acá desde la última sincronización: gana lo local, que se sube después.
    if (curH !== (st.h[key] || null)) continue;
    touched = true;
    setH(st, key, remoteH);
    if (r.kind === 'item') {
      L.items = L.items.filter((x) => x.id !== r.id);
      if (!r.deleted) L.items.push(r.data);
      else ['', 'thumb:', 'prev:'].forEach((p) => inst.mediaDel(p + r.id));
    } else if (r.kind === 'board') {
      const i = L.boards.findIndex((x) => x.id === r.id);
      if (r.deleted) { if (i >= 0) L.boards.splice(i, 1); inst.mediaDel('cover:' + r.id); }
      else if (i >= 0) L.boards[i] = r.data;
      else L.boards.push(r.data);
    } else if (r.kind === 'note') {
      notes = notes || notesBackup();
      notes.notes = notes.notes.filter((x) => x.id !== r.id);
      if (!r.deleted) notes.notes.unshift(r.data);
    } else if (r.kind === 'meta' && !r.deleted) {
      if (r.id === 'lib') Object.assign(L, r.data);
      else if (r.id === 'notes') { notes = notes || notesBackup(); notes.nsort = r.data.nsort; }
      else if (r.id === 'settings') { settings.save(r.data); inst.rules = null; }
      else if (r.id === 'ui' && inst.uiSet) inst.uiSet(r.data);
    }
  }
  if (notes) {
    if (notes.nsort === 'recent') notes.notes.sort((a, b) => (b.ct || 0) - (a.ct || 0));
    restoreNotes(notes);
  }
  return touched;
}

// Cada computadora crea sus propios "Sin clasificar" o "Mi primer tablero": al juntarse quedan
// repetidos. Se queda el más antiguo (el mismo en todas las computadoras) con todas las piezas.
function dedupeBoards(L) {
  const byName = new Map();
  for (const b of L.boards.slice().sort((a, c) => (a.t || 0) - (c.t || 0) || (a.id < c.id ? -1 : 1))) {
    const k = (b.name || '').trim().toLowerCase();
    const keep = byName.get(k);
    if (!keep) { byName.set(k, b); continue; }
    L.items.forEach((it) => { if (it.bid === b.id) it.bid = keep.id; });
    keep.man = (keep.man || []).concat((b.man || []).filter((id) => !(keep.man || []).includes(id)));
    L.boards = L.boards.filter((x) => x !== b);
    L.bman = (L.bman || []).filter((id) => id !== b.id);
  }
}

// Sube lo que cambió acá. Devuelve los medios de lo borrado, para sacarlos también de la nube.
async function push(st) {
  const local = localEntities();
  const up = [];
  const hs = [];
  const gone = [];
  for (const [key, obj] of local) {
    const h = hash(obj);
    if (st.h[key] === h) continue;
    const [kind, id] = split(key);
    up.push({ kind, id, data: obj, deleted: false });
    hs.push([key, h]);
  }
  for (const key of Object.keys(st.h)) {
    if (local.has(key)) continue;
    const [kind, id] = split(key);
    up.push({ kind, id, data: null, deleted: true });
    hs.push([key, null]);
    if (kind === 'item') gone.push(id, 'thumb:' + id, 'prev:' + id);
    if (kind === 'board') gone.push('cover:' + id);
  }
  for (let i = 0; i < up.length; i += 200) {
    if (up.length > 200) set({ msg: 'Subiendo cambios (' + Math.min(i + 200, up.length) + ' de ' + up.length + ')…' });
    const { error } = await sb.from('entities').upsert(up.slice(i, i + 200), { onConflict: 'user_id,kind,id' });
    if (error) throw error;
    hs.slice(i, i + 200).forEach(([key, h]) => setH(st, key, h));
  }
  gone.forEach((k) => { delete st.up[k]; });
  return gone;
}

// Medios que usa la librería: el original de cada imagen o video, su miniatura, la vista previa de
// los enlaces y la portada de cada tablero.
function mediaKeys() {
  const L = inst.lib();
  const keys = [];
  L.items.forEach((it) => {
    if ((it.kind === 'img' || it.kind === 'video') && !it.src) keys.push(it.id);
    if (it.th) keys.push('thumb:' + it.id);
    if (it.pv) keys.push('prev:' + it.id);
  });
  L.boards.forEach((b) => { if (b.coverUp) keys.push('cover:' + b.id); });
  return keys;
}

async function syncMedia(st) {
  const db = await openDB();
  const have = new Set(await new Promise((res) => {
    const r = db.transaction('media').objectStore('media').getAllKeys();
    r.onsuccess = () => res(r.result);
    r.onerror = () => res([]);
  }));
  const keys = mediaKeys();
  const toUp = keys.filter((k) => have.has(k) && !st.up[k] && k !== NOTES_KEY);
  const toDown = keys.filter((k) => !have.has(k));

  let n = 0;
  await pool(toUp, 3, async (k) => {
    set({ msg: 'Subiendo imágenes (' + ++n + ' de ' + toUp.length + ')…' });
    let v = await mediaGet(k).catch(() => null);
    if (typeof v === 'string') v = await (await fetch(v)).blob().catch(() => null);
    if (!(v instanceof Blob)) return;
    if (v.size > MAX_FILE) { st.up[k] = 'big'; return; }
    const { error } = await sb.storage.from('media').upload(path(k), v, { upsert: true, contentType: v.type || 'application/octet-stream' });
    if (error) throw error;
    st.up[k] = 1;
  });
  saveState(st);

  n = 0;
  let got = 0;
  await pool(toDown, 3, async (k) => {
    set({ msg: 'Bajando imágenes (' + ++n + ' de ' + toDown.length + ')…' });
    const { data, error } = await sb.storage.from('media').download(path(k));
    if (error || !data) return; // todavía no se subió desde la otra computadora
    inst.mediaPut(k, data);
    st.up[k] = 1;
    got++;
  });
  if (got) { inst._urls = {}; inst._ml = false; redraw(); }
}

async function pool(list, size, fn) {
  let i = 0;
  const run = async () => { while (i < list.length) await fn(list[i++]); };
  await Promise.all(Array.from({ length: Math.min(size, list.length) }, run));
}

const path = (k) => status.user.id + '/' + k.replace(/[^A-Za-z0-9._-]/g, '_');
const split = (key) => { const i = key.indexOf(':'); return [key.slice(0, i), key.slice(i + 1)]; };
const setH = (st, key, h) => { if (h === null) delete st.h[key]; else st.h[key] = h; };

// Huella de un objeto. Las claves se ordenan: la base devuelve el JSON con otro orden.
function canon(v) {
  if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  if (v && typeof v === 'object') return '{' + Object.keys(v).sort().filter((k) => v[k] !== undefined).map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
  return JSON.stringify(v === undefined ? null : v);
}
function hash(v) {
  const s = canon(v);
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(36) + (h1 >>> 0).toString(36) + ':' + s.length;
}

function errText(e) {
  const m = (e && (e.message || e.error_description)) || String(e);
  if (/fetch|network/i.test(m)) return 'sin conexión.';
  return m;
}

// ---------- pestaña Nube y copia ----------

function when(t) {
  const d = new Date(t);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function cloudVals() {
  const s = status;
  const who = s.user ? s.user.email || '' : '';
  let line;
  if (!s.user) line = 'Iniciá sesión con Google para usar tu librería en cualquier computadora.';
  else if (s.phase === 'sync') line = s.msg || 'Sincronizando…';
  else if (s.phase === 'error') line = 'No se pudo sincronizar: ' + s.msg;
  else if (s.last) line = 'Conectada como ' + who + ' · última sincronización ' + when(s.last);
  else line = 'Conectada como ' + who;
  return {
    status: line,
    out: !s.user,
    in: !!s.user,
    signIn: () => { signIn(); },
    sync: () => { if (status.user) sync(); },
    signOut: () => { signOut(); },
  };
}
