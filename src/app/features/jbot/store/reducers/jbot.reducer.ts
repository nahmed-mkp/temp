import * as fromActions from '../actions';
import * as fromModels from '../../models';

export interface State {
    // UI State
    activeAsOfDate: string;
    activeSeries: string;

    // Server response
    asOfDates: string[];
    asOfDateLoading: boolean;
    asOfDateLoaded: boolean;
    asOfDateError?: string;

    jbotResult: {
        [asOfDates: string]: fromModels.JbotGridData[];
    };
    jbotResultLoading: boolean;
    jbotResultLoaded: boolean;
    jbotResultError?: string;

    jbotTimeseries: {
        [seriesName: string]: fromModels.JbotTimeseriesResponse;
    };
    jbotTimeseriesLoading: boolean;
    jbotTimeseriesLoaded: boolean;
    jbotTimeseriesError?: string;
};

const initialState: State = {
    activeAsOfDate: null,
    activeSeries: null,

    asOfDates: [],
    asOfDateLoading: false,
    asOfDateLoaded: false,
    asOfDateError: null,

    jbotResult: null,
    jbotResultLoading: false,
    jbotResultLoaded: false,

    jbotTimeseries: null,
    jbotTimeseriesLoading: false,
    jbotTimeseriesLoaded: false,
};

export function reducer(state = initialState, action: fromActions.JbotAction ): State {

    switch(action.type) { 

        case fromActions.JbotActionTypes.SET_ACTIVE_AS_OF_DATE: {
            return {
                ...state,
                activeAsOfDate: action.payload
            }
        }

        case fromActions.JbotActionTypes.SET_ACTIVE_SERIES: {
            return {
                ...state,
                activeSeries: action.payload
            }
        }




        case fromActions.JbotActionTypes.LOAD_AS_OF_DATE: {
            return {
                ...state,
                asOfDateLoading: true,
                asOfDateLoaded: false,
                asOfDateError: null
            }
        }

        case fromActions.JbotActionTypes.LOAD_AS_OF_DATE_COMPLETE: {
            return {
                ...state,
                asOfDates: action.payload,
                asOfDateLoading: false,
                asOfDateLoaded: true,
                asOfDateError: null
            }
        }

        case fromActions.JbotActionTypes.LOAD_AS_OF_DATE_FAILED: {
            return {
                ...state,
                asOfDateLoading: false,
                asOfDateLoaded: false,
                asOfDateError: action.payload
            }
        }




        case fromActions.JbotActionTypes.LOAD_JBOT_RESULT: {
            return {
                ...state,
                jbotResultLoading: true,
                jbotResultLoaded: false,
                jbotResultError: null
            }
        }

        case fromActions.JbotActionTypes.LOAD_JBOT_RESULT_COMPLETE: {
            return {
                ...state,
                jbotResultLoading: false,
                jbotResultLoaded: true,
                jbotResult: Object.assign({}, state.jbotResult, action.payload),
                jbotResultError: null,
            }
        }

        case fromActions.JbotActionTypes.LOAD_JBOT_RESULT_FAILED: {
            return {
                ...state,
                jbotResultLoading: false,
                jbotResultLoaded: false,
                jbotResultError: action.payload,
            }
        }




        case fromActions.JbotActionTypes.LOAD_JBOT_TIMESERIES: {
            return {
                ...state,
                jbotTimeseriesLoading: true,
                jbotTimeseriesLoaded: false,
                jbotTimeseriesError: null
            }
        }

        case fromActions.JbotActionTypes.LOAD_JBOT_TIMESERIES_COMPLETE: {
            return {
                ...state,
                jbotTimeseries: Object.assign({}, state.jbotTimeseries, action.payload),
                jbotTimeseriesLoading: false,
                jbotTimeseriesLoaded: true,
                jbotTimeseriesError: null
            }
        }

        case fromActions.JbotActionTypes.LOAD_JBOT_TIMESERIES_FAILED: {
            return {
                ...state,
                jbotTimeseriesLoading: false,
                jbotTimeseriesLoaded: false,
                jbotTimeseriesError: action.payload
            }
        }


        default: {
            return state;
        }
    }
}

export const getActiveAsOfDate = (state: State) => state.activeAsOfDate;
export const getActiveSeries = (state: State) => state.activeSeries;

export const getAsOfDates = (state: State) => state.asOfDates;
export const getAsOfDateLoading = (state: State) => state.asOfDateLoading;
export const getAsOfDateLoaded = (state: State) => state.asOfDateLoaded;
export const getAsOfDateError = (state: State) => state.asOfDateError;

export const getJbotResult = (state: State) => state.jbotResult;
export const getJbotResultLoading = (state: State) => state.jbotResultLoading;
export const getJbotResultLoaded = (state: State) => state.jbotResultLoaded;
export const getJbotResultError = (state: State) => state.jbotResultError;

export const getJbotTimeseries =  (state: State) => state.jbotTimeseries;
export const getJbotTimeseriesLoading =  (state: State) => state.jbotTimeseriesLoading;
export const getJbotTimeseriesLoaded =  (state: State) => state.jbotTimeseriesLoaded;
export const getJbotTimeseriesError =  (state: State) => state.jbotTimeseriesError;
