import { ProjectCard } from "~/components/ProjectCard";
import type { Projects } from "~/lib/types";

export const revalidate = 3600;

export default async function ProjectPage() {
  const res = await fetch(
    "https://raw.githubusercontent.com/luxass/luxass/main/assets/projects.json"
  );
  const { projects } = (await res.json()) as Projects;

  return (
    <div className="p-3">
      <section className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl text-white">
          Projects
        </h1>
        <p className="mb-4 text-gray-400">
          These are some of my projects, I&apos;ve been working on.
        </p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-4">
        {projects &&
          projects.map((project) => (
            <ProjectCard key={project.url} project={project} />
          ))}
      </section>
    </div>
  );
}
