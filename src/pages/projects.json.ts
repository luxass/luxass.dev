export const prerender = false;

const NPM_DOWNLOADS_URL = "https://api.npmjs.org/downloads/point/last-month";

export interface Project {
  slug: string;
  title: string;
  description: string;
  href: string;
  type: "personal" | "contribution";
  npmPackage?: string;
}

export interface ProjectWithDownloads extends Project {
  downloads?: number;
  downloadsPeriod?: {
    start: string;
    end: string;
  };
}

export const projects = [
  {
    slug: "unplugin-yaml",
    title: "unplugin-yaml",
    description: "Universal YAML import plugin with TypeScript support for Vite, Webpack, Rollup, and esbuild.",
    href: "https://github.com/luxass/unplugin-yaml",
    type: "personal",
    npmPackage: "unplugin-yaml",
  },
  {
    slug: "vitest-testdirs",
    title: "vitest-testdirs",
    description: "Isolated test directories for Vitest, with automatic cleanup between runs.",
    href: "https://github.com/luxass/vitest-testdirs",
    type: "personal",
    npmPackage: "vitest-testdirs",
  },
  {
    slug: "github-schema",
    title: "github-schema",
    description: "Type-safe GitHub GraphQL helpers built from the public schema.",
    href: "https://github.com/luxass/github-schema",
    type: "personal",
    npmPackage: "github-schema",
  },
  {
    slug: "esbuild-yaml",
    title: "esbuild-yaml",
    description: "YAML import support for esbuild.",
    href: "https://github.com/luxass/esbuild-yaml",
    type: "personal",
    npmPackage: "esbuild-yaml",
  },
  {
    slug: "jsonc-parse",
    title: "jsonc-parse",
    description: "JSONC parsing with comments and trailing commas.",
    href: "https://github.com/luxass/jsonc-parse",
    type: "personal",
    npmPackage: "jsonc-parse",
  },
  {
    slug: "strip-json-comments",
    title: "@luxass/strip-json-comments",
    description: "Strip comments from JSON-like configuration files.",
    href: "https://github.com/luxass/strip-json-comments",
    type: "personal",
    npmPackage: "@luxass/strip-json-comments",
  },
  {
    slug: "ucdjs",
    title: "ucdjs",
    description: "Unicode character database helpers with a small API.",
    href: "https://github.com/ucdjs/ucd",
    type: "personal",
    npmPackage: "ucdjs",
  },
  {
    slug: "hono-zod-openapi",
    title: "@hono/zod-openapi",
    description: "Contributed fixes around OpenAPI path handling.",
    href: "https://github.com/honojs/middleware",
    type: "contribution",
    npmPackage: "@hono/zod-openapi",
  },
  {
    slug: "vitest-eslint",
    title: "@vitest/eslint-plugin",
    description: "Contributed rule fixes and improvements for Vitest linting.",
    href: "https://github.com/vitest-dev/eslint-plugin-vitest",
    type: "contribution",
    npmPackage: "@vitest/eslint-plugin",
  },
] satisfies Project[];

interface NpmDownloadsResponse {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

async function getNpmDownloads(packageName: string): Promise<NpmDownloadsResponse | undefined> {
  const response = await fetch(`${NPM_DOWNLOADS_URL}/${encodeURIComponent(packageName)}`);

  if (!response.ok) {
    return undefined;
  }

  const data = (await response.json()) as Partial<NpmDownloadsResponse>;

  if (typeof data.downloads !== "number" || typeof data.start !== "string" || typeof data.end !== "string") {
    return undefined;
  }

  return {
    downloads: data.downloads,
    start: data.start,
    end: data.end,
    package: typeof data.package === "string" ? data.package : packageName,
  };
}

export async function getProjectsWithDownloads(): Promise<ProjectWithDownloads[]> {
  const downloads = await Promise.all(
    projects.map(async (project) => {
      const { npmPackage } = project;

      if (npmPackage == null) {
        return [project.slug, undefined] as const;
      }

      return [project.slug, await getNpmDownloads(npmPackage)] as const;
    }),
  );

  const downloadsById = new Map(downloads);
  return projects
    .map((project) => {
      const npmDownloads = downloadsById.get(project.slug);

      return {
        slug: project.slug,
        title: project.title,
        description: project.description,
        href: project.href,
        type: project.type,
        npmPackage: project.npmPackage,
        downloads: npmDownloads?.downloads,
        downloadsPeriod:
          npmDownloads == null
            ? undefined
            : {
                start: npmDownloads.start,
                end: npmDownloads.end,
              },
      };
    })
    .toSorted((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0));
}

export async function GET() {
  const enrichedProjects = await getProjectsWithDownloads();
  return new Response(JSON.stringify({ projects: enrichedProjects }, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
