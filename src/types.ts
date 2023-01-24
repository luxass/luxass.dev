export interface Projects {
  lastUpdated: string;
  totalCount: number;
  totalStars: number;
  totalForks: number;
  projects: Project[];
}

export interface Project {
  name: string;
  owner: string;
  description: string;
  url: string;
  pushedAt: string;
  stars: number;
  forks: number;
  language: {
    color: string;
    name: string;
  };
}
