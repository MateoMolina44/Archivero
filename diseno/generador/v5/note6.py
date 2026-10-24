# Genera Anotador.dc.html (estilo "journal": grilla infinita + carrusel + reverso)
exec(open('/tmp/w/common4.py').read())
exec(open('/tmp/w/v5/pill.py').read())
import re
out=open('/tmp/w/out/Anotador.dc.html').read()
STYLE=out[out.index('<style>')+7:out.index('</style>')]
pill=SEC_BLOCK.search(out).group(0)
EX='cubic-bezier(.19,1,.22,1)'
CSS=f'''
.tile{{border:0;padding:0;font:inherit;color:inherit;cursor:pointer;text-align:inherit;background:none}}
.tile .ti{{transition:transform .7s {EX}}}.tile:hover .ti,.tile:focus-visible .ti{{transform:scale(1.05)}}
.tile{{transform-style:preserve-3d}}.tile .ti{{overflow:hidden;border-radius:6px}}
.tw .pop{{position:absolute;left:-30px;top:0;width:calc(100% + 60px);height:100%;display:flex;align-items:center;justify-content:center;text-align:center;pointer-events:none;transform:translateZ(70px)}}
.tw .pop b{{display:block;font-weight:800;font-size:40px;line-height:.98;letter-spacing:-.02em;color:#fff;text-shadow:0 6px 24px rgba(0,0,0,.35),0 1px 3px rgba(0,0,0,.2)}}
.tile:focus-visible{{outline:2px solid #fff;outline-offset:3px}}
.tile{{will-change:transform}}
@keyframes tile-in{{0%{{opacity:0;transform:translateY(24px) scale(.96)}}100%{{opacity:1}}}}
.lyr{{position:absolute;inset:0;transition:opacity .7s {EX},transform .9s {EX},filter .7s {EX}}}
.card{{position:absolute;top:0;width:400px;height:533px;transform-style:preserve-3d}}
.face{{cursor:pointer}}
.ttl{{position:absolute;left:-36px;top:34px;width:calc(100% + 72px);pointer-events:none;font-weight:800;font-size:56px;line-height:.98;letter-spacing:-.02em;color:#fff;text-shadow:0 6px 24px rgba(0,0,0,.3);transform:translateZ(90px)}}
.flip{{position:absolute;inset:0;transform-style:preserve-3d;transition:transform 1s {EX}}}
.face{{position:absolute;inset:0;border-radius:6px;overflow:hidden;backface-visibility:hidden;-webkit-backface-visibility:hidden}}
.stk{{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}}
.cap{{position:absolute;background:#d9d9d9;border-radius:4px;color:#575757;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:grab;background-image:repeating-linear-gradient(135deg,rgba(0,0,0,.06) 0 6px,transparent 6px 12px);box-shadow:0 2px 8px rgba(0,0,0,.2)}}
.pic{{background:#fff!important;background-image:none!important;padding:0}}.pic img{{width:100%;height:100%;object-fit:cover;border-radius:4px;pointer-events:none;display:block;-webkit-user-drag:none}}
.cap button{{position:absolute;right:4px;top:4px;width:20px;height:20px;border-radius:50%;border:0;background:#575757;color:#fff;font-size:12px;line-height:1;cursor:pointer;opacity:0;transition:opacity .15s}}.cap:hover button{{opacity:1}}
.nb{{height:44px;padding:0 18px;border-radius:30px;background:#575757;color:#fff;border:1px solid rgba(255,255,255,.12);font:inherit;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:8px;white-space:nowrap;box-shadow:0 3px 12px rgba(0,0,0,.08);transition:background-color .15s {CE},transform .15s {CE},opacity .4s {CE}}}
.nb:hover{{background:#6a6a6a}}.nb:active{{transform:scale(.97)}}.nb:focus-visible{{outline:2px solid #fff;outline-offset:2px}}
.nb.ic{{width:44px;padding:0;justify-content:center}}
.ob{{height:32px;min-width:32px;padding:0 12px;border-radius:30px;background:#d9d9d9;color:#111;border:0;font:inherit;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s {CE},background-color .15s {CE}}}
.ob:hover{{background:#fff;transform:scale(1.05)}}.ob:active{{transform:scale(.95)}}.ob:focus-visible{{outline:2px solid #fff;outline-offset:2px}}
.sw{{width:22px;height:22px;border-radius:50%;border:0;padding:0;cursor:pointer;transition:transform .15s {CE}}}.sw:hover{{transform:scale(1.15)}}
.pn{{background:#575757;border-radius:14px;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.12);color:#fff}}
.pr{{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;border:0;background:none;color:#fff;font:inherit;font-size:13px;padding:9px 12px;border-radius:8px;cursor:pointer;text-align:left}}
.pr:hover{{background:rgba(255,255,255,.1)}}
.bk{{border:0;padding:0;cursor:pointer;color:#fff;font:inherit;font-size:11px;font-weight:600;transition:transform .5s {EX},filter .3s;display:block;text-align:left}}
.bk:hover{{transform:translateX(var(--hx)) scale(1.04)}}.bk:focus-visible{{outline:2px solid #fff;outline-offset:2px}}
.mdl{{animation:enter .35s {CE} both}}.mdl .box{{animation:scale-in .5s {EX} both}}
.in{{width:100%;box-sizing:border-box;height:40px;border-radius:30px;border:1px solid rgba(255,255,255,.2);background:#464646;color:#fff;font:inherit;font-size:14px;padding:0 16px;outline:none}}
.in:focus{{border-color:#fff}}
.ta{{width:100%;height:100%;overflow:hidden;box-sizing:border-box;background:transparent;border:0;outline:none;resize:none;color:#fff;padding:0;line-height:1.55}}
.tt{{width:100%;box-sizing:border-box;background:transparent;border:0;border-bottom:1px solid rgba(255,255,255,.25);outline:none;color:#fff;font:inherit;font-size:22px;font-weight:700;padding:0 0 10px;margin-bottom:16px}}
.tt::placeholder,.ta::placeholder{{color:rgba(255,255,255,.45)}}
@media (prefers-reduced-motion:reduce){{.lyr,.flip,.card,.tile .ti,.nb,.ob,.bk{{transition-duration:.01ms!important}}.mdl,.mdl .box{{animation:none!important}}}}
'''
TPL='''<div class="mos" onMouseDown="{{down}}" onMouseMove="{{move}}" onMouseUp="{{up}}" onMouseLeave="{{up}}" onAuxClick="{{aux}}" style="position:relative;width:1440px;height:900px;background:#d9d9d9;overflow:hidden;font-family:'Inter',system-ui,sans-serif;color:#fff;cursor:{{cur}}">

  <!-- Vista general: grilla infinita de notas (arrastrá con la rueda del mouse) -->
  <div class="lyr" style="{{gridLyr}}">
    <sc-if value="{{emptyAll}}" hint-placeholder-val="{{false}}">
      <div style="position:absolute;left:0;top:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;color:#575757;pointer-events:none">
        <div style="font-size:26px;font-weight:700">Todavía no hay nada hecho</div>
        <div style="font-size:14px;line-height:1.5">Creá tu primera nota con el botón + del menú de abajo.</div>
      </div>
    </sc-if>
    <div style="{{world}}">
      <sc-for list="{{tiles}}" as="t" hint-placeholder-count="12">
        <div class="tw" style="position:absolute;left:{{t.l}}px;top:{{t.t}}px;width:250px;height:333px;transform-style:preserve-3d;transform:{{t.tf}};transition:{{t.tr}}">
        <button class="tile" onClick="{{t.pick}}" aria-label="{{t.aria}}" tabindex="{{t.tab}}" onMouseEnter="{{t.enter}}" onMouseLeave="{{t.leave}}" onFocus="{{t.enter}}" onBlur="{{t.leave}}" style="position:absolute;left:0;top:0;width:250px;height:333px;border-radius:6px;display:block;animation:tile-in .8s cubic-bezier(.19,1,.22,1) both;animation-delay:{{t.delay}}">
          <div class="ti" style="position:absolute;inset:0;background:{{t.bg}}">
            <sc-for list="{{t.ims}}" as="k" hint-placeholder-count="1"><img src="{{k.src}}" alt="" style="position:absolute;left:{{k.pl}}%;top:{{k.pt}}%;width:{{k.pw}}%;height:{{k.ph}}%;object-fit:cover;border-radius:3px"></sc-for>
            <sc-for list="{{t.strokes}}" as="s" hint-placeholder-count="2"><svg class="stk" viewBox="0 0 420 560" preserveAspectRatio="none" aria-hidden="true"><path d="{{s.d}}" stroke="{{s.c}}" stroke-width="{{s.w}}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></sc-for>
            <sc-for list="{{t.caps}}" as="k" hint-placeholder-count="1"><div style="position:absolute;left:{{k.pl}}%;top:{{k.pt}}%;width:{{k.pw}}%;height:{{k.ph}}%;background:#d9d9d9;border-radius:3px;background-image:repeating-linear-gradient(135deg,rgba(0,0,0,.06) 0 5px,transparent 5px 10px)"></div></sc-for>
          </div>
        </button>
        <div class="pop" style="{{t.popStyle}}" aria-hidden="true"><b style="overflow-wrap:anywhere">{{t.title}}</b></div>
        </div>
      </sc-for>
    </div>
  </div>

  <!-- Vista de nota: carrusel de notas; ⓘ da vuelta la nota (reverso = texto) -->
  <div class="lyr" style="{{bookLyr}}">
    <div style="{{rowStyle}}">
      <sc-for list="{{cards}}" as="c" hint-placeholder-count="5">
        <div class="card" onMouseEnter="{{c.enter}}" onMouseLeave="{{c.leave}}" style="{{c.style}}">
          <div class="flip" style="{{c.flipStyle}}">
            <div class="face" onClick="{{c.faceClick}}" onMouseMove="{{c.pmove}}" onMouseUp="{{c.pup}}" style="background:{{c.bg}}">
              <sc-if value="{{c.empty}}" hint-placeholder-val="{{false}}"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 48px;font-size:13px;color:#575757">Dibujá, subí una imagen o insertá una captura en esta cara. Tocá la nota para escribir en el reverso.</div></sc-if>
              <sc-for list="{{c.ims}}" as="k" hint-placeholder-count="1"><div class="cap pic" onMouseDown="{{k.down}}" style="left:{{k.pl}}%;top:{{k.pt}}%;width:{{k.pw}}%;height:{{k.ph}}%"><img src="{{k.src}}" alt="{{k.alt}}" draggable="false"><button onClick="{{k.del}}" aria-label="Quitar imagen">×</button></div></sc-for>
              <sc-for list="{{c.strokes}}" as="s" hint-placeholder-count="2"><svg class="stk" viewBox="0 0 420 560" aria-hidden="true"><path d="{{s.d}}" stroke="{{s.c}}" stroke-width="{{s.w}}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></sc-for>
              <sc-for list="{{c.caps}}" as="k" hint-placeholder-count="1"><div class="cap" onMouseDown="{{k.down}}" style="left:{{k.pl}}%;top:{{k.pt}}%;width:{{k.pw}}%;height:{{k.ph}}%">Captura {{k.n}}<button onClick="{{k.del}}" aria-label="Quitar captura">×</button></div></sc-for>
              <div ref="{{c.ref}}" onMouseDown="{{c.pdown}}" style="position:absolute;inset:0;pointer-events:{{c.drawPE}};cursor:{{c.drawCur}}"></div>
            </div>
            <div class="face" onClick="{{c.backClick}}" style="background:#575757;transform:rotateY(180deg);padding:30px 30px 24px;box-sizing:border-box;display:flex;flex-direction:column">
              <sc-if value="{{c.cur}}" hint-placeholder-val="{{true}}">
                <input class="tt" value="{{c.title}}" onInput="{{c.onTitle}}" placeholder="Título de la nota" aria-label="Título de la nota" tabindex="{{c.revTab}}">
                <div style="flex:1;min-height:0;overflow:auto;cursor:pointer"><textarea class="ta" rows="2" ref="{{c.taRef}}" value="{{c.text}}" onInput="{{c.onText}}" placeholder="Escribí acá…" aria-label="Texto de la nota" tabindex="{{c.revTab}}" style="{{c.taStyle}};height:auto;cursor:text;display:block"></textarea></div>
                <div style="font-size:11px;opacity:.55;padding-top:10px;text-align:center;pointer-events:none">Tocá fuera del texto para volver al frente</div>
              </sc-if>
              <sc-if value="{{c.notcur}}" hint-placeholder-val="{{false}}">
                <div style="font-size:22px;font-weight:700;padding-bottom:10px;margin-bottom:16px;border-bottom:1px solid rgba(255,255,255,.25)">{{c.title}}</div>
                <div style="{{c.taStyle}};overflow:hidden;white-space:pre-wrap;line-height:1.55;flex:1">{{c.text}}</div>
              </sc-if>
            </div>
          </div>
          <div class="ttl" style="{{c.ttlStyle}}" aria-hidden="true">{{c.ttl}}</div>
        </div>
      </sc-for>
    </div>

    <!-- nombre de la nota (arriba, como en Vista de tablero) + volver -->
    <div style="position:absolute;left:0;top:84px;width:100%;text-align:center;font-size:24px;font-weight:700;color:#fff;text-shadow:0 1px 10px rgba(0,0,0,.25);z-index:7;pointer-events:none;line-height:34px"><span style="position:relative;display:inline-block"><span aria-hidden="true" style="visibility:hidden">{{noteName}}</span><span style="position:absolute;left:0;top:0;white-space:nowrap">{{nm.t}}<sc-if value="{{nm.c}}" hint-placeholder-val="{{false}}"><span class="cur"></span></sc-if></span></span></div>
    <button class="nb" onClick="{{back}}" aria-label="Volver a todas las notas" style="position:absolute;left:24px;top:78px;height:auto;padding:8px 16px;font-size:13px;font-weight:600;z-index:8"><span style="position:relative;display:inline-block"><span aria-hidden="true" style="visibility:hidden">← Notas</span><span style="position:absolute;left:0;top:0;white-space:nowrap">{{bk.t}}<sc-if value="{{bk.c}}" hint-placeholder-val="{{false}}"><span class="cur"></span></sc-if></span></span></button>

    <!-- barra inferior: Anterior · ⓘ · + · Siguiente -->
    <div style="position:absolute;left:0;top:704px;width:100%;display:flex;justify-content:center;gap:8px;z-index:8">
      <button class="nb" onClick="{{prev}}" style="opacity:{{prevOp}}" aria-label="Nota anterior">← Anterior</button>
      <button class="nb ic" onClick="{{toggleFlip}}" aria-label="{{flipLabel}}"><sc-if value="{{flip}}" hint-placeholder-val="{{false}}"><svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg></sc-if><sc-if value="{{notflip}}" hint-placeholder-val="{{true}}"><svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M8 7.2v4M8 4.9v.1"/></svg></sc-if></button>
      <button class="nb ic" onClick="{{newNote}}" aria-label="Nueva nota"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg></button>
      <button class="nb" onClick="{{next}}" style="opacity:{{nextOp}}" aria-label="Nota siguiente">Siguiente →</button>
    </div>

    <!-- opciones de la herramienta activa -->
    <div style="position:absolute;left:0;top:760px;width:100%;display:flex;justify-content:center;z-index:8;pointer-events:none">
      <div class="pn" style="pointer-events:auto;display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:30px;min-height:44px;box-sizing:border-box">
        <span style="font-size:12px;font-weight:600;padding:0 8px">{{toolName}}</span>
        <sc-if value="{{o.text}}" hint-placeholder-val="{{true}}"><button class="ob" onClick="{{szDown}}" aria-label="Texto más chico">A−</button><button class="ob" onClick="{{szUp}}" aria-label="Texto más grande">A+</button><span style="font-size:12px;opacity:.75;padding:0 8px">Se escribe en el reverso de la nota</span></sc-if>
        <sc-if value="{{o.fmt}}" hint-placeholder-val="{{false}}"><button class="ob" onClick="{{fBold}}" style="{{fs.b}}" aria-pressed="{{fp.b}}"><b>B</b></button><button class="ob" onClick="{{fItal}}" style="{{fs.i}}" aria-pressed="{{fp.i}}"><i>I</i></button><button class="ob" onClick="{{aLeft}}" style="{{fs.l}}">Izq.</button><button class="ob" onClick="{{aCenter}}" style="{{fs.c}}">Centro</button><button class="ob" onClick="{{fSans}}" style="{{fs.sa}}">Sans</button><button class="ob" onClick="{{fSerif}}" style="{{fs.se}}">Serif</button><button class="ob" onClick="{{fMono}}" style="{{fs.mo}}">Mono</button></sc-if>
        <sc-if value="{{o.draw}}" hint-placeholder-val="{{false}}"><sc-for list="{{swatches}}" as="w" hint-placeholder-count="4"><button class="sw" onClick="{{w.pick}}" aria-label="{{w.label}}" style="background:{{w.c}};box-shadow:{{w.ring}}"></button></sc-for><span style="width:1px;height:20px;background:rgba(255,255,255,.3)"></span><sc-for list="{{widths}}" as="w" hint-placeholder-count="3"><button class="ob" onClick="{{w.pick}}" style="{{w.st}}">{{w.label}}</button></sc-for></sc-if>
        <sc-if value="{{o.erase}}" hint-placeholder-val="{{false}}"><span style="font-size:12px;opacity:.75;padding:0 6px">Pasá sobre un trazo para borrarlo</span><button class="ob" onClick="{{clearInk}}">Borrar todo</button></sc-if>
        <sc-if value="{{o.img}}" hint-placeholder-val="{{false}}"><button class="ob" onClick="{{pickImg}}">Subir imagen</button><button class="ob" onClick="{{imgSmaller}}" aria-label="Achicar la última imagen">−</button><button class="ob" onClick="{{imgBigger}}" aria-label="Agrandar la última imagen">+</button><span style="font-size:12px;opacity:.75;padding:0 8px">Arrastrala para moverla · PNG, JPG o WebP</span></sc-if>
        <sc-if value="{{o.shot}}" hint-placeholder-val="{{false}}"><button class="ob" onClick="{{addCap}}">Insertar captura</button><span style="font-size:12px;opacity:.75;padding:0 8px">Maqueta: la extensión captura la pestaña activa</span></sc-if>
      </div>
    </div>
  </div>

  <!-- nombre obligatorio de la nota nueva -->
  <input type="file" accept="image/*" ref="{{fileRef}}" onChange="{{onFile}}" style="display:none" tabindex="-1" aria-hidden="true">
  <sc-if value="{{naming}}" hint-placeholder-val="{{false}}">
    <div class="mdl" style="position:absolute;inset:0;z-index:30;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center">
      <div class="pn box" style="width:400px;padding:24px;box-sizing:border-box">
        <div style="font-size:20px;font-weight:700">Nueva nota</div>
        <div style="font-size:13px;opacity:.8;margin:6px 0 16px;line-height:1.4">Ponele un nombre para poder empezar a escribir. Es obligatorio.</div>
        <input class="in" ref="{{nameRef}}" value="{{draft}}" onInput="{{onDraft}}" onKeyDown="{{nameKey}}" placeholder="Nombre de la nota" aria-label="Nombre de la nota" maxlength="40">
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px">
          <button class="ob" onClick="{{cancelName}}" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)">Cancelar</button>
          <button class="ob" onClick="{{createNote}}" style="opacity:{{createOp}}" aria-disabled="{{createDis}}">Crear nota</button>
        </div>
      </div>
    </div>
  </sc-if>

{{S}}
'''

JS=r'''
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.seq = 0;
        this.notes = [];
    this.rm = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.fe = {}; this.noClick = 0; this.selIm = null; this.cdrag = null; this.stroke = null; this.erasing = false;
    this.state = { px: 0, py: 0, panning: false, hov: null, n: 0, tn: 0, sq: 'off', rev: 0, view: 'grid', ci: 0, chov: false, mxp: 720, myp: 450, flip: false, tool: 'text', pen: { c: '#1d1d1d', w: 3 }, naming: false, draft: '', fn: 0 };
    this.drag = null; this.iv = null;
  }
  componentDidMount() {
    this.tiv = setInterval(() => { const tn = this.state.tn + 1; this.setState({ tn }); if (tn >= 140) clearInterval(this.tiv); }, 40);
  }
  componentWillUnmount() { clearInterval(this.iv); clearInterval(this.tiv); clearInterval(this.fiv); clearTimeout(this.t1); clearTimeout(this.t3); }
  startType(id, total) {
    clearInterval(this.iv);
    this.setState({ hov: id, n: 0 });
    this.iv = setInterval(() => { const n = this.state.n + 1; this.setState({ n }); if (n >= total) clearInterval(this.iv); }, 45);
  }
  stopType() { clearInterval(this.iv); this.setState({ hov: null, n: 0 }); }
  bump() { this.setState({ rev: this.state.rev + 1 }); }
  blank(title) { return { id: 'n' + (++this.seq), title, t: '', s: [], c: [], im: [], b: false, i: false, z: 15, a: 'left', f: 'sans' }; }
  curNote() { return this.notes[this.state.ci] || null; }
  path(s) { return s.pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' '); }
  startFn() { clearInterval(this.fiv); this.setState({ fn: 0 }); this.fiv = setInterval(() => { const fn = this.state.fn + 1; this.setState({ fn }); if (fn > 40) clearInterval(this.fiv); }, 45); }
  open(ci) {
    this.setState({ view: 'book', ci, flip: false });
    this.startFn();
  }
  back() { this.setState({ view: 'grid', flip: false, hov: null, chov: false }); }
  go(d) {
    const ci = Math.max(0, Math.min(this.notes.length - 1, this.state.ci + d));
    this.setState({ ci, flip: false, chov: false });
  }
  setTool(tool) {
    const st = { tool };
    if (this.state.view === 'book') {
      st.flip = (tool === 'text' || tool === 'fmt');
      if (st.flip) { clearTimeout(this.t1); this.t1 = setTimeout(() => { if (this.ta) this.ta.focus(); }, 700); }
    }
    this.setState(st);
  }
  upd(fn) { const n = this.curNote(); if (!n) return; fn(n); this.bump(); }
  toggleFlip() {
    const { flip, tool } = this.state;
    this.setState({ flip: !flip, chov: false, tool: !flip ? (tool === 'fmt' ? 'fmt' : 'text') : tool });
    if (!flip) { clearTimeout(this.t1); this.t1 = setTimeout(() => { if (this.ta) this.ta.focus(); }, 700); }
  }
  addImage(file) {
    if (!file || !/^image\//.test(file.type || 'image/')) return;
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const n = this.curNote(); if (!n) return;
        const k = Math.min(260 / (img.width || 260), 300 / (img.height || 300), 1) || 1;
        const w = Math.max(60, Math.round((img.width || 260) * k)), h = Math.max(60, Math.round((img.height || 200) * k));
        const q = { id: 'i' + (++this.seq), src: fr.result, name: file.name || 'Imagen', x: Math.max(0, Math.round((420 - w) / 2) + (n.im.length * 18) % 60), y: Math.max(0, Math.round((560 - h) / 2) + (n.im.length * 22) % 80), w, h };
        n.im.push(q); this.selIm = q; this.setState({ flip: false, rev: this.state.rev + 1 });
      };
      img.onerror = () => {};
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  }
  sizeImg(f) {
    const n = this.curNote(); if (!n || !n.im.length) return;
    const q = (this.selIm && n.im.includes(this.selIm)) ? this.selIm : n.im[n.im.length - 1];
    const cx = q.x + q.w / 2, cy = q.y + q.h / 2;
    q.w = Math.max(60, Math.min(420, Math.round(q.w * f))); q.h = Math.max(60, Math.min(560, Math.round(q.h * f)));
    q.x = Math.max(0, Math.min(420 - q.w, Math.round(cx - q.w / 2))); q.y = Math.max(0, Math.min(560 - q.h, Math.round(cy - q.h / 2)));
    this.bump();
  }
  pt(id, e) {
    const el = this.fe[id]; if (!el) return null;
    const r = el.getBoundingClientRect(); const k = 420 / (r.width || 420);
    return [(e.clientX - r.left) * k, (e.clientY - r.top) * k];
  }
  renderVals() {
    const { px, py, view, ci, flip, tool, pen, naming, draft, fn, tn, hov, n, mxp, myp, chov } = this.state;
    const mod = (v, m) => ((v % m) + m) % m;
    const EX = 'cubic-bezier(.19,1,.22,1)';
    const ty = (full, off, k) => { const c = Math.max(0, Math.floor((tn - off) * (k || 1))); return { t: full.slice(0, c), c: tn >= off && c < full.length }; };
    const fy = (full, off) => { const c = Math.max(0, fn - (off || 0)); return { t: full.slice(0, c), c: fn >= (off || 0) && c < full.length }; };
    const s = ty('Buscar…', 2);
    const tones = ['#afafaf', '#a7a7a7', '#b7b7b7'];
    const FF = { sans: "'Inter',system-ui,sans-serif", serif: "Georgia,'Times New Roman',serif", mono: "ui-monospace,Menlo,Consolas,monospace" };
    const thumb = (nt) => ({
      strokes: nt.s.map((q) => ({ d: this.path(q), c: q.c, w: q.w })),
      caps: nt.c.map((k) => ({ pl: k.x / 4.2, pt: k.y / 5.6, pw: k.w / 4.2, ph: k.h / 5.6 })),
      ims: nt.im.map((k) => ({ src: k.src, pl: k.x / 4.2, pt: k.y / 5.6, pw: k.w / 4.2, ph: k.h / 5.6 }))
    });
    // ---- grilla infinita
    const all = this.notes.map((nt, i) => ({ nt, i }));
    const wrap = all.length >= 12;
    const COLS = wrap ? 4 : Math.max(1, Math.min(4, all.length)), GW = 250, GH = 333, G = 28, rows = Math.max(1, Math.ceil(all.length / COLS));
    const W = COLS * (GW + G), H = rows * (GH + G);
    const totW = COLS * (GW + G) - G, totH = rows * (GH + G) - G;
    const bx = wrap ? 40 : (1440 - totW) / 2, by = wrap ? 90 : Math.max(110, (900 - totH) / 2);
    const lim = (v, m) => Math.max(-m, Math.min(m, v));
    this.panLim = wrap ? null : [totW / 2 + 300, totH / 2 + 300];
    const ox = wrap ? mod(px, W) : lim(px, totW / 2 + 300), oy = wrap ? mod(py, H) : lim(py, totH / 2 + 300);
    const rg = wrap ? [-1, 0, 1] : [0];
    const tiles = [];
    for (const cx of rg) for (const cy of rg) all.forEach((a, k) => {
      const main = cx === 0 && cy === 0;
      const l = bx + (k % COLS) * (GW + G) + cx * W, t = by + Math.floor(k / COLS) * (GH + G) + cy * H;
      const sx = l + ox + GW / 2, sy = t + oy + GH / 2;
      const nx = Math.max(-1.3, Math.min(1.3, (sx - 720) / 720)), ny = Math.max(-1.3, Math.min(1.3, (sy - 450) / 450));
      const mdx = Math.max(-1, Math.min(1, (mxp - sx) / 720)), mdy = Math.max(-1, Math.min(1, (myp - sy) / 450)), mk = this.rm ? 0 : 1;
      const tf = 'perspective(1100px) rotateY(' + (nx * 16 + mdx * 27 * mk).toFixed(1) + 'deg) rotateX(' + (-ny * 11 - mdy * 21 * mk).toFixed(1) + 'deg)';
      const id = cx + ',' + cy + ',' + a.nt.id;
      const title = a.nt.title || 'Sin título';
      const on = hov === id; const nn = on ? n : 0; const total = title.length;
      tiles.push(Object.assign({
        l, t, tf, tr: this.state.panning ? 'none' : 'transform .6s ' + EX, bg: tones[(k + (k >> 2)) % 3], tab: main ? '0' : '-1', title, aria: 'Abrir nota ' + title,
        popStyle: 'opacity:' + (on ? 1 : 0),
        delay: (main ? 0.05 + (k % 12) * 0.05 : 0.4).toFixed(2) + 's',
        l1: title.slice(0, nn), c1: on && nn < title.length,
        enter: () => { if (this.state.hov !== id) this.setState({ hov: id }); }, leave: () => { if (this.state.hov === id) this.setState({ hov: null }); },
        pick: () => { if (this.drag) return; this.open(a.i); }
      }, thumb(a.nt)));
    });
    // ---- carrusel
    const notes = this.notes;
    const STEP = 448;
    const ctilt = (i, cur) => {
      if (this.rm || (cur && !flip && (tool === 'draw' || tool === 'erase'))) return 'perspective(1600px)';
      const ccx = 720 + (i - ci) * STEP, ccy = 396;
      const dx = Math.max(-1, Math.min(1, (mxp - ccx) / 720)), dy = Math.max(-1, Math.min(1, (myp - ccy) / 450));
      return 'perspective(1600px) rotateY(' + (dx * 30).toFixed(1) + 'deg) rotateX(' + (-dy * 24).toFixed(1) + 'deg)';
    };
    const ttlStyle = (i, cur) => {
      const on = cur && chov && !flip && !(tool === 'draw' || tool === 'erase');
      return 'opacity:' + (on ? 1 : 0);
    };
    const cards = notes.map((nt, i) => {
      const cur = i === ci;
      const th = thumb(nt);
      const fl = cur && flip;
      const bold = nt.b ? 700 : 400, ital = nt.i ? 'italic' : 'normal';
      const taStyle = 'font-size:' + nt.z + 'px;font-weight:' + bold + ';font-style:' + ital + ';text-align:' + nt.a + ';font-family:' + FF[nt.f];
      return {
        enter: () => { if (cur) this.setState({ chov: true }); }, leave: () => { if (cur) this.setState({ chov: false }); },
        ttl: nt.title || 'Sin título', ttlStyle: ttlStyle(i, cur),
        key: nt.id, cur, notcur: !cur, bg: tones[i % 3],
        style: 'left:' + (720 - 200 + i * STEP) + 'px;opacity:' + (flip && !cur ? 0.2 : 1) + ';pointer-events:' + (flip && !cur ? 'none' : 'inherit') + ';transform:' + ctilt(i, cur) + ';transition:opacity .6s ' + EX + ',transform .6s ' + EX,
        flipStyle: 'transform:rotateY(' + (fl ? 180 : 0) + 'deg)',
        empty: !nt.s.length && !nt.c.length && !nt.im.length,
        strokes: th.strokes,
        caps: nt.c.map((k) => ({
          pl: k.x / 4.2, pt: k.y / 5.6, pw: k.w / 4.2, ph: k.h / 5.6, n: k.n,
          down: (e) => { if (!cur || tool === 'draw' || tool === 'erase') return; e.preventDefault(); e.stopPropagation(); const p = this.pt(nt.id, e); this.cdrag = { nt, k, dx: p[0] - k.x, dy: p[1] - k.y, x0: e.clientX, y0: e.clientY, moved: false }; },
          del: (e) => { e.stopPropagation(); nt.c = nt.c.filter((q) => q !== k); this.bump(); }
        })),
        ims: nt.im.map((k) => ({
          src: k.src, alt: 'Imagen ' + k.name, pl: k.x / 4.2, pt: k.y / 5.6, pw: k.w / 4.2, ph: k.h / 5.6,
          down: (e) => { if (!cur || tool === 'draw' || tool === 'erase') return; e.preventDefault(); e.stopPropagation(); this.selIm = k; const p = this.pt(nt.id, e); this.cdrag = { nt, k, dx: p[0] - k.x, dy: p[1] - k.y, x0: e.clientX, y0: e.clientY, moved: false }; },
          del: (e) => { e.stopPropagation(); nt.im = nt.im.filter((q) => q !== k); this.bump(); }
        })),
        faceClick: (e) => {
          if (Date.now() < this.noClick) return;
          if (!cur) { this.setState({ ci: i, flip: false, chov: false }); return; }
          if (tool === 'draw' || tool === 'erase') return;
          this.toggleFlip();
        },
        backClick: (e) => {
          if (Date.now() < this.noClick) return;
          const tg = e && e.target && e.target.tagName; if (tg === 'INPUT' || tg === 'TEXTAREA') return;
          if (!cur) { this.setState({ ci: i, flip: false, chov: false }); return; }
          this.toggleFlip();
        },
        drawPE: view === 'book' && cur && !flip && (tool === 'draw' || tool === 'erase') ? 'auto' : 'none',
        drawCur: tool === 'erase' ? 'cell' : 'crosshair',
        ref: (el) => { if (el) this.fe[nt.id] = el; },
        pdown: (e) => {
          if (!cur) return; const p = this.pt(nt.id, e); if (!p) return;
          if (tool === 'draw') { this.stroke = { c: pen.c, w: pen.w, pts: [p] }; nt.s.push(this.stroke); this.bump(); }
          else if (tool === 'erase') { this.erasing = true; this.erase(nt, p); }
        },
        pmove: (e) => {
          if (!cur) return;
          if (this.cdrag && this.cdrag.nt === nt) { const p = this.pt(nt.id, e); if (!p) return; const d = this.cdrag; if (!d.moved && Math.abs(e.clientX - d.x0) + Math.abs(e.clientY - d.y0) < 4) return; d.moved = true; d.k.x = Math.max(0, Math.min(420 - d.k.w, p[0] - d.dx)); d.k.y = Math.max(0, Math.min(560 - d.k.h, p[1] - d.dy)); this.bump(); return; }
          if (this.stroke && tool === 'draw') { const p = this.pt(nt.id, e); if (p) { this.stroke.pts.push(p); this.bump(); } }
          else if (this.erasing && tool === 'erase') { const p = this.pt(nt.id, e); if (p) this.erase(nt, p); }
        },
        pup: () => { if ((this.cdrag && this.cdrag.moved) || this.stroke || this.erasing) this.noClick = Date.now() + 250; this.stroke = null; this.erasing = false; this.cdrag = null; },
        title: nt.title, text: nt.t, taStyle, revTab: fl ? '0' : '-1',
        onTitle: (e) => { nt.title = e.target.value; this.bump(); },
        onText: (e) => { nt.t = e.target.value; const el = e.target; el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; this.bump(); },
        taRef: (el) => { if (el && cur) { this.ta = el; if (el.value !== nt.t) el.value = nt.t; el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; } }
      };
    });
    const sw = ['#1d1d1d', '#575757', '#ffffff', '#8a8a8a'];
    const lab = { '#1d1d1d': 'Negro', '#575757': 'Gris oscuro', '#ffffff': 'Blanco', '#8a8a8a': 'Gris' };
    const cn = this.curNote();
    const fs = (on) => 'background:' + (on ? '#fff' : '#d9d9d9') + ';box-shadow:' + (on ? '0 0 0 2px #575757,0 0 0 4px #fff' : 'none');
    const ring = (k) => tool === k ? '0 0 0 2px #575757,0 0 0 4px #fff' : 'none';
        const tn2 = { text: 'Texto', fmt: 'Formato', draw: 'Dibujar', erase: 'Borrador', shot: 'Captura', img: 'Imagen' }[tool] || '';
    const gridOn = view === 'grid';
    return {
      tiles, cards,
      world: 'position:absolute;left:0;top:0;width:100%;height:100%;will-change:transform;transform:translate3d(' + ox + 'px,' + oy + 'px,0)',
      cur: this.state.panning ? 'grabbing' : 'default',
      down: (e) => { if (e.button !== 1) return; e.preventDefault(); this.drag = { x: e.clientX, y: e.clientY, px: this.state.px, py: this.state.py }; this.setState({ panning: true }); },
      move: (e) => {
        const r = e.currentTarget && e.currentTarget.getBoundingClientRect ? e.currentTarget.getBoundingClientRect() : null;
        const k = r && r.width ? 1440 / r.width : 1;
        const mx = r ? (e.clientX - r.left) * k : e.clientX, my = r ? (e.clientY - r.top) * k : e.clientY;
        const st = {};
        if (this.drag) {
          st.px = this.drag.px + e.clientX - this.drag.x; st.py = this.drag.py + e.clientY - this.drag.y;
          if (this.panLim) { st.px = Math.max(-this.panLim[0], Math.min(this.panLim[0], st.px)); st.py = Math.max(-this.panLim[1], Math.min(this.panLim[1], st.py)); }
        }
        if (!this.rm && (Math.abs(mx - this.state.mxp) > 14 || Math.abs(my - this.state.myp) > 14)) { st.mxp = mx; st.myp = my; }
        if (Object.keys(st).length) this.setState(st);
      },
      up: () => { if ((this.cdrag && this.cdrag.moved) || this.stroke || this.erasing) this.noClick = Date.now() + 250; this.stroke = null; this.erasing = false; this.cdrag = null; if (!this.drag) return; this.drag = null; this.setState({ panning: false }); },
      aux: (e) => { if (e.button === 1) e.preventDefault(); },
      gridLyr: 'opacity:' + (gridOn ? 1 : 0) + ';transform:' + (gridOn ? 'none' : 'scale(1.12)') + ';filter:' + (gridOn ? 'none' : 'blur(8px)') + ';pointer-events:' + (gridOn ? 'auto' : 'none'),
      bookLyr: 'opacity:' + (gridOn ? 0 : 1) + ';transform:' + (gridOn ? 'scale(.92)' : 'none') + ';filter:' + (gridOn ? 'blur(8px)' : 'none') + ';pointer-events:' + (gridOn ? 'none' : 'auto'),
      rowStyle: 'position:absolute;left:0;top:130px;width:0;height:533px;transform:translate3d(' + (-ci * STEP) + 'px,0,0);transition:transform .9s ' + EX,
      noteName: cn ? (cn.title || 'Sin título') : '', nm: fn > 40 ? { t: cn ? (cn.title || 'Sin título') : '', c: false } : fy(cn ? (cn.title || 'Sin título') : '', 6), bk: fy('← Notas', 0),
      back: () => this.back(),
      prev: () => this.go(-1), next: () => this.go(1),
      prevOp: ci > 0 ? 1 : 0.35, nextOp: ci < notes.length - 1 ? 1 : 0.35,
      flipLabel: flip ? 'Volver a la cara frontal' : 'Dar vuelta la nota',
      flip, notflip: !flip,
      toggleFlip: () => this.toggleFlip(),
      newNote: () => this.setState({ naming: true, draft: '' }),
      emptyAll: this.notes.length === 0, newBook: () => this.setState({ naming: true, draft: '' }),
      naming, draft, createOp: draft.trim() ? 1 : 0.4, createDis: !draft.trim(),
      nameRef: (el) => { if (el && !el.dataset.f) { el.dataset.f = '1'; setTimeout(() => el.focus(), 50); } },
      onDraft: (e) => this.setState({ draft: e.target.value }),
      nameKey: (e) => { if (e.key === 'Enter') this.makeNote(); },
      cancelName: () => this.setState({ naming: false, draft: '' }),
      createNote: () => this.makeNote(),
      fileRef: (el) => { if (el) this.fileEl = el; },
      onFile: (e) => { const f = e.target.files && e.target.files[0]; if (f) this.addImage(f); try { e.target.value = ''; } catch (x) {} },
      pickImg: () => { if (this.fileEl) this.fileEl.click(); },
      imgSmaller: () => this.sizeImg(0.85), imgBigger: () => this.sizeImg(1.18),
      toolName: tn2,
      o: { text: tool === 'text', fmt: tool === 'fmt', draw: tool === 'draw', erase: tool === 'erase', shot: tool === 'shot', img: tool === 'img' },
      fs: { b: fs(cn && cn.b), i: fs(cn && cn.i), l: fs(cn && cn.a === 'left'), c: fs(cn && cn.a === 'center'), sa: fs(cn && cn.f === 'sans'), se: fs(cn && cn.f === 'serif'), mo: fs(cn && cn.f === 'mono') },
      fp: { b: !!(cn && cn.b), i: !!(cn && cn.i) },
      szDown: () => this.upd((q) => { q.z = Math.max(11, q.z - 1); }), szUp: () => this.upd((q) => { q.z = Math.min(26, q.z + 1); }),
      fBold: () => this.upd((q) => { q.b = !q.b; }), fItal: () => this.upd((q) => { q.i = !q.i; }),
      aLeft: () => this.upd((q) => { q.a = 'left'; }), aCenter: () => this.upd((q) => { q.a = 'center'; }),
      fSans: () => this.upd((q) => { q.f = 'sans'; }), fSerif: () => this.upd((q) => { q.f = 'serif'; }), fMono: () => this.upd((q) => { q.f = 'mono'; }),
      swatches: sw.map((c) => ({ c, label: lab[c], ring: pen.c === c ? '0 0 0 2px #575757,0 0 0 4px #fff' : '0 0 0 1px rgba(255,255,255,.35)', pick: () => this.setState({ pen: { c, w: pen.w } }) })),
      widths: [2, 4, 8].map((w, i) => ({ label: ['Fino', 'Medio', 'Grueso'][i], st: fs(pen.w === w), pick: () => this.setState({ pen: { c: pen.c, w } }) })),
      clearInk: () => this.upd((q) => { q.s = []; }),
      addCap: () => this.upd((q) => { q.c.push({ id: q.c.length + 1, x: 60 + (q.c.length * 30) % 120, y: 80 + (q.c.length * 40) % 200, w: 220, h: 140, n: q.c.length + 1 }); this.setState({ flip: false }); }),
      tText: () => this.setTool('text'), tFmt: () => this.setTool('fmt'), tDraw: () => this.setTool('draw'), tErase: () => this.setTool('erase'), tShot: () => this.setTool('shot'),
      tImg: () => { this.setTool('img'); if (this.fileEl) this.fileEl.click(); },
      rText: ring('text'), rFmt: ring('fmt'), rDraw: ring('draw'), rErase: ring('erase'), rShot: ring('shot'), rImg: ring('img'),
      S: s
    };
  }
  erase(nt, p) {
    const before = nt.s.length;
    nt.s = nt.s.filter((q) => !q.pts.some((pp) => (pp[0] - p[0]) * (pp[0] - p[0]) + (pp[1] - p[1]) * (pp[1] - p[1]) < 16 * 16));
    if (nt.s.length !== before) this.bump();
  }
  makeNote() {
    const name = this.state.draft.trim(); if (!name) return;
    this.notes.push(this.blank(name));
    this.setState({ naming: false, draft: '', view: 'book', ci: this.notes.length - 1, flip: false, chov: false });
    this.startFn();
  }
}
'''

JS=JS.replace("      S: s\n    };","      zz: 0"+COMMON_VALS+"\n    };")
tpl=TPL.replace('{{S}}\n',S()+'  '+pill+OV_NOTE)
tpl+='</div>\n</x-dc>\n'
html=HEAD%('Archivero - Anotador',STYLE+CSS)+tpl+f'''<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":1440,"height":900}}}}'>{JS}</script>
</body>
</html>
'''
open('/tmp/w/out/Anotador.dc.html','w').write(html)
print('note6 ok',len(html))
