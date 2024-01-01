---
handle: hooxs
name: hooxs
owner: luxass
description: Build a powerful project with typed hooks for a smooth plugin API. ✨
githubUrl: https://github.com/luxass/hooxs
npm: https://www.npmjs.com/package/hooxs
downloads: 8
---

# hooxs

::sidebar

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

Effortlessly empower your project with typed hooks, enabling you to easily construct a plugin API for your needs.

## 📦 Installation

```sh
npm install hooxs
```

## 📚 Usage

```ts
import { createHooks } from "hooxs";

interface RuntimeHooks {
  "build:before": () => void
  "build:after": (files: string[]) => void
  // can either be registered inside the hooks object or registered at a later point
  "config:load"?: (config: Record<string, unknown>) => void
}

const hooks = createHooks<RuntimeHooks>({
  "build:before": () => {
    console.log("before build");
  },
  "build:after": (files) => {
    console.log("after build", files);
  },
});
// or initialize hooks at a later point
const hooks = createHooks<RuntimeHooks>();

hooks.on("config:load", (config) => {
  console.log("config loaded", config);
});

await hooks.call("build:before");
const files = ["index.js", "index.css"];

await hooks.call("build:after", files);
```

## 📄 License

Published under [MIT License](https://github.com/luxass/hooxs/blob/main/LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/hooxs?style=flat&colorA=18181B&colorB=4169E1
[npm-version-href]: https://npmjs.com/package/hooxs
[npm-downloads-src]: https://img.shields.io/npm/dm/hooxs?style=flat&colorA=18181B&colorB=4169E1
[npm-downloads-href]: https://npmjs.com/package/hooxs
