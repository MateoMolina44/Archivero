import re
# Librería compartida (piezas y tableros reales). Se intenta guardar en localStorage; si el entorno no lo permite, vive en memoria.
LIBJS = r'''
  lib() {
    if (!this._lib) {
      let d = null;
      try { const r = window.localStorage.getItem('archivero.lib.v1'); if (r) d = JSON.parse(r); } catch (e) { d = null; }
      if (!d || !Array.isArray(d.boards) || !Array.isArray(d.items)) d = { boards: [], items: [], bsort: 'recent', bman: [], seq: 1, last: null };
      this._lib = d;
      if (!this._lw) { this._lw = true; try { window.addEventListener('storage', (e) => { if (e.key === 'archivero.lib.v1') { this._lib = null; this._ml = false; this.forceUpdate(); } if (e.key === 'archivero.ui.v1') { this._ui = null; this.forceUpdate(); } }); } catch (e) {} this.mediaDB(() => {}); try { window.addEventListener('resize', () => this.forceUpdate()); } catch (e) {} }
    }
    return this._lib;
  }
  uid() { const L = this.lib(); L.seq = (L.seq || 1) + 1; return 'p' + Date.now().toString(36) + L.seq; }
  commit() { this.setState({ lrev: (this.state.lrev || 0) + 1 }); clearTimeout(this.wt); this.wt = setTimeout(() => { try { window.localStorage.setItem('archivero.lib.v1', JSON.stringify(this.lib())); } catch (e) {} }, 300); }
  mediaDB(cb) {
    if (this._db) return cb(this._db);
    if (this._dbFail) return cb(null);
    if (this._dbq) { this._dbq.push(cb); return; }
    this._dbq = [cb];
    const done = (db) => { const q = this._dbq || []; this._dbq = null; q.forEach((f) => f(db)); };
    try {
      const rq = window.indexedDB.open('archivero', 1);
      rq.onupgradeneeded = () => { try { rq.result.createObjectStore('media'); } catch (e) {} };
      rq.onsuccess = () => { this._db = rq.result; done(this._db); };
      rq.onerror = () => { this._dbFail = true; done(null); };
    } catch (e) { this._dbFail = true; done(null); }
  }
  mediaLoad() {
    if (this._ml) return; this._ml = true; this._media = this._media || {};
    this.mediaDB((db) => {
      if (!db) return;
      try {
        const rq = db.transaction('media', 'readonly').objectStore('media').openCursor();
        rq.onsuccess = () => { const c = rq.result; if (c) { this._media[c.key] = c.value; c.continue(); } else this.forceUpdate(); };
      } catch (e) {}
    });
  }
  mediaPut(id, v) {
    this._media = this._media || {}; this._media[id] = v;
    this.mediaDB((db) => { if (!db) return; try { db.transaction('media', 'readwrite').objectStore('media').put(v, id); } catch (e) {} });
  }
  mediaDel(id) {
    if (this._media) delete this._media[id];
    this.mediaDB((db) => { if (!db) return; try { db.transaction('media', 'readwrite').objectStore('media').delete(id); } catch (e) {} });
  }
  srcOf(it) {
    if (!it) return '';
    if (it.src) return it.src;
    this.mediaLoad();
    const v = (this._media || {})[it.id];
    if (!v) return '';
    if (typeof v === 'string') return v;
    this._urls = this._urls || {};
    if (!this._urls[it.id]) { try { this._urls[it.id] = URL.createObjectURL(v); } catch (e) { return ''; } }
    return this._urls[it.id];
  }
  vref() { return (el) => {
    if (!el || el._ap) return; el._ap = true;
    try { el.muted = true; el.loop = true; el.playsInline = true; el.setAttribute('muted', ''); } catch (e) {}
    const play = () => { try { const p = el.play(); if (p && p.catch) p.catch(() => {}); } catch (e) {} };
    try { const io = new IntersectionObserver((es) => { es.forEach((x) => { if (x.isIntersecting) play(); else { try { el.pause(); } catch (e) {} } }); }, { threshold: 0.05 }); io.observe(el); } catch (e) { play(); }
  }; }
  thumbOf(it) { if (!it) return ''; if (it.th) { const t = this.srcOf({ id: 'thumb:' + it.id }); if (t) return t; } return this.srcOf(it); }
  isVis(it) { return it && (it.kind === 'img' || it.kind === 'video'); }
  siteTags(u) {
    const d = this.dom(u); if (!d) return [];
    const M = [['pinterest', ['pinterest', 'referencia']], ['behance', ['behance', 'portfolio']], ['artstation', ['artstation', 'arte']], ['dribbble', ['dribbble', 'ui']], ['youtube', ['youtube', 'video']], ['youtu.be', ['youtube', 'video']], ['vimeo', ['vimeo', 'video']], ['instagram', ['instagram', 'foto']], ['tiktok', ['tiktok', 'video']], ['twitter', ['twitter']], ['x.com', ['x']], ['reddit', ['reddit']], ['deviantart', ['deviantart', 'arte']], ['unsplash', ['unsplash', 'foto']], ['pexels', ['pexels', 'foto']], ['figma', ['figma', 'ui']], ['github', ['github', 'código']], ['cosmos.so', ['cosmos', 'referencia']], ['are.na', ['arena', 'referencia']], ['fonts.google', ['tipografía']], ['sketchfab', ['sketchfab', '3d']], ['itch.io', ['itchio', 'juegos']], ['steam', ['steam', 'juegos']], ['tumblr', ['tumblr']], ['spotify', ['spotify', 'música']], ['soundcloud', ['soundcloud', 'música']], ['flickr', ['flickr', 'foto']], ['giphy', ['giphy', 'gif']]];
    for (let i = 0; i < M.length; i++) if (d.indexOf(M[i][0]) >= 0) return M[i][1].slice();
    const parts = d.split('.'); return [parts.length > 1 ? parts[parts.length - 2] : d];
  }
  ui() {
    if (!this._ui) {
      let d = null; try { d = JSON.parse(window.localStorage.getItem('archivero.ui.v1') || 'null'); } catch (e) { d = null; }
      this._ui = Object.assign({ pal: 'grafito', mode: 'light', f1: 'Inter', f2: 'Inter', fit: 'blur' }, d || {});
    }
    return this._ui;
  }
  uiSet(p) { Object.assign(this.ui(), p); try { window.localStorage.setItem('archivero.ui.v1', JSON.stringify(this._ui)); } catch (e) {} this.forceUpdate(); }
  pals() { return [['grafito', 'Grafito', 0, 0], ['pizarra', 'Pizarra', 215, 14], ['oceano', 'Océano', 205, 38], ['turquesa', 'Turquesa', 178, 30], ['bosque', 'Bosque', 145, 22], ['musgo', 'Musgo', 80, 20], ['arena', 'Arena', 38, 24], ['ambar', 'Ámbar', 30, 46], ['terracota', 'Terracota', 14, 40], ['vino', 'Vino', 345, 32], ['rosa', 'Rosa', 325, 30], ['lavanda', 'Lavanda', 262, 24]]; }
  palTones(H, S, dark) {
    const c = (l, s) => 'hsl(' + H + ' ' + (s == null ? S : s) + '% ' + l + '%)';
    return dark
      ? { ink: c(92, Math.min(S, 12)), bg: c(9), t1: c(24), t2: c(21), t3: c(27), t4: c(19), pill: c(30), pillh: c(36), chip: c(84), muted: c(78), field: c(19), sw: c(46), velo: 'hsl(' + H + ' ' + S + '% 9% / .6)' }
      : { ink: c(10, Math.min(S, 20)), bg: c(85), t1: c(69), t2: c(66), t3: c(72), t4: c(64), pill: c(34), pillh: c(41), chip: c(85), muted: c(32), field: c(27), sw: c(51), velo: 'hsl(' + H + ' ' + S + '% 85% / .55)' };
  }
  fonts() { return [['Inter', "'Inter',system-ui,sans-serif"], ['Manrope', "'Manrope',system-ui,sans-serif"], ['Space Grotesk', "'Space Grotesk',system-ui,sans-serif"], ['Fraunces', "'Fraunces',Georgia,serif"], ['JetBrains Mono', "'JetBrains Mono',ui-monospace,monospace"]]; }
  uiVars() {
    const u = this.ui();
    const p = this.pals().find((x) => x[0] === u.pal) || this.pals()[0];
    const T = this.palTones(p[2], p[3], u.mode === 'dark');
    const F = this.fonts(); const f1 = (F.find((x) => x[0] === u.f1) || F[0])[1], f2 = (F.find((x) => x[0] === u.f2) || F[0])[1];
    return Object.keys(T).map((k) => '--' + k + ':' + T[k]).join(';') + ';--f1:' + f1 + ';--f2:' + f2;
  }
  stageFit() { return (el) => { if (!el || el._sf) return; el._sf = true; const f = () => { const s = Math.min(el.clientWidth / 1440, el.clientHeight / 900) || 1; if (Math.abs(s - (this.state.fs || 1)) > 0.002) this.setState({ fs: s }); }; f(); try { new ResizeObserver(f).observe(el); } catch (e) { try { window.addEventListener('resize', f); } catch (er) {} } }; }
  commitNow() { clearTimeout(this.wt); try { window.localStorage.setItem('archivero.lib.v1', JSON.stringify(this.lib())); } catch (e) {} this.setState({ lrev: (this.state.lrev || 0) + 1 }); }
  embKind(u) { const d = this.dom(u); if (/spotify|soundcloud/.test(d)) return 'audio'; if (/(^|\.)x\.com$|twitter/.test(d)) return 'post'; if (/youtube|youtu\.be|vimeo/.test(d)) return 'video'; if (/tiktok/.test(d)) return 'vertical'; return 'web'; }
  shapeOf(it) {
    if (it.kind === 'text') {
      const L = (it.text || '').length;
      const a = L < 140 ? 1.8 : L < 420 ? 2.4 : L < 900 ? 3.2 : 4.4;
      return { a, c: 2, lab: 'texto ' + (L < 140 ? 'corto' : L < 420 ? 'medio' : 'largo') };
    }
    if (it.kind === 'link') {
      const k = this.embKind(it.url);
      if (k === 'audio') return { a: 0.82, c: 2, lab: 'música embebida · cuadrada' };
      if (k === 'post') return { a: 1.6, c: 2, lab: 'publicación embebida · horizontal' };
      if (k === 'video') return { a: 1.45, c: 1, lab: 'video embebido' };
      if (k === 'vertical') return { a: 0.62, c: 2, lab: 'video vertical embebido' };
      return { a: 1.5, c: 1, lab: 'enlace embebido' };
    }
    const ow = it.ow || it.w || 800, oh = it.oh || it.h || 800, r = ow / oh, px = Math.max(ow, oh);
    const c = px < 720 ? 1 : px < 1600 ? 2 : 3;
    const fmt = r >= 1.6 ? 'panorámica' : r <= 0.8 ? 'vertical' : r >= 1.15 ? 'horizontal' : 'cuadrada';
    return { a: Math.max(0.4, Math.min(3.4, r)), c, lab: ['', 'chica', 'mediana', 'grande'][c] + ' · ' + fmt + ' · ' + ow + '×' + oh + (it.kind === 'video' ? ' · video' : it.gif ? ' · gif' : '') };
  }
  sizeOf(it) { return this.shapeOf(it); }
  pack(its, W, G0) {
    const G = G0 == null ? 16 : G0;
    const HC = { 1: 220, 2: 310, 3: 430 };
    const meta = its.map((it) => { const z = this.shapeOf(it); return { it, a: z.a, hc: HC[z.c], lab: z.lab }; });
    const sumA = (r) => r.reduce((t, m) => t + m.a, 0);
    const tgt = (r) => r.reduce((t, m) => t + m.hc, 0) / r.length;
    const hOf = (r) => (W - G * (r.length - 1)) / sumA(r);
    const rows = []; let cur = [];
    meta.forEach((m) => {
      cur.push(m);
      if (hOf(cur) <= tgt(cur)) {
        if (cur.length > 1) { const prev = cur.slice(0, -1); if (Math.abs(hOf(prev) - tgt(prev)) < Math.abs(hOf(cur) - tgt(cur)) && hOf(prev) < tgt(prev) * 1.35) { rows.push(prev); cur = [m]; return; } }
        rows.push(cur); cur = [];
      }
    });
    if (cur.length) { if (rows.length && hOf(cur) > tgt(cur) * 1.4) rows[rows.length - 1] = rows[rows.length - 1].concat(cur); else rows.push(cur); }
    const out = []; let y = 0;
    rows.forEach((r) => {
      let h = hOf(r); const capped = h > 620; if (capped) h = 620;
      let x = 0;
      r.forEach((m, k) => {
        let w = m.a * h; if (!capped && k === r.length - 1) w = W - x;
        let clip = false;
        if (m.it.kind === 'text') { const cpl = Math.max(10, (w - 44) / 8.6); const lines = (m.it.text || '').split('\n').reduce((t, ln) => t + Math.max(1, Math.ceil(ln.length / cpl)), 0); clip = 42 + (m.it.title ? 30 : 0) + lines * 23 > h; }
        out.push({ it: m.it, z: { lab: m.lab, clip }, x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) });
        x += w + G;
      });
      y += h + G;
    });
    return { cards: out, H: Math.max(0, Math.round(y - G)) };
  }
  mbox(it) {
    if (it.kind === 'text') { const L = (it.text || '').length; return L < 140 ? [250, 140] : L < 420 ? [320, 190] : [400, 240]; }
    if (it.kind === 'link') { const k = this.embKind(it.url); return k === 'audio' ? [320, 320] : k === 'post' ? [330, 200] : k === 'video' ? [400, 290] : k === 'vertical' ? [240, 400] : [300, 210]; }
    const ow = it.ow || it.w || 800, oh = it.oh || it.h || 800, r = ow / oh, px = Math.max(ow, oh);
    const Lg = px < 720 ? 270 : px < 1600 ? 420 : 580;
    let w = r >= 1 ? Lg : Lg * r, h = r >= 1 ? Lg / r : Lg;
    const q = Math.min(1, ow / w, oh / h); w *= q; h *= q;
    return [Math.max(120, w), Math.max(90, h)];
  }
  tmap(list, x, y, w, h, G, out) {
    if (!list.length) return;
    if (list.length === 1) { out.push({ m: list[0], x, y, w, h }); return; }
    const tot = list.reduce((t, m) => t + m.A, 0);
    let acc = 0, k = 0;
    while (k < list.length - 1 && acc + list[k].A / 2 < tot / 2) { acc += list[k].A; k++; }
    if (k === 0) { acc = list[0].A; k = 1; }
    const fa = acc / tot, a = list.slice(0, k), b = list.slice(k);
    if (w >= h) { const wa = Math.round((w - G) * fa); this.tmap(a, x, y, wa, h, G, out); this.tmap(b, x + wa + G, y, w - wa - G, h, G, out); }
    else { const ha = Math.round((h - G) * fa); this.tmap(a, x, y, w, ha, G, out); this.tmap(b, x, y + ha + G, w, h - ha - G, G, out); }
  }
  mchunk(its, VW, VH, G) {
    const key = its.map((i) => i.id).join(',') + '|' + VW + 'x' + VH;
    if (this._mc && this._mc.key === key) return this._mc;
    const boxes = its.map((it) => { const b = this.mbox(it); return { it, A: b[0] * b[1] }; });
    const S = boxes.reduce((t, b) => t + b.A, 0) * 1.1;
    const W = Math.round(Math.max(VW, Math.sqrt(S * 1.7))), H = Math.round(Math.max(VH, S / Math.max(VW, Math.sqrt(S * 1.7))));
    const cache = {}; const self = this;
    const mc = { key, W, H, cells(ci, cj) {
      const k = ci + ',' + cj; if (cache[k]) return cache[k];
      let seed = (Math.abs(ci * 7919 + cj * 104729) % 233279) + 1;
      const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      const list = boxes.slice();
      if (ci !== 0 || cj !== 0) for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = list[i]; list[i] = list[j]; list[j] = t; }
      const out = []; self.tmap(list, 0, 0, W, H, G, out);
      cache[k] = out.map((c) => ({ it: c.m.it, x: c.x, y: c.y, w: c.w, h: c.h }));
      return cache[k];
    } };
    this._mc = mc; return mc;
  }
  fichaVals(forceId, onClose) {
    const st = this.state, L = this.lib();
    const id = forceId || st.edId;
    const E = id ? L.items.find((x) => x.id === id) : null;
    const close = () => { if (this.state.closing) return; this.setState({ closing: 'ed' }); clearTimeout(this.ct); this.ct = setTimeout(() => { this.setState({ closing: null, edId: null, fdel: false }); if (onClose) onClose(); }, 320); };
    let pe = {};
    if (E) {
      const up = (k) => (e) => { E[k] = e.target.value; this.commit(); };
      pe = {
        isImg: E.kind === 'img', isVid: E.kind === 'video', isLink: E.kind === 'link', isText: E.kind === 'text',
        kind: E.kind === 'img' ? (E.gif ? 'GIF' : 'Imagen') : E.kind === 'video' ? 'Video' : E.kind === 'link' ? 'Enlace' : 'Texto', date: this.fdate(E.t),
        size: 'Tamaño en el tablero: ' + this.shapeOf(E).lab,
        auto: (E.atags || []).map((t) => ({ t })), hasAuto: (E.atags || []).length > 0,
        src: this.srcOf(E), text: E.text || '', dom: this.dom(E.url), href: E.url || '#',
        title: E.title || '', note: E.note || '', url: E.url || '', tags: E.tags || '',
        onTitle: up('title'), onNote: up('note'), onText: up('text'), onTags: up('tags'),
        onUrl: (e) => { E.url = e.target.value; E.atags = E.url.trim() ? this.siteTags(E.url.trim()) : []; this.commit(); },
        onBoard: (e) => { E.bid = e.target.value; this.commit(); },
        bopts: L.boards.map((b) => ({ v: b.id, l: b.name, sel: b.id === E.bid })),
        delLbl: st.fdel ? 'Tocá de nuevo para eliminar' : 'Eliminar pieza',
        del: () => { if (!this.state.fdel) { this.setState({ fdel: true }); return; } this.mediaDel(E.id); L.items = L.items.filter((x) => x.id !== E.id); this.commitNow(); this.setState({ edId: null, fdel: false }); if (onClose) onClose(); }
      };
    }
    return { edOn: !!E, pe, edClose: close, xEd: st.closing === 'ed' ? 'out' : '' };
  }
  bname(id) { const b = this.lib().boards.find((x) => x.id === id); return b ? b.name : 'Sin tablero'; }
  fdate(t) { const d = new Date(t); const p = (n) => String(n).padStart(2, '0'); return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + String(d.getFullYear()).slice(2) + ', ' + p(d.getHours()) + ':' + p(d.getMinutes()) + 'hs'; }
  dom(u) { if (!u) return ''; try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return String(u).replace(/^https?:\/\//, '').split('/')[0]; } }
  tagsOf(it) { if (!it) return ''; const a = (it.atags || []).concat(String(it.tags || '').split(',')).map((t) => String(t).trim().replace(/^#/, '')).filter(Boolean); return a.filter((t, i) => a.indexOf(t) === i).map((t) => '#' + t).join(' '); }
  allItems() { return this.lib().items.slice().sort((a, b) => b.t - a.t); }
  itemInfo(it) {
    if (!it) return [];
    const out = [];
    if (it.kind === 'text' && it.text) out.push('Texto: ' + it.text.slice(0, 160) + (it.text.length > 160 ? '…' : ''));
    if (it.note) out.push('Nota: ' + it.note);
    if (it.url) out.push('Sitio web: ' + this.dom(it.url));
    out.push('Fecha: ' + this.fdate(it.t));
    out.push('Tablero: ' + this.bname(it.bid));
    const tg = this.tagsOf(it); if (tg) out.push('Etiquetas: ' + tg);
    return out;
  }
  libVals() {
    const its = this.allItems().slice(0, 8);
    return {
      srec: its.map((it, i) => ({ src: this.srcOf(it), title: it.title || 'Sin título', isImg: it.kind === 'img', isVid: it.kind === 'video', noImg: !this.isVis(it), d: (0.3 + i * 0.05).toFixed(2) + 's' })), vref: this.vref(), uiVars: this.uiVars(),
      scrIn: (() => { if (!this._si) { this._si = true; setTimeout(() => { this._siDone = true; this.forceUpdate(); }, 950); } return this._siDone ? '0' : '1'; })(),
      leaving: this.state.leaving ? '1' : '0',
      navOut: () => {}, stageFit: this.stageFit(), fs: this.state.fs || 1,
      srecNone: its.length === 0, libEmpty: this.lib().items.length === 0, libAny: this.lib().items.length > 0
    };
  }
'''

CHIPS_RE = re.compile(r'<div style="display:flex;flex-wrap:wrap;gap:8px">(?:<span class="chip".*?</span>)+</div>')
VT_RE = re.compile(r'<div style="display:flex;gap:8px;overflow:hidden;margin-right:-14px">(?:<div class="vt"[^>]*></div>)+</div>')
BORRAR = '<span style="text-decoration:underline">Borrar</span>'
NO_SEARCH = '<div style="font-size:12px;opacity:.8">Todavía no buscaste nada.</div>'
def VT_DYN(anim):
    a = 'animation:slide-in .6s cubic-bezier(.4,0,.2,1) {{v.d}} both;' if anim else '--d:{{v.d}};'
    return ('<sc-if value="{{srecNone}}" hint-placeholder-val="{{true}}"><div style="font-size:12px;opacity:.8">Lo que guardes va a aparecer acá.</div></sc-if>'
            '<div style="display:flex;gap:8px;overflow:hidden;margin-right:-14px"><sc-for list="{{srec}}" as="v" hint-placeholder-count="0">'
            f'<div class="vt" style="flex:none;width:110px;height:72px;background:#d9d9d9;border-radius:6px;overflow:hidden;{a}">'
            '<sc-if value="{{v.isImg}}" hint-placeholder-val="{{false}}"><img src="{{v.src}}" alt="{{v.title}}" style="width:100%;height:100%;object-fit:cover;display:block"></sc-if>'
            '<sc-if value="{{v.isVid}}" hint-placeholder-val="{{false}}"><video src="{{v.src}}" ref="{{vref}}" muted loop playsinline style="width:100%;height:100%;object-fit:cover;display:block"></video></sc-if>'
            '<sc-if value="{{v.noImg}}" hint-placeholder-val="{{false}}"><span style="display:block;height:100%;box-sizing:border-box;padding:8px;font-size:11px;font-weight:600;line-height:1.25;color:#111;overflow:hidden">{{v.title}}</span></sc-if>'
            '</div></sc-for></div>')
RECENT_LABELS = ['Vistos recientemente', 'Tableros recientes', 'Piezas vistas recientemente']

def patch_search(s):
    """quita las búsquedas y miniaturas de ejemplo de los paneles del buscador"""
    n1 = len(CHIPS_RE.findall(s)); n2 = len(VT_RE.findall(s))
    s = CHIPS_RE.sub(NO_SEARCH, s)
    s = VT_RE.sub(lambda m: VT_DYN('animation:slide-in' in m.group(0)), s)
    s = s.replace(BORRAR, '')
    for l in RECENT_LABELS:
        s = s.replace('>' + l + '</div>', '>Guardado recientemente</div>')
    return s, n1, n2

def add_lib(s):
    """inserta los métodos de la librería en la clase y suma libVals() al return de renderVals"""
    assert '  renderVals() {' in s
    if '  lib() {' not in s:
        s = s.replace('  renderVals() {', LIBJS.strip('\n') + '\n  renderVals() {', 1)
    i = s.index('  renderVals() {')
    j = s.index('\n    return {\n', i)
    s = s[:j] + '\n    return {\n      ...this.libVals(),\n' + s[j + len('\n    return {\n'):]
    return s

def patch_rules(s):
    """las reglas y la pestaña Tableros usan los tableros reales"""
    a = "const TOS = ['', 'Tablero #1', 'Tablero #2', 'Tablero #3', 'Tablero #4', 'Sin clasificar'];"
    if a not in s: return s
    s = s.replace(a, "const TOS = [''].concat(this.lib().boards.map((b) => b.name), ['Sin clasificar']);")
    s = s.replace("const cnt = { 'Tablero #1': 14, 'Tablero #2': 9, 'Tablero #3': 6, 'Tablero #4': 11, 'Sin clasificar': 7 };",
                  "const cnt = { 'Sin clasificar': 0 }; this.lib().boards.forEach((b) => { cnt[b.name] = this.lib().items.filter((i) => i.bid === b.id).length; });")
    s = s.replace("rBoards: ['Tablero #1', 'Tablero #2', 'Tablero #3', 'Tablero #4', 'Sin clasificar'].map(",
                  "rBoards: this.lib().boards.map((b) => b.name).concat(['Sin clasificar']).map(")
    for t in ("'Tablero #1'", "'Tablero #2'", "'Tablero #3'"):
        s = s.replace("to: " + t + ",", "to: '',")
    return s
