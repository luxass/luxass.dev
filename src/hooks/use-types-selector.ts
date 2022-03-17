import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { LocalRootState } from "@store";

export const useTypedSelector: TypedUseSelectorHook<LocalRootState> =
  useSelector;
