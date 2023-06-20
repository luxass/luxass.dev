export async function get() {
  const data = await fetch("https://api.github.com/repos/microsoft/vscode/releases?per_page=1", {
    headers: {
      "Authorization": `bearer ${import.meta.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json"
    }
  }).then((res) => res.json());

  if (!data) {
    throw new Error("No data found");
  }



  const release = data[0];

  if (!("tag_name" in release)) {
    throw new Error("No tag_name found");
  }

  return {
    body: release.tag_name
  };
}
