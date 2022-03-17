import { desktopState } from "@recoil";
import { useRecoilValue } from "recoil";
import { TaskbarApp } from "./TaskbarApp";
import { TaskbarLanguage } from "./TaskbarLanguage";
import { TaskbarQuick } from "./TaskbarQuick";
import { TaskbarSearch } from "./TaskbarSearch";
import { TaskbarTime } from "./TaskbarTime";
import { TaskbarTray } from "./TaskbarTray";
import { TaskbarWindows } from "./TaskbarWindows";

export interface TaskbarProps {}

export function Taskbar() {
  const { apps } = useRecoilValue(desktopState);
  return (
    <footer className="w-full h-12 backdrop-blur-[20.5px] bg-[#03152959] flex justify-between items-center px-3.5 py-0.5">
      <section className="flex">
        <TaskbarWindows />
        <TaskbarSearch />
        {apps
          .filter((app) => app.taskbar)
          .map((app) => (
            <TaskbarApp key={app.appId} app={app} />
          ))}
      </section>
      <section className="flex">
        <TaskbarTray />
        <TaskbarLanguage />
        <TaskbarQuick />
        <TaskbarTime />
      </section>
    </footer>
  );
}
