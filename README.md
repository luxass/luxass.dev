# luxass.dev

My personal website, built with Astro and deployed to Cloudflare.

[**luxass.dev**](https://luxass.dev)

## Tech Stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — styling
- [MDX](https://mdxjs.com) — content
- [Cloudflare](https://pages.cloudflare.com) — deployment

## Prerequisites

- [Node.js](https://nodejs.org) 24.14.0 (see `.node-version`)
- [pnpm](https://pnpm.io) 11.22.0+

## Getting Started

```sh
git clone https://github.com/luxass/luxass.dev.git
cd luxass.dev
pnpm install
```

## Development

```sh
pnpm dev
```

## Scripts

| Command              | Description                     |
| -------------------- | ------------------------------- |
| `pnpm dev`           | Start dev server                |
| `pnpm build`         | Type-check, lint, and build     |
| `pnpm preview`       | Preview the production build    |
| `pnpm lint`          | Lint with oxlint                |
| `pnpm format`        | Format with oxfmt               |
| `pnpm typecheck`     | Type-check with astro-check     |

## License

[MIT](./LICENSE)

UI inspired by [terminal.shop](https://terminal.shop) (blue instead of orange).
