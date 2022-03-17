import { ReduxActionTypes } from "@lib/redux-actions";
import { DesktopState, DesktopAction } from "@lib/types";

const initialState: DesktopState = {
  theme: "dark",
  brightness: "100",
  nightmode: false,
  contextMenu: { x: 0, y: 0 },
  iconsSize: "medium",
  sortDesktopBy: "size",
};

export function desktopReducer(
  state = initialState,
  action: DesktopAction
): DesktopState {
  switch (action.type) {
    case ReduxActionTypes.CHANGE_THEME:
      const { theme } = state;
      const updatedTheme = theme === "dark" ? "light" : "dark";
      
      return { ...state, theme: updatedTheme };
    case ReduxActionTypes.TOGGLE_NIGHTMODE:
      return { ...state, nightmode: !state.nightmode };
    case ReduxActionTypes.CHANGE_BRIGHTNESS:
      return { ...state, brightness: action.payload };
    case ReduxActionTypes.CHANGE_ICON_SIZE:
      return { ...state, iconsSize: action.payload };
    case ReduxActionTypes.SORT_DESKTOP:
      return { ...state, sortDesktopBy: action.payload };
    case ReduxActionTypes.OPEN_CONTEXT_MENU:
      return {
        ...state,
        contextMenu: action.payload,
      };
    default:
      return state;
  }
}
