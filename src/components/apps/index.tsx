import { useWindows } from "@hooks/use-windows";
import { App } from "./App";

export function Apps() {
  const { apps } = useWindows();

  return (
    <section className="flex-1 grid grid-flow-col grid-cols-apps grid-rows-apps">
      {apps.map((app, idx) => (
        <App key={idx} app={app} />
      ))}
    </section>
  );
}
