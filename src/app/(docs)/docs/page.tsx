import clsx from "clsx";
import Link from "next/link";
import { ProjectCard } from "~/components/ProjectCard";
import type { Projects } from "~/lib/types";

export const revalidate = 3600;

export default async function Page() {
  const res = await fetch(
    "https://raw.githubusercontent.com/luxass/luxass/main/assets/projects.json"
  );
  let { projects } = (await res.json()) as Projects;

  for (let i = projects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // projects[i] -> projects[j]
    // projects[j] -> projects[i]
    [projects[i], projects[j]] = [projects[j], projects[i]];
  }

  projects = projects.slice(0, 4);

  return (
    <div className="p-3 text-white">
    <section className="flex flex-col-reverse sm:flex-row items-start">
      <div className="flex-1 flex flex-col pr-8 h-[200px]">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2">
          Hey I&apos;m Luxass <span>✌️</span>
        </h1>
        <p className="text-gray-200 flex-1">
          I&apos;m a self-taught developer based in Grenaa, Denmark. <br />
          Currently in ❤️ with Rust & TypeScript
        </p>
        <Link
          href="/about"
          passHref
          className={clsx(
            "mt-12 w-48 font-normal text-gray-400 group",
            "inline-block px-3 py-2 rounded-lg bg-gray-800"
          )}
        >
          <>
            Want to learn more{" "}
            <div className="inline-block group-hover:translate-x-1 transition-transform">
              →
            </div>
          </>
        </Link>
      </div>
    </section>
    <section className="mt-8">
      <h2 className="text-3xl">Selected projects, you need to see.</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 auto-cols-max sm:grid-cols-2 sm:gap-3">
        {projects
          && projects.map(project => (
            <ProjectCard key={project.url} project={project} />
          ))}
      </div>
    </section>
  </div>
  );
}
