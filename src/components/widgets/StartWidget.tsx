import { useOnClickOutside } from "@hooks/use-on-click-outside";
import { Widgets } from "@lib/widgets";
import { widgetState } from "@recoil";
import { useRef } from "react";
import { useRecoilState } from "recoil";

export function StartWidget() {
  const [widget, setWidget] = useRecoilState(widgetState);
  const widgetRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(widgetRef, () => {
    if (widget !== Widgets.NONE) {
      setWidget(Widgets.NONE);
    }
  });

  return (
    <section
      ref={widgetRef}
      className="absolute bottom-[60px] left-[14px] w-[640px] h-start bg-[#f2f2f2e6] dark:bg-[#242424cc] rounded-lg backdrop-blur-[20px] px-4 pt-4"
    >
      <section></section>
    </section>
  );
}
