import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FXOptionActionTypes {

    LOAD_INPUTS = '[PricingCalculator- FX Options] Load inputs',
    LOAD_INPUTS_COMPLETE = '[PricingCalculator - FX Options] Load inputs complete',
    LOAD_INPUTS_FAILED = '[PricingCalculator- FX Options] Load inputs failed',
    LOAD_OUTPUTS = '[PricingCalculator - FX Options] Load output',
    LOAD_OUTPUTS_COMPLETE = '[PricingCalculator - FX Options] Load output complete',
    LOAD_OUTUPUTS_FAILED = '[PricingCalculator- FX Options] Load output failed',
}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadInputs implements Action {
    readonly type = FXOptionActionTypes.LOAD_INPUTS;
}

export class LoadInputsComplete implements Action {
    readonly type = FXOptionActionTypes.LOAD_INPUTS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadInputsFailed implements Action {
    readonly type = FXOptionActionTypes.LOAD_INPUTS_FAILED;

    constructor(public payload: string) { }
}

export class LoadOutputs implements Action {
    readonly type = FXOptionActionTypes.LOAD_OUTPUTS;

    constructor(public payload: any) { }
}

export class LoadOutputsComplete implements Action {
    readonly type = FXOptionActionTypes.LOAD_OUTPUTS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadOutputsFailed implements Action {
    readonly type = FXOptionActionTypes.LOAD_OUTUPUTS_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FXOptionActions
    = LoadInputs
    | LoadInputsComplete
    | LoadInputsFailed
    | LoadOutputs
    | LoadOutputsComplete
    | LoadOutputsFailed;

