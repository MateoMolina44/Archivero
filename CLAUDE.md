# Archivero — contexto para seguir en Claude Code

Resumen de lo decidido en el diseño (Claude Design, "Archivero - referencia visual", versión 41, 23/10/2026) y de cómo quedó la app real (v0.3.6, 24/10/2026). Leelo entero antes de tocar código.

## Quién y cómo
- Usuario: Mateo (Rosario, Argentina). Escribe en **español rioplatense**: respondele en español rioplatense, claro y sin vueltas.
- Forma de trabajo que pidió:
  - Iterar con versiones cortas y ver resultados. Al cerrar una tanda suele pedir "commiteá como v0.x.y y subí la versión en package.json y manifest" (los dos: `extension/package.json` y `extension/public/manifest.json`), y después el push.
  - No mandar zips ni archivos intermedios hasta que algo esté terminado.
  - Cuando haya varias opciones de diseño, mostrarlas para que él elija; no decidir en silencio.
- Figma: `https://www.figma.com/design/WiVy15VitUHjYefBSmO9KB/Trabajo` — node `2059-8` (pantallas, "Frame Animacion 1–6" de la intro con el cajón, barra de búsqueda, botón de sección) y `2082-26` (popup de la extensión).

## Qué es
Archivero = librería personal de inspiraciones (web) + extensión de Chrome que guarda cosas de la web y las organiza sola con reglas. Estilo Milanote/Pinterest/Cosmos. Todo es local (localStorage + IndexedDB + `chrome.storage.local`).

## Carpetas
- `diseno/project/` — el diseño original: archivos `.dc.html` (HTML + `<x-dc>` con `{{huecos}}`, `<sc-for>`, `<sc-if>` y una clase `Component extends DCLogic` con `renderVals()`). Son la base del marcado y del comportamiento; lo que cambió después vive en `extension/src/library/` (ver "Cómo está armado").
- `diseno/generador/` — scripts Python que generan esos `.dc.html`. Ver "Generador del diseño".
- `extension/` — la app real (Vite + extensión MV3). `npm install`, `npm run build` → `dist/` (extensión) y `npm run build:web` → `dist-web/` (web en Vercel). Detalles en `extension/README.md`.
- `PUBLICAR_EN_CHROME.md` — guía para la Chrome Web Store (con las descripciones en ES/EN/PT).
- Web: https://archivero-green.vercel.app — se publica sola con cada push a `main` de https://github.com/MateoMolina44/archivero.

## Cómo está armado (extension/)
- `src/screens/*.js`: copia generada de los `.dc.html` (`npm run import-design`). **No se editan a mano**: se volverían a pisar.
- `src/library/patches.js`: todos los cambios respecto del diseño, aplicados sobre esas pantallas (reemplazos de texto en las plantillas y envoltorios de métodos de las clases). Ahí se suman los módulos:
  - `fullscreen.js`: la pantalla completa nueva (estilo the-005.com).
  - `search.js`: el buscador real (texto, #etiquetas y color).
  - `mosaic.js`: armado del mosaico.
  - `intro.js`: la intro con el cajón 3D (apagada, ver más abajo).
- `src/dc/runtime.js`: runtime de las plantillas (sin `eval`, por la CSP de MV3). Morfea el DOM por posición: si un `<sc-if>` inserta algo antes, los elementos siguientes se recrean (ojo con las animaciones de entrada).
- `src/library/main.js`: SPA que cambia de pantalla sin recargar (rutas `#/Main`, `#/Main1`, `#/Archivo`, `#/Tablero`, `#/Ajustes`, `#/Anotador`, `#/Seleccion`), idioma y entrada de la interfaz.
- `src/core/i18n.js`: idiomas (ver "Idioma").
- `src/core/settings.js`: reglas, preferencias, tablero elegido en el popup, nombres de tableros y copia de Apariencia, en `chrome.storage.local` (compartido con el service worker y el popup).
- `src/background.js`: menú del clic derecho, atajo Alt+Shift+S, reglas al guardar, aviso en la página y panel flotante del ícono.
- `src/popup.*` + `public/popup-theme.js`: popup según Figma, con el tema y el idioma del usuario.
- `src/library/overrides.css`: ajustes de CSS sobre el diseño.

## Tema
- Todo usa variables CSS definidas en la raíz de cada pantalla con `uiVars()`: `--bg --t1..--t4 --pill --pillh --chip --muted --field --sw --velo --ink --f1 --f2`.
- **Apariencia** (Reglas y ajustes), guardada en `localStorage['archivero.ui.v1']` = `{ pal, mode, f1, f2, fit, lang }`:
  - **Idioma:** español, inglés o portugués.
  - **Modo:** claro / oscuro.
  - **Paletas:** 12 monocromáticas (Grafito, Pizarra, Océano, Turquesa, Bosque, Musgo, Arena, Ámbar, Terracota, Vino, Rosa, Lavanda).
  - **Tipografías:** Inter, Manrope, Space Grotesk, Fraunces, JetBrains Mono, por separado para títulos (`--f1`) y texto (`--f2`).
  - **Pantalla completa:** cómo se ven las imágenes menores a 1920×1080 (fondo desenfocado por defecto, color de fondo, marco a tamaño real, ampliar y recortar).
- La librería copia Apariencia en los ajustes compartidos (`settings.ui`) para que el aviso al guardar, que se dibuja desde el service worker, use la misma paleta, tipografía e idioma.

## Idioma
- Todo el texto se escribe en **español** (plantillas, parches, popup, aviso). `i18n.js` tiene un diccionario español → inglés / portugués (`ROWS`) y patrones para textos con números o nombres (`PATTERNS`).
- `localizeTemplate` traduce las partes fijas de cada plantilla al montarla; el runtime pasa por `translate` los textos y los atributos legibles (`aria-label`, `placeholder`, `title`, `data-tip`, `alt`) al dibujar. No se traducen los datos del usuario (títulos, notas, etiquetas) ni los `value` de los campos.
- Al cambiar de idioma se vuelve a montar la pantalla y las reglas de ejemplo que siguen sin tocar pasan al idioma nuevo (`localizeRules`).
- Para encontrar textos sin traducir: con la librería abierta, en la consola, `__i18nMissing()`.
- El nombre y la descripción de la extensión están en `public/_locales` (es, en, pt_BR, pt_PT); el menú del clic derecho y el aviso se traducen en `background.js`.

## Datos
- `localStorage['archivero.lib.v1']` = `{ boards:[{id,name,t,sort,man,cover,coverUp}], items:[...], bsort, bman, seq, last, selId }`.
- Pieza: `{id,bid,kind:'img'|'video'|'link'|'text',t,title,note,url,tags,atags,text,ow,oh,avg,gif,th,pv,pvTry,cols}`.
  - `ow/oh`: resolución original. `avg`: color promedio. `cols`: paleta de la imagen (para buscar por color). `atags`: etiquetas automáticas por sitio. `th`: tiene miniatura. `pv`: tiene imagen de vista previa (enlaces).
- IndexedDB `archivero`, store `media`: `id` (original), `thumb:id` (miniatura), `prev:id` (vista previa de un enlace), `cover:boardId` (portada subida) y `notes:v1` (todas las notas del Anotador). Store `inbox`: lo que guarda la extensión hasta que la librería lo incorpora (`ingest.js`).
- `localStorage['archivero.search.v1']`: búsquedas recientes.
- Copia local: exportar e importar `.json` con la librería y los medios (las notas todavía no entran).

## Pantallas y comportamiento
- **Botonera inferior (pill):** las 3 secciones siempre visibles (Principal, Archivo, Anotador), la actual resaltada; al pasar el mouse aparecen las herramientas a la izquierda y el engranaje a la derecha, con cartelito propio. Mismo tamaño y posición en todas las vistas.
- **Entrada:** buscador, botonera y carrete aparecen con un fundido de 1,4 s una sola vez por pantalla (`data-ui="done"` en `#app`); las piezas del mosaico entran en 1,6 s escalonadas.
- **Buscador:** pastilla arriba con el texto "Buscar…" y brillo animado. Se expande en un panel: busca por nombre, nota, sitio, tablero, tipo, `#etiqueta` y color (selector propio con cuadro de saturación, barra de tono, hex y "+" para sumar colores). Recientes y lo guardado recientemente.
- **Principal – vista 2 (mosaico):**
  - Lienzo infinito que se arrastra con el botón del medio (rueda: vertical; Shift + rueda: horizontal). Un solo bloque que crece con las piezas, cada una una sola vez y sin deformarse.
  - Spotify con su reproductor horizontal; textos con caja y letra según la cantidad de caracteres.
  - Pasar el mouse oscurece la pieza y escribe su título. **Tocar una pieza abre su ficha completa.**
  - **Intro:** apagada por ahora (`INTRO = false` en `patches.js`). Está hecha en `intro.js`: un cajón 3D (el logo de Figma, frente con borde y tirador) gira mientras el contador sube a 100 %, la cámara se acerca y aparecen los mosaicos, con los colores del tema.
- **Principal – vista 1 (pantalla completa)**, como https://www.the-005.com/ (`fullscreen.js`):
  - Solo imágenes y páginas web (sin reproductores). Una pieza a toda la pantalla que cambia sola cada 2 s con corte seco; leyenda abajo a la izquierda (título · sitio).
  - Carrete de miniaturas arriba de la botonera (3 a la vista, la del medio es la actual) que se desliza en cada cambio. Pasar el mouse lo detiene; se puede arrastrar o tocar una miniatura.
  - Tocar la pieza abre su ficha (el carrusel se detiene mientras está abierta, igual que con el buscador o los ajustes). Rueda y flechas: anterior / siguiente.
- **Archivo:** lista de tableros y vista de tablero en la misma pantalla. Crear, renombrar, eliminar, portada (automática, una pieza o imagen subida), ordenar (recientes, antiguos, A–Z, cantidad, manual). Vista de tablero con filas justificadas tipo Google Fotos (Mateo dijo que está **perfecta así**). Vistas previas reales de enlaces (Open Graph; YouTube, Vimeo, Spotify, X y TikTok con su reproductor).
- **Ficha completa:** la misma en todas las vistas (imagen o reproductor a la izquierda, campos a la derecha, "Ir al sitio").
- **Anotador:** grilla 3D de notas, frente para dibujar e imágenes, reverso para el texto, portada opcional, menú "⋯", orden. Las notas se guardan (`notes.js`).
- **Reglas y ajustes** (engranaje): Reglas, Tableros, Apariencia, **Copia local** (exportar/importar y las preferencias "Aplicar reglas al guardar" y "Mostrar aviso al guardar") y **Manifesto** (texto del proyecto, open source y enlace a GitHub). Proyectos se sacó por confuso.
- **Extensión:**
  - Popup según Figma (node 2082-26) con el tema y el idioma. Al tocar el ícono se abre como panel flotante redondo dentro de la página; en las páginas donde Chrome no deja entrar (chrome://, Web Store…) queda el popup normal.
  - Clic derecho sobre imagen, video, enlace, texto o página → "Guardar … en Archivero"; atajo Alt+Shift+S.
  - Aviso en la página al guardar: con el tema y el idioma, 2 s en pantalla (el mouse encima lo pausa), con "Cambiar" para corregir tablero y etiquetas.

## Quitado a propósito
- Las maquetas del diseño que no hacían nada: nube (sincronizar), "copia automática en este equipo", herramienta "Captura de pantalla" del Anotador.
- La pieza elevada con resumen del mosaico y la vista anterior de pantalla completa (título escrito, Mezclar, Ajuste, Anterior/Siguiente).
- La escritura letra por letra de "Buscar…" (Mateo la pidió sacar; el brillo se queda).

## Pendientes
1. **Nube real:** no existe; se sacó la maqueta.
2. **Notas en la copia local:** Exportar/Importar no incluye las notas del Anotador.
3. **Intro:** decidir si vuelve el cajón 3D.
4. **Rendimiento:** hay miniaturas, `loading="lazy"` y videos que solo corren a la vista; falta virtualizar si hay cientos de piezas.

## Generador del diseño (si querés seguir editando los `.dc.html`)
- `make.sh` corre en orden:
  1. `build.py`: base + pill.
  2. `note6.py`: Anotador.
  3. `rules_patch.py`: Reglas y ajustes.
  4. `archivo30.py`: Archivo y Tablero.
  5. `others30.py`: Main, Main1, Selección, buscadores y extras del Anotador.
  6. `extras.py`: Ajustes y canvas.
  7. `theme31.py`: tema, fuentes, pantallas fluidas, pill, transiciones.
- `lib30.py` tiene el JS compartido que se inyecta en todas las pantallas (librería, medios, etiquetas por sitio, `shapeOf`/`pack`/`mbox`/`mchunk`/`tmap`, ficha, tema, transiciones).
- Usan rutas absolutas `/tmp/w/...`: `base/`, `gen.py`, `common4.py`, `shim.js` y `shoot2.py`. Copiá `generador/` a `/tmp/w/` o ajustá las rutas. La salida queda en `/tmp/w/out/`.
- Si se regeneran los `.dc.html` y se vuelven a importar, `patches.js` avisa en la consola ("El diseño cambió: no encontré…") cada reemplazo que deje de encajar.
