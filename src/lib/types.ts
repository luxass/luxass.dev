import { ReactElement } from "react";

export interface GitHubUser {
  login: string;
  name: string;
  avatarUrl: string;
  email: string;
  followers: number;
  stars: number;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: ReactElement;
}

export interface GraphQLGitHubUser {
  name: string;
  login: string;
  avatarUrl: string;
  email: string;
  followers: {
    totalCount: number;
  };
  repositories: Repositories;
}

export interface Repositories {
  totalCount: number;
  nodes: Node[];
}

export interface Node {
  nameWithOwner: string;
  stargazers: {
    totalCount: number;
  };
}
