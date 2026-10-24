import re
exec(open('/tmp/w/v5/lib30.py').read())
OUT = '/tmp/w/out/'
FILES = ['Main.dc.html', 'Main1.dc.html', 'Archivo.dc.html', 'Tablero.dc.html', 'Ajustes.dc.html', 'Anotador.dc.html', 'Seleccion.dc.html',
         'Buscador.dc.html', 'BuscadorVista1.dc.html', 'BuscadorArchivo.dc.html', 'BuscadorTablero.dc.html', 'Botones.dc.html']
STAGE = {'Anotador.dc.html', 'Seleccion.dc.html'}
FONTS = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">'
CSS = r'''
:root{--bg:#d9d9d9;--t1:#afafaf;--t2:#a7a7a7;--t3:#b7b7b7;--t4:#a3a3a3;--pill:#575757;--pillh:#626262;--chip:#d9d9d9;--muted:#575757;--field:#464646;--sw:#838383;--velo:rgba(217,217,217,.55);--ink:#111;--f1:'Inter',system-ui,sans-serif;--f2:'Inter',system-ui,sans-serif}
h1,h2,b,strong,[style*="font-weight:700"],.tt{font-family:var(--f1)}
button,input,textarea,select{font-family:inherit}
.sec-c,.sec-x{line-height:0}
.sec-c>*,.sec-x>*{display:flex;align-items:center;justify-content:center;flex:none}
.sec [data-tip]{position:relative}
.sec [data-tip]::after{content:attr(data-tip);position:absolute;left:50%;bottom:calc(100% + 17px);transform:translate(-50%,4px);background:var(--pill);color:#fff;font:600 12px/1 var(--f2);padding:7px 10px;border-radius:8px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s cubic-bezier(.4,0,.2,1),transform .15s cubic-bezier(.4,0,.2,1);box-shadow:0 3px 12px rgba(0,0,0,.15)}
.sec a:hover [data-tip]::after,.sec button:hover [data-tip]::after,.sec a:focus-visible [data-tip]::after,.sec button:focus-visible [data-tip]::after,.sec [aria-current]:hover [data-tip]::after{opacity:1;transform:translate(-50%,0)}
@keyframes x-in{0%{opacity:0;transform:scale(.4) rotate(-90deg)}100%{opacity:1;transform:none}}
@keyframes x-out{0%{opacity:1;transform:none}100%{opacity:0;transform:scale(.4) rotate(90deg)}}
.bz .x{animation:x-in .45s cubic-bezier(.19,1,.22,1) .18s backwards}
.bz.out .x{animation:x-out .28s cubic-bezier(.4,0,.2,1) both!important}
@keyframes scr-in{0%{opacity:0}100%{opacity:1}}
[data-scr]:not([data-in="0"])>:not(.sec):not(.sb):not(.bz):not(.rz):not(.mdl):not(.mn){animation:scr-in .5s cubic-bezier(.4,0,.2,1) backwards}
@media (prefers-reduced-motion:reduce){.bz .x,.bz.out .x{animation:none!important}.sec [data-tip]::after{transition:none}[data-scr]>*{animation:none!important}}
'''

APAR = '''          <!-- Apariencia -->
          <sc-if value="{{rt.apariencia}}" hint-placeholder-val="{{false}}">
          <div style="flex:1;padding:20px 28px;overflow:auto">
            <div style="font-size:16px;font-weight:700">Apariencia</div>
            <div style="font-size:12px;line-height:1.5;opacity:.85;margin:6px 0 16px">Se aplica a todas las pantallas de la librería.</div>
            <div style="font-size:12px;font-weight:600;margin-bottom:8px">Modo</div>
            <div style="display:flex;gap:8px;margin-bottom:20px"><sc-for list="{{ap.modes}}" as="o" hint-placeholder-count="2"><button class="rz-b s" onClick="{{o.pick}}" aria-pressed="{{o.on}}" style="height:32px;padding:0 16px;background:{{o.bg}};color:#111">{{o.l}}</button></sc-for></div>
            <div style="font-size:12px;font-weight:600;margin-bottom:8px">Paleta</div>
            <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-bottom:20px;max-width:660px">
              <sc-for list="{{ap.pals}}" as="o" hint-placeholder-count="12"><button class="rz-r" onClick="{{o.pick}}" aria-pressed="{{o.on}}" style="border-color:{{o.bd}};padding:8px 10px;gap:8px"><span style="display:flex;flex:none" aria-hidden="true"><span style="width:14px;height:22px;border-radius:4px 0 0 4px;background:{{o.c1}}"></span><span style="width:14px;height:22px;background:{{o.c2}}"></span><span style="width:14px;height:22px;border-radius:0 4px 4px 0;background:{{o.c3}}"></span></span><span style="font-size:13px;font-weight:600">{{o.l}}</span></button></sc-for>
            </div>
            <div style="font-size:12px;font-weight:600;margin-bottom:8px">Tipografía principal (títulos)</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px"><sc-for list="{{ap.f1}}" as="o" hint-placeholder-count="5"><button class="rz-r" onClick="{{o.pick}}" aria-pressed="{{o.on}}" style="width:auto;border-color:{{o.bd}};padding:8px 14px"><span style="font-size:18px;font-weight:700;font-family:{{o.ff}}">Aa</span><span style="font-size:13px;font-family:{{o.ff}}">{{o.l}}</span></button></sc-for></div>
            <div style="font-size:12px;font-weight:600;margin-bottom:8px">Tipografía secundaria (texto)</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px"><sc-for list="{{ap.f2}}" as="o" hint-placeholder-count="5"><button class="rz-r" onClick="{{o.pick}}" aria-pressed="{{o.on}}" style="width:auto;border-color:{{o.bd}};padding:8px 14px"><span style="font-size:18px;font-family:{{o.ff}}">Aa</span><span style="font-size:13px;font-family:{{o.ff}}">{{o.l}}</span></button></sc-for></div>
            <div style="font-size:12px;font-weight:600;margin-bottom:8px">Pantalla completa: imágenes menores a 1920×1080</div>
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-width:660px"><sc-for list="{{ap.fits}}" as="o" hint-placeholder-count="4"><button class="rz-r" onClick="{{o.pick}}" aria-pressed="{{o.on}}" style="border-color:{{o.bd}};flex-direction:column;align-items:flex-start;gap:3px"><span style="font-size:13px;font-weight:600">{{o.l}}</span><span style="font-size:11px;opacity:.85;line-height:1.4">{{o.d}}</span></button></sc-for></div>
          </div>
          </sc-if>
'''
NUBE = '''          <!-- Nube y copia -->
          <sc-if value="{{rt.copia}}" hint-placeholder-val="{{false}}">
          <div style="flex:1;padding:20px 28px;overflow:auto">
            <div style="font-size:16px;font-weight:700">Nube y copia local</div>
            <div style="font-size:12px;line-height:1.5;opacity:.85;margin:6px 0 16px;max-width:620px">Tu librería se guarda en la nube para abrirla desde cualquier computadora. Además podés bajar una copia a este equipo y restaurarla cuando quieras.</div>
            <div class="rz-r" style="cursor:default;max-width:620px">
              <span style="flex:1;min-width:0"><span style="display:block;font-size:14px;font-weight:600">Sincronizar en la nube</span><span style="display:block;font-size:12px;opacity:.85;margin-top:2px">{{rCloud.status}}</span></span>
              <button class="rz-b o s" onClick="{{rCloud.sync}}" style="height:30px">Sincronizar ahora</button>
              <button class="rz-sw" role="switch" aria-checked="{{rCloud.on}}" aria-label="Sincronizar en la nube" onClick="{{rCloud.toggle}}" style="background:{{rCloud.swBg}};--l:{{rCloud.swL}}"></button>
            </div>
            <div style="font-size:12px;opacity:.75;margin:8px 0 22px;max-width:620px">Maqueta: la cuenta en la nube se conecta en la app real. Ahora tenés {{rCloud.count}}.</div>
            <div style="font-size:14px;font-weight:700;margin-bottom:8px">Copia local</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="rz-b" onClick="{{rExport}}">Exportar copia (.json)</button><button class="rz-b o" onClick="{{rImport}}">Importar copia</button></div>
            <a ref="{{rDlRef}}" download="archivero-copia.json" href="#" tabindex="-1" aria-hidden="true" style="display:none">copia</a>
            <input type="file" accept="application/json,.json" ref="{{rImpRef}}" onChange="{{rImpFile}}" style="display:none" tabindex="-1" aria-hidden="true">
            <div style="font-size:12px;min-height:18px;margin-top:12px;opacity:.9">{{rMsg}}</div>
            <div style="margin-top:16px;max-width:620px;display:flex;flex-direction:column;gap:8px">
              __PREFS__
            </div>
            <div style="margin-top:22px;font-size:12px;opacity:.7">Atajo para guardar: Alt+Shift+S · clic derecho sobre imágenes y texto</div>
          </div>
          </sc-if>
'''
RJS = r'''      rCloud: (() => { const L = this.lib(); const c = L.cloud || (L.cloud = { on: true, last: Date.now() }); return {
        on: c.on ? 'true' : 'false', swBg: c.on ? 'var(--chip)' : 'var(--sw)', swL: c.on ? '19px' : '3px',
        status: c.on ? 'Activada · última sincronización ' + this.fdate(c.last) : 'Desactivada: solo se guarda en este navegador',
        count: L.items.length + (L.items.length === 1 ? ' pieza' : ' piezas') + ' en ' + L.boards.length + (L.boards.length === 1 ? ' tablero' : ' tableros'),
        toggle: () => { c.on = !c.on; if (c.on) c.last = Date.now(); this.commit(); },
        sync: () => { c.on = true; c.last = Date.now(); this.commit(); this.setState({ rmsg: 'Listo: todo sincronizado (maqueta).' }); } }; })(),
      rDlRef: (el) => { this.rDl = el; }, rImpRef: (el) => { this.rImp = el; },
      rExport: () => {
        const L = this.lib(); const out = { app: 'archivero', v: 1, exported: Date.now(), lib: L, media: {} };
        const finish = (m) => {
          const keys = Object.keys(m);
          const conv = (v) => new Promise((res) => { if (typeof v === 'string') return res(v); try { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = () => res(''); fr.readAsDataURL(v); } catch (e) { res(''); } });
          Promise.all(keys.map((k) => conv(m[k]).then((d) => { if (d) out.media[k] = d; }))).then(() => {
            try { const url = URL.createObjectURL(new Blob([JSON.stringify(out)], { type: 'application/json' })); if (this.rDl) { this.rDl.href = url; this.rDl.click(); } this.setState({ rmsg: 'Copia descargada: ' + L.items.length + ' piezas y ' + L.boards.length + ' tableros.' }); }
            catch (e) { this.setState({ rmsg: 'No se pudo descargar la copia desde acá.' }); }
          });
        };
        this.mediaDB((db) => {
          const m = Object.assign({}, this._media || {});
          if (!db) return finish(m);
          try { const rq = db.transaction('media', 'readonly').objectStore('media').openCursor(); rq.onsuccess = () => { const c = rq.result; if (c) { m[c.key] = c.value; c.continue(); } else finish(m); }; rq.onerror = () => finish(m); } catch (e) { finish(m); }
        });
      },
      rImport: () => { if (this.rImp) this.rImp.click(); },
      rImpFile: (e) => {
        const f = e.target.files && e.target.files[0]; e.target.value = ''; if (!f) return;
        const fr = new FileReader();
        fr.onload = () => {
          try {
            const d = JSON.parse(fr.result);
            if (!d || !d.lib || !Array.isArray(d.lib.boards) || !Array.isArray(d.lib.items)) throw new Error('x');
            this._lib = d.lib; Object.keys(d.media || {}).forEach((k) => this.mediaPut(k, d.media[k])); this._urls = {};
            this.commit(); this.setState({ rmsg: 'Copia restaurada: ' + d.lib.items.length + ' piezas y ' + d.lib.boards.length + ' tableros.' });
          } catch (er) { this.setState({ rmsg: 'Ese archivo no es una copia de Archivero.' }); }
        };
        fr.readAsText(f);
      },
      ap: (() => { const u = this.ui(); const F = this.fonts(); return {
        modes: [['light', 'Claro'], ['dark', 'Oscuro']].map(([k, l]) => ({ l, on: u.mode === k ? 'true' : 'false', bg: u.mode === k ? '#fff' : 'var(--chip)', pick: () => this.uiSet({ mode: k }) })),
        pals: this.pals().map((p) => { const T = this.palTones(p[2], p[3], u.mode === 'dark'); return { l: p[1], c1: T.bg, c2: T.t1, c3: T.pill, on: u.pal === p[0] ? 'true' : 'false', bd: u.pal === p[0] ? '#fff' : 'transparent', pick: () => this.uiSet({ pal: p[0] }) }; }),
        f1: F.map((f) => ({ l: f[0], ff: f[1], on: u.f1 === f[0] ? 'true' : 'false', bd: u.f1 === f[0] ? '#fff' : 'transparent', pick: () => this.uiSet({ f1: f[0] }) })),
        f2: F.map((f) => ({ l: f[0], ff: f[1], on: u.f2 === f[0] ? 'true' : 'false', bd: u.f2 === f[0] ? '#fff' : 'transparent', pick: () => this.uiSet({ f2: f[0] }) })),
        fits: [['blur', 'Fondo desenfocado', 'La imagen entera, sobre una versión desenfocada de sí misma.'], ['color', 'Color de fondo', 'La imagen entera, sobre su color promedio.'], ['frame', 'Marco a tamaño real', 'Sin agrandarla, con un paspartú blanco, como en una galería.'], ['cover', 'Ampliar y recortar', 'Llena la pantalla aunque se pixele y se recorte.']].map(([k, l, d]) => ({ l, d, on: (u.fit || 'blur') === k ? 'true' : 'false', bd: (u.fit || 'blur') === k ? '#fff' : 'transparent', pick: () => this.uiSet({ fit: k }) }))
      }; })(),
'''

def hexes(s, protect=()):
    lines = s.split('\n'); out = []
    for ln in lines:
        if any(p in ln for p in protect): out.append(ln); continue
        ln = ln.replace('rgba(217,217,217,.55)', 'var(--velo)').replace('rgba(217,217,217,.75)', 'var(--velo)')
        ln = re.sub(r'background-color:#575757', 'background-color:var(--pill)', ln)
        ln = re.sub(r'(?<![-\w])color:#575757', 'color:var(--muted)', ln)
        ln = re.sub(r'(?<!=")#575757', 'var(--pill)', ln)
        for h, v in (('#d9d9d9', '--chip'), ('#afafaf', '--t1'), ('#a7a7a7', '--t2'), ('#b7b7b7', '--t3'), ('#a3a3a3', '--t4'), ('#b0b0b0', '--t3'),
                     ('#626262', '--pillh'), ('#6a6a6a', '--pillh'), ('#464646', '--field'), ('#838383', '--sw'), ('#2f2f2f', '--muted')):
            ln = re.sub(r'(?<!=")' + h + r'(?![0-9a-fA-F])', 'var(' + v + ')', ln)
        out.append(ln)
    return '\n'.join(out)

PRE = '''<style>html,body{margin:0;background:#d9d9d9}</style>
<script>try{var u=JSON.parse(localStorage.getItem('archivero.ui.v1')||'null')||{};var P={grafito:[0,0],pizarra:[215,14],oceano:[205,38],turquesa:[178,30],bosque:[145,22],musgo:[80,20],arena:[38,24],ambar:[30,46],terracota:[14,40],vino:[345,32],rosa:[325,30],lavanda:[262,24]}[u.pal||'grafito']||[0,0];document.documentElement.style.background='hsl('+P[0]+' '+P[1]+'% '+(u.mode==='dark'?9:85)+'%)';}catch(e){}</script>'''
for f in FILES:
    s = open(OUT + f).read()
    s = s.replace('<script src="./support.js"></script>', '<script src="./support.js"></script>\n' + PRE, 1)
    # lib (variables del tema) en todas
    if f == 'Botones.dc.html': s = s.replace('  renderVals() { return {}; }', '  renderVals() {\n    return {\n    };\n  }')
    if f in ('Anotador.dc.html', 'Botones.dc.html'): s = add_lib(s)
    # tipografías
    s = re.sub(r'<link href="https://fonts.googleapis.com/css2\?family=Inter[^"]*" rel="stylesheet">', FONTS, s, count=1)
    if FONTS not in s: s = s.replace('<style>', FONTS + '\n<style>', 1)
    i = s.index('</style>\n</helmet>'); s = s[:i] + CSS + s[i:]
    # raíz
    i = s.index('</helmet>\n') + len('</helmet>\n'); j = s.index('>', i)
    root = s[i:j + 1]
    if f == 'Botones.dc.html':
        nroot = root.replace('background:#d9d9d9', 'background:var(--bg)').replace("font-family:'Inter',system-ui,sans-serif", 'font-family:var(--f2)').replace('color:#111', 'color:var(--ink)')
        nroot = nroot[:-2] + ';{{uiVars}}">'
    elif f in STAGE:
        inner = root.replace('position:relative;width:1440px;height:900px;', 'position:absolute;left:50%;top:50%;width:1440px;height:900px;margin:-450px 0 0 -720px;transform:scale({{fs}});transform-origin:center center;')
        inner = inner.replace('background:#d9d9d9', 'background:var(--bg)').replace("font-family:'Inter',system-ui,sans-serif", 'font-family:var(--f2)').replace('color:#111', 'color:var(--ink)')
        assert inner != root
        inner = inner.replace('<div ', '<div data-scr data-in="{{scrIn}}" data-leave="{{leaving}}" ', 1)
        nroot = '<div ref="{{stageFit}}" style="position:relative;width:100%;height:100vh;overflow:hidden;background:var(--bg);{{uiVars}}">\n' + inner
        k = s.rindex('\n</x-dc>'); s = s[:k] + '\n</div>' + s[k:]
    else:
        nroot = re.sub(r'width:1440px;height:900px;', 'width:100%;height:100vh;min-height:560px;', root)
        nroot = nroot.replace('background:#d9d9d9', 'background:var(--bg)').replace('background:#afafaf', 'background:var(--t1)').replace("font-family:'Inter',system-ui,sans-serif", 'font-family:var(--f2)').replace('color:#111', 'color:var(--ink)')
        nroot = nroot[:-2] + ';{{uiVars}}">'
        nroot = nroot.replace('<div ', '<div data-scr data-in="{{scrIn}}" data-leave="{{leaving}}" ', 1)
        assert '100vh' in nroot, f
    s = s[:i] + nroot + s[j + 1:]
    # cartelito propio en la botonera
    s = re.sub(r'<span title="([^"]*)" style="width:30px;height:30px;border-radius:50%', r'<span data-tip="\1" style="width:30px;height:30px;border-radius:50%', s)
    # salida animada al cambiar de pantalla
    s = re.sub(r'<a (class="[^"]*" )?href="([A-Za-z0-9]+\.dc\.html)"', r'<a \1href="\2" onClick="{{navOut}}"', s)
    # buscador centrado y fluido
    s = s.replace('position:absolute;left:490px;top:20px;width:460px;', 'position:absolute;left:50%;margin-left:-230px;top:20px;width:460px;')
    s = s.replace('@keyframes bar-in{0%{left:560px;width:320px}100%{left:490px;width:460px}}', '@keyframes bar-in{0%{margin-left:-160px;width:320px}100%{margin-left:-230px;width:460px}}')
    s = s.replace('@keyframes bar-out{0%{left:490px;width:460px}100%{left:560px;width:320px}}', '@keyframes bar-out{0%{margin-left:-230px;width:460px}100%{margin-left:-160px;width:320px}}')
    # reglas y ajustes: centrado + pestañas nuevas
    if 'rulesVals()' in s:
        s = s.replace('style="position:absolute;left:170px;top:84px;width:1100px;height:732px;', 'style="position:absolute;left:50%;margin-left:-550px;top:max(16px,calc(50% - 366px));width:1100px;height:min(732px,calc(100% - 32px));')
        a = "const tabs = [['reglas', 'Reglas'], ['tableros', 'Tableros'], ['proyectos', 'Proyectos'], ['copia', 'Copia de seguridad']];"
        assert a in s, f
        s = s.replace(a, "const tabs = [['reglas', 'Reglas'], ['tableros', 'Tableros'], ['proyectos', 'Proyectos'], ['apariencia', 'Apariencia'], ['copia', 'Nube y copia']];")
        a = "copia: tab === 'copia' },"
        assert a in s, f
        s = s.replace(a, "copia: tab === 'copia', apariencia: tab === 'apariencia' },")
        m = re.search(r"      rExport: \(\) => this\.setState\(\{ rmsg: '[^']*' \}\),\n      rImport: \(\) => this\.setState\(\{ rmsg: '[^']*' \}\)", s)
        assert m, f
        s = s.replace(m.group(0), RJS.rstrip().rstrip(','))
        i = s.index('          <!-- Copia de seguridad -->'); j = s.index('          </sc-if>\n', i) + len('          </sc-if>\n')
        old = s[i:j]
        prefs = re.search(r'<sc-for list="\{\{rPrefs\}\}".*?</sc-for>', old, re.S).group(0)
        s = s[:i] + NUBE.replace('__PREFS__', prefs) + APAR + s[j:]
        s = s.replace("this.rprefs = [{ label: 'Aplicar reglas al guardar', on: true }, { label: 'Mostrar aviso al guardar', on: true }];",
                      "this.rprefs = [{ label: 'Aplicar reglas al guardar', on: true }, { label: 'Mostrar aviso al guardar', on: true }, { label: 'Guardar también una copia automática en este equipo', on: false }];")
    # colores → variables del tema
    s = hexes(s, protect=("const sw = [", "const lab = {", "pen: { c:", ":root{--bg", "<style>html,body{"))
    assert s.count('<sc-if') == s.count('</sc-if>'), f
    assert s.count('<sc-for') == s.count('</sc-for>'), f
    open(OUT + f, 'w').write(s)
print('theme31 ok')
