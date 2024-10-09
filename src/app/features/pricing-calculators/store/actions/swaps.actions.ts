import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SwapsActionTypes {

    LOAD_INPUTS = '[PricingCalculator - Swaps] Load inputs',
    LOAD_INPUTS_COMPLETE = '[PricingCalculator - Swaps] Load inputs complete',
    LOAD_INPUTS_FAILED = '[PricingCalculator - Swaps] Load inputs failed',
}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadSwapsInputs implements Action {
    readonly type = SwapsActionTypes.LOAD_INPUTS;
}

export class LoadSwapsInputsComplete implements Action {
    readonly type = SwapsActionTypes.LOAD_INPUTS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSwapsInputsFailed implements Action {
    readonly type = SwapsActionTypes.LOAD_INPUTS_FAILED;

    constructor(public payload: string) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SwapsActions
    = LoadSwapsInputs
    | LoadSwapsInputsComplete
    | LoadSwapsInputsFailed;
