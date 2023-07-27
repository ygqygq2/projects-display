import { defineConfig } from 'vite';
import copyPlugin from 'rollup-plugin-copy';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, './'),
  resolve: {
    alias: {
      '@': '/.vitepress',
      '~': path.resolve(__dirname, './node_modules'),
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
