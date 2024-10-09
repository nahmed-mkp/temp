import * as fromActions from '../actions';

export interface SwapsState {

    swapsEntity: any;
    swapsLoading: boolean;
    swapsLoaded: boolean;
    swapsError?: string;


    swapOwnership: any;
    swapOwnershipLoading: boolean;
    swapOwnershipLoaded: boolean;
    swapOwnershipError?: string;

    securityDetail: any;
    securityDetailLoading: boolean;
    securityDetailLoaded: boolean;
    securityDetailError?: string;

    swapUpdatePending: boolean;
    swapUpdateFinished: boolean;
    swapUpdateError?: string;
}

export const initialState: SwapsState = {
    swapsEntity: [],
    swapsLoading: false,
    swapsLoaded: false,
    swapsError: null,

    swapOwnership: [],
    swapOwnershipLoading: false,
    swapOwnershipLoaded: false,

    securityDetail: [],
    securityDetailLoading: false,
    securityDetailLoaded: false,

    swapUpdatePending: false,
    swapUpdateFinished: false,
};

export function reducer(state = initialState, action: fromActions.SwapsActions) {
    switch (action.type) {

        case fromActions.SwapsActionTypes.LOAD_SWAPS: {
            return {
                ...state,
                swapsLoading: true,
                swapsLoaded: false,
                swapsError: null
            };
        }

        case fromActions.SwapsActionTypes.LOAD_SWAPS_COMPLETE: {
            return {
                ...state,
                swapsEntity: action.payload,
                swapsLoading: false,
                swapsLoaded: true,
                swapsError: null
            };
        }

        case fromActions.SwapsActionTypes.LOAD_SWAPS_FAILED: {
            return {
                ...state,
                swapsEntity: null,
                swapsLoading: false,
                swapsLoaded: false,
                swapsError: action.payload
            };
        }


        // -----------------------------------------------------------------------



        case fromActions.SwapsActionTypes.LOAD_SWAP_OWNERSHIP: {
            return {
                ...state,
                swapOwnershipLoading: true,
                swapOwnershipLoaded: false,
                swapOwnershipError: null
            };
        }

        case fromActions.SwapsActionTypes.LOAD_SWAP_OWNERSHIP_COMPLETE: {
            return {
                ...state,
                swapOwnership: action.payload,
                swapOwnershipLoading: false,
                swapOwnershipLoaded: true,
                swapOwnershipError: null
            };
        }

        case fromActions.SwapsActionTypes.LOAD_SWAP_OWNERSHIP_FAILED: {
            return {
                ...state,
                swapOwnership: [],
                swapOwnershipLoading: false,
                swapOwnershipLoaded: false,
                swapOwnershipError: action.payload
            };
        }



        // -----------------------------------------------------------------------

        case fromActions.SwapsActionTypes.LOAD_SWAP_DETAIL: {
            return {
                ...state,
                securityDetail: [],
                securityDetailLoading: true,
                securityDetailLoaded: false,
                securityDetailError: null
            };
        }

        case fromActions.SwapsActionTypes.LOAD_SWAP_DETAIL_COMPLETE: {
            return {
                ...state,
                securityDetail: action.payload,
                securityDetailLoading: false,
                securityDetailLoaded: true,
                securityDetailError: null
            };
        }


        case fromActions.SwapsActionTypes.LOAD_SWAP_DETAIL_FAILED: {
            return {
                ...state,
                securityDetailLoading: false,
                securityDetailLoaded: false,
                securityDetailError: action.payload
            };
        }

        case fromActions.SwapsActionTypes.RESET_SWAP_DETAIL: {
            return {
                ...state,
                securityDetail: [],
                securityDetailLoading: false,
                securityDetailLoaded: false,
                securityDetailError: null
            };
        }



        // ----------------------------------------------------------------------


        case fromActions.SwapsActionTypes.UPDATE_SWAP: {
            return {
                ...state,
                swapUpdatePending: true,
                swapUpdateFinished: false,
                swapUpdateError: null
            };
        }

        case fromActions.SwapsActionTypes.UPDATE_SWAP_COMPLETE: {
            return {
                ...state,
                swapUpdatePending: false,
                swapUpdateFinished: true,
                swapUpdateError: null
            };
        }

        case fromActions.SwapsActionTypes.UPDATE_SWAP_FAILED: {
            return {
                ...state,
                swapUpdatePending: false,
                swapUpdateFinished: false,
                swapUpdateError: action.payload
            };
        }


        default:
            return state;
    }
}

export const getSwapsEntities = (state: SwapsState) => state.swapsEntity;
export const getSwapsLoading = (state: SwapsState) => state.swapsLoading;
export const getSwapsLoaded = (state: SwapsState) => state.swapsLoaded;
export const getSwapsError = (state: SwapsState) => state.swapsError;

export const getSwapOwnership = (state: SwapsState) => state.swapOwnership;
export const getSwapOwnershipLoading = (state: SwapsState) => state.swapOwnershipLoading;
export const getSwapOwnershipLoaded = (state: SwapsState) => state.swapOwnershipLoaded;
export const getSwapOwnershipError = (state: SwapsState) => state.swapOwnershipError;

export const getSwapUpdatePending = (state: SwapsState) => state.swapUpdatePending;
export const getSwapUpdateFinished = (state: SwapsState) => state.swapUpdateFinished;
export const getSwapUpdateError = (state: SwapsState) => state.swapUpdateError;

export const getSecurityDetail = (state: SwapsState) => state.securityDetail;
export const getSecurityDetailLoading = (state: SwapsState) => state.securityDetailLoading;
export const getSecurityDetailLoaded = (state: SwapsState) => state.securityDetailLoaded;
export const getSecurityDetailError = (state: SwapsState) => state.securityDetailError;


