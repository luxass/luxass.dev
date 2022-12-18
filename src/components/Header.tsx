import { cx } from "@luxass/luxals";
import Link from "next/link";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();

  return (
    <header className="border-b border-gray-800 sm:mb-12">
      <nav className="flex items-center justify-between w-full relative mx-auto py-8 px-4 text-gray-100 bg-gray-900 bg-opacity-60">
        <div>
          <Link
            href="/"
            className={cx(
              router.asPath === "/" || router.asPath === ""
                ? "font-semibold text-gray-200"
                : "font-normal text-gray-400",
              "inline-block px-3 py-2 rounded-lg hover:bg-gray-800 transition-all"
            )}
            passHref
          >
            <span className="capsize">Home</span>
          </Link>
          <Link
            href="/projects"
            className={cx(
              router.asPath === "/projects"
                ? "font-semibold text-gray-200"
                : "font-normal text-gray-400",
              "inline-block px-3 py-2 rounded-lg hover:bg-gray-800 transition-all"
            )}
            passHref
          >
            <span className="capsize">Projects</span>
          </Link>
          <Link
            href="/about"
            className={cx(
              router.asPath === "/about"
                ? "font-semibold text-gray-200"
                : "font-normal text-gray-400",
              "inline-block px-3 py-2 rounded-lg hover:bg-gray-800 transition-all"
            )}
            passHref
          >
            <span className="capsize">About</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
