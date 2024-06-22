import type { z } from "zod";
import type { Language, Repository } from "github-schema";
import type { PROJECTRC_SCHEMA } from "./projectrc-schema";

type SafeOmit<T, K extends keyof T> = Omit<T, K>;

type ResolvedProject = SafeOmit<z.infer<typeof PROJECTRC_SCHEMA>, "readme" | "workspace" | "stars" | "npm" | "version"> & {
  /**
   * The name of the project
   */
  name: string;

  /**
   * URL to the readme file
   *
   * NOTE:
   * We are not including the full readme in the response,
   * due to some readme files being very large.
   */
  readme?: string;

  /**
   * The number of stars the repository has
   */
  stars?: number;

  /**
   * The npm configuration
   */
  npm?: SafeOmit<Exclude<NonNullable<z.infer<typeof PROJECTRC_SCHEMA>["npm"]>, boolean>, "enabled"> & {
    url?: string;
  };

  /**
   * The version of the project
   */
  version?: string;
};

export type Project = ResolvedProject & Pick<Repository, "nameWithOwner" | "pushedAt" | "url"> & {
  defaultBranch?: string;
  isContributor: boolean;
  language?: Pick<Language, "name" | "color">;
};
