/// <reference types="mdast-util-directive" />

import { type Properties, h as _h, s as _s } from "hastscript";
import type { Paragraph as P, Root } from "mdast";
import type { Plugin, Transformer } from "unified";
import { visit } from "unist-util-visit";

/** Hacky function that generates an mdast HTML tree ready for conversion to HTML by rehype. */
function h(el: string, attrs: Properties = {}, children: any[] = []): P {
  const { tagName, properties } = _h(el, attrs);
  return {
    type: "paragraph",
    data: { hName: tagName, hProperties: properties },
    children,
  };
}

/** Hacky function that generates an mdast SVG tree ready for conversion to HTML by rehype. */
function s(el: string, attrs: Properties = {}, children: any[] = []): P {
  const { tagName, properties } = _s(el, attrs);
  return {
    type: "paragraph",
    data: { hName: tagName, hProperties: properties },
    children,
  };
}

export function remarkSidebar(): Plugin<any[], Root> {
  const transformer: Transformer<Root> = (tree, file) => {
    visit(tree, (node, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.type === "leafDirective") {
        if (node.name !== "sidebar") return;
        console.log(file.data.astro);

        parent.children[index] = h("nav", {
          class: "flex flex-col items-center justify-center",
        }, [
          h("div", {
            class: "aspect-w-16 aspect-h-9",
          }, [
            h("iframe", {
              src: "https://www.youtube.com/embed/3qQsS1lYXoY",
              frameborder: "0",
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
              allowfullscreen: true,
            }),
          ]),
        ]);
      }
    });
  };

  return function attacher() {
    return transformer;
  };
}
