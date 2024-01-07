/// <reference types="mdast-util-directive" />

import { type Properties, h as _h, s as _s } from "hastscript";
import type { LinkReference, Paragraph as P, Root } from "mdast";
import type { Plugin, Transformer } from "unified";
import { remove } from "unist-util-remove";
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

/**
 * remark plugin that converts blocks delimited with `:::` into styled
 * asides (a.k.a. “callouts”, “admonitions”, etc.). Depends on the
 * `remark-directive` module for the core parsing logic.
 *
 * For example, this Markdown
 *
 * ```md
 * :::tip[Did you know?]
 * Astro helps you build faster websites with “Islands Architecture”.
 * :::
 * ```
 *
 * will produce this output
 *
 * ```astro
 * <aside class="starlight-aside starlight-aside--tip" aria-label="Did you know?">
 *   <p class="starlight-aside__title" aria-hidden="true">Did you know?</p>
 *   <section class="starlight-aside__content">
 *     <p>Astro helps you build faster websites with “Islands Architecture”.</p>
 *   </section>
 * </Aside>
 * ```
 */
export function remarkBadges(): Plugin<[], Root> {
  const transformer: Transformer<Root> = (tree) => {
    visit(tree, ["paragraph", "linkReference", "definition"], (node, index, parent) => {
      if (!parent) {
        return; ;
      }
      // for (const child of node.children) {
      // if (child.type !== "linkReference") {
      //   continue;
      // }

      remove(node, (node) => {
        if (node.type === "linkReference") {
          const linkRefNode = node as LinkReference;
          const label = linkRefNode.label;
          // get definition node from parent
          const defNode = parent.children.find((node) => {
            if (node.type !== "definition") {
              return false;
            }
            return (node as any).identifier === label;
          }) as any;
          console.log(defNode);
        }
        return false;
      });
    });
  };

  return function attacher() {
    return transformer;
  };
}
