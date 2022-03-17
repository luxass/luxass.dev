import { WindowsApp, WindowsTheme } from "@lib/types";
import { getApps } from "@lib/windows-apps";
import { atom } from "recoil";

interface DesktopState {
  theme: WindowsTheme;
  apps: WindowsApp[];

}

export const desktopState = atom<DesktopState>({
  key: "desktopState",
  default: {
    theme: "light",
    apps: getApps(),
  },
});
