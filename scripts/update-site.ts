import process from "node:process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { remark } from "remark";
import { SKIP, visit } from "unist-util-visit";
import type { ImageReference, Node, Root, Text } from "mdast";
import type { Plugin, Transformer } from "unified";
import { remove } from "unist-util-remove";
import { type GetDefinition, definitions } from "mdast-util-definitions";
import type { Project } from "../src/lib/types";

const ICONS = new Map<string, string>();

function rewrite(options: { repoUrl: string }): Plugin<any[], Root> {
  const transformer: Transformer<Root> = (tree) => {
    visit(tree, "link", (node) => {
      if (!node?.url) {
        throw new Error("No URL found");
      }
      if (node.url.startsWith("http")) {
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

function extractIcon(project: string): Plugin<any[], Root> {
  const transformer: Transformer<Root> = (tree) => {
    visit(tree, "heading", (node) => {
      if (node.depth === 1) {
        const text = node.children[0] as Text;
        const matched = text.value.match(/\p{Emoji}/u);
        if (!matched) return;

        const emoji = matched[0];
        console.log(`Found emoji for ${project}: ${emoji}`);
        ICONS.set(project, emoji);
      }
    });
    remove(tree, (it) => it.type === "heading" && "depth" in it && it.depth === 1);
  };

  return function attacher() {
    return transformer;
  };
}

const BADGE_SRC = ["https://img.shields.io", "https://flat.badgen.net/"];

function isBadge(url: string): boolean {
  for (const src of BADGE_SRC) {
    if (url.startsWith(src)) {
      return true;
    };
  }

  return false;
}

function badgeImage(node: Node, define: GetDefinition) {
  if (node.type === "imageReference") {
    const def = define((node as ImageReference).identifier);
    return def ? isBadge(def.url) : false;
  }

  if (!("url" in node) || typeof node.url !== "string") return false; ;

  return node.type === "image" ? isBadge(node.url) : false;
}

function remarkStripBadges(): Plugin<any[], Root> {
  const transformer: Transformer<Root> = (tree) => {
    const define = definitions(tree);

    // Remove badge images, and links that include a badge image.
    visit(tree, (node, index, parent) => {
      let remove = false;

      if (node.type === "link" || node.type === "linkReference") {
        const children = node.children;
        let offset = -1;

        while (++offset < children.length) {
          const child = children[offset];

          if (badgeImage(child, define)) {
            remove = true;
            break;
          }
        }
      } else if (badgeImage(node, define)) {
        remove = true;
      }

      if (remove === true && parent && typeof index === "number") {
        parent.children.splice(index, 1);

        if (index === parent.children.length) {
          let tail = parent.children[index - 1];

          // If the remaining tail is a text.
          while (tail && tail.type === "text") {
            index--;

            // Remove trailing tabs and spaces.
            tail.value = tail.value.replace(/[ \t]+$/, "");

            // Remove the whole if it was whitespace only.
            if (!tail.value) {
              parent.children.splice(index, 1);
            }

            tail = parent.children[index - 1];
          }
        }

        return [SKIP, index];
      }
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
    "https://projectrc.luxass.dev/api/projects.json",
  ).then((res) => res.json() as Promise<{ projects: Project[] }>);

  for (const project of projects.filter((project) => project.readme)) {
    const fileName = project.name.replace(/^\./, "").replace(/\./g, "-");
    if (!project.readme) {
      console.log(`No README found for ${project.name}`);
      continue;
    }

    const readmeContent: unknown = await fetch(project.readme).then((res) => res.json());

    if (!readmeContent || typeof readmeContent !== "object" || !("content" in readmeContent) || typeof readmeContent.content !== "string") {
      console.log(`No README found for ${project.name}`);
      continue;
    }

    const file = await remark()
      .use(rewrite({
        repoUrl: project.url,
      }))
      .use(extractIcon(project.name))
      .use(remarkStripBadges())
      .process(readmeContent.content || "No README was found.");

    const frontmatter = `---
                handle: ${project.name}
                name: ${project.name}
                owner: ${project.nameWithOwner.split("/")[0]}
                ${project.description ? `description: ${project.description}` : ""}
                githubUrl: ${project.url}
                ${project.npm ? `npm: "${project.npm.name}"` : ""}
                ${ICONS.has(project.name) ? `icon: ${ICONS.get(project.name)}` : ""}
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
  execSync(`npx eslint --fix ./src/content/projects/*.md`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
