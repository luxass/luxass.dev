import { Widgets } from "@lib/widgets";
import { atom } from "recoil";

export const widgetState = atom<Widgets>({
  key: "widgetState",
  default: Widgets.NONE,
});
