import { defineConfig } from 'vite';
import { resolve } from 'path';

// Build de extensión MV3: library.html (pantallas del diseño), popup.html y background.js (service worker).
export default defineConfig({
  base: './',
  build: {
    // Antes era dist/: Chrome guardaba ahí una entrada vieja de la extensión (de antes del ID fijo)
    // que chocaba con la actual al arrancar y no cargaba ninguna de las dos.
    outDir: 'build',
    emptyOutDir: true,
    modulePreload: false,
    rollupOptions: {
      input: {
        library: resolve(__dirname, 'library.html'),
        popup: resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'src/background.js'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
