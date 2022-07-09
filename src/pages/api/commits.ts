import { CommitNode, Repository } from "@lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: `query {
          user(login: "luxass") {
            repositories(
              first: 3
              orderBy: { direction: DESC, field: UPDATED_AT }
              privacy: PUBLIC
            ) {
              edges {
                node {
                  name
                  url
                  ref(qualifiedName: "main") {
                    target {
                      ...on Commit {
                        history(first: 1) {
                          edges {
                            node {
                              authoredDate
                              message
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
      }),
    });
    const {
      data: {
        user: {
          repositories: { edges },
        },
      },
    } = await response.json();

    const repositories: Repository[] = edges;

    const nodes: CommitNode[] = repositories.map((repository) => {
      const name = repository.node.name;
      const url = repository.node.url;
      const commit = repository.node.ref.target.history.edges[0].node;
      return { ...commit, name, url };
    });
    return res.status(200).json({ nodes });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
