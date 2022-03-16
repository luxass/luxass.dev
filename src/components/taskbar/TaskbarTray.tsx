import { TrayWidget } from "@components/widgets";
import { useWindows } from "@hooks/use-windows";
import { Widgets } from "@lib/widgets";
import { FiChevronUp } from "react-icons/fi";

export function TaskbarTray() {
  const { widget, setWidget } = useWindows();

  return (
    <>
      {widget === Widgets.TRAY && <TrayWidget />}

      <section
        className="flex justify-center items-center h-[40px] rounded-[4px] hover:bg-green-700 select-none"
        onClick={() => {
          if (widget === null) {
            setWidget(Widgets.TRAY);
          }
        }}
      >
        <button className="text-xs text-white cursor-default">
          <FiChevronUp size="20px" />
        </button>
      </section>
    </>
  );
}
