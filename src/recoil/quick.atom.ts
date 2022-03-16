import { WindowsQuickSettings } from "@lib/types";
import { atom } from "recoil";

export const quickState = atom<WindowsQuickSettings>({
  key: "quickState",
  default: {
    wifi: true,
    theme: "light",
  },
});
