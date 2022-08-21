import { Header } from "@components/Header";
import { Snippet } from "@lib/types";
import Head from "next/head";
import { PropsWithChildren, Suspense } from "react";

interface Props {
  snippet: Snippet
}

export function SnippetLayout({
  children,
  snippet
}: PropsWithChildren<Props>) {
  return (
    <Suspense fallback={null}>
      <Head>
        <title>Lucas Norgaard - Fullstack Developer</title>
      </Head>
      <div className="max-w-2xl mx-auto w-full h-screen flex flex-col">
        <Header />

        <main className="flex-1">{children}</main>

        <footer className="pb-8">
          <hr className="border-1 border-gray-200 dark:border-gray-800 mb-8" />
          <p className="text-center text-gray-700 dark:text-gray-200">
            &copy; {new Date().getFullYear()} Lucas Norgaard, All rights
            reserved.
          </p>
        </footer>
      </div>
    </Suspense>
  );
}
