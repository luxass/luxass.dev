import process from "node:process";
import {
  graphql,
} from "@octokit/graphql";
import z from "zod";

interface Profile {
  user: User
}

interface User {
  repositories: Repositories
}

interface Repositories {
  totalCount: number
  nodes: RepositoryNode[]
  pageInfo: PageInfo
}

interface LanguageNode {
  name: string
  color: string
}

interface ObjectEntry {
  name: string
  type: "blob" | "tree"
  path: string
}

interface RepositoryNode {
  nameWithOwner: string
  description: string
  pushedAt: string
  url: string
  defaultBranchRef: {
    name: string
  }
  languages: {
    nodes: LanguageNode[]
  }
  object: {
    entries: ObjectEntry[]
  }
}

interface PageInfo {
  endCursor: string
  hasNextPage: boolean
}

interface ProjectRC {
  readme: boolean
  npm: boolean
  ignore: boolean
}

function gql(raw: TemplateStringsArray,
  ...keys: string[]): string {
  return keys.length === 0 ? raw[0]! : String.raw({ raw }, ...keys);
}

const PROJECTRC_SCHEMA = z.object({
  readme: z.boolean().optional().default(false),
  npm: z.boolean().optional().default(false),
  ignore: z.boolean().optional().default(false),
});

const PROJECTS_TO_IGNORE: string[] = [
];

const PROJECTS_TO_INCLUDE: string[] = [

];

const PROFILE_NAME = process.env.PROFILE_NAME ?? "luxass";

const QUERY = gql`#graphql
  query getProfile($name: String!, $after: String) {
    user(login: $name) {
      repositories(
        first: 100,
        isFork: false,
        privacy: PUBLIC,
        orderBy: {
          field: STARGAZERS,
          direction: DESC
        },
        after: $after
      ) {
        totalCount
        nodes {
          nameWithOwner
          description
          pushedAt
          url
          defaultBranchRef {
            name
          }
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
              color
            }
          }
          object(expression: "HEAD:.github") {
            ... on Tree {
              entries {
                name
                type
                path
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

async function run() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("No GITHUB_TOKEN found");
  }

  const {
    user,
  } = await graphql<Profile>(
    QUERY,
    {
      name: PROFILE_NAME,
      headers: {
        "Authorization": `bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!user) {
    throw new Error("No profile found");
  }

  const repos: (RepositoryNode & {
    projectrc?: ProjectRC
  })[] = await Promise.all(user.repositories.nodes.filter((repo) => !PROJECTS_TO_IGNORE.includes(repo.nameWithOwner)).map(async (repo) => {
    const projectrc = repo.object?.entries?.find((entry) => entry.name === ".projectrc" || entry.name === ".projectrc.json");
    if (!projectrc) {
      return {
        ...repo,
        projectrc: undefined,
      };
    }

    const defaultBranch = repo.defaultBranchRef.name;
    console.log(`Fetching .projectrc for ${repo.nameWithOwner} from ${projectrc.path} on url ${repo.url}/blob/${defaultBranch}/${projectrc.path}?raw=true`);

    const projectrcContent = await fetch(`${repo.url}/blob/${defaultBranch}/${projectrc.path}?raw=true`).then((res) => res.text());

    const parseResult = PROJECTRC_SCHEMA.safeParse(JSON.parse(projectrcContent));

    if (!parseResult.success) {
      throw new Error(`Failed to parse .projectrc for ${repo.nameWithOwner}`);
    }

    const projectrcParsed = parseResult.data;

    return {
      ...repo,
      projectrc: projectrcParsed,
    };
  }));
  // console.info(repos);

  for (const repo of repos) {
    if (repo.projectrc) {
      console.info(repo.projectrc);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
