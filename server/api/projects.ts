export default defineEventHandler(async (event) => {
  const profile = await GqlGetProfile({
    name: "luxass",
  });

  if (!profile) {
    return null;
  }

  const repositoryNodes = profile.user?.repositories.nodes
    ?.filter((node) => {
      const obj = node?.object;

      if (!obj) {
        return false;
      }

      if ("entries" in obj) {
        return obj.entries?.find((entry) => entry?.name === ".luxass");
      }
    })
    .sort(
      (a, b) =>
        new Date(b?.pushedAt).getTime() - new Date(a?.pushedAt).getTime()
    );

  if (!repositoryNodes) {
    return null;
  }

  return repositoryNodes.map((node) => ({
    name: node?.name,
    description: node?.description,
    url: node?.url,
    pushedAt: node?.pushedAt,
    language: node?.languages?.nodes?.at(0),
  }));
});
