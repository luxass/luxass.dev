import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="font-sans antialiased bg-gray-50 dark:bg-gray-900">
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              function setTheme(theme) {
                window.__theme = theme;
                if (theme === "dark") {
                  document.documentElement.classList.add("dark");
                } else if (theme === "light") {
                  document.documentElement.classList.remove("dark");
                }
              }
              let prefer;
              try {
                prefer = localStorage.getItem("luxass-theme");
              } catch (e) {}
              
              window.__setTheme = function(theme) {
                prefer = theme;
                setTheme(theme);
                try {
                  localStorage.setItem("luxass-theme", theme);
                } catch (e) {}
              };
              
              let initialTheme = prefer;
              let darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
              
              if (!initialTheme) {
                initialTheme = darkQuery.matches ? "dark" : "light";
              }
              
              setTheme(initialTheme);
              darkQuery.addEventListener("change", (e) => {
                if (!prefer) {
                  setTheme(e.matches ? "dark" : "light");
                }
              });
             })();
            `,
          }}
        />

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
