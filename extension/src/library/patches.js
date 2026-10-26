// Ajustes de las pantallas del diseño para que funcionen como extensión real.
// Se aplican sobre las clases y plantillas generadas, así src/screens/*.js queda idéntico
// al diseño y se puede volver a importar sin perder nada.

import { openDB } from '../core/db.js';
import * as settings from '../core/settings.js';
import { applyRules, mergeTags } from '../core/rules.js';
import { embedOf, SPOTIFY_W, SPOTIFY_H } from '../core/embeds.js';
import { mosaicBox, packMosaic, clampPan } from './mosaic.js';
import { previewMeta, fetchBlob } from '../core/pagemeta.js';
import { patchSearchTemplate, searchVals } from './search.js';
import { patchFullscreenTemplate, fullscreenVals } from './fullscreen.js';
import { patchIntroTemplate, introVals } from './intro.js';
import { LANGS } from '../core/i18n.js';
import { notesBackup, restoreNotes, NOTES_KEY } from './notes.js';
import { cloudVals, schedule as cloudSync } from './cloud.js';

const UNSORTED = 'Sin clasificar';

// ---------- plantillas ----------

// Vista previa dentro de la tarjeta de un tablero (imagen o reproductor, sin interacción).
const CARD_PREVIEW = '<sc-if value="{{it.pvOn}}"><span style="flex:1;min-height:0;position:relative;overflow:hidden;background:#1f1f1f">'
  + '<sc-if value="{{it.pvImg}}"><img src="{{it.pvImg}}" alt="" loading="lazy" decoding="async" draggable="false" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></sc-if>'
  + '<sc-if value="{{it.pvFrame}}"><iframe src="{{it.pvFrame}}" title="Vista previa" loading="lazy" tabindex="-1" style="position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none"></iframe></sc-if>'
  + '<sc-if value="{{it.pvPlay}}"><span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:52px;height:52px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center"><svg width="22" height="22" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z" fill="#111"/></svg></span></sc-if>'
  + '</span></sc-if>';

// Reproductor de Spotify ocupando toda la tarjeta de un tablero, escalado desde su tamaño natural.
const SPOTIFY_CARD = '<sc-if value="{{it.spFrame}}"><span style="position:absolute;inset:0;overflow:hidden;background:#1f1f1f">'
  + '<iframe src="{{it.spFrame}}" title="Vista previa" loading="lazy" tabindex="-1" style="{{it.spStyle}}"></iframe></span></sc-if>';

// Reproductor de sitios sin portada (Spotify, X, TikTok, Vimeo) dentro de una pieza del mosaico.
const TILE_FRAME = '<sc-if value="{{t.pvFrame}}"><span style="position:absolute;inset:0;overflow:hidden;background:#1f1f1f">'
  + '<iframe src="{{t.pvFrame}}" title="Vista previa" loading="lazy" tabindex="-1" style="{{t.pvStyle}}"></iframe></span></sc-if>';

// Reproductor dibujado a su tamaño natural y escalado para llenar una caja de ancho w.
const FRAME_FILL = 'position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none';
const spotifyFill = (w) => 'position:absolute;left:0;top:0;width:' + SPOTIFY_W + 'px;height:' + SPOTIFY_H + 'px;border:0;pointer-events:none;'
  + 'transform:scale(' + (w / SPOTIFY_W).toFixed(4) + ');transform-origin:0 0';

// Tamaño de letra de un texto según cuántos caracteres tiene y el lugar disponible (w×h, sin el
// relleno): los textos cortos se ven grandes y los largos bajan hasta el tamaño de lectura.
function fitText(text, w, h, lh) {
  const s = String(text || '').trim();
  if (!s) return 15;
  const lines = s.split('\n').length;
  // Un carácter ocupa ~0,55 em de ancho; el 1,3 deja lugar a los cortes de línea. Las palabras
  // muy largas se cortan donde haga falta (overflow-wrap:anywhere), así que no achican la letra.
  let fs = Math.sqrt((w * h) / (s.length * 0.55 * lh * 1.3));
  fs = Math.min(fs, h / (lines * lh));
  return Math.round(Math.max(13, Math.min(64, fs)));
}

// Ficha completa: el reproductor real (se puede usar) o la imagen de la página.
const FICHA_PREVIEW = '<sc-if value="{{pe.pvOn}}"><div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">'
  + '<sc-if value="{{pe.pvFrame}}"><iframe src="{{pe.pvFrame}}" title="{{pe.title}}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write" allowfullscreen style="{{pe.pvStyle}};border:0;border-radius:10px;background:#000"></iframe></sc-if>'
  + '<sc-if value="{{pe.pvImg}}"><img src="{{pe.pvImg}}" alt="{{pe.title}}" style="flex:1;min-height:0;max-width:100%;object-fit:contain;border-radius:6px"></sc-if>'
  + '</div></sc-if>';

const TEMPLATE_PATCHES = {
  Archivo: [
    ['<sc-if value="{{it.isLink}}" hint-placeholder-val="{{false}}"><span style="display:flex;flex-direction:column;height:100%">', (m) => m + SPOTIFY_CARD + CARD_PREVIEW],
    ['background:var(--pill);font-size:15px;line-height:1.55', () => 'background:var(--pill);font-size:{{it.tfs}}px;line-height:1.55'],
  ],
  Main: [
    ['{{t.dom}}</span></sc-if>', (m) => m + TILE_FRAME],
    ['background:var(--pill);font-size:13px;line-height:1.5', () => 'background:var(--pill);font-size:{{t.tfs}}px;line-height:1.5;overflow-wrap:anywhere'],
    // Entrada de las piezas al doble de lento (los retrasos se duplican en renderVals).
    ['animation:tile-in .8s', () => 'animation:tile-in 1.6s'],
    ['height:{{t.h}}px;border-radius:8px', () => 'height:{{t.h}}px;border-radius:5px'],
  ],
  // La escala de la pantalla usaba {{fs}}, que en el Anotador pisa otro valor (estilos de texto).
  // También pasa la compensación para que el buscador y la botonera no se escalen (overrides.css).
  // Las notas de la grilla, un tercio más grandes (growNotes).
  Anotador: [
    ['scale({{fs}})', () => 'scale({{stageScale}});--ui-k:{{uiK}};--ui-y:{{uiY}}px'],
    ['width:250px;height:333px', () => 'width:' + NOTE_W + 'px;height:' + NOTE_H + 'px'],
  ],
};

// Mosaico: al pasar el mouse, el título y las etiquetas van abajo a la izquierda, igual que en las
// piezas de un tablero (Archivo), en lugar de escribirse letra por letra en el centro.
const TILE_OV = '<div class="ov" style="position:absolute;inset:0;background:rgba(0,0,0,.6);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;font-size:{{t.fs}}px">';
const TILE_OV_END = '\n      </div>\n    </button>';
const TILE_CAPTION = '<div class="ov" style="position:absolute;inset:0;background:rgba(0,0,0,.55);display:flex;flex-direction:column;justify-content:flex-end;padding:14px;box-sizing:border-box;gap:4px;text-align:left">'
  + '<b style="font-size:15px;line-height:1.2;overflow-wrap:anywhere">{{t.name}}</b><span style="font-size:11px">{{t.meta}}</span>';

// Ficha: "+ Nuevo tablero…" en el selector de tablero, con su campo para el nombre (newBoardVals).
const FICHA_BOARDS = '<sc-for list="{{pe.bopts}}" as="o" hint-placeholder-count="2"><option value="{{o.v}}" selected="{{o.sel}}">{{o.l}}</option></sc-for></select>';
const FICHA_NEW_BOARD = '<option value="__new">+ Nuevo tablero…</option></select>'
  + '<sc-if value="{{pe.nbOn}}" hint-placeholder-val="{{false}}"><div style="display:flex;gap:8px;margin-top:8px">'
  + '<input class="in" ref="{{pe.nbRef}}" value="{{pe.nbName}}" onInput="{{pe.nbInput}}" onKeyDown="{{pe.nbKey}}" maxlength="40" placeholder="Nombre del tablero nuevo" aria-label="Nombre del tablero nuevo" style="flex:1;min-width:0;margin:0">'
  + '<button class="ob" onClick="{{pe.nbOk}}" style="flex:none">Crear</button></div></sc-if>';
const FICHA_ANCHOR = '<sc-if value="{{pe.isLink}}" hint-placeholder-val="{{false}}">';

// Ficha completa: botón para ir al sitio de donde viene la referencia, arriba a la izquierda.
const FICHA_LEFT = '<div style="flex:1;min-width:0;background:var(--field);display:flex;align-items:center;justify-content:center;padding:28px;box-sizing:border-box">';
const GO_BUTTON = '<sc-if value="{{pe.goOn}}"><a class="ob" href="{{pe.goHref}}" target="_blank" rel="noopener" title="{{pe.goHref}}" style="position:absolute;left:16px;top:16px;z-index:2;display:inline-flex;align-items:center;gap:6px;text-decoration:none">Ir al sitio'
  + '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h7v7M13 3L4 12"/></svg></a></sc-if>';

// Reglas y ajustes: pestaña Manifesto (el texto del proyecto), antes de la de tableros.
const CREDITS_ANCHOR = '<!-- Tableros -->';
const CREDITS = '<sc-if value="{{rt.creditos}}"><div style="flex:1;padding:20px 28px;overflow:auto">'
  + '<div style="font-size:16px;font-weight:700">Manifesto</div>'
  + '<p style="font-size:14px;line-height:1.65;max-width:620px;margin:14px 0 0">Este proyecto fue hecho con el fin de ayudar a creativos / artistas / quien sea que lo necesite a sentir la capacidad de mantener esta falsa ilusión de posesión en esta etapa tan fugaz del presente en el que habitamos. Aunque sea tan solo por un momento.</p>'
  + '<p style="font-size:14px;line-height:1.65;max-width:620px;margin:12px 0 0">Yo lo necesitaba, por eso lo hice. Estoy seguro que alguien mas en algún lugar del mundo se siente de la misma forma.</p>'
  + '<div style="margin-top:22px;padding-top:16px;border-top:1px solid rgba(255,255,255,.14);max-width:620px;font-size:12px;line-height:1.6;opacity:.85">Archivero es y siempre va a ser open source: el código está abierto para verlo, usarlo y mejorarlo.</div>'
  + '<a class="rz-b o" href="https://github.com/MateoMolina44" target="_blank" rel="noopener" style="margin-top:12px;text-decoration:none">github.com/MateoMolina44'
  + '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h7v7M13 3L4 12"/></svg></a>'
  + '</div></sc-if>';

// Apariencia: idioma de la interfaz, arriba del modo (los nombres de los idiomas no se traducen).
const LANG_ANCHOR = '<div style="font-size:12px;font-weight:600;margin-bottom:8px">Modo</div>';
const LANG_ROW = '<div style="font-size:12px;font-weight:600;margin-bottom:8px">Idioma</div>'
  + '<div style="display:flex;gap:8px;margin-bottom:20px"><sc-for list="{{langOpts}}" as="o"><button class="rz-b s" onClick="{{o.pick}}" aria-pressed="{{o.on}}" lang="{{o.k}}" style="height:32px;padding:0 16px;background:{{o.bg}};color:#111">{{o.l}}</button></sc-for></div>';

// Reglas y ajustes: sin el bloque "Proyecto activo" (la función de proyectos se sacó por ahora).
const PROJECT_FOOTER = '<div style="margin-top:22px;padding:0 14px;font-size:12px;line-height:1.5;opacity:.75">Proyecto activo<br><b style="font-size:13px;opacity:1">{{rProjName}}</b></div>';

function patchTemplate(name, template) {
  const list = (TEMPLATE_PATCHES[name] || []).slice();
  if (template.includes(FICHA_ANCHOR)) list.push([FICHA_ANCHOR, (m) => FICHA_PREVIEW + m]);
  if (template.includes(FICHA_LEFT)) list.push([FICHA_LEFT, (m) => m.replace('box-sizing:border-box">', 'box-sizing:border-box;position:relative">') + GO_BUTTON]);
  if (template.includes(PROJECT_FOOTER)) list.push([PROJECT_FOOTER, () => '']);
  if (template.includes(CREDITS_ANCHOR)) list.push([CREDITS_ANCHOR, (m) => CREDITS + m]);
  if (template.includes(LANG_ANCHOR)) list.push([LANG_ANCHOR, (m) => LANG_ROW + m]);
  if (template.includes(FICHA_BOARDS)) list.push([FICHA_BOARDS, (m) => m.replace('</select>', FICHA_NEW_BOARD)]);
  for (const [find, make] of list) {
    if (!template.includes(find)) {
      console.warn('[Archivero] El diseño cambió: no encontré', find, 'en', name);
      continue;
    }
    template = template.split(find).join(make(find));
  }
  template = cutMockups(name, template);
  if (name === 'Main' && INTRO) template = patchIntroTemplate(template);
  if (name === 'Main1') template = patchFullscreenTemplate(template);
  return patchSearchTemplate(name, template);
}

// Quita de la plantilla el tramo que empieza en `from` y llega hasta `to` (que también se quita si
// withTo). Si el diseño cambió y no lo encuentra, la deja como está.
function cut(name, template, from, to, withTo) {
  const a = template.indexOf(from);
  const b = a < 0 ? -1 : template.indexOf(to, a + from.length);
  if (b < 0) {
    console.warn('[Archivero] El diseño cambió: no encontré', from, 'en', name);
    return template;
  }
  return template.slice(0, a) + template.slice(withTo ? b + to.length : b);
}

// Partes del diseño que eran maquetas y en la extensión no hacen nada:
// - "Sincronizar en la nube": la fila de la maqueta (interruptor y aviso de maqueta) se cambia por la
//   cuenta real (cloud.js): iniciar sesión con Google, sincronizar ahora y cerrar sesión.
// - La herramienta "Captura de pantalla" del Anotador, que insertaba un rectángulo gris de ejemplo.
// - En el mosaico, la pieza elevada con su resumen: tocar una pieza abre directamente la ficha.
const CLOUD_ROW = '<div class="rz-r" style="cursor:default;max-width:620px">\n              <span style="flex:1;min-width:0"><span style="display:block;font-size:14px;font-weight:600">Sincronizar en la nube</span>';
const LOCAL_TITLE = '<div style="font-size:14px;font-weight:700;margin-bottom:8px">Copia local</div>';
const CLOUD_ACCOUNT = `<div class="rz-r" style="cursor:default;max-width:620px;flex-wrap:wrap;row-gap:8px">
              <span style="flex:1;min-width:220px"><span style="display:block;font-size:14px;font-weight:600">Sincronizar en la nube</span><span style="display:block;font-size:12px;opacity:.85;margin-top:2px">{{cl.status}}</span></span>
              <sc-if value="{{cl.out}}" hint-placeholder-val="{{false}}"><button class="rz-b s" onClick="{{cl.signIn}}" style="height:30px">Iniciar sesión con Google</button></sc-if>
              <sc-if value="{{cl.in}}" hint-placeholder-val="{{false}}"><button class="rz-b o s" onClick="{{cl.sync}}" style="height:30px">Sincronizar ahora</button><button class="rz-b o s" onClick="{{cl.signOut}}" style="height:30px">Cerrar sesión</button></sc-if>
            </div>
            <div style="font-size:12px;opacity:.75;margin:8px 0 22px;max-width:620px">Se sincronizan tus piezas, imágenes, tableros, notas, reglas y apariencia entre la extensión, la web y tus otras computadoras.</div>
            `;
function cutMockups(name, template) {
  if (template.includes(CLOUD_ROW)) {
    const a = template.indexOf(CLOUD_ROW);
    template = cut(name, template, CLOUD_ROW, LOCAL_TITLE, false);
    template = template.slice(0, a) + CLOUD_ACCOUNT + template.slice(a);
  }
  if (name === 'Anotador') {
    template = cut(name, template, '<button onClick="{{tShot}}"', '</button>', true);
    template = cut(name, template, '<sc-if value="{{o.shot}}"', '</sc-if>', true);
  }
  if (name === 'Main') {
    template = cut(name, template, '<sc-if value="{{sel}}"', '<!-- Pieza: ver y editar -->', false);
    const a = template.indexOf(TILE_OV);
    template = cut(name, template, TILE_OV, TILE_OV_END, false);
    if (a >= 0 && !template.includes(TILE_OV)) template = template.slice(0, a) + TILE_CAPTION + template.slice(a);
  }
  return template;
}

// ---------- vistas previas de enlaces ----------

// Estilo del reproductor en la ficha: videos en 16:9, Spotify en su alto fijo (352 px, el único
// tamaño que muestra bien) y el resto (X, TikTok) a todo el alto.
const frameStyle = (pv) => (pv.site === 'spotify' ? 'width:100%;max-width:760px;height:352px;flex:none'
  : pv.video ? 'width:100%;aspect-ratio:16/9;max-height:100%;flex:none'
  : 'flex:1;width:100%;min-height:0');

// Vista previa de un enlace. Las tarjetas y el mosaico usan una imagen fija (portada o imagen de la
// página); el reproductor real queda para la ficha. Si todavía no hay imagen, se busca en segundo plano.
function previewOf(inst, it) {
  if (!it || it.kind !== 'link') return null;
  const e = embedOf(it.url);
  // Spotify se muestra siempre con su reproductor, también en las tarjetas y el mosaico.
  if (e && e.site === 'spotify') return { img: '', frame: e.frame, cardFrame: e.frame, play: false, site: e.site, spotify: true };
  const saved = it.pv ? inst.srcOf({ id: 'prev:' + it.id }) : '';
  if (!it.pv && !(e && e.thumb)) fetchPreview(inst, it);
  if (e) {
    const img = e.thumb || saved;
    const video = e.site === 'youtube' || e.site === 'vimeo';
    return { img, frame: e.frame, cardFrame: img ? '' : e.frame, play: !!img && (video || e.site === 'spotify'), video, site: e.site };
  }
  return saved ? { img: saved, frame: '', cardFrame: '', play: false } : null;
}

// Busca la imagen de vista previa de un enlace (una vez por pieza) y la guarda en los medios.
const fetching = new Set();
async function fetchPreview(inst, it) {
  if (it.pvTry || fetching.has(it.id) || !/^https?:\/\//.test(it.url || '')) return;
  fetching.add(it.id);
  try {
    const m = await previewMeta(it.url);
    const blob = m.image ? await fetchBlob(m.image, 'image/', 8) : null;
    if (inst._dead) return;
    if (blob) { inst.mediaPut('prev:' + it.id, blob); it.pv = true; }
    it.pvTry = true;
    inst.commit();
  } catch {
    /* sin vista previa: queda la tarjeta gris */
  } finally {
    fetching.delete(it.id);
  }
}

// ---------- pantallas ----------

// Intro del mosaico (el cajón de intro.js): apagada por ahora.
const INTRO = false;

// Espacio entre las piezas del mosaico, en px.
const MOSAIC_GAP = 24;

// Notas de la grilla del Anotador: un tercio más grandes que en el diseño (250×333).
const NOTE_W = 333, NOTE_H = 444, NOTE_GAP = 28;

export function prepareScreen(screen) {
  patchClass(screen.name, screen.Component);
  const props = screen.name === 'Main' && !INTRO ? Object.assign({}, screen.props, { intro: 'nunca' }) : screen.props;
  return Object.assign({}, screen, { props, template: patchTemplate(screen.name, screen.template) });
}

function patchClass(name, Component) {
  const proto = Component.prototype;

  // Medios: la misma base IndexedDB que usa el service worker (versión 2, store 'media').
  proto.mediaDB = function (cb) {
    if (this._db) return cb(this._db);
    if (this._dbFail) return cb(null);
    openDB().then(
      (db) => { this._db = db; cb(db); },
      () => { this._dbFail = true; cb(null); }
    );
  };

  // Ficha completa con la vista previa real del enlace.
  if (proto.fichaVals) {
    const fichaVals = proto.fichaVals;
    proto.fichaVals = function (forceId, onClose) {
      const vals = fichaVals.call(this, forceId, onClose);
      const id = forceId || this.state.edId;
      const pv = id ? previewOf(this, this.lib().items.find((x) => x.id === id)) : null;
      if (pv && vals.pe) Object.assign(vals.pe, { pvOn: true, pvFrame: pv.frame, pvStyle: frameStyle(pv), pvImg: pv.frame ? '' : pv.img, isLink: false });
      return vals;
    };
  }

  // Notas con id único (el diseño las numeraba n1, n2…): con la nube, dos computadoras crearían la misma.
  if (name === 'Anotador') {
    const blank = proto.blank;
    proto.blank = function (title) {
      const nt = blank.call(this, title);
      nt.id = 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      return nt;
    };
  }

  if (name === 'Main') {
    // El diseño pide el mosaico con 12 px entre piezas; acá va siempre MOSAIC_GAP.
    proto.mchunk = function (its, VW, VH) {
      const G = MOSAIC_GAP;
      const key = its.map((i) => i.id + ':' + (i.ow || '') + 'x' + (i.oh || '')).join(',') + '|' + VW + 'x' + VH;
      if (this._mc && this._mc.key === key) return this._mc;
      const lay = packMosaic(its.map((it) => { const [w, h] = mosaicBox(this, it, isSpotify(it)); return { it, w, h }; }), VW, VH, G);
      this._mc = { key, W: lay.W, H: lay.H, lay, cells: (ci, cj) => (ci === 0 && cj === 0 ? lay.cells : []) };
      return this._mc;
    };
    // Tocar una pieza abre directamente su ficha completa (antes la elevaba y mostraba un resumen
    // al costado, con "Ver ficha completa").
    proto.pick = function (rect, tone, id) {
      this.lib().selId = id;
      this.commitNow();
      this.setState({ edId: id });
    };
    // El título ya no se escribe letra por letra al pasar el mouse (TILE_CAPTION): sin intervalo.
    proto.startType = function () {};
    proto.stopType = function () {};
  }

  // Tableros: Spotify ocupa una tarjeta horizontal, con la proporción de su reproductor.
  if (proto.shapeOf) {
    const shapeOf = proto.shapeOf;
    proto.shapeOf = function (it) {
      if (isSpotify(it)) return { a: SPOTIFY_W / SPOTIFY_H, c: 2, lab: 'música embebida · horizontal' };
      // Textos: la tarjeta crece con la cantidad de caracteres (fila más alta y más ancha).
      if (it && it.kind === 'text') {
        const L = (it.text || '').trim().length;
        const c = L < 80 ? 1 : L < 400 ? 2 : 3;
        return { a: Math.min(3.2, 1.2 + L / 400), c, lab: 'texto ' + ['', 'corto', 'medio', 'largo'][c] };
      }
      return shapeOf.call(this, it);
    };
  }

  // Pantalla completa (vista 1): solo imágenes y enlaces a páginas web (sin reproductores).
  // El diseño escribía "Buscar…" letra por letra con un intervalo que redibuja la pantalla cada
  // 40 ms durante varios segundos al entrar. El buscador ahora tiene el texto fijo: se corta.
  // En la pantalla completa también se corta la escritura del título de la vista anterior.
  if (proto.componentDidMount) {
    const didMount = proto.componentDidMount;
    proto.componentDidMount = function () {
      didMount.call(this);
      clearInterval(this.tiv);
      if (name === 'Main1') clearTimeout(this.t1);
    };
  }

  if (name === 'Main1') {
    // La vista anterior (una pieza por pantalla, con su título e información) ya no se dibuja
    // (fullscreen.js): sin nombres, el diseño no arma sus piezas en cada cuadro.
    proto.names = function () { return []; };
    proto.order = function () {
      const all = this.allItems().filter(fitsFullscreen);
      const ids = all.map((x) => x.id);
      if (!this._perm) {
        this._perm = ids.slice();
        for (let i = this._perm.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [this._perm[i], this._perm[j]] = [this._perm[j], this._perm[i]]; }
      }
      // Lo nuevo entra adelante; lo que se borró (o dejó de entrar) sale.
      const known = this._perm.filter((id) => ids.includes(id));
      this._perm = ids.filter((id) => !known.includes(id)).concat(known);
      return this._perm.map((id) => all.find((x) => x.id === id));
    };
  }

  // Apariencia: copia en los ajustes compartidos, para que el aviso al guardar (que se dibuja desde el
  // service worker, sin localStorage) use la misma paleta y tipografía.
  if (proto.uiSet) {
    const uiSet = proto.uiSet;
    proto.uiSet = function (p) {
      const before = this.ui().lang || 'es';
      uiSet.call(this, p);
      const lang = this.ui().lang || 'es';
      const patch = { ui: this.ui() };
      // Las reglas de ejemplo que siguen sin tocar pasan al idioma nuevo.
      if (lang !== before) patch.rules = settings.localizeRules(this.rules || settings.get().rules, lang);
      settings.save(patch);
      // El idioma cambia los textos fijos de la pantalla: main.js la vuelve a montar.
      if (lang !== before) window.dispatchEvent(new Event('archivero:lang'));
      cloudSync();
    };
  }

  const renderVals = proto.renderVals;
  proto.renderVals = function () {
    let mc = null;
    if (name === 'Main') {
      const VW = window.innerWidth || 1440, VH = window.innerHeight || 900;
      const its = this.allItems();
      if (its.length) {
        mc = this.mchunk(its, VW, VH);
        // La primera vez se encuadra el mosaico; después el lienzo se arrastra sin límite.
        if (!this._panInit) {
          this._panInit = true;
          [this.state.px, this.state.py] = clampPan(mc.W, mc.H, VW, VH, 1e6, 1e6);
        }
      }
    }
    const vals = renderVals.call(this);

    // Apariencia → Idioma.
    if (this.ui) {
      const cur = this.ui().lang || 'es';
      vals.langOpts = LANGS.map(([k, l]) => ({ k, l, on: cur === k ? 'true' : 'false', bg: cur === k ? '#fff' : 'var(--chip)', pick: () => this.uiSet({ lang: k }) }));
    }

    // Buscador: sin la animación de escritura (queda el brillo del diseño) y con búsqueda real (search.js).
    if (vals.s) vals.s = { t: 'Buscar…', c: false };
    searchVals(this, name, vals);

    // Ficha completa: botón "Ir al sitio" cuando la pieza tiene la dirección de origen.
    if (vals.pe) { vals.pe.goHref = vals.pe.url || ''; vals.pe.goOn = /^https?:\/\//.test(vals.pe.goHref); }

    // Agregar pieza: la pestaña elegida en blanco con texto oscuro; las otras con texto blanco.
    if (vals.add && vals.add.tabs) vals.add.tabs.forEach((t) => { if (String(t.on) !== 'true') t.bg = 'transparent;color:#fff;border:1px solid rgba(255,255,255,.3)'; });

    // Archivo arma su ficha acá y no en fichaVals().
    if (vals.edOn && vals.pe && !vals.pe.pvOn && this.state.edId) {
      const pv = previewOf(this, this.lib().items.find((x) => x.id === this.state.edId));
      if (pv) Object.assign(vals.pe, { pvOn: true, pvFrame: pv.frame, pvStyle: frameStyle(pv), pvImg: pv.frame ? '' : pv.img, isLink: false });
    }

    if (name === 'Main' && mc && vals.tiles) {
      vals.tiles.forEach((t, i) => {
        t.delay = (parseFloat(t.delay) * 2).toFixed(2) + 's';
        const c = mc.lay.cells[i];
        // Misma leyenda que las piezas de un tablero (Archivo): etiquetas · tamaño · forma · resolución.
        if (c) t.meta = [this.tagsOf(c.it), this.shapeOf(c.it).lab].filter(Boolean).join(' · ');
        if (c && c.it.kind === 'text') t.tfs = fitText(c.it.text, t.w - 32, t.h - 28, 1.5);
        const pv = c && previewOf(this, c.it);
        if (!pv) return;
        if (pv.img) {
          t.bg = 'url("' + pv.img + '") center/cover no-repeat';
          t.isLink = false;
        }
        else if (pv.cardFrame) { t.pvFrame = pv.cardFrame; t.pvStyle = pv.spotify ? spotifyFill(t.w) : FRAME_FILL; t.isLink = false; }
      });
    }
    if (name === 'Main' && INTRO) introVals(vals);
    if (name === 'Main') leftDrag(this, vals);
    if (vals.pe && vals.pe.onBoard) newBoardVals(this, vals.pe);

    if (name === 'Archivo' && vals.cards && this.curBoard) {
      const b = this.curBoard();
      const its = b ? this.sortedItems(b) : [];
      vals.cards.forEach((c, i) => {
        const it = its[i];
        if (it && it.kind === 'text') c.tfs = fitText(it.text, c.w - 44, c.h - 40 - (it.title ? 32 : 0), 1.55);
        const pv = previewOf(this, it);
        if (!pv) return;
        if (pv.spotify) Object.assign(c, { spFrame: pv.frame, spStyle: spotifyFill(c.w), embPost: false, embDark: false });
        else Object.assign(c, { pvOn: true, pvImg: pv.img, pvFrame: pv.img ? '' : pv.cardFrame, pvPlay: pv.play, embPost: false, embDark: false });
      });
    }

    if (name === 'Main1') fullscreenVals(this, vals, previewOf);

    if (name === 'Anotador') {
      // El escenario de 1440×900 se escala para entrar en la ventana. (stageFit del diseño no
      // llegaba a aplicar la escala y quedaba siempre en 1, recortado en ventanas chicas.)
      // El buscador y la botonera viven dentro del escenario: se compensa la escala para que
      // tengan el mismo tamaño y la misma distancia a los bordes de la ventana que en las demás vistas.
      growNotes(this, vals);
      const VW = window.innerWidth || 1440, VH = window.innerHeight || 900;
      const k = Math.min(VW / 1440, VH / 900) || 1;
      vals.stageScale = k.toFixed(4);
      // Se compensa con zoom (y no transform, que usan sus animaciones); con zoom las distancias
      // también se multiplican, por eso uiY va en px "antes del zoom".
      vals.uiK = (1 / k).toFixed(4);
      vals.uiY = (450 * k - VH / 2 + 20).toFixed(2);
      if (!this._fitResize) {
        this._fitResize = () => { if (this._dead) window.removeEventListener('resize', this._fitResize); else this.forceUpdate(); };
        window.addEventListener('resize', this._fitResize);
      }
      // La capa de la nota abierta se escondía solo con opacidad y desenfoque: quedaba "fantasma"
      // (borrosa) mientras cambiaba de estado. Ahora también se oculta del todo.
      if (vals.bookLyr) {
        const hidden = /opacity:0;/.test(vals.bookLyr);
        const instant = !this.notes || !this.notes.length;
        vals.bookLyr += hidden
          ? ';visibility:hidden;transition:' + (instant ? 'none' : 'opacity .7s cubic-bezier(.19,1,.22,1),transform .9s cubic-bezier(.19,1,.22,1),filter .7s cubic-bezier(.19,1,.22,1),visibility 0s .7s')
          : ';visibility:visible';
      }
    }
    return vals;
  };

  if (!proto.R) return;

  // Reglas, proyectos y preferencias: persistentes y compartidos con la extensión.
  proto.R = function () {
    if (!this.rules) {
      const s = settings.get();
      this.rules = s.rules;
      this.rseq = s.rseq;
      this.rprojs = s.projs;
      this.rprefs = s.prefs;
      this.state = Object.assign({}, this.state, { rproj: s.proj });
      this._rsaved = snapshot(this);
    }
    return this.rules;
  };

  const rulesVals = proto.rulesVals;
  proto.rulesVals = function () {
    const vals = rulesVals.call(this);
    // Cualquier cambio hecho desde el panel (editar, mover, activar, proyecto activo…) se guarda.
    const snap = snapshot(this);
    if (snap !== this._rsaved) {
      this._rsaved = snap;
      settings.save({ rules: this.rules, rseq: this.rseq, projs: this.rprojs, prefs: this.rprefs, proj: this.state.rproj || 0 });
      cloudSync();
    }
    // Proyectos: fuera de la barra lateral y de los tipos de condición.
    if (vals.rTabs) vals.rTabs = vals.rTabs.filter((t) => t.label !== 'Proyectos');
    // Cuenta en la nube (cloud.js). La "copia automática en este equipo" era un interruptor sin función.
    vals.cl = cloudVals();
    if (vals.rPrefs) vals.rPrefs = vals.rPrefs.filter((o) => o.label !== 'Guardar también una copia automática en este equipo');
    if (vals.rTabs && vals.rt) {
      const on = this.state.rtab === 'creditos';
      vals.rt.creditos = on;
      vals.rTabs.push({ label: 'Manifesto', bg: on ? 'rgba(255,255,255,.16)' : 'transparent', pick: () => this.setState({ rtab: 'creditos', rmsg: '' }) });
    }
    if (vals.ed && vals.ed.conds) vals.ed.conds.forEach((c) => { c.kinds = c.kinds.filter((k) => k.v !== 'proj'); });
    // "Volver a aplicar" de verdad, sobre lo que está en Sin clasificar.
    vals.reapply = () => this.setState({ rmsg: reapply(this) });
    // Copia local con las notas del Anotador.
    if (vals.rExport) vals.rExport = () => backupExport(this);
    if (vals.rImpFile) vals.rImpFile = (e) => backupImport(this, e);
    // El diseño suma "Sin clasificar" como tablero virtual; acá ya existe como tablero real.
    if (vals.ed && vals.ed.tos) vals.ed.tos = vals.ed.tos.filter((t, i, a) => a.findIndex((x) => x.v === t.v) === i);
    if (vals.rBoards) vals.rBoards = vals.rBoards.filter((b, i, a) => a.findIndex((x) => x.name === b.name) === i);
    return vals;
  };
}

// Mosaico: además de con el botón del medio, el lienzo se arrastra con el izquierdo. Un clic sin
// mover sigue abriendo la pieza; después de arrastrar, el clic que dispara el navegador se descarta.
const DRAG_MIN = 5; // px que hay que mover para que cuente como arrastre
const NO_DRAG = 'button:not(.tile),a,input,select,textarea,label,.sb,.sec,.bz,.rz,.mdl';
function leftDrag(inst, vals) {
  const { down, move, up } = vals;
  vals.down = (e) => {
    if (e.button !== 0) return down(e);
    if (inst.state.edId || inst.state.sq !== 'off' || inst.state.rq !== 'off' || e.target.closest(NO_DRAG)) return;
    inst._ld = { x: e.clientX, y: e.clientY, on: false };
  };
  vals.move = (e) => {
    const d = inst._ld;
    if (d && !(e.buttons & 1)) inst._ld = null;
    else if (d && !d.on) {
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) < DRAG_MIN) return;
      d.on = true;
      inst.drag = { x: d.x, y: d.y, px: inst.state.px, py: inst.state.py };
      inst.setState({ panning: true });
    }
    if (d && d.on) e.preventDefault();
    move(e);
  };
  vals.up = (e) => {
    const d = inst._ld;
    inst._ld = null;
    if (d && d.on) swallowClick();
    up(e);
  };
}

function swallowClick() {
  const stop = (e) => { e.stopPropagation(); e.preventDefault(); };
  window.addEventListener('click', stop, true);
  setTimeout(() => window.removeEventListener('click', stop, true), 0);
}

// Ficha: "+ Nuevo tablero…" en el selector de tablero abre un campo para el nombre; al crearlo,
// la pieza pasa a ese tablero. Vale para la ficha de todas las vistas.
function newBoardVals(inst, pe) {
  const id = inst.state.edId;
  const nb = inst._nb && inst._nb.id === id ? inst._nb : null;
  const onBoard = pe.onBoard;
  pe.onBoard = (e) => {
    if (e.target.value !== '__new') { inst._nb = null; return onBoard(e); }
    const cur = pe.bopts.find((o) => o.sel);
    e.target.value = cur ? cur.v : '';
    inst._nb = { id, name: '', select: e.target };
    inst.forceUpdate();
  };
  pe.nbOn = !!nb;
  if (!nb) return;
  const create = () => {
    const name = nb.name.trim();
    if (!name) return;
    const bid = boardByName(inst, name).id;
    inst._nb = null;
    onBoard({ target: { value: bid } });
    // El selector ya fue tocado a mano, así que no sigue al atributo selected: se elige el tablero nuevo
    // cuando ya está su opción.
    setTimeout(() => { nb.select.value = bid; }, 0);
  };
  pe.nbName = nb.name;
  pe.nbRef = (el) => { if (el && !el._f) { el._f = true; setTimeout(() => el.focus({ preventScroll: true }), 30); } };
  pe.nbInput = (e) => { nb.name = e.target.value; };
  pe.nbKey = (e) => {
    if (e.key === 'Enter') create();
    else if (e.key === 'Escape') { e.stopPropagation(); inst._nb = null; inst.forceUpdate(); }
  };
  pe.nbOk = create;
}

// Anotador: la grilla de notas con las notas un tercio más grandes. Repite el armado de la grilla
// del diseño (renderVals de Anotador) con NOTE_W×NOTE_H en lugar de 250×333.
function growNotes(inst, vals) {
  const all = inst.notes || [];
  if (!vals.tiles || !all.length) return;
  const { px, py, mxp, myp } = inst.state;
  const mod = (v, m) => ((v % m) + m) % m;
  const lim = (v, m) => Math.max(-m, Math.min(m, v));
  const GW = NOTE_W, GH = NOTE_H, G = NOTE_GAP;
  const wrap = all.length >= 12;
  const COLS = wrap ? 4 : Math.max(1, Math.min(4, all.length)), rows = Math.max(1, Math.ceil(all.length / COLS));
  const W = COLS * (GW + G), H = rows * (GH + G);
  const totW = W - G, totH = H - G;
  const bx = wrap ? 40 : (1440 - totW) / 2, by = wrap ? 90 : Math.max(110, (900 - totH) / 2);
  inst.panLim = wrap ? null : [totW / 2 + 300, totH / 2 + 300];
  const ox = wrap ? mod(px, W) : lim(px, totW / 2 + 300), oy = wrap ? mod(py, H) : lim(py, totH / 2 + 300);
  const rg = wrap ? [-1, 0, 1] : [0];
  const mk = inst.rm ? 0 : 1;
  let n = 0;
  for (const cx of rg) for (const cy of rg) all.forEach((_, k) => {
    const t = vals.tiles[n++];
    if (!t) return;
    t.l = bx + (k % COLS) * (GW + G) + cx * W;
    t.t = by + Math.floor(k / COLS) * (GH + G) + cy * H;
    const sx = t.l + ox + GW / 2, sy = t.t + oy + GH / 2;
    const nx = Math.max(-1.3, Math.min(1.3, (sx - 720) / 720)), ny = Math.max(-1.3, Math.min(1.3, (sy - 450) / 450));
    const mdx = Math.max(-1, Math.min(1, (mxp - sx) / 720)), mdy = Math.max(-1, Math.min(1, (myp - sy) / 450));
    t.tf = 'perspective(1100px) rotateY(' + (nx * 16 + mdx * 27 * mk).toFixed(1) + 'deg) rotateX(' + (-ny * 11 - mdy * 21 * mk).toFixed(1) + 'deg)';
  });
  vals.world = 'position:absolute;left:0;top:0;width:100%;height:100%;will-change:transform;transform:translate3d(' + ox + 'px,' + oy + 'px,0)';
}

function isSpotify(it) {
  const e = it && it.kind === 'link' ? embedOf(it.url) : null;
  return !!e && e.site === 'spotify';
}

// Entra en la pantalla completa: imágenes (y GIF) o enlaces a páginas que no son un reproductor.
function fitsFullscreen(it) {
  return it.kind === 'img' || (it.kind === 'link' && !embedOf(it.url));
}

// Copia local. Igual que la del diseño, más las notas del Anotador: viven en la misma store de medios
// pero son un objeto (no un archivo), y la del diseño las dejaba afuera al pasar todo a data URL.
// Van en su propio campo; una copia vieja, sin ese campo, no toca las notas actuales.
function backupExport(inst) {
  const L = inst.lib();
  const notes = notesBackup();
  const out = { app: 'archivero', v: 1, exported: Date.now(), lib: L, media: {}, notes };
  const conv = (v) => new Promise((res) => {
    if (typeof v === 'string') return res(v);
    if (!(v instanceof Blob)) return res('');
    const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = () => res(''); fr.readAsDataURL(v);
  });
  const finish = (m) => {
    delete m[NOTES_KEY];
    Promise.all(Object.keys(m).map((k) => conv(m[k]).then((d) => { if (d) out.media[k] = d; }))).then(() => {
      try {
        const url = URL.createObjectURL(new Blob([JSON.stringify(out)], { type: 'application/json' }));
        if (inst.rDl) { inst.rDl.href = url; inst.rDl.click(); }
        inst.setState({ rmsg: 'Copia descargada: ' + backupSummary(L, notes) });
      } catch (e) { inst.setState({ rmsg: 'No se pudo descargar la copia desde acá.' }); }
    });
  };
  inst.mediaDB((db) => {
    const m = Object.assign({}, inst._media || {});
    if (!db) return finish(m);
    try {
      const rq = db.transaction('media', 'readonly').objectStore('media').openCursor();
      rq.onsuccess = () => { const c = rq.result; if (c) { m[c.key] = c.value; c.continue(); } else finish(m); };
      rq.onerror = () => finish(m);
    } catch (e) { finish(m); }
  });
}

function backupImport(inst, e) {
  const f = e.target.files && e.target.files[0]; e.target.value = ''; if (!f) return;
  const fr = new FileReader();
  fr.onload = () => {
    let d = null;
    try { d = JSON.parse(fr.result); } catch (er) { d = null; }
    if (!d || !d.lib || !Array.isArray(d.lib.boards) || !Array.isArray(d.lib.items)) return inst.setState({ rmsg: 'Ese archivo no es una copia de Archivero.' });
    inst._lib = d.lib;
    Object.keys(d.media || {}).forEach((k) => { if (k !== NOTES_KEY) inst.mediaPut(k, d.media[k]); });
    inst._urls = {};
    const notes = d.notes && Array.isArray(d.notes.notes) ? d.notes : null;
    if (notes) restoreNotes(notes);
    inst.commit();
    inst.setState({ rmsg: 'Copia restaurada: ' + backupSummary(d.lib, notes || notesBackup()) });
  };
  fr.readAsText(f);
}

const backupSummary = (L, notes) => L.items.length + ' piezas, ' + L.boards.length + ' tableros y ' + notes.notes.length + ' notas.';

function snapshot(inst) {
  return JSON.stringify([inst.rules, inst.rseq, inst.rprojs, inst.rprefs, inst.state.rproj || 0]);
}

export function unsortedBoard(inst) {
  const L = inst.lib();
  let b = L.boards.find((x) => x.name === UNSORTED);
  if (!b) {
    b = { id: inst.uid(), name: UNSORTED, t: Date.now(), sort: 'recent', man: [] };
    L.boards.push(b);
  }
  return b;
}

// Tablero por nombre (el que eligen las reglas, el popup o el aviso). Vacío → Sin clasificar.
// Si no existe se crea: desde la extensión se pueden crear tableros nuevos.
export function boardByName(inst, name) {
  const L = inst.lib();
  name = String(name || '').trim();
  if (!name || name === UNSORTED) return unsortedBoard(inst);
  let b = L.boards.find((x) => x.name === name);
  if (!b) {
    b = { id: inst.uid(), name, t: Date.now(), sort: 'recent', man: [] };
    L.boards.push(b);
  }
  return b;
}

function reapply(inst) {
  const L = inst.lib();
  const s = settings.get();
  const known = new Set(L.boards.filter((b) => b.name !== UNSORTED).map((b) => b.id));
  const target = L.items.filter((i) => !known.has(i.bid));
  if (!target.length) return 'No hay piezas en Sin clasificar.';
  let moved = 0;
  for (const it of target) {
    const r = applyRules(it, inst.rules, { project: settings.activeProject(s) });
    if (r.tags.length) it.tags = mergeTags(it.tags, r.tags);
    const b = r.to && r.to !== UNSORTED && L.boards.find((x) => x.name === r.to);
    if (b) { it.bid = b.id; moved++; }
  }
  inst.commit();
  return 'Listo: ' + moved + ' piezas clasificadas, ' + (target.length - moved) + ' siguen en Sin clasificar.';
}
