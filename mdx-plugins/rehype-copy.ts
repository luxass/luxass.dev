import type { Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const rehypeCopy: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "pre") {
        return;
      }

      node.properties.copy = true;
    });
  };
};
