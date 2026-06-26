export const prerender = false;

const NPM_DOWNLOADS_URL = "https://api.npmjs.org/downloads/point/last-month";
const GITHUB_REPOS_URL = "https://api.github.com/repos";

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
    description: "Universal YAML import plugin with TypeScript support for Vite, Webpack, Rollup, and esbuild.",
    href: "https://github.com/luxass/unplugin-yaml",
    type: "personal",
    npmPackage: "unplugin-yaml",
    githubRepo: "luxass/unplugin-yaml",
  },
  {
    slug: "vitest-testdirs",
    title: "vitest-testdirs",
    description: "Isolated test directories for Vitest, with automatic cleanup between runs.",
    href: "https://github.com/luxass/vitest-testdirs",
    type: "personal",
    npmPackage: "vitest-testdirs",
    githubRepo: "luxass/vitest-testdirs",
  },
  {
    slug: "github-schema",
    title: "github-schema",
    description: "Type-safe GitHub GraphQL helpers built from the public schema.",
    href: "https://github.com/luxass/github-schema",
    type: "personal",
    npmPackage: "github-schema",
    githubRepo: "luxass/github-schema",
  },
  {
    slug: "esbuild-yaml",
    title: "esbuild-yaml",
    description: "YAML import support for esbuild.",
    href: "https://github.com/luxass/esbuild-yaml",
    type: "personal",
    npmPackage: "esbuild-yaml",
    githubRepo: "luxass/esbuild-yaml",
  },
  {
    slug: "jsonc-parse",
    title: "jsonc-parse",
    description: "JSONC parsing with comments and trailing commas.",
    href: "https://github.com/luxass/jsonc-parse",
    type: "personal",
    npmPackage: "jsonc-parse",
    githubRepo: "luxass/jsonc-parse",
  },
  {
    slug: "strip-json-comments",
    title: "@luxass/strip-json-comments",
    description: "Strip comments from JSON-like configuration files.",
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

interface NpmDownloadsResponse {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

interface GitHubRepositoryResponse {
  stargazers_count: number;
}

interface CacheEntry<T> {
  expiresAt: number;
  value: T;
}

const STATS_CACHE_TTL = 60 * 60 * 1000;
const npmDownloadsCache = new Map<string, CacheEntry<NpmDownloadsResponse>>();
const githubStarsCache = new Map<string, CacheEntry<number>>();

const projectOrder = new Map(projects.map((project, index) => [project.slug, index]));

async function getNpmDownloads(packageName: string): Promise<NpmDownloadsResponse | undefined> {
  const cached = npmDownloadsCache.get(packageName);

  if (cached != null && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  try {
    const response = await fetch(`${NPM_DOWNLOADS_URL}/${encodeURIComponent(packageName)}`);

    if (!response.ok) {
      return undefined;
    }

    const data = (await response.json()) as Partial<NpmDownloadsResponse>;

    if (typeof data.downloads !== "number" || typeof data.start !== "string" || typeof data.end !== "string") {
      return undefined;
    }

    const npmDownloads = {
      downloads: data.downloads,
      start: data.start,
      end: data.end,
      package: typeof data.package === "string" ? data.package : packageName,
    };

    npmDownloadsCache.set(packageName, {
      expiresAt: Date.now() + STATS_CACHE_TTL,
      value: npmDownloads,
    });

    return npmDownloads;
  } catch {
    return undefined;
  }
}

async function getGitHubStars(repo: string): Promise<number | undefined> {
  const cached = githubStarsCache.get(repo);

  if (cached != null && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  try {
    const response = await fetch(`${GITHUB_REPOS_URL}/${repo}`, {
      headers: {
        accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return undefined;
    }

    const data = (await response.json()) as Partial<GitHubRepositoryResponse>;

    if (typeof data.stargazers_count !== "number") {
      return undefined;
    }

    githubStarsCache.set(repo, {
      expiresAt: Date.now() + STATS_CACHE_TTL,
      value: data.stargazers_count,
    });

    return data.stargazers_count;
  } catch {
    return undefined;
  }
}

async function getProjectStats(project: Project): Promise<Partial<ProjectWithStats>> {
  if (project.type !== "personal") {
    return {};
  }

  if (project.npmPackage != null) {
    const npmDownloads = await getNpmDownloads(project.npmPackage);

    if (npmDownloads != null) {
      return {
        downloads: npmDownloads.downloads,
        downloadsPeriod: {
          start: npmDownloads.start,
          end: npmDownloads.end,
        },
        stats: {
          kind: "npm-downloads",
          value: npmDownloads.downloads,
          period: {
            start: npmDownloads.start,
            end: npmDownloads.end,
          },
        },
      };
    }
  }

  if (project.githubRepo != null) {
    const stars = await getGitHubStars(project.githubRepo);

    if (stars == null) {
      return {};
    }

    return {
      stars,
      stats: {
        kind: "github-stars",
        value: stars,
      },
    };
  }

  return {};
}

function getPopularity(project: ProjectWithStats): number {
  return project.stats?.value ?? 0;
}

function sortByPresentation(projectsToSort: ProjectWithStats[]): ProjectWithStats[] {
  return projectsToSort.toSorted((a, b) => {
    const featured = Number(b.featured === true) - Number(a.featured === true);

    if (featured !== 0) {
      return featured;
    }

    const popularity = getPopularity(b) - getPopularity(a);

    if (popularity !== 0) {
      return popularity;
    }

    return (projectOrder.get(a.slug) ?? 0) - (projectOrder.get(b.slug) ?? 0);
  });
}

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
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
