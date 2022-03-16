import { WindowsApp, WindowsTheme } from "@lib/types";
import { getApps } from "@lib/windows-apps";
import { atom } from "recoil";

interface WindowsState {
  theme: WindowsTheme;
  apps: WindowsApp[];
}

export const windowsState = atom<WindowsState>({
  key: "windowsState",
  default: {
    theme: "light",
    apps: getApps(),
  },
});
