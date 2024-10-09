import { Action } from '@ngrx/store';

import * as fromModels from '../../models/credit.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum CommoditiesAnalyticsActionTypes {

    LOAD_COMMODITIES_ANALYTICS_DATES = '[CommoditiesAnalytics] Load Commodities Dates',
    LOAD_COMMODITIES_ANALYTICS_DATES_COMPLETE = '[Commodities Analytics] Load Commodities Dates complete' ,
    LOAD_COMMODITIES_ANALYTICS_DATES_FAILED = '[CommoditiesAnalytics] Load Commodities Dates failed',

    LOAD_COMMODITIES_ANALYTICS = '[CommoditiesAnalytics] Load Commodities analytics',
    LOAD_COMMODITIES_ANALYTICS_COMPLETE = '[CommoditiesAnalytics] Load Commodities analytics complete',
    LOAD_COMMODITIES_ANALYTICS_FAILED = '[CommoditiesAnalytics] Load Commodities analytics failed',

    LOAD_COMMODITIES_TIMESERIES = '[CommoditiesAnalytics] Load Commodities timeseries',
    LOAD_COMMODITIES_TIMESERIES_COMPLETE = '[CommoditiesAnalytics] Load Commodities timeseries complete',
    LOAD_COMMODITIES_TIMESERIES_FAILED = '[CommoditiesAnalytics] Load Commodities timeseries failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadCommoditiesAnalyticsDates implements Action {
    readonly type = CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS_DATES;
}

export class LoadCommoditiesAnalyticsDatesComplete  implements Action {
    readonly type = CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS_DATES_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadCommoditiesAnalyticsDatesFailed implements Action {
    readonly type = CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS_DATES_FAILED;

    constructor(public payload: string) { }
}

export class LoadCommoditiesAnalytics implements Action {

    readonly type = CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS;

    constructor(public payload: string) { }
}

export class LoadCommoditiesAnalyticsComplete implements Action {

    readonly type = CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadCommoditiesAnalyticsFailed implements Action {

    readonly type = CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS_FAILED;

    constructor(public payload: string) { }
}

export class LoadCommoditiesTimeseries implements Action {

    readonly type = CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_TIMESERIES;

    constructor(public payload: string) { }
}

export class LoadCommoditiesTimeseriesComplete implements Action {

    readonly type = CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_TIMESERIES_COMPLETE;

    constructor(public payload: {[date: string]: any}) { }
}

export class LoadCommoditiesTimeseriesFailed implements Action {

    readonly type = CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_TIMESERIES_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CommoditiesAnalyticsActions

    = LoadCommoditiesAnalyticsDates
    | LoadCommoditiesAnalyticsDatesComplete
    | LoadCommoditiesAnalyticsDatesFailed

    | LoadCommoditiesAnalytics
    | LoadCommoditiesAnalyticsComplete
    | LoadCommoditiesAnalyticsFailed

    | LoadCommoditiesTimeseries
    | LoadCommoditiesTimeseriesComplete
    | LoadCommoditiesTimeseriesFailed;
