export const uid = () => 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export function domainOf(url) {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

// Etiquetas automáticas según el sitio de origen (copia de siteTags() del diseño).
const SITES = [['pinterest', ['pinterest', 'referencia']], ['behance', ['behance', 'portfolio']], ['artstation', ['artstation', 'arte']], ['dribbble', ['dribbble', 'ui']], ['youtube', ['youtube', 'video']], ['youtu.be', ['youtube', 'video']], ['vimeo', ['vimeo', 'video']], ['instagram', ['instagram', 'foto']], ['tiktok', ['tiktok', 'video']], ['twitter', ['twitter']], ['x.com', ['x']], ['reddit', ['reddit']], ['deviantart', ['deviantart', 'arte']], ['unsplash', ['unsplash', 'foto']], ['pexels', ['pexels', 'foto']], ['figma', ['figma', 'ui']], ['github', ['github', 'código']], ['cosmos.so', ['cosmos', 'referencia']], ['are.na', ['arena', 'referencia']], ['fonts.google', ['tipografía']], ['sketchfab', ['sketchfab', '3d']], ['itch.io', ['itchio', 'juegos']], ['steam', ['steam', 'juegos']], ['tumblr', ['tumblr']], ['spotify', ['spotify', 'música']], ['soundcloud', ['soundcloud', 'música']], ['flickr', ['flickr', 'foto']], ['giphy', ['giphy', 'gif']]];

export function siteTags(url) {
  const d = domainOf(url);
  if (!d) return [];
  for (const [k, tags] of SITES) if (d.indexOf(k) >= 0) return tags.slice();
  const parts = d.split('.');
  return [parts.length > 1 ? parts[parts.length - 2] : d];
}
