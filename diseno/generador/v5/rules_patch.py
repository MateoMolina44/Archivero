# Pantalla "Reglas y ajustes": overlay en cada página interactiva (se abre con el engranaje)
import re
OUT='/tmp/w/out/'
EXq='cubic-bezier(.19,1,.22,1)'; CE='cubic-bezier(.4,0,.2,1)'
RCSS=f'''
@keyframes rz-in{{0%{{opacity:0;transform:translateY(18px) scale(.98)}}100%{{opacity:1;transform:none}}}}
@keyframes rz-out{{0%{{opacity:1;transform:none}}100%{{opacity:0;transform:translateY(18px) scale(.98)}}}}
@keyframes rz-fade{{0%{{opacity:0}}100%{{opacity:1}}}}
@keyframes rz-fade-out{{0%{{opacity:1}}100%{{opacity:0}}}}
.rz .rz-v{{animation:rz-fade .35s {EXq} both}}.rz .rz-p{{animation:rz-in .6s {EXq} both}}
.rz.out .rz-v{{animation:rz-fade-out .45s {EXq} .05s both!important}}.rz.out .rz-p{{animation:rz-out .4s {EXq} both!important}}
.rz-t{{display:block;width:100%;text-align:left;border:0;background:none;color:#fff;font:inherit;font-size:14px;font-weight:600;padding:10px 14px;border-radius:30px;cursor:pointer;transition:background-color .15s {CE}}}
.rz-t:hover{{background:rgba(255,255,255,.1)}}.rz-t:focus-visible{{outline:2px solid #fff;outline-offset:2px}}
.rz-b{{height:34px;padding:0 16px;border-radius:30px;background:#d9d9d9;color:#111;border:0;font:inherit;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;transition:transform .15s {CE},background-color .15s {CE}}}
.rz-b:hover{{background:#fff;transform:scale(1.03)}}.rz-b:active{{transform:scale(.96)}}.rz-b:focus-visible{{outline:2px solid #fff;outline-offset:2px}}
.rz-b.o{{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.35)}}.rz-b.o:hover{{background:rgba(255,255,255,.12)}}
.rz-b.s{{height:28px;min-width:28px;padding:0 8px;font-size:12px}}
.rz-i,.rz-s{{width:100%;box-sizing:border-box;height:36px;border-radius:30px;border:1px solid rgba(255,255,255,.2);background:#464646;color:#fff;font:inherit;font-size:13px;padding:0 14px;outline:none}}
.rz-i:focus,.rz-s:focus{{border-color:#fff}}.rz-s{{appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg,transparent 50%,#fff 50%),linear-gradient(135deg,#fff 50%,transparent 50%);background-position:calc(100% - 18px) 15px,calc(100% - 13px) 15px;background-size:5px 5px;background-repeat:no-repeat;padding-right:34px}}
.rz-s option{{color:#111}}
.rz-r{{display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;border:1px solid transparent;background:rgba(255,255,255,.06);color:#fff;font:inherit;border-radius:12px;padding:10px 12px;cursor:pointer;text-align:left;transition:background-color .15s {CE},border-color .15s {CE}}}
.rz-r:hover{{background:rgba(255,255,255,.12)}}.rz-r:focus-visible{{outline:2px solid #fff;outline-offset:2px}}
.rz-sw{{position:relative;flex:none;width:38px;height:22px;border-radius:30px;border:0;padding:0;cursor:pointer;transition:background-color .25s {CE}}}
.rz-sw::after{{content:"";position:absolute;top:3px;left:var(--l);width:16px;height:16px;border-radius:50%;background:#575757;transition:left .25s {CE}}}
.rz-sw:focus-visible{{outline:2px solid #fff;outline-offset:2px}}
.rz-tag{{display:inline-block;background:#d9d9d9;color:#111;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600;margin:0 6px 6px 0}}
@media (prefers-reduced-motion:reduce){{.rz .rz-v,.rz .rz-p,.rz.out .rz-v,.rz.out .rz-p{{animation-duration:.01ms!important;animation-delay:0s!important}}.rz-t,.rz-b,.rz-r,.rz-sw,.rz-sw::after{{transition-duration:.01ms!important}}}}
'''
ROW='''
'''
RHTML='''  <!-- Reglas y ajustes (se abre con el engranaje) -->
  <sc-if value="{{rOn}}" hint-placeholder-val="{{false}}">
  <div class="{{rCls}}" style="position:absolute;inset:0;z-index:50;color:#fff;font-family:'Inter',system-ui,sans-serif">
    <button class="rz-v" onClick="{{closeR}}" aria-label="Cerrar ajustes" style="position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:rgba(0,0,0,.55);cursor:default"></button>
    <div class="rz-p" role="dialog" aria-label="Reglas y ajustes" style="position:absolute;left:170px;top:84px;width:1100px;height:732px;background:#575757;border-radius:18px;border:1px solid rgba(255,255,255,.14);box-shadow:0 12px 40px rgba(0,0,0,.35);display:flex;flex-direction:column;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px 16px;border-bottom:1px solid rgba(255,255,255,.14)">
        <div style="font-size:22px;font-weight:700">Reglas y ajustes</div>
        <button class="rz-b" onClick="{{closeR}}" aria-label="Cerrar ajustes" style="width:34px;padding:0"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#111" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8"/></svg></button>
      </div>
      <div style="display:flex;flex:1;min-height:0">
        <div style="width:210px;flex:none;padding:16px 12px;border-right:1px solid rgba(255,255,255,.14);box-sizing:border-box">
          <sc-for list="{{rTabs}}" as="t" hint-placeholder-count="4"><button class="rz-t" onClick="{{t.pick}}" style="background:{{t.bg}}">{{t.label}}</button></sc-for>
          <div style="margin-top:22px;padding:0 14px;font-size:12px;line-height:1.5;opacity:.75">Proyecto activo<br><b style="font-size:13px;opacity:1">{{rProjName}}</b></div>
        </div>
        <div style="flex:1;min-width:0;display:flex;min-height:0">

          <!-- Reglas -->
          <sc-if value="{{rt.reglas}}" hint-placeholder-val="{{true}}">
          <div style="width:430px;flex:none;padding:20px 20px 16px 24px;box-sizing:border-box;display:flex;flex-direction:column;min-height:0;border-right:1px solid rgba(255,255,255,.14)">
            <div style="font-size:16px;font-weight:700">Reglas de organización</div>
            <div style="font-size:12px;line-height:1.5;opacity:.8;margin:6px 0 14px">Se aplican en orden. La primera regla que define un tablero decide dónde va la pieza; las etiquetas de todas las reglas que coinciden se suman.</div>
            <div style="flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:8px">
              <sc-for list="{{rules}}" as="r" hint-placeholder-count="4">
                <div class="rz-r" role="button" tabindex="0" onClick="{{r.pick}}" onKeyDown="{{r.key}}" style="border-color:{{r.bd}};background:{{r.bg}}">
                  <span style="width:20px;flex:none;text-align:center;font-size:12px;font-weight:700;opacity:.7">{{r.n}}</span>
                  <span style="flex:1;min-width:0;opacity:{{r.op}}"><span style="display:block;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{r.name}}</span><span style="display:block;font-size:11px;opacity:.8;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{r.sum}}</span></span>
                  <button class="rz-b s" onClick="{{r.up}}" aria-label="Subir regla" style="opacity:{{r.upOp}}">↑</button>
                  <button class="rz-b s" onClick="{{r.down}}" aria-label="Bajar regla" style="opacity:{{r.downOp}}">↓</button>
                  <button class="rz-sw" role="switch" aria-checked="{{r.on}}" aria-label="Activar regla" onClick="{{r.toggle}}" style="background:{{r.swBg}};--l:{{r.swL}}"></button>
                </div>
              </sc-for>
            </div>
            <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
              <button class="rz-b" onClick="{{addRule}}">+ Nueva regla</button>
              <button class="rz-b o" onClick="{{reapply}}">Reaplicar a Sin clasificar</button>
            </div>
            <div style="font-size:12px;min-height:18px;margin-top:10px;opacity:.9">{{rMsg}}</div>
          </div>
          <div style="flex:1;min-width:0;padding:20px 24px 16px 22px;box-sizing:border-box;overflow:auto">
            <sc-if value="{{hasSel}}" hint-placeholder-val="{{true}}">
              <div style="display:flex;align-items:center;justify-content:space-between"><div style="font-size:16px;font-weight:700">Editar regla</div><div style="font-size:11px;opacity:.7">Los cambios se guardan solos</div></div>
              <label style="display:block;font-size:12px;font-weight:600;margin:16px 0 6px" for="rz-name">Nombre</label>
              <input class="rz-i" id="rz-name" value="{{ed.name}}" onInput="{{ed.onName}}" placeholder="Nombre de la regla">
              <div style="display:flex;align-items:center;justify-content:space-between;margin:20px 0 8px"><div style="font-size:12px;font-weight:600">Condiciones</div>
                <div style="display:flex;gap:6px;align-items:center;font-size:12px"><span style="opacity:.75">Coinciden</span><button class="rz-b s" onClick="{{ed.mAll}}" style="background:{{ed.mAllBg}}">todas</button><button class="rz-b s" onClick="{{ed.mAny}}" style="background:{{ed.mAnyBg}}">alguna</button></div></div>
              <div style="display:flex;flex-direction:column;gap:8px">
                <sc-for list="{{ed.conds}}" as="c" hint-placeholder-count="2">
                  <div style="display:flex;gap:8px;align-items:center">
                    <select class="rz-s" aria-label="Tipo de condición" onChange="{{c.onKind}}" style="width:170px;flex:none"><sc-for list="{{c.kinds}}" as="o" hint-placeholder-count="4"><option value="{{o.v}}" selected="{{o.sel}}">{{o.l}}</option></sc-for></select>
                    <sc-if value="{{c.isText}}" hint-placeholder-val="{{true}}"><input class="rz-i" value="{{c.v}}" onInput="{{c.onVal}}" placeholder="{{c.ph}}" aria-label="Valor de la condición"></sc-if>
                    <sc-if value="{{c.isSel}}" hint-placeholder-val="{{false}}"><select class="rz-s" aria-label="Valor de la condición" onChange="{{c.onVal}}"><sc-for list="{{c.opts}}" as="o" hint-placeholder-count="3"><option value="{{o.v}}" selected="{{o.sel}}">{{o.l}}</option></sc-for></select></sc-if>
                    <button class="rz-b s" onClick="{{c.del}}" aria-label="Quitar condición" style="opacity:{{c.delOp}}">×</button>
                  </div>
                </sc-for>
              </div>
              <button class="rz-b o s" onClick="{{ed.addCond}}" style="margin-top:10px">+ Condición</button>
              <div style="font-size:12px;font-weight:600;margin:22px 0 8px">Entonces</div>
              <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px"><span style="font-size:12px;width:86px;flex:none;opacity:.85">Mover a</span>
                <select class="rz-s" aria-label="Tablero de destino" onChange="{{ed.onTo}}"><sc-for list="{{ed.tos}}" as="o" hint-placeholder-count="5"><option value="{{o.v}}" selected="{{o.sel}}">{{o.l}}</option></sc-for></select></div>
              <div style="display:flex;gap:8px;align-items:center"><span style="font-size:12px;width:86px;flex:none;opacity:.85">Etiquetar</span>
                <input class="rz-i" value="{{ed.tags}}" onInput="{{ed.onTags}}" placeholder="paleta, hud (separadas por coma)" aria-label="Etiquetas"></div>
              <div style="margin:12px 0 0 94px;min-height:26px"><sc-for list="{{ed.chips}}" as="g" hint-placeholder-count="2"><span class="rz-tag">#{{g.t}}</span></sc-for></div>
              <div style="margin-top:22px;padding-top:16px;border-top:1px solid rgba(255,255,255,.14);display:flex;justify-content:space-between;align-items:center"><div style="font-size:12px;opacity:.75;max-width:300px;line-height:1.45">{{ed.sum}}</div><button class="rz-b o" onClick="{{ed.del}}">Eliminar regla</button></div>
            </sc-if>
            <sc-if value="{{noSel}}" hint-placeholder-val="{{false}}"><div style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;font-size:13px;opacity:.7;padding:0 40px">Elegí una regla de la lista o creá una nueva.</div></sc-if>
          </div>
          </sc-if>

          <!-- Tableros -->
          <sc-if value="{{rt.tableros}}" hint-placeholder-val="{{false}}">
          <div style="flex:1;padding:20px 28px;overflow:auto">
            <div style="font-size:16px;font-weight:700">Tableros</div>
            <div style="font-size:12px;line-height:1.5;opacity:.8;margin:6px 0 16px">Las colecciones donde se guardan tus piezas. Las reglas mandan las piezas nuevas a un tablero; lo que no coincide queda en Sin clasificar.</div>
            <div style="display:flex;flex-direction:column;gap:8px;max-width:620px">
              <sc-for list="{{rBoards}}" as="b" hint-placeholder-count="5"><div class="rz-r" style="cursor:default"><span style="flex:1;font-size:14px;font-weight:600">{{b.name}}</span><span style="font-size:12px;opacity:.8">{{b.count}} piezas · {{b.rules}}</span></div></sc-for>
            </div>
          </div>
          </sc-if>

          <!-- Proyectos -->
          <sc-if value="{{rt.proyectos}}" hint-placeholder-val="{{false}}">
          <div style="flex:1;padding:20px 28px;overflow:auto">
            <div style="font-size:16px;font-weight:700">Proyectos</div>
            <div style="font-size:12px;line-height:1.5;opacity:.8;margin:6px 0 16px">El proyecto activo se usa en las reglas con la condición "Proyecto activo" y en lo que guarda la extensión.</div>
            <div style="display:flex;flex-direction:column;gap:8px;max-width:620px">
              <sc-for list="{{rProjs}}" as="p" hint-placeholder-count="3"><button class="rz-r" onClick="{{p.pick}}" aria-pressed="{{p.active}}" style="border-color:{{p.bd}}"><span style="width:16px;height:16px;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;flex:none"><span style="width:8px;height:8px;border-radius:50%;background:#fff;opacity:{{p.dot}}"></span></span><span style="flex:1;font-size:14px;font-weight:600">{{p.name}}</span><span style="font-size:12px;opacity:.8">{{p.state}}</span></button></sc-for>
            </div>
          </div>
          </sc-if>

          <!-- Copia de seguridad -->
          <sc-if value="{{rt.copia}}" hint-placeholder-val="{{false}}">
          <div style="flex:1;padding:20px 28px;overflow:auto">
            <div style="font-size:16px;font-weight:700">Copia de seguridad</div>
            <div style="font-size:12px;line-height:1.5;opacity:.8;margin:6px 0 16px">Tu librería vive en este navegador. Exportá una copia para tenerla a salvo o llevarla a otra computadora.</div>
            <div style="display:flex;gap:8px"><button class="rz-b" onClick="{{rExport}}">Exportar copia (.json)</button><button class="rz-b o" onClick="{{rImport}}">Importar copia</button></div>
            <div style="font-size:12px;min-height:18px;margin-top:12px;opacity:.9">{{rMsg}}</div>
            <div style="margin-top:24px;max-width:560px;display:flex;flex-direction:column;gap:8px">
              <sc-for list="{{rPrefs}}" as="o" hint-placeholder-count="2"><div class="rz-r" style="cursor:default"><span style="flex:1;font-size:14px;font-weight:600">{{o.label}}</span><button class="rz-sw" role="switch" aria-checked="{{o.on}}" aria-label="{{o.label}}" onClick="{{o.toggle}}" style="background:{{o.swBg}};--l:{{o.swL}}"></button></div></sc-for>
            </div>
            <div style="margin-top:22px;font-size:12px;opacity:.7">Atajo para guardar: Alt+Shift+S · clic derecho sobre imágenes y texto</div>
          </div>
          </sc-if>
        </div>
      </div>
    </div>
  </div>
  </sc-if>
'''
RMETH=r'''
  R() {
    if (!this.rules) {
      this.rseq = 4;
      this.rules = [
        { id: 'r1', name: 'Pinterest → Referencias', on: true, match: 'any', conds: [{ k: 'dom', v: 'pinterest.com' }], to: 'Tablero #2', tags: 'referencia' },
        { id: 'r2', name: 'Paleta y color', on: true, match: 'any', conds: [{ k: 'kw', v: 'paleta, color, colores' }], to: 'Tablero #1', tags: 'paleta' },
        { id: 'r3', name: 'Lo que guardo en mi proyecto', on: true, match: 'all', conds: [{ k: 'proj', v: 'Interfaz western' }, { k: 'tipo', v: 'imagen' }], to: '', tags: 'interfaz-western' },
        { id: 'r4', name: 'Capturas de pantalla', on: false, match: 'all', conds: [{ k: 'tipo', v: 'captura' }], to: 'Tablero #3', tags: 'captura' }
      ];
      this.rprojs = ['Interfaz western', 'Tren de la morgue', 'Estudio Manteca Games'];
      this.rprefs = [{ label: 'Aplicar reglas al guardar', on: true }, { label: 'Mostrar aviso al guardar', on: true }];
    }
    return this.rules;
  }
  openR() { clearTimeout(this.rt); this.R(); this.setState({ rq: 'in', rmsg: '' }); }
  closeR() { if (this.state.rq !== 'in') return; this.setState({ rq: 'out' }); this.rt = setTimeout(() => this.setState({ rq: 'off' }), 560); }
  rbump() { this.setState({ rrev: this.state.rrev + 1 }); }
  rulesVals() {
    const rules = this.R(); const st = this.state;
    const KINDS = [['dom', 'Dominio', 'ej: pinterest.com'], ['kw', 'Palabras clave', 'ej: paleta, hud'], ['proj', 'Proyecto activo', ''], ['tipo', 'Tipo de contenido', '']];
    const TIPOS = ['imagen', 'enlace', 'texto', 'captura'];
    const TOS = ['', 'Tablero #1', 'Tablero #2', 'Tablero #3', 'Tablero #4', 'Sin clasificar'];
    const kname = (k) => KINDS.find((x) => x[0] === k)[1];
    const sumOf = (r) => (r.conds.length ? r.conds.map((c) => (c.k === 'proj' ? 'proyecto = ' : kname(c.k).toLowerCase() + ': ') + (c.v || '…')).join(r.match === 'all' ? ' y ' : ' o ') : 'sin condiciones') + ' → ' + (r.to || 'sin cambiar tablero') + (r.tags.trim() ? ' · ' + r.tags.split(',').map((t) => '#' + t.trim()).filter((t) => t.length > 1).join(' ') : '');
    const sel = rules.find((r) => r.id === st.rsel);
    const move = (i, d) => { const j = i + d; if (j < 0 || j >= rules.length) return; const t = rules[i]; rules[i] = rules[j]; rules[j] = t; this.rbump(); };
    const rlist = rules.map((r, i) => ({
      n: i + 1, name: r.name || 'Regla sin nombre', sum: sumOf(r), on: r.on, op: r.on ? 1 : 0.5,
      bd: r.id === st.rsel ? '#fff' : 'transparent', bg: r.id === st.rsel ? 'rgba(255,255,255,.16)' : 'rgba(255,255,255,.06)',
      upOp: i === 0 ? 0.35 : 1, downOp: i === rules.length - 1 ? 0.35 : 1,
      swBg: r.on ? '#d9d9d9' : '#838383', swL: r.on ? '19px' : '3px',
      pick: () => this.setState({ rsel: r.id }),
      key: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.setState({ rsel: r.id }); } },
      up: (e) => { e.stopPropagation(); move(i, -1); }, down: (e) => { e.stopPropagation(); move(i, 1); },
      toggle: (e) => { e.stopPropagation(); r.on = !r.on; this.rbump(); }
    }));
    let ed = {};
    if (sel) {
      ed = {
        name: sel.name, sum: sumOf(sel),
        onName: (e) => { sel.name = e.target.value; this.rbump(); },
        mAll: () => { sel.match = 'all'; this.rbump(); }, mAny: () => { sel.match = 'any'; this.rbump(); },
        mAllBg: sel.match === 'all' ? '#fff' : '#d9d9d9', mAnyBg: sel.match === 'any' ? '#fff' : '#d9d9d9',
        conds: sel.conds.map((c, ci) => ({
          kinds: KINDS.map((k) => ({ v: k[0], l: k[1], sel: k[0] === c.k })),
          isText: c.k === 'dom' || c.k === 'kw', isSel: c.k === 'proj' || c.k === 'tipo',
          v: c.v, ph: (KINDS.find((x) => x[0] === c.k) || [])[2],
          opts: (c.k === 'proj' ? this.rprojs : TIPOS).map((o) => ({ v: o, l: o, sel: o === c.v })),
          onKind: (e) => { c.k = e.target.value; c.v = c.k === 'proj' ? this.rprojs[st.rproj || 0] : c.k === 'tipo' ? TIPOS[0] : ''; this.rbump(); },
          onVal: (e) => { c.v = e.target.value; this.rbump(); },
          del: () => { if (sel.conds.length > 1) { sel.conds.splice(ci, 1); this.rbump(); } }, delOp: sel.conds.length > 1 ? 1 : 0.35
        })),
        addCond: () => { sel.conds.push({ k: 'kw', v: '' }); this.rbump(); },
        tos: TOS.map((t) => ({ v: t, l: t || 'Sin cambiar de tablero', sel: t === sel.to })),
        onTo: (e) => { sel.to = e.target.value; this.rbump(); },
        tags: sel.tags, onTags: (e) => { sel.tags = e.target.value; this.rbump(); },
        chips: sel.tags.split(',').map((t) => t.trim()).filter(Boolean).map((t) => ({ t })),
        del: () => { const i = rules.indexOf(sel); rules.splice(i, 1); this.setState({ rsel: rules[Math.min(i, rules.length - 1)] ? rules[Math.min(i, rules.length - 1)].id : null, rrev: st.rrev + 1 }); }
      };
    }
    const tabs = [['reglas', 'Reglas'], ['tableros', 'Tableros'], ['proyectos', 'Proyectos'], ['copia', 'Copia de seguridad']];
    const tab = st.rtab;
    const cnt = { 'Tablero #1': 14, 'Tablero #2': 9, 'Tablero #3': 6, 'Tablero #4': 11, 'Sin clasificar': 7 };
    return {
      openR: () => this.openR(), closeR: () => this.closeR(),
      rOn: st.rq !== 'off', rCls: st.rq === 'out' ? 'rz out' : 'rz',
      rTabs: tabs.map(([k, l]) => ({ label: l, bg: tab === k ? 'rgba(255,255,255,.16)' : 'transparent', pick: () => this.setState({ rtab: k, rmsg: '' }) })),
      rt: { reglas: tab === 'reglas', tableros: tab === 'tableros', proyectos: tab === 'proyectos', copia: tab === 'copia' },
      rProjName: this.rprojs[st.rproj || 0],
      rules: rlist, hasSel: !!sel, noSel: !sel, ed, rMsg: st.rmsg,
      addRule: () => { const id = 'r' + (++this.rseq); rules.push({ id, name: 'Nueva regla', on: true, match: 'all', conds: [{ k: 'kw', v: '' }], to: '', tags: '' }); this.setState({ rsel: id, rrev: st.rrev + 1 }); },
      reapply: () => {
        const act = rules.filter((r) => r.on && r.to && r.to !== 'Sin clasificar').length;
        const moved = Math.min(cnt['Sin clasificar'], act * 3);
        this.setState({ rmsg: act ? 'Listo: ' + moved + ' piezas clasificadas, ' + (cnt['Sin clasificar'] - moved) + ' siguen en Sin clasificar.' : 'No hay reglas activas que muevan piezas a un tablero.' });
      },
      rBoards: ['Tablero #1', 'Tablero #2', 'Tablero #3', 'Tablero #4', 'Sin clasificar'].map((n) => { const k = rules.filter((r) => r.to === n).length; return { name: n, count: cnt[n], rules: k ? k + (k === 1 ? ' regla' : ' reglas') + ' apuntan acá' : 'sin reglas' }; }),
      rProjs: this.rprojs.map((p, i) => ({ name: p, active: (st.rproj || 0) === i, dot: (st.rproj || 0) === i ? 1 : 0, bd: (st.rproj || 0) === i ? '#fff' : 'transparent', state: (st.rproj || 0) === i ? 'Activo' : 'Hacer activo', pick: () => this.setState({ rproj: i }) })),
      rPrefs: this.rprefs.map((o) => ({ label: o.label, on: o.on, swBg: o.on ? '#d9d9d9' : '#838383', swL: o.on ? '19px' : '3px', toggle: () => { o.on = !o.on; this.rbump(); } })),
      rExport: () => this.setState({ rmsg: 'Maqueta: acá se descarga archivero-copia.json con tus tableros, piezas y reglas.' }),
      rImport: () => this.setState({ rmsg: 'Maqueta: acá se elige un archivo .json para restaurar la librería.' })
    };
  }
'''
ANCHOR="this.t3 = setTimeout(() => this.setState({ sq: 'off' }), 640); }"
pages=['Main1.dc.html','Main.dc.html','Archivo.dc.html','Tablero.dc.html','Anotador.dc.html']
for f in pages:
    s=open(OUT+f).read()
    assert s.count(ANCHOR)==1,(f,'anchor',s.count(ANCHOR))
    s=s.replace(ANCHOR,ANCHOR+",\n      ...this.rulesVals()")
    assert "sq: 'off'" in s
    s=s.replace("sq: 'off'","sq: 'off', rq: 'off', rtab: 'reglas', rsel: 'r1', rrev: 0, rmsg: '', rproj: 0",1)
    assert s.count('  renderVals() {')==1,(f,'rv')
    s=s.replace('  renderVals() {',RMETH+'  renderVals() {',1)
    assert s.rstrip().count('</div>\n</x-dc>')==1 or '</div>\n</x-dc>' in s,(f,'end')
    i=s.rindex('</div>\n</x-dc>'); s=s[:i]+RHTML+s[i:]
    assert '</style>' in s
    s=s.replace('</style>',RCSS+'</style>',1)
    open(OUT+f,'w').write(s)
print('rules ok')
