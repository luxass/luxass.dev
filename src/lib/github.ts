import { GitHubUser, GraphQLGitHubUser } from "./types";

export function parseGitHubUser(user: GraphQLGitHubUser): GitHubUser {
  return {
    name: user.name,
    login: user.login,
    avatarUrl: user.avatarUrl,
    email: user.email,
    followers: user.followers.totalCount,
  };
}
