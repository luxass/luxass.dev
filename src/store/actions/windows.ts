import { ReduxActionTypes } from "@lib/redux-actions";
import { Dispatch } from "redux";
import { IWindow, WindowsAction } from "@lib/types";

export function openWindow(params: IWindow) {
  return async (dispatch: Dispatch<WindowsAction>): Promise<void> => {
    dispatch({
      type: ReduxActionTypes.OPEN_WINDOW,
      payload: params,
    });
  };
}

export function closeWindow(window: string) {
  return async (dispatch: Dispatch<WindowsAction>): Promise<void> => {
    dispatch({
      type: ReduxActionTypes.CLOSE_WINDOW,
      payload: window,
    });

    setTimeout(
      () =>
        dispatch({
          type: ReduxActionTypes.CLEAR_CLOSED_WINDOWS,
          payload: window,
        }),
      1000
    );
  };
}
