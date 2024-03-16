import { z } from 'zod'

const IMAGE_SCHEMA = z
  .object({
    url: z.string().optional().describe('the url of the website'),
    title: z.string().optional().describe('the title of the image'),
    description: z.string().optional().describe('the description of the image'),
    image: z
      .union([
        z.string(),
        z.object({
          url: z.string(),
          alt: z.string().optional(),
          width: z.number().optional(),
          height: z.number().optional(),
        }),
      ])
      .optional()
      .describe('the image'),
    card: z
      .union([z.literal('summary'), z.literal('summary_large_image'), z.literal('app'), z.literal('player')])
      .optional()
      .describe('the twitter card type'),
    twitter: z.boolean().optional().describe('include twitter card meta tags'),
  })
  .describe('image information e.g. og:image or twitter:image')

const PROJECTRC_DEPRECATION_SCHEMA = z
  .object({
    message: z.string().describe('the deprecation message'),
    replacement: z
      .string()
      .optional()
      .describe('the replacement package. if not set, the package is considered deprecated without a replacement'),
  })
  .describe('deprecation information')

const PROJECTRC_NPM_SHCMEA = z
  .union([
    z.boolean().describe('if set to true, will infer the npm package name from repository and also include downloads'),
    z
      .object({
        enabled: z
          .boolean()
          .describe(
            'enable if project has a npm package, if `link` is not set the package name is auto inferred from the repository',
          ),
        name: z.string().optional().describe('override the auto inferred npm package name'),
        downloads: z.boolean().optional().describe('include the npm package downloads'),
      })
      .describe('npm package information'),
  ])
  .describe('npm package')

const PROJECT_SCHEMA = z.object({
  // meta tags - used for the project page
  title: z.string().optional().describe('the title tag of the page - if not set, the project name is used'),
  description: z
    .string()
    .optional()
    .describe('the description of the project. if not set, the github description is used'),
  keywords: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .describe('the keywords tag of the page'),
  image: IMAGE_SCHEMA.optional(),

  ignore: z.boolean().optional().describe('ignore this project in the project list'),
  readme: z
    .union([z.boolean(), z.string()])
    .optional()
    .describe('the path to the readme file. if set to true the readme file is the root readme file'),
  priority: z
    .number()
    .optional()
    .default(0)
    .describe('the priority of the project, projects with higher priority are listed first'),
  website: z
    .union([z.boolean(), z.string()])
    .optional()
    .describe('the website of the project. if set to `true`, the website is inferred from the url set in repository'),

  // extensions
  stars: z.boolean().optional().describe('include repository stars'),
  version: z
    .boolean()
    .optional()
    .describe(
      'include latest version of the npm package, will use either a tag from github or the latest version from npm',
    ),
  deprecated: PROJECTRC_DEPRECATION_SCHEMA.optional(),
  npm: PROJECTRC_NPM_SHCMEA.optional(),
})

export const PROJECTRC_SCHEMA = PROJECT_SCHEMA.merge(
  z.object({
    workspace: z
      .object({
        enabled: z.boolean().optional(),
        ignores: z.array(z.string()).optional(),
        overrides: z
          .array(
            PROJECT_SCHEMA.merge(
              z.object({
                name: z.string(),
              }),
            ),
          )
          .optional(),
      })
      .optional(),
  }),
)
