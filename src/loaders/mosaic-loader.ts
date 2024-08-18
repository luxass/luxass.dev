import { mkdir, writeFile } from "node:fs/promises";
import { relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { Loader } from "astro/loaders";

export function mosaic(): Loader {
  return {
    name: "mosaic",
    load: async ({
      store,
      meta,
      logger,
      collection,
      parseData,
      generateDigest,
      settings,
    }) => {
      logger.info("loading projects from mosaic");

      const lastSynced = meta.get("lastSynced");

      logger.info(`lastSynced: ${lastSynced}`);
      logger.info(`now: ${Date.now()}`);
      logger.info(`diff: ${Date.now() - Number(lastSynced)}`);

      const seconds = 10;

      if (lastSynced && (Date.now() - Number(lastSynced) < 1000 * seconds)) {
        logger.info("projects already synced, skipping");
        return;
      }

      const mosaicUrl = import.meta.env.DEV ? "http://localhost:3000" : "https://mosaic.luxass.dev";
      logger.info(`using mosaic url: ${mosaicUrl}`);
      const mdxEntryType = settings.contentEntryTypes.find((entryType) => entryType.extensions.includes(".mdx"));

      if (!mdxEntryType) {
        logger.error("no mdx entry type found");
        return;
      }

      // create remote content dir
      const remoteContentDir = new URL(`remote-content/${collection}`, settings.dotAstroDir);
      await mkdir(fileURLToPath(remoteContentDir), { recursive: true });
      const repositories = await fetch(`${mosaicUrl}/api/v1/mosaic/projects`).then((res) => res.json()) as {
        github_id: string;
        name_with_owner: string;
        name: string;
        url: string;
        description: string;
        config: string;
      }[];

      store.clear();

      await Promise.all(repositories.map(async (repository) => {
        const projects = await fetch(`${mosaicUrl}/api/v1/mosaic/${repository.name_with_owner}`).then((res) => res.json());

        if (!Array.isArray(projects)) {
          return;
        }

        await Promise.all(projects.map(async (project) => {
          const fileId = project.project?.handle || project.name;

          if (!("readme" in project)) {
            return;
          }

          const { content: content2 } = await fetch(project.readme, {
            headers: {
              "x-transform": "true",
              "x-transform-name": project.name,
            },
          }).then((res) => res.json());

          const frontmatter = `---
          handle: ${project.project?.handle || project.name}
          name: ${project.name}
          owner: ${repository.name_with_owner.split("/")[0]}
          ${project.description ? `description: ${project.description}` : ""}
          githubUrl: ${repository.url}
          ${project.npm ? `npm: "${project.npm.name}"` : ""}
          ---`
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .join("\n");

          const fileUrl = new URL(`${collection}/${project.name}.mdx`, remoteContentDir);

          await writeFile(fileURLToPath(fileUrl), `${frontmatter}\n\n${content2}`);

          const { body, data } = await mdxEntryType.getEntryInfo({
            contents: `${frontmatter}\n\n${content2}`,
            fileUrl,
          });

          const parsedData = await parseData({
            id: fileId,
            data,
            filePath: fileURLToPath(fileUrl),
          });

          const relativePath = relative(fileURLToPath(settings.config.root), fileURLToPath(fileUrl));

          store.set({
            id: fileId,
            data: parsedData,
            body,
            filePath: relativePath,
            digest: generateDigest(parsedData),
            deferredRender: true,
          });
        }));
      }));

      meta.set("lastSynced", String(Date.now()));
    },
  };
}
