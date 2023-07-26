import { defineConfig } from 'vite';
import copyPlugin from 'rollup-plugin-copy';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, './'),
  resolve: {
    alias: {
      '@': '/.vitepress',
      '~bootstrap': path.resolve(__dirname, './node_modules/bootstrap'),
      '@images': path.resolve(__dirname, './images'),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        copyPlugin({
          targets: [{ src: 'images/*', dest: '.vitepress/dist/images' }],
        }),
      ],
    }
  }
});
