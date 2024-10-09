import { Action } from '@ngrx/store';

import * as fromModels from './../../models/trades.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum BenchmarkTradesActionTypes {

    LOAD_TRADE_DATES = '[BenchmarkTrades] Load trade dates',
    LOAD_TRADE_DATES_COMPLETE = '[BenchmarkTrades] Load trade dates complete',
    LOAD_TRADE_DATES_FAILED = '[BenchmarkTrades] Load trade dates failed',

    LOAD_FX_TRADES = '[BenchmarkTrades] Load FX trades',
    LOAD_FX_TRADES_COMPLETE = '[BenchmarkTrades] Load FX trades complete',
    LOAD_FX_TRADES_FAILED = '[BenchmarkTrades] Load FX trades failed',

    SEND_FX_TRADES_TO_CRD = '[BenchmarkTrades] Send FX trades to CRD',
    SEND_FX_TRADES_TO_CRD_COMPLETE = '[BenchmarkTrades] Send FX trades to CRD complete',
    SEND_FX_TRADES_TO_CRD_FAILED = '[BenchmarkTrades] Send FX trades to CRD failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadTradeDates implements Action {

    readonly type = BenchmarkTradesActionTypes.LOAD_TRADE_DATES;
}

export class LoadTradeDatesComplete implements Action {
    readonly type = BenchmarkTradesActionTypes.LOAD_TRADE_DATES_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadTradeDatesFailed implements Action {
    readonly type = BenchmarkTradesActionTypes.LOAD_TRADE_DATES_FAILED;

    constructor(public payload: string) { }
}

export class LoadFXTrades implements Action {

    readonly type = BenchmarkTradesActionTypes.LOAD_FX_TRADES;

    constructor(public payload: string) { }
}

export class LoadFXTradesComplete implements Action {
    readonly type = BenchmarkTradesActionTypes.LOAD_FX_TRADES_COMPLETE;

    constructor(public payload: fromModels.IFXTrade[]) { }
}

export class LoadFXTradesFailed implements Action {
    readonly type = BenchmarkTradesActionTypes.LOAD_FX_TRADES_FAILED;

    constructor(public payload: string) { }
}


export class SendFXTradesToCRD implements Action {

    readonly type = BenchmarkTradesActionTypes.SEND_FX_TRADES_TO_CRD;

    constructor(public payload: string) { }
}

export class SendFXTradesToCRDComplete implements Action {
    readonly type = BenchmarkTradesActionTypes.SEND_FX_TRADES_TO_CRD_COMPLETE;

    constructor(public payload: fromModels.IFXTrade[]) { }
}

export class SendFXTradesToCRDFailed implements Action {
    readonly type = BenchmarkTradesActionTypes.SEND_FX_TRADES_TO_CRD_FAILED;

    constructor(public payload: string) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type BenchmarkTradesActions
    = LoadTradeDates
    | LoadTradeDatesComplete
    | LoadTradeDatesFailed

    | LoadFXTrades
    | LoadFXTradesComplete
    | LoadFXTradesFailed

    | SendFXTradesToCRD
    | SendFXTradesToCRDComplete
    | SendFXTradesToCRDFailed;
