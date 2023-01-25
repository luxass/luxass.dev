// @ts-check

import { defineConfig } from "astro/config";
import prefetch from "@astrojs/prefetch";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://luxass.dev",
  integrations: [unocss(), sitemap(), prefetch()]
});
