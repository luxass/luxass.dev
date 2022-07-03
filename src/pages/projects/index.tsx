import { ProjectCard } from "@components/ProjectCard";
import { DefaultLayout } from "@layouts/default";
import { Project, Projects } from "@lib/types";
import { InferGetStaticPropsType } from "next/types";

export default function ProjectsPage({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Projects
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
         Coming Soon
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.nodes &&
          projects.nodes.map((project: Project, idx: number) => (
            <ProjectCard key={`project-${idx}`} project={project} />
          ))}
      </section>
    </DefaultLayout>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `query {
        user(login: "luxass") {
          repositories(
            first: 20
            orderBy: { direction: DESC, field: STARGAZERS }
            privacy: PUBLIC
          ) {
            totalCount
            nodes {
              nameWithOwner
              description
              pushedAt
              stargazerCount
              forkCount
              
              collaborators {
                nodes {
                  avatarUrl
                }
              }
              languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
                totalCount
                nodes {
                  color
                  name
                  id
                }
              }
            }
          }
        }
      }`,
    }),
  });
  const {
    data: { user },
  } = await res.json();
  const projects: Projects = user.repositories || {
    totalCount: 0,
    nodes: [],
  };

  return {
    props: {
      projects: projects,
    },
    revalidate: 3600,
  };
}
