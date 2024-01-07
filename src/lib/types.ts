import type { z } from "zod";
import type { Language, Repository } from "github-schema";
import type { PROJECTRC_SCHEMA } from "./projectrc-schema";

type SafeOmit<T, K extends keyof T> = Omit<T, K>;

export type Project = Pick<
  Repository,
  "name" | "nameWithOwner" | "description" | "pushedAt" | "url"
> & {
  $projectrc?: ProjectRCResponse["$projectrc"]
  $values?: ProjectRCResponse["projects"][number]
  language?: Pick<Language, "name" | "color">
  defaultBranch?: string
  isContributor: boolean
};

export interface ProjectRCResponse {
  $projectrc: z.infer<typeof PROJECTRC_SCHEMA> & {
    $gitPath: string
    $path: string
  }
  projects: ProjectRCProject[]
}

export type ProjectRCProject = (SafeOmit<z.infer<typeof PROJECTRC_SCHEMA>, "readme" | "workspace" | "extras"> & {
  name: string
  readme?: {
    content: string
    path: string
  }
  extras?: {
    stars?: number
    version?: {
      tag: string
      url: string
    }
    deprecated?: {
      message: string
      replacement?: string
    }
    npm?: {
      name?: string
      url?: string
      downloads?: number
    }
  }
});
