import { cx } from "@luxass/luxals";
import Link from "next/link";

export default function NotFound(): JSX.Element {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col text-gray-600 dark:text-gray-400">
      <h1 className="text-6xl">Houston we have a 404</h1>
      <Link
        href="/"
        passHref
        className={cx(
          "mt-12 font-normal text-gray-600 dark:text-gray-400",
          "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg bg-gray-200 dark:bg-gray-800"
        )}
      >
        Go back
      </Link>
    </div>
  );
}
