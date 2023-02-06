// @ts-check

import { defineConfig } from "astro/config";
import prefetch from "@astrojs/prefetch";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://luxass.dev",
  integrations: [unocss(), sitemap(), prefetch(), mdx(), preact()]
});
