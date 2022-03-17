import { ReduxActionTypes } from "@lib/redux-actions";
import { ReactNode } from "react";

export interface IWindow {
  name: string;
  icon: string;
  size: { height: number; width: number };
  isOpen: boolean;
  windowContent: ReactNode | null;
}

export interface WindowsState {
  windows: IWindow[];
}

export type WindowsAction =
  | {
      type: ReduxActionTypes.OPEN_WINDOW;
      payload: IWindow;
    }
  | {
      type: ReduxActionTypes.CLOSE_WINDOW;
      payload: string;
    }
  | {
      type: ReduxActionTypes.CLEAR_CLOSED_WINDOWS;
      payload: string;
    };
