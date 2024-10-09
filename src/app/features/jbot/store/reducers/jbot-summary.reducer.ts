import * as fromActions from '../actions/jbot-summary.actions';
import * as fromModels from '../../models/jbot-summary.models';

export interface State {
    // UI State
    activeAsOfDate: string;

    // Server response
    asOfDates: string[];
    asOfDateLoading: boolean;
    asOfDateLoaded: boolean;
    asOfDateError?: string;

    jbotSummary: {
        [asOfDate: string]: fromModels.JbotSummaryGridData[];
    };
    jbotSummaryLoading: boolean;
    jbotSummaryLoaded: boolean;
    jbotSummaryError?: string;


    jbotExplodedSummary: fromModels.JbotSummaryGridData[];
    jbotExplodedSummaryLoading: boolean;
    jbotExplodedSummaryLoaded: boolean;
    jbotExplodedSummaryError?: string;
}

const initialState: State = {
    activeAsOfDate: null,

    asOfDates: [],
    asOfDateLoading: false,
    asOfDateLoaded: false,

    jbotSummary: null,
    jbotSummaryLoading: false,
    jbotSummaryLoaded: false,

    jbotExplodedSummary: null,
    jbotExplodedSummaryLoading: false,
    jbotExplodedSummaryLoaded: false,
};

export function reducer(state = initialState, action: fromActions.JbotSummaryActions): State {

    switch (action.type) {

        case fromActions.JbotSummaryActionTypes.SET_JBOT_SUMMARY_ACTIVE_AS_OF_DATE: {
            return {
                ...state,
                activeAsOfDate: action.payload
            };
        }

        case fromActions.JbotSummaryActionTypes.LOAD_JBOT_SUMMARY_AS_OF_DATES: {
            return {
                ...state,
                asOfDateLoading: true,
                asOfDateLoaded: false,
                asOfDateError: null
            };
        }

        case fromActions.JbotSummaryActionTypes.LOAD_JBOT_SUMMARY_AS_OF_DATES_COMPLETE: {
            return {
                ...state,
                asOfDates: action.payload,
                asOfDateLoading: false,
                asOfDateLoaded: true,
                asOfDateError: null
            };
        }

        case fromActions.JbotSummaryActionTypes.LOAD_JBOT_SUMMARY_AS_OF_DATES_FAILED: {
            return {
                ...state,
                asOfDateLoading: false,
                asOfDateLoaded: false,
                asOfDateError: action.payload
            };
        }

        case fromActions.JbotSummaryActionTypes.LOAD_JBOT_SUMMARY: {
            return {
                ...state,
                jbotSummaryLoading: true,
                jbotSummaryLoaded: false,
                jbotSummaryError: null,
            };
        }


        case fromActions.JbotSummaryActionTypes.LOAD_JBOT_SUMMARY_COMPLETE: {
            return {
                ...state,
                jbotSummaryLoading: false,
                jbotSummaryLoaded: true,
                jbotSummary: Object.assign({}, state.jbotSummary, action.payload),
            };
        }

        case fromActions.JbotSummaryActionTypes.LOAD_JBOT_SUMMARY_FAILED: {
            return {
                ...state,
                jbotSummaryLoading: false,
                jbotSummaryLoaded: false,
                jbotSummaryError: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

export const getActiveAsOfDate = (state: State) => state.activeAsOfDate;

export const getAsOfDates = (state: State) => state.asOfDates;
export const getAsOfDateLoading = (state: State) => state.asOfDateLoading;
export const getAsOfDateLoaded = (state: State) => state.asOfDateLoaded;
export const getAsOfDateError = (state: State) => state.asOfDateError;

export const getJbotSummary = (state: State) => state.jbotSummary;
export const getJbotSummaryLoading = (state: State) => state.jbotSummaryLoading;
export const getJbotSummaryLoaded = (state: State) => state.jbotSummaryLoaded;
export const getJbotSummaryError = (state: State) => state.jbotSummaryError;
