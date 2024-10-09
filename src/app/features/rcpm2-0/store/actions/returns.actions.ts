import { Action } from '@ngrx/store';

import * as fromModels from './../../models/returns.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum ReturnsActionTypes {

    LOAD_RETURNS = '[Returns] Load returns',
    LOAD_RETURNS_COMPLETE = '[Returns] Load returns complete',
    LOAD_RETURNS_FAILED = '[Returns] Load returns failed',

    LOAD_CAPITALS = '[Returns] Load capitals',
    LOAD_CAPITALS_COMPLETE = '[Returns] Load capitals complete',
    LOAD_CAPITALS_FAILED = '[Returns] Load capitals failed'

}

export class LoadReturns {
    readonly type = ReturnsActionTypes.LOAD_RETURNS;

    constructor(public payload: fromModels.IReturnsRequest, public layout: string) {}
}

export class LoadReturnsComplete {
    readonly type = ReturnsActionTypes.LOAD_RETURNS_COMPLETE;

    constructor(public payload: any, public layout: string) { }
}

export class LoadReturnsFailed {
    readonly type = ReturnsActionTypes.LOAD_RETURNS_FAILED;

    constructor(public payload: string, public layout: string) { }
}

export class LoadCapitals {
    readonly type = ReturnsActionTypes.LOAD_CAPITALS;

    constructor(public year: number) { }
}

export class LoadCapitalsComplete {
    readonly type = ReturnsActionTypes.LOAD_CAPITALS_COMPLETE;

    constructor(public payload: any, public year: number) { }
}

export class LoadCapitalsFailed {
    readonly type = ReturnsActionTypes.LOAD_CAPITALS_FAILED;

    constructor(public payload: any, public year: number) { }
}


export type ReturnsActions
    = LoadReturns
    | LoadReturnsComplete
    | LoadReturnsFailed

    | LoadCapitals
    | LoadCapitalsComplete
    | LoadCapitalsFailed;
