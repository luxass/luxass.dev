import { SearchWidget, StartWidget } from "@components/widgets";
import { Widgets } from "@lib/widgets";
import { widgetState } from "@recoil";
import clsx from "clsx";
import Image from "next/image";
import { useRecoilState } from "recoil";

export function TaskbarSearch() {
  const [widget, setWidget] = useRecoilState(widgetState);

  return (
    <>
      {widget === Widgets.SEARCH && <SearchWidget />}

      <section
        className={clsx(
          "flex justify-center items-center p-2 h-[40px] rounded-[4px] hover:bg-green-700 select-none",
          {
            "bg-green-700": widget === Widgets.SEARCH,
          }
        )}
        onClick={() => {
          if (widget === Widgets.NONE) {
            setWidget(Widgets.SEARCH);
          }
        }}
      >
        <button className="text-xs text-white cursor-default flex">
          <Image
            src="/windows.png"
            width="30px"
            height="30px"
            alt="Windows Logo"
          />
        </button>
      </section>
    </>
  );
}
