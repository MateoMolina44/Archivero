// Imagen y título de vista previa de un enlace, sin abrir la página.
// Lo usan el service worker (al guardar) y la librería (enlaces agregados a mano o guardados antes).
// Dentro de la extensión se puede leer cualquier sitio (permiso <all_urls>); en la web solo
// funcionan los servicios que permiten pedidos desde otros dominios (Spotify, Vimeo, TikTok).

function parse(url) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

async function getJSON(url, ms = 6000) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctl.signal });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Metadatos Open Graph del HTML de la página.
async function htmlMeta(url) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 6000);
  try {
    const r = await fetch(url, { signal: ctl.signal });
    if (!r.ok || !/html/.test(r.headers.get('content-type') || '')) return {};
    const html = (await r.text()).slice(0, 400000);
    const meta = (n) => {
      const tag = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${n}["'][^>]*>`, 'i'))?.[0] || '';
      return (tag.match(/content=["']([^"']*)["']/i)?.[1] || '').replace(/&amp;/g, '&');
    };
    const img = meta('og:image') || meta('twitter:image');
    return {
      title: meta('og:title') || (html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '').trim(),
      image: img ? new URL(img, r.url).href : '',
    };
  } catch {
    return {};
  } finally {
    clearTimeout(timer);
  }
}

export async function previewMeta(url) {
  const u = parse(url);
  if (!u || !/^https?:$/.test(u.protocol)) return {};
  const host = u.hostname.replace(/^www\./, '');

  // ArtStation bloquea la lectura de sus páginas, pero tiene una API pública por obra.
  const art = host.endsWith('artstation.com') && u.pathname.match(/\/artwork\/(\w+)/);
  if (art) {
    const d = await getJSON('https://www.artstation.com/projects/' + art[1] + '.json');
    if (d) return { title: d.title || '', image: d.assets?.find((a) => a.image_url)?.image_url || d.cover_url || '' };
  }

  const oembed = host === 'open.spotify.com' ? 'https://open.spotify.com/oembed?url='
    : host === 'vimeo.com' ? 'https://vimeo.com/api/oembed.json?url='
    : host === 'tiktok.com' ? 'https://www.tiktok.com/oembed?url='
    : '';
  if (oembed) {
    const d = await getJSON(oembed + encodeURIComponent(url));
    return d ? { title: d.title || '', image: d.thumbnail_url || '' } : {};
  }

  return htmlMeta(url);
}

export async function fetchBlob(url, prefix, maxMB) {
  if (!/^(https?:|data:)/.test(url || '')) return null;
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    const blob = await r.blob();
    if (!blob.type.startsWith(prefix) || blob.size > maxMB * 1024 * 1024) return null;
    return blob;
  } catch {
    return null;
  }
}
