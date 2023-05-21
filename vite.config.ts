import { resolve } from 'path'
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib.ts'),
      name: 'lib',
      fileName: 'lib'
    },
    target: 'esnext',
    minify: false,
    assetsInlineLimit: 1024 * 1024,
    rollupOptions: {
      external: ['child_process']
    }
  },
});
