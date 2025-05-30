/// <reference types="mdast-util-directive" />

import type { Properties } from "hastscript";
import type { Paragraph, Root } from "mdast";
import type { Plugin } from "unified";
import { h as _h, s as _s } from "hastscript";
import { remove } from "unist-util-remove";
import { visit } from "unist-util-visit";

type Variant = "note" | "important" | "warning" | "tip" | "caution";

const variants = new Set(["note", "tip", "important", "warning", "caution"]);

/** Hacky function that generates an mdast HTML tree ready for conversion to HTML by rehype. */
function h(el: string, attrs: Properties = {}, children: any[] = []): Paragraph {
  const { tagName, properties } = _h(el, attrs);
  return {
    type: "paragraph",
    data: { hName: tagName, hProperties: properties },
    children,
  };
}

/** Hacky function that generates an mdast SVG tree ready for conversion to HTML by rehype. */
function s(el: string, attrs: Properties = {}, children: any[] = []): Paragraph {
  const { tagName, properties } = _s(el, attrs);
  return {
    type: "paragraph",
    data: { hName: tagName, hProperties: properties },
    children,
  };
}
const ICONS: Record<Variant, Paragraph> = {
  note: s(
    "svg",
    {
      "class": "icon",
      "viewBox": "0 0 16 16",
      "version": "1.1",
      "width": "16",
      "height": "16",
      "aria-hidden": "true",
    },
    [
      s("path", {
        d: "M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
      }),
    ],
  ),
  tip: s(
    "svg",
    {
      "class": "icon",
      "viewBox": "0 0 16 16",
      "version": "1.1",
      "width": "16",
      "height": "16",
      "aria-hidden": "true",
    },
    [
      s("path", {
        d: "M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z",
      }),
    ],
  ),
  important: s(
    "svg",
    {
      "class": "icon",
      "viewBox": "0 0 16 16",
      "version": "1.1",
      "width": "16",
      "height": "16",
      "aria-hidden": "true",
    },
    [
      s("path", {
        d: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
      }),
    ],
  ),
  warning: s(
    "svg",
    {
      "class": "icon",
      "viewBox": "0 0 16 16",
      "version": "1.1",
      "width": "16",
      "height": "16",
      "aria-hidden": "true",
    },
    [
      s("path", {
        d: "M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
      }),
    ],
  ),
  caution: s(
    "svg",
    {
      "class": "icon",
      "viewBox": "0 0 16 16",
      "version": "1.1",
      "width": "16",
      "height": "16",
      "aria-hidden": "true",
    },
    [
      s("path", {
        d: "M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
      }),
    ],
  ),
};

export const remarkAsides: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (!parent || index === undefined || (node.type !== "containerDirective" && node.type !== "paragraph")) {
        return;
      }

      if (node.type === "paragraph" && parent.type !== "blockquote") {
        return;
      }

      let variant = "note";
      if (node.type === "paragraph") {
        const firstChild = node.children[0];
        if (!firstChild || firstChild.type !== "text") {
          return;
        }

        const type = firstChild.value.match(/^\[!(NOTE|TIP|WARNING|DANGER|IMPORTANT)\]/);
        if (!type) {
          return;
        }

        variant = type[1].toLowerCase();
        firstChild.value = firstChild.value.replace(/^\[!(NOTE|TIP|WARNING|DANGER|IMPORTANT)\]/, "").trim();
      } else {
        variant = node.name.toLowerCase();
      }

      if (!isAsideVariant(variant)) return;

      // remark-directive converts a container’s “label” to a paragraph in
      // its children, but we want to pass it as the title prop to <Aside>, so
      // we iterate over the children, find a directive label, store it for the
      // title prop, and remove the paragraph from children.
      let title = variant.toUpperCase();

      remove(node, (child): boolean | void => {
        if (child.data && "directiveLabel" in child.data && child.data.directiveLabel) {
          if (
            "children" in child
            && Array.isArray(child.children)
            && "value" in child.children[0]
          ) {
            title = child.children[0].value;
          }
          return true;
        }
      });

      if ((node.children[0].type === "text" && node.children[0].value === "") && node.children[1].type === "break") {
        node.children.shift();
        node.children.shift();
      }

      // check if a child of node.children is a paragraph without a space at the end.

      visit(node, (child, idx, childrenParent) => {
        if (!childrenParent || idx === undefined || child.type !== "text") return;
        if (!child.value.endsWith(" ") && childrenParent.children[idx + 1]) {
          const nextChild = childrenParent.children[idx + 1];

          if (nextChild.type === "inlineCode") {
            // eslint-disable-next-line no-console
            console.log("injecting a space before the next child");
            child.value = `${child.value} `;
            return;
          }

          if (!("children" in nextChild) || nextChild.children.length === 0) {
            return;
          }

          if (nextChild.children[0].type !== "text") {
            return;
          }

          if (nextChild.children[0].value.startsWith(" ")) {
            return;
          }

          // eslint-disable-next-line no-console
          console.log("injecting a space before the next child");
          child.value = `${child.value} `;
        }
      });

      const aside = h(
        "aside",
        {
          "aria-label": title,
          "class": `callout callout-${variant}`,
        },
        [
          h("p", { "class": "callout-title", "aria-hidden": "true" }, [
            ICONS[variant],
            { type: "text", value: title },
          ]),
          h("section", { class: "callout-content" }, node.children),
        ],
      );

      if (parent.type !== "blockquote") {
        parent.children[index] = aside;
        return;
      }

      const parentIndex = tree.children.findIndex((it) => it === parent);
      tree.children[parentIndex] = aside;
    });
  };
};
function isAsideVariant(variant: string): variant is Variant {
  return variants.has(variant);
}
