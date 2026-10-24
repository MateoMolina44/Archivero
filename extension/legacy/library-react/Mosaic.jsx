import React from 'react';
import { Visual } from './Thumb.jsx';
import { usePan } from './usePan.js';

// Una pieza del mosaico. Al pasar el mouse muestra nombre y etiquetas (Vista 1 del prototipo).
export function Tile({ item, onOpen, radius }) {
  return (
    <button className="tile" style={radius ? { borderRadius: radius } : undefined} onClick={() => onOpen(item.id)} aria-label={item.title || item.url}>
      <Visual item={item} />
      <span className="tile-over">
        <strong>{item.title || item.domain || 'Sin nombre'}</strong>
        {item.tags?.length > 0 && <em>{item.tags.slice(0, 4).map((t) => `#${t}`).join(' ')}</em>}
      </span>
    </button>
  );
}

// Principal: todo lo guardado en un mosaico a pantalla completa, que se arrastra.
export default function Mosaic({ items, onOpen, emptyText }) {
  const { ref, handlers } = usePan();
  return (
    <div className="scroller mosaic" ref={ref} {...handlers}>
      {items.length === 0 ? (
        <div className="empty">
          <p>{emptyText}</p>
        </div>
      ) : (
        <div className="mosaic-cols">
          {items.map((i) => <Tile key={i.id} item={i} onOpen={onOpen} />)}
        </div>
      )}
    </div>
  );
}
