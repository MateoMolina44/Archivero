// Vistas previas reales de enlaces de sitios conocidos (sin servidor propio):
// - frame: reproductor embebido oficial del sitio (iframe).
// - thumb: imagen de portada, cuando el sitio la publica en una URL fija.
// Para cualquier otro sitio la vista previa es la imagen Open Graph o la captura que guarda la extensión.

// Tamaño natural del reproductor de Spotify en su forma horizontal (portada a la izquierda y
// título a la derecha). En las tarjetas se dibuja a este tamaño y se escala, para que se vea igual.
export const SPOTIFY_W = 720;
export const SPOTIFY_H = 352;

function parse(url) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

export function embedOf(url) {
  const u = parse(url);
  if (!u) return null;
  const host = u.hostname.replace(/^www\.|^m\./, '');
  const path = u.pathname;

  if (host === 'youtube.com' || host === 'youtu.be' || host === 'music.youtube.com') {
    const id = host === 'youtu.be' ? path.slice(1).split('/')[0]
      : u.searchParams.get('v') || (path.match(/^\/(?:shorts|embed|live)\/([\w-]{6,})/) || [])[1];
    if (!id) return null;
    return {
      site: 'youtube',
      frame: 'https://www.youtube-nocookie.com/embed/' + id + '?rel=0',
      thumb: 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg',
    };
  }
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = (path.match(/(\d{6,})/) || [])[1];
    return id ? { site: 'vimeo', frame: 'https://player.vimeo.com/video/' + id } : null;
  }
  if (host === 'open.spotify.com') {
    const m = path.match(/^\/(?:intl-[\w-]+\/)?(track|album|playlist|episode|show|artist)\/(\w+)/);
    return m ? { site: 'spotify', frame: 'https://open.spotify.com/embed/' + m[1] + '/' + m[2] } : null;
  }
  if (host === 'x.com' || host === 'twitter.com' || host === 'mobile.twitter.com') {
    const id = (path.match(/\/status(?:es)?\/(\d+)/) || [])[1];
    return id ? { site: 'x', frame: 'https://platform.twitter.com/embed/Tweet.html?id=' + id + '&dnt=true' } : null;
  }
  if (host === 'tiktok.com') {
    const id = (path.match(/\/video\/(\d+)/) || [])[1];
    return id ? { site: 'tiktok', frame: 'https://www.tiktok.com/embed/v2/' + id } : null;
  }
  return null;
}
