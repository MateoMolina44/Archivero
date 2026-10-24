import React, { useMemo, useState } from 'react';
import { useStore } from './useStore.js';
import Mosaic from './Mosaic.jsx';
import { BoardsGrid, BoardView } from './Boards.jsx';
import ItemSheet from './ItemSheet.jsx';
import Notebook from './Notebook.jsx';
import Settings from './Settings.jsx';
import SearchBar from './SearchBar.jsx';
import SectionPill from './SectionPill.jsx';
import { pushRecentViewed } from './actions.js';

export default function App() {
  const store = useStore();
  const { items, collections, projects, recentSearches, recentViewed, notebook, ready } = store;
  const [section, setSection] = useState('home');
  const [boardId, setBoardId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');

  const say = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    const tagQuery = q.startsWith('#') ? q.slice(1) : null;
    return items.filter((i) => {
      if (tagQuery) return (i.tags || []).some((t) => t.includes(tagQuery));
      const hay = [
        i.title, i.description, i.text, i.note, i.url, i.domain, i.pageDomain,
        collections.find((c) => c.id === i.collectionId)?.name,
        projects.find((p) => p.id === i.projectId)?.name,
        ...(i.tags || []),
      ].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [items, collections, projects, query]);

  const recentItems = recentViewed.map((id) => items.find((i) => i.id === id)).filter(Boolean);
  const selected = items.find((i) => i.id === selectedId) || null;
  const board = collections.find((c) => c.id === boardId) || null;
  const searching = query.trim() !== '' && (section === 'home' || section === 'archive');

  const openItem = (id) => {
    setSelectedId(id);
    pushRecentViewed(id);
  };
  const goSection = (id) => {
    setSection(id);
    if (id !== 'archive') setBoardId(null);
  };

  if (!ready) return <div className="loading">Cargando…</div>;

  return (
    <div className="app">
      <main className="stage">
        {searching ? (
          <Mosaic items={filtered} onOpen={openItem} emptyText={`Nada coincide con “${query.trim()}”.`} />
        ) : section === 'home' ? (
          <Mosaic items={items} onOpen={openItem} emptyText="Tu librería está vacía. Hacé click derecho sobre una imagen, un link o un texto y elegí “Guardar en Archivero”." />
        ) : section === 'archive' ? (
          board ? (
            <BoardView board={board} allItems={items} onBack={() => setBoardId(null)} onOpen={openItem} onDeleted={() => setBoardId(null)} />
          ) : (
            <BoardsGrid boards={collections} items={items} onOpenBoard={setBoardId} />
          )
        ) : section === 'notes' ? (
          <Notebook stored={notebook} />
        ) : (
          <Settings store={store} say={say} />
        )}
      </main>

      <SearchBar query={query} setQuery={setQuery} recentSearches={recentSearches} recentItems={recentItems} onOpenItem={openItem} />
      <SectionPill section={section} onChange={goSection} />

      {selected && (
        <ItemSheet
          key={selected.id}
          item={selected}
          collections={collections}
          projects={projects}
          onClose={() => setSelectedId(null)}
          onSearchTag={(t) => { setQuery(`#${t}`); setSelectedId(null); if (section !== 'home' && section !== 'archive') setSection('home'); }}
        />
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
