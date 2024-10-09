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

    jbotTechScores: fromModels.JbotTechScore[];
    jbotTechScoresLoading: boolean;
    jbotTechScoresLoaded: boolean;
    jbotTechScoresError?: string;
}

const initialState: State = {
    activeAsOfDate: null,
    reverseTimeRange: 5,

    asOfDates: [],
    asOfDateLoading: false,
    asOfDateLoaded: false,

    jbotTechScores: null,
    jbotTechScoresLoading: false,
    jbotTechScoresLoaded: false,
}

export function reducer(state = initialState, action: fromActions.JbotTechAction): State {

    switch(action.type) { 

        case fromActions.JbotTechActionTypes.SET_JBOT_TECH_ACTIVE_AS_OF_DATE: {
            return {
                ...state,
                activeAsOfDate: action.payload
            }
        }

        case fromActions.JbotTechActionTypes.SET_JBOT_TECH_REVERSE_TIME_RANGE: {
            return {
                ...state,
                reverseTimeRange: action.payload,
            }
        }



        case fromActions.JbotTechActionTypes.LOAD_JBOT_TECH_AS_OF_DATE: {
            return {
                ...state,
                asOfDateLoading: true,
                asOfDateLoaded: false,
                asOfDateError: null
            }
        }

        case fromActions.JbotTechActionTypes.LOAD_JBOT_TECH_AS_OF_DATE_COMPLETE: {
            return {
                ...state,
                asOfDates: action.payload,
                asOfDateLoading: false,
                asOfDateLoaded: true,
                asOfDateError: null
            }
        }

        case fromActions.JbotTechActionTypes.LOAD_JBOT_TECH_AS_OF_DATE_FAILED: {
            return {
                ...state,
                asOfDateLoading: false,
                asOfDateLoaded: false,
                asOfDateError: action.payload
            }
        }




        case fromActions.JbotTechActionTypes.LOAD_JBOT_TECH_SCORE: {
            return {
                ...state,
                jbotTechScoresLoading: true,
                jbotTechScoresLoaded: false,
                jbotTechScoresError: null, 
            }
        }

        
        case fromActions.JbotTechActionTypes.LOAD_JBOT_TECH_SCORE_COMPLETE: {
            return {
                ...state,
                jbotTechScoresLoading: false,
                jbotTechScoresLoaded: true,
                jbotTechScores: action.payload,
                jbotTechScoresError: null, 
            }
        }

        case fromActions.JbotTechActionTypes.LOAD_JBOT_TECH_SCORE: {
            return {
                ...state,
                jbotTechScoresLoading: false,
                jbotTechScoresLoaded: false,
                jbotTechScoresError: action.payload,
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

export const getJbotTechScore = (state: State) => state.jbotTechScores;
export const getJbotTechScoreLoading = (state: State) => state.jbotTechScoresLoading;
export const getJbotTechScoreLoaded = (state: State) => state.jbotTechScoresLoaded;
export const getJbotTechScoreError = (state: State) => state.jbotTechScoresError;