import { Layout } from "@components/Layout";
import { request } from "graphql-request";
import { parseGitHubUser, userQuery } from "@lib/github";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Repository } from "@components/Repository";

export default function Projects({
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
