export default defineNuxtConfig({
  modules: ["nuxt-og-image", "@unocss/nuxt", "~/modules/projects/module"],
  css: ["@unocss/reset/tailwind.css"],
  routeRules: {
    "/": {
      swr: true,
    },
  },
});
