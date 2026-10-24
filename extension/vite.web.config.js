import { defineConfig } from 'vite';
import { resolve } from 'path';
import { rmSync } from 'fs';

// Build web (Vercel): solo la librería como index.html, más la política de privacidad.
// Sin la extensión no hay guardado con clic derecho; los ajustes usan localStorage.
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist-web',
    emptyOutDir: true,
    rollupOptions: {
      input: { index: resolve(__dirname, 'index.html'), privacidad: resolve(__dirname, 'privacidad.html') },
    },
  },
  plugins: [
    {
      // public/ también tiene el manifest de la extensión, que en la web no va.
      name: 'sin-manifest',
      closeBundle() {
        rmSync(resolve(__dirname, 'dist-web/manifest.json'), { force: true });
      },
    },
  ],
});
