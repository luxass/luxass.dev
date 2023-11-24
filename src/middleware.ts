export const config = {
  matcher: "/",
};

export default function middleware(request: Request): Response {
  const url = new URL(request.url);

  if (url.pathname === "/sitemap.xml") {
    url.pathname = "/sitemap-0.xml";
  }

  if (url.pathname.startsWith("/random-secret")) {
    const length = url.pathname.split("/").pop();
    url.pathname = `/api/random-secret/${length || "32"}`;
  }
  return Response.redirect(url);
}
