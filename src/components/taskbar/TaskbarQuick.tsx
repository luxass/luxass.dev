import { QuickWidget } from "@components/widgets";
import { useWindows } from "@hooks/use-windows";
import { Widgets } from "@lib/widgets";
import { FiVolume2, FiWifi } from "react-icons/fi";

export function TaskbarQuick() {
  const { widget, setWidget } = useWindows();

  return (
    <>
      {widget === Widgets.QUICK && <QuickWidget />}

      <section
        className="flex justify-center items-center p-2 h-[40px] rounded-[4px] hover:bg-green-700 select-none"
        onClick={() => {
          if (widget === null) {
            setWidget(Widgets.QUICK);
          }
        }}
      >
        <button className="text-xs text-white cursor-default flex">
          <FiWifi size="20px" className="mr-2" />
          <FiVolume2 size="20px" />
        </button>
      </section>
    </>
  );
}
