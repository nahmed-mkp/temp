import * as fromActions from '../actions';

export interface SwaptionsState {

    swaptionsEntity: any;
    swaptionsLoading: boolean;
    swaptionsLoaded: boolean;
    swaptionsError?: string;

    swaptionOwnership: any;
    swaptionOwnershipLoading: boolean;
    swaptionOwnershipLoaded: boolean;
    swaptionOwnershipError?: string;

    securityDetail: any;
    securityDetailLoading: boolean;
    securityDetailLoaded: boolean;
    securityDetailError?: string;

    swaptionUpdatePending: boolean;
    swaptionUpdateFinished: boolean;
    swaptionUpdateError?: string;
}

export const initialState: SwaptionsState = {
    swaptionsEntity: {},
    swaptionsLoading: false,
    swaptionsLoaded: false,
    swaptionsError: null,

    swaptionOwnership: [],
    swaptionOwnershipLoading: false,
    swaptionOwnershipLoaded: false,

    securityDetail: [],
    securityDetailLoading: false,
    securityDetailLoaded: false,

    swaptionUpdatePending: false,
    swaptionUpdateFinished: false,
};

export function reducer(state = initialState, action: fromActions.SwaptionsActions) {
    switch (action.type) {

        case fromActions.SwaptionsActionTypes.LOAD_SWAPTIONS: {
            return {
                ...state,
                swaptionsLoading: true,
                swaptionsLoaded: false,
                swaptionsError: null
            };
        }

        case fromActions.SwaptionsActionTypes.LOAD_SWAPTIONS_COMPLETE: {
            return {
                ...state,
                swaptionsEntity: action.payload,
                swaptionsLoading: false,
                swaptionsLoaded: true,
                swaptionsError: null
            };
        }

        case fromActions.SwaptionsActionTypes.LOAD_SWAPTIONS_FAILED: {
            return {
                ...state,
                swaptionsLoading: false,
                swaptionsLoaded: false,
                swaptionsError: action.payload
            };
        }

        case fromActions.SwaptionsActionTypes.LOAD_SWAPTION_OWNERSHIP: {
            return {
                ...state,
                swaptionOwnershipLoading: true,
                swaptionOwnershipLoaded: false,
                swaptionOwnershipError: null
            };
        }

        case fromActions.SwaptionsActionTypes.LOAD_SWAPTION_OWNERSHIP_COMPLETE: {
            return {
                ...state,
                swaptionOwnership: action.payload,
                swaptionOwnershipLoading: false,
                swaptionOwnershipLoaded: true,
                swaptionOwnershipError: null
            };
        }

        case fromActions.SwaptionsActionTypes.LOAD_SWAPTION_OWNERSHIP_FAILED: {
            return {
                ...state,
                swaptionOwnership: [],
                swaptionOwnershipLoading: false,
                swaptionOwnershipLoaded: false,
                swaptionOwnershipError: action.payload
            };
        }



        // -----------------------------------------------------------------------

        case fromActions.SwaptionsActionTypes.LOAD_SWAPTION_DETAIL: {
            return {
                ...state,
                securityDetail: [],
                securityDetailLoading: true,
                securityDetailLoaded: false,
                securityDetailError: null
            };
        }

        case fromActions.SwaptionsActionTypes.LOAD_SWAPTION_DETAIL_COMPLETE: {
            return {
                ...state,
                securityDetail: action.payload,
                securityDetailLoading: false,
                securityDetailLoaded: true,
                securityDetailError: null
            };
        }


        case fromActions.SwaptionsActionTypes.LOAD_SWAPTION_DETAIL_FAILED: {
            return {
                ...state,
                securityDetailLoading: false,
                securityDetailLoaded: false,
                securityDetailError: action.payload
            };
        }

        case fromActions.SwaptionsActionTypes.RESET_SWAPTION_DETAIL: {
            return {
                ...state,
                securityDetail: [],
                securityDetailLoading: false,
                securityDetailLoaded: false,
                securityDetailError: null
            };
        }



        // ----------------------------------------------------------------------


        case fromActions.SwaptionsActionTypes.UPDATE_SWAPTION: {
            return {
                ...state,
                swaptionUpdatePending: true,
                swaptionUpdateFinished: false,
                swaptionUpdateError: null
            };
        }

        case fromActions.SwaptionsActionTypes.UPDATE_SWAPTION_COMPLETE: {
            return {
                ...state,
                swaptionUpdatePending: false,
                swaptionUpdateFinished: true,
                swaptionUpdateError: null
            };
        }

        case fromActions.SwaptionsActionTypes.UPDATE_SWAPTION_FAILED: {
            return {
                ...state,
                swaptionUpdatePending: false,
                swaptionUpdateFinished: false,
                swaptionUpdateError: action.payload
            };
        }



        default:
            return state;
    }
}

export const getSwaptionsEntities = (state: SwaptionsState) => state.swaptionsEntity;
export const getSwaptionsLoading = (state: SwaptionsState) => state.swaptionsLoading;
export const getSwaptionsLoaded = (state: SwaptionsState) => state.swaptionsLoaded;
export const getSwaptionsError = (state: SwaptionsState) => state.swaptionsError;


export const getSwaptionOwnership = (state: SwaptionsState) => state.swaptionOwnership;
export const getSwaptionOwnershipLoading = (state: SwaptionsState) => state.swaptionOwnershipLoading;
export const getSwaptionOwnershipLoaded = (state: SwaptionsState) => state.swaptionOwnershipLoaded;
export const getSwaptionOwnershipError = (state: SwaptionsState) => state.swaptionOwnershipError;

export const getSwaptionUpdatePending = (state: SwaptionsState) => state.swaptionUpdatePending;
export const getSwaptionUpdateFinished = (state: SwaptionsState) => state.swaptionUpdateFinished;
export const getSwaptionUpdateError = (state: SwaptionsState) => state.swaptionUpdateError;

export const getSecurityDetail = (state: SwaptionsState) => state.securityDetail;
export const getSecurityDetailLoading = (state: SwaptionsState) => state.securityDetailLoading;
export const getSecurityDetailLoaded = (state: SwaptionsState) => state.securityDetailLoaded;
export const getSecurityDetailError = (state: SwaptionsState) => state.securityDetailError;
