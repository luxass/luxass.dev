import * as WindowsActionCreators from "./windows";

export const CombinedActionCreators = {
  ...WindowsActionCreators,
};

export type CombinedActionsType = typeof CombinedActionCreators;
