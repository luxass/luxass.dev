import process from "node:process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin, Transformer } from "unified";
import remarkMdx from "remark-mdx";
import type { Project } from "../src/lib/types";

function isExternalLink(url: string) {
  // there is probably a better way to do this
  return url.startsWith("http");
}

function rewrite(options: { repoUrl: string }): Plugin<any[], Root> {
  const transformer: Transformer<Root> = (tree) => {
    visit(tree, "link", (node) => {
      if (!node?.url) {
        throw new Error("No URL found");
      }
      if (isExternalLink(node.url)) {
        return;
      }
      const newUrl = new URL(node.url, `${options.repoUrl}/blob/main/`);
      node.url = newUrl.toString();
    });
  };

  return function attacher() {
    return transformer;
  };
}

async function run() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("No GITHUB_TOKEN found");
  }

  await rm("./src/content/projects", {
    force: true,
    recursive: true,
  });
  await mkdir("./src/content/projects");

  // fetch all projects from https://projectrc.luxass.dev
  const { projects } = await fetch(
    "https://projectrc.luxass.dev/projects",
  ).then((res) => res.json() as Promise<{ projects: Project[] }>);

  for (const project of projects.filter((project) => project.$projectrc?.readme)) {
    const fileName = project.name.replace(/^\./, "").replace(/\./g, "-");
    if (!project.$values?.readme) {
      console.log(`No README found for ${project.name}`);
      continue;
    }

    const file = await remark()
      .use(rewrite({
        repoUrl: project.url,
      }))
      .use(() => {
        return (tree) => {
          if (fileName.includes("elysius")) {
            visit(tree, "list", (node) => {
              console.log(JSON.stringify(node, null, 2));
            });
          }
        };
      })
      .process(project.$values.readme.content || "No README was found.");

    const frontmatter = `---
                handle: ${project.name}
                name: ${project.name}
                owner: ${project.nameWithOwner.split("/")[0]}
                description: ${project.description}
                githubUrl: ${project.url}
                ---`
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join("\n");

    await writeFile(
      `./src/content/projects/${fileName}.md`,
      `${frontmatter}\n\n${file.toString()}`,
    );
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
