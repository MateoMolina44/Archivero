import re
exec(open('/tmp/w/v5/lib30.py').read())
OUT = '/tmp/w/out/'
def rd(f): return open(OUT + f).read()
def wr(f, s):
    assert s.count('<sc-if') == s.count('</sc-if>'), (f, s.count('<sc-if'), s.count('</sc-if>'))
    assert s.count('<sc-for') == s.count('</sc-for>'), f
    open(OUT + f, 'w').write(s)
def rep(s, a, b, n=1):
    assert s.count(a) >= 1, ('missing', a[:90])
    return s.replace(a, b) if n == 0 else s.replace(a, b, n)

EMPTY = lambda col, extra='': (f'<sc-if value="{{{{libEmpty}}}}" hint-placeholder-val="{{{{false}}}}"><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;color:{col};pointer-events:none;z-index:1{extra}">'
    '<div style="font-size:28px;font-weight:700">Todavía no guardaste nada</div>'
    '<div style="font-size:14px;line-height:1.5;max-width:440px">Lo que guardes con la extensión va a ir apareciendo acá, siempre lo último primero.</div></div></sc-if>\n')

# ---------- Ficha compartida (la misma que en los tableros)
_A = rd('Archivo.dc.html')
_i = _A.index('  <!-- Pieza: ver y editar -->'); _j = _A.index('\n  </sc-if>\n', _i) + len('\n  </sc-if>\n')
FICHA = _A[_i:_j].replace('>Eliminar pieza</button>', '>{{pe.delLbl}}</button>')
_css = [ln for ln in _A[:_A.index('</helmet>')].split('\n') if re.match(r'^(\.(ob|pn|in|lbl|ta3|sel3|rz-tag|mdl)[{:. ]|@keyframes (mdl-out|box-out|scale-in|enter)\{)', ln)]
def add_ficha(s, before):
    i = s.index('</style>\n</helmet>')
    s = s[:i] + '\n'.join(ln for ln in _css if ln not in s) + '\n' + s[i:]
    i = s.index(before)
    return s[:i] + FICHA + s[i:]

# ---------- Principal vista 2 (mosaico)
s = rd('Main.dc.html')
i0 = s.index("    const W = 2904, H = 1824;"); j0 = s.index("    const tn = this.state.tn;", i0)
s = s[:i0] + """    const VW = window.innerWidth || 1440, VH = window.innerHeight || 900, GM = 12;
    const ITEMS = this.allItems();
    const CHK = this.mchunk(ITEMS, VW, VH, GM);
    const PW = CHK.W + GM, PH = CHK.H + GM;
    const ox = this.state.px, oy = this.state.py;
    const IO = this.introVals();
""" + s[j0:]
i0 = s.index("    const sx = 1440 / 589, sy = 900 / 386;"); j0 = s.index("    const sph = this.state.phase", i0)
s = s[:i0] + """    const tones = ['#afafaf', '#a7a7a7', '#b7b7b7'];
    const tiles = [];
    if (ITEMS.length) {
      const a0 = Math.floor(-ox / PW), a1 = Math.floor((-ox + VW) / PW), b0 = Math.floor(-oy / PH), b1 = Math.floor((-oy + VH) / PH);
      for (let ci = a0; ci <= a1; ci++) for (let cj = b0; cj <= b1; cj++) CHK.cells(ci, cj).forEach((r, i) => {
        const it = r.it; const main = ci === 0 && cj === 0;
        const L = ci * PW + r.x, T = cj * PH + r.y, w = r.w, h = r.h;
        const tone = tones[i % 3]; const isrc = it.kind === 'img' ? this.thumbOf(it) : this.srcOf(it);
        const bg = it.kind === 'img' && isrc ? 'url("' + isrc + '") center/cover no-repeat' : tone;
        const id = ci + ',' + cj + ',' + i;
        const ek = it.kind === 'link' ? this.embKind(it.url) : '';
        tiles.push(Object.assign({
          l: L, t: T, w, h, bg, tab: main ? '0' : '-1',
          delay: ((this._io !== 'done' ? (this._ioOff || 0) : 0) + (main ? 0.05 + Math.min(i, 20) * 0.06 : 0.1)).toFixed(2) + 's',
          fs: w > 420 ? 40 : (w > 250 ? 26 : 16), ts: w > 420 ? 15 : (w > 250 ? 12 : 9),
          pick: () => this.pick({ l: L + ox, t: T + oy, w, h }, bg, it.id)
        }, { name: it.title || 'Sin título', tags: this.tagsOf(it) || ' ', vid: it.kind === 'video', vsrc: it.kind === 'video' ? isrc : '', isText: it.kind === 'text', text: it.text || '', isLink: it.kind === 'link', dom: (ek === 'video' ? '▶  ' : ek === 'audio' ? '♪  ' : '') + this.dom(it.url) }, typed(id, it.title || 'Sin título', this.tagsOf(it))));
      });
    }
""" + s[j0:]
s = rep(s, "down: (e) => { if (e.button !== 1) return;", "down: (e) => { if (e.button !== 1 || this.state.sel || this.state.edId) return;")
s = rep(s, "enter: () => { if (this.state.hov !== id) this.startType(id, total); }", "enter: () => { if (this.state.sel) return; if (this.state.hov !== id) this.startType(id, total); }")
s = rep(s, "move: (e) => { if (!this.drag) return; this.setState({ px: this.drag.px + e.clientX - this.drag.x, py: this.drag.py + e.clientY - this.drag.y }); },", "move: (e) => { if (!this.drag) return; this.setState({ px: this.drag.px + e.clientX - this.drag.x, py: this.drag.py + e.clientY - this.drag.y }); },\n      wheelM: (e) => { if (this.state.sel || this.state.edId) return; const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX, dy = e.shiftKey ? 0 : e.deltaY; this.setState({ px: this.state.px - dx, py: this.state.py - dy }); },\n      io: IO,")
s = rep(s, '<div class="mos" onMouseDown="{{down}}"', '<div class="mos" data-io="{{io.ui}}" onWheel="{{wheelM}}" onMouseDown="{{down}}"')
s = rep(s, "  pick(rect, tone, board) {", r"""  introVals() {
    if (this._io === undefined) {
      const mode = this.props.intro ?? 'sesion';
      let play = mode === 'siempre';
      if (mode === 'sesion') { try { play = !window.sessionStorage.getItem('archivero.intro'); window.sessionStorage.setItem('archivero.intro', '1'); } catch (e) { play = true; } }
      this._io = play ? 'load' : 'done'; this._ioOff = play ? 1.95 : 0; this._ioPct = play ? 0 : 100;
      if (play) {
        this.ioT = [setTimeout(() => { this._io = 'grow'; this.forceUpdate(); }, 1300), setTimeout(() => { this._io = 'reveal'; this.forceUpdate(); }, 1950), setTimeout(() => { this._io = 'done'; this.forceUpdate(); }, 3300)];
        const t0 = Date.now(); this.ioI = setInterval(() => { this._ioPct = Math.min(100, Math.round((Date.now() - t0) / 11)); this.forceUpdate(); if (this._ioPct >= 100) clearInterval(this.ioI); }, 40);
      }
    }
    const ph = this._io;
    const into = ph === 'grow' || ph === 'reveal';
    return {
      on: ph !== 'done', ui: ph === 'done' ? '0' : '1', pct: this._ioPct, pctOp: ph === 'load' ? 1 : 0,
      bg: ph === 'reveal' ? 'transparent' : 'var(--bg)', pe: ph === 'reveal' ? 'none' : 'auto',
      cube: 'position:absolute;inset:0;transform-style:preserve-3d;' + (ph === 'load' ? 'animation:cube-in 1.3s cubic-bezier(.45,0,.2,1) both' : 'transform:translateZ(' + (into ? 1150 : 0) + 'px);transition:transform .8s cubic-bezier(.7,0,.84,0),opacity .5s ease .45s;opacity:' + (ph === 'reveal' ? 0 : 1))
    };
  }
  pick(rect, tone, board) {""")
s = rep(s, "const pieceStyle = 'position:absolute;z-index:31;pointer-events:none;overflow:hidden;background:' + this.state.selTone + ';left:' + rr.l + 'px;top:' + rr.t + 'px;width:' + rr.w + 'px;height:' + rr.h + 'px;border-radius:10px';", "const pieceStyle = 'position:absolute;z-index:31;pointer-events:none;overflow:hidden;background:' + this.state.selTone + ';left:' + rr.l + 'px;top:' + rr.t + 'px;width:' + rr.w + 'px;height:' + rr.h + 'px;border-radius:10px;transform:' + (sopen ? 'translate3d(0,-10px,0) scale(1.025)' : 'none') + ';box-shadow:' + (sopen ? '0 28px 60px rgba(0,0,0,.38)' : '0 0 0 rgba(0,0,0,0)') + ';transition:transform .6s cubic-bezier(.19,1,.22,1),box-shadow .6s cubic-bezier(.19,1,.22,1)';")
s = rep(s, "  componentWillUnmount() {", "  componentWillUnmount() { (this.ioT || []).forEach(clearTimeout); clearInterval(this.ioI);")
s = rep(s, '"$preview":{"width":1440,"height":1824}', '"intro":{"editor":"enum","options":["sesion","siempre","nunca"],"default":"sesion"},"$preview":{"width":1440,"height":900}')
IOM = """  <!-- Intro: un cubo (después, el logo) gira mientras carga; la cámara entra en él y aparecen los mosaicos -->
  <sc-if value="{{io.on}}" hint-placeholder-val="{{false}}">
  <div aria-hidden="true" style="position:absolute;inset:0;z-index:70;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:{{io.bg}};transition:background-color .6s cubic-bezier(.4,0,.2,1);pointer-events:{{io.pe}}">
    <div style="position:relative;width:150px;height:150px;perspective:900px">
      <div style="{{io.cube}}">
        <div class="cf" style="background:#afafaf;transform:translateZ(75px)"></div>
        <div class="cf" style="background:#a3a3a3;transform:rotateY(180deg) translateZ(75px)"></div>
        <div class="cf" style="background:#a7a7a7;transform:rotateY(90deg) translateZ(75px)"></div>
        <div class="cf" style="background:#a7a7a7;transform:rotateY(-90deg) translateZ(75px)"></div>
        <div class="cf" style="background:#b7b7b7;transform:rotateX(90deg) translateZ(75px)"></div>
        <div class="cf" style="background:#b7b7b7;transform:rotateX(-90deg) translateZ(75px)"></div>
      </div>
    </div>
    <div style="font-size:15px;font-weight:600;color:#575757;font-variant-numeric:tabular-nums;opacity:{{io.pctOp}};transition:opacity .3s cubic-bezier(.4,0,.2,1)">{{io.pct}}%</div>
  </div>
  </sc-if>
"""
i = s.index('  <button class="sb"')
s = s[:i] + IOM + s[i:]
s = rep(s, '.tile:hover .ti,.tile:focus-visible .ti{transform:scale(1.06)}', '')
s = rep(s, '</style>\n</helmet>', '@keyframes cube-in{0%{transform:rotateX(-28deg) rotateY(-300deg)}100%{transform:rotateX(0) rotateY(0)}}\n.cf{position:absolute;inset:0;border-radius:4px;border:1px solid rgba(255,255,255,.28);box-sizing:border-box;backface-visibility:visible}\n@keyframes ui-in{0%{opacity:0}100%{opacity:1}}\n[data-io="1"] .sb,[data-io="1"] .sec{opacity:0;pointer-events:none}\n[data-io="0"] .sb,[data-io="0"] .sec{animation:ui-in .7s cubic-bezier(.4,0,.2,1) backwards}\n</style>\n</helmet>')
s = rep(s, '<a class="fv" href="Seleccion.dc.html" style="pointer-events:{{linkPE}}">Ver ficha completa</a>', '<button class="fv" onClick="{{openFicha}}" style="pointer-events:{{linkPE}};background:none;border:0;padding:0;font:inherit;font-size:14px;cursor:pointer">Ver ficha completa</button>')
s = rep(s, "      close: () => this.closeSel()", "      close: () => this.closeSel(),\n      ...this.fichaVals(),\n      openFicha: () => { const id = this.state.selBoard; clearTimeout(this.t1); this.setState({ sel: false, phase: 'idle', edId: id }); }")
s = add_ficha(s, '  <sc-if value="{{sOn}}"')
s, a, b = patch_search(s); assert a == 1 and b == 1
s = add_lib(s); s = patch_rules(s)
s = rep(s, '<span aria-hidden="true" style="visibility:hidden">Nombre</span>', '<span aria-hidden="true" style="visibility:hidden">{{t.name}}</span>')
s = rep(s, '<span aria-hidden="true" style="visibility:hidden">#tag1 #tag2 #tag3</span>', '<span aria-hidden="true" style="visibility:hidden">{{t.tags}}</span>')
s = rep(s, "    this.setState({ sel: true, phase: 'enter', rect, selTone: tone, selBoard: board });", "    this.setState({ sel: true, phase: 'enter', rect, selTone: tone, selBoard: board });\n    this.lib().selId = board; this.commitNow();")
m = re.search(r'      <div style="font-size:26px;line-height:1.2">Nombre de pieza</div>\n      <div style="margin-top:14px;font-size:15px;line-height:1.4">\n.*?(?=        <(?:a|button) class="fv")', s, re.S)
assert m
s = s.replace(m.group(0), '      <div style="font-size:26px;line-height:1.2;overflow-wrap:anywhere">{{selTitle}}</div>\n      <div style="margin-top:14px;font-size:15px;line-height:1.4">\n        <sc-for list="{{selInfo}}" as="ln" hint-placeholder-count="4"><p style="margin:0 0 14px;overflow-wrap:anywhere">{{ln.t}}</p></sc-for>\n')
s = rep(s, "      sel: !!this.state.sel, selBoard: this.state.selBoard,", "      sel: !!this.state.sel, selBoard: this.state.selBoard, selTitle: ((this.lib().items.find((x) => x.id === this.state.selBoard) || {}).title) || 'Sin título', selInfo: this.itemInfo(this.lib().items.find((x) => x.id === this.state.selBoard)).map((t) => ({ t })),")
s = rep(s, '<div class="ti" style="position:absolute;inset:0;background:{{t.bg}}"></div>', '<div class="ti" style="position:absolute;inset:0;background:{{t.bg}}"><sc-if value="{{t.vid}}" hint-placeholder-val="{{false}}"><video src="{{t.vsrc}}" ref="{{vref}}" muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video></sc-if><sc-if value="{{t.isText}}" hint-placeholder-val="{{false}}"><span style="position:absolute;inset:0;padding:14px 16px;background:#575757;font-size:13px;line-height:1.5;white-space:pre-wrap;overflow:hidden;text-align:left;-webkit-mask-image:linear-gradient(#000 75%,transparent);mask-image:linear-gradient(#000 75%,transparent)">{{t.text}}</span></sc-if><sc-if value="{{t.isLink}}" hint-placeholder-val="{{false}}"><span style="position:absolute;inset:0;display:flex;align-items:flex-end;padding:14px;background:#1f1f1f;background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.04) 0 10px,transparent 10px 20px);font-size:12px;font-weight:600;text-align:left">{{t.dom}}</span></sc-if></div>')
i = s.index('  <button class="sb"')
s = s[:i] + '  ' + EMPTY('#575757') + s[i:]
wr('Main.dc.html', s)

# ---------- Principal vista 1 (pantalla completa)
s = rd('Main1.dc.html')
s, a, b = patch_search(s); assert a == 1 and b == 1
s = add_lib(s); s = patch_rules(s)
s = re.sub(r"  names\(\) \{ return \[.*?\]; \}", "  names() { return this.order().map((i) => i.title || 'Sin título'); }", s, count=1)
i = s.index('  infoLines(i) {'); j = s.index('  typeTitle() {')
s = s[:i] + """  infoLines(i) { return this.itemInfo(this.order()[i || 0]); }
  order() {
    const all = this.allItems();
    if (!this._perm) { this._perm = all.map((x) => x.id); for (let i = this._perm.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = this._perm[i]; this._perm[i] = this._perm[j]; this._perm[j] = t; } }
    const ids = all.map((x) => x.id);
    const known = this._perm.filter((id) => ids.indexOf(id) >= 0);
    this._perm = ids.filter((id) => known.indexOf(id) < 0).concat(known);
    return this._perm.map((id) => all.find((x) => x.id === id));
  }
  shuffle() { if (this.state.open) return; this._perm = null; this.setState({ index: 0, n: 0 }); this.typeTitle(); }
""" + s[j:]
s = rep(s, "const len = this.names()[this.state.index].length;", "const len = (this.names()[this.state.index] || '').length;")
s = rep(s, "Math.min(4, this.state.index + delta)", "Math.min(Math.max(0, this.names().length - 1), this.state.index + delta)")
s = rep(s, "  toggle() {\n    if (!this.state.entered) return;", "  toggle() {\n    if (!this.state.entered || !this.names().length) return;")
s = rep(s, "      this.setState({ open: true, m: 0 });", "      this.setState({ open: true, m: 0 });\n      const sit = this.order()[this.state.index]; if (sit) { this.lib().selId = sit.id; this.commitNow(); }")
s = rep(s, "    const { index, entered, n, open, m, tn } = this.state;", """    let { index, entered, n, open, m, tn } = this.state;
    const ITEMS = this.order(); const N = ITEMS.length;
    index = Math.min(index, Math.max(0, N - 1));
    const FIT = this.ui().fit || 'blur';
    const FITS = [['blur', 'fondo desenfocado'], ['color', 'color de fondo'], ['frame', 'marco a tamaño real'], ['cover', 'ampliar y recortar']];""")
s = rep(s, "boxStyle: 'background:' + tones[i] +", """tags: this.tagsOf(ITEMS[i]),
        ...(() => {
          const it = ITEMS[i]; const vis = this.isVis(it); const src = vis ? this.srcOf(it) : '';
          const ow = (it && (it.ow || it.w)) || 0, oh = (it && (it.oh || it.h)) || 0;
          const big = ow >= 1920 && oh >= 1080;
          const mode = !vis ? 'none' : big ? 'cover' : FIT;
          const cov = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover';
          const fit = 'position:absolute;left:6%;top:260px;width:88%;height:calc(100% - 520px);object-fit:contain';
          const frm = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);max-width:80%;max-height:calc(100% - 560px);width:auto;height:auto;padding:18px;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,.35)';
          return {
            src, fgImg: vis && it.kind === 'img', fgVid: vis && it.kind === 'video',
            blur: mode === 'blur', blurImg: mode === 'blur' && it.kind === 'img', blurVid: mode === 'blur' && it.kind === 'video',
            fgStyle: mode === 'cover' ? cov : mode === 'frame' ? frm : fit,
            bgCol: mode === 'color' ? ((it && it.avg) || 'var(--t1)') : mode === 'frame' ? 'var(--bg)' : 'transparent',
            fan: 'fa-' + FIT, ban: 'fb-' + FIT,
            fitTag: !vis ? '' : big ? 'Ocupa la pantalla (' + ow + '×' + oh + ')' : 'Menor a 1920×1080 (' + ow + '×' + oh + ')'
          };
        })(),
        boxStyle: 'background:' + tones[i % 5] +""")
s = rep(s, "counter: '0' + (index + 1) + ' / 05',", """counter: N ? String(index + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0') : '',
      shuffle: () => this.shuffle(),
      fitLbl: (FITS.find((x) => x[0] === FIT) || FITS[0])[1],
      cycleFit: () => { const k = FITS.findIndex((x) => x[0] === FIT); this.uiSet({ fit: FITS[(k + 1) % FITS.length][0] }); },
      curFitTag: N ? (pieces[index] || {}).fitTag || '' : '',""")
s = rep(s, '<span class="tg">#tag1 #tag2 #tag3</span>', '<span class="tg">{{p.tags}}</span>')
s = rep(s, '<a class="nv" href="Seleccion.dc.html" tabindex="{{p.linkTab}}"', '<button class="nv" onClick="{{openFicha}}" tabindex="{{p.linkTab}}"')
s = rep(s, '>Ver ficha completa</a>', '>Ver ficha completa</button>')
s = rep(s, "      shuffle: () => this.shuffle(),", "      shuffle: () => this.shuffle(),\n      ...this.fichaVals(),\n      openFicha: () => { const it = ITEMS[index]; if (it) this.setState({ edId: it.id }); },")
s = add_ficha(s, '  <sc-if value="{{sOn}}"')
s = rep(s, '<div class="img" style="{{p.imgStyle}}"></div>', """<div class="img" style="{{p.imgStyle}};background-color:{{p.bgCol}}">
        <sc-if value="{{p.blurImg}}" hint-placeholder-val="{{false}}"><img src="{{p.src}}" alt="" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:blur(48px) brightness(.72);transform:scale(1.15);animation:{{p.ban}} .9s cubic-bezier(.19,1,.22,1) backwards"></sc-if>
        <sc-if value="{{p.blurVid}}" hint-placeholder-val="{{false}}"><video src="{{p.src}}" ref="{{vref}}" muted loop playsinline aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:blur(48px) brightness(.72);transform:scale(1.15);animation:{{p.ban}} .9s cubic-bezier(.19,1,.22,1) backwards"></video></sc-if>
        <sc-if value="{{p.fgImg}}" hint-placeholder-val="{{true}}"><img src="{{p.src}}" alt="" style="{{p.fgStyle}};animation:{{p.fan}} .9s cubic-bezier(.19,1,.22,1) backwards"></sc-if>
        <sc-if value="{{p.fgVid}}" hint-placeholder-val="{{false}}"><video src="{{p.src}}" ref="{{vref}}" muted loop playsinline style="{{p.fgStyle}};animation:{{p.fan}} .9s cubic-bezier(.19,1,.22,1) backwards"></video></sc-if>
      </div>""")
s = rep(s, '.img{position:absolute;left:0;top:-180px;width:100%;height:1260px;', '.img{position:absolute;left:0;top:-180px;width:100%;height:calc(100% + 360px);overflow:hidden;')
FK = ''.join('@keyframes fa-%s{0%%{opacity:0;filter:blur(10px)}100%%{opacity:1;filter:blur(0)}}@keyframes fb-%s{0%%{opacity:0}100%%{opacity:1}}' % (k, k) for k in ('blur', 'color', 'frame', 'cover'))
s = rep(s, '.dark{', FK + '\n.dark{')
s = rep(s, 'overflow:hidden;transition:transform 1.2s cubic-bezier(.19,1,.22,1)}', 'overflow:hidden;transition:transform 1.2s cubic-bezier(.19,1,.22,1),background-color .8s cubic-bezier(.4,0,.2,1)}')
s = rep(s, "titleStyle: 'transform:translate3d(0,' + (-d * 135 + (o ? -300 : 0)) + 'px,0)',", "titleStyle: 'transform:translate3d(0,calc(' + (-d * 135) + 'px' + (o ? ' - 50vh + 150px' : ' + 0px') + '),0)', tsz: name.length > 30 ? 34 : name.length > 18 ? 46 : 64,")
s = rep(s, '<span class="tt">', '<span class="tt" style="font-size:{{p.tsz}}px;max-width:88vw;overflow:hidden;text-overflow:ellipsis">')
nav = '  <div style="position:absolute;left:30px;bottom:30px;display:flex;gap:24px;align-items:center;z-index:9">'
i = s.index(nav); j = s.index('  </div>\n', i)

j = s.index('  </div>\n', i) + len('  </div>\n')
s = s[:i] + '  <sc-if value="{{libAny}}" hint-placeholder-val="{{true}}">\n  <div style="position:absolute;right:30px;bottom:80px;font-size:12px;z-index:9;text-align:right;text-shadow:0 1px 6px rgba(0,0,0,.35)">{{curFitTag}}</div>\n  <div style="position:absolute;right:30px;bottom:30px;display:flex;gap:24px;align-items:center;z-index:9">\n    <button class="nv" onClick="{{shuffle}}" aria-label="Mezclar el orden" style="min-height:44px">Mezclar</button>\n    <button class="nv" onClick="{{cycleFit}}" aria-label="Cambiar cómo se adaptan las imágenes chicas" style="min-height:44px">Ajuste: {{fitLbl}}</button>\n  </div>\n' + s[i:j] + '  </sc-if>\n  ' + EMPTY('#2f2f2f') + s[j:]
wr('Main1.dc.html', s)

# ---------- Ficha completa (Selección)
s = rd('Seleccion.dc.html')
s, a, b = patch_search(s); assert a == 1 and b == 1
i = s.index('  <!-- Elemento extendido -->'); j = s.index('  <!-- Buscador -->')
SEL = '''  <sc-if value="{{hasSel}}" hint-placeholder-val="{{true}}">
  <!-- Elemento extendido -->
  <div style="position:absolute;left:0;top:168px;width:886px;height:732px;background:#afafaf;border-radius:0 10px 0 0;overflow:hidden">
    <sc-if value="{{sel.isImg}}" hint-placeholder-val="{{false}}"><img src="{{sel.src}}" alt="{{sel.title}}" style="width:100%;height:100%;object-fit:contain;display:block"></sc-if>
    <sc-if value="{{sel.isVid}}" hint-placeholder-val="{{false}}"><video src="{{sel.src}}" ref="{{vref}}" muted loop playsinline style="width:100%;height:100%;object-fit:contain;display:block"></video></sc-if>
    <sc-if value="{{sel.noImg}}" hint-placeholder-val="{{true}}"><div style="padding:48px;font-size:22px;line-height:1.5;color:#111;white-space:pre-wrap;overflow-wrap:anywhere">{{sel.body}}</div></sc-if>
  </div>
  <!-- Información del elemento -->
  <div style="position:absolute;left:929px;top:168px;width:470px;font-weight:700">
    <div style="font-size:26px;line-height:1.2;overflow-wrap:anywhere">{{sel.title}}</div>
    <div style="margin-top:14px;font-size:15px;line-height:1.4"><sc-for list="{{sel.lines}}" as="ln" hint-placeholder-count="5"><p style="margin:0 0 16px;overflow-wrap:anywhere">{{ln.t}}</p></sc-for></div>
  </div>
  </sc-if>
  <sc-if value="{{noSel}}" hint-placeholder-val="{{false}}"><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;color:#575757">
    <div style="font-size:28px;font-weight:700">No hay ninguna pieza abierta</div>
    <div style="font-size:14px;line-height:1.5;max-width:440px">Abrí una pieza desde un tablero o desde la pantalla principal y tocá «Ver ficha completa».</div>
  </div></sc-if>
'''
NOSEL = SEL[SEL.index('  <sc-if value="{{noSel}}"'):]
s = s[:i] + NOSEL + '  <a ref="{{backRef}}" href="Main.dc.html" tabindex="-1" aria-hidden="true" style="position:absolute;width:1px;height:1px;overflow:hidden;opacity:0">volver</a>\n<!--FICHA-->' + s[j:]
s = add_ficha(s, '<!--FICHA-->')
s = add_lib(s)
s = rep(s, "  renderVals() {", '''  selVals() {
    const L = this.lib();
    const it = L.items.find((x) => x.id === L.selId) || this.allItems()[0];
    if (!it) return { hasSel: false, noSel: true, sel: {} };
    return { hasSel: true, noSel: false, sel: { id: it.id, title: it.title || 'Sin título', isImg: it.kind === 'img', isVid: it.kind === 'video', noImg: !this.isVis(it), src: this.srcOf(it), body: it.kind === 'text' ? (it.text || '') : (it.url || ''), lines: this.itemInfo(it).map((t) => ({ t })) } };
  }
  renderVals() {''')
s = rep(s, '      ...this.libVals(),\n', '      ...this.libVals(), ...this.selVals(), ...this.fichaVals(this.selVals().sel.id, () => { if (this.backEl) this.backEl.click(); }), backRef: (el) => { this.backEl = el; },\n')
wr('Seleccion.dc.html', s)

# ---------- Buscadores (estado fijo con el panel abierto)
for f in ('Buscador.dc.html', 'BuscadorVista1.dc.html', 'BuscadorArchivo.dc.html', 'BuscadorTablero.dc.html'):
    s = rd(f)
    s, a, b = patch_search(s); assert a == 1 and b == 1, f
    root = re.search(r'<div class="bz \{\{cls\}\}"[^>]*>\n', s)
    i = root.end(); j = s.index('\n', i) + 1
    assert 'background:#a' in s[i:j] or 'background:#afafaf' in s[i:j], f
    s = s[:i] + s[j:]
    s = s.replace('Buscar en Tablero #1…', 'Buscar en este tablero…')
    s = add_lib(s)
    wr(f, s)

# ---------- Anotador: el buscador muestra tus notas, no ejemplos
s = rd('Anotador.dc.html')
s, a, b = patch_search(s); assert a == 1 and b == 1
s = s.replace('{{srecNone}}', '{{nrecNone}}').replace('{{srec}}', '{{nrec}}').replace('Lo que guardes va a aparecer acá.', 'Tus notas van a aparecer acá.').replace('>Páginas recientes</div>', '>Notas recientes</div>')
i = s.index('  renderVals() {'); j = s.index('\n    return {\n', i)
s = s[:j] + "\n    return {\n      nrec: this.notes.slice().reverse().slice(0, 8).map((nt, k) => ({ title: nt.title || 'Sin título', isImg: false, noImg: true, src: '', d: (0.3 + k * 0.05).toFixed(2) + 's' })), nrecNone: this.notes.length === 0,\n" + s[j + len('\n    return {\n'):]
CHECK_ = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>'
# ---- Anotador: portada, Listo, eliminar y ordenar
s = rep(s, "  makeNote() {", """  saveNote() {
    const name = this.state.draft.trim(); if (!name) return;
    const E = this.state.nmEdit ? this.notes.find((n) => n.id === this.state.nmEdit) : null;
    if (E) { E.title = name; E.cover = this.state.ncov || null; this.setState({ naming: false, draft: '', nmEdit: null, ncov: null }); return; }
    const nt = this.blank(name); nt.cover = this.state.ncov || null; nt.ct = Date.now();
    if (this.nsort === 'recent') this.notes.unshift(nt); else this.notes.push(nt);
    this.setState({ naming: false, draft: '', nmEdit: null, ncov: null, view: 'book', ci: this.notes.indexOf(nt), flip: false, chov: false });
    this.startFn();
  }
  sortNotes(k) {
    this.nsort = k; const N = this.notes; N.forEach((n, i) => { if (!n.ct) n.ct = i + 1; });
    if (k === 'recent') N.sort((a, b) => b.ct - a.ct); else if (k === 'old') N.sort((a, b) => a.ct - b.ct); else if (k === 'az') N.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'es'));
    this.setState({ nsortOpen: false, ci: 0 });
  }
  moveNote(id, where) { const N = this.notes; const i = N.findIndex((n) => n.id === id); if (i < 0) return; const n = N.splice(i, 1)[0]; if (where === 'first') N.unshift(n); else N.push(n); this.nsort = 'manual'; this.setState({ nmenu: null, ci: 0 }); }
  delNote(id) { this.notes = this.notes.filter((n) => n.id !== id); this.setState({ nconf: null, ci: Math.max(0, Math.min(this.state.ci, this.notes.length - 1)), view: this.notes.length ? this.state.view : 'grid', flip: false }); }
  notesExtra() {
    const st = this.state;
    const E = st.nmEdit ? this.notes.find((n) => n.id === st.nmEdit) : null;
    const NS = [['recent', 'Más recientes primero'], ['old', 'Más antiguas primero'], ['az', 'Nombre (A–Z)']];
    let menu = null;
    if (st.nmenu) {
      const n = this.notes.find((x) => x.id === st.nmenu.id);
      if (n) menu = { style: 'left:' + Math.max(16, Math.min(1440 - 236, st.nmenu.x - 220)) + 'px;top:' + Math.min(900 - 236, st.nmenu.y + 6) + 'px', items: [
        ['Abrir', () => { this.setState({ nmenu: null }); this.open(this.notes.indexOf(n)); }],
        ['Editar nombre y portada', () => this.setState({ nmenu: null, naming: true, nmEdit: n.id, draft: n.title || '', ncov: n.cover || null })],
        ['Mover al principio', () => this.moveNote(n.id, 'first')], ['Mover al final', () => this.moveNote(n.id, 'last')],
        ['Eliminar', () => this.setState({ nmenu: null, nconf: n.id })]
      ].map((x) => ({ l: x[0], act: x[1] })) };
    }
    const C = st.nconf ? this.notes.find((x) => x.id === st.nconf) : null;
    return {
      nmTitle: E ? 'Editar nota' : 'Nueva nota', nmBtn: E ? 'Guardar' : 'Crear nota',
      nmHint: E ? 'Cambiá el nombre o la imagen de portada.' : 'Ponele un nombre para poder empezar a escribir. Es obligatorio; la portada es opcional.',
      nmHasCov: !!st.ncov, nmCov: st.ncov || '', nmCovLbl: st.ncov ? 'Cambiar imagen' : 'Elegir imagen',
      pickCov: () => { if (this.covEl) this.covEl.click(); }, dropCov: () => this.setState({ ncov: null }), covRef: (el) => { this.covEl = el; },
      onCov: (e) => { const f = e.target.files && e.target.files[0]; e.target.value = ''; if (!f) return; const fr = new FileReader(); fr.onload = () => { const im = new Image(); im.onload = () => { let src = fr.result; try { const k = Math.min(1, 700 / Math.max(im.width, im.height)); const c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); src = c.toDataURL('image/jpeg', 0.85); } catch (er) {} this.setState({ ncov: src }); }; im.src = fr.result; }; fr.readAsDataURL(f); },
      nmenuOn: !!menu, nmenu: menu || { style: '', items: [] }, closeNMenu: () => this.setState({ nmenu: null }),
      nconfOn: !!C, nconfTitle: C ? '¿Eliminar «' + (C.title || 'Sin título') + '»?' : '', nconfNo: () => this.setState({ nconf: null }), nconfYes: () => { if (C) this.delNote(C.id); },
      nSortAct: () => this.setState({ nsortOpen: !st.nsortOpen, nmenu: null }), nSortRing: st.nsortOpen ? '0 0 0 2px var(--pill),0 0 0 4px #fff' : 'none',
      nsortOpen: !!st.nsortOpen, closeNSort: () => this.setState({ nsortOpen: false }),
      nsorts: NS.map((x) => ({ l: x[1], on: this.nsort === x[0] ? 'true' : 'false', mark: this.nsort === x[0] ? 1 : 0, pick: () => this.sortNotes(x[0]) })),
      doneAct: () => { if (this.state.flip) this.toggleFlip(); else this.back(); },
      doneBack: (e) => { if (e) e.stopPropagation(); this.toggleFlip(); }
    };
  }
  makeNote() {""")
s = rep(s, "createNote: () => this.makeNote(),", "createNote: () => this.saveNote(),")
s = rep(s, "if (e.key === 'Enter') this.makeNote();", "if (e.key === 'Enter') this.saveNote();")
s = rep(s, "cancelName: () => this.setState({ naming: false, draft: '' }),", "cancelName: () => this.setState({ naming: false, draft: '', nmEdit: null, ncov: null }),")
s = s.replace("this.setState({ naming: true, draft: '' })", "this.setState({ naming: true, draft: '', nmEdit: null, ncov: null })")
s = rep(s, "        pick: () => { if (this.drag) return; this.open(a.i); }\n      }, thumb(a.nt)));", """        pick: () => { if (this.drag) return; this.open(a.i); },
        cover: a.nt.cover || '', hasCov: !!a.nt.cover,
        more: (e) => { e.stopPropagation(); const r = e.currentTarget.getBoundingClientRect(); const sg = e.currentTarget.closest('.mos'); const R = sg ? sg.getBoundingClientRect() : { left: 0, top: 0, width: 1440 }; const k = 1440 / (R.width || 1440); this.setState({ nmenu: { id: a.nt.id, x: (r.right - R.left) * k, y: (r.bottom - R.top) * k }, nsortOpen: false }); }
      }, thumb(a.nt)));""")
s = rep(s, "      tiles, cards,", "      ...this.notesExtra(),\n      tiles, cards,")
# marcado
s = rep(s, '</div></sc-for>\n          </div>\n        </button>', '</div></sc-for>\n          </div>\n        </button>')
s = rep(s, '<div class="pop" style="{{t.popStyle}}" aria-hidden="true"><b style="overflow-wrap:anywhere">{{t.title}}</b></div>', '<sc-if value="{{t.hasCov}}" hint-placeholder-val="{{false}}"><div aria-hidden="true" style="position:absolute;left:0;top:0;width:250px;height:333px;transform:translateZ(68px);pointer-events:none;border-radius:6px;overflow:hidden;box-shadow:0 14px 34px rgba(0,0,0,.28)"><img src="{{t.cover}}" alt="" style="width:100%;height:100%;object-fit:cover;display:block"></div></sc-if>\n        <div class="pop" style="{{t.popStyle}}" aria-hidden="true"><b style="overflow-wrap:anywhere">{{t.title}}</b></div>\n        <button class="nmb" onClick="{{t.more}}" aria-label="Opciones de {{t.title}}"><svg width="16" height="16" viewBox="0 0 16 16" fill="#fff" aria-hidden="true"><circle cx="3.5" cy="8" r="1.4"/><circle cx="8" cy="8" r="1.4"/><circle cx="12.5" cy="8" r="1.4"/></svg></button>')
s = rep(s, '<div style="font-size:20px;font-weight:700">Nueva nota</div>', '<div style="font-size:20px;font-weight:700">{{nmTitle}}</div>')
s = rep(s, 'Ponele un nombre para poder empezar a escribir. Es obligatorio.</div>', '{{nmHint}}</div>')
s = rep(s, 'aria-label="Nombre de la nota" maxlength="40">', 'aria-label="Nombre de la nota" maxlength="40">\n        <div style="font-size:12px;font-weight:600;margin:16px 0 8px">Imagen de portada (opcional)</div>\n        <div style="display:flex;gap:10px;align-items:center"><div style="width:66px;height:88px;border-radius:6px;background:#464646;overflow:hidden;flex:none"><sc-if value="{{nmHasCov}}" hint-placeholder-val="{{false}}"><img src="{{nmCov}}" alt="Portada elegida" style="width:100%;height:100%;object-fit:cover;display:block"></sc-if></div><button class="ob" onClick="{{pickCov}}">{{nmCovLbl}}</button><sc-if value="{{nmHasCov}}" hint-placeholder-val="{{false}}"><button class="ob" onClick="{{dropCov}}" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)">Quitar</button></sc-if></div>')
s = rep(s, '>Crear nota</button>', '>{{nmBtn}}</button>')
s = rep(s, '<input type="file" accept="image/*" ref="{{fileRef}}"', '<input type="file" accept="image/*" ref="{{covRef}}" onChange="{{onCov}}" style="display:none" tabindex="-1" aria-hidden="true">\n  <input type="file" accept="image/*" ref="{{fileRef}}"')
s = rep(s, '<button class="nb" onClick="{{next}}" style="opacity:{{nextOp}}" aria-label="Nota siguiente">Siguiente →</button>', '<button class="nb" onClick="{{next}}" style="opacity:{{nextOp}}" aria-label="Nota siguiente">Siguiente →</button>\n      <button class="nb" onClick="{{doneAct}}" style="background:#fff;color:#111;margin-left:12px">Listo</button>')
s = rep(s, '<div style="font-size:11px;opacity:.55;padding-top:10px;text-align:center;pointer-events:none">Tocá fuera del texto para volver al frente</div>', '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:12px"><span style="font-size:11px;opacity:.6;pointer-events:none">Tocá fuera del texto para volver al frente</span><button class="ob" onClick="{{doneBack}}">Listo</button></div>')
NM = """  <!-- menú de la nota, orden y confirmación -->
  <sc-if value="{{nmenuOn}}" hint-placeholder-val="{{false}}">
    <button onClick="{{closeNMenu}}" aria-label="Cerrar menú" tabindex="-1" style="position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:transparent;z-index:24;cursor:default"></button>
    <div class="pn mn" role="menu" style="position:absolute;z-index:25;width:220px;padding:6px;box-sizing:border-box;{{nmenu.style}}"><sc-for list="{{nmenu.items}}" as="m" hint-placeholder-count="5"><button class="pr" role="menuitem" onClick="{{m.act}}">{{m.l}}</button></sc-for></div>
  </sc-if>
  <sc-if value="{{nsortOpen}}" hint-placeholder-val="{{false}}">
    <button onClick="{{closeNSort}}" aria-label="Cerrar orden" tabindex="-1" style="position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:transparent;z-index:24;cursor:default"></button>
    <div class="pn mn" role="menu" aria-label="Ordenar notas" style="position:absolute;z-index:25;left:420px;bottom:76px;width:260px;padding:6px;box-sizing:border-box">
      <div style="font-size:11px;font-weight:600;opacity:.8;padding:8px 12px 6px">Ordenar notas</div>
      <sc-for list="{{nsorts}}" as="o" hint-placeholder-count="3"><button class="pr" role="menuitemradio" aria-checked="{{o.on}}" onClick="{{o.pick}}"><span>{{o.l}}</span><span style="display:flex;opacity:{{o.mark}}">__CHECK__</span></button></sc-for>
    </div>
  </sc-if>
  <sc-if value="{{nconfOn}}" hint-placeholder-val="{{false}}">
    <div class="mdl" style="position:absolute;inset:0;z-index:35;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center">
      <div class="pn box" role="alertdialog" aria-label="{{nconfTitle}}" style="width:420px;padding:24px;box-sizing:border-box">
        <div style="font-size:20px;font-weight:700;overflow-wrap:anywhere">{{nconfTitle}}</div>
        <div style="font-size:13px;opacity:.85;margin:8px 0 18px;line-height:1.45">Se borra la nota con todo lo que tiene. No se puede deshacer.</div>
        <div style="display:flex;gap:8px;justify-content:flex-end"><button class="ob" onClick="{{nconfNo}}" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)">Cancelar</button><button class="ob" onClick="{{nconfYes}}">Eliminar</button></div>
      </div>
    </div>
  </sc-if>
""".replace('__CHECK__', CHECK_)
i = s.index('  <button class="sb"')
s = s[:i] + NM + s[i:]
s = rep(s, '</style>\n</helmet>', '.nmb{position:absolute;right:10px;top:10px;width:30px;height:30px;border-radius:50%;border:0;padding:0;background:#575757;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transform:translateZ(70px);transition:opacity .2s cubic-bezier(.4,0,.2,1)}\n.tw:hover .nmb,.nmb:focus-visible{opacity:1}.nmb:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.mn{animation:scale-in .25s cubic-bezier(.19,1,.22,1) both}\n</style>\n</helmet>')
wr('Anotador.dc.html', s)
print('others30 ok')
