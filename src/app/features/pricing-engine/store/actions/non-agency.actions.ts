import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum NonAgencyActionTypes {
    LOAD_NON_AGENCY = '[PricingEngine] Load non agency',
    LOAD_NON_AGENCY_COMPLETE = '[PricingEngine] Load non agency complete',
    LOAD_NON_AGENCY_FAILED = '[PricingEngine] Load non agency Failed',
}





/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadNonAgency implements Action {
    readonly type = NonAgencyActionTypes.LOAD_NON_AGENCY;
}

export class LoadNonAgencyComplete implements Action {
    readonly type = NonAgencyActionTypes.LOAD_NON_AGENCY_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadNonAgencyFailed implements Action {
    readonly type = NonAgencyActionTypes.LOAD_NON_AGENCY_FAILED;

    constructor(public payload: string) { }
}









/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type NonAgencyActions
    = LoadNonAgency
    | LoadNonAgencyComplete
    | LoadNonAgencyFailed;