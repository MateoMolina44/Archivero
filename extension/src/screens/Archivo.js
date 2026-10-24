// GENERADO por scripts/import-design.mjs desde diseno/project/Archivo.dc.html — no editar a mano.
import { DCLogic } from '../dc/runtime.js';

export const name = "Archivo";
export const props = {};
export const css = "body{margin:0}\na{text-decoration:none;color:inherit}\n.sec{position:absolute;left:50%;bottom:20px;transform:translateX(-50%);z-index:9;height:44px}\n.sec-c,.sec-x{background:var(--pill);border-radius:30px;height:44px;display:flex;align-items:center;box-sizing:border-box;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.08),inset 0 1px 1.5px rgba(255,255,255,.12)}\n.sec-c{gap:12px;padding:0 12px}\n.sec-x{gap:8px;padding:0 7px;white-space:nowrap}\n.sec-l,.sec-r{position:absolute;bottom:0;height:44px;opacity:0;visibility:hidden;pointer-events:none;filter:blur(4px);transition:opacity .25s cubic-bezier(.4,0,.2,1),transform .45s cubic-bezier(.4,0,.2,1),filter .35s cubic-bezier(.4,0,.2,1),visibility 0s .45s}\n.sec-l{right:100%;padding-right:8px;transform:translateX(18px) scale(.85);transform-origin:right center}\n.sec-r{left:100%;padding-left:8px;transform:translateX(-18px) scale(.85);transform-origin:left center}\n.sec:hover .sec-l,.sec:hover .sec-r,.sec:focus-within .sec-l,.sec:focus-within .sec-r,.sec.show .sec-l,.sec.show .sec-r{opacity:1;visibility:visible;pointer-events:auto;transform:none;filter:none;transition-delay:0s}\n.sec button{border:0;padding:0;background:none;font:inherit;cursor:pointer}\n.sec a>span,.sec button>span{transition:transform .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}\n.sec a:hover>span,.sec button:hover>span{background:#fff!important;transform:scale(1.08)}\n.sec a:active>span,.sec button:active>span{transform:scale(.95)}\n.sec a:focus-visible,.sec button:focus-visible{outline:2px solid #fff;outline-offset:2px;border-radius:50%}\n@media (prefers-reduced-motion:reduce){.sec-l,.sec-r,.sec a>span,.sec button>span{transition-duration:.01ms!important}}\n.sb{position:absolute;left:50%;top:20px;width:320px;transform:translateX(-50%);transition:width .5s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1),transform .15s cubic-bezier(.4,0,.2,1),box-shadow .15s cubic-bezier(.4,0,.2,1);border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.08),inset 0 1px 1.5px rgba(255,255,255,.12)}\n.sb:hover,.sb:focus-visible{background:var(--pillh)!important}\n.sb:active{transform:translateX(-50%) scale(.98)}\n.sb:focus-visible{outline:2px solid #fff;outline-offset:3px}\n.sb svg{transition:transform .5s cubic-bezier(.4,0,.2,1)}.sb:hover svg{transform:scale(1.12)}\n.shm{white-space:nowrap;color:transparent;-webkit-text-fill-color:transparent;background-image:linear-gradient(100deg,transparent 35%,rgba(255,255,255,.95) 50%,transparent 65%),linear-gradient(#c9c9c9,#c9c9c9);background-size:250% 100%,auto;background-clip:text;-webkit-background-clip:text;animation:shm 2.2s linear infinite}\n@keyframes shm{0%{background-position:100% center,0 0}100%{background-position:0% center,0 0}}\n@keyframes enter{0%{opacity:0;filter:blur(2px)}100%{opacity:1;filter:blur(0)}}\n@keyframes scale-in{0%{opacity:0;transform:scale(.95)}100%{opacity:1;transform:scale(1)}}\n@keyframes slide-in{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:translateY(0)}}\n@media (prefers-reduced-motion:reduce){.sec-c,.sec-x,.sb,.shm,.sec-x a>span{transition-duration:.01ms!important;animation:none!important}}\n.ti{transition:transform .7s cubic-bezier(.4,0,.2,1),filter .7s cubic-bezier(.4,0,.2,1)}\n.tile:hover .ti,.tile:focus-visible .ti{transform:scale(1.06)}\n.ov{opacity:0;transition:opacity .4s cubic-bezier(.4,0,.2,1)}\n.tile:hover .ov,.tile:focus-visible .ov{opacity:1}\n.tile:focus-visible{outline:2px solid var(--pill);outline-offset:2px}\n.mos:hover .tile:not(:hover) .ti{filter:brightness(.92)}\n@keyframes tile-in{0%{opacity:0;filter:blur(2px);transform:scale(.95)}100%{opacity:1;filter:blur(0);transform:scale(1)}}\n@media (prefers-reduced-motion:reduce){.tile{animation:none!important}.ti,.ov{transition-duration:.01ms!important}}\n\n.cur{display:inline-block;width:.5em;height:.85em;background:currentColor;vertical-align:-.08em;margin-left:2px}\n.cur{display:inline-block;width:.5em;height:.85em;background:currentColor;vertical-align:-.08em;margin-left:2px}\n@keyframes bar-in{0%{margin-left:-160px;width:320px}100%{margin-left:-230px;width:460px}}\n@keyframes bar-out{0%{margin-left:-230px;width:460px}100%{margin-left:-160px;width:320px}}\n@keyframes drop-in{0%{opacity:0;clip-path:inset(0 0 100% 0)}100%{opacity:1;clip-path:inset(0 0 0 0)}}\n@keyframes drop-out{0%{opacity:1;clip-path:inset(0 0 0 0)}100%{opacity:0;clip-path:inset(0 0 100% 0)}}\n@keyframes slide-out{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(24px)}}\n@keyframes fade-out{0%{opacity:1}100%{opacity:0}}\n.bz .velo{animation:enter .35s cubic-bezier(.4,0,.2,1) both}\n.bz .panel{animation:bar-in .5s cubic-bezier(.4,0,.2,1) both}\n.bz .pin{animation:drop-in .5s cubic-bezier(.4,0,.2,1) .12s both}\n.bz .chip,.bz .vt{animation:slide-in .5s cubic-bezier(.4,0,.2,1) both;animation-delay:var(--d)}\n.bz.out .panel{animation:bar-out .45s cubic-bezier(.4,0,.2,1) .15s both!important}.bz.out .pin{animation:drop-out .3s cubic-bezier(.4,0,.2,1) both!important}.bz.out .chip,.bz.out .vt{animation:slide-out .3s cubic-bezier(.4,0,.2,1) both!important}.bz.out .velo{animation:fade-out .45s cubic-bezier(.4,0,.2,1) .1s both!important}\n.chip{transition:transform .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}.chip:hover{background:#fff!important;transform:scale(1.04)}.chip:active{transform:scale(.95)}\n.vt{transition:transform .7s cubic-bezier(.4,0,.2,1)}.vt:hover{transform:scale(1.04)}\n.x{transition:transform .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}.x:hover{background:#fff!important;transform:scale(1.08)}.x:active{transform:scale(.95)}\n.x:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.fv{font-size:14px;position:relative;display:inline-block;color:#fff;text-decoration:none}\n.fv::after{content:\"\";position:absolute;left:0;bottom:-2px;width:100%;height:1px;background:currentColor;transform:scaleX(0);transform-origin:right center;transition:transform .7s cubic-bezier(.19,1,.22,1)}\n.fv:hover::after{transform:scaleX(1);transform-origin:left center}\n@media (prefers-reduced-motion:reduce){.bz .velo,.bz .panel,.bz .pin,.bz .chip,.bz .vt,.bz.out .panel,.bz.out .pin,.bz.out .chip,.bz.out .vt,.bz.out .velo{animation-duration:.01ms!important;animation-delay:0s!important}}\nbutton.tile{border:0;padding:0;font:inherit;color:inherit;cursor:pointer;text-align:inherit}\n\n@keyframes rz-in{0%{opacity:0;transform:translateY(18px) scale(.98)}100%{opacity:1;transform:none}}\n@keyframes rz-out{0%{opacity:1;transform:none}100%{opacity:0;transform:translateY(18px) scale(.98)}}\n@keyframes rz-fade{0%{opacity:0}100%{opacity:1}}\n@keyframes rz-fade-out{0%{opacity:1}100%{opacity:0}}\n.rz .rz-v{animation:rz-fade .35s cubic-bezier(.19,1,.22,1) both}.rz .rz-p{animation:rz-in .6s cubic-bezier(.19,1,.22,1) both}\n.rz.out .rz-v{animation:rz-fade-out .45s cubic-bezier(.19,1,.22,1) .05s both!important}.rz.out .rz-p{animation:rz-out .4s cubic-bezier(.19,1,.22,1) both!important}\n.rz-t{display:block;width:100%;text-align:left;border:0;background:none;color:#fff;font:inherit;font-size:14px;font-weight:600;padding:10px 14px;border-radius:30px;cursor:pointer;transition:background-color .15s cubic-bezier(.4,0,.2,1)}\n.rz-t:hover{background:rgba(255,255,255,.1)}.rz-t:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.rz-b{height:34px;padding:0 16px;border-radius:30px;background:var(--chip);color:#111;border:0;font:inherit;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;transition:transform .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}\n.rz-b:hover{background:#fff;transform:scale(1.03)}.rz-b:active{transform:scale(.96)}.rz-b:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.rz-b.o{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.35)}.rz-b.o:hover{background:rgba(255,255,255,.12)}\n.rz-b.s{height:28px;min-width:28px;padding:0 8px;font-size:12px}\n.rz-i,.rz-s{width:100%;box-sizing:border-box;height:36px;border-radius:30px;border:1px solid rgba(255,255,255,.2);background:var(--field);color:#fff;font:inherit;font-size:13px;padding:0 14px;outline:none}\n.rz-i:focus,.rz-s:focus{border-color:#fff}.rz-s{appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg,transparent 50%,#fff 50%),linear-gradient(135deg,#fff 50%,transparent 50%);background-position:calc(100% - 18px) 15px,calc(100% - 13px) 15px;background-size:5px 5px;background-repeat:no-repeat;padding-right:34px}\n.rz-s option{color:#111}\n.rz-r{display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;border:1px solid transparent;background:rgba(255,255,255,.06);color:#fff;font:inherit;border-radius:12px;padding:10px 12px;cursor:pointer;text-align:left;transition:background-color .15s cubic-bezier(.4,0,.2,1),border-color .15s cubic-bezier(.4,0,.2,1)}\n.rz-r:hover{background:rgba(255,255,255,.12)}.rz-r:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.rz-sw{position:relative;flex:none;width:38px;height:22px;border-radius:30px;border:0;padding:0;cursor:pointer;transition:background-color .25s cubic-bezier(.4,0,.2,1)}\n.rz-sw::after{content:\"\";position:absolute;top:3px;left:var(--l);width:16px;height:16px;border-radius:50%;background:var(--pill);transition:left .25s cubic-bezier(.4,0,.2,1)}\n.rz-sw:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.rz-tag{display:inline-block;background:var(--chip);color:#111;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600;margin:0 6px 6px 0}\n@media (prefers-reduced-motion:reduce){.rz .rz-v,.rz .rz-p,.rz.out .rz-v,.rz.out .rz-p{animation-duration:.01ms!important;animation-delay:0s!important}.rz-t,.rz-b,.rz-r,.rz-sw,.rz-sw::after{transition-duration:.01ms!important}}\n.nb{height:44px;padding:0 18px;border-radius:30px;background:var(--pill);color:#fff;border:1px solid rgba(255,255,255,.12);font:inherit;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:8px;white-space:nowrap;box-shadow:0 3px 12px rgba(0,0,0,.08);transition:background-color .15s cubic-bezier(.4,0,.2,1),transform .15s cubic-bezier(.4,0,.2,1),opacity .4s cubic-bezier(.4,0,.2,1)}\n.nb:hover{background:var(--pillh)}.nb:active{transform:scale(.97)}.nb:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.nb.ic{width:44px;padding:0;justify-content:center}\n.ob{height:32px;min-width:32px;padding:0 12px;border-radius:30px;background:var(--chip);color:#111;border:0;font:inherit;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}\n.ob:hover{background:#fff;transform:scale(1.05)}.ob:active{transform:scale(.95)}.ob:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.pn{background:var(--pill);border-radius:14px;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.12);color:#fff}\n.pr{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;border:0;background:none;color:#fff;font:inherit;font-size:13px;padding:9px 12px;border-radius:8px;cursor:pointer;text-align:left}\n.pr:hover{background:rgba(255,255,255,.1)}\n.mdl{animation:enter .35s cubic-bezier(.4,0,.2,1) both}.mdl .box{animation:scale-in .5s cubic-bezier(.19,1,.22,1) both}\n.in{width:100%;box-sizing:border-box;height:40px;border-radius:30px;border:1px solid rgba(255,255,255,.2);background:var(--field);color:#fff;font:inherit;font-size:14px;padding:0 16px;outline:none}\n.in:focus{border-color:#fff}\n.scr{scrollbar-width:thin;scrollbar-color:var(--t1) transparent}\n.mb,.mb2{border:0;padding:0;background:var(--pill);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:opacity .2s cubic-bezier(.4,0,.2,1),transform .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}\n.mb{position:absolute;right:12px;top:12px;width:32px;height:32px;opacity:0;z-index:2}\n.mb2{width:36px;height:36px;border:1px solid rgba(255,255,255,.12)}\n.bt:hover .mb,.pc:hover .mb,.mb:focus-visible{opacity:1}\n.mb:hover,.mb2:hover{background:var(--pillh);transform:scale(1.08)}.mb:active,.mb2:active{transform:scale(.95)}\n.mb:focus-visible,.mb2:focus-visible{outline:2px solid #fff;outline-offset:2px}\n.pc .mb{right:8px;top:8px;width:28px;height:28px}\n.bt,.pc{transition:opacity .2s cubic-bezier(.4,0,.2,1),outline-color .2s cubic-bezier(.4,0,.2,1)}\n.lb{transition:opacity .3s cubic-bezier(.4,0,.2,1)}.tile:hover .lb,.tile:focus-visible .lb{opacity:0}\nbutton.card{display:block;width:100%;border:0;padding:0;margin:0;border-radius:10px;overflow:hidden;cursor:pointer;background:var(--t1);position:relative;text-align:left;font:inherit;color:#fff}\n.card .ov{opacity:0;transition:opacity .3s cubic-bezier(.4,0,.2,1)}.card:hover .ov,.card:focus-visible .ov{opacity:1}\n.card img{transition:transform .7s cubic-bezier(.4,0,.2,1)}.card:hover img{transform:scale(1.04)}\n.card:focus-visible{outline:2px solid var(--pill);outline-offset:3px}\n.bk2{height:36px;padding:0 16px;border-radius:30px;background:var(--pill);color:#fff;border:1px solid rgba(255,255,255,.12);font:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:background-color .15s cubic-bezier(.4,0,.2,1),transform .15s cubic-bezier(.4,0,.2,1)}\n.bk2:hover{background:var(--pillh)}.bk2:active{transform:scale(.97)}.bk2:focus-visible{outline:2px solid var(--pill);outline-offset:2px}\n.dz{width:100%;height:180px;border:2px dashed rgba(255,255,255,.35);border-radius:12px;background:var(--field);color:#fff;font:inherit;font-size:15px;font-weight:700;cursor:pointer;line-height:1.6;transition:border-color .15s cubic-bezier(.4,0,.2,1)}\n.dz span{font-size:12px;font-weight:400;opacity:.8}.dz:hover,.dz:focus-visible{border-color:#fff;outline:none}\n.lbl{display:block;font-size:12px;font-weight:600;margin:14px 0 6px}\n.mn{animation:scale-in .25s cubic-bezier(.19,1,.22,1) both}\n.ta3{height:auto;min-height:88px;border-radius:14px;padding:10px 16px;resize:vertical;line-height:1.5;display:block}\n.sel3{appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg,transparent 50%,#fff 50%),linear-gradient(135deg,#fff 50%,transparent 50%);background-position:calc(100% - 20px) 17px,calc(100% - 15px) 17px;background-size:5px 5px;background-repeat:no-repeat;padding-right:36px}\n.sel3 option{color:#111}\n.cvo{position:relative;aspect-ratio:4/3;border:0;padding:0;border-radius:8px;overflow:hidden;background:var(--field);color:#fff;font:inherit;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;outline:3px solid transparent;outline-offset:2px;transition:transform .15s cubic-bezier(.4,0,.2,1)}.cvo:hover{transform:scale(1.03)}.cvo:focus-visible{box-shadow:0 0 0 2px #fff}\n.rz-tag{display:inline-block;background:var(--chip);color:#111;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600;margin:0 6px 6px 0}\n@keyframes tile-in2{0%{opacity:0;filter:blur(2px);transform:scale(.95)}100%{opacity:1;filter:blur(0);transform:scale(1)}}\n@keyframes mdl-out{0%{opacity:1}100%{opacity:0}}\n@keyframes box-out{0%{opacity:1;transform:none}100%{opacity:0;transform:translateY(10px) scale(.96)}}\n.mdl.out{animation:mdl-out .32s cubic-bezier(.4,0,.2,1) both!important;pointer-events:none}.mdl.out .box{animation:box-out .32s cubic-bezier(.4,0,.2,1) both!important}\n@keyframes ld{0%{background-position:150% 0}100%{background-position:-50% 0}}\n.card.ld{background-image:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.22) 50%,transparent 70%);background-size:200% 100%;animation:ld 1.3s linear infinite}\n.empt{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center;color:var(--muted);border:2px dashed var(--t1);border-radius:14px}\n@media (prefers-reduced-motion:reduce){.mb,.mb2,.bt,.pc,.lb,.card .ov,.card img,.bk2,.dz{transition-duration:.01ms!important}.mn{animation:none!important}}\n\n:root{--bg:#d9d9d9;--t1:#afafaf;--t2:#a7a7a7;--t3:#b7b7b7;--t4:#a3a3a3;--pill:#575757;--pillh:#626262;--chip:#d9d9d9;--muted:#575757;--field:#464646;--sw:#838383;--velo:rgba(217,217,217,.55);--ink:#111;--f1:'Inter',system-ui,sans-serif;--f2:'Inter',system-ui,sans-serif}\nh1,h2,b,strong,[style*=\"font-weight:700\"],.tt{font-family:var(--f1)}\nbutton,input,textarea,select{font-family:inherit}\n.sec-c,.sec-x{line-height:0}\n.sec-c>*,.sec-x>*{display:flex;align-items:center;justify-content:center;flex:none}\n.sec [data-tip]{position:relative}\n.sec [data-tip]::after{content:attr(data-tip);position:absolute;left:50%;bottom:calc(100% + 17px);transform:translate(-50%,4px);background:var(--pill);color:#fff;font:600 12px/1 var(--f2);padding:7px 10px;border-radius:8px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s cubic-bezier(.4,0,.2,1),transform .15s cubic-bezier(.4,0,.2,1);box-shadow:0 3px 12px rgba(0,0,0,.15)}\n.sec a:hover [data-tip]::after,.sec button:hover [data-tip]::after,.sec a:focus-visible [data-tip]::after,.sec button:focus-visible [data-tip]::after,.sec [aria-current]:hover [data-tip]::after{opacity:1;transform:translate(-50%,0)}\n@keyframes x-in{0%{opacity:0;transform:scale(.4) rotate(-90deg)}100%{opacity:1;transform:none}}\n@keyframes x-out{0%{opacity:1;transform:none}100%{opacity:0;transform:scale(.4) rotate(90deg)}}\n.bz .x{animation:x-in .45s cubic-bezier(.19,1,.22,1) .18s backwards}\n.bz.out .x{animation:x-out .28s cubic-bezier(.4,0,.2,1) both!important}\n@keyframes scr-in{0%{opacity:0}100%{opacity:1}}\n[data-scr]:not([data-in=\"0\"])>:not(.sec):not(.sb):not(.bz):not(.rz):not(.mdl):not(.mn){animation:scr-in .5s cubic-bezier(.4,0,.2,1) backwards}\n@media (prefers-reduced-motion:reduce){.bz .x,.bz.out .x{animation:none!important}.sec [data-tip]::after{transition:none}[data-scr]>*{animation:none!important}}";
export const template = "<div data-scr data-in=\"{{scrIn}}\" data-leave=\"{{leaving}}\" ref=\"{{rootRef}}\" style=\"position:relative;width:100%;height:100vh;min-height:560px;background:var(--bg);overflow:hidden;font-family:var(--f2);color:#fff;{{uiVars}}\">\n  <!-- Lista de tableros -->\n  <sc-if value=\"{{vBoards}}\" hint-placeholder-val=\"{{true}}\">\n  <div class=\"scr\" ref=\"{{scrRef}}\" onScroll=\"{{onScr}}\" style=\"position:absolute;inset:0;overflow-y:auto;overflow-x:hidden\">\n    <div style=\"padding:84px 46px 130px;box-sizing:border-box\">\n      <div style=\"display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:22px;color:var(--muted)\">\n        <h1 style=\"margin:0;font-size:28px;font-weight:700;line-height:1\">Tableros</h1>\n        <div style=\"font-size:13px;font-weight:600\">{{bMeta}}</div>\n      </div>\n      <sc-if value=\"{{hasBoards}}\" hint-placeholder-val=\"{{true}}\">\n      <div style=\"display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:34px\">\n        <sc-for list=\"{{boards}}\" as=\"b\" hint-placeholder-count=\"2\">\n          <div class=\"bt\" draggable=\"true\" onDragStart=\"{{b.ds}}\" onDragOver=\"{{b.dov}}\" onDrop=\"{{b.drop}}\" onDragEnd=\"{{dend}}\" style=\"position:relative;height:368px;border-radius:12px;animation:tile-in .8s cubic-bezier(.4,0,.2,1) {{b.d}} backwards;opacity:{{b.op}};outline:3px solid {{b.ol}};outline-offset:4px\">\n            <button class=\"tile\" onClick=\"{{b.open}}\" aria-label=\"Abrir {{b.name}}\" style=\"position:absolute;inset:0;width:100%;height:100%;border-radius:10px;overflow:hidden;display:block;background:{{b.bg}}\">\n              <sc-if value=\"{{b.hasCover}}\" hint-placeholder-val=\"{{false}}\"><img class=\"ti\" src=\"{{b.cover}}\" alt=\"\" draggable=\"false\" style=\"position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block\"></sc-if><sc-if value=\"{{b.vidCover}}\" hint-placeholder-val=\"{{false}}\"><video class=\"ti\" src=\"{{b.cover}}\" ref=\"{{vref}}\" muted loop playsinline style=\"position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block\"></video></sc-if>\n              <sc-if value=\"{{b.noCover}}\" hint-placeholder-val=\"{{true}}\"><span class=\"ti\" style=\"position:absolute;inset:0;background:{{b.bg}}\"></span></sc-if>\n              <span class=\"ov\" style=\"position:absolute;inset:0;background:rgba(0,0,0,.6);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;padding:0 48px;box-sizing:border-box\"><span style=\"font-size:56px;font-weight:700;line-height:1.1;overflow-wrap:anywhere\">{{b.name}}</span><span style=\"font-size:15px\">{{b.meta}}</span></span>\n              <span class=\"lb\" style=\"position:absolute;left:16px;bottom:16px;max-width:calc(100% - 32px);background:var(--pill);color:#fff;border-radius:30px;padding:7px 14px;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box\">{{b.name}} · {{b.meta}}</span>\n            </button>\n            <button class=\"mb\" onClick=\"{{b.more}}\" aria-label=\"Opciones de {{b.name}}\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"#fff\" aria-hidden=\"true\"><circle cx=\"3.5\" cy=\"8\" r=\"1.4\"/><circle cx=\"8\" cy=\"8\" r=\"1.4\"/><circle cx=\"12.5\" cy=\"8\" r=\"1.4\"/></svg></button>\n          </div>\n        </sc-for>\n      </div>\n      </sc-if>\n      <sc-if value=\"{{noBoards}}\" hint-placeholder-val=\"{{false}}\">\n      <div class=\"empt\" style=\"height:600px\">\n        <div style=\"font-size:26px;font-weight:700\">Todavía no tenés tableros</div>\n        <div style=\"font-size:14px;line-height:1.5;max-width:440px\">Creá uno para empezar a juntar referencias. Lo que guardes con la extensión va a ir apareciendo adentro.</div>\n        <button class=\"nb\" onClick=\"{{plusAct}}\" style=\"margin-top:8px\">+ Crear tablero</button>\n      </div>\n      </sc-if>\n    </div>\n  </div>\n  </sc-if>\n\n  <!-- Vista de tablero: mosaico ordenado, lo último arriba -->\n  <sc-if value=\"{{vBoard}}\" hint-placeholder-val=\"{{false}}\">\n  <div class=\"scr\" ref=\"{{scrRef}}\" onScroll=\"{{onScr}}\" onDragOver=\"{{fdov}}\" onDragLeave=\"{{fdlv}}\" onDrop=\"{{fdrop}}\" style=\"position:absolute;inset:0;overflow-y:auto;overflow-x:hidden\">\n    <div style=\"padding:84px 46px 130px;box-sizing:border-box\">\n      <div style=\"display:grid;grid-template-columns:1fr minmax(0,auto) 1fr;gap:20px;align-items:center;margin-bottom:26px;color:var(--muted)\">\n        <div><button class=\"bk2\" onClick=\"{{goBoards}}\">← Tableros</button></div>\n        <div style=\"text-align:center;min-width:0\"><h1 style=\"margin:0;font-size:28px;font-weight:700;line-height:1.1;overflow-wrap:anywhere\">{{cb.name}}</h1><div style=\"font-size:13px;font-weight:600;margin-top:6px\">{{cb.meta}}</div></div>\n        <div style=\"display:flex;justify-content:flex-end\"><button class=\"mb2\" onClick=\"{{cb.more}}\" aria-label=\"Opciones del tablero\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"#fff\" aria-hidden=\"true\"><circle cx=\"3.5\" cy=\"8\" r=\"1.4\"/><circle cx=\"8\" cy=\"8\" r=\"1.4\"/><circle cx=\"12.5\" cy=\"8\" r=\"1.4\"/></svg></button></div>\n      </div>\n      <sc-if value=\"{{hasItems}}\" hint-placeholder-val=\"{{true}}\">\n      <div style=\"position:relative;height:{{gridH}}px\">\n        <sc-for list=\"{{cards}}\" as=\"it\" hint-placeholder-count=\"4\">\n          <div class=\"pc\" draggable=\"true\" onDragStart=\"{{it.ds}}\" onDragOver=\"{{it.dov}}\" onDrop=\"{{it.drop}}\" onDragEnd=\"{{dend}}\" style=\"position:absolute;left:{{it.x}}px;top:{{it.y}}px;width:{{it.w}}px;height:{{it.h}}px;border-radius:10px;animation:{{it.an}} .8s cubic-bezier(.4,0,.2,1) {{it.d}} backwards;opacity:{{it.op}};outline:3px solid {{it.ol}};outline-offset:3px\">\n            <button class=\"{{it.ld}}\" onClick=\"{{it.open}}\" aria-label=\"Ver {{it.title}}\" style=\"height:100%\">\n              <sc-if value=\"{{it.isImg}}\" hint-placeholder-val=\"{{true}}\"><img src=\"{{it.src}}\" alt=\"\" loading=\"lazy\" decoding=\"async\" draggable=\"false\" style=\"display:block;width:100%;height:100%;object-fit:cover\"></sc-if>\n              <sc-if value=\"{{it.isVid}}\" hint-placeholder-val=\"{{false}}\"><video src=\"{{it.src}}\" ref=\"{{vref}}\" muted loop playsinline style=\"display:block;width:100%;height:100%;object-fit:cover;pointer-events:none\"></video></sc-if>\n              <sc-if value=\"{{it.isLink}}\" hint-placeholder-val=\"{{false}}\"><span style=\"display:flex;flex-direction:column;height:100%\">\n                <sc-if value=\"{{it.embPost}}\" hint-placeholder-val=\"{{false}}\"><span style=\"flex:1;min-height:0;display:flex;flex-direction:column;gap:9px;padding:16px 18px;background:#ececec;color:#111;box-sizing:border-box;overflow:hidden\"><span style=\"display:flex;align-items:center;gap:10px\"><span style=\"width:38px;height:38px;border-radius:50%;background:var(--t1);flex:none\"></span><span style=\"display:flex;flex-direction:column;gap:6px\"><span style=\"width:120px;height:9px;border-radius:5px;background:var(--pill)\"></span><span style=\"width:76px;height:8px;border-radius:5px;background:var(--t1)\"></span></span></span><span style=\"height:9px;border-radius:5px;background:var(--t3);width:96%;flex:none\"></span><span style=\"height:9px;border-radius:5px;background:var(--t3);width:90%;flex:none\"></span><span style=\"height:9px;border-radius:5px;background:var(--t3);width:62%;flex:none\"></span><span style=\"font-size:11px;font-weight:600;margin-top:auto;opacity:.8\">Publicación de {{it.dom}}</span></span></sc-if><sc-if value=\"{{it.embDark}}\" hint-placeholder-val=\"{{true}}\"><span style=\"flex:1;min-height:0;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:#1f1f1f;color:#fff;background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.04) 0 10px,transparent 10px 20px)\">\n                  <sc-if value=\"{{it.vidSite}}\" hint-placeholder-val=\"{{false}}\"><span style=\"width:52px;height:52px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M5 3.5v9l7.5-4.5z\" fill=\"#111\"/></svg></span></sc-if>\n                  <sc-if value=\"{{it.embAudio}}\" hint-placeholder-val=\"{{false}}\"><svg width=\"34\" height=\"34\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 12V3.5l7-1.5v8.5\"/><circle cx=\"4.3\" cy=\"12\" r=\"1.7\"/><circle cx=\"11.3\" cy=\"10.5\" r=\"1.7\"/></svg></sc-if>\n                  <span style=\"font-size:13px;font-weight:600;opacity:.85\">{{it.embLbl}}</span></sc-if>\n                </span>\n                <span style=\"flex:none;height:64px;box-sizing:border-box;padding:10px 14px;background:var(--chip);color:#111;display:flex;flex-direction:column;justify-content:center;gap:2px\"><span style=\"font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis\">{{it.dom}}</span><span style=\"font-size:14px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis\">{{it.title}}</span></span>\n              </span></sc-if>\n              <sc-if value=\"{{it.isText}}\" hint-placeholder-val=\"{{false}}\"><span style=\"display:block;height:100%;overflow:hidden;box-sizing:border-box;padding:20px 22px;background:var(--pill);font-size:15px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere;-webkit-mask-image:{{it.fade}};mask-image:{{it.fade}}\"><sc-if value=\"{{it.hasTtl}}\" hint-placeholder-val=\"{{false}}\"><b style=\"display:block;font-size:17px;margin-bottom:6px\">{{it.title}}</b></sc-if>{{it.text}}</span></sc-if>\n              <span class=\"ov\" style=\"position:absolute;inset:0;background:rgba(0,0,0,.55);display:flex;flex-direction:column;justify-content:flex-end;padding:14px;box-sizing:border-box;gap:4px\"><b style=\"font-size:15px;line-height:1.2;overflow-wrap:anywhere\">{{it.title}}</b><span style=\"font-size:11px\">{{it.meta}}</span></span>\n            </button>\n            <button class=\"mb\" onClick=\"{{it.more}}\" aria-label=\"Opciones de {{it.title}}\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"#fff\" aria-hidden=\"true\"><circle cx=\"3.5\" cy=\"8\" r=\"1.4\"/><circle cx=\"8\" cy=\"8\" r=\"1.4\"/><circle cx=\"12.5\" cy=\"8\" r=\"1.4\"/></svg></button>\n          </div>\n        </sc-for>\n      </div>\n      </sc-if>\n      <sc-if value=\"{{noItems}}\" hint-placeholder-val=\"{{false}}\">\n      <div class=\"empt\" style=\"height:560px\">\n        <div style=\"font-size:26px;font-weight:700\">Este tablero está vacío</div>\n        <div style=\"font-size:14px;line-height:1.5;max-width:460px\">Lo que guardes acá va a aparecer en mosaico, siempre lo último arriba. Podés probar arrastrando una imagen, un video o un enlace a esta pantalla.</div>\n        <button class=\"nb\" onClick=\"{{plusAct}}\" style=\"margin-top:8px\">+ Agregar pieza</button>\n      </div>\n      </sc-if>\n    </div>\n  </div>\n  <sc-if value=\"{{fileOver}}\" hint-placeholder-val=\"{{false}}\"><div style=\"position:absolute;inset:12px;border:3px dashed var(--pill);border-radius:16px;background:var(--velo);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:var(--muted);pointer-events:none;z-index:20\">Soltá para sumarlo al tablero</div></sc-if>\n  </sc-if>\n\n  <button class=\"sb\" onClick=\"{{openS}}\" aria-label=\"Abrir buscador\" style=\"position:absolute;top:20px;height:40px;background:var(--pill);border-radius:30px;display:flex;align-items:center;gap:10px;padding:0 16px;box-sizing:border-box;font-size:14px;font-family:inherit;color:#fff;z-index:9;cursor:pointer\">\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.4\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"7\" cy=\"7\" r=\"4.5\"/><path d=\"M10.5 10.5L14 14\"/></svg>\n    <span class=\"shm\">{{s.t}}</span><sc-if value=\"{{s.c}}\" hint-placeholder-val=\"{{false}}\"><span class=\"cur\"></span></sc-if>\n  </button>\n<!-- Botón de sección: las 3 secciones siempre visibles (la actual resaltada); al hover aparecen herramientas y ajustes -->\n  <div class=\"sec\"><div class=\"sec-l\"><div class=\"sec-x\"><button onClick=\"{{plusAct}}\" aria-label=\"{{plusLbl}}\" style=\"display:flex\"><span data-tip=\"{{plusLbl}}\" style=\"width:30px;height:30px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;flex:none;\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M8 3v10M3 8h10\"/></svg></span></button><button onClick=\"{{sortAct}}\" aria-label=\"Ordenar\" style=\"display:flex\"><span data-tip=\"Ordenar\" style=\"width:30px;height:30px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;flex:none;box-shadow:{{sortRing}};\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 4h12M4 8h8M6 12h4\"/></svg></span></button></div></div><div class=\"sec-c\"><a href=\"Main.dc.html\" onClick=\"{{navOut}}\" aria-label=\"Principal\" style=\"display:flex\"><span data-tip=\"Principal\" style=\"width:30px;height:30px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;flex:none;\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2\" y=\"2\" width=\"5\" height=\"5\" rx=\"1\"/><rect x=\"9\" y=\"2\" width=\"5\" height=\"5\" rx=\"1\"/><rect x=\"2\" y=\"9\" width=\"12\" height=\"5\" rx=\"1\"/></svg></span></a><span aria-label=\"Archivo (sección actual)\" aria-current=\"page\" style=\"display:flex\"><span data-tip=\"Archivo\" style=\"width:30px;height:30px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;flex:none;box-shadow:0 0 0 2px var(--pill),0 0 0 4px #fff;\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2\" y=\"2.5\" width=\"12\" height=\"4.5\" rx=\"1.2\"/><rect x=\"2\" y=\"9\" width=\"12\" height=\"4.5\" rx=\"1.2\"/></svg></span></span><a href=\"Anotador.dc.html\" onClick=\"{{navOut}}\" aria-label=\"Anotador\" style=\"display:flex\"><span data-tip=\"Anotador\" style=\"width:30px;height:30px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;flex:none;\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 13l1-3.5L11 2.5l2.5 2.5L6.5 12z\"/></svg></span></a></div><div class=\"sec-r\"><div class=\"sec-x\"><button onClick=\"{{openR}}\" aria-label=\"Reglas y ajustes\" style=\"display:flex\"><span data-tip=\"Reglas y ajustes\" style=\"width:30px;height:30px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;flex:none;\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"8\" r=\"2.2\"/><path d=\"M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4\"/></svg></span></button></div></div></div>\n\n  <input type=\"file\" accept=\"image/*,video/*\" ref=\"{{fileRef}}\" onChange=\"{{onFile}}\" style=\"display:none\" tabindex=\"-1\" aria-hidden=\"true\">\n\n  <!-- Menú de opciones (⋯) -->\n  <sc-if value=\"{{menuOn}}\" hint-placeholder-val=\"{{false}}\">\n    <button onClick=\"{{closeMenu}}\" aria-label=\"Cerrar menú\" tabindex=\"-1\" style=\"position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:transparent;z-index:24;cursor:default\"></button>\n    <div class=\"pn mn\" role=\"menu\" style=\"position:absolute;z-index:25;width:220px;padding:6px;box-sizing:border-box;{{menu.style}}\">\n      <sc-for list=\"{{menu.items}}\" as=\"m\" hint-placeholder-count=\"3\"><button class=\"pr\" role=\"menuitem\" onClick=\"{{m.act}}\">{{m.l}}</button></sc-for>\n    </div>\n  </sc-if>\n\n  <!-- Orden -->\n  <sc-if value=\"{{sortOpen}}\" hint-placeholder-val=\"{{false}}\">\n    <button onClick=\"{{closeSort}}\" aria-label=\"Cerrar orden\" tabindex=\"-1\" style=\"position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:transparent;z-index:24;cursor:default\"></button>\n    <div class=\"pn mn\" role=\"menu\" aria-label=\"Ordenar\" style=\"position:absolute;z-index:25;left:calc(50% - 250px);bottom:76px;width:270px;padding:6px;box-sizing:border-box\">\n      <div style=\"font-size:11px;font-weight:600;opacity:.8;padding:8px 12px 6px\">{{sortWhat}}</div>\n      <sc-for list=\"{{sortOpts}}\" as=\"o\" hint-placeholder-count=\"5\"><button class=\"pr\" role=\"menuitemradio\" aria-checked=\"{{o.on}}\" onClick=\"{{o.pick}}\"><span>{{o.l}}</span><span style=\"display:flex;opacity:{{o.mark}}\"><svg width=\"14\" height=\"14\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 8.5l3.2 3L13 4.5\"/></svg></span></button></sc-for>\n    </div>\n  </sc-if>\n\n  <!-- Nombre del tablero (nuevo / renombrar) -->\n  <sc-if value=\"{{naming}}\" hint-placeholder-val=\"{{false}}\">\n    <div class=\"mdl {{xNm}}\" style=\"position:absolute;inset:0;z-index:30;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center\">\n      <div class=\"pn box\" role=\"dialog\" aria-label=\"{{nm.title}}\" style=\"width:400px;padding:24px;box-sizing:border-box\">\n        <div style=\"font-size:20px;font-weight:700\">{{nm.title}}</div>\n        <div style=\"font-size:13px;opacity:.85;margin:6px 0 16px;line-height:1.4\">{{nm.hint}}</div>\n        <input class=\"in\" ref=\"{{nameRef}}\" value=\"{{draft}}\" onInput=\"{{onDraft}}\" onKeyDown=\"{{nameKey}}\" placeholder=\"Nombre del tablero\" aria-label=\"Nombre del tablero\" maxlength=\"40\">\n        <div style=\"display:flex;gap:8px;justify-content:flex-end;margin-top:16px\">\n          <button class=\"ob\" onClick=\"{{cancelModal}}\" style=\"background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)\">Cancelar</button>\n          <button class=\"ob\" onClick=\"{{submitName}}\" style=\"opacity:{{nm.op}}\" aria-disabled=\"{{nm.dis}}\">{{nm.btn}}</button>\n        </div>\n      </div>\n    </div>\n  </sc-if>\n\n  <!-- Confirmar eliminación -->\n  <sc-if value=\"{{confOn}}\" hint-placeholder-val=\"{{false}}\">\n    <div class=\"mdl {{xConf}}\" style=\"position:absolute;inset:0;z-index:35;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center\">\n      <div class=\"pn box\" role=\"alertdialog\" aria-label=\"{{conf.title}}\" style=\"width:420px;padding:24px;box-sizing:border-box\">\n        <div style=\"font-size:20px;font-weight:700;overflow-wrap:anywhere\">{{conf.title}}</div>\n        <div style=\"font-size:13px;opacity:.85;margin:8px 0 18px;line-height:1.45\">{{conf.text}}</div>\n        <div style=\"display:flex;gap:8px;justify-content:flex-end\">\n          <button class=\"ob\" onClick=\"{{conf.no}}\" style=\"background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)\">Cancelar</button>\n          <button class=\"ob\" onClick=\"{{conf.yes}}\">Eliminar</button>\n        </div>\n      </div>\n    </div>\n  </sc-if>\n\n  <!-- Agregar pieza a mano -->\n  <sc-if value=\"{{addOn}}\" hint-placeholder-val=\"{{false}}\">\n    <div class=\"mdl {{xAdd}}\" style=\"position:absolute;inset:0;z-index:30;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center\">\n      <div class=\"pn box\" role=\"dialog\" aria-label=\"Agregar pieza\" onDragOver=\"{{add.dov}}\" onDrop=\"{{add.drop}}\" style=\"width:480px;padding:24px;box-sizing:border-box\">\n        <div style=\"font-size:20px;font-weight:700;overflow-wrap:anywhere\">Agregar a {{cb.name}}</div>\n        <div style=\"font-size:13px;opacity:.85;margin:6px 0 16px;line-height:1.4\">En el uso real lo guarda la extensión. Acá podés sumarlo a mano: va a aparecer primero en el tablero.</div>\n        <div style=\"display:flex;gap:6px\">\n          <sc-for list=\"{{add.tabs}}\" as=\"t\" hint-placeholder-count=\"3\"><button class=\"ob\" onClick=\"{{t.pick}}\" aria-pressed=\"{{t.on}}\" style=\"background:{{t.bg}}\">{{t.l}}</button></sc-for>\n        </div>\n        <sc-if value=\"{{add.tImg}}\" hint-placeholder-val=\"{{true}}\">\n          <div style=\"margin-top:16px\">\n            <sc-if value=\"{{add.noImg}}\" hint-placeholder-val=\"{{true}}\"><button class=\"dz\" onClick=\"{{pickFile}}\">Elegir imagen, GIF o video<br><span>o arrastralo acá · PNG, JPG, WebP, GIF, MP4 o WebM</span></button></sc-if>\n            <sc-if value=\"{{add.hasImg}}\" hint-placeholder-val=\"{{false}}\"><div style=\"position:relative;background:var(--field);border-radius:12px;overflow:hidden;height:220px\"><sc-if value=\"{{add.isVid}}\" hint-placeholder-val=\"{{false}}\"><video src=\"{{add.src}}\" ref=\"{{vref}}\" muted loop playsinline style=\"width:100%;height:100%;object-fit:contain;display:block\"></video></sc-if><sc-if value=\"{{add.notVid}}\" hint-placeholder-val=\"{{true}}\"><img src=\"{{add.src}}\" alt=\"Vista previa\" style=\"width:100%;height:100%;object-fit:contain;display:block\"></sc-if><span style=\"position:absolute;left:10px;bottom:10px;background:rgba(0,0,0,.6);border-radius:30px;padding:5px 10px;font-size:11px;font-weight:600\">{{add.size}}</span><button class=\"ob\" onClick=\"{{pickFile}}\" style=\"position:absolute;right:10px;bottom:10px\">Cambiar</button></div></sc-if>\n          </div>\n          <label class=\"lbl\" for=\"ad-ti\">Título (opcional)</label>\n          <input class=\"in\" id=\"ad-ti\" value=\"{{add.title}}\" onInput=\"{{add.onTitle}}\" onKeyDown=\"{{add.key}}\" placeholder=\"Ej: paleta de atardecer\">\n          <label class=\"lbl\" for=\"ad-fr\">Sacado de (opcional)</label>\n          <input class=\"in\" id=\"ad-fr\" value=\"{{add.from}}\" onInput=\"{{add.onFrom}}\" onKeyDown=\"{{add.key}}\" placeholder=\"https://pinterest.com/…\">\n        </sc-if>\n        <sc-if value=\"{{add.tLink}}\" hint-placeholder-val=\"{{false}}\">\n          <label class=\"lbl\" for=\"ad-url\">Enlace</label>\n          <input class=\"in\" id=\"ad-url\" ref=\"{{urlRef}}\" value=\"{{add.url}}\" onInput=\"{{add.onUrl}}\" onKeyDown=\"{{add.key}}\" placeholder=\"https://…\">\n          <label class=\"lbl\" for=\"ad-lt\">Título (opcional)</label>\n          <input class=\"in\" id=\"ad-lt\" value=\"{{add.title}}\" onInput=\"{{add.onTitle}}\" onKeyDown=\"{{add.key}}\" placeholder=\"Si lo dejás vacío uso el sitio\">\n        </sc-if>\n        <sc-if value=\"{{add.tText}}\" hint-placeholder-val=\"{{false}}\">\n          <label class=\"lbl\" for=\"ad-tt\">Título (opcional)</label>\n          <input class=\"in\" id=\"ad-tt\" value=\"{{add.title}}\" onInput=\"{{add.onTitle}}\" placeholder=\"Ej: idea para el HUD\">\n          <label class=\"lbl\" for=\"ad-tx\">Texto</label>\n          <textarea class=\"in ta3\" id=\"ad-tx\" rows=\"4\" value=\"{{add.text}}\" onInput=\"{{add.onText}}\" placeholder=\"Pegá o escribí el texto que querés guardar\"></textarea>\n        </sc-if>\n        <sc-if value=\"{{add.hasAuto}}\" hint-placeholder-val=\"{{false}}\"><div style=\"margin-top:12px;font-size:12px;display:flex;flex-wrap:wrap;align-items:center;gap:6px\"><span style=\"opacity:.85\">Etiquetas automáticas:</span><sc-for list=\"{{add.auto}}\" as=\"g\" hint-placeholder-count=\"2\"><span class=\"rz-tag\" style=\"margin:0\">#{{g.t}}</span></sc-for></div></sc-if>\n        <div style=\"display:flex;gap:8px;justify-content:flex-end;margin-top:20px\">\n          <button class=\"ob\" onClick=\"{{cancelAdd}}\" style=\"background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)\">Cancelar</button>\n          <button class=\"ob\" onClick=\"{{add.submit}}\" style=\"opacity:{{add.op}}\" aria-disabled=\"{{add.dis}}\">Agregar</button>\n        </div>\n      </div>\n    </div>\n  </sc-if>\n\n  <!-- Portada del tablero -->\n  <sc-if value=\"{{covOn}}\" hint-placeholder-val=\"{{false}}\">\n    <div class=\"mdl {{xCov}}\" style=\"position:absolute;inset:0;z-index:30;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center\">\n      <div class=\"pn box\" role=\"dialog\" aria-label=\"Elegir portada\" style=\"width:min(720px,calc(100% - 48px));max-height:calc(100% - 120px);padding:24px;box-sizing:border-box;display:flex;flex-direction:column\">\n        <div style=\"font-size:20px;font-weight:700;overflow-wrap:anywhere\">Portada de {{cov.name}}</div>\n        <div style=\"font-size:13px;opacity:.85;margin:6px 0 16px;line-height:1.4\">Elegí una imagen o video del tablero, o subí otra. En automático usa lo último que guardaste.</div>\n        <div style=\"flex:1;min-height:0;overflow:auto;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;align-content:start\">\n          <button class=\"cvo\" onClick=\"{{cov.auto}}\" aria-pressed=\"{{cov.autoOn}}\" style=\"outline-color:{{cov.autoOl}}\"><span style=\"font-size:13px;font-weight:700\">Automática</span><span style=\"font-size:11px;opacity:.85\">Lo más reciente</span></button>\n          <sc-for list=\"{{cov.opts}}\" as=\"o\" hint-placeholder-count=\"3\"><button class=\"cvo\" onClick=\"{{o.pick}}\" aria-pressed=\"{{o.on}}\" aria-label=\"Usar {{o.title}} como portada\" style=\"outline-color:{{o.ol}}\"><sc-if value=\"{{o.isVid}}\" hint-placeholder-val=\"{{false}}\"><video src=\"{{o.src}}\" ref=\"{{vref}}\" muted loop playsinline style=\"position:absolute;inset:0;width:100%;height:100%;object-fit:cover\"></video></sc-if><sc-if value=\"{{o.isImg}}\" hint-placeholder-val=\"{{true}}\"><img src=\"{{o.src}}\" alt=\"\" style=\"position:absolute;inset:0;width:100%;height:100%;object-fit:cover\"></sc-if></button></sc-for>\n        </div>\n        <div style=\"display:flex;gap:8px;justify-content:space-between;margin-top:18px\">\n          <button class=\"ob\" onClick=\"{{cov.upload}}\" style=\"background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)\">Subir otra imagen</button>\n          <button class=\"ob\" onClick=\"{{cov.close}}\">Listo</button>\n        </div>\n      </div>\n    </div>\n  </sc-if>\n\n  <!-- Pieza: ver y editar -->\n  <sc-if value=\"{{edOn}}\" hint-placeholder-val=\"{{false}}\">\n    <div class=\"mdl {{xEd}}\" style=\"position:absolute;inset:0;z-index:30;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center\">\n      <button onClick=\"{{edClose}}\" aria-label=\"Cerrar pieza\" tabindex=\"-1\" style=\"position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:transparent;cursor:default\"></button>\n      <div class=\"pn box\" role=\"dialog\" aria-label=\"{{pe.title}}\" style=\"position:relative;width:min(1240px,calc(100% - 48px));height:min(716px,calc(100% - 120px));display:flex;overflow:hidden\">\n        <div style=\"flex:1;min-width:0;background:var(--field);display:flex;align-items:center;justify-content:center;padding:28px;box-sizing:border-box\">\n          <sc-if value=\"{{pe.isImg}}\" hint-placeholder-val=\"{{true}}\"><img src=\"{{pe.src}}\" alt=\"{{pe.title}}\" style=\"max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;display:block\"></sc-if><sc-if value=\"{{pe.isVid}}\" hint-placeholder-val=\"{{false}}\"><video src=\"{{pe.src}}\" ref=\"{{vref}}\" muted loop playsinline controls style=\"max-width:100%;max-height:100%;border-radius:6px;display:block\"></video></sc-if>\n          <sc-if value=\"{{pe.isLink}}\" hint-placeholder-val=\"{{false}}\"><div style=\"text-align:center;max-width:560px\"><div style=\"font-size:13px\">{{pe.dom}}</div><div style=\"font-size:30px;font-weight:700;margin:10px 0 22px;overflow-wrap:anywhere\">{{pe.title}}</div><a class=\"ob\" href=\"{{pe.href}}\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-flex;text-decoration:none\">Abrir sitio</a></div></sc-if>\n          <sc-if value=\"{{pe.isText}}\" hint-placeholder-val=\"{{false}}\"><textarea class=\"in ta3\" rows=\"14\" value=\"{{pe.text}}\" onInput=\"{{pe.onText}}\" aria-label=\"Texto guardado\" style=\"height:100%;border-radius:12px;font-size:16px;resize:none\"></textarea></sc-if>\n        </div>\n        <div style=\"width:440px;flex:none;padding:22px 24px;box-sizing:border-box;display:flex;flex-direction:column;overflow:auto\">\n          <div style=\"display:flex;align-items:center;justify-content:space-between\"><div style=\"font-size:13px;font-weight:600\">{{pe.kind}} · {{pe.date}}<span style=\"display:block;font-size:11px;font-weight:400;opacity:.85;margin-top:2px\">{{pe.size}}</span></div><button class=\"ob\" onClick=\"{{edClose}}\" aria-label=\"Cerrar pieza\" style=\"width:32px;padding:0\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.6\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M2 2l8 8M10 2l-8 8\"/></svg></button></div>\n          <label class=\"lbl\" for=\"ed-ti\">Título</label>\n          <input class=\"in\" id=\"ed-ti\" value=\"{{pe.title}}\" onInput=\"{{pe.onTitle}}\" placeholder=\"Sin título\">\n          <label class=\"lbl\" for=\"ed-no\">Nota</label>\n          <textarea class=\"in ta3\" id=\"ed-no\" rows=\"3\" value=\"{{pe.note}}\" onInput=\"{{pe.onNote}}\" placeholder=\"Por qué lo guardaste, dónde lo vas a usar…\"></textarea>\n          <label class=\"lbl\" for=\"ed-ur\">Sitio web</label>\n          <input class=\"in\" id=\"ed-ur\" value=\"{{pe.url}}\" onInput=\"{{pe.onUrl}}\" placeholder=\"https://…\">\n          <sc-if value=\"{{pe.hasAuto}}\" hint-placeholder-val=\"{{false}}\"><div style=\"font-size:12px;font-weight:600;margin:14px 0 6px\">Etiquetas automáticas (por el sitio)</div><div><sc-for list=\"{{pe.auto}}\" as=\"g\" hint-placeholder-count=\"2\"><span class=\"rz-tag\">#{{g.t}}</span></sc-for></div></sc-if>\n          <label class=\"lbl\" for=\"ed-tg\">Tus etiquetas</label>\n          <input class=\"in\" id=\"ed-tg\" value=\"{{pe.tags}}\" onInput=\"{{pe.onTags}}\" placeholder=\"paleta, hud (separadas por coma)\">\n          <label class=\"lbl\" for=\"ed-bo\">Tablero</label>\n          <select class=\"in sel3\" id=\"ed-bo\" onChange=\"{{pe.onBoard}}\"><sc-for list=\"{{pe.bopts}}\" as=\"o\" hint-placeholder-count=\"2\"><option value=\"{{o.v}}\" selected=\"{{o.sel}}\">{{o.l}}</option></sc-for></select>\n          <div style=\"font-size:12px;margin-top:10px;opacity:.85\">Los cambios se guardan solos.</div>\n          <div style=\"flex:1;min-height:16px\"></div>\n          <div style=\"display:flex;gap:8px;justify-content:space-between\">\n            <button class=\"ob\" onClick=\"{{pe.del}}\" style=\"background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)\">Eliminar pieza</button>\n            <button class=\"ob\" onClick=\"{{edClose}}\">Listo</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </sc-if>\n  <sc-if value=\"{{sOn}}\" hint-placeholder-val=\"{{false}}\">\n  <div class=\"{{sCls}}\" style=\"position:absolute;inset:0;z-index:40\">\n    <button class=\"velo\" onClick=\"{{closeS}}\" aria-label=\"Cerrar buscador\" style=\"position:absolute;inset:0;width:100%;height:100%;background:var(--velo);border:0;padding:0;cursor:default\"></button>\n    <div class=\"panel\" style=\"position:absolute;left:50%;margin-left:-230px;top:20px;width:460px;transform-origin:top center;color:#fff\">\n      <div style=\"height:40px;background:var(--pill);border-radius:30px;display:flex;align-items:center;gap:10px;padding:0 6px 0 16px;box-sizing:border-box;font-size:14px;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.08),inset 0 1px 1.5px rgba(255,255,255,.12)\">\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.4\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"7\" cy=\"7\" r=\"4.5\"/><path d=\"M10.5 10.5L14 14\"/></svg>\n        <span style=\"flex:1;color:#ececec\">{{sPh}}</span>\n        <button class=\"x\" onClick=\"{{closeS}}\" aria-label=\"Cerrar buscador\" style=\"width:28px;height:28px;border-radius:50%;background:var(--chip);display:flex;align-items:center;justify-content:center;border:0;padding:0;cursor:pointer\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.6\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M2 2l8 8M10 2l-8 8\"/></svg></button>\n      </div>\n      <div class=\"pin\" style=\"margin-top:6px;background:var(--pill);border-radius:14px;padding:14px;box-sizing:border-box;border:1px solid rgba(255,255,255,.12);box-shadow:0 3px 12px rgba(0,0,0,.08);\">\n        <div style=\"display:flex;justify-content:space-between;font-size:11px;font-weight:600;margin-bottom:10px\"><span>Recientes</span></div>\n        <div style=\"font-size:12px;opacity:.8\">Todavía no buscaste nada.</div>\n        <div style=\"font-size:11px;font-weight:600;margin:16px 0 10px\">Guardado recientemente</div>\n        <sc-if value=\"{{srecNone}}\" hint-placeholder-val=\"{{true}}\"><div style=\"font-size:12px;opacity:.8\">Lo que guardes va a aparecer acá.</div></sc-if><div style=\"display:flex;gap:8px;overflow:hidden;margin-right:-14px\"><sc-for list=\"{{srec}}\" as=\"v\" hint-placeholder-count=\"0\"><div class=\"vt\" style=\"flex:none;width:110px;height:72px;background:var(--chip);border-radius:6px;overflow:hidden;--d:{{v.d}};\"><sc-if value=\"{{v.isImg}}\" hint-placeholder-val=\"{{false}}\"><img src=\"{{v.src}}\" alt=\"{{v.title}}\" style=\"width:100%;height:100%;object-fit:cover;display:block\"></sc-if><sc-if value=\"{{v.isVid}}\" hint-placeholder-val=\"{{false}}\"><video src=\"{{v.src}}\" ref=\"{{vref}}\" muted loop playsinline style=\"width:100%;height:100%;object-fit:cover;display:block\"></video></sc-if><sc-if value=\"{{v.noImg}}\" hint-placeholder-val=\"{{false}}\"><span style=\"display:block;height:100%;box-sizing:border-box;padding:8px;font-size:11px;font-weight:600;line-height:1.25;color:#111;overflow:hidden\">{{v.title}}</span></sc-if></div></sc-for></div>\n      </div>\n    </div>\n  </div>\n  </sc-if>\n  <!-- Reglas y ajustes (se abre con el engranaje) -->\n  <sc-if value=\"{{rOn}}\" hint-placeholder-val=\"{{false}}\">\n  <div class=\"{{rCls}}\" style=\"position:absolute;inset:0;z-index:50;color:#fff;font-family:'Inter',system-ui,sans-serif\">\n    <button class=\"rz-v\" onClick=\"{{closeR}}\" aria-label=\"Cerrar ajustes\" style=\"position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;background:rgba(0,0,0,.55);cursor:default\"></button>\n    <div class=\"rz-p\" role=\"dialog\" aria-label=\"Reglas y ajustes\" style=\"position:absolute;left:50%;margin-left:-550px;top:max(16px,calc(50% - 366px));width:1100px;height:min(732px,calc(100% - 32px));background:var(--pill);border-radius:18px;border:1px solid rgba(255,255,255,.14);box-shadow:0 12px 40px rgba(0,0,0,.35);display:flex;flex-direction:column;overflow:hidden\">\n      <div style=\"display:flex;align-items:center;justify-content:space-between;padding:20px 24px 16px;border-bottom:1px solid rgba(255,255,255,.14)\">\n        <div style=\"font-size:22px;font-weight:700\">Reglas y ajustes</div>\n        <button class=\"rz-b\" onClick=\"{{closeR}}\" aria-label=\"Cerrar ajustes\" style=\"width:34px;padding:0\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" stroke=\"#111\" stroke-width=\"1.6\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M2 2l8 8M10 2l-8 8\"/></svg></button>\n      </div>\n      <div style=\"display:flex;flex:1;min-height:0\">\n        <div style=\"width:210px;flex:none;padding:16px 12px;border-right:1px solid rgba(255,255,255,.14);box-sizing:border-box\">\n          <sc-for list=\"{{rTabs}}\" as=\"t\" hint-placeholder-count=\"4\"><button class=\"rz-t\" onClick=\"{{t.pick}}\" style=\"background:{{t.bg}}\">{{t.label}}</button></sc-for>\n          <div style=\"margin-top:22px;padding:0 14px;font-size:12px;line-height:1.5;opacity:.75\">Proyecto activo<br><b style=\"font-size:13px;opacity:1\">{{rProjName}}</b></div>\n        </div>\n        <div style=\"flex:1;min-width:0;display:flex;min-height:0\">\n\n          <!-- Reglas -->\n          <sc-if value=\"{{rt.reglas}}\" hint-placeholder-val=\"{{true}}\">\n          <div style=\"width:430px;flex:none;padding:20px 20px 16px 24px;box-sizing:border-box;display:flex;flex-direction:column;min-height:0;border-right:1px solid rgba(255,255,255,.14)\">\n            <div style=\"font-size:16px;font-weight:700\">Reglas de organización</div>\n            <div style=\"font-size:12px;line-height:1.5;opacity:.8;margin:6px 0 14px\">Se aplican en orden. La primera regla que define un tablero decide dónde va la pieza; las etiquetas de todas las reglas que coinciden se suman.</div>\n            <div style=\"flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:8px\">\n              <sc-for list=\"{{rules}}\" as=\"r\" hint-placeholder-count=\"4\">\n                <div class=\"rz-r\" role=\"button\" tabindex=\"0\" onClick=\"{{r.pick}}\" onKeyDown=\"{{r.key}}\" style=\"border-color:{{r.bd}};background:{{r.bg}}\">\n                  <span style=\"width:20px;flex:none;text-align:center;font-size:12px;font-weight:700;opacity:.7\">{{r.n}}</span>\n                  <span style=\"flex:1;min-width:0;opacity:{{r.op}}\"><span style=\"display:block;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis\">{{r.name}}</span><span style=\"display:block;font-size:11px;opacity:.8;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis\">{{r.sum}}</span></span>\n                  <button class=\"rz-b s\" onClick=\"{{r.up}}\" aria-label=\"Subir regla\" style=\"opacity:{{r.upOp}}\">↑</button>\n                  <button class=\"rz-b s\" onClick=\"{{r.down}}\" aria-label=\"Bajar regla\" style=\"opacity:{{r.downOp}}\">↓</button>\n                  <button class=\"rz-sw\" role=\"switch\" aria-checked=\"{{r.on}}\" aria-label=\"Activar regla\" onClick=\"{{r.toggle}}\" style=\"background:{{r.swBg}};--l:{{r.swL}}\"></button>\n                </div>\n              </sc-for>\n            </div>\n            <div style=\"display:flex;gap:8px;margin-top:14px;flex-wrap:wrap\">\n              <button class=\"rz-b\" onClick=\"{{addRule}}\">+ Nueva regla</button>\n              <button class=\"rz-b o\" onClick=\"{{reapply}}\">Reaplicar a Sin clasificar</button>\n            </div>\n            <div style=\"font-size:12px;min-height:18px;margin-top:10px;opacity:.9\">{{rMsg}}</div>\n          </div>\n          <div style=\"flex:1;min-width:0;padding:20px 24px 16px 22px;box-sizing:border-box;overflow:auto\">\n            <sc-if value=\"{{hasSel}}\" hint-placeholder-val=\"{{true}}\">\n              <div style=\"display:flex;align-items:center;justify-content:space-between\"><div style=\"font-size:16px;font-weight:700\">Editar regla</div><div style=\"font-size:11px;opacity:.7\">Los cambios se guardan solos</div></div>\n              <label style=\"display:block;font-size:12px;font-weight:600;margin:16px 0 6px\" for=\"rz-name\">Nombre</label>\n              <input class=\"rz-i\" id=\"rz-name\" value=\"{{ed.name}}\" onInput=\"{{ed.onName}}\" placeholder=\"Nombre de la regla\">\n              <div style=\"display:flex;align-items:center;justify-content:space-between;margin:20px 0 8px\"><div style=\"font-size:12px;font-weight:600\">Condiciones</div>\n                <div style=\"display:flex;gap:6px;align-items:center;font-size:12px\"><span style=\"opacity:.75\">Coinciden</span><button class=\"rz-b s\" onClick=\"{{ed.mAll}}\" style=\"background:{{ed.mAllBg}}\">todas</button><button class=\"rz-b s\" onClick=\"{{ed.mAny}}\" style=\"background:{{ed.mAnyBg}}\">alguna</button></div></div>\n              <div style=\"display:flex;flex-direction:column;gap:8px\">\n                <sc-for list=\"{{ed.conds}}\" as=\"c\" hint-placeholder-count=\"2\">\n                  <div style=\"display:flex;gap:8px;align-items:center\">\n                    <select class=\"rz-s\" aria-label=\"Tipo de condición\" onChange=\"{{c.onKind}}\" style=\"width:170px;flex:none\"><sc-for list=\"{{c.kinds}}\" as=\"o\" hint-placeholder-count=\"4\"><option value=\"{{o.v}}\" selected=\"{{o.sel}}\">{{o.l}}</option></sc-for></select>\n                    <sc-if value=\"{{c.isText}}\" hint-placeholder-val=\"{{true}}\"><input class=\"rz-i\" value=\"{{c.v}}\" onInput=\"{{c.onVal}}\" placeholder=\"{{c.ph}}\" aria-label=\"Valor de la condición\"></sc-if>\n                    <sc-if value=\"{{c.isSel}}\" hint-placeholder-val=\"{{false}}\"><select class=\"rz-s\" aria-label=\"Valor de la condición\" onChange=\"{{c.onVal}}\"><sc-for list=\"{{c.opts}}\" as=\"o\" hint-placeholder-count=\"3\"><option value=\"{{o.v}}\" selected=\"{{o.sel}}\">{{o.l}}</option></sc-for></select></sc-if>\n                    <button class=\"rz-b s\" onClick=\"{{c.del}}\" aria-label=\"Quitar condición\" style=\"opacity:{{c.delOp}}\">×</button>\n                  </div>\n                </sc-for>\n              </div>\n              <button class=\"rz-b o s\" onClick=\"{{ed.addCond}}\" style=\"margin-top:10px\">+ Condición</button>\n              <div style=\"font-size:12px;font-weight:600;margin:22px 0 8px\">Entonces</div>\n              <div style=\"display:flex;gap:8px;align-items:center;margin-bottom:10px\"><span style=\"font-size:12px;width:86px;flex:none;opacity:.85\">Mover a</span>\n                <select class=\"rz-s\" aria-label=\"Tablero de destino\" onChange=\"{{ed.onTo}}\"><sc-for list=\"{{ed.tos}}\" as=\"o\" hint-placeholder-count=\"5\"><option value=\"{{o.v}}\" selected=\"{{o.sel}}\">{{o.l}}</option></sc-for></select></div>\n              <div style=\"display:flex;gap:8px;align-items:center\"><span style=\"font-size:12px;width:86px;flex:none;opacity:.85\">Etiquetar</span>\n                <input class=\"rz-i\" value=\"{{ed.tags}}\" onInput=\"{{ed.onTags}}\" placeholder=\"paleta, hud (separadas por coma)\" aria-label=\"Etiquetas\"></div>\n              <div style=\"margin:12px 0 0 94px;min-height:26px\"><sc-for list=\"{{ed.chips}}\" as=\"g\" hint-placeholder-count=\"2\"><span class=\"rz-tag\">#{{g.t}}</span></sc-for></div>\n              <div style=\"margin-top:22px;padding-top:16px;border-top:1px solid rgba(255,255,255,.14);display:flex;justify-content:space-between;align-items:center\"><div style=\"font-size:12px;opacity:.75;max-width:300px;line-height:1.45\">{{ed.sum}}</div><button class=\"rz-b o\" onClick=\"{{ed.del}}\">Eliminar regla</button></div>\n            </sc-if>\n            <sc-if value=\"{{noSel}}\" hint-placeholder-val=\"{{false}}\"><div style=\"height:100%;display:flex;align-items:center;justify-content:center;text-align:center;font-size:13px;opacity:.7;padding:0 40px\">Elegí una regla de la lista o creá una nueva.</div></sc-if>\n          </div>\n          </sc-if>\n\n          <!-- Tableros -->\n          <sc-if value=\"{{rt.tableros}}\" hint-placeholder-val=\"{{false}}\">\n          <div style=\"flex:1;padding:20px 28px;overflow:auto\">\n            <div style=\"font-size:16px;font-weight:700\">Tableros</div>\n            <div style=\"font-size:12px;line-height:1.5;opacity:.8;margin:6px 0 16px\">Las colecciones donde se guardan tus piezas. Las reglas mandan las piezas nuevas a un tablero; lo que no coincide queda en Sin clasificar.</div>\n            <div style=\"display:flex;flex-direction:column;gap:8px;max-width:620px\">\n              <sc-for list=\"{{rBoards}}\" as=\"b\" hint-placeholder-count=\"5\"><div class=\"rz-r\" style=\"cursor:default\"><span style=\"flex:1;font-size:14px;font-weight:600\">{{b.name}}</span><span style=\"font-size:12px;opacity:.8\">{{b.count}} piezas · {{b.rules}}</span></div></sc-for>\n            </div>\n          </div>\n          </sc-if>\n\n          <!-- Proyectos -->\n          <sc-if value=\"{{rt.proyectos}}\" hint-placeholder-val=\"{{false}}\">\n          <div style=\"flex:1;padding:20px 28px;overflow:auto\">\n            <div style=\"font-size:16px;font-weight:700\">Proyectos</div>\n            <div style=\"font-size:12px;line-height:1.5;opacity:.8;margin:6px 0 16px\">El proyecto activo se usa en las reglas con la condición \"Proyecto activo\" y en lo que guarda la extensión.</div>\n            <div style=\"display:flex;flex-direction:column;gap:8px;max-width:620px\">\n              <sc-for list=\"{{rProjs}}\" as=\"p\" hint-placeholder-count=\"3\"><button class=\"rz-r\" onClick=\"{{p.pick}}\" aria-pressed=\"{{p.active}}\" style=\"border-color:{{p.bd}}\"><span style=\"width:16px;height:16px;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;flex:none\"><span style=\"width:8px;height:8px;border-radius:50%;background:#fff;opacity:{{p.dot}}\"></span></span><span style=\"flex:1;font-size:14px;font-weight:600\">{{p.name}}</span><span style=\"font-size:12px;opacity:.8\">{{p.state}}</span></button></sc-for>\n            </div>\n          </div>\n          </sc-if>\n\n          <!-- Nube y copia -->\n          <sc-if value=\"{{rt.copia}}\" hint-placeholder-val=\"{{false}}\">\n          <div style=\"flex:1;padding:20px 28px;overflow:auto\">\n            <div style=\"font-size:16px;font-weight:700\">Nube y copia local</div>\n            <div style=\"font-size:12px;line-height:1.5;opacity:.85;margin:6px 0 16px;max-width:620px\">Tu librería se guarda en la nube para abrirla desde cualquier computadora. Además podés bajar una copia a este equipo y restaurarla cuando quieras.</div>\n            <div class=\"rz-r\" style=\"cursor:default;max-width:620px\">\n              <span style=\"flex:1;min-width:0\"><span style=\"display:block;font-size:14px;font-weight:600\">Sincronizar en la nube</span><span style=\"display:block;font-size:12px;opacity:.85;margin-top:2px\">{{rCloud.status}}</span></span>\n              <button class=\"rz-b o s\" onClick=\"{{rCloud.sync}}\" style=\"height:30px\">Sincronizar ahora</button>\n              <button class=\"rz-sw\" role=\"switch\" aria-checked=\"{{rCloud.on}}\" aria-label=\"Sincronizar en la nube\" onClick=\"{{rCloud.toggle}}\" style=\"background:{{rCloud.swBg}};--l:{{rCloud.swL}}\"></button>\n            </div>\n            <div style=\"font-size:12px;opacity:.75;margin:8px 0 22px;max-width:620px\">Maqueta: la cuenta en la nube se conecta en la app real. Ahora tenés {{rCloud.count}}.</div>\n            <div style=\"font-size:14px;font-weight:700;margin-bottom:8px\">Copia local</div>\n            <div style=\"display:flex;gap:8px;flex-wrap:wrap\"><button class=\"rz-b\" onClick=\"{{rExport}}\">Exportar copia (.json)</button><button class=\"rz-b o\" onClick=\"{{rImport}}\">Importar copia</button></div>\n            <a ref=\"{{rDlRef}}\" download=\"archivero-copia.json\" href=\"#\" tabindex=\"-1\" aria-hidden=\"true\" style=\"display:none\">copia</a>\n            <input type=\"file\" accept=\"application/json,.json\" ref=\"{{rImpRef}}\" onChange=\"{{rImpFile}}\" style=\"display:none\" tabindex=\"-1\" aria-hidden=\"true\">\n            <div style=\"font-size:12px;min-height:18px;margin-top:12px;opacity:.9\">{{rMsg}}</div>\n            <div style=\"margin-top:16px;max-width:620px;display:flex;flex-direction:column;gap:8px\">\n              <sc-for list=\"{{rPrefs}}\" as=\"o\" hint-placeholder-count=\"2\"><div class=\"rz-r\" style=\"cursor:default\"><span style=\"flex:1;font-size:14px;font-weight:600\">{{o.label}}</span><button class=\"rz-sw\" role=\"switch\" aria-checked=\"{{o.on}}\" aria-label=\"{{o.label}}\" onClick=\"{{o.toggle}}\" style=\"background:{{o.swBg}};--l:{{o.swL}}\"></button></div></sc-for>\n            </div>\n            <div style=\"margin-top:22px;font-size:12px;opacity:.7\">Atajo para guardar: Alt+Shift+S · clic derecho sobre imágenes y texto</div>\n          </div>\n          </sc-if>\n          <!-- Apariencia -->\n          <sc-if value=\"{{rt.apariencia}}\" hint-placeholder-val=\"{{false}}\">\n          <div style=\"flex:1;padding:20px 28px;overflow:auto\">\n            <div style=\"font-size:16px;font-weight:700\">Apariencia</div>\n            <div style=\"font-size:12px;line-height:1.5;opacity:.85;margin:6px 0 16px\">Se aplica a todas las pantallas de la librería.</div>\n            <div style=\"font-size:12px;font-weight:600;margin-bottom:8px\">Modo</div>\n            <div style=\"display:flex;gap:8px;margin-bottom:20px\"><sc-for list=\"{{ap.modes}}\" as=\"o\" hint-placeholder-count=\"2\"><button class=\"rz-b s\" onClick=\"{{o.pick}}\" aria-pressed=\"{{o.on}}\" style=\"height:32px;padding:0 16px;background:{{o.bg}};color:#111\">{{o.l}}</button></sc-for></div>\n            <div style=\"font-size:12px;font-weight:600;margin-bottom:8px\">Paleta</div>\n            <div style=\"display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-bottom:20px;max-width:660px\">\n              <sc-for list=\"{{ap.pals}}\" as=\"o\" hint-placeholder-count=\"12\"><button class=\"rz-r\" onClick=\"{{o.pick}}\" aria-pressed=\"{{o.on}}\" style=\"border-color:{{o.bd}};padding:8px 10px;gap:8px\"><span style=\"display:flex;flex:none\" aria-hidden=\"true\"><span style=\"width:14px;height:22px;border-radius:4px 0 0 4px;background:{{o.c1}}\"></span><span style=\"width:14px;height:22px;background:{{o.c2}}\"></span><span style=\"width:14px;height:22px;border-radius:0 4px 4px 0;background:{{o.c3}}\"></span></span><span style=\"font-size:13px;font-weight:600\">{{o.l}}</span></button></sc-for>\n            </div>\n            <div style=\"font-size:12px;font-weight:600;margin-bottom:8px\">Tipografía principal (títulos)</div>\n            <div style=\"display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px\"><sc-for list=\"{{ap.f1}}\" as=\"o\" hint-placeholder-count=\"5\"><button class=\"rz-r\" onClick=\"{{o.pick}}\" aria-pressed=\"{{o.on}}\" style=\"width:auto;border-color:{{o.bd}};padding:8px 14px\"><span style=\"font-size:18px;font-weight:700;font-family:{{o.ff}}\">Aa</span><span style=\"font-size:13px;font-family:{{o.ff}}\">{{o.l}}</span></button></sc-for></div>\n            <div style=\"font-size:12px;font-weight:600;margin-bottom:8px\">Tipografía secundaria (texto)</div>\n            <div style=\"display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px\"><sc-for list=\"{{ap.f2}}\" as=\"o\" hint-placeholder-count=\"5\"><button class=\"rz-r\" onClick=\"{{o.pick}}\" aria-pressed=\"{{o.on}}\" style=\"width:auto;border-color:{{o.bd}};padding:8px 14px\"><span style=\"font-size:18px;font-family:{{o.ff}}\">Aa</span><span style=\"font-size:13px;font-family:{{o.ff}}\">{{o.l}}</span></button></sc-for></div>\n            <div style=\"font-size:12px;font-weight:600;margin-bottom:8px\">Pantalla completa: imágenes menores a 1920×1080</div>\n            <div style=\"display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-width:660px\"><sc-for list=\"{{ap.fits}}\" as=\"o\" hint-placeholder-count=\"4\"><button class=\"rz-r\" onClick=\"{{o.pick}}\" aria-pressed=\"{{o.on}}\" style=\"border-color:{{o.bd}};flex-direction:column;align-items:flex-start;gap:3px\"><span style=\"font-size:13px;font-weight:600\">{{o.l}}</span><span style=\"font-size:11px;opacity:.85;line-height:1.4\">{{o.d}}</span></button></sc-for></div>\n          </div>\n          </sc-if>\n        </div>\n      </div>\n    </div>\n  </div>\n  </sc-if>\n</div>";

class Component extends DCLogic {
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
    const tones = ['var(--t1)', 'var(--t2)', 'var(--t3)', 'var(--t4)'];
    const OL = 'var(--pill)';
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
        tabs: [['img', 'Imagen o video'], ['link', 'Enlace'], ['text', 'Texto']].map(([k, l]) => ({ l, on: A.k === k ? 'true' : 'false', bg: A.k === k ? '#fff' : 'var(--t2)', pick: () => this.setAdd({ k }) })),
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
      sortRing: st.sortOpen ? '0 0 0 2px var(--pill),0 0 0 4px #fff' : 'none',
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

export { Component };
