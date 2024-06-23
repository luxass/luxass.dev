import type { APIContext } from "astro";

export async function GET(_: APIContext) {
  return Response.json({
    routes: [
      "/",
      "/about",
      "/blog",
      "/blog/first-post",
      "/blog/second-post",
    ],
  });
}
