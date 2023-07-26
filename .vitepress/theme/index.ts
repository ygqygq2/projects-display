// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import Theme from 'vitepress/theme';
import './style.css';
import CardContent from '@/components/CardContent.vue';

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-hero-after': () => h(CardContent)
    });
  },
  enhanceApp({ app, router, siteData }) {
    // app.component('CardContent', CardContent);

  },
};
