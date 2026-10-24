(function(){
class DCLogic{constructor(props){this.props=props||{};this.state={};this._root=null}
 setState(p){const o=typeof p==='function'?p(this.state):p;this.state=Object.assign({},this.state,o);this._rq()}
 forceUpdate(){this._rq()}
 _rq(){if(this._q)return;this._q=true;requestAnimationFrame(()=>{this._q=false;this._render&&this._render()})}}
window.DCLogic=DCLogic;
const EVT={onClick:'click',onMouseDown:'mousedown',onMouseUp:'mouseup',onMouseMove:'mousemove',onMouseEnter:'mouseenter',onMouseLeave:'mouseleave',onWheel:'wheel',onFocus:'focus',onBlur:'blur',onAuxClick:'auxclick',onChange:'change',onInput:'input',onKeyDown:'keydown',onPointerDown:'pointerdown',onPointerMove:'pointermove',onPointerUp:'pointerup',onContextMenu:'contextmenu'};
function look(scope,path){path=path.trim();if(path==='true')return true;if(path==='false')return false;let v=scope;for(const k of path.split('.')){if(v==null)return undefined;v=v[k]}return v}
function build(node,scope,out){
 if(node.nodeType===3){const t=node.textContent;out.push({t:'#t',v:t.replace(/\{\{([^}]+)\}\}/g,(m,p)=>{const x=look(scope,p);return x==null?'':x})});return}
 if(node.nodeType!==1)return;
 const tag=node.tagName.toLowerCase();
 if(tag==='helmet')return;
 if(tag==='sc-for'){const list=look(scope,node.getAttribute('list').match(/\{\{(.*)\}\}/)[1])||[];const as=node.getAttribute('as');list.forEach((it,i)=>{const s=Object.assign({},scope,{[as]:it,$index:i});node.childNodes.forEach(c=>build(c,s,out))});return}
 if(tag==='sc-if'){const v=look(scope,node.getAttribute('value').match(/\{\{(.*)\}\}/)[1]);if(v)node.childNodes.forEach(c=>build(c,scope,out));return}
 const attrs={},ev={};let ref=null;
 for(const a of node.attributes){let val=a.value;const m=val.match(/^\{\{(.*)\}\}$/);
  if(a.name.startsWith('hint-'))continue;
  if(m){const x=look(scope,m[1]);if(a.name==='ref'){ref=x;continue}if(/^on[a-z]/.test(a.name)){ev[a.name.slice(2)]=x;continue}attrs[a.name]=x}
  else attrs[a.name]=val.replace(/\{\{([^}]+)\}\}/g,(mm,p)=>{const x=look(scope,p);return x==null?'':x})}
 const kids=[];node.childNodes.forEach(c=>build(c,scope,kids));
 out.push({t:tag,attrs,ev,ref,kids,ns:node.namespaceURI});
}
function mk(v){if(v.t==='#t')return document.createTextNode(v.v);const el=v.ns?document.createElementNS(v.ns,v.t):document.createElement(v.t);el._h={};patch(el,v);return el}
function setAttrs(el,v){const old=el._a||{};for(const k in old)if(!(k in v.attrs))el.removeAttribute(k);
 for(const k in v.attrs){let x=v.attrs[k];const n=k==='class'?'class':k==='for'?'for':k;if(x===false||x==null){el.removeAttribute(n);continue}if(typeof x!=='string')x=String(x);
  if(old[k]!==v.attrs[k]||(n==='value'&&el.value!==x)){el.setAttribute(n,x);if(n==='value')el.value=x}}
 el._a=v.attrs}
function patch(el,v){setAttrs(el,v);
 for(const e in (el._h||{}))if(!(e in v.ev)){el.removeEventListener(e,el._h[e].f);delete el._h[e]}
 for(const e in v.ev){if(!el._h[e]){const o={fn:null};o.f=(ev)=>o.fn&&o.fn(ev);el.addEventListener(e,o.f);el._h[e]=o}el._h[e].fn=v.ev[e]}
 if(v.ref)v.ref(el);
 morph(el,v.kids)}
function morph(parent,kids){let i=0;for(;i<kids.length;i++){const v=kids[i];const cur=parent.childNodes[i];
  if(!cur){parent.appendChild(mk(v));continue}
  if(v.t==='#t'){if(cur.nodeType===3){if(cur.textContent!==v.v)cur.textContent=v.v}else parent.replaceChild(mk(v),cur);continue}
  if(cur.nodeType===1&&cur.tagName.toLowerCase()===v.t)patch(cur,v);else parent.replaceChild(mk(v),cur)}
 while(parent.childNodes.length>kids.length)parent.removeChild(parent.lastChild)}
window.addEventListener('DOMContentLoaded',()=>{
 const x=document.querySelector('x-dc');const hel=x.querySelector('helmet');
 if(hel){[...hel.children].forEach(c=>document.head.appendChild(c))}
 const tpl=x.cloneNode(true);const holder=document.createElement('div');holder.style.cssText='display:contents';
 x.innerHTML='';x.style.display='contents';x.appendChild(holder);
 const sc=document.querySelector('script[type="text/x-dc"]');
 const props={};try{const dp=JSON.parse(sc.getAttribute('data-props')||'{}');for(const k in dp){if(dp[k]&&dp[k].default!==undefined)props[k]=dp[k].default}}catch(e){}
 const C=new Function('DCLogic',sc.textContent+';return Component;')(DCLogic);
 const inst=new C(props);
 inst._render=()=>{const vals=inst.renderVals();const kids=[];tpl.childNodes.forEach(c=>build(c,vals,kids));morph(holder,kids)};
 inst._render();inst.componentDidMount&&inst.componentDidMount();
 window.__dc=inst;
 // links between artboards
 document.addEventListener('click',e=>{const a=e.target.closest('a[href$=".dc.html"]');if(a){e.preventDefault();window.__nav=a.getAttribute('href')}});
});
})();
