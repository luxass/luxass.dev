/* import { Inter } from "@next/font/google";

const inter = Inter({
  variable: "--font-inter"
});

console.log(inter); */

export default function DocsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <head />
      <body className={"font-inter antialiased"}>
          {children}
          <p>EYE</p>
      </body>
    </html>
  );
}
