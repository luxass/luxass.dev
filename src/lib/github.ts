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
