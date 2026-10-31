import { getProjectStats, sortByPresentation } from "../lib/project-stats.ts";

export const prerender = false;

export interface Project {
  slug: string;
  title: string;
  description: string;
  href: string;
  type: "personal" | "contribution";
  featured?: boolean;
  npmPackage?: string;
  githubRepo?: string;
}

export interface ProjectStat {
  kind: "npm-downloads" | "github-stars";
  value: number;
  fetchedAt?: string;
  stale?: boolean;
  period?: {
    start: string;
    end: string;
  };
}

export interface ProjectWithStats extends Project {
  stats?: ProjectStat;
  downloads?: number;
  downloadsPeriod?: {
    start: string;
    end: string;
  };
  stars?: number;
}

export const projects = [
  {
    slug: "unplugin-yaml",
    title: "unplugin-yaml",
    description: "Import YAML files in Vite, Webpack, Rollup, or esbuild, with TypeScript support.",
    href: "https://github.com/luxass/unplugin-yaml",
    type: "personal",
    npmPackage: "unplugin-yaml",
    githubRepo: "luxass/unplugin-yaml",
  },
  {
    slug: "vitest-testdirs",
    title: "vitest-testdirs",
    description: "Give Vitest tests isolated directories and clean them up between runs.",
    href: "https://github.com/luxass/vitest-testdirs",
    type: "personal",
    npmPackage: "vitest-testdirs",
    githubRepo: "luxass/vitest-testdirs",
  },
  {
    slug: "github-schema",
    title: "github-schema",
    description: "Type-safe helpers for querying GitHub's GraphQL API from its public schema.",
    href: "https://github.com/luxass/github-schema",
    type: "personal",
    npmPackage: "github-schema",
    githubRepo: "luxass/github-schema",
  },
  {
    slug: "esbuild-yaml",
    title: "esbuild-yaml",
    description: "Load YAML files directly in esbuild builds.",
    href: "https://github.com/luxass/esbuild-yaml",
    type: "personal",
    npmPackage: "esbuild-yaml",
    githubRepo: "luxass/esbuild-yaml",
  },
  {
    slug: "jsonc-parse",
    title: "jsonc-parse",
    description: "Parse JSON with comments and trailing commas.",
    href: "https://github.com/luxass/jsonc-parse",
    type: "personal",
    npmPackage: "jsonc-parse",
    githubRepo: "luxass/jsonc-parse",
  },
  {
    slug: "strip-json-comments",
    title: "@luxass/strip-json-comments",
    description: "Remove comments from JSON-like configuration before parsing.",
    href: "https://github.com/luxass/strip-json-comments",
    type: "personal",
    npmPackage: "@luxass/strip-json-comments",
    githubRepo: "luxass/strip-json-comments",
  },
  {
    slug: "hono-zod-openapi",
    title: "@hono/zod-openapi",
    description: "Small fixes around OpenAPI path handling.",
    href: "https://github.com/honojs/middleware",
    type: "contribution",
    githubRepo: "honojs/middleware",
  },
  {
    slug: "vitest-eslint",
    title: "@vitest/eslint-plugin",
    description: "Small rule fixes and improvements for Vitest linting.",
    href: "https://github.com/vitest-dev/eslint-plugin-vitest",
    type: "contribution",
    githubRepo: "vitest-dev/eslint-plugin-vitest",
  },
] satisfies Project[];

export async function getProjectsWithStats(): Promise<ProjectWithStats[]> {
  const enrichedProjects = await Promise.all(
    projects.map(async (project) => Object.assign({}, project, await getProjectStats(project))),
  );

  const personalProjects = sortByPresentation(enrichedProjects.filter((project) => project.type === "personal"));
  const contributions = enrichedProjects.filter((project) => project.type === "contribution");

  return [...personalProjects, ...contributions];
}

export const getProjectsWithDownloads = getProjectsWithStats;

export async function GET() {
  const enrichedProjects = await getProjectsWithStats();
  const personalProjects = enrichedProjects.filter((project) => project.type === "personal");
  const contributions = enrichedProjects.filter((project) => project.type === "contribution");

  return new Response(JSON.stringify({ projects: enrichedProjects, personalProjects, contributions }, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=3600",
    },
  });
}
