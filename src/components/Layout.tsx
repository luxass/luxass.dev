import { Navigaiton } from "./Navigation";

export interface LayoutProps {
  image: string;
  children: React.ReactNode;
}

export function Layout({ children, image }: LayoutProps) {
  return (
    <section className="w-full min-h-screen bg-[#22272e] pt-6">
      <Navigaiton />
      <section className="xl:container mx-auto px-4 md:px-6 lg:px-8">
        <section className="flex flex-col md:flex-row">
          <section className="w-full md:w-1/4"></section>
          <section className="w-full md:w-3/4">{children}</section>
        </section>
      </section>
    </section>
  );
}
