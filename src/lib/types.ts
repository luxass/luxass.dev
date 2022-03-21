export interface GitHubUser {
  login: string;
  name: string;
  avatarUrl: string;
  email: string;
  followers: number;
}

export interface GraphQLGitHubUser {
  name: string;
  login: string;
  avatarUrl: string;
  email: string;
  followers: Followers;
  repositoriesContributedTo: Followers;
  repositories: Repositories;
}

export interface Followers {
  totalCount: number;
}

export interface Repositories {
  totalCount: number;
  nodes: Node[];
}

export interface Node {
  nameWithOwner: string;
  stargazers: Followers;
}
