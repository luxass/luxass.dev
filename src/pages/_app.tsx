import { Analytics } from '@vercel/analytics/react';
import type { AppType } from 'next/dist/shared/lib/utils';
import { trpc } from '~/lib/trpc';
import '~/styles/globals.css';
import { Inter } from '@next/font/google';

const inter = Inter({
  variable: '--font-inter'
});

const App: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${inter.variable} font-sans antialiased`}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
};

export default trpc.withTRPC(App);
