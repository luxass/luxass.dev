import { LanguageWidget } from "@components/widgets/LanguageWidget";
import { useWindows } from "@hooks/use-windows";
import { Widgets } from "@lib/widgets";

export function TaskbarLanguage() {
  const { widget, setWidget } = useWindows();
  return (
    <>
      {widget === Widgets.LANGUAGE && <LanguageWidget />}

      <section
        className="flex justify-center items-center p-2 h-[40px] rounded-[4px] hover:bg-green-700"
        onClick={() => {
          if (widget === null) {
            setWidget(Widgets.LANGUAGE);
          }
        }}
      >
        <button className="text-xs text-white cursor-default">DAN</button>
      </section>
    </>
  );
}
