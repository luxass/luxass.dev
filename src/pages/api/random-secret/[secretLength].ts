import { randomBytes } from "node:crypto";
import type { APIContext } from "astro";

export async function GET({ params, redirect }: APIContext) {
  if (!params.secretLength) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }
  const length = Number.parseInt(params.secretLength);
  if (!length || Number.isNaN(length)) {
    return redirect("/api/random-secret/32");
  }

  const randomString = (randomBytes(Math.ceil(length / 2)))
    .toString("hex")
    .slice(0, length);

  return new Response(randomString, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
    },
  });
}
