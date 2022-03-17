import { ReduxActionTypes } from "@lib/redux-actions";
import { ContextMenuCoords, WindowsTheme } from ".";

export type SortType = "date" | "name" | "size" | "type";
export type IconSize = "small" | "medium" | "large";

export interface DesktopState {
  theme: WindowsTheme;
  nightmode: boolean;
  brightness: string;
  contextMenu: ContextMenuCoords;
  iconsSize: IconSize;
  sortDesktopBy: SortType;
}

export type DesktopAction =
  | { type: ReduxActionTypes.CHANGE_THEME }
  | { type: ReduxActionTypes.THEME_WAS_CHANGED }
  | { type: ReduxActionTypes.TOGGLE_NIGHTMODE }
  | { type: ReduxActionTypes.CHANGE_BRIGHTNESS; payload: string }
  | {
      type: ReduxActionTypes.OPEN_CONTEXT_MENU;
      payload: { x: number; y: number };
    }
  | { type: ReduxActionTypes.CLOSE_CONTEXT_MENU }
  | {
      type: ReduxActionTypes.SORT_DESKTOP;
      payload: SortType;
    }
  | { type: ReduxActionTypes.CHANGE_ICON_SIZE; payload: IconSize };
