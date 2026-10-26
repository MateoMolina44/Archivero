# Archivero

Librería personal de inspiraciones + extensión de Chrome que guarda y organiza sola.
Todo se guarda en el navegador (localStorage + IndexedDB). Opcional: iniciar sesión con Google para sincronizar la librería en la nube (Supabase) entre la extensión, la web y otras computadoras. Copia con Exportar/Importar en Reglas y ajustes → Nube y copia (incluye las notas del Anotador).

## Instalar
1. `npm install` y `npm run build` (genera `build/`).
2. Abrí `chrome://extensions`, activá **Modo desarrollador** → **Cargar descomprimida** → carpeta `build`.
3. Después de recompilar, tocá "Recargar" en `chrome://extensions`.

## Cómo guardar
- Clic derecho sobre **imagen, video, enlace, texto seleccionado o la página** → "Guardar … en Archivero".
- Atajo **Alt+Shift+S** (o "Guardar esta página" en el popup) guarda la página como enlace.
- Aparece un aviso abajo para corregir tablero y etiquetas ("Cambiar").
- Lo guardado pasa por las reglas (Reglas y ajustes → Reglas). Lo que no cae en ningún tablero va a **Sin clasificar**.

## Cómo está armado
- `diseno/project/*.dc.html` (afuera de esta carpeta) es la fuente de verdad de la UI.
  `npm run import-design` los copia tal cual a `src/screens/*.js` (marcado, CSS y lógica). No editar esos archivos a mano.
- `src/dc/runtime.js`: runtime de las plantillas del diseño (`{{…}}`, `<sc-for>`, `<sc-if>`), sin `eval` para cumplir la CSP de MV3.
- `src/library/main.js`: una sola página que cambia de pantalla sin recargar (rutas `#/Main`, `#/Main1`, `#/Archivo`, `#/Tablero`, `#/Ajustes`, `#/Anotador`).
- `src/library/patches.js`: lo que cambia respecto del prototipo, aplicado sobre las clases importadas:
  medios en la IndexedDB compartida, reglas y preferencias persistentes, vistas previas reales, idioma, etc.
  Suma `fullscreen.js` (pantalla completa), `search.js` (buscador), `mosaic.js` e `intro.js` (apagada).
- `src/core/i18n.js`: idiomas (español, inglés, portugués). `public/_locales`: nombre y descripción de la extensión.
- `src/library/ingest.js`: incorpora lo que guarda la extensión (bandeja `inbox` de IndexedDB) a la librería.
- `src/background.js`: menús, atajo, reglas y aviso. `src/popup.*`: popup según `Extension.dc.html`.
- `src/core/settings.js`: reglas, tablero elegido y preferencias en `chrome.storage.local` (compartido por todo).
- `src/library/cloud.js`: nube opcional (inicio de sesión con Google y sincronización). Tablas y reglas de acceso en `../supabase/schema.sql`; configuración en `../CLAUDE.md` → Nube.
- `src/library/notes.js`: guardado de las notas del Anotador.

## Probar la librería sin instalar la extensión
`npm run preview` y abrir `http://localhost:5173/library.html`. Fuera de la extensión los ajustes usan localStorage.

## Pendiente
- Publicar en la Chrome Web Store (`../PUBLICAR_EN_CHROME.md`). Decidir si vuelve la intro con el cajón.
- La librería React anterior quedó en `legacy/library-react/` (no se compila; se puede borrar).
