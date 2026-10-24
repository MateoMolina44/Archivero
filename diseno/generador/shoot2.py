import sys,shutil
from playwright.sync_api import sync_playwright
OUT='/tmp/w/out'; T='/tmp/w/test'
def go(file,out,steps=None,w=1440,h=900,wait=900):
    shutil.rmtree(T,ignore_errors=True); shutil.copytree(OUT,T); shutil.copy('/tmp/w/shim.js',T+'/support.js')
    with sync_playwright() as p:
        b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--no-sandbox'])
        pg=b.new_page(viewport={'width':w,'height':h})
        errs=[]
        pg.on('console',lambda m: errs.append(m.text) if m.type=='error' and 'ERR_TUNNEL' not in m.text else None)
        pg.on('pageerror',lambda e: errs.append(str(e)))
        pg.goto('file://'+T+'/'+file); pg.wait_for_timeout(wait)
        if steps: steps(pg)
        pg.screenshot(path=out); print(file,errs[:6]); b.close()
