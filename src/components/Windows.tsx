import { Taskbar } from "./taskbar";
import { useMediaQuery } from "@hooks/use-mediaquery";
import { Apps } from "./apps";
import { Desktop } from "./Desktop";
import { WindowsProvider } from "@contexts/windows-provider";

export function Windows() {
  const dark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <WindowsProvider>
      <Desktop bg={dark ? "dark" : "light"}>
        <Apps />
        <Taskbar />
      </Desktop>
    </WindowsProvider>
  );
}
