import '~/styles/index.css';
import { withTRPC } from '@trpc/next';
import type { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import type { AppRouter } from '~/server/router';

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  ssr: false
})(App);
