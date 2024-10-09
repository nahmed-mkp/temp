import * as fromActions from '../actions/commodities.actions';


export interface CommoditiesAnalyticsState {

    dates: string[];
    datesLoading: boolean;
    datesLoaded: boolean;
    datesError?: string;

    selectedDate: string;

    analytics: any[];
    analyticsLoading: boolean;
    analyticsLoaded: boolean;
    analyticsError?: string;

    timeseries: {
        [date: string]: any
    };
    timeseriesLoading: boolean;
    timeseriesLoaded: boolean;
    timeseriesError?: string;
}

const initialState: CommoditiesAnalyticsState = {

    dates: [],
    datesLoading: false,
    datesLoaded: false,
    selectedDate: null,

    analytics: [],
    analyticsLoading: false,
    analyticsLoaded: false,

    timeseries: undefined,
    timeseriesLoading: false,
    timeseriesLoaded: false,
};

export function reducer(state = initialState, action: fromActions.CommoditiesAnalyticsActions): CommoditiesAnalyticsState {

    switch (action.type) {

        case fromActions.CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS_DATES: {
            return {
                ...state,
                datesLoading: true,
                datesLoaded: false,
                datesError: null
            };
        }

        case fromActions.CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS_DATES_COMPLETE: {
            return {
                ...state,
                datesLoading: false,
                datesLoaded: true,
                dates: action.payload
            };
        }

        case fromActions.CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS_DATES_FAILED: {
            return {
                ...state,
                datesLoading: false,
                datesLoaded: false,
                datesError: action.payload
            };
        }

        case fromActions.CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS: {
            return {
                ...state,
                selectedDate: action.payload,
                analyticsLoading: true,
                analyticsLoaded: false,
                analyticsError: null
            };
        }

        case fromActions.CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS_COMPLETE: {
            return {
                ...state,
                analyticsLoading: false,
                analyticsLoaded: true,
                analytics: action.payload
            };
        }

        case fromActions.CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_ANALYTICS_FAILED: {
            return {
                ...state,
                analyticsLoading: false,
                analyticsLoaded: false,
                analyticsError: action.payload
            };
        }

        case fromActions.CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_TIMESERIES: {
            return {
                ...state,
                timeseriesLoading: true,
                timeseriesLoaded: false,
                timeseriesError: null
            };
        }

        case fromActions.CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_TIMESERIES_COMPLETE: {
            return {
                ...state,
                timeseriesLoading: false,
                timeseriesLoaded: true,
                timeseries: Object.assign({}, state.timeseries, action.payload)
            };
        }

        case fromActions.CommoditiesAnalyticsActionTypes.LOAD_COMMODITIES_TIMESERIES_FAILED: {
            return {
                ...state,
                timeseriesLoading: false,
                timeseriesLoaded: true,
                timeseriesError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getDates = (state: CommoditiesAnalyticsState) => state.dates;
export const getDatesLoading = (state: CommoditiesAnalyticsState) => state.datesLoading;
export const getDatesLoaded = (state: CommoditiesAnalyticsState) => state.datesLoaded;
export const getDatesError = (state: CommoditiesAnalyticsState) => state.datesError;
export const getSelectedDate = (state: CommoditiesAnalyticsState) => state.selectedDate;

export const getAnalytics = (state: CommoditiesAnalyticsState) => state.analytics;
export const getAnalyticsLoading = (state: CommoditiesAnalyticsState) => state.analyticsLoading;
export const getAnalyticsLoaded = (state: CommoditiesAnalyticsState) => state.analyticsLoaded;
export const getAnalyticsError = (state: CommoditiesAnalyticsState) => state.analyticsError;

export const getTimeseries = (state: CommoditiesAnalyticsState) => state.timeseries;
export const getTimeseriesLoading = (state: CommoditiesAnalyticsState) => state.timeseriesLoading;
export const getTimeseriesLoaded = (state: CommoditiesAnalyticsState) => state.timeseriesLoaded;
export const getTimeseriesError = (state: CommoditiesAnalyticsState) => state.timeseriesError;

