import { Action } from "@ngrx/store";

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum OptionActionTypes {
  OPTIONS_LOAD_INPUTS = "[PricingCalculator - Options] Load inputs",
  OPTIONS_LOAD_INPUTS_COMPLETE = "[PricingCalculator - Options] Load inputs complete",
  OPTIONS_LOAD_INPUTS_FAILED = "[PricingCalculator - Options] Load inputs failed",
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class OptionsLoadInputs implements Action {
  readonly type = OptionActionTypes.OPTIONS_LOAD_INPUTS;
}

export class OptionsLoadInputsComplete implements Action {
  readonly type = OptionActionTypes.OPTIONS_LOAD_INPUTS_COMPLETE;

  constructor(public payload: any) {}
}

export class OptionsLoadInputsFailed implements Action {
  readonly type = OptionActionTypes.OPTIONS_LOAD_INPUTS_FAILED;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type OptionActions =
  | OptionsLoadInputs
  | OptionsLoadInputsComplete
  | OptionsLoadInputsFailed;
