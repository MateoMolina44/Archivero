import React, { useEffect, useRef, useState } from 'react';
import { IconArrow } from './Icons.jsx';
import { saveNotebook } from './actions.js';

const even = (pages) => (pages.length % 2 === 0 ? pages : [...pages, '']);

// Anotador: un libro de dos páginas con notas libres. Las flechas pasan de hoja.
export default function Notebook({ stored }) {
  const [pages, setPages] = useState(() => even(stored.length ? stored : ['', '']));
  const [spread, setSpread] = useState(0);
  const timer = useRef(null);

  // si otra pestaña modifica el anotador, no pisamos lo que se está escribiendo
  useEffect(() => () => clearTimeout(timer.current), []);

  const update = (idx, text) => {
    const next = pages.map((p, k) => (k === idx ? text : p));
    setPages(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => saveNotebook(next), 400);
  };

  const last = pages.length / 2 - 1;
  const next = () => {
    if (spread >= last) {
      const grown = [...pages, '', ''];
      setPages(grown);
      saveNotebook(grown);
    }
    setSpread(spread + 1);
  };

  const L = spread * 2;
  const R = L + 1;

  return (
    <div className="notebook-stage">
      <button className="side-arrow left" onClick={() => setSpread(Math.max(0, spread - 1))} disabled={spread === 0} aria-label="Hoja anterior"><IconArrow dir="left" /></button>

      <div className="book">
        <div className="page">
          <textarea aria-label={`Página ${L + 1}`} value={pages[L] ?? ''} placeholder="Escribí acá…" onChange={(e) => update(L, e.target.value)} />
          <span className="page-num">{L + 1}</span>
        </div>
        <div className="spine" />
        <div className="page">
          <textarea aria-label={`Página ${R + 1}`} value={pages[R] ?? ''} placeholder="Escribí acá…" onChange={(e) => update(R, e.target.value)} />
          <span className="page-num right">{R + 1}</span>
        </div>
      </div>

      <button className="side-arrow right" onClick={next} aria-label={spread >= last ? 'Nueva hoja' : 'Hoja siguiente'}><IconArrow dir="right" /></button>
    </div>
  );
}
