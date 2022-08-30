import { MDXRemoteSerializeResult } from 'next-mdx-remote';

declare global {
  interface Window {
    __theme: string;
    __setTheme: (theme: string) => void;
  }
}

export interface Snippet {
  content: MDXRemoteSerializeResult;
  title: string;
  description: string;
}
export interface Projects {
  lastUpdated: string;
  totalCount: number;
  totalStars: number;
  totalForks: number;
  projects: EdgeNode[];
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
  entries: FileEntry[];
}

export interface FileEntry {
  name: string;
  type: EntryType;
}

export type EntryType = 'blob' | 'tree';
