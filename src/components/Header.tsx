"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const activeClasses = "font-semibold text-gray-200";
const inactiveClasses = "font-normal text-gray-400";
export function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b border-gray-800 sm:mb-12">
      <nav className="flex items-center justify-between w-full relative mx-auto py-8 px-4 text-gray-100 bg-gray-900 bg-opacity-60">
        <div>
          <Link
            href="/"
            className={clsx(
              ["", "/"].includes(pathname!) ? activeClasses : inactiveClasses,
              "inline-block px-3 py-2 rounded-lg hover:bg-gray-800 transition-all"
            )}
            passHref>
            <span className="capsize">Home</span>
          </Link>
          <Link
            href="/projects"
            className={clsx(
              pathname === "/projects" ? activeClasses : inactiveClasses,
              "inline-block px-3 py-2 rounded-lg hover:bg-gray-800 transition-all"
            )}
            passHref>
            <span className="capsize">Projects</span>
          </Link>
          <Link
            href="/about"
            className={clsx(
              pathname === "/about" ? activeClasses : inactiveClasses,
              "inline-block px-3 py-2 rounded-lg hover:bg-gray-800 transition-all"
            )}
            passHref>
            <span className="capsize">About</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
