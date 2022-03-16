import { App } from "./App";
import { windowsState } from "@recoil";
import { useRecoilValue } from "recoil";

export function Apps() {
  const { apps } = useRecoilValue(windowsState);

  return (
    <section className="flex-1 grid grid-flow-col grid-cols-apps grid-rows-apps">
      {apps.map((app, idx) => (
        <App key={idx} app={app} />
      ))}
    </section>
  );
}
