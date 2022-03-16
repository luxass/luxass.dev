import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
);

export default appWithTranslation(MyApp);
