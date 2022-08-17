import { cx } from "@luxass/luxals";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useDelayedRender from "use-delayed-render";

export function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300
    }
  );

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = "hidden";
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <header>
      <nav className="flex items-center justify-between w-full relative mx-auto py-8 px-4 text-gray-900 bg-gray-50 dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <div>
          <button
            className={cx("burger visible md:hidden")}
            aria-label="Toggle menu"
            type="button"
            onClick={toggleMenu}
          >
            <svg
              className={"h-5 w-5 absolute text-gray-900 dark:text-gray-100"}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              data-hide={isMenuOpen}
            >
              <path
                d="M2.5 7.5H17.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 12.5H17.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 17.5H17.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              shapeRendering="geometricPrecision"
              data-hide={!isMenuOpen}
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
          {isMenuMounted && (
            <ul
              className={cx(
                "menu flex flex-col absolute bg-gray-100 dark:bg-gray-900",
                isMenuRendered && "menuRendered"
              )}
            >
              <li
                className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold"
                style={{ transitionDelay: "150ms" }}
              >
                <Link href="/" className="flex w-auto pb-4" passHref>
                  Home
                </Link>
              </li>
              <li
                className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold"
                style={{ transitionDelay: "150ms" }}
              >
                <Link href="/projects" className="flex w-auto pb-4" passHref>
                  Projects
                </Link>
              </li>
            </ul>
          )}
          <Link
            href="/"
            className={cx(
              router.asPath === "/"
                ? "font-semibold text-gray-800 dark:text-gray-200"
                : "font-normal text-gray-600 dark:text-gray-400",
              "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            )}
            passHref
          >
            <span className="capsize">Home</span>
          </Link>
          <Link
            href="/projects"
            className={cx(
              router.asPath === "/projects"
                ? "font-semibold text-gray-800 dark:text-gray-200"
                : "font-normal text-gray-600 dark:text-gray-400",
              "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            )}
            passHref
          >
            <span className="capsize">Projects</span>
          </Link>
          <Link
            href="/about"
            className={cx(
              router.asPath === "/about"
                ? "font-semibold text-gray-800 dark:text-gray-200"
                : "font-normal text-gray-600 dark:text-gray-400",
              "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            )}
            passHref
          >
            <span className="capsize">About</span>
          </Link>
        </div>
        <div className="block dark:hidden">
          <button
            type="button"
            aria-label="Use Dark Mode"
            onClick={() => {
              window.__setTheme("dark");
            }}
            className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-gray-800 dark:text-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
        </div>
        <div className="hidden dark:block">
          <button
            type="button"
            aria-label="Use Light Mode"
            onClick={() => {
              window.__setTheme("light");
            }}
            className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-700  transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-gray-800 dark:text-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
        </div>
      </nav>
      <hr className="border-1 border-gray-200 dark:border-gray-800 sm:pb-16" />
    </header>
  );
}
