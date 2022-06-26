import "@styles/index.css";
import type { ReactNode } from "react";
import type { AppProps } from "next/app";

const NoLayout = ({ children }: { children: ReactNode }) => <>{children}</>;

export default function App({ Component, pageProps }: AppProps) {
  let Layout = (Component as any).Layout || NoLayout;

  if ((Component as any).isMDXComponent) {
    Layout = (Component as any)({}).props.originalType.Layout;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
