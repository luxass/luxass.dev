import { useOnClickOutside } from "@hooks/use-on-click-outside";
import { useWindows } from "@hooks/use-windows";
import { useRef } from "react";

export function SearchWidget() {
  const { widget, setWidget } = useWindows();
  const widgetRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(widgetRef, () => {
    if (widget !== null) {
      setWidget(null);
    }
  });

  return (
    <section ref={widgetRef} className="absolute bottom-10 right-10">
      <h1>Languagedfgfdg dfg dfg dfg gdf Widget</h1>
    </section>
  );
}
