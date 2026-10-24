import React from 'react';
import { IconBoards, IconHome, IconNotes, IconRules } from './Icons.jsx';

export const SECTIONS = [
  { id: 'home', label: 'Principal', Icon: IconHome },
  { id: 'archive', label: 'Archivo', Icon: IconBoards },
  { id: 'notes', label: 'Anotador', Icon: IconNotes },
  { id: 'rules', label: 'Reglas y ajustes', Icon: IconRules },
];

// Pastilla inferior: muestra la sección actual y se extiende al pasar el mouse (o con foco de teclado).
export default function SectionPill({ section, onChange }) {
  const current = SECTIONS.find((s) => s.id === section) || SECTIONS[0];
  return (
    <nav className="sections" aria-label="Secciones">
      <div className="sections-pill">
        <span className="current" aria-hidden="true"><current.Icon /></span>
        <div className="all">
          {SECTIONS.map(({ id, label, Icon }) => (
            <button key={id} className={id === section ? 'on' : ''} title={label} aria-label={label} aria-current={id === section ? 'page' : undefined} onClick={() => onChange(id)}>
              <Icon />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
