import { Layout } from "@components/Layout";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { request } from "graphql-request";
import { parseGitHubUser, userQuery } from "@lib/github";
import { useTranslation } from "next-i18next";

export default function Home({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");

  return (
    <Layout user={user}>
      <div className="mt-6 bg-[#22272e] border border-[#444c56] rounded-[6px] relative">
        <div className="p-6 -mb-[1px] rounded-b-[6px] border-b border-b-[#444c56]">
          <a
            href="/lucas-cv.pdf"
            download
            className="absolute w-8 h-8 bg-[#2d333b] right-3 top-3 rounded-[6px] flex items-center justify-center hover:cursor-pointer hover:border hover:border-[#768390]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              className="fill-[#768390]"
            >
              <path
                fillRule="evenodd"
                d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"
              ></path>
            </svg>
          </a>
          <div className="flex justify-between">
            <div className="w-1/2 mr-6">
              <div>
                <h1 className="text-[26px] leading-[1.25] text-white">
                  {t("overview.titles.about")}
                </h1>
                <div className="border-t-2 border-t-[#373e47] my-2 py-2">
                  <p></p>
                </div>
              </div>
              <div>
                <h1 className="text-[26px] leading-[1.25] text-white">
                  {t("overview.titles.skills")}
                </h1>
                <div className="border-t-2 border-t-[#373e47] my-2 py-2">
                  <p></p>
                </div>
              </div>
            </div>
            <div className="w-1/2 ml-6">
              <div>
                <h1 className="text-[26px] leading-[1.25] text-white">
                  {t("overview.titles.education")}
                </h1>
                <div className="border-t-2 border-t-[#373e47] my-2 py-2">
                  <div className="ml-4 mt-2 pl-4 border-l-2 border-l-[#373e47]">
                    <div>
                      <h2 className="text-lg text-white">
                        Webudvikler - Viden Djurs
                      </h2>
                      <p className="text-base font-light text-[#a5b2c0]">
                        2020 - 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
