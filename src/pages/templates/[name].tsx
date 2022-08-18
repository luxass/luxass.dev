import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxToHtml } from "@lib/mdx";
import { GetStaticPropsContext } from "next";
import fs from "fs";
import path from "path";
import { TEMPLATES_PATH } from "@lib/constants";
import { TemplateLayout } from "@layouts/template";
import { COMPONENTS } from "@components/MDX";

export default function ProjectPage({
  content
}: {
  content: MDXRemoteSerializeResult;
}) {
  return (
    <TemplateLayout>
      <MDXRemote
        {...content}
        components={COMPONENTS}
      />
    </TemplateLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = fs.readdirSync(TEMPLATES_PATH)
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

  const templatesMdxLocation = path.join(TEMPLATES_PATH, `${params.name}.mdx`);
  const content = fs.readFileSync(templatesMdxLocation, "utf-8");

  const html = await mdxToHtml(content);

  return {
    props: {
      content: html
    }
  };
}
