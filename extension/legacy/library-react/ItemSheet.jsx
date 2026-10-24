import React, { useEffect, useState } from 'react';
import { Visual } from './Thumb.jsx';
import { TYPES, parseTags } from '../core/util.js';
import { deleteItem, updateItem } from './actions.js';

const pad = (n) => String(n).padStart(2, '0');
function formatDate(ts) {
  const d = new Date(ts);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${String(d.getFullYear()).slice(2)}, ${pad(d.getHours())}:${pad(d.getMinutes())}hs`;
}

// Selección: la pieza expandida a la izquierda y su información a la derecha.
export default function ItemSheet({ item, collections, projects, onClose, onSearchTag }) {
  const [title, setTitle] = useState(item.title || '');
  const [note, setNote] = useState(item.note || '');
  const [tags, setTags] = useState((item.tags || []).join(', '));

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const save = (patch) => updateItem(item, patch);
  const original = item.type === 'image' && item.pageUrl ? item.pageUrl : item.url;
  const where = item.pageDomain || item.domain;

  return (
    <div className="sheet" role="dialog" aria-label="Información de la pieza">
      <button className="pill-btn sheet-close" onClick={onClose}>← Volver</button>

      <div className="sheet-visual">
        <Visual item={item} fit="contain" natural={false} />
      </div>

      <div className="sheet-info">
        <input className="sheet-title" aria-label="Nombre de la pieza" value={title} placeholder="Nombre de pieza" onChange={(e) => setTitle(e.target.value)} onBlur={() => title !== (item.title || '') && save({ title })} />

        <dl>
          <dt>Info</dt>
          <dd>{item.type === 'text' ? item.text : item.description || '—'}</dd>

          <dt>Descripción</dt>
          <dd>
            <textarea aria-label="Descripción propia" rows={3} value={note} placeholder="Por qué lo guardaste, cómo pensás usarlo…" onChange={(e) => setNote(e.target.value)} onBlur={() => note !== (item.note || '') && save({ note })} />
          </dd>

          <dt>Dónde</dt>
          <dd>{where || '—'}</dd>

          <dt>Sitio Web</dt>
          <dd>{item.url ? <a href={original} target="_blank" rel="noreferrer">{item.url}</a> : '—'}</dd>

          <dt>Fecha</dt>
          <dd>{formatDate(item.createdAt)}</dd>

          <dt>Etiquetas</dt>
          <dd>
            <input aria-label="Etiquetas" value={tags} placeholder="ui, referencia…" onChange={(e) => setTags(e.target.value)} onBlur={() => save({ tags: parseTags(tags) })} />
            {item.tags?.length > 0 && (
              <span className="tag-links">
                {item.tags.map((t) => <button key={t} onClick={() => onSearchTag(t)}>#{t}</button>)}
              </span>
            )}
          </dd>

          <dt>Tablero</dt>
          <dd>
            <select aria-label="Tablero" value={item.collectionId || ''} onChange={(e) => save({ collectionId: e.target.value })}>
              {collections.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </dd>

          <dt>Tipo y proyecto</dt>
          <dd className="two">
            <select aria-label="Tipo" value={item.type} onChange={(e) => save({ type: e.target.value })}>
              {TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
            <select aria-label="Proyecto" value={item.projectId || ''} onChange={(e) => save({ projectId: e.target.value || null })}>
              <option value="">Sin proyecto</option>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </dd>
        </dl>

        <div className="sheet-actions">
          {original && <a className="pill-btn" href={original} target="_blank" rel="noreferrer">Abrir original ↗</a>}
          <button className="pill-btn danger" onClick={async () => {
            if (window.confirm('¿Eliminar esta pieza de tu librería?')) { await deleteItem(item.id); onClose(); }
          }}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
