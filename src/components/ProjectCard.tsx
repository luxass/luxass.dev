import { FiStar } from 'react-icons/fi';
import { BiGitRepoForked } from 'react-icons/bi';
import { Project } from '~/lib/types';
const toEmoji = require('emoji-name-map');
interface Props {
  project: Project;
}

function parseEmojis(desc: string): string {
  return desc.replace(/:\w+:/gm, (match) => {
    return toEmoji.get(match) || match;
  });
}

export function ProjectCard({ project }: Props) {
  const name = project.name.split('/')[1];
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full text-gray-900 dark:text-gray-100 flex flex-col">
      <div className="flex flex-items justify-between">
        <h3 className="text-lg text-ellipsis whitespace-nowrap overflow-hidden">
          {name}
        </h3>
        <div className="ml-4 min-w-[24px]">
          <a target="_blank" rel="noopener noreferrer" href={project.url}>
            <svg
              className="h-4 w-4 ml-1 inline-block align-middle overflow-hidden"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.24 22a1 1 0 01-1-1v-2.6a2.15 2.15 0 00-.54-1.66 1 1 0 01.61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 00-.67-2.22 2.75 2.75 0 01-.41-2.06 3.71 3.71 0 000-1.41 7.65 7.65 0 00-2.09 1.09 1 1 0 01-.84.15 10.15 10.15 0 00-5.52 0 1 1 0 01-.84-.15 7.4 7.4 0 00-2.11-1.09 3.52 3.52 0 000 1.41 2.84 2.84 0 01-.43 2.08 4.07 4.07 0 00-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 01.82.66 1 1 0 01-.21 1 2.06 2.06 0 00-.55 1.56V21a1 1 0 01-2 0v-.57a6 6 0 01-5.27-2.09 3.9 3.9 0 00-1.16-.88 1 1 0 11.5-1.94 4.93 4.93 0 012 1.36c1 1 2 1.88 3.9 1.52a3.89 3.89 0 01.23-1.58c-2.06-.52-5-2-5-7a6 6 0 011-3.33.85.85 0 00.13-.62 5.69 5.69 0 01.33-3.21 1 1 0 01.63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 015.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 01.63.57 5.71 5.71 0 01.33 3.22.75.75 0 00.11.57 6 6 0 011 3.34c0 5.07-2.92 6.54-5 7a4.28 4.28 0 01.22 1.67V21a1 1 0 01-.94 1z" />
            </svg>
          </a>
        </div>
      </div>
      <p className="mt-2 flex-1">
        {parseEmojis(project.description || 'No description was set')}
      </p>
      <div className="pt-4 text-sm flex items-center gap-2">
        <span className="flex items-center gap-1.5">
          <span style={{ color: project.primaryLanguage.color }}>⬤</span>
          {project.primaryLanguage.name}
        </span>
        <span className="flex items-center gap-1.5">
          <FiStar /> {project.stars}
        </span>
        <span className="flex items-center gap-1.5">
          <BiGitRepoForked /> {project.forks}
        </span>
      </div>
    </div>
  );
}
