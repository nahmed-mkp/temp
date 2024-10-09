import * as fromActions from '../actions';

export interface FuturesState {

    futuresEntity: any;
    futuresLoading: boolean;
    futuresLoaded: boolean;
    futuresError?: string;

    futuresUpdatePending: boolean;
    futuresUpdateFinished: boolean;
    futuresUpdateError?: string;
}

export const initialState: FuturesState = {
    futuresEntity: {},
    futuresLoading: false,
    futuresLoaded: false,
    futuresError: null,
    futuresUpdatePending: false,
    futuresUpdateFinished: false,
    futuresUpdateError: null
};

export function reducer(state = initialState, action: fromActions.FuturesActions) {
    switch (action.type) {

        case fromActions.FuturesActionTypes.LOAD_FUTURES: {
            return {
                ...state,
                futuresLoading: true,
                futuresLoaded: false,
                futuresError: null
            };
        }

        case fromActions.FuturesActionTypes.LOAD_FUTURES_COMPLETE: {
            return {
                ...state,
                futuresEntity: action.payload,
                futuresLoading: false,
                futuresLoaded: true,
                futuresError: null
            };
        }

        case fromActions.FuturesActionTypes.LOAD_FUTURES_FAILED: {
            return {
                ...state,
                futuresLoading: false,
                futuresLoaded: false,
                futuresError: action.payload
            };
        }

        /* =============================================== */

        case fromActions.FuturesActionTypes.UPDATE_FUTURES: {
            return {
                ...state,
                futuresUpdatePending: true,
                futuresUpdateFinished: false,
                futuresUpdateError: null
            };
        }

        case fromActions.FuturesActionTypes.UPDATE_FUTURES_COMPLETE: {
            return {
                ...state,
                futuresUpdatePending: true,
                futuresUpdateFinished: false,
                futuresUpdateError: null
            };
        }

        case fromActions.FuturesActionTypes.UPDATE_FUTURES_FAILED: {
            return {
                ...state,
                futuresUpdatePending: true,
                futuresUpdateFinished: false,
                futuresUpdateError: null
            };
        }


        default:
            return state;
    }
}

export const getFuturesEntities = (state: FuturesState) => state.futuresEntity;
export const getFuturesLoading = (state: FuturesState) => state.futuresLoading;
export const getFuturesLoaded = (state: FuturesState) => state.futuresLoaded;
export const getFuturesError = (state: FuturesState) => state.futuresError;

export const getFuturesUpdatePending = (state: FuturesState) => state.futuresUpdatePending;
export const getFuturesUpdateFinished = (state: FuturesState) => state.futuresUpdateFinished;
export const getFuturesUpdateError = (state: FuturesState) => state.futuresUpdateError;
