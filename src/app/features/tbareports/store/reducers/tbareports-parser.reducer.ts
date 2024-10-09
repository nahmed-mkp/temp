import * as moment from 'moment';

import * as fromActions from '../actions';
import * as fromModels from '../../models';

export type Action = fromActions.ParserActions;

/**
 * Specify Normalizr schema
 *
 * https://github.com/paularmstrong/normalizr/blob/master/docs/api.md
 */

export interface ParserState {

    missingDates: fromModels.MissingDate[];
    missingDatesLoaded: boolean;

    request: fromModels.ParserRequest;
    result: fromModels.ParserResult;

    steps: fromModels.Step[];
    currentStep: fromModels.Step;
    cacheKey: string;

    loading: boolean;
    loaded: boolean;
    error: string;

    saving: boolean;
    saved: boolean;
    completionStatus: string;
}

const STEPS = [{name: 'Check Missing Dates', isActive: true },
               {name: 'Parse PDF', isActive: false},
               {name: 'Upload CSV', isActive: false},
               {name: 'Validate', isActive: false},
               {name: 'Save', isActive: false},
               {name: 'Refresh Cache', isActive: false}];

const initialState: ParserState = {
    missingDates: [],
    missingDatesLoaded: false,

    request: { dealer: null, asOfDate: new Date()},
    result: null,

    steps: STEPS,
    currentStep: STEPS[0],
    cacheKey: null,

    loading: false,
    loaded: false,
    error: null,

    saving: false,
    saved: false,
    completionStatus: null
};

export function reducer(state = initialState, action: Action ): ParserState {

    state = Object.assign({}, state, { completionStatus: null });

    switch (action.type) {

        case fromActions.LOAD_MISSING_DATES: {
            return {
                ...state,
                missingDatesLoaded: false,
                loading: true,
                loaded: false
            };
        }

        case fromActions.LOAD_MISSING_DATES_COMPLETE: {
            return {
                ...state,
                missingDatesLoaded: true,
                loading: false,
                loaded: true,
                missingDates: [...action.payload]
            };
        }

        case fromActions.LOAD_MISSING_DATES_FAILED: {
            return {
                ...state,
                missingDatesLoaded: false,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case fromActions.UPDATE_STEP: {
            const payload = action.payload;
            const steps = STEPS.map((step) => {
                const isActive = (step.name === payload.name) ? true : false;
                return Object.assign({}, step, { isActive: isActive});
            });
            const selectedStep = steps.filter((step) => step.name === payload.name)[0];
            return Object.assign({}, state, { steps: steps, currentStep: selectedStep });
        }

        case fromActions.PREVIOUS_STEP: {
            const currentIndex = STEPS.map((step) => step.name).indexOf(state.currentStep.name);
            const prevIndex = Math.max(currentIndex - 1, 0);
            const prevStep = STEPS[prevIndex];
            const steps = STEPS.map((step, idx) => {
                const isActive = (step.name === prevStep.name) ? true : false;
                return Object.assign({}, step, { isActive: isActive});
            });
            return Object.assign({}, state, { steps: steps, currentStep: prevStep });
        }

        case fromActions.NEXT_STEP: {
            const currentIndex = STEPS.map((step) => step.name).indexOf(state.currentStep.name);
            const nextIndex = Math.min(currentIndex + 1, STEPS.length - 1);
            const nextStep = STEPS[nextIndex];
            const steps = STEPS.map((step, idx) => {
                const isActive = (step.name === nextStep.name) ? true : false;
                return Object.assign({}, step, { isActive: isActive});
            });
            return Object.assign({}, state, { steps: steps, currentStep: nextStep });
        }

        case fromActions.SAVE_CACHE_KEY: {
            const payload = action.payload;
            const steps = STEPS.map((step) => {
                const isActive = (step.name === 'Validate') ? true : false;
                return Object.assign({}, step, { isActive: isActive});
            });
            const selectedStep = steps.filter((step) => step.name === 'Validate')[0];
            return Object.assign({}, state, { cacheKey: payload, steps: steps, currentStep: selectedStep });
        }

        case fromActions.PARSE_DEALER_FILE_COMPLETE: {
            return {
                ...state,
                loading: false,
                loaded: true,
                error: null,
                result: action.payload
            };
        }

        case fromActions.PARSE_DEALER_FILE_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: true,
                error: action.payload
            };
        }

        case fromActions.SAVE_RESULTS: {
            return {
                ...state,
                saving: true,
                saved: false,
                error: null,
                result: null
            };
        }

        case fromActions.SAVE_RESULTS_COMPLETE: {
            return {
                ...state,
                saving: false,
                saved: true,
                error: null,
                result: action.payload,
                completionStatus: action.payload.status
            };
        }

        case fromActions.SAVE_RESULTS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: true,
                error: action.payload
            };
        }

        case fromActions.INVALID_REQUEST: {
            return {
                ...state,
                error: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getMissingDates = (state: ParserState) => state.missingDates;
export const getMissingDatesLoadedStatus = (state: ParserState) => state.missingDatesLoaded;

export const getParserRequest = (state: ParserState) => state.request;
export const getParserResults = (state: ParserState) => state.result;
export const getLoadingStatus = (state: ParserState) => state.loading;
export const getLoadedStatus = (state: ParserState) => state.loaded;
export const getError = (state: ParserState) => state.error;

export const getSteps = (state: ParserState) => state.steps;
export const getCurrentStep = (state: ParserState) => state.currentStep;
export const getCacheKey = (state: ParserState) => state.cacheKey;

export const getSavingState = (state: ParserState) => state.saving;
export const getSavedState = (state: ParserState) => state.saved;

export const getCompletionStatus = (state: ParserState) => state.completionStatus;
