import { createWrapper, MakeStore } from "next-redux-wrapper";
import { AnyAction, applyMiddleware, createStore } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { reducer, RootState, LocalRootState } from "./reducers";
export type { LocalRootState };

declare module "redux" {
  interface Dispatch<A extends Action = AnyAction> {
    <S, E, R>(asyncAction: ThunkAction<R, S, E, A>): R;
  }
}

export const store = createStore(reducer);

const makeStore: MakeStore<RootState> = () =>
  createStore(reducer, applyMiddleware(thunk));

export const storeWrapper = createWrapper<RootState>(makeStore);

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
