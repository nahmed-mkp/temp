
import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

export const SET_ACTIVE_MODE = '[TBAReports] Set Active Mode';

export const LOAD_TIMESERIES = '[TBAReports] Load timeseries';
export const LOAD_TIMESERIES_COMPLETE = '[TBAReports] Load timeseries complete';
export const LOAD_TIMESERIES_FAILED = '[TBAReports] Load timeseries failed';


export const LOAD_COUPONS = '[TBAReports] Load coupons';
export const LOAD_COUPONS_COMPLETE = '[TBAReports] Load coupons complete';
export const LOAD_COUPONS_FAILED = '[TBAReports] Load coupons failed';

export const SELECT_TIMESERIES = '[TBAReports] Select Timeseries';
export const CHANGE_PLOT_TYPE = '[TBAReports] Change Plot type';

export const REFRESH_CACHE = '[TBAReports] Refresh Cache';
export const REFRESH_CACHE_COMPLETE = '[TBAReports] Refresh Cache complete';
export const REFRESH_CACHE_FAILED = '[TBAReports] Refresh Cache failed';
export const CLEAR_CACHE_STATUS = '[TBAReports] Clear cache status';

export const LOAD_CHART_DATA = '[TBAReports] Load chart data';
export const LOAD_CHART_DATA_COMPLETE = '[TBAReports] Load chart data complete';
export const LOAD_CHART_DATA_FAILED = '[TBAReports] Load chart data failed';

export const LOAD_COMPARISON_CHART_DATA = '[TBAReports] Load comparison chart data';
export const LOAD_COMPARISON_CHART_DATA_COMPLETE = '[TBAReports] Load comparison chart data complete';
export const LOAD_COMPARISON_CHART_DATA_FAILED = '[TBAReports] Load comparison chart data failed';

export const RENDER_CHART_COMPLETE = '[TBAReports] Render chart complete';
export const RENDER_CHART_FAILED = '[TBAReports] Render chart failed';

export const RENDER_COMPARISON_CHART_COMPLETE = '[TBAReports] Render comparison chart complete';
export const RENDER_COMPARISON_CHART_FAILED = '[TBAReports] Render chart failed';

export const COMPARE_COUPONS = '[TBAReports] Compare coupons';
export const COMPARE_COUPONS_COMPLETE = '[TBAReports] Compare coupons complete';
export const COMPARE_COUPONS_FAILED = '[TBAReports] Compare coupons failed';

export const CLEAR_COMPARISON = '[TBAReports] Clear comparison';


export const LOAD_METRIC_TYPES = '[TBAReports] Load metric types';
export const LOAD_METRIC_TYPES_COMPLETE = '[TBAReports] Load metric types complete';
export const LOAD_METRIC_TYPES_FAILED = '[TBAReports] Load metric types failed';
export const SELECT_METRIC_TYPES = '[TBAReports] Select metric types';

export const LOAD_TRACKER_TIMESTAMP = '[TBAReports] Load tracker timestamp';
export const LOAD_TRACKER_TIMESTAMP_COMPLETE = '[TBAReports] Load tracker timestamp complete';
export const LOAD_TRACKER_TIMESTAMP_FAILED = '[TBAReports] Load tracker timestamp failed';

export const DOWNLOAD_TRACKERS = '[TBAReports] Download trackers';
export const DOWNLOAD_TRACKERS_COMPLETE = '[TBAReports] Download trackers complete';
export const DOWNLOAD_TRACKERS_FAILED = '[TBAReports] Download trackers failed';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful type
 * checking in reducer functions.
 */
export class SetActiveMode implements Action {
    readonly type = SET_ACTIVE_MODE;
    constructor(public payload: string) {}
}


export class LoadTimeseries implements Action {
    readonly  type = LOAD_TIMESERIES;
    constructor() {}
}

export class LoadTimeseriesComplete implements Action {
    readonly type = LOAD_TIMESERIES_COMPLETE;

    constructor(public payload: fromModels.OASTimeseries[]) {}
}

export class LoadTimeseriesFailed implements Action {
    readonly type = LOAD_TIMESERIES_FAILED;

    constructor(public payload?: any) {}
}

export class SelectTimeseries implements Action {
    readonly type = SELECT_TIMESERIES;

    constructor(public payload: fromModels.OASTimeseries) {}
}

export class LoadCoupons implements Action {
    readonly  type = LOAD_COUPONS;
    constructor() {}
}

export class LoadCouponsComplete implements Action {
    readonly type = LOAD_COUPONS_COMPLETE;

    constructor(public payload: fromModels.OASCoupon[]) {}
}

export class LoadCouponsFailed implements Action {
    readonly type = LOAD_COUPONS_FAILED;

    constructor(public payload?: any) {}
}

export class ChangePlotType implements Action {
    readonly type = CHANGE_PLOT_TYPE;

    constructor(public payload: {type: string}) {}
}

export class RefreshCache implements Action {
    readonly type = REFRESH_CACHE;

    constructor(public payload: string) {}
}

export class RefreshCacheComplete implements Action {
    readonly type = REFRESH_CACHE_COMPLETE;

    constructor(public payload: fromModels.CacheDataResponse) { }
}

export class RefreshCacheFailed implements Action {
    readonly type = REFRESH_CACHE_FAILED;

    constructor(public payload: fromModels.CacheDataResponse) { }
}

export class ClearCacheStatus implements Action {
    readonly type = CLEAR_CACHE_STATUS;

    constructor(public payload: string) {}
}

export class LoadChartData implements Action {
    readonly type = LOAD_CHART_DATA;

    constructor(public payload: fromModels.PlotDataRequest) { }
}

export class LoadChartDataComplete implements Action {
    readonly type = LOAD_CHART_DATA_COMPLETE;

    constructor(public payload: fromModels.PlotDataResult) {}
}

export class LoadChartDataFailed implements Action {
    readonly type = LOAD_CHART_DATA_FAILED;

    constructor(public payload: any) { }
}


export class LoadComparisonChartData implements Action {
    readonly type = LOAD_COMPARISON_CHART_DATA;

    constructor(public payload: fromModels.PlotDataRequest) { }
}

export class LoadComparisonChartDataComplete implements Action {
    readonly type = LOAD_COMPARISON_CHART_DATA_COMPLETE;

    constructor(public payload: fromModels.PlotDataResult) {}
}

export class LoadComparisonChartDataFailed implements Action {
    readonly type = LOAD_COMPARISON_CHART_DATA_FAILED;

    constructor(public payload: any) { }
}

export class RenderChartComplete implements Action {
    readonly type = RENDER_CHART_COMPLETE;

    constructor(public payload: fromModels.PlotDataResult) { }
}

export class RenderChartFailed implements Action {
    readonly type = RENDER_CHART_FAILED;

    constructor(public payload: any) { }
}

export class RenderComparisonChartComplete implements Action {
    readonly type = RENDER_COMPARISON_CHART_COMPLETE;

    constructor(public payload: fromModels.PlotDataResult) { }
}

export class RenderComparisonChartFailed implements Action {
    readonly type = RENDER_COMPARISON_CHART_FAILED;

    constructor(public payload: any) { }
}

export class CompareCoupons implements Action {
    readonly type = COMPARE_COUPONS;

    constructor(public payload: fromModels.OASCoupon[]) {}
}

export class CompareCouponsComplete implements Action {
    readonly type = COMPARE_COUPONS_COMPLETE;

    constructor(public payload: any) { }
}

export class CompareCouponsFailed implements Action {
    readonly type = COMPARE_COUPONS_FAILED;

    constructor(public payload?: any) {}
}

export class ClearComparison implements Action {
    readonly type = CLEAR_COMPARISON;

    constructor(public payload: fromModels.OASCoupon) { }
}




export class LoadMetricTypes implements Action {
    readonly type = LOAD_METRIC_TYPES;
    constructor() {}
}

export class LoadMetricTypesComplete implements Action {
    readonly type = LOAD_METRIC_TYPES_COMPLETE;
    
    constructor(public payload: fromModels.MetricType[]) {} 
}

export class LoadMetricTypesFailded implements Action {
    readonly type = LOAD_METRIC_TYPES_FAILED;

    constructor(public payload?: any) {}
}

export class SelectMetricType implements Action {
    readonly type = SELECT_METRIC_TYPES;

    constructor(public payload: string) {}
}




export class LoadTrackerTimestamp implements Action {
    readonly type = LOAD_TRACKER_TIMESTAMP;
    
    constructor() {}
}

export class LoadTrackerTimestampComplete implements Action {
    readonly type = LOAD_TRACKER_TIMESTAMP_COMPLETE;
    
    constructor(public payload: string) {}
}

export class LoadTrackerTimestampFailed implements Action {
    readonly type = LOAD_TRACKER_TIMESTAMP_FAILED;
    
    constructor(public payload?: string) {}
}



export class DownloadTrackers implements Action {
    readonly type = DOWNLOAD_TRACKERS;

    constructor() {}
}

export class DownloadTrackersComplete implements Action {
    readonly type = DOWNLOAD_TRACKERS_COMPLETE;

    constructor(public payload: any) {}
}

export class DownloadTrackersFailed implements Action {
    readonly type = DOWNLOAD_TRACKERS_FAILED;

    constructor(public payload?: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TimeseriesActions
    = SetActiveMode
    | LoadTimeseries
    | LoadTimeseriesComplete
    | LoadTimeseriesFailed
    | SelectTimeseries

    | LoadCoupons
    | LoadCouponsComplete
    | LoadCouponsFailed

    | ChangePlotType

    | RefreshCache
    | RefreshCacheComplete
    | RefreshCacheFailed
    | ClearCacheStatus

    | LoadChartData
    | LoadChartDataComplete
    | LoadChartDataFailed

    | LoadComparisonChartData
    | LoadComparisonChartDataComplete
    | LoadComparisonChartDataFailed

    | RenderChartComplete
    | RenderChartFailed

    | RenderComparisonChartComplete
    | RenderComparisonChartFailed

    | CompareCoupons
    | CompareCouponsComplete
    | CompareCouponsFailed

    | ClearComparison
    
    | LoadMetricTypes
    | LoadMetricTypesComplete
    | LoadMetricTypesFailded
    | SelectMetricType

    | LoadTrackerTimestamp
    | LoadTrackerTimestampComplete
    | LoadTrackerTimestampFailed
    
    | DownloadTrackers
    | DownloadTrackersComplete
    | DownloadTrackersFailed;



