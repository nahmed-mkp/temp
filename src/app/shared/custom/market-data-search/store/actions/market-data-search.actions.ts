import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum MarketDataSearchActionTypes {

    LOAD_PROVIDERS = '[MarketDataSearch] Load providers',
    LOAD_PROVIDERS_COMPLETE = '[MarketDataSearch] Load providers complete',
    LOAD_PROVIDERS_FAILED = '[MarketDataSearch] Load providers failed',

    UPDATE_CRITERIA = '[MarketDataSearch] Update criteria',

    SEARCH_MARKET_DATA = '[MarketDataSearch] Search Market Data',
    SEARCH_MARKET_DATA_COMPLETE = '[MarketDataSearch] Search Market Data Complete',
    SEARCH_MARKET_DATA_FAILED = '[MarketDataSearch] Search Market Data Failed',

    SEARCH_SECURITY_FOR_TIMESERIES_EXPORTER = '[MarketDataSearch] Search Security for timeseries exporter',
    SEARCH_SECURITY_FOR_TIMESERIES_EXPORTER_COMPLETE = '[MarketDataSearch] Search Security for timeseries exporter complete',
    SEARCH_SECURITY_FOR_TIMESERIES_EXPORTER_FAILED = '[MarketDataSearch] Search Security for timeseries exporter failed',

    GET_MARKET_DATA_FOR_SECURITY = '[MarketDataSearch] Get Market Data for security',
    GET_MARKET_DATA_FOR_SECURITY_COMPLETE = '[MarketDataSearch] Get Market Data for security complete',
    GET_MARKET_DATA_FOR_SECURITY_FAILED = '[MarketDataSearch] Get Market Data for security failed',

    SEARCH_MARKET_DATA_FOR_TIMESERIES_EXPORTER = '[MarketDataSearch] Search Market Data for timeseries exporter',
    SEARCH_MARKET_DATA_FOR_TIMESERIES_EXPORTER_COMPLETE = '[MarketDataSearch] Search Market Data for timeseries exporter Complete',
    SEARCH_MARKET_DATA_FOR_TIMESERIES_EXPORTER_FAILED = '[MarketDataSearch] Search Market Data for timeseries exporter Failed',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

 export class LoadProviders implements Action {
    readonly type = MarketDataSearchActionTypes.LOAD_PROVIDERS;
 }

 export class LoadProvidersComplete implements Action {
    readonly type = MarketDataSearchActionTypes.LOAD_PROVIDERS_COMPLETE;

    constructor(public payload: fromModels.MarketDataProvider[]) { }
 }

 export class LoadProvidersFailed implements Action {
    readonly type = MarketDataSearchActionTypes.LOAD_PROVIDERS_FAILED;

    constructor(public payload: string) { }
 }

 export class UpdateCriteria implements Action {
     readonly type = MarketDataSearchActionTypes.UPDATE_CRITERIA;

     constructor(public payload: fromModels.MarketDataSearchCriteria) {}
 }

export class SearchMarketData implements Action {
    readonly type = MarketDataSearchActionTypes.SEARCH_MARKET_DATA;

    constructor(public payload: fromModels.MarketDataSearchCriteria) { }
}

export class SearchMarketDataComplete implements Action {
    readonly type = MarketDataSearchActionTypes.SEARCH_MARKET_DATA_COMPLETE;

    constructor(public payload: fromModels.MarketDataSearchResult[]) { }
}

export class SearchMarketDataFailed implements Action {
    readonly type = MarketDataSearchActionTypes.SEARCH_MARKET_DATA_FAILED;

    constructor(public payload: string) { }
}


export class SearchMarketDataForTimeseriesExporter implements Action {
    readonly type = MarketDataSearchActionTypes.SEARCH_MARKET_DATA_FOR_TIMESERIES_EXPORTER;

    constructor(public payload: fromModels.MarketDataSearchCriteriaForTimeseriesExporter) { }
}

export class SearchMarketDataForTimeseriesExporterComplete implements Action {
    readonly type = MarketDataSearchActionTypes.SEARCH_MARKET_DATA_FOR_TIMESERIES_EXPORTER_COMPLETE;

    constructor(public payload: fromModels.MarketDataForTimeseriesExporter[]) { }
}

export class SearchMarketDataForTimeseriesExporterFailed implements Action {
    readonly type = MarketDataSearchActionTypes.SEARCH_MARKET_DATA_FOR_TIMESERIES_EXPORTER_FAILED;

    constructor(public payload: string) { }
}

export class SearchSecurityForTimeseriesExporter implements Action {
    readonly type = MarketDataSearchActionTypes.SEARCH_SECURITY_FOR_TIMESERIES_EXPORTER;

    constructor(public payload: fromModels.SecuritySearchCriteriaForTimeseriesExporter) { }
}

export class SearchSecurityForTimeseriesExporterComplete implements Action {
    readonly type = MarketDataSearchActionTypes.SEARCH_SECURITY_FOR_TIMESERIES_EXPORTER_COMPLETE;

    constructor(public payload: fromModels.SecurityForTimeseriesExporter[]) { }
}

export class SearchSecurityForTimeseriesExporterFailed implements Action {
    readonly type = MarketDataSearchActionTypes.SEARCH_SECURITY_FOR_TIMESERIES_EXPORTER_FAILED;

    constructor(public payload: string) { }
}


export class GetMarketDataForSecurity implements Action {
    readonly type = MarketDataSearchActionTypes.GET_MARKET_DATA_FOR_SECURITY;

    constructor(public payload: number) { }
}

export class GetMarketDataForSecurityComplete implements Action {
    readonly type = MarketDataSearchActionTypes.GET_MARKET_DATA_FOR_SECURITY_COMPLETE;

    constructor(public payload: fromModels.MarketDataForTimeseriesExporter[]) { }
}

export class GetMarketDataForSecurityFailed implements Action {
    readonly type = MarketDataSearchActionTypes.GET_MARKET_DATA_FOR_SECURITY_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type MarketDataSearchActions
    = LoadProviders
    | LoadProvidersComplete
    | LoadProvidersFailed

    | UpdateCriteria

    | SearchMarketData
    | SearchMarketDataComplete
    | SearchMarketDataFailed

    | SearchSecurityForTimeseriesExporter
    | SearchSecurityForTimeseriesExporterComplete
    | SearchSecurityForTimeseriesExporterFailed

    | GetMarketDataForSecurity
    | GetMarketDataForSecurityComplete
    | GetMarketDataForSecurityFailed

    | SearchMarketDataForTimeseriesExporter
    | SearchMarketDataForTimeseriesExporterComplete
    | SearchMarketDataForTimeseriesExporterFailed;
