import { WindowsTheme } from "@lib/types";
import { atom } from "recoil";

interface WindowsState {
  locked: boolean;
  theme: WindowsTheme;
}

export const windowsState = atom<WindowsState>({
  key: "windowsState",
  default: {
    locked: true,
    theme: "light",
  },
});
