import { GitHubUser } from "@lib/types";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "./SocialLinks";

interface SidebarProps {
  user: GitHubUser;
}

export function Sidebar({ user }: SidebarProps) {
  const { t } = useTranslation("common");

  return (
    <div className="w-full md:w-[256px] lg:w-[296px]">
      <div className="flex md:flex-col items-center">
        <div className="w-1/3 md:w-full">
          <Image
            src={user.avatarUrl}
            className="rounded-full"
            width="296"
            height="296"
            alt="GitHub Profile Picture"
          />
        </div>
        <div className="pt-4 pb-2 pl-4 md:pl-0 w-2/3 md:w-full">
          <h1 className="text-[32px] leading-[1] font-semibold">
            <span className="block text-[26px] leading-[1.25] text-white">
              {user.name}
            </span>
            <span className="block text-[20px] leading-[24px] font-light text-[#768390]">
              {user.login}
            </span>
          </h1>
          <div className="mt-4">
            <p className="text-white">{t("description")}</p>
          </div>
        </div>
      </div>
      <div>
        <SocialLinks />
      </div>
    </div>
  );
}
