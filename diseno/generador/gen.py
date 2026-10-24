import re,os
D='/tmp/claude-0/-home-claude/bea4980c-184e-55bc-8b5d-a22bc596f210/scratchpad/archivero-design/project/'
def svg(p,fill=False):
    return f'<svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="#111" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{p}</svg>'
IC={
 'v1':'<rect x="2" y="2" width="12" height="7" rx="1.2"/><rect x="2" y="11" width="12" height="3" rx="1.2"/>',
 'v2':'<rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/>',
 'home':'<rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="12" height="5" rx="1"/>',
 'arch':'<rect x="2" y="2.5" width="12" height="4.5" rx="1.2"/><rect x="2" y="9" width="12" height="4.5" rx="1.2"/>',
 'note':'<path d="M3 13l1-3.5L11 2.5l2.5 2.5L6.5 12z"/>',
 'gear':'<circle cx="8" cy="8" r="2.2"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4"/>',
 'plus':'<path d="M8 3v10M3 8h10"/>',
 'sort':'<path d="M2 4h12M4 8h8M6 12h4"/>',
 'text':'<path d="M3 4V3h10v1M8 3v10M6 13h4"/>',
 'brush':'<path d="M3 13c2 0 3-1 3-2.5L12 3l1 1-6.5 6C6 12 5 13 3 13z"/>',
 'erase':'<path d="M3 10l5-6 5 4-4 5H5z M7 13h7"/>',
 'shot':'<path d="M2 5V3h3M11 3h3v2M14 11v2h-3M5 13H2v-2"/><rect x="5" y="6" width="6" height="4" rx=".8"/>',
 'book':'<path d="M2 3h5v10H2zM9 3h5v10H9z"/>',
 'bold':'<path d="M5 3h4a2 2 0 010 4H5zM5 7h5a2 2 0 010 4H5z"/>',
}
PAGE={'home':'Main.dc.html','arch':'Archivo.dc.html','note':'Anotador.dc.html'}
def circ(k,link=None,active=False,label=''):
    ring='box-shadow:0 0 0 2px #fff;' if active else ''
    inner=f'<span title="{label}" style="width:30px;height:30px;border-radius:50%;background:#d9d9d9;{ring}display:flex;align-items:center;justify-content:center;flex:none">{svg(IC[k])}</span>'
    return f'<a href="{link}" aria-label="{label}" style="display:flex">{inner}</a>' if link else f'<span aria-label="{label}" style="display:flex">{inner}</span>'
SEP='<span style="width:5px;height:24px;border-left:1px solid #d9d9d9;border-right:1px solid #d9d9d9;box-sizing:border-box;flex:none;opacity:.8"></span>'
def pill(sec,viewActive='v2'):
    if sec=='home':
        tools=[circ('v1','Main1.dc.html',viewActive=='v1','Vista 1: pantalla completa'),circ('v2','Main.dc.html',viewActive=='v2','Vista 2: mosaico')]
        others=[('arch','Archivo'),('note','Anotador')]; cur='home'; curt=viewActive
    elif sec=='arch':
        tools=[circ('plus',None,False,'Nuevo tablero'),circ('sort',None,False,'Ordenar')]
        others=[('home','Principal'),('note','Anotador')]; cur='arch'; curt='plus'
    else:
        tools=[circ(k,None,False,l) for k,l in [('text','Texto'),('bold','Formato'),('brush','Dibujar'),('erase','Borrador'),('shot','Captura de pantalla'),('book','Libros')]]
        others=[('home','Principal'),('arch','Archivo')]; cur='note'; curt='brush'
    ox=''.join(circ(k,PAGE[k],False,l) for k,l in others)
    ext=f'<div class="sec-x">{"".join(tools)}{SEP}{ox}{SEP}{circ("gear",None,False,"Reglas y ajustes")}</div>'
    col=f'<div class="sec-c">{circ(cur,None,False,"Sección actual")}{SEP}{circ(curt,None,False,"Herramienta actual")}</div>'
    return f'<!-- Botón de sección: colapsado, se extiende al hover -->\n  <div class="sec">{col}{ext}</div>\n'
CSS='''.sec{position:absolute;left:50%;bottom:20px;transform:translateX(-50%);z-index:9;height:44px}
.sec-c,.sec-x{background:#575757;border-radius:30px;height:44px;display:flex;align-items:center;gap:10px;padding:0 7px;box-sizing:border-box}
.sec-x{display:none;position:absolute;left:50%;bottom:0;transform:translateX(-50%);gap:8px;white-space:nowrap}
.sec:hover .sec-x{display:flex}.sec:hover .sec-c{visibility:hidden}
'''
def patch(fn,sec,va='v2'):
    s=open(D+fn).read()
    s=re.sub(r'  <!-- Sección.*?(?=</div>\n</x-dc>)',lambda m:'  '+pill(sec,va),s,flags=re.S)
    if '.sec{' not in s: s=s.replace('</style>',CSS+'</style>',1)
    open(D+fn,'w').write(s)
patch('Main.dc.html','home','v2'); patch('Buscador.dc.html','home','v2')
patch('Archivo.dc.html','arch'); patch('Tablero.dc.html','arch'); patch('Seleccion.dc.html','arch')
# Main1 (Vista 1)
m=open(D+'Main.dc.html').read()
head=m.split('<div style="position:relative')[0]
sp=m[m.index('<script type="text/x-dc"'):]
sp=re.sub(r'class Component.*?</script>','class Component extends DCLogic {\n  renderVals() { return {}; }\n}\n</script>',sp,flags=re.S)
body=f'''<div style="position:relative;width:1440px;height:900px;background:#afafaf;overflow:hidden;font-family:'Inter',system-ui,sans-serif;color:#fff">
  <!-- Vista 1: una pieza a pantalla completa -->
  <a href="Seleccion.dc.html" aria-label="Abrir pieza" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px">
    <div style="font-size:64px;font-weight:700;line-height:1">Nombre</div>
    <div style="font-size:16px">#tag1 #tag2 #tag3</div>
  </a>
  <a href="Buscador.dc.html" aria-label="Abrir buscador" style="position:absolute;left:560px;top:20px;width:320px;height:40px;background:#575757;border-radius:30px;display:flex;align-items:center;gap:10px;padding:0 16px;box-sizing:border-box;font-size:14px;z-index:9">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>
    <span style="color:#ececec">Buscar…</span>
  </a>
  {pill('home','v1')}</div>
</x-dc>
'''
head=head.replace('Archivo - Principal','Archivero - Principal vista 1').replace('Archivero - Principal','Archivero - Principal vista 1') if False else head.replace('<title>Archivero - Principal</title>','<title>Archivero - Principal 1</title>')
open(D+'Main1.dc.html','w').write(head+body+sp)
# Botones reference
bt=head.replace('Principal 1','Botones de sección')
rows=''
for i,(s,l) in enumerate([('home','Principal'),('arch','Archivo'),('note','Anotador')]):
    p=pill(s,'v2').replace('class="sec"','class="sec" style="position:static;transform:none;display:inline-block;height:44px"').replace('<div class="sec-x">','<div class="sec-x" style="display:flex;position:static;transform:none;margin-top:12px;">').replace('<div class="sec-c">','<div class="sec-c" style="display:flex">')
    rows+=f'<div style="padding:30px 40px;color:#111"><div style="font-size:13px;font-weight:600;margin-bottom:10px">{l} — colapsado (reposo) y extendido (al hover)</div>{p}</div>'
bb=f'''<div style="position:relative;width:1440px;height:560px;background:#d9d9d9;overflow:hidden;font-family:'Inter',system-ui,sans-serif">{rows}</div>
</x-dc>
'''
bt=bt.replace('.sec:hover .sec-x{display:flex}.sec:hover .sec-c{visibility:hidden}','')
sp2=sp.replace('"height":900','"height":560')
open(D+'Botones.dc.html','w').write(bt+bb+sp2)
