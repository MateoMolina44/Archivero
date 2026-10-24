// Incorpora a la librería lo que guardó la extensión (store 'inbox' de IndexedDB).
// El service worker no puede escribir localStorage, por eso deja las piezas en la bandeja
// y la librería las pasa a localStorage['archivero.lib.v1'] con el formato del diseño.

import { inboxAll, inboxDel, mediaGet } from '../core/db.js';
import { boardByName } from './patches.js';

let busy = false;

export async function drain(inst) {
  if (busy || !inst || inst._dead) return;
  busy = true;
  try {
    const ops = await inboxAll();
    if (!ops.length) return;
    const L = inst.lib();
    for (const { op } of ops) {
      if (op.op === 'add' && !L.items.some((x) => x.id === op.item.id)) await addItem(inst, op.item);
      else if (op.op === 'patch') patchItem(inst, op.id, op.patch);
    }
    inst.commitNow();
    await inboxDel(ops.map((o) => o.key));
    inst._ml = false; // que vuelva a leer los medios nuevos
    inst.forceUpdate();
  } finally {
    busy = false;
  }
}

async function addItem(inst, raw) {
  const { to, ...rest } = raw;
  const b = boardByName(inst, to);
  const it = Object.assign({ title: '', note: '', url: '', tags: '', text: '', atags: [] }, rest, { bid: b.id });
  if (it.kind === 'img' || it.kind === 'video') {
    const blob = await mediaGet(it.id).catch(() => null);
    const m = blob ? await readMedia(blob) : null;
    if (m) {
      Object.assign(it, { ow: m.ow, oh: m.oh, avg: m.avg || '', gif: !!m.gif });
      if (m.media !== blob) inst.mediaPut(it.id, m.media);
      if (m.thumb) { inst.mediaPut('thumb:' + it.id, m.thumb); it.th = true; }
    } else {
      // No se pudo bajar el medio: queda como enlace a la página.
      it.kind = 'link';
      it.url = it.page || it.url;
    }
  }
  inst.lib().items.push(it);
  if (b.sort === 'manual') b.man = [it.id].concat(b.man || []);
}

function patchItem(inst, id, patch) {
  const it = inst.lib().items.find((x) => x.id === id);
  if (!it) return;
  if ('board' in patch) it.bid = boardByName(inst, patch.board).id;
  if ('tags' in patch) it.tags = patch.tags;
}

// Mismo tratamiento que readMedia() del diseño: resolución, color promedio, original comprimido
// si pasa de 1600 px o 1,5 MB, y miniatura de hasta 900 px.
function readMedia(blob) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const end = (v) => { URL.revokeObjectURL(url); resolve(v); };
    if (/^video\//.test(blob.type)) {
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.muted = true;
      v.onloadedmetadata = () => end({ media: blob, ow: v.videoWidth || 1280, oh: v.videoHeight || 720 });
      v.onerror = () => end({ media: blob, ow: 1280, oh: 720 });
      v.src = url;
      return;
    }
    const gif = /gif/i.test(blob.type);
    const im = new Image();
    im.onload = () => {
      const ow = im.naturalWidth || 1, oh = im.naturalHeight || 1;
      let avg = '';
      try {
        const c1 = document.createElement('canvas'); c1.width = 1; c1.height = 1;
        const g1 = c1.getContext('2d'); g1.drawImage(im, 0, 0, 1, 1);
        const d = g1.getImageData(0, 0, 1, 1).data; avg = 'rgb(' + d[0] + ',' + d[1] + ',' + d[2] + ')';
      } catch { /* imagen sin permisos de lectura */ }
      const jpeg = (max, q) => {
        const k = Math.min(1, max / Math.max(ow, oh));
        const c = document.createElement('canvas'); c.width = Math.round(ow * k); c.height = Math.round(oh * k);
        const g = c.getContext('2d'); g.fillStyle = '#ffffff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
        return c.toDataURL('image/jpeg', q);
      };
      let media = blob, thumb = '';
      try {
        if (!gif && (Math.max(ow, oh) > 1600 || blob.size > 1500000)) media = jpeg(1600, 0.86);
        if (!gif && Math.max(ow, oh) > 900) thumb = jpeg(900, 0.8);
      } catch { media = blob; }
      end({ media, thumb, ow, oh, avg, gif });
    };
    im.onerror = () => end(null);
    im.src = url;
  });
}
