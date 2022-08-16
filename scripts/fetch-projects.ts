import { config as dotEnvConfig } from "https://deno.land/x/dotenv@v1.0.1/mod.ts";

dotEnvConfig({ export: true });

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `bearer ${Deno.env.get("GITHUB_TOKEN")}`
  },
  body: JSON.stringify({
    query: `query {
        user(login: "luxass") {
          repositories(
            first: 20
            orderBy: { direction: DESC, field: STARGAZERS }
            privacy: PUBLIC
          ) {
            totalCount
            nodes {
              id
              nameWithOwner
              description
              pushedAt
              stargazerCount
              forkCount
              url
              languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
                totalCount
                nodes {
                  color
                  name
                  id
                }
              }
            }
          }
        }
      }`
  })
});

const { data } = await res.json();
console.log(data);
