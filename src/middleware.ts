import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  if (context.url.pathname === "/sitemap.xml") {
    return context.redirect("/sitemap-0.xml");
  }

  if (context.url.pathname.startsWith("/random-secret")) {
    const length = context.url.pathname.split("/").pop();
    return context.redirect(`/api/random-secret/${length || "32"}`);
  }

  return next();
});
