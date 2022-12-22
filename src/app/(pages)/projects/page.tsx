import { ProjectCard } from "~/components/ProjectCard";
import type { Projects } from "~/lib/types";

export const revalidate = 3600;

export default async function ProjectPage() {
  const res = await fetch(
    "https://raw.githubusercontent.com/luxass/luxass/main/assets/projects.json"
  );
  const { projects } = (await res.json()) as Projects;

  for (let i = projects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // projects[i] -> projects[j]
    // projects[j] -> projects[i]
    [projects[i], projects[j]] = [projects[j], projects[i]];
  }

  return (
    <div className="p-3 text-white">
    <section className="flex flex-col-reverse sm:flex-row items-start">
      <div className="flex-1 flex flex-col pr-8 h-[200px]">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl text-white">
            Projects
          </h1>
          <p className="mb-4 text-gray-400">
            These are some of my projects, I&apos;ve been working on.
          </p>
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
