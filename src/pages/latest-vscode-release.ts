import { octokit } from "../utils/octokit";

export async function get() {
  if (!import.meta.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }
  const releases = await octokit.paginate("GET /repos/{owner}/{repo}/releases", {
    owner: "microsoft",
    repo: "vscode",
    per_page: 1
  });

  if (!releases) {
    throw new Error("No releases found");
  }


  const release = releases[0];

  if (!("tag_name" in release)) {
    throw new Error("No tag_name found");
  }

  return {
    body: release.tag_name
  };
}
