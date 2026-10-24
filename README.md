# Archivero

Librería personal de inspiraciones + extensión de Chrome que guarda cosas de la web y las organiza sola con reglas.

- `diseno/`: diseño aprobado en Claude Design (`project/*.dc.html`, fuente de verdad de la UI) y sus generadores.
- `extension/`: el código real (Vite). Genera la extensión MV3 (`npm run build` → `dist/`) y la versión web (`npm run build:web` → `dist-web/`). Detalles en `extension/README.md`.
- `CLAUDE.md`: contexto y decisiones del diseño.
- `PUBLICAR_EN_CHROME.md`: guía para publicar la extensión en Chrome Web Store.

Web: https://archivero-green.vercel.app — se publica sola con cada push a `main` (config en `vercel.json`).
