import { Analytics } from "@vercel/analytics/react";
import { Inter } from "@next/font/google";
import "~/styles/globals.css";
import type { AppType } from "next/app";
const inter = Inter({
  variable: "--font-inter"
});

const App: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${inter.variable} font-inter antialiased`}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
};

export default App;
