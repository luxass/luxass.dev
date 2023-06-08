import type { Element, Root } from "hast";
import { toString } from "hast-util-to-string";
import type { MdxjsEsm } from "mdast-util-mdx";
import type { Plugin } from "unified";
import { EXIT, visit } from "unist-util-visit";

export const remarkBetterCodeblocks: Plugin<[], Root> = () => {
  return (ast) => {
    visit(ast, { type: "element", tagName: "h1" }, (node: Element) => {
      const value = toString(node);

      ast.children.unshift({
        type: "mdxjsEsm",
        value: "",
        data: {
          estree: {
            type: "Program",
            sourceType: "module",
            body: [
              {
                type: "ExportNamedDeclaration",
                source: null,
                specifiers: [],
                declaration: {
                  type: "VariableDeclaration",
                  kind: "const",
                  declarations: [
                    {
                      type: "VariableDeclarator",
                      id: { type: "Identifier", name },
                      init: {
                        type: "Literal",
                        value,
                        raw: JSON.stringify(value)
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      } as MdxjsEsm);
      return EXIT;
    });
  };
};
