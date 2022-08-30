import { NextApiRequest, NextApiResponse } from 'next';

import { graphql } from '@octokit/graphql';

type ResponseError = {
  message: string;
};

export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<any | ResponseError>
) {
  const { query } = req;
  const { github, file } = query as {
    github: string;
    file: string;
  };

  if (!github || !file) {
    res
      .status(400)
      .json({ message: 'Missing query params `github` and `file`' });
    return;
  }

  const [owner, name] = github.split('/');

  const response = await graphql(
    `
      query RepoFiles($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          object(expression: "HEAD:") {
            ... on Tree {
              entries {
                name
                type
                object {
                  ... on Tree {
                    entries {
                      name
                      type
                      object {
                        ... on Tree {
                          entries {
                            name
                            type
                            object {
                              ... on Tree {
                                entries {
                                  name
                                  type
                                  object {
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
      }
    `,
    {
      headers: {
        authorization: `bearer ${process.env.GITHUB_URL_1}`
      },
      owner: owner,
      name: name
    }
  );

  const files = response.repository.object.entries;

  return res.status(200).json(files);
  // User with id exists
  /* return filtered.length > 0
    ? res.status(200).json(filtered[0])
    : res.status(404).json({ message: `User with id: ${id} not found.` }); */
}
