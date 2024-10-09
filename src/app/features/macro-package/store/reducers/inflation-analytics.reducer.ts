import * as fromActions from '../actions/inflation.actions';


export interface InflationAnalyticsState {

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

const initialState: InflationAnalyticsState = {

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

export function reducer(state = initialState, action: fromActions.InflationAnalyticsActions): InflationAnalyticsState {

    switch (action.type) {

        case fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS_DATES: {
            return {
                ...state,
                datesLoading: true,
                datesLoaded: false,
                datesError: null
            };
        }

        case fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS_DATES_COMPLETE: {
            return {
                ...state,
                datesLoading: false,
                datesLoaded: true,
                dates: action.payload
            };
        }

        case fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS_DATES_FAILED: {
            return {
                ...state,
                datesLoading: false,
                datesLoaded: false,
                datesError: action.payload
            };
        }

        case fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS: {
            return {
                ...state,
                selectedDate: action.payload,
                analyticsLoading: true,
                analyticsLoaded: false,
                analyticsError: null
            };
        }

        case fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS_COMPLETE: {
            return {
                ...state,
                analyticsLoading: false,
                analyticsLoaded: true,
                analytics: action.payload
            };
        }

        case fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS_FAILED: {
            return {
                ...state,
                analyticsLoading: false,
                analyticsLoaded: false,
                analyticsError: action.payload
            };
        }

        case fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_TIMESERIES: {
            return {
                ...state,
                timeseriesLoading: true,
                timeseriesLoaded: false,
                timeseriesError: null
            };
        }

        case fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_TIMESERIES_COMPLETE: {
            return {
                ...state,
                timeseriesLoading: false,
                timeseriesLoaded: true,
                timeseries: Object.assign({}, state.timeseries, action.payload)
            };
        }

        case fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_TIMESERIES_FAILED: {
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

export const getDates = (state: InflationAnalyticsState) => state.dates;
export const getDatesLoading = (state: InflationAnalyticsState) => state.datesLoading;
export const getDatesLoaded = (state: InflationAnalyticsState) => state.datesLoaded;
export const getDatesError = (state: InflationAnalyticsState) => state.datesError;
export const getSelectedDate = (state: InflationAnalyticsState) => state.selectedDate;

export const getAnalytics = (state: InflationAnalyticsState) => state.analytics;
export const getAnalyticsLoading = (state: InflationAnalyticsState) => state.analyticsLoading;
export const getAnalyticsLoaded = (state: InflationAnalyticsState) => state.analyticsLoaded;
export const getAnalyticsError = (state: InflationAnalyticsState) => state.analyticsError;

export const getTimeseries = (state: InflationAnalyticsState) => state.timeseries;
export const getTimeseriesLoading = (state: InflationAnalyticsState) => state.timeseriesLoading;
export const getTimeseriesLoaded = (state: InflationAnalyticsState) => state.timeseriesLoaded;
export const getTimeseriesError = (state: InflationAnalyticsState) => state.timeseriesError;

