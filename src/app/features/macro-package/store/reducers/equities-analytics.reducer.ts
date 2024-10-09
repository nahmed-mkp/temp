import * as fromModels from '../../models/equities.models';
import * as fromActions from '../actions/equities-analytics.actions';


export interface EquitiesAnalyticsState {

    dates: string[];
    datesLoaded: boolean;
    datesLoading: boolean;
    datesError?: string;
    selectedDate: string;
    selectedTimeseriesId: string;

    analytics: any[];
    analyticsLoading: boolean;
    analyticsLoaded: boolean;
    analyticsError?: string;

    indexTimeseries: {[id: string]: any};
    indexTimeseriesLoading: boolean;
    indexTimeseriesLoaded: boolean;
    indexTimeseriesError?: string;

    sectorTimeseries: {[id: string]: any};
    sectorTimeseriesLoading: boolean;
    sectorTimeseriesLoaded: boolean;
    sectorTimeseriesError?: string;

    loading: boolean;
    loaded: boolean;
    error?: string;
}

const initialState: EquitiesAnalyticsState = {
    dates: [],
    datesLoaded: false,
    datesLoading: false,
    selectedDate: null,
    selectedTimeseriesId: undefined,

    analytics: [],
    analyticsLoading: false,
    analyticsLoaded: false,

    indexTimeseries: {},
    indexTimeseriesLoading: false,
    indexTimeseriesLoaded: false,

    sectorTimeseries: {},
    sectorTimeseriesLoading: false,
    sectorTimeseriesLoaded: false,

    loading: false,
    loaded: false
};

export function reducer(state = initialState, action: fromActions.EquitiesAnalyticsActions): EquitiesAnalyticsState {

    switch (action.type) {

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS_DATES: {
            return {
                ...state,
                datesLoading: true,
                datesLoaded: false,
                datesError: null
            };
        }

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS_DATES_COMPLETE: {
            return {
                ...state,
                datesLoading: false,
                datesLoaded: true,
                dates: action.payload
            };
        }

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS_DATES_FAILED: {
            return {
                ...state,
                datesLoading: false,
                datesLoaded: false,
                datesError: action.payload
            };
        }

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS: {
            return {
                ...state,
                selectedDate: action.payload,
                analyticsLoading: true,
                analyticsLoaded: false,
                analyticsError: null,
                // Clean the cache everytime user select a new date
                indexTimeseries: {},
                sectorTimeseries: {},
                selectedTimeseriesId: undefined
            };
        }

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS_COMPLETE: {
            return {
                ...state,
                analyticsLoading: false,
                analyticsLoaded: true,
                analytics: action.payload,
            };
        }

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS_FAILED: {
            return {
                ...state,
                analyticsLoading: false,
                analyticsLoaded: false,
                analyticsError: action.payload
            };
        }

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_INDEX_TIMESERIES: {
            return {
                ...state,
                selectedTimeseriesId: action.payload.index,
                indexTimeseriesLoading: true,
                indexTimeseriesLoaded: false,
                indexTimeseriesError: null
            };
        }

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_INDEX_TIMESERIES_COMPLETE: {
            return {
                ...state,
                indexTimeseries: Object.assign({}, state.indexTimeseries, {
                    [action.payload.index]: {
                        fundamentals: action.payload.fundamentals,
                        vols: action.payload.vols
                    }
                }),
                indexTimeseriesLoading: false,
                indexTimeseriesLoaded: true,
            };
        }

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_INDEX_TIMESERIES_FAILED: {
            return {
                ...state,
                indexTimeseriesLoading: false,
                indexTimeseriesLoaded: false,
                indexTimeseriesError: action.payload
            };
        }

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_SECTOR_TIMESERIES: {
            return {
                ...state,
                selectedTimeseriesId: action.payload.index + action.payload.sector,
                sectorTimeseriesLoading: true,
                sectorTimeseriesLoaded: false,
                sectorTimeseriesError: null
            };
        }

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_SECTOR_TIMESERIES_COMPLETE: {
            return {
                ...state,
                sectorTimeseries: Object.assign({}, state.sectorTimeseries, {[action.payload.index + action.payload.sector]: action.payload.fundamentals}),
                sectorTimeseriesLoading: false,
                sectorTimeseriesLoaded: true,
            };
        }

        case fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_SECTOR_TIMESERIES_FAILED: {
            return {
                ...state,
                sectorTimeseriesLoading: false,
                sectorTimeseriesLoaded: false,
                sectorTimeseriesError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}


export const getDates = (state: EquitiesAnalyticsState) => state.dates;
export const getDatesLoading = (state: EquitiesAnalyticsState) => state.datesLoading;
export const getDatesLoaded = (state: EquitiesAnalyticsState) => state.datesLoaded;
export const getDatesError = (state: EquitiesAnalyticsState) => state.datesError;
export const getSelectedDate = (state: EquitiesAnalyticsState) => state.selectedDate;
export const getSelectedTimeseriesId = (state: EquitiesAnalyticsState) => state.selectedTimeseriesId;

export const getAnalytics = (state: EquitiesAnalyticsState) => state.analytics;
export const getAnalyticsLoading = (state: EquitiesAnalyticsState) => state.analyticsLoading;
export const getAnalyticsLoaded = (state: EquitiesAnalyticsState) => state.analyticsLoaded;
export const getAnalyticsError = (state: EquitiesAnalyticsState) => state.analyticsError;

export const getIndexTimeseries = (state: EquitiesAnalyticsState) => state.indexTimeseries;
export const getIndexTimeseriesLoading = (state: EquitiesAnalyticsState) => state.indexTimeseriesLoading;
export const getIndexTimeseriesLoaded = (state: EquitiesAnalyticsState) => state.indexTimeseriesLoaded;
export const getIndexTimeseriesError = (state: EquitiesAnalyticsState) => state.indexTimeseriesError;

export const getSectorTimeseries = (state: EquitiesAnalyticsState) => state.sectorTimeseries;
export const getSectorTimeseriesLoading = (state: EquitiesAnalyticsState) => state.sectorTimeseriesLoading;
export const getSectorTimeseriesLoaded = (state: EquitiesAnalyticsState) => state.sectorTimeseriesLoaded;
export const getSectorTimeseriesError = (state: EquitiesAnalyticsState) => state.sectorTimeseriesError;

