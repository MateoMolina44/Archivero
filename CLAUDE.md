# Archivero — contexto para seguir en Claude Code

Resumen de lo decidido en el diseño (Claude Design, "Archivero - referencia visual", versión 41, 23/10/2026) y de cómo quedó la app real (v0.4.2, 26/10/2026). Leelo entero antes de tocar código.

## Quién y cómo
- Usuario: Mateo (Rosario, Argentina). Escribe en **español rioplatense**: respondele en español rioplatense, claro y sin vueltas.
- Forma de trabajo que pidió:
  - Iterar con versiones cortas y ver resultados. Al cerrar una tanda suele pedir "commiteá como v0.x.y y subí la versión en package.json y manifest" (los dos: `extension/package.json` y `extension/public/manifest.json`), y después el push.
  - No mandar zips ni archivos intermedios hasta que algo esté terminado.
  - Cuando haya varias opciones de diseño, mostrarlas para que él elija; no decidir en silencio.
- Figma: `https://www.figma.com/design/WiVy15VitUHjYefBSmO9KB/Trabajo` — node `2059-8` (pantallas, "Frame Animacion 1–6" de la intro con el cajón, barra de búsqueda, botón de sección) y `2082-26` (popup de la extensión).

## Qué es
Archivero = librería personal de inspiraciones (web) + extensión de Chrome que guarda cosas de la web y las organiza sola con reglas. Estilo Milanote/Pinterest/Cosmos. Todo se guarda en el navegador (localStorage + IndexedDB + `chrome.storage.local`); la nube (Supabase, con Google) es opcional y sincroniza eso entre la extensión, la web y otras computadoras.

## Carpetas
- `diseno/project/` — el diseño original: archivos `.dc.html` (HTML + `<x-dc>` con `{{huecos}}`, `<sc-for>`, `<sc-if>` y una clase `Component extends DCLogic` con `renderVals()`). Son la base del marcado y del comportamiento; lo que cambió después vive en `extension/src/library/` (ver "Cómo está armado").
- `diseno/generador/` — scripts Python que generan esos `.dc.html`. Ver "Generador del diseño".
- `extension/` — la app real (Vite + extensión MV3). `npm install`, `npm run build` → `build/` (extensión; antes era `dist/`, ver "Versiones y releases") y `npm run build:web` → `dist-web/` (web en Vercel). Detalles en `extension/README.md`.
- `PUBLICAR_EN_CHROME.md` — guía para la Chrome Web Store (con las descripciones en ES/EN/PT).
- `supabase/schema.sql` — tablas, bucket y reglas de acceso de la nube.
- `README.md` (en inglés, la portada del repo en GitHub) con capturas de `docs/screenshots/` e instrucciones de instalación. `LICENSE`: MIT, a nombre de Mateo Molina.
- Web: https://archivero-green.vercel.app — se publica sola con cada push a `main` de https://github.com/MateoMolina44/Archivero.

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
- `src/library/cloud.js`: la nube (ver "Nube"). `src/library/notes.js`: guardado de las notas del Anotador.

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
- `localStorage['archivero.cloud.v1']`: estado de la sincronización (usuario, cursor, huella de cada fila sincronizada y medios ya subidos). La sesión de Supabase vive en `sb-dwtjnftbfdcswrojnzec-auth-token`.

## Pantallas y comportamiento
- **Botonera inferior (pill):** las 3 secciones siempre visibles (Principal, Archivo, Anotador), la actual resaltada; al pasar el mouse aparecen las herramientas a la izquierda y el engranaje a la derecha, con cartelito propio. Mismo tamaño y posición en todas las vistas.
- **Entrada:** buscador, botonera y carrete aparecen con un fundido de 1,4 s una sola vez por pantalla (`data-ui="done"` en `#app`); las piezas del mosaico entran en 1,6 s escalonadas.
- **Buscador:** pastilla arriba con el texto "Buscar…" y brillo animado. Se expande en un panel: busca por nombre, nota, sitio, tablero, tipo, `#etiqueta` y color (selector propio con cuadro de saturación, barra de tono, hex y "+" para sumar colores). Recientes (textos), Colores recientes (cada uno se suma a la búsqueda) y lo guardado recientemente (cada miniatura abre su ficha).
- **Principal – vista 2 (mosaico):**
  - Lienzo infinito que se arrastra con el botón izquierdo o el del medio (rueda: vertical; Shift + rueda: horizontal). Un solo bloque que crece con las piezas, cada una una sola vez y sin deformarse, con 24 px entre piezas (`MOSAIC_GAP`) y esquinas de 5 px.
  - Spotify con su reproductor horizontal; textos con caja y letra según la cantidad de caracteres.
  - Pasar el mouse oscurece la pieza y muestra título y leyenda (etiquetas · tamaño · forma · resolución) abajo a la izquierda, igual que en un tablero (sin escritura letra por letra). **Tocar una pieza abre su ficha completa** (si se arrastró, no).
  - **Intro:** apagada por ahora (`INTRO = false` en `patches.js`). Está hecha en `intro.js`: un cajón 3D (el logo de Figma, frente con borde y tirador) gira mientras el contador sube a 100 %, la cámara se acerca y aparecen los mosaicos, con los colores del tema.
- **Principal – vista 1 (pantalla completa)**, como https://www.the-005.com/ (`fullscreen.js`):
  - Solo imágenes y páginas web (sin reproductores). Una pieza a toda la pantalla que cambia sola cada 2 s con corte seco; leyenda abajo a la izquierda (título · sitio, y abajo tamaño · forma · resolución).
  - Carrete de miniaturas arriba de la botonera (3 a la vista, la del medio es la actual) que se desliza en cada cambio. Pasar el mouse lo detiene; se puede arrastrar o tocar una miniatura.
  - Tocar la pieza abre su ficha (el carrusel se detiene mientras está abierta, igual que con el buscador o los ajustes). Rueda y flechas: anterior / siguiente.
- **Archivo:** lista de tableros y vista de tablero en la misma pantalla. Crear, renombrar, eliminar, portada (automática, una pieza o imagen subida), ordenar (recientes, antiguos, A–Z, cantidad, manual). Vista de tablero con filas justificadas tipo Google Fotos (Mateo dijo que está **perfecta así**). Vistas previas reales de enlaces (Open Graph; YouTube, Vimeo, Spotify, X y TikTok con su reproductor).
- **Ficha completa:** la misma en todas las vistas (imagen o reproductor a la izquierda, campos a la derecha, "Ir al sitio"). El selector de tablero tiene "+ Nuevo tablero…": crea el tablero y pasa la pieza ahí. Los selectores (ficha y Reglas) usan el select personalizable de Chrome (`appearance: base-select`, en `overrides.css`) para que la lista tenga los colores del tema y letra blanca.
- **Anotador:** grilla 3D de notas (333×444, un tercio más grandes que en el diseño: `NOTE_W`/`NOTE_H` y `growNotes` en `patches.js`), frente para dibujar e imágenes, reverso para el texto, portada opcional, menú "⋯", orden. Las notas se guardan (`notes.js`).
- **Reglas y ajustes** (engranaje): Reglas, Tableros, Apariencia, **Nube y copia** (cuenta de la nube, exportar/importar copia y las preferencias "Aplicar reglas al guardar" y "Mostrar aviso al guardar") y **Manifesto** (texto del proyecto, open source y enlace a GitHub). Proyectos se sacó por confuso.
- **Extensión:**
  - Popup según Figma (node 2082-26) con el tema y el idioma. Al tocar el ícono se abre como panel flotante redondo dentro de la página; en las páginas donde Chrome no deja entrar (chrome://, Web Store, pestaña nueva…) queda el popup normal. En la propia librería también sale el panel redondo: como no se le puede inyectar código, `background.js` le manda `toggle-panel` y lo abre `main.js` (el panel vive en `src/core/panel.js`, compartido). El selector "Guardar en" usa la lista con el tema (`base-select`, como en la librería); como esa lista no sale del popup, mientras está abierta el panel se estira hacia abajo (`watchPicker` en `popup.js`).
  - Clic derecho sobre imagen, video, enlace, texto o página → "Guardar … en Archivero"; atajo Alt+Shift+S.
  - Aviso en la página al guardar: con el tema y el idioma, 2 s en pantalla (el mouse encima lo pausa), con "Cambiar" para corregir tablero y etiquetas. Con "Cambiar" abierto no se cierra mientras se escribe o se elige (6 s sin foco en sus campos), y las teclas no llegan a los atajos de la página. Su selector de tablero también usa la lista con el tema.

## Nube (Supabase, opcional)
- `src/library/cloud.js`: inicio de sesión con Google y sincronización. Sin sesión, la app funciona igual que antes, todo local.
- Tablas y reglas de acceso en `supabase/schema.sql` (tabla `entities`, una fila por pieza/tablero/nota/ajuste; bucket privado `media` para imágenes y videos, en `<user_id>/<clave>`).
- Sincroniza al abrir, 4 s después de cada cambio, cada 2 minutos y al volver a la ventana. Gana lo local si cambió desde la última sincronización; si no, lo de la nube. Los tableros con el mismo nombre se juntan en el más antiguo.
- En la extensión el inicio de sesión usa `chrome.identity` y vuelve a `https://hfekjnlbpinliclggobiencigmjoboki.chromiumapp.org/`: ese ID es fijo gracias a `key` en el manifest. Esa dirección tiene que estar en Supabase → Authentication → URL Configuration → Redirect URLs.
- Las notas del Anotador tienen id único (`patches.js`), porque el diseño las numeraba y dos computadoras repetirían ids.
- Lo que guarda la extensión con el clic derecho se sube cuando se abre la librería (el service worker no sincroniza).
- Archivos de más de 50 MB (el límite por archivo del plan gratis) quedan solo en la computadora donde se guardaron.
- Configuración (ya hecha, por si hay que rehacerla):
  - Supabase: proyecto `dwtjnftbfdcswrojnzec` (plan gratis: se pausa tras una semana sin uso y se reactiva desde el panel). La URL y la clave pública (publishable) están en `cloud.js`; la clave secreta nunca va al código.
  - Authentication → Sign In / Providers → Google, con el Client ID y el secret del cliente OAuth "Web application" del proyecto de Google Cloud "Archivero" (redirect `https://dwtjnftbfdcswrojnzec.supabase.co/auth/v1/callback`).
  - Authentication → URL Configuration: Site URL `https://archivero-green.vercel.app`; Redirect URLs `https://archivero-green.vercel.app/**`, `http://localhost:5173/**` y `https://hfekjnlbpinliclggobiencigmjoboki.chromiumapp.org/**`. Si se publica en la Chrome Web Store, sumar la del ID de la tienda.
  - Google Auth Platform: app "Archivero" publicada (en producción), sin logo (con logo pide verificación de marca), dominios autorizados `archivero-green.vercel.app` y `dwtjnftbfdcswrojnzec.supabase.co`. Contacto: archiverowebapp@gmail.com.

## Copia local
- Exportar/Importar copia (Reglas y ajustes → Copia local) lleva la librería, los medios y las notas del Anotador (campo `notes`). Lo arma `backupExport`/`backupImport` en `patches.js`; una copia vieja sin `notes` no toca las notas actuales.

## Quitado a propósito
- Las maquetas del diseño que no hacían nada: el interruptor y el aviso de maqueta de la nube (reemplazados por la cuenta real), "copia automática en este equipo", herramienta "Captura de pantalla" del Anotador.
- La pieza elevada con resumen del mosaico y la vista anterior de pantalla completa (título escrito, Mezclar, Ajuste, Anterior/Siguiente).
- La escritura letra por letra de "Buscar…" (Mateo la pidió sacar; el brillo se queda).

## Pendientes
1. **Chrome Web Store:** sin publicar todavía (guía en `PUBLICAR_EN_CHROME.md`).
2. **Intro:** decidir si vuelve el cajón 3D.
3. **Rendimiento:** hay miniaturas, `loading="lazy"` y videos que solo corren a la vista; falta virtualizar si hay cientos de piezas.

## Versiones y releases
- Cada versión: subir `version` en `extension/package.json` y `extension/public/manifest.json`, `npm run build`, commit y push.
- El zip del release (`archivero-extension-vX.Y.Z.zip`, en la raíz, ignorado por git) se arma con el contenido de `extension/build/` y `manifest.json` en la raíz. Con barras `/` en las rutas: `Compress-Archive` de PowerShell 5.1 usa `\` y el zip no anda en Mac/Linux (se arma con `zipfile` de Python).
- Se publica con `gh release create vX.Y.Z archivero-extension-vX.Y.Z.zip` y notas en inglés. El README apunta al último release.
- La extensión se carga desde `extension/build/` (no `dist/`). El 26/10/2026 se cambió porque el perfil de Chrome tenía dos entradas apuntando a `dist/`: la actual (`hfek…`) y una vieja de antes del ID fijo (`ofnodd…`). Al arrancar Chrome chocaban y no se cargaba ninguna. Sin `dist/`, la vieja falla sola. No volver a usar `dist/` como salida.
- Desde la v0.4.0 la extensión tiene ID fijo (`key` en el manifest): actualizar conserva la librería. Desde la 0.3.x Chrome la trata como otra extensión (hay que exportar e importar la copia).

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
