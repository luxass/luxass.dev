import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

export default defineConfig({
  presets: [
    presetUno({
      dark: "media",
    }),
    presetIcons(),
  ],
  theme: {
    colors: {
      primary: {
        50: "rgb(239 246 255 / <alpha-value>)",
        100: "rgb(219 234 254 / <alpha-value>)",
        200: "rgb(191 219 254 / <alpha-value>)",
        300: "rgb(147 197 253 / <alpha-value>)",
        400: "rgb(96 165 250 / <alpha-value>)",
        500: "rgb(59 130 246 / <alpha-value>)",
        600: "rgb(37 99 235 / <alpha-value>)",
        700: "rgb(29 78 216 / <alpha-value>)",
        800: "rgb(30 64 175 / <alpha-value>)",
        900: "rgb(30 58 138 / <alpha-value>)",
        950: "rgb(23 37 84 / <alpha-value>)",
        DEFAULT: "rgb(37 99 235 / <alpha-value>)",
      },
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
})
