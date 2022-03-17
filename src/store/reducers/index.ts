import { DesktopState, WindowsState } from "@lib/types";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { desktopReducer } from "./desktop.reducer";
import { windowsReducer } from "./window.reducer";

export const rootReducer = combineReducers({
  windows: windowsReducer,
  desktop: desktopReducer,
});

export type State = {
  windows: WindowsState;
  desktop: DesktopState;
};

export const reducer = (state: State | undefined, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    return nextState;
  } else {
    // @ts-ignore
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof reducer>;
export type LocalRootState = ReturnType<typeof rootReducer>;
