import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

export default defineConfig({
  presets: [
    presetUno({
      dark: "media"
    }),
    presetIcons({
      // scale: 1.5,
      // extraProperties: {
      //   "color": "inherit",
      //   "min-width": "1.5em"
      // }
    }),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: [
          {
            name: "Inter"
          },
          {
            name: "sans-serif",
            provider: "none"
          }
        ]
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
