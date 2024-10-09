import * as fromActions from '../actions';
import * as fromModels from '../../models';

export interface State {
    // UI State
    activeAsOfDate: string;
    reverseTimeRange: number;

    // Server response
    asOfDates: string[];
    asOfDateLoading: boolean;
    asOfDateLoaded: boolean;
    asOfDateError?: string;

    jbotMonitorScores: fromModels.JbotMonitorScore[];
    jbotMonitorScoresLoading: boolean;
    jbotMonitorScoresLoaded: boolean;
    jbotMonitorScoresError?: string;
}

const initialState: State = {
    activeAsOfDate: null,
    reverseTimeRange: 5,

    asOfDates: [],
    asOfDateLoading: false,
    asOfDateLoaded: false,

    jbotMonitorScores: null,
    jbotMonitorScoresLoading: false,
    jbotMonitorScoresLoaded: false,
}

export function reducer(state = initialState, action: fromActions.JbotMonitorAction): State {

    switch(action.type) { 

        case fromActions.JbotMonitorActionTypes.SET_JBOT_MONITOR_ACTIVE_AS_OF_DATE: {
            return {
                ...state,
                activeAsOfDate: action.payload
            }
        }

        case fromActions.JbotMonitorActionTypes.SET_JBOT_MONITOR_REVERSE_TIME_RANGE: {
            return {
                ...state,
                reverseTimeRange: action.payload,
            }
        }



        case fromActions.JbotMonitorActionTypes.LOAD_JBOT_MONITOR_AS_OF_DATE: {
            return {
                ...state,
                asOfDateLoading: true,
                asOfDateLoaded: false,
                asOfDateError: null
            }
        }

        case fromActions.JbotMonitorActionTypes.LOAD_JBOT_MONITOR_AS_OF_DATE_COMPLETE: {
            return {
                ...state,
                asOfDates: action.payload,
                asOfDateLoading: false,
                asOfDateLoaded: true,
                asOfDateError: null
            }
        }

        case fromActions.JbotMonitorActionTypes.LOAD_JBOT_MONITOR_AS_OF_DATE_FAILED: {
            return {
                ...state,
                asOfDateLoading: false,
                asOfDateLoaded: false,
                asOfDateError: action.payload
            }
        }




        case fromActions.JbotMonitorActionTypes.LOAD_JBOT_MONITOR_SCORE: {
            return {
                ...state,
                jbotMonitorScoresLoading: true,
                jbotMonitorScoresLoaded: false,
                jbotMonitorScoresError: null, 
            }
        }

        
        case fromActions.JbotMonitorActionTypes.LOAD_JBOT_MONITOR_SCORE_COMPLETE: {
            return {
                ...state,
                jbotMonitorScoresLoading: false,
                jbotMonitorScoresLoaded: true,
                jbotMonitorScores: action.payload,
                jbotMonitorScoresError: null, 
            }
        }

        case fromActions.JbotMonitorActionTypes.LOAD_JBOT_MONITOR_SCORE: {
            return {
                ...state,
                jbotMonitorScoresLoading: false,
                jbotMonitorScoresLoaded: false,
                jbotMonitorScoresError: action.payload, 
            }
        }



        default: {
            return state;
        }
    }
}

export const getActiveAsOfDate = (state: State) => state.activeAsOfDate;
export const getReverseTimeRange = (state: State) => state.reverseTimeRange;

export const getAsOfDates = (state: State) => state.asOfDates;
export const getAsOfDateLoading = (state: State) => state.asOfDateLoading;
export const getAsOfDateLoaded = (state: State) => state.asOfDateLoaded;
export const getAsOfDateError = (state: State) => state.asOfDateError;

export const getJbotMonitorScore = (state: State) => state.jbotMonitorScores;
export const getJbotMonitorScoreLoading = (state: State) => state.jbotMonitorScoresLoading;
export const getJbotMonitorScoreLoaded = (state: State) => state.jbotMonitorScoresLoaded;
export const getJbotMonitorScoreError = (state: State) => state.jbotMonitorScoresError;