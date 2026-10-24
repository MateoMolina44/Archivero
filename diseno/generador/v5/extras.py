import json
s=open('/tmp/w/out/Archivo.dc.html').read()
s=s.replace("rq: 'off'","rq: 'in'",1).replace('<title>Archivero - Archivo</title>','<title>Archivero - Reglas y ajustes</title>')
open('/tmp/w/out/Ajustes.dc.html','w').write(s)
c=json.load(open('/tmp/w/out/canvas.json'))
c['boards']['Ajustes.dc.html']={"x":1520,"y":4080,"w":1440,"h":900,"title":"Reglas y ajustes (se abre con el engranaje)","is_interactive":True}
c['boards']['Anotador.dc.html']['title']='Anotador (estilo journal: grilla, carrusel y reverso)'
if 'Ajustes.dc.html' not in c['order']: c['order'].append('Ajustes.dc.html')
json.dump(c,open('/tmp/w/out/canvas.json','w'),ensure_ascii=False,indent=2)
