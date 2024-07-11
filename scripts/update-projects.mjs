// @ts-check
import process from "node:process";

/**
 * @typedef {object} Project
 * @property {string} name
 * @property {string} nameWithOwner
 * @property {string} url
 * @property {string} [description]
 * @property {string} [readme]
 * @property {object} [npm]
 * @property {string} npm.name
 */

/**
 * @typedef {object} GitTree
 * @property {string} path
 * @property {string} [sha]
 * @property {'100644' | '100755' | '040000' | '160000' | '120000'} mode
 * @property {'blob' | 'tree' | 'commit'} type
 * @property {string} [content]
 */

/** @param {import('github-script').AsyncFunctionArguments} ctx */
export async function run(ctx) {
  const { github, core } = ctx;

  try {
    /** @type {Map<string, string>} */
    const ICONS = new Map();

    const branchName = "update-projects";

    const { data: commits } = await github.rest.repos.listCommits({
      owner: "luxass",
      repo: "luxass.dev",
      per_page: 1,
      sha: "main",
    });

    const latestCommitSHA = commits[0].sha;

    let updateBranchExists = false;
    try {
      await github.rest.git.getRef({
        owner: "luxass",
        repo: "luxass.dev",
        ref: `heads/${branchName}`,
      });
      updateBranchExists = true;
    } catch (/** @type {any} */error) {
      if (error.status !== 404) throw error;
    }

    if (updateBranchExists) {
      await github.rest.git.updateRef({
        owner: "luxass",
        repo: "luxass.dev",
        ref: `heads/${branchName}`,
        sha: latestCommitSHA,
        force: true,
      });
      console.log(`Updated ${branchName} to match main`);
    }

    const contentPath = "src/content/projects";

    const { data: { tree: projectsTree } } = await github.rest.git.getTree({
      owner: "luxass",
      repo: "luxass.dev",
      tree_sha: `main:${contentPath}`,
      recursive: "1",
    });

    /** @type {Map<string, GitTree>} */
    const existingFiles = new Map();
    for (const project of projectsTree) {
      if (project.type === "blob" && !project.path?.endsWith(".gitkeep") && project.path) {
        existingFiles.set(project.path, {
          path: `${contentPath}/${project.path}`,
          sha: project.sha,
          mode: /** @type {GitTree['mode']} */ (project.mode),
          type: /** @type {GitTree['type']} */ (project.type),
        });
      }
    }

    const { projects } = await fetch(
      "https://mosaic.luxass.dev/api/v1/projects.json",
    ).then((res) => /** @type {Promise<{ projects: Project[] }>} */(res.json()));

    if (!projects) {
      console.error("no projects found");
      core.setFailed("no projects found");
    }

    /** @type {GitTree[]} */
    const updatedTree = [];

    for (const project of projects.filter((project) => project.readme)) {
      const fileName = project.name.replace(/^\./, "").replace(/\./g, "-");
      if (!project.readme) {
        console.warn(`no README found for ${project.name}`);
        continue;
      }

      const readmeContent = await fetch(project.readme, {
        headers: {
          "X-MDX": "true",
        },
      }).then((res) => res.json());

      if (!readmeContent || typeof readmeContent !== "object" || !("content" in readmeContent) || typeof readmeContent.content !== "string") {
        console.error(`No README found for ${project.name}`);
        continue;
      }

      // const file = await remark()
      //   .use(ICON, {
      //     name: project.name,
      //     icons: ICONS,
      //   })
      //   .process(readmeContent.content || "No README was found.");

      if (project.description) {
        const emoji = project.description.match(/\p{Emoji}/u);
        if (emoji) {
          if (!ICONS.has(project.name)) {
            ICONS.set(project.name, emoji[0]);
          }
          project.description = project.description.replace(emoji[0], "").trim();
        }
      }

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

      // const newContent = `${frontmatter}\n\n${file.toString()}`;
      const newContent = `${frontmatter}\n\n${readmeContent.content}`;
      const filePath = `${contentPath}/${fileName}.mdx`;

      const existingFile = existingFiles.get(`${fileName}.mdx`);
      if (existingFile) {
        const { data: { content: existingContent } } = await github.rest.git.getBlob({
          owner: "luxass",
          repo: "luxass.dev",
          file_sha: existingFile.sha,
        });

        const decodedExistingContent = decodeURIComponent(escape(atob(existingContent)));

        if (decodedExistingContent !== newContent) {
          updatedTree.push({
            path: filePath,
            mode: "100644",
            type: "blob",
            content: newContent,
          });
          console.info(`updated ${fileName}`);
        } else {
          console.info(`no changes detected for ${fileName}`);
        }

        existingFiles.delete(`${fileName}.mdx`);
      } else {
        updatedTree.push({
          path: filePath,
          mode: "100644",
          type: "blob",
          content: newContent,
        });
        console.info(`added ${fileName}`);
      }
    }

    for (const [fileName, file] of existingFiles) {
      updatedTree.push({
        path: file.path,
        mode: file.mode,
        type: file.type,
        sha: null,
      });
      console.info(`deleted ${fileName}`);
    }

    const projectsTreePaths = projectsTree.map((file) => file.path);

    const changes = updatedTree.filter((file) => {
      if (file.sha == null && projectsTreePaths.includes(file.path?.replace(`${contentPath}/`, ""))) {
        return true;
      }

      if (file.content && !projectsTreePaths.includes(file.path?.replace(`${contentPath}/`, ""))) {
        return true;
      }

      if (file.content && projectsTreePaths.includes(file.path?.replace(`${contentPath}/`, ""))) {
        return true;
      }

      return false;
    });

    if (changes.length === 0) {
      console.info("no changes detected");
      return;
    }

    const newTree = await github.rest.git.createTree({
      owner: "luxass",
      repo: "luxass.dev",
      base_tree: latestCommitSHA,
      tree: updatedTree,
    });

    const newCommit = await github.rest.git.createCommit({
      owner: "luxass",
      repo: "luxass.dev",
      message: "chore: update list of projects",
      tree: newTree.data.sha,
      parents: [latestCommitSHA],
    });

    if (updateBranchExists) {
      await github.rest.git.updateRef({
        owner: "luxass",
        repo: "luxass.dev",
        ref: `heads/${branchName}`,
        sha: newCommit.data.sha,
      });
      console.log(`Updated ${branchName} with new changes`);
    } else {
      await github.rest.git.createRef({
        owner: "luxass",
        repo: "luxass.dev",
        ref: `refs/heads/${branchName}`,
        sha: newCommit.data.sha,
      });
      console.log(`Created branch ${branchName}`);
    }

    core.setOutput("branchName", branchName);
    core.setOutput("created", !updateBranchExists);
  } catch (/** @type {any} */ err) {
    core.setFailed(err.message);
  }
}
