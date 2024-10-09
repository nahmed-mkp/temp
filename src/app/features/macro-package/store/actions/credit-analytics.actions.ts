import { Action } from '@ngrx/store';

import * as fromModels from './../../models/credit.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum CreditAnalyticsActionTypes {

    LOAD_CREDIT_ANALYTICS_DATES = '[CreditAnalytics] Load Dates',
    LOAD_CREDIT_ANALYTICS_DATES_COMPLETE = '[Credit Analytics] Load Dates complete' ,
    LOAD_CREDIT_ANALYTICS_DATES_FAILED = '[CreditAnalytics] Load Dates failed',

    LOAD_CREDIT_INDICES = '[CreditAnalytics] Load Credit Indices',
    LOAD_CREDIT_INDICES_COMPLETE = '[CreditAnalytics] Load Credit Indices Complete',
    LOAD_CREDIT_INDICES_FAILED = '[CreditAnalytics] Load Credit Indices Failed',

    LOAD_INDEX_CONSTITUENTS = '[CreditAnalytics] Load Index Constituents',
    LOAD_INDEX_CONSTITUENTS_COMPLETE = '[CreditAnalytics] Load Index Constituents',
    LOAD_INDEX_CONSTITUENTS_FAILED = '[CreditAnalytics] Load Index Constituents',

    LOAD_SECTOR_WEIGHTS = '[CreditAnalytics] Load Sector Weights',
    LOAD_SECTOR_WEIGHTS_COMPLETE = '[CreditAnalytics] Load Sector Weights',
    LOAD_SECTOR_WEIGHTS_FAILED = '[CreditAnalytics] Load Sector Weights',

    LOAD_CREDIT_ANALYTICS = '[CreditAnalytics] Load credit analytics',
    LOAD_CREDIT_ANALYTICS_COMPLETE = '[CreditAnalytics] Load credit analytics complete',
    LOAD_CREDIT_ANALYTICS_FAILED = '[CreditAnalytics] Load credit analytics failed',

    LOAD_CREDIT_TIMESERIES = '[CreditAnalytics] Load credit timeseries',
    LOAD_CREDIT_TIMESERIES_COMPLETE = '[CreditAnalytics] Load credit timeseries complete',
    LOAD_CREDIT_TIMESERIES_FAILED = '[CreditAnalytics] Load credit timeseries failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

 export class LoadCreditIndices implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_INDICES;
}

export class LoadCreditIndicesComplete implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_INDICES_COMPLETE;

    constructor(public payload: fromModels.ICreditIndex[]) { }
}

export class LoadCreditIndicesFailed implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_INDICES_FAILED;

    constructor(public payload: string) { }
}

export class LoadCreditAnalyticsDates implements Action {
    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS_DATES;
}

export class LoadCreditAnalyticsDatesComplete  implements Action {
    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS_DATES_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadCreditAnalyticsDatesFailed implements Action {
    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS_DATES_FAILED;

    constructor(public payload: string) { }
}

export class LoadIndexConstituents implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_INDEX_CONSTITUENTS;

    constructor(public payload: string) { }
}

export class LoadIndexConstituentsComplete implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_INDEX_CONSTITUENTS_COMPLETE;

    constructor(public payload: fromModels.ICreditIndexConstituent[]) { }
}

export class LoadIndexConstituentsFailed implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_INDEX_CONSTITUENTS_FAILED;

    constructor(public payload: string) { }
}

export class LoadSectorWeights implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_SECTOR_WEIGHTS;

    constructor(public payload: string) { }
}

export class LoadSectorWeightsComplete implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_SECTOR_WEIGHTS_COMPLETE;

    constructor(public payload: fromModels.ICreditSectorWeight[]) { }
}

export class LoadSectorWeightsFailed implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_SECTOR_WEIGHTS_FAILED;

    constructor(public payload: string) { }
}

export class LoadCreditAnalytics implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS;

    constructor(public payload: string) { }
}

export class LoadCreditAnalyticsComplete implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadCreditAnalyticsFailed implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS_FAILED;

    constructor(public payload: string) { }
}

export class LoadCreditTimeseries implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_TIMESERIES;

    constructor(public payload: string) { }
}

export class LoadCreditTimeseriesComplete implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_TIMESERIES_COMPLETE;

    constructor(public payload: {[date: string]: any}) { }
}

export class LoadCreditTimeseriesFailed implements Action {

    readonly type = CreditAnalyticsActionTypes.LOAD_CREDIT_TIMESERIES_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CreditAnalyticsActions

    = LoadCreditIndices
    | LoadCreditIndicesComplete
    | LoadCreditIndicesFailed

    | LoadCreditAnalyticsDates
    | LoadCreditAnalyticsDatesComplete
    | LoadCreditAnalyticsDatesFailed

    | LoadIndexConstituents
    | LoadIndexConstituentsComplete
    | LoadIndexConstituentsFailed

    | LoadSectorWeights
    | LoadSectorWeightsComplete
    | LoadSectorWeightsFailed

    | LoadCreditAnalytics
    | LoadCreditAnalyticsComplete
    | LoadCreditAnalyticsFailed

    | LoadCreditTimeseries
    | LoadCreditTimeseriesComplete
    | LoadCreditTimeseriesFailed;
