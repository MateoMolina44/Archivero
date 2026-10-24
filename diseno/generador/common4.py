exec(open('/tmp/w/final3_head.py').read())   # D,CE,EX,HEAD,SEARCH(old),pillof,stylecss,TILECSS,RISE,PANATTR,sub...
EX='cubic-bezier(.19,1,.22,1)'
CURCSS='.cur{display:inline-block;width:.5em;height:.85em;background:currentColor;vertical-align:-.08em;margin-left:2px}\n'
OVLCSS=f'''@keyframes bar-in{{0%{{left:560px;width:320px}}100%{{left:490px;width:460px}}}}
@keyframes bar-out{{0%{{left:490px;width:460px}}100%{{left:560px;width:320px}}}}
@keyframes drop-in{{0%{{opacity:0;clip-path:inset(0 0 100% 0)}}100%{{opacity:1;clip-path:inset(0 0 0 0)}}}}
@keyframes drop-out{{0%{{opacity:1;clip-path:inset(0 0 0 0)}}100%{{opacity:0;clip-path:inset(0 0 100% 0)}}}}
@keyframes slide-out{{0%{{opacity:1;transform:translateY(0)}}100%{{opacity:0;transform:translateY(24px)}}}}
@keyframes fade-out{{0%{{opacity:1}}100%{{opacity:0}}}}
.bz .velo{{animation:enter .35s {CE} both}}
.bz .panel{{animation:bar-in .5s {CE} both}}
.bz .pin{{animation:drop-in .5s {CE} .12s both}}
.bz .chip,.bz .vt{{animation:slide-in .5s {CE} both;animation-delay:var(--d)}}
.bz.out .panel{{animation:bar-out .45s {CE} .15s both!important}}.bz.out .pin{{animation:drop-out .3s {CE} both!important}}.bz.out .chip,.bz.out .vt{{animation:slide-out .3s {CE} both!important}}.bz.out .velo{{animation:fade-out .45s {CE} .1s both!important}}
.chip{{transition:transform .15s {CE},background-color .15s {CE}}}.chip:hover{{background:#fff!important;transform:scale(1.04)}}.chip:active{{transform:scale(.95)}}
.vt{{transition:transform .7s {CE}}}.vt:hover{{transform:scale(1.04)}}
.x{{transition:transform .15s {CE},background-color .15s {CE}}}.x:hover{{background:#fff!important;transform:scale(1.08)}}.x:active{{transform:scale(.95)}}
.x:focus-visible{{outline:2px solid #fff;outline-offset:2px}}
.fv{{font-size:14px;position:relative;display:inline-block;color:#fff;text-decoration:none}}
.fv::after{{content:"";position:absolute;left:0;bottom:-2px;width:100%;height:1px;background:currentColor;transform:scaleX(0);transform-origin:right center;transition:transform .7s {EX}}}
.fv:hover::after{{transform:scaleX(1);transform-origin:left center}}
@media (prefers-reduced-motion:reduce){{.bz .velo,.bz .panel,.bz .pin,.bz .chip,.bz .vt,.bz.out .panel,.bz.out .pin,.bz.out .chip,.bz.out .vt,.bz.out .velo{{animation-duration:.01ms!important;animation-delay:0s!important}}}}
'''
def S():
    return f'''  <button class="sb" onClick="{{{{openS}}}}" aria-label="Abrir buscador" style="position:absolute;top:20px;height:40px;background:#575757;border-radius:30px;display:flex;align-items:center;gap:10px;padding:0 16px;box-sizing:border-box;font-size:14px;font-family:inherit;color:#fff;z-index:9;cursor:pointer">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>
    <span class="shm">{{{{s.t}}}}</span><sc-if value="{{{{s.c}}}}" hint-placeholder-val="{{{{false}}}}"><span class="cur"></span></sc-if>
  </button>
'''
def OVL(ph,recents,label,thumbs):
    chips=''.join(f'<span class="chip" style="background:#d9d9d9;color:#111;border-radius:6px;padding:5px 12px;font-size:12px;--d:{0.15+i*0.04:.2f}s">{t}</span>' for i,t in enumerate(recents))
    th=''.join(f'<div class="vt" style="flex:none;width:{w}px;height:72px;background:#d9d9d9;border-radius:6px;--d:{0.3+i*0.05:.2f}s"></div>' for i,w in enumerate(thumbs))
    return f'''  <sc-if value="{{{{sOn}}}}" hint-placeholder-val="{{{{false}}}}">
  <div class="{{{{sCls}}}}" style="position:absolute;inset:0;z-index:40">
    <button class="velo" onClick="{{{{closeS}}}}" aria-label="Cerrar buscador" style="position:absolute;inset:0;width:100%;height:100%;background:rgba(217,217,217,.55);border:0;padding:0;cursor:default"></button>
    <div class="panel" style="position:absolute;left:490px;top:20px;width:460px;transform-origin:top center;color:#fff">
      <div style="height:40px;background:#575757;border-radius:30px;display:flex;align-items:center;gap:10px;padding:0 6px 0 16px;box-sizing:border-box;font-size:14px;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.08),inset 0 1px 1.5px rgba(255,255,255,.12)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>
        <span style="flex:1;color:#ececec">{ph}</span>
        <button class="x" onClick="{{{{closeS}}}}" aria-label="Cerrar buscador" style="width:28px;height:28px;border-radius:50%;background:#d9d9d9;display:flex;align-items:center;justify-content:center;border:0;padding:0;cursor:pointer"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#111" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8"/></svg></button>
      </div>
      <div class="pin" style="margin-top:6px;background:#575757;border-radius:14px;padding:14px;box-sizing:border-box;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.08);">
        <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:600;margin-bottom:10px"><span>Recientes</span><span style="text-decoration:underline">Borrar</span></div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">{chips}</div>
        <div style="font-size:11px;font-weight:600;margin:16px 0 10px">{label}</div>
        <div style="display:flex;gap:8px;overflow:hidden;margin-right:-14px">{th}</div>
      </div>
    </div>
  </div>
  </sc-if>
'''
R1=['interfaz western','paleta','hud','shaders agua','tipografía','concept art','tren']
OV_MAIN=OVL('Buscar…',R1,'Vistos recientemente',[110,160,72,90,120])
OV_ARCH=OVL('Buscar en tableros…',['tableros western','referencias ui','personajes','sin clasificar'],'Tableros recientes',[160,160,160])
OV_TAB=OVL('Buscar en Tablero #1…',['azul','hud','texturas','tipografía'],'Piezas vistas recientemente',[110,160,72,90,120])
OV_NOTE=OVL('Buscar en notas…',['ideas','libro western','captura','dibujo'],'Páginas recientes',[80,80,80,80,80])
# JS fragments
TYPE_STATE_METHODS=''
SELINFO=f'''  <sc-if value="{{{{sel}}}}" hint-placeholder-val="{{{{false}}}}">
    <button onClick="{{{{close}}}}" aria-label="Cerrar pieza" style="{{{{scrimStyle}}}}"></button>
    <div style="{{{{pieceStyle}}}}"><div style="{{{{shadeStyle}}}}"></div></div>
    <div style="{{{{infoStyle}}}}">
      <div style="font-size:26px;line-height:1.2">Nombre de pieza</div>
      <div style="margin-top:14px;font-size:15px;line-height:1.4">
        <p style="margin:0 0 14px">Info: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p style="margin:0 0 14px">Descripción: Maecenas laoreet placerat tellus, in dictum mauris egestas sed. Sed ac consectetur ipsum.</p>
        <p style="margin:0 0 14px">Dónde: Proin mollis lectus ac eros aliquet vulputate.</p>
        <p style="margin:0 0 14px">Sitio Web: www.sitiowebimportante.com</p>
        <p style="margin:0 0 14px">Fecha: 22/10/26, 20:15hs</p>
        <p style="margin:0 0 14px">Tablero: {{selBoard}}</p>
        <p style="margin:0 0 18px">Etiquetas: #Etiqueta1 #Etiqueta2 #Etiqueta3 #Etiqueta4</p>
        <a class="fv" href="Seleccion.dc.html" style="pointer-events:{{{{linkPE}}}}">Ver ficha completa</a>
      </div>
    </div>
  </sc-if>
'''
SELJS=f"""    const sph = this.state.phase, sopen = sph === 'open';
    const rr = this.state.rect || {{ l: 0, t: 168, w: 886, h: 732 }};
    const spaceR = 1440 - (rr.l + rr.w), spaceL = rr.l;
    const side = spaceR >= spaceL ? 'r' : 'l';
    const space = Math.max(spaceR, spaceL);
    const inside = space < 340;
    let iw, ix;
    if (!inside) {{ iw = Math.min(470, space - 70); ix = side === 'r' ? rr.l + rr.w + 40 : rr.l - 40 - iw; }}
    else {{ iw = Math.max(240, Math.min(470, rr.w - 60)); ix = rr.l + 30; }}
    const iy = Math.max(100, Math.min(rr.t + (inside ? 30 : 0), 440));
    const pieceStyle = 'position:absolute;z-index:31;pointer-events:none;overflow:hidden;background:' + this.state.selTone + ';left:' + rr.l + 'px;top:' + rr.t + 'px;width:' + rr.w + 'px;height:' + rr.h + 'px;border-radius:10px';
    const shadeStyle = 'position:absolute;inset:0;background:rgba(0,0,0,' + (inside ? 0.5 : 0) + ')';
    const scrimStyle = 'position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;cursor:pointer;z-index:30;background:rgba(0,0,0,.62);opacity:' + (sopen ? 1 : 0) + ';transition:opacity .6s {CE};pointer-events:' + (sopen ? 'auto' : 'none');
    const infoStyle = 'position:absolute;left:' + ix + 'px;top:' + iy + 'px;width:' + iw + 'px;font-weight:700;color:#fff;z-index:31;pointer-events:none;opacity:' + (sopen ? 1 : 0) + ';transform:' + (sopen ? 'none' : 'translate3d(' + (inside ? 0 : (side === 'r' ? -28 : 28)) + 'px,' + (inside ? 24 : 0) + 'px,0)') + ';transition:' + (sopen ? 'opacity .6s {EX} .25s,transform .8s {EX} .25s' : 'opacity .25s linear,transform .4s {EX}');"""
SELVALS=""",
      sel: !!this.state.sel, selBoard: this.state.selBoard, pieceStyle, shadeStyle, scrimStyle, infoStyle, linkPE: sopen ? 'auto' : 'none',
      close: () => this.closeSel()"""
SELMETHODS="""  pick(rect, tone, board) {
    clearTimeout(this.t1);
    this.setState({ sel: true, phase: 'enter', rect, selTone: tone, selBoard: board });
    this.t1 = setTimeout(() => this.setState({ phase: 'open' }), 40);
  }
  closeSel() {
    if (this.state.phase !== 'open') return;
    this.setState({ phase: 'out' });
    this.t1 = setTimeout(() => this.setState({ sel: false, phase: 'idle' }), 700);
  }"""
SELSTATE=", selBoard: 'Tablero #1', sel: false, phase: 'idle', rect: null, selTone: '#afafaf'"
COMMON_VALS=""",
      s, sOn: this.state.sq !== 'off', sCls: this.state.sq === 'out' ? 'bz out' : 'bz',
      openS: () => { clearTimeout(this.t3); this.setState({ sq: 'in' }); },
      closeS: () => { if (this.state.sq !== 'in') return; this.setState({ sq: 'out' }); this.t3 = setTimeout(() => this.setState({ sq: 'off' }), 640); }"""
COMMON_PRE="""    const tn = this.state.tn;
    const ty = (full, off, k) => { const c = Math.max(0, Math.floor((tn - off) * (k || 1))); return { t: full.slice(0, c), c: tn >= off && c < full.length }; };
    const s = ty('Buscar…', 2);
"""
def script4(body,w,h,vals='',extra_state='',methods='',pre_extra=''):
    return f'''<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":1440,"height":{h}}}}}'>
class Component extends DCLogic {{
  constructor(props) {{
    super(props);
    this.state = {{ px: 0, py: 0, panning: false, hov: null, n: 0, tn: 0, sq: 'off'{extra_state} }};
    this.drag = null;
    this.iv = null;
  }}
  componentDidMount() {{
    this.tiv = setInterval(() => {{
      const tn = this.state.tn + 1;
      this.setState({{ tn }});
      if (tn >= 140) clearInterval(this.tiv);
    }}, 40);
  }}
  componentWillUnmount() {{ clearInterval(this.iv); clearInterval(this.tiv); clearTimeout(this.t1); clearTimeout(this.t3); }}
  startType(id, total) {{
    clearInterval(this.iv);
    this.setState({{ hov: id, n: 0 }});
    this.iv = setInterval(() => {{
      const n = this.state.n + 1;
      this.setState({{ n }});
      if (n >= total) clearInterval(this.iv);
    }}, 45);
  }}
  stopType() {{ clearInterval(this.iv); this.setState({{ hov: null, n: 0 }}); }}
{methods}
  renderVals() {{
    const W = {w}, H = {h};
    const mod = (v, m) => ((v % m) + m) % m;
    const ox = mod(this.state.px, W), oy = mod(this.state.py, H);
{COMMON_PRE}{pre_extra}    const typed = (id, name, tags) => {{
      const on = this.state.hov === id;
      const n = on ? this.state.n : 0;
      const total = name.length + tags.length;
      return {{
        l1: name.slice(0, n), l2: tags.slice(0, Math.max(0, n - name.length)),
        c1: on && n < name.length, c2: on && n >= name.length && n < total,
        enter: () => {{ if (this.state.hov !== id) this.startType(id, total); }}, leave: () => this.stopType()
      }};
    }};
{body}
    return {{
      tiles,
      world: 'position:absolute;left:0;top:0;width:100%;height:100%;will-change:transform;transform:translate3d(' + ox + 'px,' + oy + 'px,0)',
      cur: this.state.panning ? 'grabbing' : 'default',
      down: (e) => {{ if (e.button !== 1) return; e.preventDefault(); this.drag = {{ x: e.clientX, y: e.clientY, px: this.state.px, py: this.state.py }}; this.setState({{ panning: true }}); }},
      move: (e) => {{ if (!this.drag) return; this.setState({{ px: this.drag.px + e.clientX - this.drag.x, py: this.drag.py + e.clientY - this.drag.y }}); }},
      up: () => {{ if (!this.drag) return; this.drag = null; this.setState({{ panning: false }}); }},
      aux: (e) => {{ if (e.button === 1) e.preventDefault(); }}{COMMON_VALS}{vals}
    }};
  }}
}}
</script>
</body>
</html>
'''
