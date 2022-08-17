declare global {
  interface Window {
    __theme: string;
    __setTheme: (theme: string) => void;
  }
}
export interface Projects {
  lastUpdated: string;
  totalCount: number;
  totalStars: number;
  totalForks: number;
  projects: EdgeNode[];
}

export interface Profile {
  user: User;
}

export interface User {
  pinnedItems: PinnedItems;
  repositories: Repositories;
}

export interface PinnedItems {
  edges: Edge[];
}

export interface Edge {
  node: EdgeNode;
}

export interface EdgeNode {
  nameWithOwner: string;
  description: null | string;
  pushedAt: Date;
  stargazerCount: number;
  forkCount: number;
  url: string;
  languages: Languages;
  object: Object | null;
}

export interface Languages {
  nodes: LanguagesNode[];
}

export interface LanguagesNode {
  color: string;
  name: string;
}

export interface Object {
  entries: Entry[];
}

export interface Entry {
  name: string;
  type: EntryType;
}

export type EntryType = 'blob' | 'tree';

export interface Repositories {
  totalCount: number;
  nodes: EdgeNode[];
}
