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
  projects: Project[];
}

export interface Project {
  name: string;
  description: string;
  url: string;
  pushedAt: string;
  stars: number;
  forks: number;
  primaryLanguage: LanguageNode;
}

export interface LanguageNode {
  color: string;
  name: string;
}
