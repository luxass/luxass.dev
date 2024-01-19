---
handle: volapyk
name: volapyk
owner: luxass
githubUrl: https://github.com/luxass/volapyk
npm: "volapyk"
icon: 🗣
---

`/vɔlɑˈpyg/`, "volapyk", or "volapük"

## 📦 Installation

```sh
npm install volapyk
```

## 📚 Usage

```ts
import { createVolapyk, createVolapykChunks, createVolapykText } from "volapyk";

// will create a text string of 10 words
const volapyk = createVolapyk({
  type: "text",
  words: 10
});

// will create a text string of 10 words using only the characters "abcdefghijkl"
const volapyk = createVolapyk({
  type: "text",
  words: 10,
  chars: "abcdefghijkl"
});

// create chunks instead of a string, or you can use the createVolapykChunks function
const volapyk = createVolapyk({
  type: "chunks"
});
```

## 📄 License

Published under [MIT License](https://github.com/luxass/volapyk/blob/main/LICENSE).
