import { z } from "zod";

export const PROJECT_SCHEMA = z.object({
  priority: z.number({
    description: "the priority of the project. the higher the number, the higher position the project will have on `luxass.dev`.",
  }).default(10),

  description: z.string({
    description: "the description of the project.",
  }).optional(),

  stars: z.boolean({
    description: "include the stars of the repository.",
  }).default(false),

  version: z.boolean({
    description: "infer the version of the project from the repository.",
  }).optional().default(false),

  ignore: z.boolean({
    description: "ignore the project from being displayed on `luxass.dev`.",
  }).optional().default(false),
});

export const NPM_SCHEMA = z.object({
  enabled: z.boolean({
    description: "npm package information.",
  }),

  name: z.string({
    description: "the name of the npm package. by default the `name` will be auto-inferred from `package.json`",
  }).optional(),

  downloads: z.boolean({
    description: "include the npm package downloads",
  }).default(false),
});

export const README_SCHEMA = z.object({
  enabled: z.boolean({
    description: "include the readme file of the repository.",
  }),
  path: z.string({
    description: "the path to the readme file. by default the `path` will be auto-inferred from the repository.",
  }).optional(),
});

export const WEBSITE_SCHEMA = z.object({
  enabled: z.boolean({
    description: "include the website information.",
  }),
  url: z.string({
    description: "the url of the website.",
  }).optional(),
  title: z.string({
    description: "the title of the website.",
  }).optional(),
  description: z.string({
    description: "The description to set in the meta description tag. If not provided, the description will be inferred from `project.description`",
  }).optional(),
  keywords: z.array(z.string()).optional(),
});

export const DEPRECATED_SCHEMA = z.object({
  message: z.string({
    description: "the deprecation message.",
  }),

  replacement: z.string({
    description: "the replacement message.",
  }).optional(),
});

const BASE_MOSAIC_SCHEMA = z.object({
  project: PROJECT_SCHEMA,
  npm: NPM_SCHEMA.optional(),
  readme: README_SCHEMA.optional(),
  website: WEBSITE_SCHEMA.optional(),
  deprecated: DEPRECATED_SCHEMA.optional(),
});

export const WORKSPACE_SCHEMA = z.object({
  enabled: z.boolean({
    description: "include the workspace information.",
  }),

  ignores: z.array(z.string({
    description: "the ignored projects in the workspace.",
  })).optional(),

  overrides: z.record(BASE_MOSAIC_SCHEMA.omit({ project: true }).merge(z.object({
    project: PROJECT_SCHEMA.merge(z.object({
      name: z.string({
        description: "the name of the project.",
      }),
    })).partial(),
  }))).optional(),
});

export const MOSAIC_SCHEMA = BASE_MOSAIC_SCHEMA.merge(z.object({
  project: PROJECT_SCHEMA.merge(z.object({
    name: z.string({
      description: "the name of the project.",
    }),
  })),
  workspace: WORKSPACE_SCHEMA.optional(),
}));
