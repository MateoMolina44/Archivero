import React from 'react';

const base = { width: 18, height: 18, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const IconHome = () => (
  <svg {...base}><rect x="2" y="2" width="5" height="5" rx="1" /><rect x="9" y="2" width="5" height="5" rx="1" /><rect x="2" y="9" width="5" height="5" rx="1" /><rect x="9" y="9" width="5" height="5" rx="1" /></svg>
);
export const IconBoards = () => (
  <svg {...base}><rect x="2" y="2.5" width="12" height="4.5" rx="1.2" /><rect x="2" y="9" width="12" height="4.5" rx="1.2" /></svg>
);
export const IconNotes = () => (
  <svg {...base}><path d="M2 3h4.5A1.5 1.5 0 018 4.5V13a1.5 1.5 0 00-1.5-1.5H2zM14 3H9.5A1.5 1.5 0 008 4.5V13a1.5 1.5 0 011.5-1.5H14z" /></svg>
);
export const IconRules = () => (
  <svg {...base}><path d="M2 4.5h7M12 4.5h2M2 11.5h2M7 11.5h7" /><circle cx="10.5" cy="4.5" r="1.5" /><circle cx="5.5" cy="11.5" r="1.5" /></svg>
);
export const IconSearch = () => (
  <svg {...base} width="16" height="16"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
);
export const IconArrow = ({ dir = 'left' }) => (
  <svg {...base}><path d={dir === 'left' ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'} /></svg>
);
