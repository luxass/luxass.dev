import { PropsWithChildren, Suspense } from "react";

interface Props {}

export function TemplateLayout({
  children
}: PropsWithChildren<Props>) {
  return (
    <Suspense fallback={null}>
      <div className="max-w-2xl mx-auto w-full h-screen flex flex-col justify-center items-center">
        {children}
      </div>
    </Suspense>
  );
}
