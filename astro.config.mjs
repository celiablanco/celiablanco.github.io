import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://celiablanco.github.io',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
