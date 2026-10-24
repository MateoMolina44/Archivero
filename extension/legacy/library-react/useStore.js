import { useCallback, useEffect, useState } from 'react';
import { ensureSeed, getAll, getMeta, onChange } from '../core/db.js';

// Carga todo el contenido y se refresca solo cuando la extensión guarda algo nuevo.
export function useStore() {
  const [state, setState] = useState({
    items: [], collections: [], projects: [], rules: [],
    activeProjectId: null, recentSearches: [], recentViewed: [], notebook: [''], ready: false,
  });

  const load = useCallback(async () => {
    await ensureSeed();
    const [items, collections, projects, rules, activeProjectId, recentSearches, recentViewed, notebook] = await Promise.all([
      getAll('items'), getAll('collections'), getAll('projects'), getAll('rules'),
      getMeta('activeProjectId'), getMeta('recentSearches', []), getMeta('recentViewed', []), getMeta('notebook', ['', '']),
    ]);
    items.sort((a, b) => b.createdAt - a.createdAt);
    rules.sort((a, b) => a.order - b.order);
    setState({ items, collections, projects, rules, activeProjectId, recentSearches, recentViewed, notebook, ready: true });
  }, []);

  useEffect(() => {
    load();
    return onChange(() => load());
  }, [load]);

  return state;
}
