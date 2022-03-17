import { ReduxActionTypes } from "@lib/redux-actions";
import { WindowsAction, WindowsState } from "@lib/types";

const initialState: WindowsState = {
  windows: [],
};

export function windowsReducer(
  state = initialState,
  action: WindowsAction
): WindowsState {
  switch (action.type) {
    case ReduxActionTypes.OPEN_WINDOW:
      const windowIsAlreadyOpened = state.windows.some(
        (window) => window.name === action.payload.name
      );
      if (windowIsAlreadyOpened) return state;
      return {
        ...state,
        windows: [...state.windows, action.payload],
      };

    case ReduxActionTypes.CLOSE_WINDOW:
      const currentWindows = state.windows.map((window) =>
        window.name === action.payload
          ? {
              ...window,
              isOpen: false,
            }
          : window
      );

      return { ...state, windows: currentWindows };
    case ReduxActionTypes.CLEAR_CLOSED_WINDOWS:
      const withoutRemovedWindows = state.windows.filter(
        (window) => window.name !== action.payload
      );

      return { ...state, windows: withoutRemovedWindows };

    default:
      return state;
  }
}
