import React, { useRef, useState } from 'react';
import { IconSearch } from './Icons.jsx';
import { useItemImage } from './Thumb.jsx';
import { clearRecentSearches, pushRecentSearch } from './actions.js';

function RecentThumb({ item, onOpen }) {
  const src = useItemImage(item);
  return (
    <button className="recent-thumb" onClick={() => onOpen(item.id)} title={item.title || item.url}>
      {src ? <img src={src} alt={item.title || ''} draggable={false} /> : <span>{(item.title || item.domain || '?').slice(0, 14)}</span>}
    </button>
  );
}

// Pastilla de búsqueda: se extiende al enfocarla con "Recientes" y "Vistos recientemente".
export default function SearchBar({ query, setQuery, recentSearches, recentItems, onOpenItem }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);

  const commit = () => pushRecentSearch(query);

  return (
    <div
      ref={wrap}
      className={`search ${open ? 'open' : ''}`}
      onFocus={() => setOpen(true)}
      onBlur={(e) => { if (!wrap.current?.contains(e.relatedTarget)) setOpen(false); }}
    >
      <div className="search-pill">
        <IconSearch />
        <input
          type="text"
          placeholder="Buscar…"
          aria-label="Buscar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { commit(); e.currentTarget.blur(); }
            if (e.key === 'Escape') e.currentTarget.blur();
          }}
        />
        {query && <button className="dot" aria-label="Limpiar búsqueda" onClick={() => setQuery('')}>×</button>}
      </div>

      {open && (
        <div className="search-panel">
          <div className="panel-head">
            <span>Recientes</span>
            {recentSearches.length > 0 && <button onClick={clearRecentSearches}>Borrar</button>}
          </div>
          {recentSearches.length === 0 ? (
            <p className="panel-empty">Todavía no buscaste nada.</p>
          ) : (
            <div className="chips">
              {recentSearches.map((s) => (
                <button key={s} className="chip" onClick={() => { setQuery(s); setOpen(false); }}>{s}</button>
              ))}
            </div>
          )}

          <div className="panel-head second"><span>Vistos recientemente</span></div>
          {recentItems.length === 0 ? (
            <p className="panel-empty">Acá van a aparecer los elementos que abras.</p>
          ) : (
            <div className="recent-row">
              {recentItems.map((i) => <RecentThumb key={i.id} item={i} onOpen={(id) => { setOpen(false); onOpenItem(id); }} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
