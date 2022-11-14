import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/favicons/favicon.ico" rel="shortcut icon" />
        <link href="/favicons/site.webmanifest" rel="manifest" />
        <link
          href="/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <meta content="#ffffff" name="theme-color" />
        <meta property="og:image" content="/avatar.jpg" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:title"
          content="Lucas Norgaard - Fullstack Developer"
        />
        <meta
          property="description"
          content="With a background as a fullstack developer. Lucas Norgaard builds both modern and scalable applications"
        />
        <meta
          property="keywords"
          content="lucas nørgård, web developer, website, lucas, nørgård"
        />
      </Head>
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
            `
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
