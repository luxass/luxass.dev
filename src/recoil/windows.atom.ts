import { ActiveWindow } from "@lib/types";
import { atom } from "recoil";

export const windowsState = atom<ActiveWindow[]>({
  key: "windowsState",
  default: [],
});
