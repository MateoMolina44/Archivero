# Publicar Archivero en Chrome Web Store

Archivo a subir: `archivero-extension.zip` (se arma comprimiendo el contenido de `extension/dist/` después de `npm run build`; `manifest.json` tiene que quedar en la raíz del zip).

## 0. Probala antes de subirla
1. Descomprimí `archivero-extension.zip` en una carpeta.
2. Abrí `chrome://extensions`, activá **Modo desarrollador** → **Cargar descomprimida** → elegí esa carpeta.
3. Probá: clic derecho en una imagen → "Guardar imagen en Archivero", Alt+Shift+S en una página, el aviso con "Cambiar", el popup y "Abrir mi librería".
4. Si algo falla, avisame antes de publicar: la tienda tarda en revisar cada versión.

## 1. Cuenta de desarrollador (una sola vez)
1. Entrá a https://chrome.google.com/webstore/devconsole con tu cuenta de Google.
2. Aceptá el acuerdo y pagá la inscripción única (USD 5).
3. En **Cuenta**, completá el nombre que va a aparecer como editor y verificá el email de contacto.

## 2. Subir el paquete
1. En el panel: **Agregar elemento nuevo** → subí `archivero-extension.zip`.
2. Se crea el borrador con el nombre, la versión (0.2.0) y los íconos del manifest.

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
  > • Todo queda en tu navegador: sin cuentas, sin servidores, sin publicidad. Exportá una copia cuando quieras.

- **Ícono de la tienda:** 128×128 → `extension/public/icons/archivero-128.png`.
- **Capturas:** al menos 1, ideal 3–5, de **1280×800** (o 640×400), PNG o JPG. Sugeridas: tablero con piezas, mosaico principal, Reglas y ajustes, popup + aviso. Si querés te las saco yo desde el navegador con datos de ejemplo.
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
  - Permiso de host `<all_urls>`: el usuario puede guardar contenido de cualquier sitio; hace falta para descargar la imagen o el video elegido y mostrar el aviso en esa página. Solo actúa cuando el usuario guarda algo.

- **¿Usás código remoto?** → **No.** (Todo, incluidas las tipografías, va dentro del paquete.)
- **Uso de datos:** marcá **Contenido del sitio web** (lo que el usuario elige guardar). No marques las demás categorías.
- Marcá las tres certificaciones: no se venden datos, no se usan para fines ajenos al propósito único, no se usan para créditos.
- **URL de la política de privacidad:** `https://archivero-green.vercel.app/privacidad.html` Antes de publicar podés completar el contacto en `extension/privacidad.html`.

## 5. Distribución y envío
1. **Visibilidad:** "Pública" (o "No listada" si querés compartirla solo con el enlace mientras la probás).
2. **Regiones:** todas, o las que prefieras.
3. **Enviar para revisión.** Con el permiso `<all_urls>` la revisión suele tardar más (de unos días a un par de semanas). Llega un email cuando la aprueban o si piden cambios.

## 6. Actualizaciones
1. Subí `"version"` en `extension/public/manifest.json` (por ejemplo 0.2.1) y en `package.json`.
2. `npm run build` dentro de `extension/` y volvé a armar el zip desde `dist/` (con `manifest.json` en la raíz).
3. En el panel: **Paquete → Subir paquete nuevo** → enviar para revisión.
