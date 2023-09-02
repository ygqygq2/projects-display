import path from 'path';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
const __dirname = path.resolve();


// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './node_modules')
      }
    }
  },
  site: 'https://www.ygqygq2.com',
  integrations: [mdx(), sitemap(), react(), vue(), tailwind()]
});
