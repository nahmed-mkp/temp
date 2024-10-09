import { Action } from '@ngrx/store';
import { BondChartRequestRow } from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum MarketDataDashboardActionTypes {

    LOAD_META_DATA = '[MarketDataDashboard] Load meta data',
    LOAD_META_DATA_COMPLETE = '[MarketDataDashboard] Load meta data complete',
    LOAD_META_DATA_FAILED = '[MarketDataDashboard] Load meta data failed',

    LOAD_DASHBOARD_DATA = '[MarketDataDashboard] Load dashboard data',
    LOAD_DASHBOARD_DATA_COMPLETE = '[MarketDataDashboard] Load dashboard data complete ',
    LOAD_DASHBOARD_DATA_FAILED = '[MarketDataDashboard] Load dashboard data failed',

    SUBSCRIBE_TO_DASHBOARD_DATA = '[MarketDataDashboard] Subscribe to dashboard data',
    DASHBOARD_DATA_ARRIVED = '[MarketDataDashboard] Dashboard data arrived',
    SUBSCRIBE_TO_DASHBOARD_DATA_FAILED = '[MarketDataDashboard] Subscribe to dashboard data failed',

    UNSUBSCRIBE_FROM_DASHBOARD_DATA = '[MarketDataDashboard] Unsubscribe from dashboard data',

    LOAD_CHART_DATA = '[MarketDataDashboard] Load chart data',
    LOAD_CHART_DATA_COMPLETE = '[MarketDataDashboard] Load chart data complete ',
    LOAD_CHART_DATA_FAILED = '[MarketDataDashboard] Load chart data failed',

    LOAD_CHART_SPREAD_DATA = '[MarketDataDashboard] Load chart spread data',
    LOAD_CHART_SPREAD_DATA_COMPLETE = '[MarketDataDashboard] Load chart spread data complete ',
    LOAD_CHART_SPREAD_DATA_FAILED = '[MarketDataDashboard] Load chart spread data failed',

    ADD_BILLS_SHORT_COUPONS_CHART_DATA = '[MarketDataDashboard] Add bills short coupons chart data',

}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadDashboardMetaData implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_META_DATA;
}

export class LoadDashboardMetaDataComplete implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_META_DATA_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadDashboardMetaDataFailed implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_META_DATA_FAILED;

    constructor(public payload: string) { }
}

export class SubscribeToDashboardData implements Action {
    readonly type = MarketDataDashboardActionTypes.SUBSCRIBE_TO_DASHBOARD_DATA;

    constructor(public dashboardName: string) { }
}

export class DashboardDataArrived implements Action {
    readonly type = MarketDataDashboardActionTypes.DASHBOARD_DATA_ARRIVED;

    constructor(public dashboardName: string, public payload: any[]) { }
}

export class SubscribeToDashboardDataFailed implements Action {
    readonly type = MarketDataDashboardActionTypes.SUBSCRIBE_TO_DASHBOARD_DATA_FAILED;

    constructor(public dashboardName: string, public payload: string) { }
}

export class UnsubscribeFromDashboardData implements Action {
    readonly type = MarketDataDashboardActionTypes.UNSUBSCRIBE_FROM_DASHBOARD_DATA;
}

export class LoadDashboardData implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_DASHBOARD_DATA;

    constructor(public dashboardName: string) { }
}

export class LoadDashboardDataComplete implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_DASHBOARD_DATA_COMPLETE;

    constructor(public dashboardName: string, public payload: any[]) { }
}

export class LoadDashboardDataFailed implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_DASHBOARD_DATA_FAILED;

    constructor(public dashboardName: string, public payload: string) { }
}

export class LoadChartData implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_CHART_DATA;

    constructor(public payload: BondChartRequestRow[]) { }
}

export class LoadChartDataComplete implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_CHART_DATA_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadChartDataFailed implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_CHART_DATA_FAILED

    constructor(public payload: string) { }
}

export class LoadChartSpreadData implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_CHART_SPREAD_DATA;

    constructor(public payload: BondChartRequestRow[]) { }
}

export class LoadChartSpreadDataComplete implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_CHART_SPREAD_DATA_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadChartSpreadDataFailed implements Action {
    readonly type = MarketDataDashboardActionTypes.LOAD_CHART_SPREAD_DATA_FAILED

    constructor(public payload: string) { }
}

export class AddBillsChartCouponsChartData implements Action {
    readonly type = MarketDataDashboardActionTypes.ADD_BILLS_SHORT_COUPONS_CHART_DATA

    constructor(public payload: { title: string, type: string, data: any[]}) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type MarketDataDashboardActions

    = LoadDashboardMetaData
    | LoadDashboardMetaDataComplete
    | LoadDashboardMetaDataFailed

    | LoadDashboardData
    | LoadDashboardDataComplete
    | LoadDashboardDataFailed

    | SubscribeToDashboardData
    | DashboardDataArrived
    | SubscribeToDashboardDataFailed

    | UnsubscribeFromDashboardData

    | LoadChartData
    | LoadChartDataComplete
    | LoadChartDataFailed
    
    | LoadChartSpreadData
    | LoadChartSpreadDataComplete
    | LoadChartSpreadDataFailed

    | AddBillsChartCouponsChartData
