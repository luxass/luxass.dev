"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col text-gray-400 text-center">
      <h1 className="text-6xl">
        Houston we have a <span className="text-blue-600">404</span>
      </h1>
      <Link
        href="/"
        passHref
        className="mt-12 font-normal text-gray-400 p-1 px-3 py-2 rounded-lg bg-gray-800"
      >
        Go back
      </Link>
    </div>
  );
}
