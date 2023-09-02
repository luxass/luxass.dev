import type { APIContext } from "astro";

export const prerender = false;

export function GET({ params, request }: APIContext) {
  return new Response(JSON.stringify({
    path: new URL(request.url).pathname,
    date: new Date().toISOString(),
  }),
  );
}
