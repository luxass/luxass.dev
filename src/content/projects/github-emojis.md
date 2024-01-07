---
handle: github-emojis
name: github-emojis
owner: luxass
description: A list of all available emojis on GitHub
githubUrl: https://github.com/luxass/github-emojis
---

# github-emojis

All GitHub's emojis in one place. <br/> <br/>

## 📦 Installation

```sh
npm install github-emojis
```

## 📚 Usage

```ts
import {
  emojis,
  exists,
  get,
  getRaw,
  parse
} from "github-emojis";

// Get all emojis
console.log(emojis);

// Check if an emoji exists
console.log(exists("100")); // true

// Get an emoji by name
console.log(get("100")); // 💯

// Get an emoji url by name
console.log(getRaw("100")); // https://github.githubassets.com/images/icons/emoji/unicode/1f4af.png?v8

// Parse a string with emojis
console.log(parse("Hello :smile:")); // Hello 😄
```

> If you only want to get the emoji urls, you can directly import the `emojis` object.

```ts
import emojis from "github-emojis/emojis";
```

## All emojis

> \[!NOTE]\
> You can view all on [github-emojis.luxass.dev](https://github-emojis.luxass.dev)

Published under [MIT License](https://github.com/luxass/github-emojis/blob/main/LICENSE).
