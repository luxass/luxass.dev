import { TaskbarLanguage } from "./TaskbarLanguage";
import { TaskbarQuick } from "./TaskbarQuick";
import { TaskbarTime } from "./TaskbarTime";
import { TaskbarTray } from "./TaskbarTray";

export interface TaskbarProps {}

export function Taskbar() {
  return (
    <footer className="w-full h-12 backdrop-blur-[20.5px] bg-[#03152959] flex justify-between items-center px-4 py-0.5">
      <section>

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
