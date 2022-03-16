import { useWindows } from "@hooks/use-windows";
import { TaskbarApp } from "./TaskbarApp";
import { TaskbarLanguage } from "./TaskbarLanguage";
import { TaskbarQuick } from "./TaskbarQuick";
import { TaskbarTime } from "./TaskbarTime";
import { TaskbarTray } from "./TaskbarTray";
import { TaskbarWindows } from "./TaskbarWindows";

export interface TaskbarProps {}

export function Taskbar() {
  const { apps } = useWindows();
  return (
    <footer className="w-full h-12 backdrop-blur-[20.5px] bg-[#03152959] flex justify-between items-center px-3.5 py-0.5">
      <section className="flex">
        <TaskbarWindows />
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
