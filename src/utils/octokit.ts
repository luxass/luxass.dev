import {
  Octokit
} from "@octokit/core";

import {
  paginateRest
} from "@octokit/plugin-paginate-rest";

const $Octokit = Octokit.plugin(paginateRest);
export const octokit = new $Octokit({
  auth: process.env.GITHUB_TOKEN
});
