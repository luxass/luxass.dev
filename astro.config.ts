import { defineConfig } from "astro/config";
import unocss from "unocss/astro";

import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://luxass.dev",
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: true
    }
  },
  integrations: [
    unocss({}),
    sitemap(),
    prefetch({})
  ]
});
