import { ReactElement } from "react";

export interface GitHubUser {
  login: string;
  name: string;
  avatarUrl: string;
  email: string;
  repositories: Repositories
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
  repositories: Repositories;
}


export interface Repositories {
  totalCount: number;
  nodes: RepositoryNode[];
}

export interface RepositoryNode {
  nameWithOwner: string;
  description: null | string;
  pushedAt: Date;
  stargazerCount: number;
  forkCount: number;
  languages: Languages;
}

export interface Languages {
  totalCount: number;
  nodes: LanguagesNode[];
}

export interface LanguagesNode {
  color: string;
  name: string;
  id: string;
}
