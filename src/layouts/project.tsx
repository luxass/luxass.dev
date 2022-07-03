import { Header } from "@components/Header";
import { PropsWithChildren, Suspense } from "react";

interface ProjectLayoutProps {}

export function ProjectLayout({
  children,
}: PropsWithChildren<ProjectLayoutProps>) {
  return (
    <Suspense fallback={null}>
      <div className="max-w-4xl mx-auto w-full">
        <Header />

        <main>{children}</main>
      </div>
    </Suspense>
  );
}
