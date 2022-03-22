import { Layout } from "@components/Layout";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { request } from "graphql-request";
import { parseGitHubUser, userQuery } from "@lib/github";
import { Repository } from "@components/Repository";

export default function Home({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout user={user}>
      {user.repositories.nodes.map((repo, idx) => (
        <Repository key={idx} repo={repo} />
      ))}
    </Layout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const { user: dataUser } = await request(
    "https://api.github.com/graphql",
    userQuery,
    {
      login: "DeprecatedLuxas",
    },
    {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    }
  );

  const user = parseGitHubUser(dataUser);

  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common"])),
      user,
    },
    revalidate: 3600,
  };
}
