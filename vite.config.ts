import { defineConfig } from 'vite';

import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, './'),
  resolve: {
    alias: {
      '@': '/.vitepress',
      '~bootstrap': path.resolve(__dirname, './node_modules/bootstrap'),
    },
  },
});
