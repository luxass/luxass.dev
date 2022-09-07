import { DefaultLayout } from '~/layouts/default';
import Link from 'next/link';
import { cx } from '@luxass/luxals';
import { Project, Projects } from '~/lib/types';
import { GetStaticProps, NextPage } from 'next';
import { ProjectCard } from '~/components/ProjectCard';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    'https://raw.githubusercontent.com/luxass/luxass/main/assets/projects.json'
  );
  const { projects } = (await res.json()) as Projects;

  for (let i = projects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // projects[i] -> projects[j]
    // projects[j] -> projects[i]
    [projects[i], projects[j]] = [projects[j], projects[i]];
  }

  return {
    props: {
      projects: projects.slice(0, 4)
    },
    revalidate: 3600
  };
};

const HomePage: NextPage<{ projects: Project[] }> = ({ projects }) => {
  return (
    <DefaultLayout title="Home - Lucas Norgaard">
      <div className="p-3">
        <section className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex-1 flex flex-col pr-8 h-[200px]">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
              Hey I&apos;m Luxass <span>✌️</span>
            </h1>
            <p className="text-gray-700 dark:text-gray-200 flex-1">
              I&apos;m a self-taught developer based in Grenaa, Denmark. <br />
              Currently in ❤️ with Rust & TypeScript
            </p>
            <Link
              href="/about"
              passHref
              className={cx(
                'mt-12 w-48 font-normal text-gray-600 dark:text-gray-400 group',
                'inline-block px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800'
              )}
            >
              Want to learn more{' '}
              <div className="inline-block group-hover:translate-x-1 transition-transform">
                →
              </div>
            </Link>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-3xl text-black dark:text-white">
            Selected projects, you need to see.
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 auto-cols-max sm:grid-cols-2 sm:gap-3">
            {projects &&
              projects.map((project) => (
                <ProjectCard key={project.url} project={project} />
              ))}
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
