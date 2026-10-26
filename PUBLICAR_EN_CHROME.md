# Publicar Archivero en Chrome Web Store

Archivo a subir: un zip con el contenido de `extension/build/` después de `npm run build`, con `manifest.json` en la raíz del zip.

**Ojo con el campo `key`:** el manifest lo tiene para que la extensión cargada a mano tenga siempre el mismo ID (lo necesita el inicio de sesión con Google). La tienda no lo acepta: en el zip para la tienda, borrá la línea `"key": …` del `manifest.json` de `build/` (no del de `public/`). Para eso conviene armar un zip aparte, `archivero-tienda-vX.Y.Z.zip`; el de GitHub sigue con `key`.

## 0. Probala antes de subirla
1. Descomprimí `archivero-extension-vX.Y.Z.zip` en una carpeta.
2. Abrí `chrome://extensions`, activá **Modo desarrollador** → **Cargar descomprimida** → elegí esa carpeta.
3. Probá: clic derecho en una imagen → "Guardar imagen en Archivero", Alt+Shift+S en una página, el aviso con "Cambiar", el popup y "Abrir mi librería".
4. Si algo falla, avisame antes de publicar: la tienda tarda en revisar cada versión.

## 1. Cuenta de desarrollador (una sola vez)
1. Entrá a https://chrome.google.com/webstore/devconsole con tu cuenta de Google.
2. Aceptá el acuerdo y pagá la inscripción única (USD 5).
3. En **Cuenta**, completá el nombre que va a aparecer como editor y verificá el email de contacto.

## 2. Subir el paquete
1. En el panel: **Agregar elemento nuevo** → subí `archivero-extension-vX.Y.Z.zip`.
2. Se crea el borrador con el nombre, la versión y los íconos del manifest.
3. **Nube:** la tienda le da a la extensión un ID propio (aparece en el panel y en la URL de la ficha). Agregá `https://<ID de la tienda>.chromiumapp.org/**` en Supabase → Authentication → URL Configuration → Redirect URLs; si no, el inicio de sesión con Google falla en la versión de la tienda.

## 3. Ficha de la tienda (pestaña "Ficha de Play Store" / "Store listing")
- **Idioma:** Español (Latinoamérica).
- **Categoría:** Herramientas (Productividad › Herramientas).
- **Descripción** (para pegar):

  > Archivero es tu librería personal de inspiraciones. Guardá imágenes, videos, enlaces y textos de cualquier página con clic derecho o con Alt+Shift+S, y se ordenan solos en tableros según tus reglas (por sitio, palabras clave o tipo de contenido).
  >
  > • Tableros con filas justificadas tipo galería, ficha editable para cada pieza y etiquetas automáticas según el sitio.
  > • Mosaico infinito para recorrer todo lo guardado y vista de pantalla completa.
  > • Anotador para dibujar, pegar imágenes y escribir notas.
  > • Temas claros y oscuros con 12 paletas y 5 tipografías.
  > • Todo queda en tu navegador, sin cuenta obligatoria y sin publicidad. Si querés, iniciá sesión con Google para sincronizar tu librería entre computadoras.

- **Otros idiomas:** el nombre y la descripción corta ya vienen traducidos en el paquete (`extension/public/_locales`: español, inglés y portugués). Chrome y la tienda muestran la del idioma de cada usuario, y la extensión usa el español si el idioma no es ninguno de esos. En la ficha podés agregar **Inglés** y **Portugués (Brasil)** con **Agregar idioma** y pegar:

  > **EN:** Archivero is your personal inspiration library. Save images, videos, links and text from any page with right-click or Alt+Shift+S, and they sort themselves into boards by your rules (by site, keywords or content type).
  > • Gallery-style boards, an editable card for every piece and automatic tags by site. • Infinite mosaic and a fullscreen slideshow. • Notebook to draw, paste images and write notes. • Light and dark themes with 12 palettes, 5 typefaces and 3 languages. • Everything stays in your browser, no account needed and no ads. Optionally, sign in with Google to sync your library across computers.

  > **PT:** O Archivero é a sua biblioteca pessoal de inspirações. Salve imagens, vídeos, links e textos de qualquer página com o clique direito ou Alt+Shift+S, e eles se organizam sozinhos em quadros pelas suas regras (por site, palavras-chave ou tipo de conteúdo).
  > • Quadros em estilo galeria, ficha editável para cada peça e etiquetas automáticas pelo site. • Mosaico infinito e apresentação em tela cheia. • Anotações para desenhar, colar imagens e escrever. • Temas claros e escuros com 12 paletas, 5 tipografias e 3 idiomas. • Tudo fica no seu navegador, sem conta obrigatória e sem publicidade. Se quiser, entre com o Google para sincronizar sua biblioteca entre computadores.

- **Ícono de la tienda:** 128×128 → `extension/public/icons/archivero-128.png`.
- **Capturas:** al menos 1, ideal 3–5, de **1280×800** (o 640×400), PNG o JPG. Ya están hechas, en inglés y a 1280×800: `docs/screenshots/` (mosaico, tablero, pantalla completa, Reglas y ajustes, Anotador y modo oscuro). Para la ficha en español se pueden sacar de nuevo con la interfaz en español.
- **Mosaico promocional pequeño (opcional):** 440×280.

## 4. Prácticas de privacidad (pestaña "Privacidad")
- **Propósito único** (para pegar):
  > Guardar contenido de la web (imágenes, videos, enlaces y texto) en una librería personal local y organizarlo automáticamente con reglas.

- **Justificación de permisos** (una por permiso):
  - `contextMenus`: agrega las opciones "Guardar … en Archivero" al menú de clic derecho.
  - `activeTab`: guarda la página actual cuando el usuario usa el atajo Alt+Shift+S o el botón del popup.
  - `scripting`: lee el título y la descripción de la página que se guarda y muestra en ella el aviso para corregir tablero y etiquetas.
  - `storage`: guarda reglas, tableros y preferencias, compartidos entre el popup, el aviso y la librería.
  - `unlimitedStorage`: las imágenes y videos guardados se almacenan localmente en IndexedDB y pueden superar el límite estándar.
  - `identity`: abre la ventana de inicio de sesión con Google cuando el usuario elige sincronizar su librería en la nube (opcional).
  - Permiso de host `<all_urls>`: el usuario puede guardar contenido de cualquier sitio; hace falta para descargar la imagen o el video elegido y mostrar el aviso en esa página. Solo actúa cuando el usuario guarda algo.

- **¿Usás código remoto?** → **No.** (Todo, incluidas las tipografías, va dentro del paquete.)
- **Uso de datos:** marcá **Contenido del sitio web** (lo que el usuario elige guardar) e **Información de identificación personal** (nombre y email, solo si inicia sesión para usar la nube). No marques las demás categorías.
- Marcá las tres certificaciones: no se venden datos, no se usan para fines ajenos al propósito único, no se usan para créditos.
- **URL de la política de privacidad:** `https://archivero-green.vercel.app/privacidad.html` El contacto es archiverowebapp@gmail.com (el mismo conviene usar en la ficha de la tienda).

## 5. Distribución y envío
1. **Visibilidad:** "Pública" (o "No listada" si querés compartirla solo con el enlace mientras la probás).
2. **Regiones:** todas, o las que prefieras.
3. **Enviar para revisión.** Con el permiso `<all_urls>` la revisión suele tardar más (de unos días a un par de semanas). Llega un email cuando la aprueban o si piden cambios.

## 6. Actualizaciones
1. Subí `"version"` en `extension/public/manifest.json` y en `package.json`.
2. `npm run build` dentro de `extension/` y volvé a armar el zip desde `build/` (con `manifest.json` en la raíz y sin `key`).
3. En el panel: **Paquete → Subir paquete nuevo** → enviar para revisión.
