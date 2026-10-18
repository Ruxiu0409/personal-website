import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tsaicy.dev',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'zh', locales: { zh: 'zh-Hant', en: 'en' } },
    }),
  ],
});
