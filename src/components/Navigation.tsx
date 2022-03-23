import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useTranslation } from "next-i18next";

export function Navigaiton() {
  const { pathname } = useRouter();
  const { t } = useTranslation("common");

  return (
    <nav className="sticky top-0 w-full border-b  border-b-[#373e47] bg-[#22272e] z-50 mb-4">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[256px] lg:w-[296px]" />
          <div className="w-full pl-0 md:pl-[16px] lg:pl-[24px]">
            <nav className="flex">
              <Link passHref href="/">
                <a
                  className={clsx(
                    "py-2 px-4 text-[14px] leading-[30px] text-center border-b-2 font-semibold text-[#a5b2c0] flex items-center outline-none outline-dotted outline-offset-[-1px]",
                    {
                      "border-b-[#EC775C]": pathname === "/",
                      "border-b-transparent": pathname !== "/",
                    }
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    className="fill-[#768390] mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"
                    />
                  </svg>
                  {t("nav.overview")}
                </a>
              </Link>
              <Link passHref href="/projects">
                <a
                  className={clsx(
                    "py-2 px-4 text-[14px] leading-[30px] text-center border-b-2 font-semibold text-[#a5b2c0] flex items-center outline-none outline-dotted outline-offset-[-1px]",
                    {
                      "border-b-[#EC775C]": pathname === "/projects",
                      "border-b-transparent": pathname !== "/projects",
                    }
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    className="fill-[#768390] mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                    />
                  </svg>
                  {t("nav.projects")}
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}
