import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";

export async function mdxToHtml(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"]
            }
          }
        ]
      ],
      format: "mdx"
    },
    parseFrontmatter: true
  });

  return mdxSource;
}
