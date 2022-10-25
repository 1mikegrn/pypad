import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

const { resolve } = require('path')

const root = resolve(__dirname, "src", "pages")
const dist = resolve(__dirname, "dist")

export default defineConfig({
  root: root,
  publicDir: "../public",
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
      rollupOptions: {
          input: {
              app: resolve(root, "index.html"),
           },
      },
    outDir: dist,
  },
});
