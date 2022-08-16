import Image from "next/future/image";
import { DefaultLayout } from "@layouts/default";
import Link from "next/link";
import { cx } from "@luxass/luxals";
import useSWR from "swr";
import { CommitNode } from "@lib/types";
import { CommitCard } from "@components/CommitCard";

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export default function Home() {
  const { data } = useSWR<{ nodes: CommitNode[] }>(`/api/commits`, fetcher);
  const nodes = data?.nodes || [];
  return (
    <DefaultLayout>
      <div className="p-3">
        <section className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex-1 flex flex-col pr-8 h-[200px]">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
              Hey I&apos;m Luxass <span>✌️</span>
            </h1>
            <p className="text-gray-700 dark:text-gray-200 flex-1">
              I&apos;m a self-taught developer based in Grenaa, Denmark. <br />
              Currently in ❤️ with Rust & TypeScript
            </p>
            <Link
              href="/about"
              passHref
              className={cx(
                "mt-12 w-48 font-normal text-gray-600 dark:text-gray-400 group",
                "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg bg-gray-200 dark:bg-gray-800"
              )}
            >
              Want to learn more{" "}
              <div className="inline-block group-hover:translate-x-1 transition-transform">
                →
              </div>
            </Link>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-4xl text-black dark:text-white">Some recent changes i made.</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {nodes &&
              nodes.map((node, idx) => (
                <CommitCard key={`commit-${idx}`} commit={node} />
              ))}
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
