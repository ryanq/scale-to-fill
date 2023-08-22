import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://ryanq.github.io',
  base: '/scale-to-fill',
  integrations: [svelte()]
});