import { Layout } from "@components/Layout";
import { request } from "graphql-request";
import { parseGitHubUser, userQuery } from "@lib/github";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Resume({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout user={user}>
      <h1>Resume</h1>
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
