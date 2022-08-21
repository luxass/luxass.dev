import { MDXRemote } from "next-mdx-remote";
import { mdxToHtml } from "@lib/mdx";
import { GetStaticPropsContext } from "next";
import fs from "fs";
import path from "path";
import { SNIPPETS_PATH } from "@lib/constants";
import { COMPONENTS } from "@components/MDX";
import { SnippetLayout } from "@layouts/snippets";
import { Snippet } from "@lib/types";


export default function SnippetPage({ snippet }: { snippet: Snippet }) {
  return (
    <SnippetLayout snippet={snippet}>
      <MDXRemote {...snippet.content} components={COMPONENTS} />
    </SnippetLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = fs
    .readdirSync(SNIPPETS_PATH)
    .filter((path) => /\.mdx$/.test(path))
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((name) => ({ params: { name } }));

  return {
    paths,
    fallback: false
  };
};

export async function getStaticProps({
  params
}: GetStaticPropsContext<{ name: string }>) {
  if (!params?.name) {
    // This shouldn't happen, but just in case
    return {
      notFound: true
    };
  }

  const snippetsMdxLocation = path.join(SNIPPETS_PATH, `${params.name}.mdx`);
  const content = fs.readFileSync(snippetsMdxLocation, "utf-8");

  const mdx = await mdxToHtml(content);
  
  const snippet: Snippet = {
    content: mdx,
    title: mdx.frontmatter?.title || "Unknown Snippet",
    description: mdx.frontmatter?.description || "Unknown Description"
  };
  return {
    props: {
      snippet
    }
  };
}
