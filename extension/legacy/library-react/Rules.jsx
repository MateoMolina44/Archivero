import React, { useState } from 'react';
import { FIELDS } from '../core/rules.js';
import { TYPES, parseTags, uid } from '../core/util.js';
import { deleteRule, saveRule } from './actions.js';

const emptyRule = (order) => ({
  id: uid(), name: 'Nueva regla', enabled: true, order, match: 'all',
  conditions: [{ field: 'domain', value: '' }], actions: { collectionId: '', tags: [], setType: '' },
});

export default function Rules({ rules, collections, projects, onReapply }) {
  const [editing, setEditing] = useState(null);

  const move = async (rule, dir) => {
    const idx = rules.findIndex((r) => r.id === rule.id);
    const other = rules[idx + dir];
    if (!other) return;
    await saveRule({ ...rule, order: other.order });
    await saveRule({ ...other, order: rule.order });
  };

  return (
    <div className="rules">
      <header className="rules-head">
        <h2>Reglas de organización</h2>
        <div className="row-actions">
          <button className="btn" onClick={() => onReapply('inbox')}>Reaplicar a “Sin clasificar”</button>
          <button className="btn" onClick={() => onReapply('all')}>Reaplicar a todo</button>
          <button className="btn primary" onClick={() => setEditing(emptyRule((rules.at(-1)?.order || 0) + 1))}>+ Nueva regla</button>
        </div>
      </header>

      <p className="help">
        Al guardar algo, se evalúan las reglas en orden. <strong>La primera que coincida y tenga tablero decide dónde cae</strong>;
        las etiquetas de <em>todas</em> las que coincidan se suman. Si ninguna coincide, va a “Sin clasificar”.
      </p>

      <ol className="rule-list">
        {rules.map((r, i) => (
          <li key={r.id} className={r.enabled ? '' : 'off'}>
            <div className="rl-main" onClick={() => setEditing(r)}>
              <strong>{r.name}</strong>
              <span className="rl-sum">
                {r.conditions.map((c) => `${FIELDS.find((f) => f.id === c.field)?.label}: ${c.field === 'project' ? projects.find((p) => p.id === c.value)?.name || '?' : c.value}`).join(r.match === 'any' ? '  O  ' : '  Y  ')}
                {'  →  '}
                {collections.find((c) => c.id === r.actions.collectionId)?.name || 'sin tablero'}
                {r.actions.tags?.length ? `  ·  ${r.actions.tags.map((t) => '#' + t).join(' ')}` : ''}
              </span>
            </div>
            <div className="rl-actions">
              <button className="mini" disabled={i === 0} onClick={() => move(r, -1)} title="Subir prioridad">↑</button>
              <button className="mini" disabled={i === rules.length - 1} onClick={() => move(r, 1)} title="Bajar prioridad">↓</button>
              <label className="switch"><input type="checkbox" checked={r.enabled} onChange={(e) => saveRule({ ...r, enabled: e.target.checked })} /><span /></label>
            </div>
          </li>
        ))}
      </ol>

      {editing && (
        <RuleEditor
          rule={editing}
          collections={collections}
          projects={projects}
          onCancel={() => setEditing(null)}
          onSave={async (r) => { await saveRule(r); setEditing(null); }}
          onDelete={rules.some((r) => r.id === editing.id) ? async () => {
            if (window.confirm('¿Borrar esta regla?')) { await deleteRule(editing.id); setEditing(null); }
          } : null}
        />
      )}
    </div>
  );
}

function RuleEditor({ rule, collections, projects, onCancel, onSave, onDelete }) {
  const [r, setR] = useState(rule);
  const [tags, setTags] = useState((rule.actions.tags || []).join(', '));

  const setCond = (i, patch) => setR({ ...r, conditions: r.conditions.map((c, k) => (k === i ? { ...c, ...patch } : c)) });

  return (
    <div className="modal" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Editar regla</h2>

        <label>Nombre</label>
        <input value={r.name} onChange={(e) => setR({ ...r, name: e.target.value })} />

        <label>Cuando… <select className="inline" value={r.match} onChange={(e) => setR({ ...r, match: e.target.value })}>
          <option value="all">se cumplan TODAS</option>
          <option value="any">se cumpla ALGUNA</option>
        </select></label>

        {r.conditions.map((c, i) => (
          <div className="cond" key={i}>
            <select value={c.field} onChange={(e) => setCond(i, { field: e.target.value, value: '' })}>
              {FIELDS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
            </select>
            {c.field === 'type' ? (
              <select value={c.value} onChange={(e) => setCond(i, { value: e.target.value })}>
                <option value="">Elegí…</option>
                {TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            ) : c.field === 'project' ? (
              <select value={c.value} onChange={(e) => setCond(i, { value: e.target.value })}>
                <option value="">Elegí…</option>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            ) : (
              <input value={c.value} placeholder={FIELDS.find((f) => f.id === c.field)?.hint} onChange={(e) => setCond(i, { value: e.target.value })} />
            )}
            <button className="mini" disabled={r.conditions.length === 1} onClick={() => setR({ ...r, conditions: r.conditions.filter((_, k) => k !== i) })}>×</button>
          </div>
        ))}
        <button className="btn" onClick={() => setR({ ...r, conditions: [...r.conditions, { field: 'keyword', value: '' }] })}>+ Condición</button>

        <label>Entonces…</label>
        <div className="two">
          <div>
            <small>Mover a tablero</small>
            <select value={r.actions.collectionId || ''} onChange={(e) => setR({ ...r, actions: { ...r.actions, collectionId: e.target.value } })}>
              <option value="">(no cambiar)</option>
              {collections.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <small>Cambiar tipo a</small>
            <select value={r.actions.setType || ''} onChange={(e) => setR({ ...r, actions: { ...r.actions, setType: e.target.value } })}>
              <option value="">(no cambiar)</option>
              {TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
        </div>
        <small>Agregar etiquetas (coma)</small>
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="referencia, ui, color…" />

        <div className="dactions">
          {onDelete && <button className="btn danger" onClick={onDelete}>Borrar</button>}
          <span className="grow" />
          <button className="btn" onClick={onCancel}>Cancelar</button>
          <button className="btn primary" onClick={() => onSave({ ...r, actions: { ...r.actions, tags: parseTags(tags) } })}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
