import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineNuxtConfig({
  modules: ["nuxt-og-image", "@unocss/nuxt"],
  unocss: {
    attributify: true,
    icons: true,
    uno: true,
    transformers: [transformerDirectives(), transformerVariantGroup()],
    theme: {
      fontFamily: {
        inter: "Inter, sans-serif",
      },
    },
  },
});
