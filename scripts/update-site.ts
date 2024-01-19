import process from "node:process"
import { mkdir, rm, writeFile } from "node:fs/promises"
import { execSync } from "node:child_process"
import { remark } from "remark"
import { visit } from "unist-util-visit"
import type { Root, Text } from "mdast"
import type { Plugin, Transformer } from "unified"
import { remove } from "unist-util-remove"
import type { Project } from "../src/lib/types"

const ICONS = new Map<string, string>()

function extractIcon(project: string): Plugin<any[], Root> {
  const transformer: Transformer<Root> = (tree) => {
    visit(tree, "heading", (node) => {
      if (node.depth === 1) {
        const text = node.children[0] as Text
        const matched = text.value.match(/\p{Emoji}/u)
        if (!matched) return

        const emoji = matched[0]
        console.log(`Found emoji for ${project}: ${emoji}`)
        ICONS.set(project, emoji)
      }
    })
    remove(tree, (it) => it.type === "heading" && "depth" in it && it.depth === 1)
  }

  return function attacher() {
    return transformer
  }
}

async function run() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("No GITHUB_TOKEN found")
  }

  await rm("./src/content/projects", {
    force: true,
    recursive: true,
  })
  await mkdir("./src/content/projects")

  // fetch all projects from https://projectrc.luxass.dev
  const { projects } = await fetch(
    "https://projectrc.luxass.dev/api/projects.json",
  ).then((res) => res.json() as Promise<{ projects: Project[] }>)

  for (const project of projects.filter((project) => project.readme)) {
    const fileName = project.name.replace(/^\./, "").replace(/\./g, "-")
    if (!project.readme) {
      console.log(`No README found for ${project.name}`)
      continue
    }

    const readmeContent: unknown = await fetch(project.readme, {
      headers: {
        "X-MDX": "true",
      },
    }).then((res) => res.json())

    if (!readmeContent || typeof readmeContent !== "object" || !("content" in readmeContent) || typeof readmeContent.content !== "string") {
      console.log(`No README found for ${project.name}`)
      continue
    }
    const aa = readmeContent.content
    if (project.name === "elysius") {
      // aa = aa.replace("```sh\n", "```sh\r\n")
    }

    const file = await remark()
      .use(extractIcon(project.name))
      .process(aa || "No README was found.")

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
      .join("\n")

    await writeFile(
      `./src/content/projects/${fileName}.mdx`,
      `${frontmatter}\n\n${file.toString()}`,
    )
  }
  execSync(`npx eslint --fix ./src/content/projects/*.mdx`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
