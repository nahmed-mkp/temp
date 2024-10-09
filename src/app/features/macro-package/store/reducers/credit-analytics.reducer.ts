import * as fromModels from '../../models/credit.models';
import * as fromActions from '../actions/credit-analytics.actions';


export interface CreditAnalyticsState {

    dates: string[];
    datesLoading: boolean;
    datesLoaded: boolean;
    datesError?: string;

    selectedDate: string;

    indices: fromModels.ICreditIndex[];
    indicesLoading: boolean;
    indicesLoaded: boolean;
    indicesError?: string;

    constituents: fromModels.ICreditIndexConstituent[];
    constituentsLoading: boolean;
    constituentsLoaded: boolean;
    constituentsError?: string;

    sectorWeights: fromModels.ICreditSectorWeight[];
    sectorWeightsLoading: boolean;
    sectorWeightsLoaded: boolean;
    sectorWeightsError?: string;

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

const initialState: CreditAnalyticsState = {

    dates: [],
    datesLoading: false,
    datesLoaded: false,
    selectedDate: null,

    indices: [],
    indicesLoading: false,
    indicesLoaded: false,

    constituents: [],
    constituentsLoading: false,
    constituentsLoaded: false,

    sectorWeights: [],
    sectorWeightsLoading: false,
    sectorWeightsLoaded: false,

    analytics: [],
    analyticsLoading: false,
    analyticsLoaded: false,

    timeseries: undefined,
    timeseriesLoading: false,
    timeseriesLoaded: false,
};

export function reducer(state = initialState, action: fromActions.CreditAnalyticsActions): CreditAnalyticsState {

    switch (action.type) {

        case fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS_DATES: {
            return {
                ...state,
                datesLoading: true,
                datesLoaded: false,
                datesError: null
            };
        }

        case fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS_DATES_COMPLETE: {
            return {
                ...state,
                datesLoading: false,
                datesLoaded: true,
                dates: action.payload
            };
        }

        case fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS_DATES_FAILED: {
            return {
                ...state,
                datesLoading: false,
                datesLoaded: false,
                datesError: action.payload
            };
        }

        case fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS: {
            return {
                ...state,
                selectedDate: action.payload,
                analyticsLoading: true,
                analyticsLoaded: false,
                analyticsError: null
            };
        }

        case fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS_COMPLETE: {
            return {
                ...state,
                analyticsLoading: false,
                analyticsLoaded: true,
                analytics: action.payload
            };
        }

        case fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS_FAILED: {
            return {
                ...state,
                analyticsLoading: false,
                analyticsLoaded: false,
                analyticsError: action.payload
            };
        }

        case fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_TIMESERIES: {
            return {
                ...state,
                timeseriesLoading: true,
                timeseriesLoaded: false,
                timeseriesError: null
            };
        }

        case fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_TIMESERIES_COMPLETE: {
            return {
                ...state,
                timeseriesLoading: false,
                timeseriesLoaded: true,
                timeseries: Object.assign({}, state.timeseries, action.payload)
            };
        }

        case fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_TIMESERIES_FAILED: {
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

export const getDates = (state: CreditAnalyticsState) => state.dates;
export const getDatesLoading = (state: CreditAnalyticsState) => state.datesLoading;
export const getDatesLoaded = (state: CreditAnalyticsState) => state.datesLoaded;
export const getDatesError = (state: CreditAnalyticsState) => state.datesError;
export const getSelectedDate = (state: CreditAnalyticsState) => state.selectedDate;

export const getIndices = (state: CreditAnalyticsState) => state.indices;
export const getIndicesLoading = (state: CreditAnalyticsState) => state.indicesLoading;
export const getIndicesLoaded = (state: CreditAnalyticsState) => state.indicesLoaded;
export const getIndicesError = (state: CreditAnalyticsState) => state.indicesError;

export const getIndexConstituents = (state: CreditAnalyticsState) => state.constituents;
export const getIndexConstituentsLoading = (state: CreditAnalyticsState) => state.constituentsLoading;
export const getIndexConstituentsLoaded = (state: CreditAnalyticsState) => state.constituentsLoaded;
export const getIndexConstituentsError = (state: CreditAnalyticsState) => state.constituentsError;

export const getSectorWeights = (state: CreditAnalyticsState) => state.sectorWeights;
export const getSectorWeightsLoading = (state: CreditAnalyticsState) => state.sectorWeightsLoading;
export const getSectorWeightsLoaded = (state: CreditAnalyticsState) => state.sectorWeightsLoaded;
export const getSectorWeightsError = (state: CreditAnalyticsState) => state.sectorWeightsError;

export const getAnalytics = (state: CreditAnalyticsState) => state.analytics;
export const getAnalyticsLoading = (state: CreditAnalyticsState) => state.analyticsLoading;
export const getAnalyticsLoaded = (state: CreditAnalyticsState) => state.analyticsLoaded;
export const getAnalyticsError = (state: CreditAnalyticsState) => state.analyticsError;

export const getTimeseries = (state: CreditAnalyticsState) => state.timeseries;
export const getTimeseriesLoading = (state: CreditAnalyticsState) => state.timeseriesLoading;
export const getTimeseriesLoaded = (state: CreditAnalyticsState) => state.timeseriesLoaded;
export const getTimeseriesError = (state: CreditAnalyticsState) => state.timeseriesError;

