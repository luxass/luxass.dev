import { defineConfig } from "astro/config";
import unocss from "unocss/astro";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://luxass.dev",
  integrations: [
    unocss({
      injectReset: true
    }),
    sitemap()
  ]
});
