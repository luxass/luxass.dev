import type { Project, ProjectStat, ProjectWithStats } from "../pages/projects.json.ts";

interface NpmDownloads {
  package: string;
  downloads: number;
  start: string;
  end: string;
}

type FetchedStat = ProjectStat & { fetchedAt: string };

const CACHE_TTL = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const cache = new Map<string, { stat?: FetchedStat; refreshAt: number }>();
const inFlight = new Map<string, Promise<FetchedStat | undefined>>();

async function fetchStat(project: Project): Promise<FetchedStat> {
  const url = project.npmPackage
    ? `https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(project.npmPackage)}`
    : `https://api.github.com/repos/${project.githubRepo}`;
  const response = await fetch(url, {
    signal: AbortSignal.timeout(5000),
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Stats request failed: ${response.status}`);
  }

  if (project.npmPackage) {
    const data = (await response.json()) as NpmDownloads;
    if (
      data.package !== project.npmPackage ||
      !Number.isSafeInteger(data.downloads) ||
      data.downloads < 0 ||
      Date.parse(data.end) - Date.parse(data.start) !== 29 * DAY_MS ||
      Date.parse(data.end) >= Math.floor(Date.now() / DAY_MS) * DAY_MS
    ) {
      throw new Error(`Invalid npm downloads for ${project.npmPackage}`);
    }

    return {
      kind: "npm-downloads",
      value: data.downloads,
      period: { start: data.start, end: data.end },
      fetchedAt: new Date().toISOString(),
    };
  }

  const data = (await response.json()) as { stargazers_count: number };
  if (!Number.isSafeInteger(data.stargazers_count) || data.stargazers_count < 0) {
    throw new Error(`Invalid GitHub stars for ${project.githubRepo}`);
  }

  return { kind: "github-stars", value: data.stargazers_count, fetchedAt: new Date().toISOString() };
}

export async function getProjectStats(project: Project): Promise<Partial<ProjectWithStats>> {
  if (project.type !== "personal" || (!project.npmPackage && !project.githubRepo)) {
    return {};
  }

  const key = project.npmPackage ? `npm:${project.npmPackage}` : `github:${project.githubRepo}`;
  const cached = cache.get(key);
  let stat = cached?.stat;

  if (!cached || Date.now() >= cached.refreshAt) {
    let pending = inFlight.get(key);
    if (!pending) {
      pending = fetchStat(project)
        .then((fresh) => {
          cache.set(key, { stat: fresh, refreshAt: Date.now() + CACHE_TTL });
          return fresh;
        })
        .catch(() => {
          // Keep the last successful count and wait 30 seconds before retrying.
          cache.set(key, { stat: cached?.stat, refreshAt: Date.now() + 30_000 });
          return cached?.stat;
        })
        .finally(() => inFlight.delete(key));
      inFlight.set(key, pending);
    }
    stat = await pending;
  }

  if (!stat) {
    return {};
  }

  const stats = { ...stat, stale: Date.now() - Date.parse(stat.fetchedAt) >= CACHE_TTL };
  return stats.kind === "npm-downloads"
    ? { stats, downloads: stats.value, downloadsPeriod: stats.period }
    : { stats, stars: stats.value };
}

export function sortByPresentation(projects: ProjectWithStats[]): ProjectWithStats[] {
  return projects.toSorted(
    (a, b) =>
      Number(b.featured ?? false) - Number(a.featured ?? false) ||
      Number(Boolean(b.npmPackage)) - Number(Boolean(a.npmPackage)) ||
      (b.stats?.value ?? -1) - (a.stats?.value ?? -1),
  );
}
