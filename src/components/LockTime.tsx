import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function LockTime() {
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
      <section className="text-6xl font-semibold text-gray-100">
        {date.toLocaleTimeString(locale, {
          timeStyle: "short",
        })}
      </section>
      <section className="text-lg font-medium text-gray-200">
        {new Date().toLocaleDateString(locale, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </section>
    </>
  );
}
