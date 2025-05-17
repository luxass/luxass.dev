import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  // eslint-disable-next-line no-console
  console.log("url", url);

  // if we hit `spectral-ruleset.luxass.dev` we will redirect to unpkg
  if (url.hostname.startsWith("spectral-ruleset")) {
    return context.rewrite(new Request("https://unpkg.com/@luxass/spectral-ruleset"));
  }

  return next();
});
