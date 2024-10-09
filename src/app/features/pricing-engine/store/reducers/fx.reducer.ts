import * as fromActions from '../actions';

export interface FxState {

    fxEntity: any;
    fxLoading: boolean;
    fxLoaded: boolean;
    fxError?: string;

    fxOwnership: any;
    fxOwnershipLoading: boolean;
    fxOwnershipLoaded: boolean;
    fxOwnershipError?: string;

    fxDetail: any;
    fxDetailLoading: boolean;
    fxDetailLoaded: boolean;
    fxDetailError?: string;

    fxUpdatePending: boolean;
    fxUpdateFinished: boolean;
    fxUpdateError?: string;
}

export const initialState: FxState = {
    fxEntity: {},
    fxLoading: false,
    fxLoaded: false,
    fxError: null,

    fxOwnership: [],
    fxOwnershipLoading: false,
    fxOwnershipLoaded: false,

    fxDetail: [],
    fxDetailLoading: false,
    fxDetailLoaded: false,

    fxUpdatePending: false,
    fxUpdateFinished: false,
};

export function reducer(state = initialState, action: fromActions.FxActions) {
    switch (action.type) {

        case fromActions.FxActionTypes.LOAD_FX: {
            return {
                ...state,
                fxLoading: true,
                fxLoaded: false,
                fxError: null
            };
        }

        case fromActions.FxActionTypes.LOAD_FX_COMPLETE: {
            return {
                ...state,
                fxEntity: action.payload,
                fxLoading: false,
                fxLoaded: true,
                fxError: null
            };
        }

        case fromActions.FxActionTypes.LOAD_FX_FAILED: {
            return {
                ...state,
                fxLoading: false,
                fxLoaded: false,
                fxError: action.payload
            };
        }

        case fromActions.FxActionTypes.LOAD_FXFORWARD_OWNERSHIP: {
            return {
                ...state,
                fxOwnershipLoading: true,
                fxOwnershipLoaded: false,
                fxOwnershipError: null
            };
        }

        case fromActions.FxActionTypes.LOAD_FXFORWARD_OWNERSHIP_COMPLETE: {
            return {
                ...state,
                fxOwnership: action.payload,
                fxOwnershipLoading: false,
                fxOwnershipLoaded: true,
                fxOwnershipError: null
            };
        }

        case fromActions.FxActionTypes.LOAD_FXFORWARD_OWNERSHIP_FAILED: {
            return {
                ...state,
                fxOwnership: [],
                fxOwnershipLoading: false,
                fxOwnershipLoaded: false,
                fxOwnershipError: action.payload
            };
        }



        // -----------------------------------------------------------------------

        case fromActions.FxActionTypes.LOAD_FXFORWARD_DETAIL: {
            return {
                ...state,
                fxDetail: [],
                fxDetailLoading: true,
                fxDetailLoaded: false,
                fxDetailError: null
            };
        }

        case fromActions.FxActionTypes.LOAD_FXFORWARD_DETAIL_COMPLETE: {
            return {
                ...state,
                fxDetail: action.payload,
                fxDetailLoading: false,
                fxDetailLoaded: true,
                fxDetailError: null
            };
        }


        case fromActions.FxActionTypes.LOAD_FXFORWARD_DETAIL_FAILED: {
            return {
                ...state,
                fxDetailLoading: false,
                fxDetailLoaded: false,
                fxDetailError: action.payload
            };
        }

        case fromActions.FxActionTypes.RESET_FXFORWARD_DETAIL: {
            return {
                ...state,
                fxDetail: [],
                fxDetailLoading: false,
                fxDetailLoaded: false,
                fxDetailError: null
            };
        }



        // ----------------------------------------------------------------------


        case fromActions.FxActionTypes.UPDATE_FXFORWARD: {
            return {
                ...state,
                fxUpdatePending: true,
                fxUpdateFinished: false,
                fxUpdateError: null
            };
        }

        case fromActions.FxActionTypes.UPDATE_FXFORWARD_COMPLETE: {
            return {
                ...state,
                fxUpdatePending: false,
                fxUpdateFinished: true,
                fxUpdateError: null
            };
        }

        case fromActions.FxActionTypes.UPDATE_FXFORWARD_FAILED: {
            return {
                ...state,
                fxUpdatePending: false,
                fxUpdateFinished: false,
                fxUpdateError: action.payload
            };
        }

        default:
            return state;
    }
}

export const getFxEntities = (state: FxState) => state.fxEntity;
export const getFxLoading = (state: FxState) => state.fxLoading;
export const getFxLoaded = (state: FxState) => state.fxLoaded;
export const getFxError = (state: FxState) => state.fxError;


export const getFxOwnership = (state: FxState) => state.fxOwnership;
export const getFxOwnershipLoading = (state: FxState) => state.fxOwnershipLoading;
export const getFxOwnershipLoaded = (state: FxState) => state.fxOwnershipLoaded;
export const getFxOwnershipError = (state: FxState) => state.fxOwnershipError;

export const getFxUpdatePending = (state: FxState) => state.fxUpdatePending;
export const getFxUpdateFinished = (state: FxState) => state.fxUpdateFinished;
export const getFxUpdateError = (state: FxState) => state.fxUpdateError;

export const getFxDetail = (state: FxState) => state.fxDetail;
export const getFxDetailLoading = (state: FxState) => state.fxDetailLoading;
export const getFxDetailLoaded = (state: FxState) => state.fxDetailLoaded;
export const getFxDetailError = (state: FxState) => state.fxDetailError;


