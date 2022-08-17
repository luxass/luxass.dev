import Head from "next/head";
import { PropsWithChildren, Suspense } from "react";

interface ProjectLayoutProps {}

export function ProjectLayout({
  children
}: PropsWithChildren<ProjectLayoutProps>) {
  return (
    <Suspense fallback={null}>
      <div className="max-w-2xl mx-auto w-full h-screen flex flex-col justify-center items-center">
        {children}
      </div>
    </Suspense>
  );
}
