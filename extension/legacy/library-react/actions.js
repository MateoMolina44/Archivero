import { del, put, putMany, exportAll, importAll, getMeta, setMeta, INBOX_ID } from '../core/db.js';
import { applyRules } from '../core/rules.js';
import { uid } from '../core/util.js';

export const updateItem = (item, patch) => put('items', { ...item, ...patch, updatedAt: Date.now() });

export async function deleteItem(id) {
  await del('items', id);
  await del('blobs', id);
}

export async function addCollection(name, color = '#a1a1aa') {
  const c = { id: uid(), name: name.trim(), color, createdAt: Date.now() };
  await put('collections', c);
  return c;
}

export async function deleteCollection(id, items) {
  // los ítems de esa colección vuelven a "Sin clasificar"
  await putMany('items', items.filter((i) => i.collectionId === id).map((i) => ({ ...i, collectionId: INBOX_ID })));
  await del('collections', id);
}

export async function addProject(name) {
  const p = { id: uid(), name: name.trim(), createdAt: Date.now() };
  await put('projects', p);
  return p;
}

export async function deleteProject(id, items) {
  await putMany('items', items.filter((i) => i.projectId === id).map((i) => ({ ...i, projectId: null })));
  await del('projects', id);
}

// Vuelve a pasar las reglas por los ítems. scope: 'inbox' (solo sin clasificar) o 'all'.
export async function reapplyRules(items, rules, scope = 'inbox') {
  const target = items.filter((i) => scope === 'all' || i.collectionId === INBOX_ID);
  const changed = [];
  for (const item of target) {
    const res = applyRules(item, rules);
    const next = {
      ...item,
      type: res.type,
      tags: [...new Set([...(item.tags || []), ...res.tags])],
      collectionId: res.collectionId || item.collectionId || INBOX_ID,
      autoRules: res.matched,
    };
    if (JSON.stringify(next) !== JSON.stringify(item)) changed.push(next);
  }
  if (changed.length) await putMany('items', changed);
  return changed.length;
}

export const saveRule = (rule) => put('rules', rule);
export const deleteRule = (id) => del('rules', id);

export async function downloadBackup() {
  const data = await exportAll();
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `archivero-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export async function restoreBackup(file) {
  const data = JSON.parse(await file.text());
  return importAll(data);
}

// ---------- buscador: recientes y últimos vistos ----------
export async function pushRecentSearch(q) {
  const term = q.trim();
  if (!term) return;
  const list = await getMeta('recentSearches', []);
  await setMeta('recentSearches', [term, ...list.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 8));
}
export const clearRecentSearches = () => setMeta('recentSearches', []);

// "Últimos vistos": solo cuenta cuando abrís un elemento (click).
export async function pushRecentViewed(id) {
  const list = await getMeta('recentViewed', []);
  await setMeta('recentViewed', [id, ...list.filter((x) => x !== id)].slice(0, 12));
}

// ---------- anotador ----------
export const saveNotebook = (pages) => setMeta('notebook', pages);

export const setActiveProject = (id) => setMeta('activeProjectId', id || null);
