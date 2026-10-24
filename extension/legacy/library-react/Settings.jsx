import React, { useRef } from 'react';
import Rules from './Rules.jsx';
import { addProject, deleteProject, downloadBackup, reapplyRules, restoreBackup, setActiveProject } from './actions.js';

// Reglas y ajustes: reglas de organización, proyectos y respaldo.
export default function Settings({ store, say }) {
  const { items, collections, projects, rules, activeProjectId } = store;
  const fileRef = useRef(null);

  return (
    <div className="scroller">
      <div className="settings">
        <section>
          <h2>Proyectos</h2>
          <p className="help">El proyecto activo se asocia a todo lo que guardes desde la extensión. También se cambia desde su ícono.</p>
          <ul className="plain-list">
            {projects.length === 0 && <li className="muted">Todavía no creaste proyectos.</li>}
            {projects.map((p) => (
              <li key={p.id}>
                <span>{p.name}{activeProjectId === p.id && <b className="badge">activo</b>}</span>
                <span className="row-actions">
                  <button className="pill-btn small" onClick={() => setActiveProject(activeProjectId === p.id ? null : p.id)}>{activeProjectId === p.id ? 'Desactivar' : 'Activar'}</button>
                  <button className="pill-btn small danger" onClick={() => window.confirm('¿Borrar este proyecto? Las piezas se conservan.') && deleteProject(p.id, items)}>Borrar</button>
                </span>
              </li>
            ))}
          </ul>
          <button className="pill-btn" onClick={() => {
            const n = window.prompt('Nombre del proyecto:');
            if (n?.trim()) addProject(n);
          }}>+ Nuevo proyecto</button>
        </section>

        <section>
          <h2>Respaldo</h2>
          <p className="help">Todo vive en este navegador. Exportá un archivo para tener copia o para llevarlo a otra computadora.</p>
          <div className="row-actions">
            <button className="pill-btn" onClick={downloadBackup}>Exportar</button>
            <button className="pill-btn" onClick={() => fileRef.current?.click()}>Importar</button>
            <input ref={fileRef} type="file" accept="application/json" hidden onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = '';
              if (!f) return;
              try { const r = await restoreBackup(f); say(`Importadas ${r.items} piezas`); } catch (err) { say(err.message); }
            }} />
          </div>
        </section>

        <section>
          <Rules
            rules={rules}
            collections={collections}
            projects={projects}
            onReapply={async (scope) => {
              const n = await reapplyRules(items, rules, scope);
              say(n ? `Se reorganizaron ${n} piezas` : 'No hubo cambios');
            }}
          />
        </section>
      </div>
    </div>
  );
}
