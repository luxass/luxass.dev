import { StartWidget } from "@components/widgets";
import { useWindows } from "@hooks/use-windows";
import { Widgets } from "@lib/widgets";
import Image from "next/image";

export function TaskbarWindows() {
  const { widget, setWidget } = useWindows();

  return (
    <>
      {widget === Widgets.START && <StartWidget />}

      <section
        className="flex justify-center items-center p-2 h-[40px] rounded-[4px] hover:bg-green-700 select-none"
        onClick={() => {
          if (widget === null) {
            setWidget(Widgets.START);
          }
        }}
      >
        <button className="text-xs text-white cursor-default flex">
          <Image src="/windows.png" width="30px" height="30px" alt="Windows Logo" />
        </button>
      </section>
    </>
  );
}
