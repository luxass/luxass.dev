import { Layout } from "@components/Layout";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { request, gql } from "graphql-request";
import { parseGitHubUser } from "@lib/github";

export default function Home({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout user={user}>
      {/*   <GitHubCalendar
        style={{
          color: "#adbac7",
        }}
        username="DeprecatedLuxas"
        theme={{
          level0: "#2d333b",
          level1: "#0e4429",
          level2: "#006d32",
          level3: "#26a641",
          level4: "#39d353",
        }}
      /> */}
      Nothing here yet
    </Layout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const query = gql`
    query userInfo($login: String!) {
      user(login: $login) {
        name
        login
        avatarUrl
        email
        followers {
          totalCount
        }
        repositories(
          first: 100
          ownerAffiliations: OWNER
          orderBy: { direction: DESC, field: PUSHED_AT }
          privacy: PUBLIC
        ) {
          totalCount
          nodes {
            nameWithOwner
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  `;

  const { user: dataUser } = await request(
    "https://api.github.com/graphql",
    query,
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
