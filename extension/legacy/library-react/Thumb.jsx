import React, { useEffect, useState } from 'react';
import { getBlob } from '../core/db.js';

// Imagen guardada localmente; si no hay, intenta la URL original.
export function useItemImage(item) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let url;
    let alive = true;
    (async () => {
      if (item.hasBlob) {
        const blob = await getBlob(item.id);
        if (blob && alive) {
          url = URL.createObjectURL(blob);
          setSrc(url);
          return;
        }
      }
      if (alive) setSrc(item.imageUrl || null);
    })();
    return () => {
      alive = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [item.id, item.hasBlob, item.imageUrl]);
  return src;
}

const RATIOS = ['4 / 5', '1 / 1', '5 / 4', '3 / 4'];
const ratioFor = (id) => RATIOS[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % RATIOS.length];

// Contenido visual de una pieza: imagen, cita de texto, o dominio si no hay vista previa.
export function Visual({ item, fit = 'cover', natural = true }) {
  const src = useItemImage(item);
  if (src) {
    return <img className={`visual-img fit-${fit}`} src={src} alt={item.title || ''} loading="lazy" draggable={false} style={natural ? undefined : { height: '100%' }} />;
  }
  const d = item.domain || item.pageDomain;
  return (
    <div className="visual-empty" style={natural ? { aspectRatio: ratioFor(item.id) } : { height: '100%' }}>
      {item.type === 'text' ? (
        <p className="quote">{(item.text || item.title || '').slice(0, 240)}</p>
      ) : (
        <>
          {d && <img src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} width="32" height="32" alt="" draggable={false} />}
          <span>{d || 'Sin vista previa'}</span>
        </>
      )}
    </div>
  );
}
