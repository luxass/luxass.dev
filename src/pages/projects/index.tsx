import { DefaultLayout } from "@layouts/default";
import { InferGetStaticPropsType } from "next/types";
import { useEffect, useState } from "react";

function Projects({ title }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div className="text-white">{title}</div>;
}

// eslint-disable-next-line react/display-name
Projects.Layout = DefaultLayout;

export async function getStaticProps() {
  return {
    props: {
      title: new Date().getTime(),
    },
    revalidate: 60,
  };
}

export default Projects;
