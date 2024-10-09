import * as fromActions from '../actions/sec-master-history.actions';
import * as fromModels from '../../models/sec-master-history.models';

export interface SecMasterHistoryState {

    createHistory: any[];
    createHistoryLoading: boolean;
    createHistoryLoaded: boolean;
    createHistoryError?: string;

    updateHistory: any[];
    updateHistoryLoading: boolean;
    updateHistoryLoaded: boolean;
    updateHistoryError?: string;

    addDoNotUpdateFlagPending: boolean;
    addDoNotUpdateFlagComplete: boolean;
    addDoNotUpdateFlagError?: string;
}

export const initialState: SecMasterHistoryState = {
    createHistory: [],
    createHistoryLoading: false,
    createHistoryLoaded: false,

    updateHistory: [],
    updateHistoryLoading: false,
    updateHistoryLoaded: false,

    addDoNotUpdateFlagPending: false,
    addDoNotUpdateFlagComplete: false,
}



export function reducer(state = initialState, action: fromActions.SecMasterHistoryActions) {
    switch (action.type) {

        case fromActions.SecMasterHistoryActionTypes.LOAD_CREATE_HISTORY: {
            return {
                ...state,
                createHistory: [],
                createHistoryLoading: true,
                createHistoryLoaded: false,
                createHistoryError: null
            };
        }

        case fromActions.SecMasterHistoryActionTypes.LOAD_CREATE_HISTORY_COMPLETE: {
            return {
                ...state,
                createHistory: action.payload,
                createHistoryLoading: false,
                createHistoryLoaded: true,
                createHistoryError: null
            };
        }

        case fromActions.SecMasterHistoryActionTypes.LOAD_CREATE_HISTORY_FAILED: {
            return {
                ...state,
                createHistory: [],
                createHistoryLoading: false,
                createHistoryLoaded: false,
                createHistoryError: action.payload
            };
        }


        // ---------------------------------------------------------------------------


        case fromActions.SecMasterHistoryActionTypes.LOAD_UPDATE_HISTORY: {
            return {
                ...state,
                updateHistory: [],
                updateHistoryLoading: true,
                updateHistoryLoaded: false,
                updateHistoryError: null
            };
        }

        case fromActions.SecMasterHistoryActionTypes.LOAD_UPDATE_HISTORY_COMPLETE: {
            return {
                ...state,
                updateHistory: action.payload,
                updateHistoryLoading: false,
                updateHistoryLoaded: true,
                updateHistoryError: null
            };
        }

        case fromActions.SecMasterHistoryActionTypes.LOAD_UPDATE_HISTORY_FAILED: {
            return {
                ...state,
                updateHistory: [],
                updateHistoryLoading: false,
                updateHistoryLoaded: false,
                updateHistoryError: action.payload
            };
        }







        case fromActions.SecMasterHistoryActionTypes.ADD_DO_NOT_UPDATE_FLAG_FROM_CREATION_HISTORY: {
            return {
                ...state,
                addDoNotUpdateFlagPending: true,
                addDoNotUpdateFlagComplete: false,
                addDoNotUpdateFlagError: null
            };
        }

        case fromActions.SecMasterHistoryActionTypes.ADD_DO_NOT_UPDATE_FLAG_FROM_CREATION_HISTORY_COMPLETE: {
            return {
                ...state,
                addDoNotUpdateFlagPending: false,
                addDoNotUpdateFlagComplete: true,
                addDoNotUpdateFlagError: null
            };
        }

        case fromActions.SecMasterHistoryActionTypes.ADD_DO_NOT_UPDATE_FLAG_FROM_CREATION_HISTORY_FAILED: {
            return {
                ...state,
                addDoNotUpdateFlagPending: false,
                addDoNotUpdateFlagComplete: false,
                addDoNotUpdateFlagError: null
            };
        }



        default:
            return state;
    }
}



export const getCreateHistory = (state: SecMasterHistoryState) => state.createHistory;
export const getCreateHistoryLoading = (state: SecMasterHistoryState) => state.createHistoryLoading;
export const getCreateHistoryLoaded = (state: SecMasterHistoryState) => state.createHistoryLoaded;
export const getCreateHistoryError = (state: SecMasterHistoryState) => state.createHistoryError;

export const getUpdateHistory = (state: SecMasterHistoryState) => state.updateHistory;
export const getUpdateHistoryLoading = (state: SecMasterHistoryState) => state.updateHistoryLoading;
export const getUpdateHistoryLoaded = (state: SecMasterHistoryState) => state.updateHistoryLoaded;
export const getUpdateHistoryError = (state: SecMasterHistoryState) => state.updateHistoryError;

export const getAddDoNotUpdateFlagPending = (state: SecMasterHistoryState) => state.addDoNotUpdateFlagPending;
export const getAddDoNotUpdateFlagComplete = (state: SecMasterHistoryState) => state.addDoNotUpdateFlagComplete;
export const getAddDoNotUpdateFlagError = (state: SecMasterHistoryState) => state.addDoNotUpdateFlagError;
