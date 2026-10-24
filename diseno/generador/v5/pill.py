import re
exec(open('/tmp/w/gen.py').read().split("PAGE=")[0])   # D, svg, IC
CE='cubic-bezier(.4,0,.2,1)'
IC['pencil']=IC['note']
IC['image']='<rect x="2" y="3" width="12" height="10" rx="1.4"/><circle cx="5.8" cy="6.6" r="1.1"/><path d="M2.6 12l3.6-3.4 2.8 2.6 1.9-1.8 2.5 2.6"/>'
RING='box-shadow:0 0 0 2px #575757,0 0 0 4px #fff;'
def circ5(k,label,href=None,onclick=None,ring=False,ringhole=None,cur=False,hole_class=None):
    st='width:30px;height:30px;border-radius:50%;background:'+('#fff' if cur else '#d9d9d9')+';display:flex;align-items:center;justify-content:center;flex:none;'
    if ring or cur: st+=RING
    if ringhole: st+='box-shadow:{{%s}};'%ringhole
    inner=f'<span title="{label}" style="{st}">{svg(IC[k])}</span>'
    if cur: return f'<span aria-label="{label} (sección actual)" aria-current="page" style="display:flex">{inner}</span>'
    if href: return f'<a href="{href}" aria-label="{label}" style="display:flex">{inner}</a>'
    if onclick: return f'<button onClick="{{{{{onclick}}}}}" aria-label="{label}" style="display:flex">{inner}</button>'
    return f'<span aria-label="{label}" style="display:flex">{inner}</span>'
SEP='<span style="width:5px;height:24px;border-left:1px solid #d9d9d9;border-right:1px solid #d9d9d9;box-sizing:border-box;flex:none;opacity:.8"></span>'
PAGES={'home':('Main.dc.html','Principal'),'arch':('Archivo.dc.html','Archivo'),'note':('Anotador.dc.html','Anotador')}
def pill5(sec,view='v2',tools=None,gear_on=True,show=False):
    """3 secciones siempre visibles; herramientas (izq.) y ajustes (der.) aparecen al hover"""
    c=''
    for k in ('home','arch','note'):
        href,lab=PAGES[k]
        c+=circ5({'home':'home','arch':'arch','note':'note'}[k],lab,href=href,cur=(k==sec))
    if tools is None:
        if sec=='home': tools=circ5('v1','Vista 1: pantalla completa',href='Main1.dc.html',ring=(view=='v1'))+circ5('v2','Vista 2: mosaico',href='Main.dc.html',ring=(view=='v2'))
        elif sec=='arch': tools=circ5('plus','Nuevo tablero')+circ5('sort','Ordenar')
        else: tools=''.join(circ5(k,l) for k,l in [('text','Texto'),('bold','Formato'),('brush','Dibujar'),('erase','Borrador'),('shot','Captura de pantalla'),('image','Subir imagen')])
    gear=circ5('gear','Reglas y ajustes',onclick='openR') if gear_on else circ5('gear','Reglas y ajustes')
    cls='sec show' if show else 'sec'
    return (f'<!-- Botón de sección: las 3 secciones siempre visibles (la actual resaltada); al hover aparecen herramientas y ajustes -->\n'
            f'  <div class="{cls}"><div class="sec-l"><div class="sec-x">{tools}</div></div><div class="sec-c">{c}</div><div class="sec-r"><div class="sec-x">{gear}</div></div></div>\n')
PILLCSS=f'''.sec{{position:absolute;left:50%;bottom:20px;transform:translateX(-50%);z-index:9;height:44px}}
.sec-c,.sec-x{{background:#575757;border-radius:30px;height:44px;display:flex;align-items:center;box-sizing:border-box;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.08),inset 0 1px 1.5px rgba(255,255,255,.12)}}
.sec-c{{gap:12px;padding:0 12px}}
.sec-x{{gap:8px;padding:0 7px;white-space:nowrap}}
.sec-l,.sec-r{{position:absolute;bottom:0;height:44px;opacity:0;visibility:hidden;pointer-events:none;filter:blur(4px);transition:opacity .25s {CE},transform .45s {CE},filter .35s {CE},visibility 0s .45s}}
.sec-l{{right:100%;padding-right:8px;transform:translateX(18px) scale(.85);transform-origin:right center}}
.sec-r{{left:100%;padding-left:8px;transform:translateX(-18px) scale(.85);transform-origin:left center}}
.sec:hover .sec-l,.sec:hover .sec-r,.sec:focus-within .sec-l,.sec:focus-within .sec-r,.sec.show .sec-l,.sec.show .sec-r{{opacity:1;visibility:visible;pointer-events:auto;transform:none;filter:none;transition-delay:0s}}
.sec button{{border:0;padding:0;background:none;font:inherit;cursor:pointer}}
.sec a>span,.sec button>span{{transition:transform .15s {CE},background-color .15s {CE}}}
.sec a:hover>span,.sec button:hover>span{{background:#fff!important;transform:scale(1.08)}}
.sec a:active>span,.sec button:active>span{{transform:scale(.95)}}
.sec a:focus-visible,.sec button:focus-visible{{outline:2px solid #fff;outline-offset:2px;border-radius:50%}}
@media (prefers-reduced-motion:reduce){{.sec-l,.sec-r,.sec a>span,.sec button>span{{transition-duration:.01ms!important}}}}
'''
SEC_BLOCK=re.compile(r'<!-- Botón de sección[^\n]*\n\s*<div class="sec">[^\n]*\n')
OLD_CSS=re.compile(r'\.sec\{position:absolute.*?\.sec-x a:focus-visible\{[^\n]*\n',re.S)
NOTE_TOOLS=circ5('plus','Nueva nota',onclick='newBook')+circ5('sort','Ordenar notas',onclick='nSortAct',ringhole='nSortRing')+SEP+''.join(circ5(k,l,onclick=h,ringhole=r) for k,l,h,r in [('text','Texto','tText','rText'),('bold','Formato','tFmt','rFmt'),('brush','Dibujar','tDraw','rDraw'),('erase','Borrador','tErase','rErase'),('shot','Captura de pantalla','tShot','rShot'),('image','Subir imagen','tImg','rImg')])
