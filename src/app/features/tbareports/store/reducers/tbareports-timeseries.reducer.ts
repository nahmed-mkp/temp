import * as fromActions from '../actions';
import * as fromModels from '../../models';

export type Action = fromActions.TimeseriesActions;

/**
 * Specify Normalizr schema
 *
 * https://github.com/paularmstrong/normalizr/blob/master/docs/api.md
 */

export interface TimeseriesState {

    //UI
    mode: string;

    // series
    seriesIds: string[];
    seriesEntities: { [id: string]: fromModels.OASTimeseries };
    selectedSeries: string;
    seriesLoading: boolean;
    seriesLoaded: boolean;
    seriesError: string;

    // coupons
    couponIds: string[];
    couponEntities: { [id: string]: fromModels.OASCoupon};
    couponsLoading: boolean;
    couponsLoaded: boolean;
    couponsError: string;

    //Metric Types
    metricTypesEntities: fromModels.MetricType[];
    selectedMetricType: string;
    metricTypesLoading: boolean;
    metricTypesLoaded: boolean;
    metricTypesError: string;

    // plots
    selectedPlotType: {type: string};
    plotResults: string[];
    plots: {[id: string]: fromModels.PlotDataResult};
    plotRenderError: string;

    // cache
    refreshingOASCache: boolean;
    refreshingTsyOASCache: boolean;
    oasCacheSuccess: string;
    oasCacheError: string;
    tsyCacheSuccess: string;
    tsyCacheError: string;

    DEFAULT_SELECTED_SERIES: string;

    //tracker extra feature
    trackerTimestamp: string;
    trackerTimestampLoading: boolean;
    trackerTimestampLoaded: boolean;
    trackerTimestampError?: string;

    trackersDownloading: boolean;
    trackersDownloaded: boolean;
    trackersDownloadError?: boolean;
}

const initialState: TimeseriesState = {

    // UI
    mode: 'regularTypeMode',

    // series
    seriesIds: [],
    seriesEntities: { },
    selectedSeries: null,
    seriesLoading: false,
    seriesLoaded: false,
    seriesError: null,

    // coupons
    couponIds: [],
    couponEntities: {},
    couponsLoading: false,
    couponsLoaded: false,
    couponsError: null,

    ///Metric Types
    metricTypesEntities: [],
    selectedMetricType: 'tsyOAS',
    metricTypesLoading: false,
    metricTypesLoaded: false,
    metricTypesError: null,

    // plots
    selectedPlotType: {type: 'OAS'},
    plotResults: [],
    plots: {},
    plotRenderError: null,

    // cache
    refreshingOASCache: false,
    refreshingTsyOASCache: false,
    oasCacheSuccess: null,
    oasCacheError: null,
    tsyCacheSuccess: null,
    tsyCacheError: null,

    DEFAULT_SELECTED_SERIES: 'Fn',

    //tracker extra feature
    trackerTimestamp: undefined,
    trackerTimestampLoading: false,
    trackerTimestampLoaded: false,
    trackerTimestampError: null,

    trackersDownloading: false,
    trackersDownloaded: false,
    trackersDownloadError: null,
};

export function reducer(state = initialState, action: Action ): TimeseriesState {
    switch (action.type) {

        // UI

        case fromActions.SET_ACTIVE_MODE: {
            return {
                ...state,
                mode: action.payload
            }
        }

        // series
        case fromActions.LOAD_TIMESERIES: {
            return {
                ...state,
                seriesLoading: true,
                seriesLoaded: false,
                seriesError: null
            };
        }

        case fromActions.LOAD_TIMESERIES_COMPLETE: {
            const series = action.payload;
            const newIds = series.map((series) => series.series).filter((series) => state.seriesIds.indexOf(series) < 0);
            const entities = series.reduce((entities: { [id: string]: any } , series: fromModels.OASTimeseries) => {
                return {
                    ...entities,
                    [series.series]: series
                };
            }, { ...state.seriesEntities });

            const defaultSeries = series.filter((series) => series.series === state.DEFAULT_SELECTED_SERIES);
            const defaultSelectedSeries: string = (defaultSeries.length > 0) ? defaultSeries[0].series : newIds[0];
            return {
                ...state,
                seriesLoading: false,
                seriesLoaded: true,
                seriesError: null,
                selectedSeries: defaultSelectedSeries,
                seriesIds: [...state.seriesIds, ...newIds],
                seriesEntities: entities
            };
        }

        case fromActions.LOAD_TIMESERIES_FAILED: {
            return {
                ...state,
                seriesLoading: false,
                seriesLoaded: false,
                seriesError: action.payload
            };
        }

        case fromActions.SELECT_TIMESERIES: {
            return {
                ...state,
                selectedSeries: action.payload.series
            };
        }

        case fromActions.SELECT_TIMESERIES: {
            return {
                ...state,
                selectedSeries: action.payload.series
            };
        }

        // coupons
        case fromActions.LOAD_COUPONS: {
            return {
                ...state,
                couponsLoading: true,
                couponsLoaded: false,
                couponsError: null
            };
        }

        case fromActions.LOAD_COUPONS_COMPLETE: {
            const coupons = action.payload;
            const newIds = coupons.map((coupon) => coupon.id).filter((id) => state.couponIds.indexOf(id) < 0);
            const entities = coupons.reduce((entities: { [id: string]: fromModels.OASCoupon } , coupon: fromModels.OASCoupon) => {
                return {
                    ...entities,
                    [coupon.id]: coupon
                };
            }, { ...state.couponEntities });
            return {
                ...state,
                couponsLoading: false,
                couponsLoaded: true,
                couponIds: [...state.couponIds, ...newIds],
                couponEntities: entities
            };
        }

        case fromActions.LOAD_COUPONS_FAILED: {
            return {
                ...state,
                couponsLoading: false,
                couponsLoaded: false,
                couponsError: action.payload
            };
        }


        // Metric Type
        case fromActions.LOAD_METRIC_TYPES: {
            return {
                ...state,
                metricTypesLoading: true,
                metricTypesLoaded: false,
                metricTypesError: null,
            }
        }

        case fromActions.LOAD_METRIC_TYPES_COMPLETE: {
            return {
                ...state,
                metricTypesEntities: action.payload,
                metricTypesLoading: false,
                metricTypesLoaded: true,
                metricTypesError: null,
            }
        }

        case fromActions.LOAD_METRIC_TYPES_FAILED: {
            return {
                ...state,
                metricTypesLoading: false,
                metricTypesLoaded: false,
                metricTypesError: action.payload
            }
        }

        case fromActions.SELECT_METRIC_TYPES: {
            return {
                ...state,
                selectedMetricType: action.payload
            }
        }



        // plots
        case fromActions.CHANGE_PLOT_TYPE: {
            return {
                ...state,
                selectedPlotType: Object.assign({}, state.selectedPlotType, action.payload) 
            };
        }

        case fromActions.LOAD_CHART_DATA_COMPLETE: {
            const payload = Object.assign({}, action.payload, { rendered: false, isComparison: false });
            const bond = payload.bond;
            const coupon = payload.coupon;
            const plotType = payload.plotType;
            const key = `${bond}:${coupon}:${plotType}`;
            const newPlot = state.plotResults.indexOf(key) < 0 ? [key] : [];
            return {
                ...state,
                plotResults: [...state.plotResults, ...newPlot],
                plots: Object.assign({}, state.plots, {[key]: payload})
            };
        }

        case fromActions.LOAD_COMPARISON_CHART_DATA_COMPLETE: {
            const payload = Object.assign({}, action.payload, { rendered: false, isComparison: true });
            const bond = payload.bond;
            const coupon = payload.coupon;
            const plotType = payload.plotType;
            const key = `${bond}:${coupon}:${plotType}:compare`;
            const newPlot = state.plotResults.indexOf(key) < 0 ? [key] : [];
            return {
                ...state,
                plotResults: [...state.plotResults, ...newPlot],
                plots: Object.assign({}, state.plots, {[key]: payload})
            };
        }

        case fromActions.RENDER_CHART_COMPLETE: {
            const payload = Object.assign({}, action.payload, { rendered: true });
            const bond = payload.bond;
            const coupon = payload.coupon;
            const plotType = payload.plotType;
            const key = `${bond}:${coupon}:${plotType}`;
            // const newPlot = state.plotResults.indexOf(key) < 0 ? [key] : [];
            return {
                ...state,
                // plotResults: [...state.plotResults, ...newPlot],
                plots: Object.assign({}, state.plots, {[key]: payload})
            };
        }

        case fromActions.RENDER_COMPARISON_CHART_COMPLETE: {
            const payload = Object.assign({}, action.payload, { rendered: true });
            const bond = payload.bond;
            const coupon = payload.coupon;
            const plotType = payload.plotType;
            const key = `${bond}:${coupon}:${plotType}:compare`;
            const newPlot = state.plotResults.indexOf(key) < 0 ? [key] : [];
            return {
                ...state,
                // plotResults: [...state.plotResults, ...newPlot],
                plots: Object.assign({}, state.plots, {[key]: payload})
            };
        }

        case fromActions.RENDER_CHART_FAILED: {
            return {
                ...state,
                plotRenderError: action.payload
            };
        }

        case fromActions.RENDER_COMPARISON_CHART_FAILED: {
            return {
                ...state,
                plotRenderError: action.payload
            };
        }

        // cache
        case fromActions.REFRESH_CACHE: {
            const plotType = action.payload;
            if (plotType === 'OAS') {
                return {
                    ...state,
                    refreshingOASCache: true,
                    oasCacheSuccess: null,
                    oasCacheError: null
                };
            } else {
                return {
                    ...state,
                    refreshingTsyOASCache: true,
                    tsyCacheSuccess: null,
                    tsyCacheError: null
                };
            }
        }

        case fromActions.REFRESH_CACHE_COMPLETE: {
            const payload = action.payload;
            if (payload.plotType === 'OAS') {
                return {
                    ...state,
                    refreshingOASCache: false,
                    oasCacheSuccess: action.payload.message
                };
            } else {
                return {
                    ...state,
                    refreshingTsyOASCache: false,
                    tsyCacheSuccess: action.payload.message
                };
            }
        }

        case fromActions.REFRESH_CACHE_FAILED: {
            const payload = action.payload;
            if (payload.plotType === 'OAS') {
                return {
                    ...state,
                    refreshingOASCache: false,
                    oasCacheError: action.payload.message
                };
            } else {
                return {
                    ...state,
                    refreshingTsyOASCache: false,
                    tsyCacheError: action.payload.message
                };
            }
        }

        case fromActions.CLEAR_CACHE_STATUS: {
            const payload = action.payload;
            if (payload === 'oasSuccess') {
                return {
                    ...state,
                    refreshingOASCache: false,
                    oasCacheSuccess: null
                };
            } else if (payload === 'oasFailed') {
                return {
                    ...state,
                    refreshingOASCache: false,
                    oasCacheError: null
                };
            } else if (payload === 'tsySuccess') {
                return {
                    ...state,
                    refreshingTsyOASCache: false,
                    tsyCacheSuccess: null
                };
            } else {
                return {
                    ...state,
                    refreshingTsyOASCache: false,
                    tsyCacheSuccess: null
                };
            }

        }

        // Compare
        case fromActions.COMPARE_COUPONS: {
            const payload = action.payload;
            if (payload.length === 2) {
                let lhsCoupon: fromModels.OASCoupon = payload[0];
                const rhsCoupon: fromModels.OASCoupon = payload[1];
                lhsCoupon = Object.assign({}, lhsCoupon, { couponToCompare: rhsCoupon });
                return {
                    ...state,
                    couponEntities: Object.assign({}, state.couponEntities, {[lhsCoupon.id]: lhsCoupon})
                };
            } else {
                return state;
            }
        }

        case fromActions.CLEAR_COMPARISON: {
            const payload = Object.assign({}, action.payload, { couponToCompare: null });
            return {
                ...state,
                couponEntities: Object.assign({}, state.couponEntities, {[payload.id]: payload})
            };
        }


        //tracker mode extra feature
        case fromActions.LOAD_TRACKER_TIMESTAMP: {
            return {
                ...state,
                trackerTimestampLoading: true,
                trackerTimestampLoaded: false,
                trackerTimestampError: null,
            }
        }

        case fromActions.LOAD_TRACKER_TIMESTAMP_COMPLETE: {
            return {
                ...state,
                trackerTimestamp: action.payload,
                trackerTimestampLoading: false,
                trackerTimestampLoaded: true,
                trackerTimestampError: null,
            }
        }

        case fromActions.LOAD_TRACKER_TIMESTAMP_FAILED: {
            return {
                ...state,
                trackerTimestampLoading: false,
                trackerTimestampLoaded: false,
                trackerTimestampError: action.payload,
            }
        }

        case fromActions.DOWNLOAD_TRACKERS: {
            return {
                ...state,
                trackersDownloading: true,
                trackersDownloaded: false,
                trackerTimestampError: null,
            }
        }

        
        case fromActions.DOWNLOAD_TRACKERS_COMPLETE: {
            return {
                ...state,
                trackersDownloading: false,
                trackersDownloaded: true,
                trackerTimestampError: null,
            }
        }

        
        case fromActions.DOWNLOAD_TRACKERS_FAILED: {
            return {
                ...state,
                trackersDownloading: false,
                trackersDownloaded: false,
                trackerTimestampError: action.payload,
            }
        }

        default: {
            return state;
        }
    }
}

//UI
export const getActiveMode = (state: TimeseriesState) => state.mode;

// series
export const getTimeseriesIds = (state: TimeseriesState) => state.seriesIds;
export const getTimeseriesEntities = (state: TimeseriesState) => state.seriesEntities;
export const getSelectedSeriesId = (state: TimeseriesState) => state.selectedSeries;
export const getSeriesLoadingStatus = (state: TimeseriesState) => state.seriesLoading;
export const getSeriesLoadedStatus = (state: TimeseriesState) => state.seriesLoaded;
export const getSeriesError = (state: TimeseriesState) => state.seriesError;

// coupons
export const getCouponIds = (state: TimeseriesState) => state.couponIds;
export const getCouponEntities = (state: TimeseriesState) => state.couponEntities;
export const getCouponsLoadingStatus = (state: TimeseriesState) => state.couponsLoading;
export const getCouponsLoadedStatus = (state: TimeseriesState) => state.couponsLoaded;
export const getCouponsError = (state: TimeseriesState) => state.couponsError;

//Metric Types
export const getMetricTypesEntities = (state: TimeseriesState) => state.metricTypesEntities;
export const getMetricTypesLoadingStatus = (state: TimeseriesState) => state.metricTypesLoading;
export const getMetricTypesLoadedStatus = (state: TimeseriesState) => state.metricTypesLoaded;
export const getMetricTypesError = (state: TimeseriesState) => state.metricTypesError;
export const getSelectedMetricType = (state: TimeseriesState) => state.selectedMetricType;

// plots
export const getSelectedPlotType = (state: TimeseriesState) => state.selectedPlotType;
export const getPlotIds = (state: TimeseriesState) => state.plotResults;
export const getPlotEntities = (state: TimeseriesState) => state.plots;
export const getPlotRenderError = (state: TimeseriesState) => state.plotRenderError;

// cache
export const getOASCacheSuccess = (state: TimeseriesState) => state.oasCacheSuccess;
export const getOASCacheError = (state: TimeseriesState) => state.oasCacheError;
export const getTSYCacheSuccess = (state: TimeseriesState) => state.tsyCacheSuccess;
export const getTSYCacheError = (state: TimeseriesState) => state.tsyCacheError;
export const getOASCacheRefreshing = (state: TimeseriesState) => state.refreshingOASCache;
export const getTsyOASCacheRefreshing = (state: TimeseriesState) => state.refreshingTsyOASCache;

//tracker mode extra feature
export const getTrackerTimestamp = (state: TimeseriesState) => state.trackerTimestamp;
export const getTrackerTimestampLoading = (state: TimeseriesState) => state.trackerTimestampLoading;
export const getTrackerTimestampLoaded = (state: TimeseriesState) => state.trackerTimestampLoaded;
export const getTrackerTimestampError = (state: TimeseriesState) => state.trackerTimestampError;

export const getTrackerDownloading = (state: TimeseriesState) => state.trackersDownloading;
export const getTrackerDownloaded = (state: TimeseriesState) => state.trackersDownloaded;
export const getTrackerDownloadError = (state: TimeseriesState) => state.trackersDownloadError;
