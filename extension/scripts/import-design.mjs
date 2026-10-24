// Importa las pantallas de diseno/project/*.dc.html a src/screens/*.js sin tocar su marcado ni su lógica.
// Uso: npm run import-design  (volver a correrlo cada vez que cambie el diseño).
// Los ajustes propios de la extensión NO van acá: van en src/library/patches.js.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, '../../diseno/project');
const OUT = resolve(here, '../src/screens');
const SCREENS = ['Main', 'Main1', 'Archivo', 'Anotador', 'Seleccion'];

function between(s, a, b, from = 0) {
  const i = s.indexOf(a, from);
  if (i < 0) throw new Error('No encontré ' + a);
  const j = s.indexOf(b, i + a.length);
  if (j < 0) throw new Error('No encontré ' + b);
  return [s.slice(i + a.length, j), j];
}

mkdirSync(OUT, { recursive: true });
for (const name of SCREENS) {
  const s = readFileSync(resolve(SRC, name + '.dc.html'), 'utf8');
  const [helmet] = between(s, '<helmet>', '</helmet>');
  const css = [...helmet.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1].trim()).join('\n');
  const [template] = between(s, '</helmet>', '</x-dc>');
  const tagStart = s.indexOf('<script type="text/x-dc"');
  const [tagAttrs, tagEnd] = between(s, '<script type="text/x-dc"', '>', tagStart - 1);
  const [code] = between(s, '>', '</script>', tagEnd);
  const props = {};
  const dp = tagAttrs.match(/data-props='([^']*)'/);
  if (dp) {
    const raw = JSON.parse(dp[1]);
    for (const k in raw) if (raw[k] && raw[k].default !== undefined) props[k] = raw[k].default;
  }
  const out = `// GENERADO por scripts/import-design.mjs desde diseno/project/${name}.dc.html — no editar a mano.
import { DCLogic } from '../dc/runtime.js';

export const name = ${JSON.stringify(name)};
export const props = ${JSON.stringify(props)};
export const css = ${JSON.stringify(css)};
export const template = ${JSON.stringify(template.trim())};

${code.trim()}

export { Component };
`;
  writeFileSync(resolve(OUT, name + '.js'), out);
  console.log(`${name}: ${template.length} car. de plantilla, ${code.length} de lógica`);
}
