import React from 'react';
import { Tile } from './Mosaic.jsx';
import { useItemImage } from './Thumb.jsx';
import { usePan } from './usePan.js';
import { INBOX_ID } from '../core/db.js';
import { addCollection, deleteCollection } from './actions.js';

function BoardCard({ board, items, onOpen }) {
  const cover = items.find((i) => i.hasBlob || i.imageUrl) || null;
  const src = useItemImage(cover || { id: '', hasBlob: false, imageUrl: '' });
  return (
    <button className="board-card" onClick={onOpen}>
      {src && <img src={src} alt="" draggable={false} />}
      <span className="board-over" />
      <span className="board-name">{board.name}</span>
      <span className="board-count">{items.length} {items.length === 1 ? 'pieza' : 'piezas'}</span>
    </button>
  );
}

// Archivo: cuadrícula de tableros (cada tablero es una colección).
export function BoardsGrid({ boards, items, onOpenBoard }) {
  const { ref, handlers } = usePan();
  return (
    <div className="scroller" ref={ref} {...handlers}>
      <div className="boards-grid">
        {boards.map((b) => (
          <BoardCard key={b.id} board={b} items={items.filter((i) => i.collectionId === b.id)} onOpen={() => onOpenBoard(b.id)} />
        ))}
        <button className="board-card new" onClick={() => {
          const n = window.prompt('Nombre del tablero:');
          if (n?.trim()) addCollection(n);
        }}>
          <span className="board-name">+ Nuevo tablero</span>
        </button>
      </div>
    </div>
  );
}

// Vista de tablero: columna ancha a la izquierda y una más angosta a la derecha.
export function BoardView({ board, allItems, onBack, onOpen, onDeleted }) {
  const { ref, handlers } = usePan();
  const items = allItems.filter((i) => i.collectionId === board.id);
  const left = items.filter((_, k) => k % 2 === 0);
  const right = items.filter((_, k) => k % 2 === 1);
  return (
    <div className="scroller" ref={ref} {...handlers}>
      <div className="board-head">
        <button className="pill-btn" onClick={onBack}>← Tableros</button>
        <h1>{board.name}</h1>
        {board.id !== INBOX_ID && (
          <button className="link-btn" onClick={async () => {
            if (window.confirm('¿Borrar este tablero? Sus piezas vuelven a “Sin clasificar”.')) {
              await deleteCollection(board.id, allItems);
              onDeleted();
            }
          }}>Borrar tablero</button>
        )}
      </div>
      {items.length === 0 ? (
        <div className="empty"><p>Este tablero está vacío. Arrastrá piezas acá cambiando su tablero desde la ficha, o armá una regla para que lleguen solas.</p></div>
      ) : (
        <div className="board-cols">
          <div className="col-wide">{left.map((i) => <Tile key={i.id} item={i} onOpen={onOpen} radius="0 10px 10px 0" />)}</div>
          <div className="col-narrow">{right.map((i) => <Tile key={i.id} item={i} onOpen={onOpen} radius="10px 0 0 10px" />)}</div>
        </div>
      )}
    </div>
  );
}
