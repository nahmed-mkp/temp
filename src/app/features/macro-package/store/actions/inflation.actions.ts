import { Action } from '@ngrx/store';

import * as fromModels from '../../models/credit.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum InflationAnalyticsActionTypes {

    LOAD_INFLATION_ANALYTICS_DATES = '[InflationAnalytics] Load inflation Dates',
    LOAD_INFLATION_ANALYTICS_DATES_COMPLETE = '[Inflation Analytics] Load inflation Dates complete' ,
    LOAD_INFLATION_ANALYTICS_DATES_FAILED = '[InflationAnalytics] Load inflation Dates failed',

    LOAD_INFLATION_ANALYTICS = '[InflationAnalytics] Load Inflation analytics',
    LOAD_INFLATION_ANALYTICS_COMPLETE = '[InflationAnalytics] Load Inflation analytics complete',
    LOAD_INFLATION_ANALYTICS_FAILED = '[InflationAnalytics] Load Inflation analytics failed',

    LOAD_INFLATION_TIMESERIES = '[InflationAnalytics] Load Inflation timeseries',
    LOAD_INFLATION_TIMESERIES_COMPLETE = '[InflationAnalytics] Load Inflation timeseries complete',
    LOAD_INFLATION_TIMESERIES_FAILED = '[InflationAnalytics] Load Inflation timeseries failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadInflationAnalyticsDates implements Action {
    readonly type = InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS_DATES;
}

export class LoadInflationAnalyticsDatesComplete  implements Action {
    readonly type = InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS_DATES_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadInflationAnalyticsDatesFailed implements Action {
    readonly type = InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS_DATES_FAILED;

    constructor(public payload: string) { }
}

export class LoadInflationAnalytics implements Action {

    readonly type = InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS;

    constructor(public payload: string) { }
}

export class LoadInflationAnalyticsComplete implements Action {

    readonly type = InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadInflationAnalyticsFailed implements Action {

    readonly type = InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS_FAILED;

    constructor(public payload: string) { }
}

export class LoadInflationTimeseries implements Action {

    readonly type = InflationAnalyticsActionTypes.LOAD_INFLATION_TIMESERIES;

    constructor(public payload: string) { }
}

export class LoadInflationTimeseriesComplete implements Action {

    readonly type = InflationAnalyticsActionTypes.LOAD_INFLATION_TIMESERIES_COMPLETE;

    constructor(public payload: {[date: string]: any}) { }
}

export class LoadInflationTimeseriesFailed implements Action {

    readonly type = InflationAnalyticsActionTypes.LOAD_INFLATION_TIMESERIES_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type InflationAnalyticsActions

    = LoadInflationAnalyticsDates
    | LoadInflationAnalyticsDatesComplete
    | LoadInflationAnalyticsDatesFailed

    | LoadInflationAnalytics
    | LoadInflationAnalyticsComplete
    | LoadInflationAnalyticsFailed

    | LoadInflationTimeseries
    | LoadInflationTimeseriesComplete
    | LoadInflationTimeseriesFailed;
