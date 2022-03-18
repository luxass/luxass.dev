import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { InferGetStaticPropsType } from "next";
import axios from "axios";
import remarkHtml from "remark-html";

export default function Test({
  markdown,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  /*   const content = unified()
    .use(remarkGfm)
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, { createElement: React.createElement })
    .processSync(markdown).result; */

  const gg = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm, remarkHtml]}
    >
      {markdown}
    </ReactMarkdown>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(
    "https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/README.md"
  );

  return {
    props: {
      markdown: data as string,
    },
  };
}
