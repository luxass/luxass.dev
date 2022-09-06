import { visit } from "unist-util-visit";


const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

const meta = () => {
  return (tree: any) => {
    visit(tree, "element", visitor);
  };

  function visitor(node: any, index: any, parentNode: any) {
    let match: any[] | null;

    if (node.tagName === "code" && node.data && node.data.meta) {
      re.lastIndex = 0; // Reset regex.

      while ((match = re.exec(node.data.meta))) {
        node.properties[match[1]] = match[2] || match[3] || match[4] || "";
        parentNode.properties[match[1]] =
          match[2] || match[3] || match[4] || "";
      }
    }
  }
};

export { meta };
