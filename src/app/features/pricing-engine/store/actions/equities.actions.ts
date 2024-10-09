import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum EquitiesActionTypes {
    LOAD_EQUITIES = '[PricingEngine] Load equities',
    LOAD_EQUITIES_COMPLETE = '[PricingEngine] Load equities complete',
    LOAD_EQUITIES_FAILED = '[PricingEngine] Load equities Failed',
}





/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadEquities implements Action {
    readonly type = EquitiesActionTypes.LOAD_EQUITIES;

    constructor(public payload: fromModels.EquitiesDataReq) { }
}

export class LoadEquitiesComplete implements Action {
    readonly type = EquitiesActionTypes.LOAD_EQUITIES_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadEquitiesFailed implements Action {
    readonly type = EquitiesActionTypes.LOAD_EQUITIES_FAILED;

    constructor(public payload: string) { }
}









/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type EquitiesActions
    = LoadEquities
    | LoadEquitiesComplete
    | LoadEquitiesFailed;