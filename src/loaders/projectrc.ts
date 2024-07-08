import { type Loader, z } from "astro:content";

export function projectrc(): Loader {
  return {
    name: "projectrc-loader",
    load: async ({
      store,
      meta,
      logger,
    }) => {
      logger.info("loading projects from projectrc");

      const lastSynced = meta.get("lastSynced");

      if (lastSynced && (Date.now() - Number(lastSynced) < 1000 * 60)) {
        logger.info("projects already synced, skipping");
        return;
      }

      const { projects } = await fetch("https://projectrc.luxass.dev/api/projects.json").then((res) => res.json());

      store.clear();

      for (const project of projects) {
        store.set(project.name, project);
      }

      meta.set("lastSynced", String(Date.now()));
    },
  };
}
