import type { Profile, Project } from "~/types";

const query = `query GetProfile($name: String!) {
  user(login: $name) {
    repositories(
      first: 100
      orderBy: { direction: ASC, field: PUSHED_AT }
      privacy: PUBLIC
    ) {
      totalCount
      nodes {
        name
        owner {
          login
        }
        description
        pushedAt
        url
        languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
          nodes {
            color
            name
          }
        }
        object(expression: "HEAD:.github") {
          ... on Tree {
            entries {
              name
              type
            }
          }
        }
      }
    }
  }
}`;

export async function getProfile(name: string): Promise<Project[]> {
  const { data: profile } = (await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Authorization": `bearer ${import.meta.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables: { name }
    })
  }).then((res) => res.json())) as { data: Profile };

  if (!profile) {
    throw new Error("No profile found");
  }

  const repos = profile.user.repositories.nodes
    .filter((repo) => {
      if (repo.object?.entries?.length) {
        return repo.object.entries.some((entry) => entry.name === ".luxass");
      }

      return false;
    })
    .sort(
      (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
    );

  if (!repos) {
    throw new Error("No repos found");
  }

  return repos.map((repo) => ({
    name: repo.name,
    owner: repo.owner.login,
    description: (
      repo.description || "No description was provided."
    ).replaceAll(/:\w+:/gm, ""),
    url: repo.url,
    pushedAt: repo.pushedAt,
    language: repo.languages.nodes[0]
  }));
}
