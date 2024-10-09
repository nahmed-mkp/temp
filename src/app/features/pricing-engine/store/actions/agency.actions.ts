import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AgencyActionTypes {
    LOAD_AGENCY = '[PricingEngine] Load agency',
    LOAD_AGENCY_COMPLETE = '[PricingEngine] Load agency complete',
    LOAD_AGENCY_FAILED = '[PricingEngine] Load agency Failed',
}





/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadAgency implements Action {
    readonly type = AgencyActionTypes.LOAD_AGENCY;
}

export class LoadAgencyComplete implements Action {
    readonly type = AgencyActionTypes.LOAD_AGENCY_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadAgencyFailed implements Action {
    readonly type = AgencyActionTypes.LOAD_AGENCY_FAILED;

    constructor(public payload: string) { }
}









/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AgencyActions
    = LoadAgency
    | LoadAgencyComplete
    | LoadAgencyFailed;