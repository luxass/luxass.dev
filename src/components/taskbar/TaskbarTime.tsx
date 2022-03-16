import { CalendarWidget } from "@components/widgets";
import { useWindows } from "@hooks/use-windows";
import { Widgets } from "@lib/widgets";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function TaskbarTime() {
  const { widget, setWidget } = useWindows();
  const { locale } = useRouter();
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
      {widget === Widgets.CALENDAR && <CalendarWidget />}

      <section
        className="flex justify-center items-center p-2 h-[40px] rounded-[4px] hover:bg-green-700 ml-0.5 select-none"
        onClick={() => {
          if (widget === null) {
            setWidget(Widgets.CALENDAR);
          }
        }}
      >
        <button className="text-xs text-white cursor-default flex flex-col items-end">
          <time>
            {date.toLocaleTimeString(locale, {
              timeStyle: "short",
            })}
          </time>
          <time>
            {new Date().toLocaleDateString(locale).replace(/[.]/g, "-")}
          </time>
        </button>
      </section>
    </>
  );
}
