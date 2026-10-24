// GENERADO por scripts/import-design.mjs desde diseno/project/Main1.dc.html — no editar a mano.
import { DCLogic } from '../dc/runtime.js';

export const name = "Main1";
export const props = {};
export const css = ".sec{position:absolute;left:50%;bottom:20px;transform:translateX(-50%);z-index:9;height:44px}\n.sec-c,.sec-x{background:var(--pill);border-radius:30px;height:44px;display:flex;align-items:center;box-sizing:border-box;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.08),inset 0 1px 1.5px rgba(255,255,255,.12)}\n.sec-c{gap:12px;padding:0 12px}\n.sec-x{gap:8px;padding:0 7px;white-space:nowrap}\n.sec-l,.sec-r{position:absolute;bottom:0;height:44px;opacity:0;visibility:hidden;pointer-events:none;filter:blur(4px);transition:opacity .25s cubic-bezier(.4,0,.2,1),transform .45s cubic-bezier(.4,0,.2,1),filter .35s cubic-bezier(.4,0,.2,1),visibility 0s .45s}\n.sec-l{right:100%;padding-right:8px;transform:translateX(18px) scale(.85);transform-origin:right center}\n.sec-r{left:100%;padding-left:8px;transform:translateX(-18px) scale(.85);transform-origin:left center}\n.sec:hover .sec-l,.sec:hover .sec-r,.sec:focus-within .sec-l,.sec:focus-within .sec-r,.sec.show .sec-l,.sec.show .sec-r{opacity:1;visibility:visible;pointer-events:auto;transform:none;filter:none;transition-delay:0s}\n.sec button{border:0;padding:0;background:none;font:inherit;cursor:pointer}\n.sec a>span,.sec button>span{transition:transform .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}\n.sec a:hover>span,.sec button:hover>span{background:#fff!important;transform:scale(1.08)}\n.sec a:active>span,.sec button:active>span{transform:scale(.95)}\n.sec a:focus-visible,.sec button:focus-visible{outline:2px solid #fff;outline-offset:2px;border-radius:50%}\n@media (prefers-reduced-motion:reduce){.sec-l,.sec-r,.sec a>span,.sec button>span{transition-duration:.01ms!important}}\n.sb{position:absolute;left:50%;top:20px;width:320px;transform:translateX(-50%);transition:width .5s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1),transform .15s cubic-bezier(.4,0,.2,1),box-shadow .15s cubic-bezier(.4,0,.2,1);border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.08),inset 0 1px 1.5px rgba(255,255,255,.12)}\n.sb:hover,.sb:focus-visible{background:var(--pillh)!important}\n.sb:active{transform:translateX(-50%) scale(.98)}\n.sb:focus-visible{outline:2px solid #fff;outline-offset:3px}\n.sb svg{transition:transform .5s cubic-bezier(.4,0,.2,1)}.sb:hover svg{transform:scale(1.12)}\n.shm{white-space:nowrap;color:transparent;-webkit-text-fill-color:transparent;background-image:linear-gradient(100deg,transparent 35%,rgba(255,255,255,.95) 50%,transparent 65%),linear-gradient(#c9c9c9,#c9c9c9);background-size:250% 100%,auto;background-clip:text;-webkit-background-clip:text;animation:shm 2.2s linear infinite}\n@keyframes shm{0%{background-position:100% center,0 0}100%{background-position:0% center,0 0}}\n@keyframes enter{0%{opacity:0;filter:blur(2px)}100%{opacity:1;filter:blur(0)}}\n@keyframes scale-in{0%{opacity:0;transform:scale(.95)}100%{opacity:1;transform:scale(1)}}\n@keyframes slide-in{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:translateY(0)}}\n@media (prefers-reduced-motion:reduce){.sec-c,.sec-x,.sb,.shm,.sec-x a>span{transition-duration:.01ms!important;animation:none!important}}\nbody{margin:0}\na{text-decoration:none;color:inherit}\nbutton{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}\n.pc{position:absolute;inset:0;overflow:hidden;transition:transform 1.2s cubic-bezier(.19,1,.22,1),background-color .8s cubic-bezier(.4,0,.2,1)}\n.img{position:absolute;left:0;top:-180px;width:100%;height:calc(100% + 360px);overflow:hidden;transition:transform 1.2s cubic-bezier(.19,1,.22,1)}\n@keyframes fa-blur{0%{opacity:0;filter:blur(10px)}100%{opacity:1;filter:blur(0)}}@keyframes fb-blur{0%{opacity:0}100%{opacity:1}}@keyframes fa-color{0%{opacity:0;filter:blur(10px)}100%{opacity:1;filter:blur(0)}}@keyframes fb-color{0%{opacity:0}100%{opacity:1}}@keyframes fa-frame{0%{opacity:0;filter:blur(10px)}100%{opacity:1;filter:blur(0)}}@keyframes fb-frame{0%{opacity:0}100%{opacity:1}}@keyframes fa-cover{0%{opacity:0;filter:blur(10px)}100%{opacity:1;filter:blur(0)}}@keyframes fb-cover{0%{opacity:0}100%{opacity:1}}\n.dark{position:absolute;inset:0;background:#000;transition:opacity .9s cubic-bezier(.19,1,.22,1)}\n.closer{position:absolute;inset:0;width:100%;height:100%}\n.tl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;transition:transform 1.2s cubic-bezier(.19,1,.22,1)}\n.tbtn{pointer-events:auto;position:relative;display:block;text-align:center}\n.tt{position:relative;display:block;text-align:center;font-size:64px;line-height:1.1;letter-spacing:-1px;font-weight:600;color:#fff}\n.ty{position:absolute;left:0;top:0;white-space:nowrap}\n.ul{display:inline-block;position:relative}\n.ul::after{content:\"\";position:absolute;left:0;bottom:0;width:100%;height:3px;background:currentColor;transform:scaleX(0);transform-origin:right center;transition:transform .7s cubic-bezier(.19,1,.22,1)}\n.tbtn:hover .ul::after{transform:scaleX(1);transform-origin:left center}\n.tg{position:absolute;left:0;right:0;top:100%;margin-top:22px;font-size:14px;letter-spacing:0;font-weight:400;opacity:0;transition:opacity .4s linear}\n.tbtn:hover .tg,.tbtn:focus-visible .tg{opacity:1}\n.info{position:absolute;left:50%;top:215px;width:700px;margin-left:-350px;color:#fff;font-weight:700;font-size:16px;line-height:1.5;pointer-events:none}\n.info p{margin:0 0 14px;min-height:1.5em}\n.cur{display:inline-block;width:.5em;height:.85em;background:currentColor;vertical-align:-.08em;margin-left:2px}\n.nv{font-size:14px;color:#fff;position:relative;display:inline-block}\n.nv::after{content:\"\";position:absolute;left:0;bottom:-2px;width:100%;height:1px;background:currentColor;transform:scaleX(0);transform-origin:right center;transition:transform .7s cubic-bezier(.19,1,.22,1)}\n.nv:hover::after,.nv:focus-visible::after{transform:scaleX(1);transform-origin:left center}\n.nv:focus-visible,.tbtn:focus-visible{outline:2px solid #fff;outline-offset:6px}\n@media (prefers-reduced-motion:reduce){.pc,.img,.tl,.dark,.ul::after,.tg{transition-duration:.01s!important}}\n@keyframes bar-in{0%{margin-left:-160px;width:320px}100%{margin-left:-230px;width:460px}}\n@keyframes bar-out{0%{margin-left:-230px;width:460px}100%{margin-left:-160px;width:320px}}\n@keyframes drop-in{0%{opacity:0;clip-path:inset(0 0 100% 0)}100%{opacity:1;clip-path:inset(0 0 0 0)}}\n@keyframes drop-out{0%{opacity:1;clip-path:inset(0 0 0 0)}100%{opacity:0;clip-path:inset(0 0 100% 0)}}\n@keyframes slide-out{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(24px)}}\n@keyframes fade-out{0%{opacity:1}100%{opacity:0}}\n.bz .velo{animation:enter .35s cubic-bezier(.4,0,.2,1) both}\n.bz .panel{animation:bar-in .5s cubic-bezier(.4,0,.2,1) both}\n.bz .pin{animation:drop-in .5s cubic-bezier(.4,0,.2,1) .12s both}\n.bz .chip,.bz .vt{animation:slide-in .5s cubic-bezier(.4,0,.2,1) both;animation-delay:var(--d)}\n.bz.out .panel{animation:bar-out .45s cubic-bezier(.4,0,.2,1) .15s both!important}.bz.out .pin{animation:drop-out .3s cubic-bezier(.4,0,.2,1) both!important}.bz.out .chip,.bz.out .vt{animation:slide-out .3s cubic-bezier(.4,0,.2,1) both!important}.bz.out .velo{animation:fade-out .45s cubic-bezier(.4,0,.2,1) .1s both!important}\n.chip{transition:transform .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}.chip:hover{background:#fff!important;transform:scale(1.04)}.chip:active{transform:scale(.95)}\n.vt{transition:transform .7s cubic-bezier(.4,0,.2,1)}.vt:hover{transform:scale(1.04)}\n.x{transition:transform .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}.x:hover{background:#fff!important;transform:scale(1.08)}.x:active{transform:scale(.95)}\n.x:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.fv{font-size:14px;position:relative;display:inline-block;color:#fff;text-decoration:none}\n.fv::after{content:\"\";position:absolute;left:0;bottom:-2px;width:100%;height:1px;background:currentColor;transform:scaleX(0);transform-origin:right center;transition:transform .7s cubic-bezier(.19,1,.22,1)}\n.fv:hover::after{transform:scaleX(1);transform-origin:left center}\n@media (prefers-reduced-motion:reduce){.bz .velo,.bz .panel,.bz .pin,.bz .chip,.bz .vt,.bz.out .panel,.bz.out .pin,.bz.out .chip,.bz.out .vt,.bz.out .velo{animation-duration:.01ms!important;animation-delay:0s!important}}\n\n@keyframes rz-in{0%{opacity:0;transform:translateY(18px) scale(.98)}100%{opacity:1;transform:none}}\n@keyframes rz-out{0%{opacity:1;transform:none}100%{opacity:0;transform:translateY(18px) scale(.98)}}\n@keyframes rz-fade{0%{opacity:0}100%{opacity:1}}\n@keyframes rz-fade-out{0%{opacity:1}100%{opacity:0}}\n.rz .rz-v{animation:rz-fade .35s cubic-bezier(.19,1,.22,1) both}.rz .rz-p{animation:rz-in .6s cubic-bezier(.19,1,.22,1) both}\n.rz.out .rz-v{animation:rz-fade-out .45s cubic-bezier(.19,1,.22,1) .05s both!important}.rz.out .rz-p{animation:rz-out .4s cubic-bezier(.19,1,.22,1) both!important}\n.rz-t{display:block;width:100%;text-align:left;border:0;background:none;color:#fff;font:inherit;font-size:14px;font-weight:600;padding:10px 14px;border-radius:30px;cursor:pointer;transition:background-color .15s cubic-bezier(.4,0,.2,1)}\n.rz-t:hover{background:rgba(255,255,255,.1)}.rz-t:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.rz-b{height:34px;padding:0 16px;border-radius:30px;background:var(--chip);color:#111;border:0;font:inherit;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;transition:transform .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}\n.rz-b:hover{background:#fff;transform:scale(1.03)}.rz-b:active{transform:scale(.96)}.rz-b:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.rz-b.o{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.35)}.rz-b.o:hover{background:rgba(255,255,255,.12)}\n.rz-b.s{height:28px;min-width:28px;padding:0 8px;font-size:12px}\n.rz-i,.rz-s{width:100%;box-sizing:border-box;height:36px;border-radius:30px;border:1px solid rgba(255,255,255,.2);background:var(--field);color:#fff;font:inherit;font-size:13px;padding:0 14px;outline:none}\n.rz-i:focus,.rz-s:focus{border-color:#fff}.rz-s{appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg,transparent 50%,#fff 50%),linear-gradient(135deg,#fff 50%,transparent 50%);background-position:calc(100% - 18px) 15px,calc(100% - 13px) 15px;background-size:5px 5px;background-repeat:no-repeat;padding-right:34px}\n.rz-s option{color:#111}\n.rz-r{display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;border:1px solid transparent;background:rgba(255,255,255,.06);color:#fff;font:inherit;border-radius:12px;padding:10px 12px;cursor:pointer;text-align:left;transition:background-color .15s cubic-bezier(.4,0,.2,1),border-color .15s cubic-bezier(.4,0,.2,1)}\n.rz-r:hover{background:rgba(255,255,255,.12)}.rz-r:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.rz-sw{position:relative;flex:none;width:38px;height:22px;border-radius:30px;border:0;padding:0;cursor:pointer;transition:background-color .25s cubic-bezier(.4,0,.2,1)}\n.rz-sw::after{content:\"\";position:absolute;top:3px;left:var(--l);width:16px;height:16px;border-radius:50%;background:var(--pill);transition:left .25s cubic-bezier(.4,0,.2,1)}\n.rz-sw:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.rz-tag{display:inline-block;background:var(--chip);color:#111;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600;margin:0 6px 6px 0}\n@media (prefers-reduced-motion:reduce){.rz .rz-v,.rz .rz-p,.rz.out .rz-v,.rz.out .rz-p{animation-duration:.01ms!important;animation-delay:0s!important}.rz-t,.rz-b,.rz-r,.rz-sw,.rz-sw::after{transition-duration:.01ms!important}}\n.ob{height:32px;min-width:32px;padding:0 12px;border-radius:30px;background:var(--chip);color:#111;border:0;font:inherit;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}\n.ob:hover{background:#fff;transform:scale(1.05)}.ob:active{transform:scale(.95)}.ob:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.pn{background:var(--pill);border-radius:14px;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.12);color:#fff}\n.mdl{animation:enter .35s cubic-bezier(.4,0,.2,1) both}.mdl .box{animation:scale-in .5s cubic-bezier(.19,1,.22,1) both}\n.in{width:100%;box-sizing:border-box;height:40px;border-radius:30px;border:1px solid rgba(255,255,255,.2);background:var(--field);color:#fff;font:inherit;font-size:14px;padding:0 16px;outline:none}\n.in:focus{border-color:#fff}\n.lbl{display:block;font-size:12px;font-weight:600;margin:14px 0 6px}\n.ta3{height:auto;min-height:88px;border-radius:14px;padding:10px 16px;resize:vertical;line-height:1.5;display:block}\n.sel3{appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg,transparent 50%,#fff 50%),linear-gradient(135deg,#fff 50%,transparent 50%);background-position:calc(100% - 20px) 17px,calc(100% - 15px) 17px;background-size:5px 5px;background-repeat:no-repeat;padding-right:36px}\n.sel3 option{color:#111}\n@keyframes mdl-out{0%{opacity:1}100%{opacity:0}}\n@keyframes box-out{0%{opacity:1;transform:none}100%{opacity:0;transform:translateY(10px) scale(.96)}}\n.mdl.out{animation:mdl-out .32s cubic-bezier(.4,0,.2,1) both!important;pointer-events:none}.mdl.out .box{animation:box-out .32s cubic-bezier(.4,0,.2,1) both!important}\n\n:root{--bg:#d9d9d9;--t1:#afafaf;--t2:#a7a7a7;--t3:#b7b7b7;--t4:#a3a3a3;--pill:#575757;--pillh:#626262;--chip:#d9d9d9;--muted:#575757;--field:#464646;--sw:#838383;--velo:rgba(217,217,217,.55);--ink:#111;--f1:'Inter',system-ui,sans-serif;--f2:'Inter',system-ui,sans-serif}\nh1,h2,b,strong,[style*=\"font-weight:700\"],.tt{font-family:var(--f1)}\nbutton,input,textarea,select{font-family:inherit}\n.sec-c,.sec-x{line-height:0}\n.sec-c>*,.sec-x>*{display:flex;align-items:center;justify-content:center;flex:none}\n.sec [data-tip]{position:relative}\n.sec [data-tip]::after{content:attr(data-tip);position:absolute;left:50%;bottom:calc(100% + 17px);transform:translate(-50%,4px);background:var(--pill);color:#fff;font:600 12px/1 var(--f2);padding:7px 10px;border-radius:8px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s cubic-bezier(.4,0,.2,1),transform .15s cubic-bezier(.4,0,.2,1);box-shadow:0 3px 12px rgba(0,0,0,.15)}\n.sec a:hover [data-tip]::after,.sec button:hover [data-tip]::after,.sec a:focus-visible [data-tip]::after,.sec button:focus-visible [data-tip]::after,.sec [aria-current]:hover [data-tip]::after{opacity:1;transform:translate(-50%,0)}\n@keyframes x-in{0%{opacity:0;transform:scale(.4) rotate(-90deg)}100%{opacity:1;transform:none}}\n@keyframes x-out{0%{opacity:1;transform:none}100%{opacity:0;transform:scale(.4) rotate(90deg)}}\n.bz .x{animation:x-in .45s cubic-bezier(.19,1,.22,1) .18s backwards}\n.bz.out .x{animation:x-out .28s cubic-bezier(.4,0,.2,1) both!important}\n@keyframes scr-in{0%{opacity:0}100%{opacity:1}}\n[data-scr]:not([data-in=\"0\"])>:not(.sec):not(.sb):not(.bz):not(.rz):not(.mdl):not(.mn){animation:scr-in .5s cubic-bezier(.4,0,.2,1) backwards}\n@media (prefers-reduced-motion:reduce){.bz .x,.bz.out .x{animation:none!important}.sec [data-tip]::after{transition:none}[data-scr]>*{animation:none!important}}";
export const template = "<div data-scr data-in=\"{{scrIn}}\" data-leave=\"{{leaving}}\" onWheel=\"{{wheel}}\" style=\"position:relative;width:100%;height:100vh;min-height:560px;background:var(--t1);overflow:hidden;font-family:var(--f2);color:#fff;{{uiVars}}\">\n\n  <sc-for list=\"{{pieces}}\" as=\"p\" hint-placeholder-count=\"5\">\n    <section aria-label=\"{{p.name}}\" class=\"pc\" style=\"{{p.boxStyle}}\">\n      <div class=\"img\" style=\"{{p.imgStyle}};background-color:{{p.bgCol}}\">\n        <sc-if value=\"{{p.blurImg}}\" hint-placeholder-val=\"{{false}}\"><img src=\"{{p.src}}\" alt=\"\" aria-hidden=\"true\" style=\"position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:blur(48px) brightness(.72);transform:scale(1.15);animation:{{p.ban}} .9s cubic-bezier(.19,1,.22,1) backwards\"></sc-if>\n        <sc-if value=\"{{p.blurVid}}\" hint-placeholder-val=\"{{false}}\"><video src=\"{{p.src}}\" ref=\"{{vref}}\" muted loop playsinline aria-hidden=\"true\" style=\"position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:blur(48px) brightness(.72);transform:scale(1.15);animation:{{p.ban}} .9s cubic-bezier(.19,1,.22,1) backwards\"></video></sc-if>\n        <sc-if value=\"{{p.fgImg}}\" hint-placeholder-val=\"{{true}}\"><img src=\"{{p.src}}\" alt=\"\" style=\"{{p.fgStyle}};animation:{{p.fan}} .9s cubic-bezier(.19,1,.22,1) backwards\"></sc-if>\n        <sc-if value=\"{{p.fgVid}}\" hint-placeholder-val=\"{{false}}\"><video src=\"{{p.src}}\" ref=\"{{vref}}\" muted loop playsinline style=\"{{p.fgStyle}};animation:{{p.fan}} .9s cubic-bezier(.19,1,.22,1) backwards\"></video></sc-if>\n      </div>\n      <div class=\"dark\" style=\"{{p.darkStyle}}\"></div>\n      <button class=\"closer\" onClick=\"{{toggle}}\" aria-label=\"Cerrar información\" tabindex=\"-1\" style=\"{{p.closerStyle}}\"></button>\n      <div class=\"tl\" style=\"{{p.titleStyle}}\">\n        <button class=\"tbtn\" onClick=\"{{toggle}}\" tabindex=\"{{p.tab}}\" aria-expanded=\"{{p.expanded}}\" aria-label=\"{{p.name}}: ver información\">\n          <span class=\"tt\" style=\"font-size:{{p.tsz}}px;max-width:88vw;overflow:hidden;text-overflow:ellipsis\"><span class=\"ul\"><span aria-hidden=\"true\" style=\"visibility:hidden\">{{p.name}}</span><span class=\"ty\">{{p.typed}}<sc-if value=\"{{p.cur}}\" hint-placeholder-val=\"{{false}}\"><span class=\"cur\"></span></sc-if></span></span><span class=\"tg\">{{p.tags}}</span></span>\n        </button>\n      </div>\n      <div class=\"info\" style=\"{{p.infoStyle}}\">\n        <sc-for list=\"{{p.lines}}\" as=\"ln\" hint-placeholder-count=\"6\"><p>{{ln.t}}<sc-if value=\"{{ln.c}}\" hint-placeholder-val=\"{{false}}\"><span class=\"cur\"></span></sc-if></p></sc-for>\n        <button class=\"nv\" onClick=\"{{openFicha}}\" tabindex=\"{{p.linkTab}}\" style=\"pointer-events:{{p.linkPE}};opacity:{{p.linkOp}};transition:opacity .8s cubic-bezier(.19,1,.22,1)\">Ver ficha completa</button>\n      </div>\n    </section>\n  </sc-for>\n\n  <button class=\"sb\" onClick=\"{{openS}}\" aria-label=\"Abrir buscador\" style=\"position:absolute;top:20px;height:40px;background:var(--pill);border-radius:30px;display:flex;align-items:center;gap:10px;padding:0 16px;box-sizing:border-box;font-size:14px;font-family:inherit;color:#fff;z-index:9;cursor:pointer\">\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.4\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"7\" cy=\"7\" r=\"4.5\"/><path d=\"M10.5 10.5L14 14\"/></svg>\n    <span class=\"shm\">{{s.t}}</span><sc-if value=\"{{s.c}}\" hint-placeholder-val=\"{{false}}\"><span class=\"cur\"></span></sc-if>\n  </button>\n\n  <sc-if value=\"{{libAny}}\" hint-placeholder-val=\"{{true}}\">\n  <div style=\"position:absolute;right:30px;bottom:80px;font-size:12px;z-index:9;text-align:right;text-shadow:0 1px 6px rgba(0,0,0,.35)\">{{curFitTag}}</div>\n  <div style=\"position:absolute;right:30px;bottom:30px;display:flex;gap:24px;align-items:center;z-index:9\">\n    <button class=\"nv\" onClick=\"{{shuffle}}\" aria-label=\"Mezclar el orden\" style=\"min-height:44px\">Mezclar</button>\n    <button class=\"nv\" onClick=\"{{cycleFit}}\" aria-label=\"Cambiar cómo se adaptan las imágenes chicas\" style=\"min-height:44px\">Ajuste: {{fitLbl}}</button>\n  </div>\n  <div style=\"position:absolute;left:30px;bottom:30px;display:flex;gap:24px;align-items:center;z-index:9\">\n    <span style=\"font-size:14px;font-variant-numeric:tabular-nums\">{{counter}}</span>\n    <button class=\"nv\" onClick=\"{{prev}}\" aria-label=\"Pieza anterior\" style=\"min-height:44px\">Anterior</button>\n    <button class=\"nv\" onClick=\"{{next}}\" aria-label=\"Pieza siguiente\" style=\"min-height:44px\">Siguiente</button>\n  </div>\n  </sc-if>\n  <sc-if value=\"{{libEmpty}}\" hint-placeholder-val=\"{{false}}\"><div style=\"position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;color:var(--muted);pointer-events:none;z-index:1\"><div style=\"font-size:28px;font-weight:700\">Todavía no guardaste nada</div><div style=\"font-size:14px;line-height:1.5;max-width:440px\">Lo que guardes con la extensión va a ir apareciendo acá, siempre lo último primero.</div></div></sc-if>\n\n  <!-- Botón de sección: las 3 secciones siempre visibles (la actual resaltada); al hover aparecen herramientas y ajustes -->\n  <div class=\"sec\"><div class=\"sec-l\"><div class=\"sec-x\"><a href=\"Main1.dc.html\" onClick=\"{{navOut}}\" aria-label=\"Vista 1: pantalla completa\" style=\"display:flex\"><span data-tip=\"Vista 1: pantalla completa\" style=\"width:30px;height:30px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;flex:none;box-shadow:0 0 0 2px var(--pill),0 0 0 4px #fff;\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2\" y=\"2\" width=\"12\" height=\"7\" rx=\"1.2\"/><rect x=\"2\" y=\"11\" width=\"12\" height=\"3\" rx=\"1.2\"/></svg></span></a><a href=\"Main.dc.html\" onClick=\"{{navOut}}\" aria-label=\"Vista 2: mosaico\" style=\"display:flex\"><span data-tip=\"Vista 2: mosaico\" style=\"width:30px;height:30px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;flex:none;\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2\" y=\"2\" width=\"5\" height=\"5\" rx=\"1\"/><rect x=\"9\" y=\"2\" width=\"5\" height=\"5\" rx=\"1\"/><rect x=\"2\" y=\"9\" width=\"5\" height=\"5\" rx=\"1\"/><rect x=\"9\" y=\"9\" width=\"5\" height=\"5\" rx=\"1\"/></svg></span></a></div></div><div class=\"sec-c\"><span aria-label=\"Principal (sección actual)\" aria-current=\"page\" style=\"display:flex\"><span data-tip=\"Principal\" style=\"width:30px;height:30px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;flex:none;box-shadow:0 0 0 2px var(--pill),0 0 0 4px #fff;\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2\" y=\"2\" width=\"5\" height=\"5\" rx=\"1\"/><rect x=\"9\" y=\"2\" width=\"5\" height=\"5\" rx=\"1\"/><rect x=\"2\" y=\"9\" width=\"12\" height=\"5\" rx=\"1\"/></svg></span></span><a href=\"Archivo.dc.html\" onClick=\"{{navOut}}\" aria-label=\"Archivo\" style=\"display:flex\"><span data-tip=\"Archivo\" style=\"width:30px;height:30px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;flex:none;\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2\" y=\"2.5\" width=\"12\" height=\"4.5\" rx=\"1.2\"/><rect x=\"2\" y=\"9\" width=\"12\" height=\"4.5\" rx=\"1.2\"/></svg></span></a><a href=\"Anotador.dc.html\" onClick=\"{{navOut}}\" aria-label=\"Anotador\" style=\"display:flex\"><span data-tip=\"Anotador\" style=\"width:30px;height:30px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;flex:none;\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 13l1-3.5L11 2.5l2.5 2.5L6.5 12z\"/></svg></span></a></div><div class=\"sec-r\"><div class=\"sec-x\"><button onClick=\"{{openR}}\" aria-label=\"Reglas y ajustes\" style=\"display:flex\"><span data-tip=\"Reglas y ajustes\" style=\"width:30px;height:30px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;flex:none;\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"8\" r=\"2.2\"/><path d=\"M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4\"/></svg></span></button></div></div></div>\n\n  <!-- Pieza: ver y editar -->\n  <sc-if value=\"{{edOn}}\" hint-placeholder-val=\"{{false}}\">\n    <div class=\"mdl {{xEd}}\" style=\"position:absolute;inset:0;z-index:30;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center\">\n      <button onClick=\"{{edClose}}\" aria-label=\"Cerrar pieza\" tabindex=\"-1\" style=\"position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:transparent;cursor:default\"></button>\n      <div class=\"pn box\" role=\"dialog\" aria-label=\"{{pe.title}}\" style=\"position:relative;width:min(1240px,calc(100% - 48px));height:min(716px,calc(100% - 120px));display:flex;overflow:hidden\">\n        <div style=\"flex:1;min-width:0;background:var(--field);display:flex;align-items:center;justify-content:center;padding:28px;box-sizing:border-box\">\n          <sc-if value=\"{{pe.isImg}}\" hint-placeholder-val=\"{{true}}\"><img src=\"{{pe.src}}\" alt=\"{{pe.title}}\" style=\"max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;display:block\"></sc-if><sc-if value=\"{{pe.isVid}}\" hint-placeholder-val=\"{{false}}\"><video src=\"{{pe.src}}\" ref=\"{{vref}}\" muted loop playsinline controls style=\"max-width:100%;max-height:100%;border-radius:6px;display:block\"></video></sc-if>\n          <sc-if value=\"{{pe.isLink}}\" hint-placeholder-val=\"{{false}}\"><div style=\"text-align:center;max-width:560px\"><div style=\"font-size:13px\">{{pe.dom}}</div><div style=\"font-size:30px;font-weight:700;margin:10px 0 22px;overflow-wrap:anywhere\">{{pe.title}}</div><a class=\"ob\" href=\"{{pe.href}}\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-flex;text-decoration:none\">Abrir sitio</a></div></sc-if>\n          <sc-if value=\"{{pe.isText}}\" hint-placeholder-val=\"{{false}}\"><textarea class=\"in ta3\" rows=\"14\" value=\"{{pe.text}}\" onInput=\"{{pe.onText}}\" aria-label=\"Texto guardado\" style=\"height:100%;border-radius:12px;font-size:16px;resize:none\"></textarea></sc-if>\n        </div>\n        <div style=\"width:440px;flex:none;padding:22px 24px;box-sizing:border-box;display:flex;flex-direction:column;overflow:auto\">\n          <div style=\"display:flex;align-items:center;justify-content:space-between\"><div style=\"font-size:13px;font-weight:600\">{{pe.kind}} · {{pe.date}}<span style=\"display:block;font-size:11px;font-weight:400;opacity:.85;margin-top:2px\">{{pe.size}}</span></div><button class=\"ob\" onClick=\"{{edClose}}\" aria-label=\"Cerrar pieza\" style=\"width:32px;padding:0\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.6\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M2 2l8 8M10 2l-8 8\"/></svg></button></div>\n          <label class=\"lbl\" for=\"ed-ti\">Título</label>\n          <input class=\"in\" id=\"ed-ti\" value=\"{{pe.title}}\" onInput=\"{{pe.onTitle}}\" placeholder=\"Sin título\">\n          <label class=\"lbl\" for=\"ed-no\">Nota</label>\n          <textarea class=\"in ta3\" id=\"ed-no\" rows=\"3\" value=\"{{pe.note}}\" onInput=\"{{pe.onNote}}\" placeholder=\"Por qué lo guardaste, dónde lo vas a usar…\"></textarea>\n          <label class=\"lbl\" for=\"ed-ur\">Sitio web</label>\n          <input class=\"in\" id=\"ed-ur\" value=\"{{pe.url}}\" onInput=\"{{pe.onUrl}}\" placeholder=\"https://…\">\n          <sc-if value=\"{{pe.hasAuto}}\" hint-placeholder-val=\"{{false}}\"><div style=\"font-size:12px;font-weight:600;margin:14px 0 6px\">Etiquetas automáticas (por el sitio)</div><div><sc-for list=\"{{pe.auto}}\" as=\"g\" hint-placeholder-count=\"2\"><span class=\"rz-tag\">#{{g.t}}</span></sc-for></div></sc-if>\n          <label class=\"lbl\" for=\"ed-tg\">Tus etiquetas</label>\n          <input class=\"in\" id=\"ed-tg\" value=\"{{pe.tags}}\" onInput=\"{{pe.onTags}}\" placeholder=\"paleta, hud (separadas por coma)\">\n          <label class=\"lbl\" for=\"ed-bo\">Tablero</label>\n          <select class=\"in sel3\" id=\"ed-bo\" onChange=\"{{pe.onBoard}}\"><sc-for list=\"{{pe.bopts}}\" as=\"o\" hint-placeholder-count=\"2\"><option value=\"{{o.v}}\" selected=\"{{o.sel}}\">{{o.l}}</option></sc-for></select>\n          <div style=\"font-size:12px;margin-top:10px;opacity:.85\">Los cambios se guardan solos.</div>\n          <div style=\"flex:1;min-height:16px\"></div>\n          <div style=\"display:flex;gap:8px;justify-content:space-between\">\n            <button class=\"ob\" onClick=\"{{pe.del}}\" style=\"background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)\">{{pe.delLbl}}</button>\n            <button class=\"ob\" onClick=\"{{edClose}}\">Listo</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </sc-if>\n  <sc-if value=\"{{sOn}}\" hint-placeholder-val=\"{{false}}\">\n  <div class=\"{{sCls}}\" style=\"position:absolute;inset:0;z-index:40\">\n    <button class=\"velo\" onClick=\"{{closeS}}\" aria-label=\"Cerrar buscador\" style=\"position:absolute;inset:0;width:100%;height:100%;background:var(--velo);border:0;padding:0;cursor:default\"></button>\n    <div class=\"panel\" style=\"position:absolute;left:50%;margin-left:-230px;top:20px;width:460px;transform-origin:top center;color:#fff\">\n      <div style=\"height:40px;background:var(--pill);border-radius:30px;display:flex;align-items:center;gap:10px;padding:0 6px 0 16px;box-sizing:border-box;font-size:14px;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.08),inset 0 1px 1.5px rgba(255,255,255,.12)\">\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.4\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"7\" cy=\"7\" r=\"4.5\"/><path d=\"M10.5 10.5L14 14\"/></svg>\n        <span style=\"flex:1;color:#ececec\">Buscar…</span>\n        <button class=\"x\" onClick=\"{{closeS}}\" aria-label=\"Cerrar buscador\" style=\"width:28px;height:28px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;border:0;padding:0;cursor:pointer\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.6\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M2 2l8 8M10 2l-8 8\"/></svg></button>\n      </div>\n      <div class=\"pin\" style=\"margin-top:6px;background:var(--pill);border-radius:14px;padding:14px;box-sizing:border-box;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.08);\">\n        <div style=\"display:flex;justify-content:space-between;font-size:11px;font-weight:600;margin-bottom:10px\"><span>Recientes</span></div>\n        <div style=\"font-size:12px;opacity:.8\">Todavía no buscaste nada.</div>\n        <div style=\"font-size:11px;font-weight:600;margin:16px 0 10px\">Guardado recientemente</div>\n        <sc-if value=\"{{srecNone}}\" hint-placeholder-val=\"{{true}}\"><div style=\"font-size:12px;opacity:.8\">Lo que guardes va a aparecer acá.</div></sc-if><div style=\"display:flex;gap:8px;overflow:hidden;margin-right:-14px\"><sc-for list=\"{{srec}}\" as=\"v\" hint-placeholder-count=\"0\"><div class=\"vt\" style=\"flex:none;width:110px;height:72px;background:var(--chip);border-radius:6px;overflow:hidden;--d:{{v.d}};\"><sc-if value=\"{{v.isImg}}\" hint-placeholder-val=\"{{false}}\"><img src=\"{{v.src}}\" alt=\"{{v.title}}\" style=\"width:100%;height:100%;object-fit:cover;display:block\"></sc-if><sc-if value=\"{{v.isVid}}\" hint-placeholder-val=\"{{false}}\"><video src=\"{{v.src}}\" ref=\"{{vref}}\" muted loop playsinline style=\"width:100%;height:100%;object-fit:cover;display:block\"></video></sc-if><sc-if value=\"{{v.noImg}}\" hint-placeholder-val=\"{{false}}\"><span style=\"display:block;height:100%;box-sizing:border-box;padding:8px;font-size:11px;font-weight:600;line-height:1.25;color:#111;overflow:hidden\">{{v.title}}</span></sc-if></div></sc-for></div>\n      </div>\n    </div>\n  </div>\n  </sc-if>\n  <!-- Reglas y ajustes (se abre con el engranaje) -->\n  <sc-if value=\"{{rOn}}\" hint-placeholder-val=\"{{false}}\">\n  <div class=\"{{rCls}}\" style=\"position:absolute;inset:0;z-index:50;color:#fff;font-family:'Inter',system-ui,sans-serif\">\n    <button class=\"rz-v\" onClick=\"{{closeR}}\" aria-label=\"Cerrar ajustes\" style=\"position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:rgba(0,0,0,.55);cursor:default\"></button>\n    <div class=\"rz-p\" role=\"dialog\" aria-label=\"Reglas y ajustes\" style=\"position:absolute;left:50%;margin-left:-550px;top:max(16px,calc(50% - 366px));width:1100px;height:min(732px,calc(100% - 32px));background:var(--pill);border-radius:18px;border:1px solid rgba(255,255,255,.14);box-shadow:0 12px 40px rgba(0,0,0,.35);display:flex;flex-direction:column;overflow:hidden\">\n      <div style=\"display:flex;align-items:center;justify-content:space-between;padding:20px 24px 16px;border-bottom:1px solid rgba(255,255,255,.14)\">\n        <div style=\"font-size:22px;font-weight:700\">Reglas y ajustes</div>\n        <button class=\"rz-b\" onClick=\"{{closeR}}\" aria-label=\"Cerrar ajustes\" style=\"width:34px;padding:0\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.6\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M2 2l8 8M10 2l-8 8\"/></svg></button>\n      </div>\n      <div style=\"display:flex;flex:1;min-height:0\">\n        <div style=\"width:210px;flex:none;padding:16px 12px;border-right:1px solid rgba(255,255,255,.14);box-sizing:border-box\">\n          <sc-for list=\"{{rTabs}}\" as=\"t\" hint-placeholder-count=\"4\"><button class=\"rz-t\" onClick=\"{{t.pick}}\" style=\"background:{{t.bg}}\">{{t.label}}</button></sc-for>\n          <div style=\"margin-top:22px;padding:0 14px;font-size:12px;line-height:1.5;opacity:.75\">Proyecto activo<br><b style=\"font-size:13px;opacity:1\">{{rProjName}}</b></div>\n        </div>\n        <div style=\"flex:1;min-width:0;display:flex;min-height:0\">\n\n          <!-- Reglas -->\n          <sc-if value=\"{{rt.reglas}}\" hint-placeholder-val=\"{{true}}\">\n          <div style=\"width:430px;flex:none;padding:20px 20px 16px 24px;box-sizing:border-box;display:flex;flex-direction:column;min-height:0;border-right:1px solid rgba(255,255,255,.14)\">\n            <div style=\"font-size:16px;font-weight:700\">Reglas de organización</div>\n            <div style=\"font-size:12px;line-height:1.5;opacity:.8;margin:6px 0 14px\">Se aplican en orden. La primera regla que define un tablero decide dónde va la pieza; las etiquetas de todas las reglas que coinciden se suman.</div>\n            <div style=\"flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:8px\">\n              <sc-for list=\"{{rules}}\" as=\"r\" hint-placeholder-count=\"4\">\n                <div class=\"rz-r\" role=\"button\" tabindex=\"0\" onClick=\"{{r.pick}}\" onKeyDown=\"{{r.key}}\" style=\"border-color:{{r.bd}};background:{{r.bg}}\">\n                  <span style=\"width:20px;flex:none;text-align:center;font-size:12px;font-weight:700;opacity:.7\">{{r.n}}</span>\n                  <span style=\"flex:1;min-width:0;opacity:{{r.op}}\"><span style=\"display:block;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis\">{{r.name}}</span><span style=\"display:block;font-size:11px;opacity:.8;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis\">{{r.sum}}</span></span>\n                  <button class=\"rz-b s\" onClick=\"{{r.up}}\" aria-label=\"Subir regla\" style=\"opacity:{{r.upOp}}\">↑</button>\n                  <button class=\"rz-b s\" onClick=\"{{r.down}}\" aria-label=\"Bajar regla\" style=\"opacity:{{r.downOp}}\">↓</button>\n                  <button class=\"rz-sw\" role=\"switch\" aria-checked=\"{{r.on}}\" aria-label=\"Activar regla\" onClick=\"{{r.toggle}}\" style=\"background:{{r.swBg}};--l:{{r.swL}}\"></button>\n                </div>\n              </sc-for>\n            </div>\n            <div style=\"display:flex;gap:8px;margin-top:14px;flex-wrap:wrap\">\n              <button class=\"rz-b\" onClick=\"{{addRule}}\">+ Nueva regla</button>\n              <button class=\"rz-b o\" onClick=\"{{reapply}}\">Reaplicar a Sin clasificar</button>\n            </div>\n            <div style=\"font-size:12px;min-height:18px;margin-top:10px;opacity:.9\">{{rMsg}}</div>\n          </div>\n          <div style=\"flex:1;min-width:0;padding:20px 24px 16px 22px;box-sizing:border-box;overflow:auto\">\n            <sc-if value=\"{{hasSel}}\" hint-placeholder-val=\"{{true}}\">\n              <div style=\"display:flex;align-items:center;justify-content:space-between\"><div style=\"font-size:16px;font-weight:700\">Editar regla</div><div style=\"font-size:11px;opacity:.7\">Los cambios se guardan solos</div></div>\n              <label style=\"display:block;font-size:12px;font-weight:600;margin:16px 0 6px\" for=\"rz-name\">Nombre</label>\n              <input class=\"rz-i\" id=\"rz-name\" value=\"{{ed.name}}\" onInput=\"{{ed.onName}}\" placeholder=\"Nombre de la regla\">\n              <div style=\"display:flex;align-items:center;justify-content:space-between;margin:20px 0 8px\"><div style=\"font-size:12px;font-weight:600\">Condiciones</div>\n                <div style=\"display:flex;gap:6px;align-items:center;font-size:12px\"><span style=\"opacity:.75\">Coinciden</span><button class=\"rz-b s\" onClick=\"{{ed.mAll}}\" style=\"background:{{ed.mAllBg}}\">todas</button><button class=\"rz-b s\" onClick=\"{{ed.mAny}}\" style=\"background:{{ed.mAnyBg}}\">alguna</button></div></div>\n              <div style=\"display:flex;flex-direction:column;gap:8px\">\n                <sc-for list=\"{{ed.conds}}\" as=\"c\" hint-placeholder-count=\"2\">\n                  <div style=\"display:flex;gap:8px;align-items:center\">\n                    <select class=\"rz-s\" aria-label=\"Tipo de condición\" onChange=\"{{c.onKind}}\" style=\"width:170px;flex:none\"><sc-for list=\"{{c.kinds}}\" as=\"o\" hint-placeholder-count=\"4\"><option value=\"{{o.v}}\" selected=\"{{o.sel}}\">{{o.l}}</option></sc-for></select>\n                    <sc-if value=\"{{c.isText}}\" hint-placeholder-val=\"{{true}}\"><input class=\"rz-i\" value=\"{{c.v}}\" onInput=\"{{c.onVal}}\" placeholder=\"{{c.ph}}\" aria-label=\"Valor de la condición\"></sc-if>\n                    <sc-if value=\"{{c.isSel}}\" hint-placeholder-val=\"{{false}}\"><select class=\"rz-s\" aria-label=\"Valor de la condición\" onChange=\"{{c.onVal}}\"><sc-for list=\"{{c.opts}}\" as=\"o\" hint-placeholder-count=\"3\"><option value=\"{{o.v}}\" selected=\"{{o.sel}}\">{{o.l}}</option></sc-for></select></sc-if>\n                    <button class=\"rz-b s\" onClick=\"{{c.del}}\" aria-label=\"Quitar condición\" style=\"opacity:{{c.delOp}}\">×</button>\n                  </div>\n                </sc-for>\n              </div>\n              <button class=\"rz-b o s\" onClick=\"{{ed.addCond}}\" style=\"margin-top:10px\">+ Condición</button>\n              <div style=\"font-size:12px;font-weight:600;margin:22px 0 8px\">Entonces</div>\n              <div style=\"display:flex;gap:8px;align-items:center;margin-bottom:10px\"><span style=\"font-size:12px;width:86px;flex:none;opacity:.85\">Mover a</span>\n                <select class=\"rz-s\" aria-label=\"Tablero de destino\" onChange=\"{{ed.onTo}}\"><sc-for list=\"{{ed.tos}}\" as=\"o\" hint-placeholder-count=\"5\"><option value=\"{{o.v}}\" selected=\"{{o.sel}}\">{{o.l}}</option></sc-for></select></div>\n              <div style=\"display:flex;gap:8px;align-items:center\"><span style=\"font-size:12px;width:86px;flex:none;opacity:.85\">Etiquetar</span>\n                <input class=\"rz-i\" value=\"{{ed.tags}}\" onInput=\"{{ed.onTags}}\" placeholder=\"paleta, hud (separadas por coma)\" aria-label=\"Etiquetas\"></div>\n              <div style=\"margin:12px 0 0 94px;min-height:26px\"><sc-for list=\"{{ed.chips}}\" as=\"g\" hint-placeholder-count=\"2\"><span class=\"rz-tag\">#{{g.t}}</span></sc-for></div>\n              <div style=\"margin-top:22px;padding-top:16px;border-top:1px solid rgba(255,255,255,.14);display:flex;justify-content:space-between;align-items:center\"><div style=\"font-size:12px;opacity:.75;max-width:300px;line-height:1.45\">{{ed.sum}}</div><button class=\"rz-b o\" onClick=\"{{ed.del}}\">Eliminar regla</button></div>\n            </sc-if>\n            <sc-if value=\"{{noSel}}\" hint-placeholder-val=\"{{false}}\"><div style=\"height:100%;display:flex;align-items:center;justify-content:center;text-align:center;font-size:13px;opacity:.7;padding:0 40px\">Elegí una regla de la lista o creá una nueva.</div></sc-if>\n          </div>\n          </sc-if>\n\n          <!-- Tableros -->\n          <sc-if value=\"{{rt.tableros}}\" hint-placeholder-val=\"{{false}}\">\n          <div style=\"flex:1;padding:20px 28px;overflow:auto\">\n            <div style=\"font-size:16px;font-weight:700\">Tableros</div>\n            <div style=\"font-size:12px;line-height:1.5;opacity:.8;margin:6px 0 16px\">Las colecciones donde se guardan tus piezas. Las reglas mandan las piezas nuevas a un tablero; lo que no coincide queda en Sin clasificar.</div>\n            <div style=\"display:flex;flex-direction:column;gap:8px;max-width:620px\">\n              <sc-for list=\"{{rBoards}}\" as=\"b\" hint-placeholder-count=\"5\"><div class=\"rz-r\" style=\"cursor:default\"><span style=\"flex:1;font-size:14px;font-weight:600\">{{b.name}}</span><span style=\"font-size:12px;opacity:.8\">{{b.count}} piezas · {{b.rules}}</span></div></sc-for>\n            </div>\n          </div>\n          </sc-if>\n\n          <!-- Proyectos -->\n          <sc-if value=\"{{rt.proyectos}}\" hint-placeholder-val=\"{{false}}\">\n          <div style=\"flex:1;padding:20px 28px;overflow:auto\">\n            <div style=\"font-size:16px;font-weight:700\">Proyectos</div>\n            <div style=\"font-size:12px;line-height:1.5;opacity:.8;margin:6px 0 16px\">El proyecto activo se usa en las reglas con la condición \"Proyecto activo\" y en lo que guarda la extensión.</div>\n            <div style=\"display:flex;flex-direction:column;gap:8px;max-width:620px\">\n              <sc-for list=\"{{rProjs}}\" as=\"p\" hint-placeholder-count=\"3\"><button class=\"rz-r\" onClick=\"{{p.pick}}\" aria-pressed=\"{{p.active}}\" style=\"border-color:{{p.bd}}\"><span style=\"width:16px;height:16px;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;flex:none\"><span style=\"width:8px;height:8px;border-radius:50%;background:#fff;opacity:{{p.dot}}\"></span></span><span style=\"flex:1;font-size:14px;font-weight:600\">{{p.name}}</span><span style=\"font-size:12px;opacity:.8\">{{p.state}}</span></button></sc-for>\n            </div>\n          </div>\n          </sc-if>\n\n          <!-- Nube y copia -->\n          <sc-if value=\"{{rt.copia}}\" hint-placeholder-val=\"{{false}}\">\n          <div style=\"flex:1;padding:20px 28px;overflow:auto\">\n            <div style=\"font-size:16px;font-weight:700\">Nube y copia local</div>\n            <div style=\"font-size:12px;line-height:1.5;opacity:.85;margin:6px 0 16px;max-width:620px\">Tu librería se guarda en la nube para abrirla desde cualquier computadora. Además podés bajar una copia a este equipo y restaurarla cuando quieras.</div>\n            <div class=\"rz-r\" style=\"cursor:default;max-width:620px\">\n              <span style=\"flex:1;min-width:0\"><span style=\"display:block;font-size:14px;font-weight:600\">Sincronizar en la nube</span><span style=\"display:block;font-size:12px;opacity:.85;margin-top:2px\">{{rCloud.status}}</span></span>\n              <button class=\"rz-b o s\" onClick=\"{{rCloud.sync}}\" style=\"height:30px\">Sincronizar ahora</button>\n              <button class=\"rz-sw\" role=\"switch\" aria-checked=\"{{rCloud.on}}\" aria-label=\"Sincronizar en la nube\" onClick=\"{{rCloud.toggle}}\" style=\"background:{{rCloud.swBg}};--l:{{rCloud.swL}}\"></button>\n            </div>\n            <div style=\"font-size:12px;opacity:.75;margin:8px 0 22px;max-width:620px\">Maqueta: la cuenta en la nube se conecta en la app real. Ahora tenés {{rCloud.count}}.</div>\n            <div style=\"font-size:14px;font-weight:700;margin-bottom:8px\">Copia local</div>\n            <div style=\"display:flex;gap:8px;flex-wrap:wrap\"><button class=\"rz-b\" onClick=\"{{rExport}}\">Exportar copia (.json)</button><button class=\"rz-b o\" onClick=\"{{rImport}}\">Importar copia</button></div>\n            <a ref=\"{{rDlRef}}\" download=\"archivero-copia.json\" href=\"#\" tabindex=\"-1\" aria-hidden=\"true\" style=\"display:none\">copia</a>\n            <input type=\"file\" accept=\"application/json,.json\" ref=\"{{rImpRef}}\" onChange=\"{{rImpFile}}\" style=\"display:none\" tabindex=\"-1\" aria-hidden=\"true\">\n            <div style=\"font-size:12px;min-height:18px;margin-top:12px;opacity:.9\">{{rMsg}}</div>\n            <div style=\"margin-top:16px;max-width:620px;display:flex;flex-direction:column;gap:8px\">\n              <sc-for list=\"{{rPrefs}}\" as=\"o\" hint-placeholder-count=\"2\"><div class=\"rz-r\" style=\"cursor:default\"><span style=\"flex:1;font-size:14px;font-weight:600\">{{o.label}}</span><button class=\"rz-sw\" role=\"switch\" aria-checked=\"{{o.on}}\" aria-label=\"{{o.label}}\" onClick=\"{{o.toggle}}\" style=\"background:{{o.swBg}};--l:{{o.swL}}\"></button></div></sc-for>\n            </div>\n            <div style=\"margin-top:22px;font-size:12px;opacity:.7\">Atajo para guardar: Alt+Shift+S · clic derecho sobre imágenes y texto</div>\n          </div>\n          </sc-if>\n          <!-- Apariencia -->\n          <sc-if value=\"{{rt.apariencia}}\" hint-placeholder-val=\"{{false}}\">\n          <div style=\"flex:1;padding:20px 28px;overflow:auto\">\n            <div style=\"font-size:16px;font-weight:700\">Apariencia</div>\n            <div style=\"font-size:12px;line-height:1.5;opacity:.85;margin:6px 0 16px\">Se aplica a todas las pantallas de la librería.</div>\n            <div style=\"font-size:12px;font-weight:600;margin-bottom:8px\">Modo</div>\n            <div style=\"display:flex;gap:8px;margin-bottom:20px\"><sc-for list=\"{{ap.modes}}\" as=\"o\" hint-placeholder-count=\"2\"><button class=\"rz-b s\" onClick=\"{{o.pick}}\" aria-pressed=\"{{o.on}}\" style=\"height:32px;padding:0 16px;background:{{o.bg}};color:#111\">{{o.l}}</button></sc-for></div>\n            <div style=\"font-size:12px;font-weight:600;margin-bottom:8px\">Paleta</div>\n            <div style=\"display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-bottom:20px;max-width:660px\">\n              <sc-for list=\"{{ap.pals}}\" as=\"o\" hint-placeholder-count=\"12\"><button class=\"rz-r\" onClick=\"{{o.pick}}\" aria-pressed=\"{{o.on}}\" style=\"border-color:{{o.bd}};padding:8px 10px;gap:8px\"><span style=\"display:flex;flex:none\" aria-hidden=\"true\"><span style=\"width:14px;height:22px;border-radius:4px 0 0 4px;background:{{o.c1}}\"></span><span style=\"width:14px;height:22px;background:{{o.c2}}\"></span><span style=\"width:14px;height:22px;border-radius:0 4px 4px 0;background:{{o.c3}}\"></span></span><span style=\"font-size:13px;font-weight:600\">{{o.l}}</span></button></sc-for>\n            </div>\n            <div style=\"font-size:12px;font-weight:600;margin-bottom:8px\">Tipografía principal (títulos)</div>\n            <div style=\"display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px\"><sc-for list=\"{{ap.f1}}\" as=\"o\" hint-placeholder-count=\"5\"><button class=\"rz-r\" onClick=\"{{o.pick}}\" aria-pressed=\"{{o.on}}\" style=\"width:auto;border-color:{{o.bd}};padding:8px 14px\"><span style=\"font-size:18px;font-weight:700;font-family:{{o.ff}}\">Aa</span><span style=\"font-size:13px;font-family:{{o.ff}}\">{{o.l}}</span></button></sc-for></div>\n            <div style=\"font-size:12px;font-weight:600;margin-bottom:8px\">Tipografía secundaria (texto)</div>\n            <div style=\"display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px\"><sc-for list=\"{{ap.f2}}\" as=\"o\" hint-placeholder-count=\"5\"><button class=\"rz-r\" onClick=\"{{o.pick}}\" aria-pressed=\"{{o.on}}\" style=\"width:auto;border-color:{{o.bd}};padding:8px 14px\"><span style=\"font-size:18px;font-family:{{o.ff}}\">Aa</span><span style=\"font-size:13px;font-family:{{o.ff}}\">{{o.l}}</span></button></sc-for></div>\n            <div style=\"font-size:12px;font-weight:600;margin-bottom:8px\">Pantalla completa: imágenes menores a 1920×1080</div>\n            <div style=\"display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-width:660px\"><sc-for list=\"{{ap.fits}}\" as=\"o\" hint-placeholder-count=\"4\"><button class=\"rz-r\" onClick=\"{{o.pick}}\" aria-pressed=\"{{o.on}}\" style=\"border-color:{{o.bd}};flex-direction:column;align-items:flex-start;gap:3px\"><span style=\"font-size:13px;font-weight:600\">{{o.l}}</span><span style=\"font-size:11px;opacity:.85;line-height:1.4\">{{o.d}}</span></button></sc-for></div>\n          </div>\n          </sc-if>\n        </div>\n      </div>\n    </div>\n  </div>\n  </sc-if>\n</div>";

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { index: 0, entered: false, n: 0, open: false, m: 0, tn: 0, sq: 'off', rq: 'off', rtab: 'reglas', rsel: 'r1', rrev: 0, rmsg: '', rproj: 0 };
    this.lockUntil = 0;
    this.iv = null; this.iv2 = null; this.t1 = null; this.t2 = null;
  }
  componentDidMount() {
    this.t1 = setTimeout(() => { this.setState({ entered: true }); this.typeTitle(); }, 150);
    this.tiv = setInterval(() => { const tn = this.state.tn + 1; this.setState({ tn }); if (tn >= 40) clearInterval(this.tiv); }, 40);
  }
  componentWillUnmount() { clearInterval(this.iv); clearInterval(this.iv2); clearTimeout(this.t1); clearTimeout(this.t2); clearInterval(this.tiv); clearTimeout(this.t3); }
  names() { return this.order().map((i) => i.title || 'Sin título'); }
  infoLines(i) { return this.itemInfo(this.order()[i || 0]); }
  order() {
    const all = this.allItems();
    if (!this._perm) { this._perm = all.map((x) => x.id); for (let i = this._perm.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = this._perm[i]; this._perm[i] = this._perm[j]; this._perm[j] = t; } }
    const ids = all.map((x) => x.id);
    const known = this._perm.filter((id) => ids.indexOf(id) >= 0);
    this._perm = ids.filter((id) => known.indexOf(id) < 0).concat(known);
    return this._perm.map((id) => all.find((x) => x.id === id));
  }
  shuffle() { if (this.state.open) return; this._perm = null; this.setState({ index: 0, n: 0 }); this.typeTitle(); }
  typeTitle() {
    clearInterval(this.iv);
    this.setState({ n: 0 });
    clearTimeout(this.t2);
    this.t2 = setTimeout(() => {
      const len = (this.names()[this.state.index] || '').length;
      this.iv = setInterval(() => {
        const n = this.state.n + 1;
        this.setState({ n });
        if (n >= len) clearInterval(this.iv);
      }, 60);
    }, 350);
  }
  go(delta) {
    if (this.state.open) return;
    const now = Date.now();
    if (now < this.lockUntil) return;
    const next = Math.max(0, Math.min(Math.max(0, this.names().length - 1), this.state.index + delta));
    if (next === this.state.index) return;
    this.lockUntil = now + 1100;
    this.setState({ index: next, n: 0 });
    this.typeTitle();
  }
  toggle() {
    if (!this.state.entered || !this.names().length) return;
    if (!this.state.open) {
      clearInterval(this.iv2);
      this.setState({ open: true, m: 0 });
      const sit = this.order()[this.state.index]; if (sit) { this.lib().selId = sit.id; this.commitNow(); }
      const total = this.infoLines(this.state.index).join('').length;
      this.t1 = setTimeout(() => {
        this.iv2 = setInterval(() => {
          const m = this.state.m + 4;
          this.setState({ m });
          if (m >= total) clearInterval(this.iv2);
        }, 30);
      }, 500);
    } else {
      clearInterval(this.iv2);
      clearTimeout(this.t1);
      this.setState({ open: false });
      this.t1 = setTimeout(() => this.setState({ m: 0 }), 1200);
    }
  }

  R() {
    if (!this.rules) {
      this.rseq = 4;
      this.rules = [
        { id: 'r1', name: 'Pinterest → Referencias', on: true, match: 'any', conds: [{ k: 'dom', v: 'pinterest.com' }], to: '', tags: 'referencia' },
        { id: 'r2', name: 'Paleta y color', on: true, match: 'any', conds: [{ k: 'kw', v: 'paleta, color, colores' }], to: '', tags: 'paleta' },
        { id: 'r3', name: 'Lo que guardo en mi proyecto', on: true, match: 'all', conds: [{ k: 'proj', v: 'Interfaz western' }, { k: 'tipo', v: 'imagen' }], to: '', tags: 'interfaz-western' },
        { id: 'r4', name: 'Capturas de pantalla', on: false, match: 'all', conds: [{ k: 'tipo', v: 'captura' }], to: '', tags: 'captura' }
      ];
      this.rprojs = ['Interfaz western', 'Tren de la morgue', 'Estudio Manteca Games'];
      this.rprefs = [{ label: 'Aplicar reglas al guardar', on: true }, { label: 'Mostrar aviso al guardar', on: true }, { label: 'Guardar también una copia automática en este equipo', on: false }];
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
    const TOS = [''].concat(this.lib().boards.map((b) => b.name), ['Sin clasificar']);
    const kname = (k) => KINDS.find((x) => x[0] === k)[1];
    const sumOf = (r) => (r.conds.length ? r.conds.map((c) => (c.k === 'proj' ? 'proyecto = ' : kname(c.k).toLowerCase() + ': ') + (c.v || '…')).join(r.match === 'all' ? ' y ' : ' o ') : 'sin condiciones') + ' → ' + (r.to || 'sin cambiar tablero') + (r.tags.trim() ? ' · ' + r.tags.split(',').map((t) => '#' + t.trim()).filter((t) => t.length > 1).join(' ') : '');
    const sel = rules.find((r) => r.id === st.rsel);
    const move = (i, d) => { const j = i + d; if (j < 0 || j >= rules.length) return; const t = rules[i]; rules[i] = rules[j]; rules[j] = t; this.rbump(); };
    const rlist = rules.map((r, i) => ({
      n: i + 1, name: r.name || 'Regla sin nombre', sum: sumOf(r), on: r.on, op: r.on ? 1 : 0.5,
      bd: r.id === st.rsel ? '#fff' : 'transparent', bg: r.id === st.rsel ? 'rgba(255,255,255,.16)' : 'rgba(255,255,255,.06)',
      upOp: i === 0 ? 0.35 : 1, downOp: i === rules.length - 1 ? 0.35 : 1,
      swBg: r.on ? 'var(--chip)' : 'var(--sw)', swL: r.on ? '19px' : '3px',
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
        mAllBg: sel.match === 'all' ? '#fff' : 'var(--chip)', mAnyBg: sel.match === 'any' ? '#fff' : 'var(--chip)',
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
    const tabs = [['reglas', 'Reglas'], ['tableros', 'Tableros'], ['proyectos', 'Proyectos'], ['apariencia', 'Apariencia'], ['copia', 'Nube y copia']];
    const tab = st.rtab;
    const cnt = { 'Sin clasificar': 0 }; this.lib().boards.forEach((b) => { cnt[b.name] = this.lib().items.filter((i) => i.bid === b.id).length; });
    return {
      openR: () => this.openR(), closeR: () => this.closeR(),
      rOn: st.rq !== 'off', rCls: st.rq === 'out' ? 'rz out' : 'rz',
      rTabs: tabs.map(([k, l]) => ({ label: l, bg: tab === k ? 'rgba(255,255,255,.16)' : 'transparent', pick: () => this.setState({ rtab: k, rmsg: '' }) })),
      rt: { reglas: tab === 'reglas', tableros: tab === 'tableros', proyectos: tab === 'proyectos', copia: tab === 'copia', apariencia: tab === 'apariencia' },
      rProjName: this.rprojs[st.rproj || 0],
      rules: rlist, hasSel: !!sel, noSel: !sel, ed, rMsg: st.rmsg,
      addRule: () => { const id = 'r' + (++this.rseq); rules.push({ id, name: 'Nueva regla', on: true, match: 'all', conds: [{ k: 'kw', v: '' }], to: '', tags: '' }); this.setState({ rsel: id, rrev: st.rrev + 1 }); },
      reapply: () => {
        const act = rules.filter((r) => r.on && r.to && r.to !== 'Sin clasificar').length;
        const moved = Math.min(cnt['Sin clasificar'], act * 3);
        this.setState({ rmsg: act ? 'Listo: ' + moved + ' piezas clasificadas, ' + (cnt['Sin clasificar'] - moved) + ' siguen en Sin clasificar.' : 'No hay reglas activas que muevan piezas a un tablero.' });
      },
      rBoards: this.lib().boards.map((b) => b.name).concat(['Sin clasificar']).map((n) => { const k = rules.filter((r) => r.to === n).length; return { name: n, count: cnt[n], rules: k ? k + (k === 1 ? ' regla' : ' reglas') + ' apuntan acá' : 'sin reglas' }; }),
      rProjs: this.rprojs.map((p, i) => ({ name: p, active: (st.rproj || 0) === i, dot: (st.rproj || 0) === i ? 1 : 0, bd: (st.rproj || 0) === i ? '#fff' : 'transparent', state: (st.rproj || 0) === i ? 'Activo' : 'Hacer activo', pick: () => this.setState({ rproj: i }) })),
      rPrefs: this.rprefs.map((o) => ({ label: o.label, on: o.on, swBg: o.on ? 'var(--chip)' : 'var(--sw)', swL: o.on ? '19px' : '3px', toggle: () => { o.on = !o.on; this.rbump(); } })),
      rCloud: (() => { const L = this.lib(); const c = L.cloud || (L.cloud = { on: true, last: Date.now() }); return {
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
      }; })()
    };
  }
  lib() {
    if (!this._lib) {
      let d = null;
      try { const r = window.localStorage.getItem('archivero.lib.v1'); if (r) d = JSON.parse(r); } catch (e) { d = null; }
      if (!d || !Array.isArray(d.boards) || !Array.isArray(d.items)) d = { boards: [], items: [], bsort: 'recent', bman: [], seq: 1, last: null };
      this._lib = d;
      if (!this._lw) { this._lw = true; try { window.addEventListener('storage', (e) => { if (e.key === 'archivero.lib.v1') { this._lib = null; this._ml = false; this.forceUpdate(); } if (e.key === 'archivero.ui.v1') { this._ui = null; this.forceUpdate(); } }); } catch (e) {} this.mediaDB(() => {}); try { window.addEventListener('resize', () => this.forceUpdate()); } catch (e) {} }
    }
    return this._lib;
  }
  uid() { const L = this.lib(); L.seq = (L.seq || 1) + 1; return 'p' + Date.now().toString(36) + L.seq; }
  commit() { this.setState({ lrev: (this.state.lrev || 0) + 1 }); clearTimeout(this.wt); this.wt = setTimeout(() => { try { window.localStorage.setItem('archivero.lib.v1', JSON.stringify(this.lib())); } catch (e) {} }, 300); }
  mediaDB(cb) {
    if (this._db) return cb(this._db);
    if (this._dbFail) return cb(null);
    if (this._dbq) { this._dbq.push(cb); return; }
    this._dbq = [cb];
    const done = (db) => { const q = this._dbq || []; this._dbq = null; q.forEach((f) => f(db)); };
    try {
      const rq = window.indexedDB.open('archivero', 1);
      rq.onupgradeneeded = () => { try { rq.result.createObjectStore('media'); } catch (e) {} };
      rq.onsuccess = () => { this._db = rq.result; done(this._db); };
      rq.onerror = () => { this._dbFail = true; done(null); };
    } catch (e) { this._dbFail = true; done(null); }
  }
  mediaLoad() {
    if (this._ml) return; this._ml = true; this._media = this._media || {};
    this.mediaDB((db) => {
      if (!db) return;
      try {
        const rq = db.transaction('media', 'readonly').objectStore('media').openCursor();
        rq.onsuccess = () => { const c = rq.result; if (c) { this._media[c.key] = c.value; c.continue(); } else this.forceUpdate(); };
      } catch (e) {}
    });
  }
  mediaPut(id, v) {
    this._media = this._media || {}; this._media[id] = v;
    this.mediaDB((db) => { if (!db) return; try { db.transaction('media', 'readwrite').objectStore('media').put(v, id); } catch (e) {} });
  }
  mediaDel(id) {
    if (this._media) delete this._media[id];
    this.mediaDB((db) => { if (!db) return; try { db.transaction('media', 'readwrite').objectStore('media').delete(id); } catch (e) {} });
  }
  srcOf(it) {
    if (!it) return '';
    if (it.src) return it.src;
    this.mediaLoad();
    const v = (this._media || {})[it.id];
    if (!v) return '';
    if (typeof v === 'string') return v;
    this._urls = this._urls || {};
    if (!this._urls[it.id]) { try { this._urls[it.id] = URL.createObjectURL(v); } catch (e) { return ''; } }
    return this._urls[it.id];
  }
  vref() { return (el) => {
    if (!el || el._ap) return; el._ap = true;
    try { el.muted = true; el.loop = true; el.playsInline = true; el.setAttribute('muted', ''); } catch (e) {}
    const play = () => { try { const p = el.play(); if (p && p.catch) p.catch(() => {}); } catch (e) {} };
    try { const io = new IntersectionObserver((es) => { es.forEach((x) => { if (x.isIntersecting) play(); else { try { el.pause(); } catch (e) {} } }); }, { threshold: 0.05 }); io.observe(el); } catch (e) { play(); }
  }; }
  thumbOf(it) { if (!it) return ''; if (it.th) { const t = this.srcOf({ id: 'thumb:' + it.id }); if (t) return t; } return this.srcOf(it); }
  isVis(it) { return it && (it.kind === 'img' || it.kind === 'video'); }
  siteTags(u) {
    const d = this.dom(u); if (!d) return [];
    const M = [['pinterest', ['pinterest', 'referencia']], ['behance', ['behance', 'portfolio']], ['artstation', ['artstation', 'arte']], ['dribbble', ['dribbble', 'ui']], ['youtube', ['youtube', 'video']], ['youtu.be', ['youtube', 'video']], ['vimeo', ['vimeo', 'video']], ['instagram', ['instagram', 'foto']], ['tiktok', ['tiktok', 'video']], ['twitter', ['twitter']], ['x.com', ['x']], ['reddit', ['reddit']], ['deviantart', ['deviantart', 'arte']], ['unsplash', ['unsplash', 'foto']], ['pexels', ['pexels', 'foto']], ['figma', ['figma', 'ui']], ['github', ['github', 'código']], ['cosmos.so', ['cosmos', 'referencia']], ['are.na', ['arena', 'referencia']], ['fonts.google', ['tipografía']], ['sketchfab', ['sketchfab', '3d']], ['itch.io', ['itchio', 'juegos']], ['steam', ['steam', 'juegos']], ['tumblr', ['tumblr']], ['spotify', ['spotify', 'música']], ['soundcloud', ['soundcloud', 'música']], ['flickr', ['flickr', 'foto']], ['giphy', ['giphy', 'gif']]];
    for (let i = 0; i < M.length; i++) if (d.indexOf(M[i][0]) >= 0) return M[i][1].slice();
    const parts = d.split('.'); return [parts.length > 1 ? parts[parts.length - 2] : d];
  }
  ui() {
    if (!this._ui) {
      let d = null; try { d = JSON.parse(window.localStorage.getItem('archivero.ui.v1') || 'null'); } catch (e) { d = null; }
      this._ui = Object.assign({ pal: 'grafito', mode: 'light', f1: 'Inter', f2: 'Inter', fit: 'blur' }, d || {});
    }
    return this._ui;
  }
  uiSet(p) { Object.assign(this.ui(), p); try { window.localStorage.setItem('archivero.ui.v1', JSON.stringify(this._ui)); } catch (e) {} this.forceUpdate(); }
  pals() { return [['grafito', 'Grafito', 0, 0], ['pizarra', 'Pizarra', 215, 14], ['oceano', 'Océano', 205, 38], ['turquesa', 'Turquesa', 178, 30], ['bosque', 'Bosque', 145, 22], ['musgo', 'Musgo', 80, 20], ['arena', 'Arena', 38, 24], ['ambar', 'Ámbar', 30, 46], ['terracota', 'Terracota', 14, 40], ['vino', 'Vino', 345, 32], ['rosa', 'Rosa', 325, 30], ['lavanda', 'Lavanda', 262, 24]]; }
  palTones(H, S, dark) {
    const c = (l, s) => 'hsl(' + H + ' ' + (s == null ? S : s) + '% ' + l + '%)';
    return dark
      ? { ink: c(92, Math.min(S, 12)), bg: c(9), t1: c(24), t2: c(21), t3: c(27), t4: c(19), pill: c(30), pillh: c(36), chip: c(84), muted: c(78), field: c(19), sw: c(46), velo: 'hsl(' + H + ' ' + S + '% 9% / .6)' }
      : { ink: c(10, Math.min(S, 20)), bg: c(85), t1: c(69), t2: c(66), t3: c(72), t4: c(64), pill: c(34), pillh: c(41), chip: c(85), muted: c(32), field: c(27), sw: c(51), velo: 'hsl(' + H + ' ' + S + '% 85% / .55)' };
  }
  fonts() { return [['Inter', "'Inter',system-ui,sans-serif"], ['Manrope', "'Manrope',system-ui,sans-serif"], ['Space Grotesk', "'Space Grotesk',system-ui,sans-serif"], ['Fraunces', "'Fraunces',Georgia,serif"], ['JetBrains Mono', "'JetBrains Mono',ui-monospace,monospace"]]; }
  uiVars() {
    const u = this.ui();
    const p = this.pals().find((x) => x[0] === u.pal) || this.pals()[0];
    const T = this.palTones(p[2], p[3], u.mode === 'dark');
    const F = this.fonts(); const f1 = (F.find((x) => x[0] === u.f1) || F[0])[1], f2 = (F.find((x) => x[0] === u.f2) || F[0])[1];
    return Object.keys(T).map((k) => '--' + k + ':' + T[k]).join(';') + ';--f1:' + f1 + ';--f2:' + f2;
  }
  stageFit() { return (el) => { if (!el || el._sf) return; el._sf = true; const f = () => { const s = Math.min(el.clientWidth / 1440, el.clientHeight / 900) || 1; if (Math.abs(s - (this.state.fs || 1)) > 0.002) this.setState({ fs: s }); }; f(); try { new ResizeObserver(f).observe(el); } catch (e) { try { window.addEventListener('resize', f); } catch (er) {} } }; }
  commitNow() { clearTimeout(this.wt); try { window.localStorage.setItem('archivero.lib.v1', JSON.stringify(this.lib())); } catch (e) {} this.setState({ lrev: (this.state.lrev || 0) + 1 }); }
  embKind(u) { const d = this.dom(u); if (/spotify|soundcloud/.test(d)) return 'audio'; if (/(^|\.)x\.com$|twitter/.test(d)) return 'post'; if (/youtube|youtu\.be|vimeo/.test(d)) return 'video'; if (/tiktok/.test(d)) return 'vertical'; return 'web'; }
  shapeOf(it) {
    if (it.kind === 'text') {
      const L = (it.text || '').length;
      const a = L < 140 ? 1.8 : L < 420 ? 2.4 : L < 900 ? 3.2 : 4.4;
      return { a, c: 2, lab: 'texto ' + (L < 140 ? 'corto' : L < 420 ? 'medio' : 'largo') };
    }
    if (it.kind === 'link') {
      const k = this.embKind(it.url);
      if (k === 'audio') return { a: 0.82, c: 2, lab: 'música embebida · cuadrada' };
      if (k === 'post') return { a: 1.6, c: 2, lab: 'publicación embebida · horizontal' };
      if (k === 'video') return { a: 1.45, c: 1, lab: 'video embebido' };
      if (k === 'vertical') return { a: 0.62, c: 2, lab: 'video vertical embebido' };
      return { a: 1.5, c: 1, lab: 'enlace embebido' };
    }
    const ow = it.ow || it.w || 800, oh = it.oh || it.h || 800, r = ow / oh, px = Math.max(ow, oh);
    const c = px < 720 ? 1 : px < 1600 ? 2 : 3;
    const fmt = r >= 1.6 ? 'panorámica' : r <= 0.8 ? 'vertical' : r >= 1.15 ? 'horizontal' : 'cuadrada';
    return { a: Math.max(0.4, Math.min(3.4, r)), c, lab: ['', 'chica', 'mediana', 'grande'][c] + ' · ' + fmt + ' · ' + ow + '×' + oh + (it.kind === 'video' ? ' · video' : it.gif ? ' · gif' : '') };
  }
  sizeOf(it) { return this.shapeOf(it); }
  pack(its, W, G0) {
    const G = G0 == null ? 16 : G0;
    const HC = { 1: 220, 2: 310, 3: 430 };
    const meta = its.map((it) => { const z = this.shapeOf(it); return { it, a: z.a, hc: HC[z.c], lab: z.lab }; });
    const sumA = (r) => r.reduce((t, m) => t + m.a, 0);
    const tgt = (r) => r.reduce((t, m) => t + m.hc, 0) / r.length;
    const hOf = (r) => (W - G * (r.length - 1)) / sumA(r);
    const rows = []; let cur = [];
    meta.forEach((m) => {
      cur.push(m);
      if (hOf(cur) <= tgt(cur)) {
        if (cur.length > 1) { const prev = cur.slice(0, -1); if (Math.abs(hOf(prev) - tgt(prev)) < Math.abs(hOf(cur) - tgt(cur)) && hOf(prev) < tgt(prev) * 1.35) { rows.push(prev); cur = [m]; return; } }
        rows.push(cur); cur = [];
      }
    });
    if (cur.length) { if (rows.length && hOf(cur) > tgt(cur) * 1.4) rows[rows.length - 1] = rows[rows.length - 1].concat(cur); else rows.push(cur); }
    const out = []; let y = 0;
    rows.forEach((r) => {
      let h = hOf(r); const capped = h > 620; if (capped) h = 620;
      let x = 0;
      r.forEach((m, k) => {
        let w = m.a * h; if (!capped && k === r.length - 1) w = W - x;
        let clip = false;
        if (m.it.kind === 'text') { const cpl = Math.max(10, (w - 44) / 8.6); const lines = (m.it.text || '').split('\n').reduce((t, ln) => t + Math.max(1, Math.ceil(ln.length / cpl)), 0); clip = 42 + (m.it.title ? 30 : 0) + lines * 23 > h; }
        out.push({ it: m.it, z: { lab: m.lab, clip }, x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) });
        x += w + G;
      });
      y += h + G;
    });
    return { cards: out, H: Math.max(0, Math.round(y - G)) };
  }
  mbox(it) {
    if (it.kind === 'text') { const L = (it.text || '').length; return L < 140 ? [250, 140] : L < 420 ? [320, 190] : [400, 240]; }
    if (it.kind === 'link') { const k = this.embKind(it.url); return k === 'audio' ? [320, 320] : k === 'post' ? [330, 200] : k === 'video' ? [400, 290] : k === 'vertical' ? [240, 400] : [300, 210]; }
    const ow = it.ow || it.w || 800, oh = it.oh || it.h || 800, r = ow / oh, px = Math.max(ow, oh);
    const Lg = px < 720 ? 270 : px < 1600 ? 420 : 580;
    let w = r >= 1 ? Lg : Lg * r, h = r >= 1 ? Lg / r : Lg;
    const q = Math.min(1, ow / w, oh / h); w *= q; h *= q;
    return [Math.max(120, w), Math.max(90, h)];
  }
  tmap(list, x, y, w, h, G, out) {
    if (!list.length) return;
    if (list.length === 1) { out.push({ m: list[0], x, y, w, h }); return; }
    const tot = list.reduce((t, m) => t + m.A, 0);
    let acc = 0, k = 0;
    while (k < list.length - 1 && acc + list[k].A / 2 < tot / 2) { acc += list[k].A; k++; }
    if (k === 0) { acc = list[0].A; k = 1; }
    const fa = acc / tot, a = list.slice(0, k), b = list.slice(k);
    if (w >= h) { const wa = Math.round((w - G) * fa); this.tmap(a, x, y, wa, h, G, out); this.tmap(b, x + wa + G, y, w - wa - G, h, G, out); }
    else { const ha = Math.round((h - G) * fa); this.tmap(a, x, y, w, ha, G, out); this.tmap(b, x, y + ha + G, w, h - ha - G, G, out); }
  }
  mchunk(its, VW, VH, G) {
    const key = its.map((i) => i.id).join(',') + '|' + VW + 'x' + VH;
    if (this._mc && this._mc.key === key) return this._mc;
    const boxes = its.map((it) => { const b = this.mbox(it); return { it, A: b[0] * b[1] }; });
    const S = boxes.reduce((t, b) => t + b.A, 0) * 1.1;
    const W = Math.round(Math.max(VW, Math.sqrt(S * 1.7))), H = Math.round(Math.max(VH, S / Math.max(VW, Math.sqrt(S * 1.7))));
    const cache = {}; const self = this;
    const mc = { key, W, H, cells(ci, cj) {
      const k = ci + ',' + cj; if (cache[k]) return cache[k];
      let seed = (Math.abs(ci * 7919 + cj * 104729) % 233279) + 1;
      const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      const list = boxes.slice();
      if (ci !== 0 || cj !== 0) for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = list[i]; list[i] = list[j]; list[j] = t; }
      const out = []; self.tmap(list, 0, 0, W, H, G, out);
      cache[k] = out.map((c) => ({ it: c.m.it, x: c.x, y: c.y, w: c.w, h: c.h }));
      return cache[k];
    } };
    this._mc = mc; return mc;
  }
  fichaVals(forceId, onClose) {
    const st = this.state, L = this.lib();
    const id = forceId || st.edId;
    const E = id ? L.items.find((x) => x.id === id) : null;
    const close = () => { if (this.state.closing) return; this.setState({ closing: 'ed' }); clearTimeout(this.ct); this.ct = setTimeout(() => { this.setState({ closing: null, edId: null, fdel: false }); if (onClose) onClose(); }, 320); };
    let pe = {};
    if (E) {
      const up = (k) => (e) => { E[k] = e.target.value; this.commit(); };
      pe = {
        isImg: E.kind === 'img', isVid: E.kind === 'video', isLink: E.kind === 'link', isText: E.kind === 'text',
        kind: E.kind === 'img' ? (E.gif ? 'GIF' : 'Imagen') : E.kind === 'video' ? 'Video' : E.kind === 'link' ? 'Enlace' : 'Texto', date: this.fdate(E.t),
        size: 'Tamaño en el tablero: ' + this.shapeOf(E).lab,
        auto: (E.atags || []).map((t) => ({ t })), hasAuto: (E.atags || []).length > 0,
        src: this.srcOf(E), text: E.text || '', dom: this.dom(E.url), href: E.url || '#',
        title: E.title || '', note: E.note || '', url: E.url || '', tags: E.tags || '',
        onTitle: up('title'), onNote: up('note'), onText: up('text'), onTags: up('tags'),
        onUrl: (e) => { E.url = e.target.value; E.atags = E.url.trim() ? this.siteTags(E.url.trim()) : []; this.commit(); },
        onBoard: (e) => { E.bid = e.target.value; this.commit(); },
        bopts: L.boards.map((b) => ({ v: b.id, l: b.name, sel: b.id === E.bid })),
        delLbl: st.fdel ? 'Tocá de nuevo para eliminar' : 'Eliminar pieza',
        del: () => { if (!this.state.fdel) { this.setState({ fdel: true }); return; } this.mediaDel(E.id); L.items = L.items.filter((x) => x.id !== E.id); this.commitNow(); this.setState({ edId: null, fdel: false }); if (onClose) onClose(); }
      };
    }
    return { edOn: !!E, pe, edClose: close, xEd: st.closing === 'ed' ? 'out' : '' };
  }
  bname(id) { const b = this.lib().boards.find((x) => x.id === id); return b ? b.name : 'Sin tablero'; }
  fdate(t) { const d = new Date(t); const p = (n) => String(n).padStart(2, '0'); return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + String(d.getFullYear()).slice(2) + ', ' + p(d.getHours()) + ':' + p(d.getMinutes()) + 'hs'; }
  dom(u) { if (!u) return ''; try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return String(u).replace(/^https?:\/\//, '').split('/')[0]; } }
  tagsOf(it) { if (!it) return ''; const a = (it.atags || []).concat(String(it.tags || '').split(',')).map((t) => String(t).trim().replace(/^#/, '')).filter(Boolean); return a.filter((t, i) => a.indexOf(t) === i).map((t) => '#' + t).join(' '); }
  allItems() { return this.lib().items.slice().sort((a, b) => b.t - a.t); }
  itemInfo(it) {
    if (!it) return [];
    const out = [];
    if (it.kind === 'text' && it.text) out.push('Texto: ' + it.text.slice(0, 160) + (it.text.length > 160 ? '…' : ''));
    if (it.note) out.push('Nota: ' + it.note);
    if (it.url) out.push('Sitio web: ' + this.dom(it.url));
    out.push('Fecha: ' + this.fdate(it.t));
    out.push('Tablero: ' + this.bname(it.bid));
    const tg = this.tagsOf(it); if (tg) out.push('Etiquetas: ' + tg);
    return out;
  }
  libVals() {
    const its = this.allItems().slice(0, 8);
    return {
      srec: its.map((it, i) => ({ src: this.srcOf(it), title: it.title || 'Sin título', isImg: it.kind === 'img', isVid: it.kind === 'video', noImg: !this.isVis(it), d: (0.3 + i * 0.05).toFixed(2) + 's' })), vref: this.vref(), uiVars: this.uiVars(),
      scrIn: (() => { if (!this._si) { this._si = true; setTimeout(() => { this._siDone = true; this.forceUpdate(); }, 950); } return this._siDone ? '0' : '1'; })(),
      leaving: this.state.leaving ? '1' : '0',
      navOut: () => {}, stageFit: this.stageFit(), fs: this.state.fs || 1,
      srecNone: its.length === 0, libEmpty: this.lib().items.length === 0, libAny: this.lib().items.length > 0
    };
  }
  renderVals() {
    let { index, entered, n, open, m, tn } = this.state;
    const ITEMS = this.order(); const N = ITEMS.length;
    index = Math.min(index, Math.max(0, N - 1));
    const FIT = this.ui().fit || 'blur';
    const FITS = [['blur', 'fondo desenfocado'], ['color', 'color de fondo'], ['frame', 'marco a tamaño real'], ['cover', 'ampliar y recortar']];
    const ty = (full, off) => { const c = Math.max(0, tn - off); return { t: full.slice(0, c), c: tn >= off && c < full.length }; };
    const s = ty('Buscar…', 2);
    const EX = 'cubic-bezier(.19,1,.22,1)';
    const names = this.names();
    const tones = ['var(--t1)', 'var(--t2)', 'var(--t3)', 'var(--t4)', 'var(--t3)'];
    const pieces = names.map((name, i) => {
      const d = i - index;
      const lines = this.infoLines(i);
      const act = d === 0;
      const o = act && open;
      const typing = act && entered && n < name.length;
      const typed = act ? (entered ? name.slice(0, n) : '') : name;
      let left = act ? m : 0;
      const totalChars = lines.join('').length;
      let curDone = false;
      const ls = lines.map((t) => {
        const part = t.slice(0, Math.max(0, left));
        const here = act && open && m < totalChars && !curDone && part.length < t.length;
        if (here) curDone = true;
        left -= t.length;
        return { t: part, c: here };
      });
      return {
        name, typed, cur: typing,
        tab: act ? '0' : '-1', expanded: o ? 'true' : 'false',
        tags: this.tagsOf(ITEMS[i]),
        ...(() => {
          const it = ITEMS[i]; const vis = this.isVis(it); const src = vis ? this.srcOf(it) : '';
          const ow = (it && (it.ow || it.w)) || 0, oh = (it && (it.oh || it.h)) || 0;
          const big = ow >= 1920 && oh >= 1080;
          const mode = !vis ? 'none' : big ? 'cover' : FIT;
          const cov = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover';
          const fit = 'position:absolute;left:6%;top:260px;width:88%;height:calc(100% - 520px);object-fit:contain';
          const frm = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);max-width:80%;max-height:calc(100% - 560px);width:auto;height:auto;padding:18px;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,.35)';
          return {
            src, fgImg: vis && it.kind === 'img', fgVid: vis && it.kind === 'video',
            blur: mode === 'blur', blurImg: mode === 'blur' && it.kind === 'img', blurVid: mode === 'blur' && it.kind === 'video',
            fgStyle: mode === 'cover' ? cov : mode === 'frame' ? frm : fit,
            bgCol: mode === 'color' ? ((it && it.avg) || 'var(--t1)') : mode === 'frame' ? 'var(--bg)' : 'transparent',
            fan: 'fa-' + FIT, ban: 'fb-' + FIT,
            fitTag: !vis ? '' : big ? 'Ocupa la pantalla (' + ow + '×' + oh + ')' : 'Menor a 1920×1080 (' + ow + '×' + oh + ')'
          };
        })(),
        boxStyle: 'background:' + tones[i % 5] + ';transform:translate3d(0,' + (d * 100) + '%,0);z-index:' + (act ? 2 : 1),
        imgStyle: 'transform:translate3d(0,' + (-d * 180 + (o ? -90 : 0)) + 'px,0)',
        darkStyle: 'opacity:' + (o ? 0.62 : 0),
        closerStyle: 'pointer-events:' + (o ? 'auto' : 'none') + ';cursor:' + (o ? 'pointer' : 'default'),
        titleStyle: 'transform:translate3d(0,calc(' + (-d * 135) + 'px' + (o ? ' - 50vh + 150px' : ' + 0px') + '),0)', tsz: name.length > 30 ? 34 : name.length > 18 ? 46 : 64,
        infoStyle: 'opacity:' + (o ? 1 : 0) + ';transform:translate3d(0,' + (o ? 0 : 640) + 'px,0);transition:transform 1.1s ' + EX + ',opacity ' + (o ? '.7s ' + EX + ' .15s' : '.35s linear'),
        linkPE: (o && m >= totalChars) ? 'auto' : 'none', linkOp: (o && m >= totalChars) ? 1 : 0, linkTab: (o && m >= totalChars) ? '0' : '-1',
        lines: ls
      };
    });
    return {
      ...this.libVals(),
      pieces,
      counter: N ? String(index + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0') : '',
      shuffle: () => this.shuffle(),
      ...this.fichaVals(),
      openFicha: () => { const it = ITEMS[index]; if (it) this.setState({ edId: it.id }); },
      fitLbl: (FITS.find((x) => x[0] === FIT) || FITS[0])[1],
      cycleFit: () => { const k = FITS.findIndex((x) => x[0] === FIT); this.uiSet({ fit: FITS[(k + 1) % FITS.length][0] }); },
      curFitTag: N ? (pieces[index] || {}).fitTag || '' : '',
      wheel: (e) => { if (Math.abs(e.deltaY) > 8) this.go(e.deltaY > 0 ? 1 : -1); },
      prev: () => this.go(-1),
      next: () => this.go(1),
      toggle: () => this.toggle(),
      s, sOn: this.state.sq !== 'off', sCls: this.state.sq === 'out' ? 'bz out' : 'bz',
      openS: () => { clearTimeout(this.t3); this.setState({ sq: 'in' }); },
      closeS: () => { if (this.state.sq !== 'in') return; this.setState({ sq: 'out' }); this.t3 = setTimeout(() => this.setState({ sq: 'off' }), 640); },
      ...this.rulesVals()
    };
  }
}

export { Component };
