import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";

export default defineConfig({
  site: "https://www.luxass.dev",
  integrations: [
    unocss({
      injectReset: true
    }),
    sitemap(),
    solidJs()
  ],
  markdown: {
    shikiConfig: {
      theme: "dracula"
    }
  }
});
