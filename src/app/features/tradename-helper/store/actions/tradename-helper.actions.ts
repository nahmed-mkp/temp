import { Action } from '@ngrx/store';

import * as fromModels from './../../models';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum TradeNameHelperActionTypes {

    LOAD_TAXLOTS = '[TradeNameHelper] Load taxlots',
    LOAD_TAXLOTS_COMPLETE = '[TradeNameHelper] Load taxlots complete',
    LOAD_TAXLOTS_FAILED = '[TradeNameHelper] Load taxlots failed',

    LOAD_ALL_TRADENAMES = '[TradeNameHelper] Load all Tradenames',
    LOAD_ALL_TRADENAMES_COMPLETE = '[TradeNameHelper] Load all Tradenames complete',
    LOAD_ALL_TRADENAMES_FAILED = '[TradeNameHelper] Load all Tradenames failed',

    LOAD_TRADENAME_COUNTERS = '[TradeNameHelper] Load Tradename counters',
    LOAD_TRADENAME_COUNTERS_COMPLETE = '[TradeNameHelper] Load Tradename counters complete',
    LOAD_TRADENAME_COUNTERS_FAILED = '[TradeNameHelper] Load Tradename counters failed',

    UPDATE_TRADENAME = '[TradeNameHelper] Update Tradename',
    UPDATE_TRADENAME_COMPLETE = '[TradeNameHelper] Update Tradename complete',
    UPDATE_TRADENAME_FAILED = '[TradeNameHelper] Update Tradename failed',

    REINSTATE_TRADENAME = '[TradeNameHelper] Reinstate Tradenames',
    REINSTATE_TRADENAME_COMPLETE = '[TradeNameHelper] Reinstate Tradenames complete',
    REINSTATE_TRADENAME_FAILED = '[TradeNameHelper] Reinstate Tradenames failed',

}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */


export class LoadAllTradeNames {
    readonly type = TradeNameHelperActionTypes.LOAD_ALL_TRADENAMES;
}

export class LoadAllTradeNamesComplete {
    readonly type = TradeNameHelperActionTypes.LOAD_ALL_TRADENAMES_COMPLETE;

    constructor(public payload: fromModels.ITradeName[]) { }
}

export class LoadAllTradeNamesFailed {
    readonly type = TradeNameHelperActionTypes.LOAD_ALL_TRADENAMES_FAILED;

    constructor(public payload: string) { }
}

export class LoadTaxlots {
    readonly type = TradeNameHelperActionTypes.LOAD_TAXLOTS;
}

export class LoadTaxlotsComplete {
    readonly type = TradeNameHelperActionTypes.LOAD_TAXLOTS_COMPLETE;

    constructor(public payload: fromModels.ITaxLot[]) { }
}

export class LoadTaxlotsFailed {
    readonly type = TradeNameHelperActionTypes.LOAD_TAXLOTS_FAILED;

    constructor(public payload: string) { }
}

export class LoadTradeNameCounters {
    readonly type = TradeNameHelperActionTypes.LOAD_TRADENAME_COUNTERS;
}

export class LoadTradeNameCountersComplete {
    readonly type = TradeNameHelperActionTypes.LOAD_TRADENAME_COUNTERS_COMPLETE;

    constructor(public payload: fromModels.ITradeNameCounter[]) { }
}

export class LoadTradeNameCountersFailed {
    readonly type = TradeNameHelperActionTypes.LOAD_TRADENAME_COUNTERS_FAILED;

    constructor(public payload: string) { }
}

export class UpdateTradeName {
    readonly type = TradeNameHelperActionTypes.UPDATE_TRADENAME;

    constructor(public payload: fromModels.ITradeName) { }
}

export class UpdateTradeNameComplete {
    readonly type = TradeNameHelperActionTypes.UPDATE_TRADENAME_COMPLETE;

    constructor(public payload: fromModels.ITradeName[]) { }
}

export class UpdateTradeNameFailed {
    readonly type = TradeNameHelperActionTypes.UPDATE_TRADENAME_FAILED;

    constructor(public payload: string) { }
}

export class ReinstateTradeName {
    readonly type = TradeNameHelperActionTypes.REINSTATE_TRADENAME;

    constructor(public payload: fromModels.ITradeName) { }
}

export class ReinstateTradeNameComplete {
    readonly type = TradeNameHelperActionTypes.REINSTATE_TRADENAME_COMPLETE;

    constructor(public payload: fromModels.ITradeName[]) { }
}

export class ReinstateTradeNameFailed {
    readonly type = TradeNameHelperActionTypes.REINSTATE_TRADENAME_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TradeNameHelperActions
    = LoadAllTradeNames
    | LoadAllTradeNamesComplete
    | LoadAllTradeNamesFailed

    | LoadTaxlots
    | LoadTaxlotsComplete
    | LoadTaxlotsFailed

    | LoadTradeNameCounters
    | LoadTradeNameCountersComplete
    | LoadTradeNameCountersFailed

    | UpdateTradeName
    | UpdateTradeNameComplete
    | UpdateTradeNameFailed

    | ReinstateTradeName
    | ReinstateTradeNameComplete
    | ReinstateTradeNameFailed;
