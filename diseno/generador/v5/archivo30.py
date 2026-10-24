import re
exec(open('/tmp/w/v5/pill.py').read())
exec(open('/tmp/w/v5/lib30.py').read())
OUT = '/tmp/w/out/'
src = open(OUT + 'Archivo.dc.html').read()
ANOT = open(OUT + 'Anotador.dc.html').read()

def between(s, a, b, inclusive=True):
    i = s.index(a); j = s.index(b, i + len(a))
    return s[i:j + len(b)] if inclusive else s[i:j]

head = src[:src.index('</style>\n</helmet>')]
sb_btn = between(src, '  <button class="sb"', '  </button>\n')
search = between(src, '  <sc-if value="{{sOn}}"', '\n  </sc-if>\n')
search = search.replace('<span style="flex:1;color:#ececec">Buscar en tableros…</span>', '<span style="flex:1;color:#ececec">{{sPh}}</span>')
rules_blk = between(src, '  <!-- Reglas y ajustes', '\n  </sc-if>\n')
rmeth = src[src.index('  R() {'):src.index('  renderVals() {')]
script_open = src[src.index('<script type="text/x-dc"'):src.index('class Component')]

# estilos reutilizados del anotador (paneles, botones, campos, modal)
keep = []
for ln in ANOT.split('\n'):
    if re.match(r'^\.(nb|ob|pn|pr|mdl|in)[{:. ]', ln) or ln.startswith('.nb.ic') or ln.startswith('.in:focus'):
        keep.append(ln)
CE = 'cubic-bezier(.4,0,.2,1)'
EXTRA = '\n'.join(keep) + f'''
.scr{{scrollbar-width:thin;scrollbar-color:#afafaf transparent}}
.mb,.mb2{{border:0;padding:0;background:#575757;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:opacity .2s {CE},transform .15s {CE},background-color .15s {CE}}}
.mb{{position:absolute;right:12px;top:12px;width:32px;height:32px;opacity:0;z-index:2}}
.mb2{{width:36px;height:36px;border:1px solid rgba(255,255,255,.12)}}
.bt:hover .mb,.pc:hover .mb,.mb:focus-visible{{opacity:1}}
.mb:hover,.mb2:hover{{background:#6a6a6a;transform:scale(1.08)}}.mb:active,.mb2:active{{transform:scale(.95)}}
.mb:focus-visible,.mb2:focus-visible{{outline:2px solid #fff;outline-offset:2px}}
.pc .mb{{right:8px;top:8px;width:28px;height:28px}}
.bt,.pc{{transition:opacity .2s {CE},outline-color .2s {CE}}}
.lb{{transition:opacity .3s {CE}}}.tile:hover .lb,.tile:focus-visible .lb{{opacity:0}}
button.card{{display:block;width:100%;border:0;padding:0;margin:0;border-radius:10px;overflow:hidden;cursor:pointer;background:#afafaf;position:relative;text-align:left;font:inherit;color:#fff}}
.card .ov{{opacity:0;transition:opacity .3s {CE}}}.card:hover .ov,.card:focus-visible .ov{{opacity:1}}
.card img{{transition:transform .7s {CE}}}.card:hover img{{transform:scale(1.04)}}
.card:focus-visible{{outline:2px solid #575757;outline-offset:3px}}
.bk2{{height:36px;padding:0 16px;border-radius:30px;background:#575757;color:#fff;border:1px solid rgba(255,255,255,.12);font:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:background-color .15s {CE},transform .15s {CE}}}
.bk2:hover{{background:#6a6a6a}}.bk2:active{{transform:scale(.97)}}.bk2:focus-visible{{outline:2px solid #575757;outline-offset:2px}}
.dz{{width:100%;height:180px;border:2px dashed rgba(255,255,255,.35);border-radius:12px;background:#464646;color:#fff;font:inherit;font-size:15px;font-weight:700;cursor:pointer;line-height:1.6;transition:border-color .15s {CE}}}
.dz span{{font-size:12px;font-weight:400;opacity:.8}}.dz:hover,.dz:focus-visible{{border-color:#fff;outline:none}}
.lbl{{display:block;font-size:12px;font-weight:600;margin:14px 0 6px}}
.mn{{animation:scale-in .25s cubic-bezier(.19,1,.22,1) both}}
.ta3{{height:auto;min-height:88px;border-radius:14px;padding:10px 16px;resize:vertical;line-height:1.5;display:block}}
.sel3{{appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg,transparent 50%,#fff 50%),linear-gradient(135deg,#fff 50%,transparent 50%);background-position:calc(100% - 20px) 17px,calc(100% - 15px) 17px;background-size:5px 5px;background-repeat:no-repeat;padding-right:36px}}
.sel3 option{{color:#111}}
.cvo{{position:relative;aspect-ratio:4/3;border:0;padding:0;border-radius:8px;overflow:hidden;background:#464646;color:#fff;font:inherit;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;outline:3px solid transparent;outline-offset:2px;transition:transform .15s {CE}}}.cvo:hover{{transform:scale(1.03)}}.cvo:focus-visible{{box-shadow:0 0 0 2px #fff}}
.rz-tag{{display:inline-block;background:#d9d9d9;color:#111;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600;margin:0 6px 6px 0}}
@keyframes tile-in2{{0%{{opacity:0;filter:blur(2px);transform:scale(.95)}}100%{{opacity:1;filter:blur(0);transform:scale(1)}}}}
@keyframes mdl-out{{0%{{opacity:1}}100%{{opacity:0}}}}
@keyframes box-out{{0%{{opacity:1;transform:none}}100%{{opacity:0;transform:translateY(10px) scale(.96)}}}}
.mdl.out{{animation:mdl-out .32s cubic-bezier(.4,0,.2,1) both!important;pointer-events:none}}.mdl.out .box{{animation:box-out .32s cubic-bezier(.4,0,.2,1) both!important}}
@keyframes ld{{0%{{background-position:150% 0}}100%{{background-position:-50% 0}}}}
.card.ld{{background-image:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.22) 50%,transparent 70%);background-size:200% 100%;animation:ld 1.3s linear infinite}}
.empt{{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center;color:#575757;border:2px dashed #afafaf;border-radius:14px}}
@media (prefers-reduced-motion:reduce){{.mb,.mb2,.bt,.pc,.lb,.card .ov,.card img,.bk2,.dz{{transition-duration:.01ms!important}}.mn{{animation:none!important}}}}
'''

DOTS = '<svg width="16" height="16" viewBox="0 0 16 16" fill="#fff" aria-hidden="true"><circle cx="3.5" cy="8" r="1.4"/><circle cx="8" cy="8" r="1.4"/><circle cx="12.5" cy="8" r="1.4"/></svg>'
CHECK = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>'
XS = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#111" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8"/></svg>'

tools = circ5('plus', '{{plusLbl}}', onclick='plusAct') + circ5('sort', 'Ordenar', onclick='sortAct', ringhole='sortRing')
pill = pill5('arch', tools=tools)

BODY = f'''<div ref="{{{{rootRef}}}}" style="position:relative;width:1440px;height:900px;background:#d9d9d9;overflow:hidden;font-family:'Inter',system-ui,sans-serif;color:#fff">
  <!-- Lista de tableros -->
  <sc-if value="{{{{vBoards}}}}" hint-placeholder-val="{{{{true}}}}">
  <div class="scr" ref="{{{{scrRef}}}}" onScroll="{{{{onScr}}}}" style="position:absolute;inset:0;overflow-y:auto;overflow-x:hidden">
    <div style="padding:84px 46px 130px;box-sizing:border-box">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:22px;color:#575757">
        <h1 style="margin:0;font-size:28px;font-weight:700;line-height:1">Tableros</h1>
        <div style="font-size:13px;font-weight:600">{{{{bMeta}}}}</div>
      </div>
      <sc-if value="{{{{hasBoards}}}}" hint-placeholder-val="{{{{true}}}}">
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:34px">
        <sc-for list="{{{{boards}}}}" as="b" hint-placeholder-count="2">
          <div class="bt" draggable="true" onDragStart="{{{{b.ds}}}}" onDragOver="{{{{b.dov}}}}" onDrop="{{{{b.drop}}}}" onDragEnd="{{{{dend}}}}" style="position:relative;height:368px;border-radius:12px;animation:tile-in .8s cubic-bezier(.4,0,.2,1) {{{{b.d}}}} backwards;opacity:{{{{b.op}}}};outline:3px solid {{{{b.ol}}}};outline-offset:4px">
            <button class="tile" onClick="{{{{b.open}}}}" aria-label="Abrir {{{{b.name}}}}" style="position:absolute;inset:0;width:100%;height:100%;border-radius:10px;overflow:hidden;display:block;background:{{{{b.bg}}}}">
              <sc-if value="{{{{b.hasCover}}}}" hint-placeholder-val="{{{{false}}}}"><img class="ti" src="{{{{b.cover}}}}" alt="" draggable="false" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block"></sc-if><sc-if value="{{{{b.vidCover}}}}" hint-placeholder-val="{{{{false}}}}"><video class="ti" src="{{{{b.cover}}}}" ref="{{{{vref}}}}" muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block"></video></sc-if>
              <sc-if value="{{{{b.noCover}}}}" hint-placeholder-val="{{{{true}}}}"><span class="ti" style="position:absolute;inset:0;background:{{{{b.bg}}}}"></span></sc-if>
              <span class="ov" style="position:absolute;inset:0;background:rgba(0,0,0,.6);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;padding:0 48px;box-sizing:border-box"><span style="font-size:56px;font-weight:700;line-height:1.1;overflow-wrap:anywhere">{{{{b.name}}}}</span><span style="font-size:15px">{{{{b.meta}}}}</span></span>
              <span class="lb" style="position:absolute;left:16px;bottom:16px;max-width:calc(100% - 32px);background:#575757;color:#fff;border-radius:30px;padding:7px 14px;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box">{{{{b.name}}}} · {{{{b.meta}}}}</span>
            </button>
            <button class="mb" onClick="{{{{b.more}}}}" aria-label="Opciones de {{{{b.name}}}}">{DOTS}</button>
          </div>
        </sc-for>
      </div>
      </sc-if>
      <sc-if value="{{{{noBoards}}}}" hint-placeholder-val="{{{{false}}}}">
      <div class="empt" style="height:600px">
        <div style="font-size:26px;font-weight:700">Todavía no tenés tableros</div>
        <div style="font-size:14px;line-height:1.5;max-width:440px">Creá uno para empezar a juntar referencias. Lo que guardes con la extensión va a ir apareciendo adentro.</div>
        <button class="nb" onClick="{{{{plusAct}}}}" style="margin-top:8px">+ Crear tablero</button>
      </div>
      </sc-if>
    </div>
  </div>
  </sc-if>

  <!-- Vista de tablero: mosaico ordenado, lo último arriba -->
  <sc-if value="{{{{vBoard}}}}" hint-placeholder-val="{{{{false}}}}">
  <div class="scr" ref="{{{{scrRef}}}}" onScroll="{{{{onScr}}}}" onDragOver="{{{{fdov}}}}" onDragLeave="{{{{fdlv}}}}" onDrop="{{{{fdrop}}}}" style="position:absolute;inset:0;overflow-y:auto;overflow-x:hidden">
    <div style="padding:84px 46px 130px;box-sizing:border-box">
      <div style="display:grid;grid-template-columns:1fr minmax(0,auto) 1fr;gap:20px;align-items:center;margin-bottom:26px;color:#575757">
        <div><button class="bk2" onClick="{{{{goBoards}}}}">← Tableros</button></div>
        <div style="text-align:center;min-width:0"><h1 style="margin:0;font-size:28px;font-weight:700;line-height:1.1;overflow-wrap:anywhere">{{{{cb.name}}}}</h1><div style="font-size:13px;font-weight:600;margin-top:6px">{{{{cb.meta}}}}</div></div>
        <div style="display:flex;justify-content:flex-end"><button class="mb2" onClick="{{{{cb.more}}}}" aria-label="Opciones del tablero">{DOTS}</button></div>
      </div>
      <sc-if value="{{{{hasItems}}}}" hint-placeholder-val="{{{{true}}}}">
      <div style="position:relative;height:{{{{gridH}}}}px">
        <sc-for list="{{{{cards}}}}" as="it" hint-placeholder-count="4">
          <div class="pc" draggable="true" onDragStart="{{{{it.ds}}}}" onDragOver="{{{{it.dov}}}}" onDrop="{{{{it.drop}}}}" onDragEnd="{{{{dend}}}}" style="position:absolute;left:{{{{it.x}}}}px;top:{{{{it.y}}}}px;width:{{{{it.w}}}}px;height:{{{{it.h}}}}px;border-radius:10px;animation:{{{{it.an}}}} .8s cubic-bezier(.4,0,.2,1) {{{{it.d}}}} backwards;opacity:{{{{it.op}}}};outline:3px solid {{{{it.ol}}}};outline-offset:3px">
            <button class="{{{{it.ld}}}}" onClick="{{{{it.open}}}}" aria-label="Ver {{{{it.title}}}}" style="height:100%">
              <sc-if value="{{{{it.isImg}}}}" hint-placeholder-val="{{{{true}}}}"><img src="{{{{it.src}}}}" alt="" loading="lazy" decoding="async" draggable="false" style="display:block;width:100%;height:100%;object-fit:cover"></sc-if>
              <sc-if value="{{{{it.isVid}}}}" hint-placeholder-val="{{{{false}}}}"><video src="{{{{it.src}}}}" ref="{{{{vref}}}}" muted loop playsinline style="display:block;width:100%;height:100%;object-fit:cover;pointer-events:none"></video></sc-if>
              <sc-if value="{{{{it.isLink}}}}" hint-placeholder-val="{{{{false}}}}"><span style="display:flex;flex-direction:column;height:100%">
                <sc-if value="{{{{it.embPost}}}}" hint-placeholder-val="{{{{false}}}}"><span style="flex:1;min-height:0;display:flex;flex-direction:column;gap:9px;padding:16px 18px;background:#ececec;color:#111;box-sizing:border-box;overflow:hidden"><span style="display:flex;align-items:center;gap:10px"><span style="width:38px;height:38px;border-radius:50%;background:#afafaf;flex:none"></span><span style="display:flex;flex-direction:column;gap:6px"><span style="width:120px;height:9px;border-radius:5px;background:#575757"></span><span style="width:76px;height:8px;border-radius:5px;background:#afafaf"></span></span></span><span style="height:9px;border-radius:5px;background:#b7b7b7;width:96%;flex:none"></span><span style="height:9px;border-radius:5px;background:#b7b7b7;width:90%;flex:none"></span><span style="height:9px;border-radius:5px;background:#b7b7b7;width:62%;flex:none"></span><span style="font-size:11px;font-weight:600;margin-top:auto;opacity:.8">Publicación de {{{{it.dom}}}}</span></span></sc-if><sc-if value="{{{{it.embDark}}}}" hint-placeholder-val="{{{{true}}}}"><span style="flex:1;min-height:0;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:#1f1f1f;color:#fff;background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.04) 0 10px,transparent 10px 20px)">
                  <sc-if value="{{{{it.vidSite}}}}" hint-placeholder-val="{{{{false}}}}"><span style="width:52px;height:52px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center"><svg width="22" height="22" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z" fill="#111"/></svg></span></sc-if>
                  <sc-if value="{{{{it.embAudio}}}}" hint-placeholder-val="{{{{false}}}}"><svg width="34" height="34" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 12V3.5l7-1.5v8.5"/><circle cx="4.3" cy="12" r="1.7"/><circle cx="11.3" cy="10.5" r="1.7"/></svg></sc-if>
                  <span style="font-size:13px;font-weight:600;opacity:.85">{{{{it.embLbl}}}}</span></sc-if>
                </span>
                <span style="flex:none;height:64px;box-sizing:border-box;padding:10px 14px;background:#d9d9d9;color:#111;display:flex;flex-direction:column;justify-content:center;gap:2px"><span style="font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{{{it.dom}}}}</span><span style="font-size:14px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{{{it.title}}}}</span></span>
              </span></sc-if>
              <sc-if value="{{{{it.isText}}}}" hint-placeholder-val="{{{{false}}}}"><span style="display:block;height:100%;overflow:hidden;box-sizing:border-box;padding:20px 22px;background:#575757;font-size:15px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere;-webkit-mask-image:{{{{it.fade}}}};mask-image:{{{{it.fade}}}}"><sc-if value="{{{{it.hasTtl}}}}" hint-placeholder-val="{{{{false}}}}"><b style="display:block;font-size:17px;margin-bottom:6px">{{{{it.title}}}}</b></sc-if>{{{{it.text}}}}</span></sc-if>
              <span class="ov" style="position:absolute;inset:0;background:rgba(0,0,0,.55);display:flex;flex-direction:column;justify-content:flex-end;padding:14px;box-sizing:border-box;gap:4px"><b style="font-size:15px;line-height:1.2;overflow-wrap:anywhere">{{{{it.title}}}}</b><span style="font-size:11px">{{{{it.meta}}}}</span></span>
            </button>
            <button class="mb" onClick="{{{{it.more}}}}" aria-label="Opciones de {{{{it.title}}}}">{DOTS}</button>
          </div>
        </sc-for>
      </div>
      </sc-if>
      <sc-if value="{{{{noItems}}}}" hint-placeholder-val="{{{{false}}}}">
      <div class="empt" style="height:560px">
        <div style="font-size:26px;font-weight:700">Este tablero está vacío</div>
        <div style="font-size:14px;line-height:1.5;max-width:460px">Lo que guardes acá va a aparecer en mosaico, siempre lo último arriba. Podés probar arrastrando una imagen, un video o un enlace a esta pantalla.</div>
        <button class="nb" onClick="{{{{plusAct}}}}" style="margin-top:8px">+ Agregar pieza</button>
      </div>
      </sc-if>
    </div>
  </div>
  <sc-if value="{{{{fileOver}}}}" hint-placeholder-val="{{{{false}}}}"><div style="position:absolute;inset:12px;border:3px dashed #575757;border-radius:16px;background:rgba(217,217,217,.75);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:#575757;pointer-events:none;z-index:20">Soltá para sumarlo al tablero</div></sc-if>
  </sc-if>

{sb_btn}{pill}
  <input type="file" accept="image/*,video/*" ref="{{{{fileRef}}}}" onChange="{{{{onFile}}}}" style="display:none" tabindex="-1" aria-hidden="true">

  <!-- Menú de opciones (⋯) -->
  <sc-if value="{{{{menuOn}}}}" hint-placeholder-val="{{{{false}}}}">
    <button onClick="{{{{closeMenu}}}}" aria-label="Cerrar menú" tabindex="-1" style="position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:transparent;z-index:24;cursor:default"></button>
    <div class="pn mn" role="menu" style="position:absolute;z-index:25;width:220px;padding:6px;box-sizing:border-box;{{{{menu.style}}}}">
      <sc-for list="{{{{menu.items}}}}" as="m" hint-placeholder-count="3"><button class="pr" role="menuitem" onClick="{{{{m.act}}}}">{{{{m.l}}}}</button></sc-for>
    </div>
  </sc-if>

  <!-- Orden -->
  <sc-if value="{{{{sortOpen}}}}" hint-placeholder-val="{{{{false}}}}">
    <button onClick="{{{{closeSort}}}}" aria-label="Cerrar orden" tabindex="-1" style="position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:transparent;z-index:24;cursor:default"></button>
    <div class="pn mn" role="menu" aria-label="Ordenar" style="position:absolute;z-index:25;left:calc(50% - 250px);bottom:76px;width:270px;padding:6px;box-sizing:border-box">
      <div style="font-size:11px;font-weight:600;opacity:.8;padding:8px 12px 6px">{{{{sortWhat}}}}</div>
      <sc-for list="{{{{sortOpts}}}}" as="o" hint-placeholder-count="5"><button class="pr" role="menuitemradio" aria-checked="{{{{o.on}}}}" onClick="{{{{o.pick}}}}"><span>{{{{o.l}}}}</span><span style="display:flex;opacity:{{{{o.mark}}}}">{CHECK}</span></button></sc-for>
    </div>
  </sc-if>

  <!-- Nombre del tablero (nuevo / renombrar) -->
  <sc-if value="{{{{naming}}}}" hint-placeholder-val="{{{{false}}}}">
    <div class="mdl {{{{xNm}}}}" style="position:absolute;inset:0;z-index:30;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center">
      <div class="pn box" role="dialog" aria-label="{{{{nm.title}}}}" style="width:400px;padding:24px;box-sizing:border-box">
        <div style="font-size:20px;font-weight:700">{{{{nm.title}}}}</div>
        <div style="font-size:13px;opacity:.85;margin:6px 0 16px;line-height:1.4">{{{{nm.hint}}}}</div>
        <input class="in" ref="{{{{nameRef}}}}" value="{{{{draft}}}}" onInput="{{{{onDraft}}}}" onKeyDown="{{{{nameKey}}}}" placeholder="Nombre del tablero" aria-label="Nombre del tablero" maxlength="40">
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px">
          <button class="ob" onClick="{{{{cancelModal}}}}" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)">Cancelar</button>
          <button class="ob" onClick="{{{{submitName}}}}" style="opacity:{{{{nm.op}}}}" aria-disabled="{{{{nm.dis}}}}">{{{{nm.btn}}}}</button>
        </div>
      </div>
    </div>
  </sc-if>

  <!-- Confirmar eliminación -->
  <sc-if value="{{{{confOn}}}}" hint-placeholder-val="{{{{false}}}}">
    <div class="mdl {{{{xConf}}}}" style="position:absolute;inset:0;z-index:35;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center">
      <div class="pn box" role="alertdialog" aria-label="{{{{conf.title}}}}" style="width:420px;padding:24px;box-sizing:border-box">
        <div style="font-size:20px;font-weight:700;overflow-wrap:anywhere">{{{{conf.title}}}}</div>
        <div style="font-size:13px;opacity:.85;margin:8px 0 18px;line-height:1.45">{{{{conf.text}}}}</div>
        <div style="display:flex;gap:8px;justify-content:flex-end">
          <button class="ob" onClick="{{{{conf.no}}}}" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)">Cancelar</button>
          <button class="ob" onClick="{{{{conf.yes}}}}">Eliminar</button>
        </div>
      </div>
    </div>
  </sc-if>

  <!-- Agregar pieza a mano -->
  <sc-if value="{{{{addOn}}}}" hint-placeholder-val="{{{{false}}}}">
    <div class="mdl {{{{xAdd}}}}" style="position:absolute;inset:0;z-index:30;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center">
      <div class="pn box" role="dialog" aria-label="Agregar pieza" onDragOver="{{{{add.dov}}}}" onDrop="{{{{add.drop}}}}" style="width:480px;padding:24px;box-sizing:border-box">
        <div style="font-size:20px;font-weight:700;overflow-wrap:anywhere">Agregar a {{{{cb.name}}}}</div>
        <div style="font-size:13px;opacity:.85;margin:6px 0 16px;line-height:1.4">En el uso real lo guarda la extensión. Acá podés sumarlo a mano: va a aparecer primero en el tablero.</div>
        <div style="display:flex;gap:6px">
          <sc-for list="{{{{add.tabs}}}}" as="t" hint-placeholder-count="3"><button class="ob" onClick="{{{{t.pick}}}}" aria-pressed="{{{{t.on}}}}" style="background:{{{{t.bg}}}}">{{{{t.l}}}}</button></sc-for>
        </div>
        <sc-if value="{{{{add.tImg}}}}" hint-placeholder-val="{{{{true}}}}">
          <div style="margin-top:16px">
            <sc-if value="{{{{add.noImg}}}}" hint-placeholder-val="{{{{true}}}}"><button class="dz" onClick="{{{{pickFile}}}}">Elegir imagen, GIF o video<br><span>o arrastralo acá · PNG, JPG, WebP, GIF, MP4 o WebM</span></button></sc-if>
            <sc-if value="{{{{add.hasImg}}}}" hint-placeholder-val="{{{{false}}}}"><div style="position:relative;background:#464646;border-radius:12px;overflow:hidden;height:220px"><sc-if value="{{{{add.isVid}}}}" hint-placeholder-val="{{{{false}}}}"><video src="{{{{add.src}}}}" ref="{{{{vref}}}}" muted loop playsinline style="width:100%;height:100%;object-fit:contain;display:block"></video></sc-if><sc-if value="{{{{add.notVid}}}}" hint-placeholder-val="{{{{true}}}}"><img src="{{{{add.src}}}}" alt="Vista previa" style="width:100%;height:100%;object-fit:contain;display:block"></sc-if><span style="position:absolute;left:10px;bottom:10px;background:rgba(0,0,0,.6);border-radius:30px;padding:5px 10px;font-size:11px;font-weight:600">{{{{add.size}}}}</span><button class="ob" onClick="{{{{pickFile}}}}" style="position:absolute;right:10px;bottom:10px">Cambiar</button></div></sc-if>
          </div>
          <label class="lbl" for="ad-ti">Título (opcional)</label>
          <input class="in" id="ad-ti" value="{{{{add.title}}}}" onInput="{{{{add.onTitle}}}}" onKeyDown="{{{{add.key}}}}" placeholder="Ej: paleta de atardecer">
          <label class="lbl" for="ad-fr">Sacado de (opcional)</label>
          <input class="in" id="ad-fr" value="{{{{add.from}}}}" onInput="{{{{add.onFrom}}}}" onKeyDown="{{{{add.key}}}}" placeholder="https://pinterest.com/…">
        </sc-if>
        <sc-if value="{{{{add.tLink}}}}" hint-placeholder-val="{{{{false}}}}">
          <label class="lbl" for="ad-url">Enlace</label>
          <input class="in" id="ad-url" ref="{{{{urlRef}}}}" value="{{{{add.url}}}}" onInput="{{{{add.onUrl}}}}" onKeyDown="{{{{add.key}}}}" placeholder="https://…">
          <label class="lbl" for="ad-lt">Título (opcional)</label>
          <input class="in" id="ad-lt" value="{{{{add.title}}}}" onInput="{{{{add.onTitle}}}}" onKeyDown="{{{{add.key}}}}" placeholder="Si lo dejás vacío uso el sitio">
        </sc-if>
        <sc-if value="{{{{add.tText}}}}" hint-placeholder-val="{{{{false}}}}">
          <label class="lbl" for="ad-tt">Título (opcional)</label>
          <input class="in" id="ad-tt" value="{{{{add.title}}}}" onInput="{{{{add.onTitle}}}}" placeholder="Ej: idea para el HUD">
          <label class="lbl" for="ad-tx">Texto</label>
          <textarea class="in ta3" id="ad-tx" rows="4" value="{{{{add.text}}}}" onInput="{{{{add.onText}}}}" placeholder="Pegá o escribí el texto que querés guardar"></textarea>
        </sc-if>
        <sc-if value="{{{{add.hasAuto}}}}" hint-placeholder-val="{{{{false}}}}"><div style="margin-top:12px;font-size:12px;display:flex;flex-wrap:wrap;align-items:center;gap:6px"><span style="opacity:.85">Etiquetas automáticas:</span><sc-for list="{{{{add.auto}}}}" as="g" hint-placeholder-count="2"><span class="rz-tag" style="margin:0">#{{{{g.t}}}}</span></sc-for></div></sc-if>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px">
          <button class="ob" onClick="{{{{cancelAdd}}}}" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)">Cancelar</button>
          <button class="ob" onClick="{{{{add.submit}}}}" style="opacity:{{{{add.op}}}}" aria-disabled="{{{{add.dis}}}}">Agregar</button>
        </div>
      </div>
    </div>
  </sc-if>

  <!-- Portada del tablero -->
  <sc-if value="{{{{covOn}}}}" hint-placeholder-val="{{{{false}}}}">
    <div class="mdl {{{{xCov}}}}" style="position:absolute;inset:0;z-index:30;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center">
      <div class="pn box" role="dialog" aria-label="Elegir portada" style="width:min(720px,calc(100% - 48px));max-height:calc(100% - 120px);padding:24px;box-sizing:border-box;display:flex;flex-direction:column">
        <div style="font-size:20px;font-weight:700;overflow-wrap:anywhere">Portada de {{{{cov.name}}}}</div>
        <div style="font-size:13px;opacity:.85;margin:6px 0 16px;line-height:1.4">Elegí una imagen o video del tablero, o subí otra. En automático usa lo último que guardaste.</div>
        <div style="flex:1;min-height:0;overflow:auto;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;align-content:start">
          <button class="cvo" onClick="{{{{cov.auto}}}}" aria-pressed="{{{{cov.autoOn}}}}" style="outline-color:{{{{cov.autoOl}}}}"><span style="font-size:13px;font-weight:700">Automática</span><span style="font-size:11px;opacity:.85">Lo más reciente</span></button>
          <sc-for list="{{{{cov.opts}}}}" as="o" hint-placeholder-count="3"><button class="cvo" onClick="{{{{o.pick}}}}" aria-pressed="{{{{o.on}}}}" aria-label="Usar {{{{o.title}}}} como portada" style="outline-color:{{{{o.ol}}}}"><sc-if value="{{{{o.isVid}}}}" hint-placeholder-val="{{{{false}}}}"><video src="{{{{o.src}}}}" ref="{{{{vref}}}}" muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video></sc-if><sc-if value="{{{{o.isImg}}}}" hint-placeholder-val="{{{{true}}}}"><img src="{{{{o.src}}}}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></sc-if></button></sc-for>
        </div>
        <div style="display:flex;gap:8px;justify-content:space-between;margin-top:18px">
          <button class="ob" onClick="{{{{cov.upload}}}}" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)">Subir otra imagen</button>
          <button class="ob" onClick="{{{{cov.close}}}}">Listo</button>
        </div>
      </div>
    </div>
  </sc-if>

  <!-- Pieza: ver y editar -->
  <sc-if value="{{{{edOn}}}}" hint-placeholder-val="{{{{false}}}}">
    <div class="mdl {{{{xEd}}}}" style="position:absolute;inset:0;z-index:30;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center">
      <button onClick="{{{{edClose}}}}" aria-label="Cerrar pieza" tabindex="-1" style="position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:transparent;cursor:default"></button>
      <div class="pn box" role="dialog" aria-label="{{{{pe.title}}}}" style="position:relative;width:min(1240px,calc(100% - 48px));height:min(716px,calc(100% - 120px));display:flex;overflow:hidden">
        <div style="flex:1;min-width:0;background:#464646;display:flex;align-items:center;justify-content:center;padding:28px;box-sizing:border-box">
          <sc-if value="{{{{pe.isImg}}}}" hint-placeholder-val="{{{{true}}}}"><img src="{{{{pe.src}}}}" alt="{{{{pe.title}}}}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;display:block"></sc-if><sc-if value="{{{{pe.isVid}}}}" hint-placeholder-val="{{{{false}}}}"><video src="{{{{pe.src}}}}" ref="{{{{vref}}}}" muted loop playsinline controls style="max-width:100%;max-height:100%;border-radius:6px;display:block"></video></sc-if>
          <sc-if value="{{{{pe.isLink}}}}" hint-placeholder-val="{{{{false}}}}"><div style="text-align:center;max-width:560px"><div style="font-size:13px">{{{{pe.dom}}}}</div><div style="font-size:30px;font-weight:700;margin:10px 0 22px;overflow-wrap:anywhere">{{{{pe.title}}}}</div><a class="ob" href="{{{{pe.href}}}}" target="_blank" rel="noopener" style="display:inline-flex;text-decoration:none">Abrir sitio</a></div></sc-if>
          <sc-if value="{{{{pe.isText}}}}" hint-placeholder-val="{{{{false}}}}"><textarea class="in ta3" rows="14" value="{{{{pe.text}}}}" onInput="{{{{pe.onText}}}}" aria-label="Texto guardado" style="height:100%;border-radius:12px;font-size:16px;resize:none"></textarea></sc-if>
        </div>
        <div style="width:440px;flex:none;padding:22px 24px;box-sizing:border-box;display:flex;flex-direction:column;overflow:auto">
          <div style="display:flex;align-items:center;justify-content:space-between"><div style="font-size:13px;font-weight:600">{{{{pe.kind}}}} · {{{{pe.date}}}}<span style="display:block;font-size:11px;font-weight:400;opacity:.85;margin-top:2px">{{{{pe.size}}}}</span></div><button class="ob" onClick="{{{{edClose}}}}" aria-label="Cerrar pieza" style="width:32px;padding:0">{XS}</button></div>
          <label class="lbl" for="ed-ti">Título</label>
          <input class="in" id="ed-ti" value="{{{{pe.title}}}}" onInput="{{{{pe.onTitle}}}}" placeholder="Sin título">
          <label class="lbl" for="ed-no">Nota</label>
          <textarea class="in ta3" id="ed-no" rows="3" value="{{{{pe.note}}}}" onInput="{{{{pe.onNote}}}}" placeholder="Por qué lo guardaste, dónde lo vas a usar…"></textarea>
          <label class="lbl" for="ed-ur">Sitio web</label>
          <input class="in" id="ed-ur" value="{{{{pe.url}}}}" onInput="{{{{pe.onUrl}}}}" placeholder="https://…">
          <sc-if value="{{{{pe.hasAuto}}}}" hint-placeholder-val="{{{{false}}}}"><div style="font-size:12px;font-weight:600;margin:14px 0 6px">Etiquetas automáticas (por el sitio)</div><div><sc-for list="{{{{pe.auto}}}}" as="g" hint-placeholder-count="2"><span class="rz-tag">#{{{{g.t}}}}</span></sc-for></div></sc-if>
          <label class="lbl" for="ed-tg">Tus etiquetas</label>
          <input class="in" id="ed-tg" value="{{{{pe.tags}}}}" onInput="{{{{pe.onTags}}}}" placeholder="paleta, hud (separadas por coma)">
          <label class="lbl" for="ed-bo">Tablero</label>
          <select class="in sel3" id="ed-bo" onChange="{{{{pe.onBoard}}}}"><sc-for list="{{{{pe.bopts}}}}" as="o" hint-placeholder-count="2"><option value="{{{{o.v}}}}" selected="{{{{o.sel}}}}">{{{{o.l}}}}</option></sc-for></select>
          <div style="font-size:12px;margin-top:10px;opacity:.85">Los cambios se guardan solos.</div>
          <div style="flex:1;min-height:16px"></div>
          <div style="display:flex;gap:8px;justify-content:space-between">
            <button class="ob" onClick="{{{{pe.del}}}}" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)">Eliminar pieza</button>
            <button class="ob" onClick="{{{{edClose}}}}">Listo</button>
          </div>
        </div>
      </div>
    </div>
  </sc-if>
{search}{rules_blk}</div>
</x-dc>
'''

JS = r'''class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { tn: 0, sq: 'off', rq: 'off', rtab: 'reglas', rsel: 'r1', rrev: 0, rmsg: '', rproj: 0, lrev: 0, view: 'boards', bid: null, menu: null, sortOpen: false, modal: null, draft: '', add: null, edId: null, conf: null, dragId: null, overId: null, fileOver: false, cw: 0, cov: null, closing: null, newId: null };
    this.START = 'boards';
    this.root = null; this.scr = null; this.fileEl = null; this.dragId = null;
  }
  componentDidMount() {
    this.tiv = setInterval(() => { const tn = this.state.tn + 1; this.setState({ tn }); if (tn >= 140) clearInterval(this.tiv); }, 40);
    if (this.START === 'board') {
      const L = this.lib();
      let b = L.boards.find((x) => x.id === L.last) || this.sortedBoards()[0];
      if (!b) { b = { id: this.uid(), name: 'Mi primer tablero', t: Date.now(), sort: 'recent', man: [] }; L.boards.push(b); }
      this.setState({ view: 'board', bid: b.id });
    }
  }
  componentWillUnmount() { clearInterval(this.tiv); clearTimeout(this.t3); clearTimeout(this.rt); clearTimeout(this.wt); }
__LIB__
  sortedBoards() {
    const L = this.lib(), m = L.bsort || 'recent';
    const cnt = {}; L.items.forEach((i) => { cnt[i.bid] = (cnt[i.bid] || 0) + 1; });
    const bs = L.boards.slice();
    if (m === 'old') bs.sort((a, b) => a.t - b.t);
    else if (m === 'az') bs.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    else if (m === 'count') bs.sort((a, b) => (cnt[b.id] || 0) - (cnt[a.id] || 0) || b.t - a.t);
    else if (m === 'manual') { const o = L.bman || []; bs.sort((a, b) => o.indexOf(a.id) - o.indexOf(b.id) || b.t - a.t); }
    else bs.sort((a, b) => b.t - a.t);
    return bs;
  }
  sortedItems(b) {
    const m = b.sort || 'recent';
    const its = this.lib().items.filter((i) => i.bid === b.id);
    const K = { img: 0, link: 1, text: 2 };
    if (m === 'old') its.sort((x, y) => x.t - y.t);
    else if (m === 'az') its.sort((x, y) => (x.title || '').localeCompare(y.title || '', 'es'));
    else if (m === 'kind') its.sort((x, y) => (K[x.kind] - K[y.kind]) || y.t - x.t);
    else if (m === 'manual') { const o = b.man || []; its.sort((x, y) => o.indexOf(x.id) - o.indexOf(y.id) || y.t - x.t); }
    else its.sort((x, y) => y.t - x.t);
    return its;
  }
  curBoard() { return this.lib().boards.find((b) => b.id === this.state.bid) || null; }
  openBoard(id) { this.lib().last = id; this.setState({ view: 'board', bid: id, menu: null, sortOpen: false }); this.commit(); if (this.scr) this.scr.scrollTop = 0; }
  goBoards() { this.setState({ view: 'boards', bid: null, menu: null, sortOpen: false }); if (this.scr) this.scr.scrollTop = 0; }
  createBoard(name) {
    const L = this.lib();
    const b = { id: this.uid(), name, t: Date.now(), sort: 'recent', man: [] };
    L.boards.push(b);
    if (L.bsort === 'manual') L.bman = [b.id].concat(L.bman || []);
    this.commit();
    return b;
  }
  delBoard(id) {
    const L = this.lib();
    L.boards = L.boards.filter((b) => b.id !== id);
    L.items.filter((i) => i.bid === id).forEach((i) => this.mediaDel(i.id)); this.mediaDel('cover:' + id);
    L.items = L.items.filter((i) => i.bid !== id);
    L.bman = (L.bman || []).filter((x) => x !== id);
    if (this.state.bid === id) this.setState({ view: 'boards', bid: null });
    this.commit();
  }
  delItem(id) {
    const L = this.lib();
    this.mediaDel(id); this.mediaDel('thumb:' + id); L.boards.forEach((b) => { if (b.cover === id) b.cover = null; });
    L.items = L.items.filter((i) => i.id !== id);
    if (this.state.edId === id) this.setState({ edId: null });
    this.commit();
  }
  addItem(o) {
    const b = this.curBoard(); if (!b) return;
    const media = o.media; delete o.media; const thumb = o.thumb; delete o.thumb;
    const it = Object.assign({ id: this.uid(), bid: b.id, t: Date.now(), title: '', note: '', url: '', tags: '', text: '', atags: [] }, o);
    if (media) { if (this._dbFail && typeof media === 'string') it.src = media; else this.mediaPut(it.id, media); }
    if (thumb && !this._dbFail) { this.mediaPut('thumb:' + it.id, thumb); it.th = true; }
    this.lib().items.push(it); this.setState({ newId: it.id });
    if (b.sort === 'manual') b.man = [it.id].concat(b.man || []);
    this.commit();
    if (this.scr) this.scr.scrollTop = 0;
  }
  moveItem(id, where) {
    const b = this.curBoard(); if (!b) return;
    const ids = this.sortedItems(b).map((x) => x.id).filter((x) => x !== id);
    b.man = where === 'first' ? [id].concat(ids) : ids.concat([id]);
    b.sort = 'manual';
    this.commit();
  }
  reorder(list, dragId, overId) {
    const a = list.slice(); const from = a.indexOf(dragId), to = a.indexOf(overId);
    if (from < 0 || to < 0 || from === to) return null;
    a.splice(from, 1); a.splice(to, 0, dragId);
    return a;
  }
  readMedia(file, cb) {
    if (!file) return;
    const type = file.type || '';
    const name = String(file.name || '').replace(/\.[^.]+$/, '');
    let url = ''; try { url = URL.createObjectURL(file); } catch (e) { return; }
    if (/^video\//.test(type)) {
      const v = document.createElement('video'); v.preload = 'metadata'; v.muted = true;
      v.onloadedmetadata = () => cb({ kind: 'video', media: file, url, ow: v.videoWidth || 1280, oh: v.videoHeight || 720, name });
      v.onerror = () => cb({ kind: 'video', media: file, url, ow: 1280, oh: 720, name });
      v.src = url; return;
    }
    if (!/^image\//.test(type)) return;
    const gif = /gif/i.test(type);
    const im = new Image();
    im.onload = () => {
      const ow = im.naturalWidth || 1, oh = im.naturalHeight || 1;
      let avg = '';
      try { const c1 = document.createElement('canvas'); c1.width = 1; c1.height = 1; const g1 = c1.getContext('2d'); g1.drawImage(im, 0, 0, 1, 1); const d = g1.getImageData(0, 0, 1, 1).data; avg = 'rgb(' + d[0] + ',' + d[1] + ',' + d[2] + ')'; } catch (e) {}
      let media = file;
      if (!gif && (Math.max(ow, oh) > 1600 || (file.size || 0) > 1500000)) {
        try { const k = 1600 / Math.max(ow, oh); const w = Math.round(ow * Math.min(1, k)), h = Math.round(oh * Math.min(1, k)); const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h); g.drawImage(im, 0, 0, w, h); media = c.toDataURL('image/jpeg', 0.86); } catch (e) { media = file; }
      }
      let thumb = '';
      if (!gif && Math.max(ow, oh) > 900) { try { const k = 900 / Math.max(ow, oh); const w = Math.round(ow * k), h = Math.round(oh * k); const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h); g.drawImage(im, 0, 0, w, h); thumb = c.toDataURL('image/jpeg', 0.8); } catch (e) {} }
      cb({ kind: 'img', gif, media, thumb, url: typeof media === 'string' ? media : url, ow, oh, avg, name });
    };
    im.onerror = () => {};
    im.src = url;
  }
  mediaItem(m, extra) { return Object.assign({ kind: m.kind, media: m.media, thumb: m.thumb || '', gif: !!m.gif, ow: m.ow, oh: m.oh, avg: m.avg || '', title: m.name || (m.kind === 'video' ? 'Video' : 'Imagen') }, extra || {}); }
  coverOf(b) {
    if (b.coverUp) { const s = this.srcOf({ id: 'cover:' + b.id }); if (s) return { src: s, vid: false }; }
    const its = this.sortedItems({ id: b.id, sort: 'recent' });
    const it = (b.cover && its.find((x) => x.id === b.cover && this.isVis(x))) || its.find((x) => this.isVis(x));
    return it ? { src: it.kind === 'img' ? this.thumbOf(it) : this.srcOf(it), vid: it.kind === 'video' } : null;
  }
  hasDrop(e) { try { const t = Array.prototype.slice.call(e.dataTransfer.types || []); return t.indexOf('Files') >= 0 || t.indexOf('text/uri-list') >= 0; } catch (er) { return false; } }
  anchor(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const R = this.root ? this.root.getBoundingClientRect() : { left: 0, top: 0, width: 1440, height: 900 };
    return { x: r.right - R.left, y: r.bottom - R.top, top: r.top - R.top, W: R.width || 1440, H: R.height || 900 };
  }
  hasFiles0(e) { try { return Array.prototype.indexOf.call(e.dataTransfer.types || [], 'Files') >= 0; } catch (er) { return false; } }
  submitAdd() {
    const A = this.state.add; if (!A) return;
    if (A.k === 'img') { if (!A.img) return; const from = A.from.trim() ? (/^https?:\/\//i.test(A.from.trim()) ? A.from.trim() : 'https://' + A.from.trim()) : ''; this.addItem(this.mediaItem(A.img, { title: A.title.trim() || A.img.name || 'Imagen', url: from, atags: from ? this.siteTags(from) : [] })); }
    else if (A.k === 'link') {
      let u = A.url.trim(); if (!/\S+\.\S+/.test(u)) return;
      if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
      this.addItem({ kind: 'link', url: u, title: A.title.trim() || this.dom(u), atags: this.siteTags(u) });
    } else { if (!A.text.trim()) return; this.addItem({ kind: 'text', text: A.text, title: A.title.trim() }); }
    this.shut('add', () => this.setState({ add: null }));
  }
  submitName() {
    const name = this.state.draft.trim(); const M = this.state.modal;
    if (!name || !M) return;
    if (M.k === 'rename') { const b = this.lib().boards.find((x) => x.id === M.id); if (b) b.name = name; this.commit(); }
    else this.createBoard(name);
    this._nf = false;
    this.shut('nm', () => this.setState({ modal: null, draft: '' }));
  }
  shut(k, fn) { if (this.state.closing) return; this.setState({ closing: k }); clearTimeout(this.ct); this.ct = setTimeout(() => { this.setState({ closing: null }); fn(); }, 320); }
  setAdd(p) { this.setState({ add: Object.assign({}, this.state.add, p) }); }
__RULES__
  renderVals() {
    const st = this.state, L = this.lib();
    const tn = st.tn;
    const ty = (full, off) => { const c = Math.max(0, tn - off); return { t: full.slice(0, c), c: tn >= off && c < full.length }; };
    const s = ty('Buscar…', 2);
    const cnt = {}; L.items.forEach((i) => { cnt[i.bid] = (cnt[i.bid] || 0) + 1; });
    const pl = (n, a, b) => n + ' ' + (n === 1 ? a : b);
    const BS = [['recent', 'Más recientes primero'], ['old', 'Más antiguos primero'], ['az', 'Nombre (A–Z)'], ['count', 'Con más piezas primero'], ['manual', 'Manual (arrastrá para mover)']];
    const IS = [['recent', 'Más recientes primero'], ['old', 'Más antiguos primero'], ['az', 'Título (A–Z)'], ['kind', 'Por tipo (imagen, enlace, texto)'], ['manual', 'Manual (arrastrá para mover)']];
    const cb = st.view === 'board' ? this.curBoard() : null;
    const inBoard = !!cb;
    const tones = ['#afafaf', '#a7a7a7', '#b7b7b7', '#a3a3a3'];
    const OL = '#575757';
    const clearDrag = () => { this.dragId = null; this.setState({ dragId: null, overId: null }); };
    const sb = this.sortedBoards();
    const boards = sb.map((b, i) => {
      const cv = this.coverOf(b);
      const n = cnt[b.id] || 0;
      return {
        name: b.name, meta: pl(n, 'pieza', 'piezas'), bg: tones[i % 4], d: Math.min(0.8, 0.05 + i * 0.08).toFixed(2) + 's',
        hasCover: !!cv && !cv.vid, vidCover: !!cv && cv.vid, noCover: !cv, cover: cv ? cv.src : '',
        op: st.dragId === b.id ? 0.35 : 1, ol: (st.dragId && st.dragId !== b.id && st.overId === b.id) ? OL : 'transparent',
        open: () => this.openBoard(b.id),
        more: (e) => { e.stopPropagation(); const a = this.anchor(e); this.setState({ menu: { kind: 'board', id: b.id, x: a.x, y: a.y, top: a.top, W: a.W, H: a.H }, sortOpen: false }); },
        ds: (e) => { this.dragId = b.id; try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', b.id); } catch (er) {} this.setState({ dragId: b.id, menu: null, sortOpen: false }); },
        dov: (e) => { if (!this.dragId) return; e.preventDefault(); if (this.state.overId !== b.id) this.setState({ overId: b.id }); },
        drop: (e) => { if (!this.dragId) return; e.preventDefault(); const nw = this.reorder(this.sortedBoards().map((x) => x.id), this.dragId, b.id); if (nw) { L.bsort = 'manual'; L.bman = nw; this.commit(); } clearDrag(); }
      };
    });
    let cards = [], gridH = 0, nItems = 0;
    if (cb) {
      const its = this.sortedItems(cb); nItems = its.length;
      const W = Math.max(560, st.cw || 1348);
      const PK = this.pack(its, W);
      PK.cards.forEach((r, ix) => {
        const it = r.it, z = r.z;
        const title = it.title || (it.kind === 'text' ? 'Texto' : 'Sin título');
        const ek = it.kind === 'link' ? this.embKind(it.url) : ''; const vs = ek === 'video' || ek === 'vertical';
        cards.push({
          x: r.x, y: r.y, w: r.w, h: r.h, d: Math.min(0.9, 0.05 + ix * 0.05).toFixed(2) + 's', an: it.id === st.newId ? 'tile-in2' : 'tile-in',
          title, hasTtl: it.kind === 'text' && !!it.title, isImg: it.kind === 'img', isVid: it.kind === 'video', isLink: it.kind === 'link', isText: it.kind === 'text',
          src: it.kind === 'img' ? this.thumbOf(it) : this.srcOf(it), ld: this.isVis(it) && !this.srcOf(it) ? 'card ld' : 'card', text: it.text || '', dom: this.dom(it.url) || 'enlace', vidSite: vs, embAudio: ek === 'audio', embPost: ek === 'post', embDark: ek !== 'post', embLbl: (ek === 'audio' ? 'Portada de la canción · ' : vs ? 'Video de ' : 'Vista previa de ') + (this.dom(it.url) || 'la página'),
          fade: z.clip ? 'linear-gradient(#000 70%,transparent)' : 'none',
          meta: [this.tagsOf(it), z.lab].filter(Boolean).join(' · '),
          op: st.dragId === it.id ? 0.35 : 1, ol: (st.dragId && st.dragId !== it.id && st.overId === it.id) ? OL : 'transparent',
          open: () => this.setState({ edId: it.id, menu: null, sortOpen: false }),
          more: (e) => { e.stopPropagation(); const a = this.anchor(e); this.setState({ menu: { kind: 'item', id: it.id, x: a.x, y: a.y, top: a.top, W: a.W, H: a.H }, sortOpen: false }); },
          ds: (e) => { this.dragId = it.id; try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', it.id); } catch (er) {} this.setState({ dragId: it.id, menu: null, sortOpen: false }); },
          dov: (e) => { if (!this.dragId) return; e.preventDefault(); if (this.state.overId !== it.id) this.setState({ overId: it.id }); },
          drop: (e) => { if (!this.dragId) return; e.preventDefault(); e.stopPropagation(); const nw = this.reorder(this.sortedItems(cb).map((x) => x.id), this.dragId, it.id); if (nw) { cb.man = nw; cb.sort = 'manual'; this.commit(); } clearDrag(); }
        });
      });
      gridH = PK.H;
    }
    // menú ⋯
    let menu = { style: '', items: [] };
    if (st.menu) {
      const m = st.menu; let its = [];
      if (m.kind === 'board') { const b = L.boards.find((x) => x.id === m.id); if (b) its = [['Abrir', () => this.openBoard(b.id)], ['Renombrar', () => this.setState({ menu: null, modal: { k: 'rename', id: b.id }, draft: b.name })], ['Elegir portada', () => this.setState({ menu: null, cov: b.id })], ['Eliminar tablero', () => this.setState({ menu: null, conf: { k: 'board', id: b.id } })]]; }
      if (m.kind === 'item') { const it = L.items.find((x) => x.id === m.id); if (it) its = [['Ver y editar', () => this.setState({ menu: null, edId: it.id })], ...(this.isVis(it) ? [['Usar como portada', () => { const b = L.boards.find((x) => x.id === it.bid); if (b) { b.cover = it.id; b.coverUp = false; } this.setState({ menu: null }); this.commit(); }]] : []), ['Mover al principio', () => { this.setState({ menu: null }); this.moveItem(it.id, 'first'); }], ['Mover al final', () => { this.setState({ menu: null }); this.moveItem(it.id, 'last'); }], ['Eliminar', () => this.setState({ menu: null, conf: { k: 'item', id: it.id } })]]; }
      const H = its.length * 38 + 12;
      const MW = m.W || 1440, MH = m.H || 900;
      const left = Math.max(16, Math.min(MW - 236, m.x - 220));
      const top = m.y + 6 + H > MH - 20 ? Math.max(16, m.top - 6 - H) : m.y + 6;
      menu = { style: 'left:' + left + 'px;top:' + top + 'px', items: its.map(([l, f]) => ({ l, act: f })) };
    }
    // orden
    const sortList = inBoard ? IS : BS;
    const curSort = inBoard ? (cb.sort || 'recent') : (L.bsort || 'recent');
    const sortOpts = sortList.map(([k, l]) => ({
      l, on: k === curSort ? 'true' : 'false', mark: k === curSort ? 1 : 0,
      pick: () => {
        if (inBoard) { if (k === 'manual' && cb.sort !== 'manual') cb.man = this.sortedItems(cb).map((x) => x.id); cb.sort = k; }
        else { if (k === 'manual' && L.bsort !== 'manual') L.bman = sb.map((x) => x.id); L.bsort = k; }
        this.setState({ sortOpen: false }); this.commit();
      }
    }));
    const sortLbl = (sortList.find((x) => x[0] === curSort) || sortList[0])[1];
    // nombre
    const M = st.modal;
    const nm = M ? { title: M.k === 'rename' ? 'Renombrar tablero' : 'Nuevo tablero', hint: M.k === 'rename' ? 'Elegí un nombre nuevo.' : 'Ponele un nombre. Después podés cambiarlo o reordenarlo.', btn: M.k === 'rename' ? 'Guardar' : 'Crear tablero', op: st.draft.trim() ? 1 : 0.4, dis: st.draft.trim() ? 'false' : 'true' } : {};
    // confirmar
    let conf = {};
    if (st.conf) {
      const C = st.conf;
      if (C.k === 'board') { const b = L.boards.find((x) => x.id === C.id); const n = cnt[C.id] || 0; conf = { title: '¿Eliminar «' + (b ? b.name : '') + '»?', text: n ? 'También se borran sus ' + pl(n, 'pieza', 'piezas') + '. No se puede deshacer.' : 'Está vacío. No se puede deshacer.' }; }
      else { const it = L.items.find((x) => x.id === C.id); conf = { title: '¿Eliminar «' + ((it && it.title) || 'esta pieza') + '»?', text: 'Se quita de ' + (it ? this.bname(it.bid) : 'su tablero') + '. No se puede deshacer.' }; }
      conf.no = () => this.shut('conf', () => this.setState({ conf: null }));
      conf.yes = () => { if (C.k === 'board') this.delBoard(C.id); else this.delItem(C.id); this.setState({ conf: null }); };
    }
    // agregar
    const A = st.add;
    let add = {};
    if (A) {
      const ok = A.k === 'img' ? !!A.img : A.k === 'link' ? /\S+\.\S+/.test(A.url.trim()) : !!A.text.trim();
      add = {
        tImg: A.k === 'img', tLink: A.k === 'link', tText: A.k === 'text',
        tabs: [['img', 'Imagen o video'], ['link', 'Enlace'], ['text', 'Texto']].map(([k, l]) => ({ l, on: A.k === k ? 'true' : 'false', bg: A.k === k ? '#fff' : '#a7a7a7', pick: () => this.setAdd({ k }) })),
        hasImg: !!A.img, noImg: !A.img, src: A.img ? A.img.url : '', isVid: !!A.img && A.img.kind === 'video', notVid: !(A.img && A.img.kind === 'video'),
        size: A.img ? (this.sizeOf(this.mediaItem(A.img), 6, 211, 16).lab) : '', from: A.from,
        onFrom: (e) => this.setAdd({ from: e.target.value }),
        auto: (A.k === 'img' ? (A.from.trim() ? this.siteTags(A.from.trim()) : []) : A.k === 'link' && /\S+\.\S+/.test(A.url.trim()) ? this.siteTags(A.url.trim()) : []).map((t) => ({ t })),
        hasAuto: (A.k === 'img' && !!A.from.trim()) || (A.k === 'link' && /\S+\.\S+/.test(A.url.trim())),
        title: A.title, url: A.url, text: A.text,
        onTitle: (e) => this.setAdd({ title: e.target.value }), onUrl: (e) => this.setAdd({ url: e.target.value }), onText: (e) => this.setAdd({ text: e.target.value }),
        key: (e) => { if (e.key === 'Enter') { e.preventDefault(); this.submitAdd(); } if (e.key === 'Escape') this.setState({ add: null }); },
        op: ok ? 1 : 0.4, dis: ok ? 'false' : 'true', submit: () => this.submitAdd(),
        dov: (e) => { if (this.hasFiles0(e)) e.preventDefault(); },
        drop: (e) => { if (!this.hasFiles0(e)) return; e.preventDefault(); e.stopPropagation(); const f = e.dataTransfer.files[0]; this.readMedia(f, (img) => this.setAdd({ k: 'img', img })); }
      };
    }
    // editar
    const E = st.edId ? L.items.find((x) => x.id === st.edId) : null;
    let pe = {};
    if (E) {
      const up = (k) => (e) => { E[k] = e.target.value; this.commit(); };
      pe = {
        isImg: E.kind === 'img', isVid: E.kind === 'video', isLink: E.kind === 'link', isText: E.kind === 'text',
        kind: E.kind === 'img' ? (E.gif ? 'GIF' : 'Imagen') : E.kind === 'video' ? 'Video' : E.kind === 'link' ? 'Enlace' : 'Texto', date: this.fdate(E.t),
        size: 'Tamaño en el tablero: ' + this.sizeOf(E, 6, 211, 16).lab,
        auto: (E.atags || []).map((t) => ({ t })), hasAuto: (E.atags || []).length > 0,
        src: this.srcOf(E), text: E.text || '', dom: this.dom(E.url), href: E.url || '#',
        title: E.title || '', note: E.note || '', url: E.url || '', tags: E.tags || '',
        onTitle: up('title'), onNote: up('note'), onUrl: (e) => { E.url = e.target.value; E.atags = E.url.trim() ? this.siteTags(E.url.trim()) : []; this.commit(); }, onTags: up('tags'), onText: up('text'),
        onBoard: (e) => { E.bid = e.target.value; this.commit(); },
        bopts: this.sortedBoards().map((b) => ({ v: b.id, l: b.name, sel: b.id === E.bid })),
        del: () => this.setState({ conf: { k: 'item', id: E.id } })
      };
    }
    let cov = {};
    const CB = st.cov ? L.boards.find((x) => x.id === st.cov) : null;
    if (CB) {
      const vis = this.sortedItems({ id: CB.id, sort: 'recent' }).filter((x) => this.isVis(x));
      cov = {
        name: CB.name, autoOn: (!CB.cover && !CB.coverUp) ? 'true' : 'false', autoOl: (!CB.cover && !CB.coverUp) ? '#fff' : 'transparent',
        auto: () => { CB.cover = null; CB.coverUp = false; this.mediaDel('cover:' + CB.id); this.commit(); },
        opts: vis.map((x) => ({ title: x.title || 'pieza', src: this.srcOf(x), isVid: x.kind === 'video', isImg: x.kind === 'img', on: CB.cover === x.id && !CB.coverUp ? 'true' : 'false', ol: CB.cover === x.id && !CB.coverUp ? '#fff' : 'transparent', pick: () => { CB.cover = x.id; CB.coverUp = false; this.commit(); } })),
        upload: () => { this.coverFor = CB.id; if (this.fileEl) this.fileEl.click(); },
        close: () => this.shut('cov', () => this.setState({ cov: null }))
      };
    }
    return {
      covOn: !!CB, cov, vref: this.vref(),
      rootRef: (el) => { this.root = el; }, scrRef: (el) => { this.scr = el; if (el && !el._ro) { el._ro = true; const f = () => { const w = el.clientWidth - 92; if (w > 0 && Math.abs(w - (this.state.cw || 0)) > 1) this.setState({ cw: w }); }; f(); try { new ResizeObserver(f).observe(el); } catch (e) {} } }, fileRef: (el) => { this.fileEl = el; },
      nameRef: (el) => { if (el && !this._nf) { this._nf = true; setTimeout(() => { try { el.focus(); el.select(); } catch (e) {} }, 40); } },
      urlRef: (el) => { if (el && !this._uf) { this._uf = true; setTimeout(() => { try { el.focus(); } catch (e) {} }, 40); } },
      vBoards: !cb, vBoard: inBoard,
      boards, hasBoards: boards.length > 0, noBoards: boards.length === 0,
      bMeta: boards.length ? pl(boards.length, 'tablero', 'tableros') + ' · ' + (BS.find((x) => x[0] === (L.bsort || 'recent')) || BS[0])[1] : '',
      cb: cb ? { name: cb.name, meta: pl(nItems, 'pieza', 'piezas') + ' · ' + sortLbl, more: (e) => { e.stopPropagation(); const a = this.anchor(e); this.setState({ menu: { kind: 'board', id: cb.id, x: a.x, y: a.y, top: a.top, W: a.W, H: a.H }, sortOpen: false }); } } : { name: '', meta: '' },
      cards, gridH, hasItems: nItems > 0, noItems: inBoard && nItems === 0,
      goBoards: () => this.goBoards(),
      dend: () => clearDrag(),
      onScr: () => { if (this.state.menu) this.setState({ menu: null }); },
      fdov: (e) => { if (this.dragId || !this.hasDrop(e)) return; e.preventDefault(); if (!this.state.fileOver) this.setState({ fileOver: true }); },
      fdlv: (e) => { if (this.state.fileOver && (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget))) this.setState({ fileOver: false }); },
      fdrop: (e) => {
        if (this.dragId || !this.hasDrop(e)) return; e.preventDefault(); this.setState({ fileOver: false });
        const fs = Array.prototype.slice.call(e.dataTransfer.files || []);
        if (fs.length) { fs.forEach((f) => this.readMedia(f, (m) => this.addItem(this.mediaItem(m)))); return; }
        let u = ''; try { u = (e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain') || '').split('\n')[0].trim(); } catch (er) {}
        if (/^https?:\/\//i.test(u)) this.addItem({ kind: 'link', url: u, title: this.dom(u), atags: this.siteTags(u) });
      },
      fileOver: !!st.fileOver,
      plusLbl: inBoard ? 'Agregar pieza' : 'Nuevo tablero',
      plusAct: () => { this._uf = false; if (inBoard) this.setState({ add: { k: 'img', img: null, url: '', title: '', text: '', from: '' }, menu: null, sortOpen: false }); else { this._nf = false; this.setState({ modal: { k: 'new' }, draft: '', menu: null, sortOpen: false }); } },
      sortAct: () => this.setState({ sortOpen: !this.state.sortOpen, menu: null }),
      sortRing: st.sortOpen ? '0 0 0 2px #575757,0 0 0 4px #fff' : 'none',
      sortOpen: !!st.sortOpen, closeSort: () => this.setState({ sortOpen: false }), sortOpts, sortWhat: inBoard ? 'Ordenar piezas' : 'Ordenar tableros',
      menuOn: !!st.menu && menu.items.length > 0, menu, closeMenu: () => this.setState({ menu: null }),
      naming: !!M, nm, draft: st.draft, onDraft: (e) => this.setState({ draft: e.target.value }),
      nameKey: (e) => { if (e.key === 'Enter') { e.preventDefault(); this.submitName(); } if (e.key === 'Escape') { this._nf = false; this.setState({ modal: null, draft: '' }); } },
      submitName: () => this.submitName(), cancelModal: () => { this._nf = false; this.shut('nm', () => this.setState({ modal: null, draft: '' })); },
      confOn: !!st.conf, conf,
      addOn: !!A && inBoard, add, cancelAdd: () => this.shut('add', () => this.setState({ add: null })),
      pickFile: () => { if (this.fileEl) this.fileEl.click(); },
      onFile: (e) => {
        const f = e.target.files && e.target.files[0]; e.target.value = '';
        const cf = this.coverFor; this.coverFor = null;
        this.readMedia(f, (m) => {
          if (cf) { const b = L.boards.find((x) => x.id === cf); if (b && m.kind === 'img') { this.mediaPut('cover:' + b.id, m.media); if (this._urls) delete this._urls['cover:' + b.id]; b.coverUp = true; b.cover = null; this.commit(); } return; }
          if (this.state.add) this.setAdd({ img: m }); else this.addItem(this.mediaItem(m));
        });
      },
      edOn: !!E, pe, edClose: () => this.shut('ed', () => this.setState({ edId: null })),
      xNm: st.closing === 'nm' ? 'out' : '', xConf: st.closing === 'conf' ? 'out' : '', xAdd: st.closing === 'add' ? 'out' : '', xEd: st.closing === 'ed' ? 'out' : '', xCov: st.closing === 'cov' ? 'out' : '',
      sPh: inBoard ? 'Buscar en ' + cb.name + '…' : 'Buscar en tableros…',
      s, sOn: st.sq !== 'off', sCls: st.sq === 'out' ? 'bz out' : 'bz',
      openS: () => { clearTimeout(this.t3); this.setState({ sq: 'in', menu: null, sortOpen: false }); },
      closeS: () => { if (this.state.sq !== 'in') return; this.setState({ sq: 'out' }); this.t3 = setTimeout(() => this.setState({ sq: 'off' }), 640); },
      ...this.libVals(),
      ...this.rulesVals()
    };
  }
}
'''
JS = JS.replace('__LIB__', LIBJS.strip('\n')).replace('__RULES__', rmeth.rstrip('\n'))
search2, _, _ = patch_search(search)
BODY = BODY.replace(search, search2)
html = head + EXTRA + '</style>\n</helmet>\n' + BODY + script_open.replace('"height":806', '"height":900') + JS + '</script>\n</body>\n</html>\n'
html = patch_rules(html)
assert html.count('<sc-if') == html.count('</sc-if>'), (html.count('<sc-if'), html.count('</sc-if>'))
assert html.count('<sc-for') == html.count('</sc-for>')
open(OUT + 'Archivo.dc.html', 'w').write(html)
tab = html.replace("this.START = 'boards';", "this.START = 'board';").replace('<title>Archivero - Archivo</title>', '<title>Archivero - Vista de tablero</title>')
open(OUT + 'Tablero.dc.html', 'w').write(tab)
print('archivo30 ok', len(html))
