import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FuturesActionTypes {
    LOAD_FUTURES = '[PricingEngine] Load futures',
    LOAD_FUTURES_COMPLETE = '[PricingEngine] Load futures complete',
    LOAD_FUTURES_FAILED = '[PricingEngine] Load futures Failed',

    UPDATE_FUTURES = '[Pricing Engine] update futures',
    UPDATE_FUTURES_COMPLETE = '[Pricing Engine] update futures complete',
    UPDATE_FUTURES_FAILED = '[Pricing Engine] update futures failed',
}





/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadFutures implements Action {
    readonly type = FuturesActionTypes.LOAD_FUTURES;

    constructor(public payload: fromModels.FuturesDataReq) { }
}

export class LoadFuturesComplete implements Action {
    readonly type = FuturesActionTypes.LOAD_FUTURES_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadFuturesFailed implements Action {
    readonly type = FuturesActionTypes.LOAD_FUTURES_FAILED;

    constructor(public payload: string) { }
}

export class UpdateFutures implements Action {
    readonly type = FuturesActionTypes.UPDATE_FUTURES;

    constructor(public payload: fromModels.FutureUpdateReq) { }
}

export class UpdateFuturesComplete implements Action {
    readonly type = FuturesActionTypes.UPDATE_FUTURES_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateFuturesFailed implements Action {
    readonly type = FuturesActionTypes.UPDATE_FUTURES_FAILED;

    constructor(public payload: string) { }
}









/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FuturesActions
    = LoadFutures
    | LoadFuturesComplete
    | LoadFuturesFailed

    | UpdateFutures
    | UpdateFuturesComplete
    | UpdateFuturesFailed;
