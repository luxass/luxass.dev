import { gql } from "graphql-request";
import { GitHubUser, GraphQLGitHubUser } from "./types";

export function parseGitHubUser(user: GraphQLGitHubUser): GitHubUser {
  return {
    name: user.name,
    login: user.login,
    avatarUrl: user.avatarUrl,
    email: user.email,
    repositories: user.repositories,
  };
}

export const userQuery = gql`
  query userInfo($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      email
      repositories(
        first: 100
        ownerAffiliations: OWNER
        orderBy: { direction: DESC, field: PUSHED_AT }
        privacy: PUBLIC
      ) {
        totalCount
        nodes {
          nameWithOwner
          description
          pushedAt
          stargazerCount
          forkCount
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            totalCount
            nodes {
              color
              name
              id
            }
          }
        }
      }
    }
  }
`;
