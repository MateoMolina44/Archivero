# Archivero — contexto para seguir en Claude Code

Este archivo resume todo lo que se decidió durante el diseño en Claude Design (artefacto "Archivero - referencia visual", versión 41, 23/10/2026). Leelo entero antes de tocar código.

## Quién y cómo
- Usuario: Mateo (Rosario, Argentina). Escribe en **español rioplatense**: respondele en español rioplatense, claro y sin vueltas.
- Forma de trabajo que pidió:
  - Iterar con versiones cortas y ver resultados.
  - No mandar zips ni archivos intermedios hasta que algo esté terminado.
  - Cuando haya varias opciones de diseño, mostrarlas para que él elija; no decidir en silencio.
- Referencia visual original: Figma `https://www.figma.com/design/WiVy15VitUHjYefBSmO9KB/Trabajo?node-id=2059-8` (Page 2: pantallas, "Frame Animacion 1–6" de la intro, barra de búsqueda, botón de sección).

## Qué es
Archivero = librería personal de inspiraciones (web) + extensión de Chrome que guarda cosas de la web y las organiza sola con reglas. Estilo Milanote/Pinterest/Cosmos, en grises de wireframe.

## Carpetas de este paquete
- `diseno/project/` — el diseño aprobado hasta ahora: archivos `.dc.html` (formato Claude Design: HTML + `<x-dc>` con `{{huecos}}`, `<sc-for>`, `<sc-if>` y una clase `Component extends DCLogic` con `renderVals()`). Son prototipos **funcionales** y son la fuente de verdad del comportamiento y del look. `canvas.json` es el índice del lienzo.
- `diseno/generador/` — scripts Python que generan esos `.dc.html`. Ver la sección "Generador del diseño".
- `extension/` — el proyecto de código real (Vite + extensión MV3) que quedó **en pausa** antes del rediseño. Su UI está desactualizada respecto del diseño; la lógica de guardado, reglas e IndexedDB sí sirve de base. Sin `node_modules`: corré `npm install`.

## Paleta, tipografía y tema
- Base en grises de wireframe:
  - Fondo `#d9d9d9`.
  - Piezas `#afafaf`, `#a7a7a7`, `#b7b7b7`, `#a3a3a3`.
  - Pastillas y paneles `#575757` con texto blanco.
  - Chips claros `#d9d9d9` con texto `#111`.
  - Tipografía Inter.
- Todo usa variables CSS. Se definen en la raíz de cada pantalla con `uiVars()`: `--bg --t1..--t4 --pill --pillh --chip --muted --field --sw --velo --ink --f1 --f2`.
- Personalización (pestaña **Apariencia** en Reglas y ajustes):
  - **Modo:** claro / oscuro.
  - **Paletas:** 12 monocromáticas, cada una con su tono y saturación: Grafito, Pizarra, Océano, Turquesa, Bosque, Musgo, Arena, Ámbar, Terracota, Vino, Rosa, Lavanda.
  - **Tipografías:** 5 fuentes (Inter, Manrope, Space Grotesk, Fraunces, JetBrains Mono), elegibles por separado para títulos (`--f1`) y texto (`--f2`).
  - **Pantalla completa:** cómo se ven las imágenes menores a 1920×1080.
- Se guarda en `localStorage['archivero.ui.v1']`.

## Datos
- `localStorage['archivero.lib.v1']` = `{ boards:[{id,name,t,sort,man,cover,coverUp}], items:[...], bsort, bman, seq, last, selId, cloud }`.
- Pieza:
  - Campos: `{id,bid,kind:'img'|'video'|'link'|'text',t,title,note,url,tags,atags,text,ow,oh,avg,gif,th}`.
  - `ow/oh`: resolución original. `avg`: color promedio. `atags`: etiquetas automáticas por sitio. `th`: tiene miniatura.
- Medios en **IndexedDB** (`archivero` / store `media`):
  - Por cada pieza: clave `id` (original, data URL o Blob), `thumb:id` (miniatura de hasta 900 px) y `cover:boardId` (portada subida).
- Copia local: exportar e importar `.json` con lib + medios. La "nube" es solo maqueta (interruptor, sincronizar ahora, última sincronización).
- Notas del Anotador: **todavía no se guardan** (viven en memoria). Pendiente.

## Pantallas y comportamiento (ver los `.dc.html`)
- **Botonera inferior (pill)**
  - Siempre visibles las 3 secciones: Principal, Archivo y Anotador; la actual va resaltada.
  - Al pasar el mouse aparecen las herramientas de la sección a la izquierda y el engranaje de Reglas y ajustes a la derecha.
  - Cartelito propio arriba de cada botón, sin el `title` nativo.
- **Buscador:** la pastilla de arriba se expande en un panel con búsquedas recientes y lo guardado recientemente. Tiene animación de entrada y de salida, incluida la X.
- **Principal – vista 2 (mosaico)** `Main.dc.html`
  - **Lienzo:** infinito y sin bordes. Se arrastra con el botón del medio en cualquier dirección; la rueda mueve vertical y Shift + rueda horizontal.
  - **Armado por bloques:** el espacio se arma en bloques de al menos el tamaño de la pantalla. Cada bloque llena todo su espacio con un treemap con huecos de 12 px, y en cada bloque cada pieza aparece una sola vez. Los bloques vecinos usan otro orden (mezcla con semilla por bloque).
  - **Tamaños base (`mbox`):**
    - Tweets y textos: espacios chicos.
    - YouTube y Spotify: tamaño fijo.
    - Imágenes: según su resolución (chica, mediana o grande), sin agrandarse por encima de su tamaño real.
  - **Pasar el mouse:** solo oscurece la pieza; sin agrandarla y sin borde.
  - **Clic:** la pieza se eleva un poco con sombra y muestra su info, con "Ver ficha completa". Mientras está abierta se desactivan el paneo y los efectos de hover hasta tocar afuera.
  - **Intro:**
    - Secuencia: un cubo 3D gira mientras el contador sube de 0 a 100 %; la cámara entra en el cubo; aparecen los mosaicos de a poco y al final la interfaz. Dura unos 3,3 s.
    - Se puede configurar en "una vez por sesión" (por defecto), "siempre" o "nunca".
    - **El cubo se va a reemplazar por el logo** cuando exista.
- **Principal – vista 1 (pantalla completa)** `Main1.dc.html`
  - **Navegación:** una pieza por pantalla, con la rueda o con Anterior / Siguiente. El orden es aleatorio y el botón "Mezclar" lo vuelve a sortear.
  - **Info:** al tocar el título se abre la info, con el título reubicado según el alto de la ventana.
  - **Imágenes menores a 1920×1080:** 4 modos; Mateo todavía no eligió el definitivo:
    - Fondo desenfocado (el recomendado).
    - Color de fondo.
    - Marco a tamaño real.
    - Ampliar y recortar.
  - Cada cambio de modo es una transición con fundido. "Mezclar" y "Ajuste" van abajo a la derecha.
- **Archivo** `Archivo.dc.html`
  - Lista de tableros y vista de tablero en una sola pantalla, para no perder estado. `Tablero.dc.html` es la misma pantalla arrancando en la vista de tablero; `Ajustes.dc.html` es la misma con Reglas y ajustes abierto.
  - **Tableros:**
    - Crear, renombrar y eliminar (con confirmación), y elegir portada (automática, una pieza o una imagen subida).
    - Ordenar por recientes, antiguos, A–Z, cantidad de piezas o manual (arrastrando).
  - **Vista de tablero** (Mateo dijo que está **perfecta así**): filas justificadas tipo Google Fotos.
    - Sin huecos y sin deformar las piezas; lo último guardado va primero.
    - El tamaño (chica/mediana/grande según resolución) define la altura de la fila.
    - Textos siempre horizontales, más anchos cuanto más largos.
  - **Enlaces "embebidos":** por ahora la forma es una maqueta; en la app real el servidor trae la vista previa.
    - Spotify: cuadrado.
    - X: horizontal, con forma de tweet.
    - YouTube: chico.
  - **Piezas:**
    - Videos y GIF se reproducen solos, en silencio y en bucle, y solo cuando están a la vista.
    - Etiquetas automáticas según el sitio de origen (por ejemplo, pinterest → #pinterest #referencia).
  - **Acciones sobre las piezas:**
    - Agregar a mano: imagen, video, enlace o texto, o arrastrando archivos o links a la pantalla.
    - Ordenar como los tableros, con "Mover al principio/al final".
    - Ficha completa editable (título, nota, sitio, etiquetas, tablero, eliminar).
    - Animaciones de entrada escalonadas y de salida en las ventanas.
- **Ficha completa:** la misma ficha que en los tableros (imagen a la izquierda, campos a la derecha). Se abre desde el mosaico, la pantalla completa y `Seleccion.dc.html`.
- **Anotador** `Anotador.dc.html`
  - **Grilla 3D:** las tarjetas rotan con el mouse; el título aparece al pasar el mouse, sin animación, a `translateZ(70px)`.
  - **Portada opcional:** flota a la misma altura que ese título y rota con la tarjeta.
  - **Carrusel:** frente para dibujar, imágenes y capturas; reverso para el texto. Tocar la tarjeta la da vuelta y tocar fuera del texto vuelve al frente.
  - **Botón "Listo":** en la barra devuelve a la grilla; en el reverso vuelve al frente.
  - **Menú "⋯" por nota:** abrir, editar nombre y portada, mover, eliminar (con confirmación).
  - **Orden:** recientes, antiguas, A–Z.
  - **Notas sueltas:** sin libros; el nombre es obligatorio al crear.
- **Reglas y ajustes** (engranaje):
  - **Reglas:** condiciones por dominio, palabras clave, proyecto activo o tipo, con acción mover a un tablero y/o etiquetar.
  - **Tableros:** los reales.
  - **Proyectos.**
  - **Apariencia.**
  - **Nube y copia:** exportar e importar.
- **Extensión** `Extension.dc.html`: popup y aviso al guardar (todavía en grises de wireframe, sin tema).
- **Botones** `Botones.dc.html`: referencia de la pill por pantalla.

## Problemas conocidos y pendientes
1. **Parpadeo al cambiar de pantalla en Claude Design:** lo causa el lienzo, que recarga cada pantalla como documento. Se mitigó pintando el fondo con la paleta en el `<head>`. En la app real conviene una sola página (SPA) que cambie de sección sin recargar.
2. **Notas sin persistencia:** las notas del Anotador no se guardan. Usar IndexedDB igual que las piezas.
3. **Logo:** reemplazar el cubo de la intro cuando exista.
4. **Pantalla completa:** Mateo tiene que elegir el modo para imágenes chicas.
5. **Vistas previas reales de enlaces:** oEmbed / Open Graph del lado del servidor o de la extensión.
6. **Nube real:** hoy es maqueta.
7. **Rendimiento:** ya hay miniaturas, `loading="lazy"`, videos que solo corren a la vista y brillo de carga. Falta virtualizar cuando haya cientos de piezas.
8. **Extensión real:** la carpeta `extension/` tiene la versión anterior. Hay que llevar el diseño nuevo a esa base (o rehacer la librería) manteniendo el guardado con clic derecho, el atajo Alt+Shift+S, el aviso para corregir y las reglas.

## Generador del diseño (si querés seguir editando los `.dc.html`)
- `make.sh` corre en orden:
  1. `build.py`: base + pill.
  2. `note6.py`: Anotador.
  3. `rules_patch.py`: Reglas y ajustes.
  4. `archivo30.py`: Archivo y Tablero.
  5. `others30.py`: Main, Main1, Selección, buscadores y extras del Anotador.
  6. `extras.py`: Ajustes y canvas.
  7. `theme31.py`: tema, fuentes, pantallas fluidas, pill, transiciones.
- `lib30.py` tiene el JS compartido que se inyecta en todas las pantallas:
  - Librería, medios IndexedDB y miniaturas.
  - Etiquetas por sitio y tamaños (`shapeOf`, `pack`: filas justificadas; `mbox`/`mchunk`/`tmap`: mosaico).
  - Ficha compartida, tema y transiciones.
- Usan rutas absolutas `/tmp/w/...`: `base/` (archivos de partida), `gen.py`, `common4.py`, `shim.js` (réplica mínima del runtime para probar con Playwright) y `shoot2.py`. Copiá `generador/` a `/tmp/w/` o ajustá las rutas. La salida queda en `/tmp/w/out/`.
- Para publicar en Claude Design hay que subir los `.dc.html` al artefacto. Desde Claude Code tomalos como referencia para implementar la app real.

## Cómo seguir (sugerencia)
Construir la librería real como SPA (Vite + JS o React) dentro de `extension/`, reutilizando:
- de `lib30.py`: los algoritmos de armado, la librería, IndexedDB y el tema;
- de los `.dc.html`: el marcado y las animaciones.

Mantener la UI idéntica a los `.dc.html`. Probar cada pantalla en el navegador antes de mostrarla.
