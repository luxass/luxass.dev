import { Header } from '~/components/Header';
import Head from 'next/head';
import { PropsWithChildren, Suspense } from 'react';

interface Props {
  title?: string;
}

export function DefaultLayout({ children, title }: PropsWithChildren<Props>) {
  return (
    <Suspense fallback={null}>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="max-w-2xl mx-auto w-full h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="sm:mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-700 dark:text-gray-200">
            &copy; {new Date().getFullYear()} Lucas Norgaard, All rights
            reserved.
          </p>
        </footer>
      </div>
    </Suspense>
  );
}
