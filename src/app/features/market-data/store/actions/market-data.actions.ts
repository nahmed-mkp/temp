import { Action } from '@ngrx/store';

import * as fromModels from './../../models/market-data.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum MarketDataActionTypes {

    SEARCH_MARKET_DATA = '[MarketData] Search Market Data',
    SEARCH_MARKET_DATA_COMPLETE = '[MarketData] Search Market Data complete', 
    SEARCH_MARKET_DATA_FAILED = '[MarketData] Search Market Data failed',

    BACKFILL_MARKET_DATA = '[MarketData] Backfill Market Data', 
    BACKFILL_MARKET_DATA_COMPLETE = '[MarketData] Backfill Market Data complete',
    BACKFILL_MARKET_DATA_FAILED = '[MarketData] Backfill Market Data failed',


    LOAD_MARKET_DATA_DETAIL = '[MarketData] load market data detail',
    LOAD_MARKET_DATA_DETAIL_COMPLETE = '[MarketData] load market data detail complete',
    LOAD_MARKET_DATA_DETAIL_FAILED = '[MarketData] load market data detail failed',

    LOAD_MARKET_DATA_PRICE_SOURCE = '[MarketData] load market data price source',
    LOAD_MARKET_DATA_PRICE_SOURCE_COMPLETE = '[MarketData] load market data price source complete',
    LOAD_MARKET_DATA_PRICE_SOURCE_FAILED = '[MarketData] load market data price source failed',

    LOAD_MARKET_DATA_TYPE = '[MarketData] load market data type',
    LOAD_MARKET_DATA_TYPE_COMPLETE = '[MarketData] load market data type complete',
    LOAD_MARKET_DATA_TYPE_FAILED = '[MarketData] load market data type failed',

    LOAD_MARKET_DATA_TIMESERIES = '[MarketData] load market data timeseries',
    LOAD_MARKET_DATA_TIMESERIES_COMPLETE = '[MarketData] load market data timeseries complete',
    LOAD_MARKET_DATA_TIMESERIES_FAILED = '[MarketData] load market data timeseries failed',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class SearchMarketData implements Action {
    readonly type = MarketDataActionTypes.SEARCH_MARKET_DATA;

    constructor(public payload: fromModels.IMarketDataSearch) { }
}

export class SearchMarketDataComplete implements Action {
    readonly type = MarketDataActionTypes.SEARCH_MARKET_DATA_COMPLETE;

    constructor(public payload: any[]) { }
}

export class SearchMarketDataFailed implements Action {
    readonly type = MarketDataActionTypes.SEARCH_MARKET_DATA_FAILED;

    constructor(public payload: string) { }
}

export class BackfillMarketData implements Action {
    readonly type = MarketDataActionTypes.BACKFILL_MARKET_DATA;

    constructor(public payload: fromModels.IMarketDataBackfill) { }
}

export class BackfillMarketDataComplete implements Action {
    readonly type = MarketDataActionTypes.BACKFILL_MARKET_DATA_COMPLETE;

    constructor(public payload: any[]) { }
}

export class BackfillMarketDataFailed implements Action {
    readonly type = MarketDataActionTypes.BACKFILL_MARKET_DATA_FAILED;

    constructor(public payload: string) { }
}

// -----------------------------------------------------------------------------------

export class LoadMarketDataDetail implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_DETAIL;

    constructor(public payload: fromModels.IMarketDataDetailReq) { }
}

export class LoadMarketDataDetailComplete implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_DETAIL_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadMarketDataDetailFailed implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_DETAIL_FAILED;

    constructor(public payload: string) { }
}







export class LoadMarketDataPriceSource implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_PRICE_SOURCE;
}

export class LoadMarketDataPriceSourceComplete implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_PRICE_SOURCE_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadMarketDataPriceSourceFailed implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_PRICE_SOURCE_FAILED;

    constructor(public payload: string) { }
}





export class LoadMarketDataType implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_TYPE;

    constructor(public payload: number) { }
}

export class LoadMarketDataTypeComplete implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_TYPE_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadMarketDataTypeFailed implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_TYPE_FAILED;

    constructor(public payload: string) { }
}







export class LoadMarketDataTimeseries implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_TIMESERIES;

    constructor(public payload: number) { }
}

export class LoadMarketDataTimeseriesComplete implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_TIMESERIES_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadMarketDataTimeseriesFailed implements Action {
    readonly type = MarketDataActionTypes.LOAD_MARKET_DATA_TIMESERIES_FAILED;

    constructor(public payload: string) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type MarketDataActions
    = SearchMarketData
    | SearchMarketDataComplete
    | SearchMarketDataFailed
    
    | BackfillMarketData
    | BackfillMarketDataComplete
    | BackfillMarketDataFailed
    
    | LoadMarketDataDetail
    | LoadMarketDataDetailComplete
    | LoadMarketDataDetailFailed

    | LoadMarketDataPriceSource
    | LoadMarketDataPriceSourceComplete
    | LoadMarketDataPriceSourceFailed

    | LoadMarketDataType
    | LoadMarketDataTypeComplete
    | LoadMarketDataTypeFailed

    | LoadMarketDataTimeseries
    | LoadMarketDataTimeseriesComplete
    | LoadMarketDataTimeseriesFailed;
