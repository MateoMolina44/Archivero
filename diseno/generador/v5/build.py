import re,os,shutil,glob,sys
exec(open('/tmp/w/v5/pill.py').read())
BASE='/tmp/w/base/'; OUT='/tmp/w/out/'
shutil.rmtree(OUT,ignore_errors=True); shutil.copytree(BASE,OUT)
def rd(f): return open(OUT+f).read()
def wr(f,s): open(OUT+f,'w').write(s)
INTERACTIVE=['Main1.dc.html','Main.dc.html','Archivo.dc.html','Tablero.dc.html','Anotador.dc.html']
SETTINGS=True
pass
# --- pill + css + search fix on every page that has them
conf={'Main1.dc.html':('home','v1'),'Main.dc.html':('home','v2'),'Archivo.dc.html':('arch',None),'Tablero.dc.html':('arch',None),'Seleccion.dc.html':('arch',None),
      'Buscador.dc.html':('home','v2'),'BuscadorVista1.dc.html':('home','v1'),'BuscadorArchivo.dc.html':('arch',None),'BuscadorTablero.dc.html':('arch',None),'BuscadorAnotador.dc.html':('note',None),'Anotador.dc.html':('note',None)}
for f,(sec,view) in conf.items():
    s=rd(f)
    assert SEC_BLOCK.search(s),f
    tools=None
    if f=='Anotador.dc.html': tools=NOTE_TOOLS
    s=SEC_BLOCK.sub(lambda m:pill5(sec,view,tools=tools,gear_on=(f in INTERACTIVE and SETTINGS)),s,1)
    assert OLD_CSS.search(s),('css',f)
    s=OLD_CSS.sub(lambda m:PILLCSS,s,1)
    s=s.replace('.sb:hover,.sb:focus-visible{width:380px;background:#626262!important}','.sb:hover,.sb:focus-visible{background:#626262!important}')
    wr(f,s)
# --- Main1: link only after typing ends
s=rd('Main1.dc.html')
a='<a class="nv" href="Seleccion.dc.html" style="pointer-events:{{p.linkPE}}">Ver ficha completa</a>'
assert a in s
s=s.replace(a,'<a class="nv" href="Seleccion.dc.html" tabindex="{{p.linkTab}}" style="pointer-events:{{p.linkPE}};opacity:{{p.linkOp}};transition:opacity .8s cubic-bezier(.19,1,.22,1)">Ver ficha completa</a>')
b="        linkPE: o ? 'auto' : 'none',"
assert b in s
s=s.replace(b,"        linkPE: (o && m >= totalChars) ? 'auto' : 'none', linkOp: (o && m >= totalChars) ? 1 : 0, linkTab: (o && m >= totalChars) ? '0' : '-1',")
wr('Main1.dc.html',s)
# --- Botones (reference board)
cells=[('Principal — vista 2 activa','home','v2'),('Archivo','arch',None),('Anotador','note',None)]
rows=''
for i,(t,sec,view) in enumerate(cells):
    for ext in (False,True):
        pass
def one(sec,view,show):
    h=pill5(sec,view,show=show)
    return h.replace('<div class="sec','<div style="position:absolute;left:50%;top:0;transform:translateX(-50%);height:44px" class="sec',1) if False else h
rows=''
y=70
for t,sec,view in cells:
    for show,lab in ((False,'Colapsado'),(True,'Al pasar el mouse')):
        h=pill5(sec,view,show=show).replace('class="sec','style="position:absolute;left:%dpx;top:%dpx;transform:none;bottom:auto" class="sec'%(300 if not show else 940,y),1)
        rows+=h
    rows+=f'<div style="position:absolute;left:40px;top:{y+13}px;font-size:13px;font-weight:600;color:#111">{t}</div>'
    y+=110
head=rd('Botones.dc.html').split('<style>')[0]
bot=head+'<style>\nbody{margin:0}\na{text-decoration:none;color:inherit}\n'+PILLCSS+'.sec.show .sec-l,.sec.show .sec-r{transition:none}\n</style>\n</helmet>\n'+f'''<div style="position:relative;width:1440px;height:480px;background:#d9d9d9;overflow:hidden;font-family:'Inter',system-ui,sans-serif;color:#111">
  <div style="position:absolute;left:40px;top:22px;font-size:15px;font-weight:700">Botón de sección</div>
  <div style="position:absolute;left:300px;top:42px;font-size:12px;color:#575757">Colapsado (siempre visible)</div>
  <div style="position:absolute;left:940px;top:42px;font-size:12px;color:#575757">Extendido al pasar el mouse</div>
  {rows}
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":1440,"height":480}}}}'>
class Component extends DCLogic {{
  renderVals() {{ return {{}}; }}
}}
</script>
</body>
</html>
'''
wr('Botones.dc.html',bot)
print('built')
