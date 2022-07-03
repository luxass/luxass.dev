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
  nameWithOwner: string;
  description: null | string;
  pushedAt: Date;
  stargazerCount: number;
  forkCount: number;
  collaborators: Collaborators;
  languages: Languages;
}

export interface Collaborators {
  nodes: CollaboratorNode[];
}

export interface CollaboratorNode {
  avatarUrl: string;
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
