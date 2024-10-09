import { Action } from '@ngrx/store';

import * as fromModels from './../../models/equities.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum EquitiesAnalyticsActionTypes {

    SET_ACTIVE_EQUITY_CATEGORY = '[EquitiesAnalytics] Set active category',

    LOAD_EQUITY_ANALYTICS_DATES = '[EquitiesAnalytics] Load equity analytics dates', 
    LOAD_EQUITY_ANALYTICS_DATES_COMPLETE = '[EquitiesAnalytics] Load equity analytics dates complete',
    LOAD_EQUITY_ANALYTICS_DATES_FAILED = '[EquitiesAnalytics] Load equity analytics dates failed',

    LOAD_EQUITY_ANALYTICS = '[EquitiesAnalytics] Load analytics',
    LOAD_EQUITY_ANALYTICS_COMPLETE = '[EquitiesAnalytics] Load analytics complete',
    LOAD_EQUITY_ANALYTICS_FAILED = '[EquitiesAnalytics] Load analytics failed',

    LOAD_EQUITY_INDEX_TIMESERIES = '[EquitiesAnalytics] Load equity index timeseries',
    LOAD_EQUITY_INDEX_TIMESERIES_COMPLETE = '[EquitiesAnalytics] Load equity index timeseries complete',
    LOAD_EQUITY_INDEX_TIMESERIES_FAILED = '[EquitiesAnalytics] Load equity index timeseries failed',

    LOAD_EQUITY_SECTOR_TIMESERIES = '[EquitiesAnalytics] Load equity sector timeseries',
    LOAD_EQUITY_SECTOR_TIMESERIES_COMPLETE = '[EquitiesAnalytics] Load equity sector timeseries complete',
    LOAD_EQUITY_SECTOR_TIMESERIES_FAILED = '[EquitiesAnalytics] Load equity sector timeseries failed',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadEquityAnalyticsDates implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS_DATES;
}

export class LoadEquityAnalyticsDatesComplete implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS_DATES_COMPLETE;

    constructor(public payload: string[]) {}
}

export class LoadEquityAnalyticsDatesFailed implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS_DATES_FAILED;

    constructor(public payload: string) { }
}

export class LoadEquityAnalytics implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS;

    constructor(public payload: string) { }
}

export class LoadEquityAnalyticsComplete implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadEquityAnalyticsFailed implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS_FAILED;

    constructor(public payload: string) { }
}

export class LoadEquityIndexTimeseries implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_INDEX_TIMESERIES;

    constructor(public payload: fromModels.IEquityIndexTimeseriesRequest) { }
}

export class LoadEquityIndexTimeseriesComplete implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_INDEX_TIMESERIES_COMPLETE;

    constructor(public payload: fromModels.IEquitiesIndexTimeseriesResponse) { }
}

export class LoadEquityIndexTimeseriesFailed implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_INDEX_TIMESERIES_FAILED;

    constructor(public payload: string) { }
}

export class LoadEquitySectorTimeseries implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_SECTOR_TIMESERIES;

    constructor(public payload: fromModels.IEquitySectorTimeseriesRequest) { }
}

export class LoadEquitySectorTimeseriesComplete implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_SECTOR_TIMESERIES_COMPLETE;

    constructor(public payload: fromModels.IEquitySectorTimeseriesResponse) { }
}

export class LoadEquitySectorTimeseriesFailed implements Action {

    readonly type = EquitiesAnalyticsActionTypes.LOAD_EQUITY_SECTOR_TIMESERIES_FAILED;

    constructor(public payload: string) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type EquitiesAnalyticsActions
    = LoadEquityAnalyticsDates
    | LoadEquityAnalyticsDatesComplete
    | LoadEquityAnalyticsDatesFailed

    | LoadEquityAnalytics
    | LoadEquityAnalyticsComplete
    | LoadEquityAnalyticsFailed

    | LoadEquityIndexTimeseries
    | LoadEquityIndexTimeseriesComplete
    | LoadEquityIndexTimeseriesFailed

    | LoadEquitySectorTimeseries
    | LoadEquitySectorTimeseriesComplete
    | LoadEquitySectorTimeseriesFailed;

