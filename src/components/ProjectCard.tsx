import type { Project } from "~/lib/types";

interface Props {
  project: Project
}

export function ProjectCard({ project }: Props) {
  const language = project.language;
  
  return (
    <a
      href={`https://github.com/${project.name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="h-36 flex flex-col justify-between gap-y-2 border border-gray-700 p-4 rounded-xl text-gray-200 hover:bg-gray-800"
      >
        <div className="flex flex-col gap-y-2">
          <span className="text-xl font-medium text-ellipsis whitespace-nowrap overflow-hidden">
              {project.name.split("/")[1]}
            </span>
          <p className="text-sm">{project.description}</p>
        </div>
        <div className="flex items-center gap-x-2 text-sm">
          <span
            className="underline decoration-wavy underline-offset-4"
            style={{
              textDecorationColor: language.color
            }}
          >
            {language.name}
          </span>
          <span>•</span>

          <div>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block w-4 h-4"
              height="16px"
              width="16px"
              xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
            </svg>
            <span className="pl-1">
              {project.stars}
            </span>
          </div>
          <span>•</span>
          <div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="inline-block w-4 h-4"
              height="16px"
              width="16px"
              xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z"
                />
            </svg>
            <span className="pl-1">{project.forks}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
