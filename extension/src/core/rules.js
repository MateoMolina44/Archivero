// Motor de reglas con el formato del diseño (Reglas y ajustes):
//   { id, name, on, match: 'all'|'any', conds: [{ k: 'dom'|'kw'|'proj'|'tipo', v }], to: nombreTablero, tags: 'a, b' }
// - La PRIMERA regla activa que coincide y tiene tablero ('to') decide el tablero.
// - Las etiquetas de TODAS las reglas que coinciden se suman.

import { domainOf } from './util.js';

// Tipo de contenido de una pieza, con los valores que ofrece el diseño ('imagen', 'enlace', 'texto', 'captura').
export function tipoOf(item) {
  if (item.capture) return 'captura';
  return { img: 'imagen', link: 'enlace', text: 'texto', video: 'video' }[item.kind] || '';
}

function matchCond(c, item, ctx) {
  const raw = String(c.v || '').trim();
  if (!raw) return false;
  const v = raw.toLowerCase();
  switch (c.k) {
    case 'dom': {
      const doms = [domainOf(item.url), domainOf(item.page)].filter(Boolean);
      const want = v.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
      return doms.some((d) => d === want || d.endsWith('.' + want));
    }
    case 'kw': {
      const hay = [item.title, item.text, item.note, item.url, item.page].filter(Boolean).join(' ').toLowerCase();
      return v.split(',').map((k) => k.trim()).filter(Boolean).some((k) => hay.includes(k));
    }
    case 'proj':
      return ctx.project === raw;
    case 'tipo':
      return tipoOf(item) === v;
    default:
      return false;
  }
}

export function applyRules(item, rules, ctx) {
  let to = '';
  const tags = [];
  for (const r of rules) {
    if (!r.on || !r.conds?.length) continue;
    const ok = r.match === 'any'
      ? r.conds.some((c) => matchCond(c, item, ctx))
      : r.conds.every((c) => matchCond(c, item, ctx));
    if (!ok) continue;
    if (!to && r.to) to = r.to;
    String(r.tags || '').split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean)
      .forEach((t) => { if (!tags.includes(t)) tags.push(t); });
  }
  return { to, tags };
}

// Une etiquetas en el formato de texto que usa la ficha ('a, b, c').
export function mergeTags(current, extra) {
  const all = String(current || '').split(',').map((t) => t.trim()).filter(Boolean).concat(extra);
  return all.filter((t, i) => all.indexOf(t) === i).join(', ');
}
