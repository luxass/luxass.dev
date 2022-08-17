import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxToHtml } from "@lib/mdx";
import { GetStaticPropsContext } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { PROJECTS_PATH } from "@lib/constants";
import { ProjectLayout } from "@layouts/project";
import { COMPONENTS } from "@components/MDX";

export default function ProjectPage({
  content
}: {
  content: MDXRemoteSerializeResult;
}) {
  return (
    <ProjectLayout>
      <MDXRemote
        {...content}
        components={COMPONENTS}
      />
    </ProjectLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = fs.readdirSync(PROJECTS_PATH)
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

  const projectsMdxLocation = path.join(PROJECTS_PATH, `${params.name}.mdx`);
  const content = fs.readFileSync(projectsMdxLocation, "utf-8");

  const html = await mdxToHtml(content);

  return {
    props: {
      content: html
    }
  };
}
