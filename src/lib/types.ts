import type { z } from "zod";
import type { Language, Repository } from "github-schema";
import type {
  DEPRECATED_SCHEMA,
  NPM_SCHEMA,
  PROJECT_SCHEMA,
  WEBSITE_SCHEMA,
} from "./mosaic-schema";

type SafeOmit<T, K extends keyof T> = Omit<T, K>;

export type ResolvedProject = {
  name: string;
  website?: SafeOmit<z.infer<typeof WEBSITE_SCHEMA>, "enabled">;
  npm?: SafeOmit<z.infer<typeof NPM_SCHEMA>, "enabled" | "downloads"> & {
    url?: string;
    downloads?: number;
  };
  deprecated?: z.infer<typeof DEPRECATED_SCHEMA>;
  readme?: string;
} & SafeOmit<z.infer<typeof PROJECT_SCHEMA>, "version" | "stars"> & {
  version?: string;
  stars?: number;
};

export type Project = ResolvedProject & Pick<Repository, "nameWithOwner" | "pushedAt" | "url"> & {
  defaultBranch?: string;
  isContributor: boolean;
  language?: Pick<Language, "name" | "color">;
};
