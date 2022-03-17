import { App } from "./App";
import { desktopState, windowsState } from "@recoil";
import { useRecoilValue } from "recoil";
import { FloatingApp } from "./FloatingApp";

export function Apps() {
  const { apps } = useRecoilValue(desktopState);
  const windows = useRecoilValue(windowsState);
  return (
    <section className="flex-1 grid grid-flow-col grid-cols-apps grid-rows-apps desktop-bounds">
      {windows.map((window, idx) => (
        <FloatingApp key={`window-${idx}`} window={window} />
      ))}
      {apps.map((app, idx) => (
        <App key={idx} app={app} />
      ))}
    </section>
  );
}
