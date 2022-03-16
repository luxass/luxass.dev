import { WindowsApp } from "@lib/types";
import Image from "next/image";

export interface TaskbarAppProps {
  app: WindowsApp;
}

export function TaskbarApp({ app }: TaskbarAppProps) {
  return (
    <section className="flex justify-center items-center p-2 h-[40px] rounded-[4px] hover:bg-green-700 select-none">
      <button className="text-xs text-white cursor-default">
        <Image src={app.icon} width="30px" height="30px" alt={`${app.name} Icon`} />
      </button>
    </section>
  );
}
