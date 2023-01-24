// @ts-check

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://luxass.dev",
  integrations: [unocss(), mdx(), sitemap(), prefetch()],
});
