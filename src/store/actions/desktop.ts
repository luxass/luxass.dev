import { Dispatch } from "redux";
import {
  ContextMenuCoords,
  DesktopAction,
  IconSize,
  SortType,
} from "@lib/types";
import { State } from "../reducers";
import { ReduxActionTypes } from "@lib/redux-actions";

export function changeTheme() {
  return async (dispatch: Dispatch<DesktopAction>) => {
    dispatch({
      type: ReduxActionTypes.CHANGE_THEME,
    });
    dispatch({ type: ReduxActionTypes.THEME_WAS_CHANGED });
  };
}

export function toggleNightmode() {
  return async (dispatch: Dispatch<DesktopAction>, getState: () => State) => {
    const { nightmode } = getState().desktop;

    dispatch({
      type: ReduxActionTypes.TOGGLE_NIGHTMODE,
      payload: !nightmode,
    });
  };
}

export function changeBrightness(brightness: string) {
  return async (dispatch: Dispatch<DesktopAction>): Promise<void> => {
    dispatch({
      type: ReduxActionTypes.CHANGE_BRIGHTNESS,
      payload: brightness,
    });
  };
}

export function openContext(coords: ContextMenuCoords): DesktopAction {
  return {
    type: ReduxActionTypes.OPEN_CONTEXT_MENU,
    payload: coords,
  };
}

export function closeContext(): DesktopAction {
  return {
    type: ReduxActionTypes.CLOSE_CONTEXT_MENU,
  };
}

export function sortDesktop(sortType: SortType) {
  return {
    type: ReduxActionTypes.SORT_DESKTOP,
    payload: sortType,
  };
}

export function changeIconSize(size: IconSize) {
  return {
    type: ReduxActionTypes.CHANGE_ICON_SIZE,
    payload: size,
  };
}
