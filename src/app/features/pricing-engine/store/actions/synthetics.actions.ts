import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SyntheticsActionTypes {
    LOAD_SYNTHETICS = '[PricingEngine] Load synthetics',
    LOAD_SYNTHETICS_COMPLETE = '[PricingEngine] Load synthetics complete',
    LOAD_SYNTHETICS_FAILED = '[PricingEngine] Load synthetics Failed',
}





/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadSynthetics implements Action {
    readonly type = SyntheticsActionTypes.LOAD_SYNTHETICS;
}

export class LoadSyntheticsComplete implements Action {
    readonly type = SyntheticsActionTypes.LOAD_SYNTHETICS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSyntheticsFailed implements Action {
    readonly type = SyntheticsActionTypes.LOAD_SYNTHETICS_FAILED;

    constructor(public payload: string) { }
}









/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SyntheticsActions
    = LoadSynthetics
    | LoadSyntheticsComplete
    | LoadSyntheticsFailed;