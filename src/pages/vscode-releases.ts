import semver from "semver";
import { octokit } from "../utils/octokit";

export async function get() {
  if (!import.meta.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }
  const releases = await octokit.paginate("GET /repos/{owner}/{repo}/releases", {
    owner: "microsoft",
    repo: "vscode",
    per_page: 100,
  }).then((releases) => releases.filter((release) => semver.gte(release.tag_name, "1.45.0")));

  return {
    body: JSON.stringify(releases.map((release) => ({
      name: release.tag_name,
      url: release.url,
    }))),
  };
}
