---
handle: esbuild-import-transform
name: esbuild-import-transform
owner: luxass
description: ✨ Transform imports in esbuild
githubUrl: https://github.com/luxass/esbuild-import-transform
---




✨ Transform imports in esbuild

## 📦 Installation

```sh
npm install -D esbuild esbuild-plugin-import-transform
```

## 📚 Usage

Add this to your build file

```js
import { build } from "esbuild";
import importTransform from "esbuild-plugin-import-transform";

const yourConfig = {};

await build({
  ...yourConfig,
  plugins: [
    importTransform({
      "imported-module": "imported-module/dist/index.js",

      // This will transform all imports from "node:path" to "path-browserify"
      // when esbuilds platform is set to "browser"
      "node:path": {
        platform: "browser",
        to: "path-browserify"
      },

      "./locate": {
        text: "export function locate() { return \"found\" }"
      },

      // will transform all imports from "./utils" to "./lib/utils2"
      "./utils": "./lib/utils2"
    })
  ]
});
```

## 📄 License

Published under [MIT License](https://github.com/luxass/esbuild-import-transform/blob/main/LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/esbuild-plugin-import-transform?style=flat&colorA=18181B&colorB=4169E1

[npm-version-href]: https://npmjs.com/package/esbuild-plugin-import-transform

[npm-downloads-src]: https://img.shields.io/npm/dm/esbuild-plugin-import-transform?style=flat&colorA=18181B&colorB=4169E1

[npm-downloads-href]: https://npmjs.com/package/esbuild-plugin-import-transform
