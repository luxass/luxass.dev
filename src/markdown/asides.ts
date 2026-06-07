import { icons } from "@iconify-json/ph";

type MdastPosition = {
  start: {
    offset?: number;
  };
  end: {
    offset?: number;
  };
};

type MdastNode = {
  position?: MdastPosition;
  children?: readonly unknown[];
  data?: unknown;
  value?: unknown;
};

type DirectiveNode = MdastNode & {
  name: string;
  children: readonly MdastNode[];
};

type VisitorContext = {
  source: string;
  textContent(node: Readonly<MdastNode>): string;
};

type AsideVariant = "note" | "tip" | "important" | "warning" | "caution";

const asideVariants = new Set<AsideVariant>(["note", "tip", "important", "warning", "caution"]);

const githubAsidePattern = /^\[!(NOTE|TIP|WARNING|DANGER|IMPORTANT|CAUTION)\]\s*/i;

const variantLabels: Record<AsideVariant, string> = {
  note: "Note",
  tip: "Tip",
  important: "Important",
  warning: "Warning",
  caution: "Caution",
};

const variantIconNames: Record<AsideVariant, string> = {
  note: "info",
  tip: "lightbulb",
  important: "chat-circle",
  warning: "warning",
  caution: "octagon",
};

const variantIcons: Record<AsideVariant, string> = {
  note: renderIcon(variantIconNames.note),
  tip: renderIcon(variantIconNames.tip),
  important: renderIcon(variantIconNames.important),
  warning: renderIcon(variantIconNames.warning),
  caution: renderIcon(variantIconNames.caution),
};

export const satteriAsides = {
  name: "asides",

  containerDirective(node: Readonly<DirectiveNode>, ctx: VisitorContext) {
    const variant = normalizeVariant(node.name);
    if (variant == null) {
      return;
    }

    const body = getSourceSlice(ctx.source, node).split("\n").slice(1, -1).join("\n").trim();
    const title = getDirectiveTitle(node, ctx) ?? variantLabels[variant];

    return {
      raw: renderAside({ variant, title, body }),
    };
  },

  blockquote(node: Readonly<MdastNode>, ctx: VisitorContext) {
    const source = stripBlockquoteMarkers(getSourceSlice(ctx.source, node)).trim();
    const match = source.match(githubAsidePattern);
    if (match == null) {
      return;
    }

    const variant = normalizeVariant(match[1]);
    if (variant == null) {
      return;
    }

    return {
      raw: renderAside({
        variant,
        title: variantLabels[variant],
        body: source.slice(match[0].length).trim(),
      }),
    };
  },
};

function normalizeVariant(value: string): AsideVariant | undefined {
  const variant = value.toLowerCase() === "danger" ? "caution" : value.toLowerCase();
  return asideVariants.has(variant as AsideVariant) ? (variant as AsideVariant) : undefined;
}

function getDirectiveTitle(node: Readonly<DirectiveNode>, ctx: VisitorContext): string | undefined {
  const label = node.children.find(hasDirectiveLabelNode);
  if (label == null) {
    return;
  }

  const title = ctx.textContent(label).trim();
  return title.length > 0 ? title : undefined;
}

function hasDirectiveLabelNode(node: unknown): node is MdastNode {
  return typeof node === "object" && node !== null && "data" in node && hasDirectiveLabel(node.data);
}

function hasDirectiveLabel(data: unknown): data is { directiveLabel: true } {
  return typeof data === "object" && data !== null && "directiveLabel" in data && data.directiveLabel === true;
}

function getSourceSlice(source: string, node: Readonly<MdastNode>): string {
  const start = node.position?.start.offset;
  const end = node.position?.end.offset;
  if (start == null || end == null) {
    return "";
  }

  return source.slice(start, end);
}

function stripBlockquoteMarkers(source: string): string {
  return source
    .split("\n")
    .map((line) => line.replace(/^ *> ?/, ""))
    .join("\n");
}

function renderAside({
  variant,
  title,
  body,
}: {
  variant: AsideVariant;
  title: string;
  body: string;
}): string {
  return `<aside class="callout callout-${variant}" aria-label="${escapeHtml(title)}">
<p class="callout-title" aria-hidden="true">${variantIcons[variant]}<span>${escapeHtml(title)}</span></p>

${body}

</aside>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderIcon(name: string): string {
  const icon = icons.icons[name];
  if (icon == null) {
    throw new Error(`Unknown Phosphor icon: ${name}`);
  }

  const width = icon.width ?? icons.width ?? 256;
  const height = icon.height ?? icons.height ?? 256;

  return `<svg class="callout-icon" width="16" height="16" viewBox="0 0 ${width} ${height}" aria-hidden="true" style="display:inline-block;vertical-align:-0.125em;flex-shrink:0;color:currentColor">${icon.body}</svg>`;
}
