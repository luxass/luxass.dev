import { Taskbar } from "./taskbar";
import { useMediaQuery } from "@hooks/use-mediaquery";
import { Apps } from "./apps";
import { Desktop } from "./Desktop";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { windowsState } from "src/recoil";

export function Windows() {
  const dark = useMediaQuery("(prefers-color-scheme: dark)");
  const [windows, setWindows] = useRecoilState(windowsState);

  useEffect(() => {
    setWindows({
      ...windows,
      theme: dark ? "dark" : "light",
    });
  }, [dark]);

  return (
    <Desktop>
      <Apps />
      <Taskbar />
    </Desktop>
  );
}
