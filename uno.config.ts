import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno({
      dark: "media",
    }),
    presetIcons(),
  ],
  theme: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      // accent: "#ff6b35",
      accent: "#4169E1",
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    [
      "animate-wiggle",
      {
        animation: "wiggle 1s ease-in-out infinite",
      },
    ],
  ],
});
