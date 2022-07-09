declare global {
  interface Window {
    __theme: string;
    __setTheme: (theme: string) => void;
  }
}
export interface Projects {
  totalCount: number;
  nodes: Project[];
}

export interface Project {
  id: number;
  nameWithOwner: string;
  description: null | string;
  pushedAt: Date;
  stargazerCount: number;
  forkCount: number;
  url: string;
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

export interface Repository {
  node: {
    name: string;
    url: string;
    ref: {
      target: {
        history: {
          edges: Array<{ node: CommitNode }>;
        };
      };
    }
  };
}

export interface CommitNode {
  authoredDate: string;
  message: string;
  name: string;
  url: string;
}
