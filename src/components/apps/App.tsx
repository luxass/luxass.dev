import { WindowsApp } from "@lib/types";
import Image from "next/image";
import clsx from "clsx";

interface AppProps {
  app: WindowsApp;
}

export function App({ app }: AppProps) {
  return (
    <section
      className={clsx(
        "flex flex-col justify-center items-center transition-app hover:bg-[#83c3ff3d] rounded-[4px]"
      )}
    >
      <section>
        <Image
          src={app.icon}
          quality={100}
          objectFit="contain"
          height="32px"
          width="32px"
          alt={`${app.name} Icon`}
        />
      </section>
      <h4 className="font-normal text-sm text-black dark:text-[#ffffffd5] select-none">
        {app.name}
      </h4>
    </section>
  );
}
