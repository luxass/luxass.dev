import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.url);
  if (url.pathname === "/sitemap.xml") {
    context.url.pathname = "/sitemap-0.xml";
  }

  if (url.pathname.startsWith("/random-secret")) {
    const length = url.pathname.split("/").pop();
    context.url.pathname = `/api/random-secret/${length || "32"}`;
  }
  return next();
});
