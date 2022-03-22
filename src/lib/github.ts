import { gql } from "graphql-request";
import { GitHubUser, GraphQLGitHubUser } from "./types";

export function parseGitHubUser(user: GraphQLGitHubUser): GitHubUser {
  const stars = user.repositories.nodes.reduce((prev, curr) => {
    return prev + curr.stargazers!.totalCount;
  }, 0);

  return {
    name: user.name,
    login: user.login,
    avatarUrl: user.avatarUrl,
    email: user.email,
    followers: user.followers.totalCount,
    stars: stars,
  };
}

export const userQuery = gql`
  query userInfo($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      email
      followers {
        totalCount
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        orderBy: { direction: DESC, field: PUSHED_AT }
        privacy: PUBLIC
      ) {
        totalCount
        nodes {
          nameWithOwner
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;
