import * as fromActions from '../actions';

export interface OptionsState {

    optionsEntity: any;
    optionsLoading: boolean;
    optionsLoaded: boolean;
    optionsError?: string;

    optionUpdatePending: boolean;
    optionUpdateFinished: boolean;
    optionUpdateError?: string;

    optionOwnership: any;
    optionOwnershipLoading: boolean;
    optionOwnershipLoaded: boolean;
    optionOwnershipError?: string;

    securityDetail: any;
    securityDetailLoading: boolean;
    securityDetailLoaded: boolean;
    securityDetailError?: string;


    optionsPricingMethodUpdatePending: boolean;
    optionsPricingMethodUpdateFinished: boolean;
    optionsPricingMethodUpdateError?: string;
}

export const initialState: OptionsState = {
    optionsEntity: {},
    optionsLoading: false,
    optionsLoaded: false,
    optionsError: null,

    optionOwnership: [],
    optionOwnershipLoading: false,
    optionOwnershipLoaded: false,

    securityDetail: [],
    securityDetailLoading: false,
    securityDetailLoaded: false,

    optionUpdatePending: false,
    optionUpdateFinished: false,

    optionsPricingMethodUpdatePending: false,
    optionsPricingMethodUpdateFinished: false,
};

export function reducer(state = initialState, action: fromActions.OptionsActions) {
    switch (action.type) {

        case fromActions.OptionsActionTypes.LOAD_OPTIONS: {
            return {
                ...state,
                optionsLoading: true,
                optionsLoaded: false,
                optionsError: null
            };
        }

        case fromActions.OptionsActionTypes.LOAD_OPTIONS_COMPLETE: {
            return {
                ...state,
                optionsEntity: action.payload,
                optionsLoading: false,
                optionsLoaded: true,
                optionsError: null
            };
        }

        case fromActions.OptionsActionTypes.LOAD_OPTIONS_FAILED: {
            return {
                ...state,
                optionsLoading: false,
                optionsLoaded: false,
                optionsError: action.payload
            };
        }


        case fromActions.OptionsActionTypes.LOAD_OPTION_OWNERSHIP: {
            return {
                ...state,
                optionOwnershipLoading: true,
                optionOwnershipLoaded: false,
                optionOwnershipError: null
            };
        }

        case fromActions.OptionsActionTypes.LOAD_OPTION_OWNERSHIP_COMPLETE: {
            return {
                ...state,
                optionOwnership: action.payload,
                optionOwnershipLoading: false,
                optionOwnershipLoaded: true,
                optionOwnershipError: null
            };
        }

        case fromActions.OptionsActionTypes.LOAD_OPTION_OWNERSHIP_FAILED: {
            return {
                ...state,
                optionOwnership: [],
                optionOwnershipLoading: false,
                optionOwnershipLoaded: false,
                optionOwnershipError: action.payload
            };
        }


        case fromActions.OptionsActionTypes.LOAD_OPTION_DETAIL: {
            return {
                ...state,
                securityDetail: [],
                securityDetailLoading: true,
                securityDetailLoaded: false,
                securityDetailError: null
            };
        }

        case fromActions.OptionsActionTypes.LOAD_OPTION_DETAIL_COMPLETE: {
            return {
                ...state,
                securityDetail: action.payload,
                securityDetailLoading: false,
                securityDetailLoaded: true,
                securityDetailError: null
            };
        }


        case fromActions.OptionsActionTypes.LOAD_OPTION_DETAIL_FAILED: {
            return {
                ...state,
                securityDetailLoading: false,
                securityDetailLoaded: false,
                securityDetailError: action.payload
            };
        }




        case fromActions.OptionsActionTypes.UPDATE_OPTION: {
            return {
                ...state,
                optionUpdatePending: true,
                optionUpdateFinished: false,
                optionUpdateError: null
            };
        }

        case fromActions.OptionsActionTypes.UPDATE_OPTION_COMPLETE: {
            return {
                ...state,
                optionUpdatePending: false,
                optionUpdateFinished: true,
                optionUpdateError: null
            };
        }

        case fromActions.OptionsActionTypes.UPDATE_OPTION_FAILED: {
            return {
                ...state,
                optionUpdatePending: false,
                optionUpdateFinished: false,
                optionUpdateError: action.payload
            };
        }

        case fromActions.OptionsActionTypes.UPDATE_OPTION_PRICE_METHOD: {
            return {
                ...state,
                optionUpdatePending: true,
                optionUpdateFinished: false,
                optionUpdateError: null
            };
        }

        case fromActions.OptionsActionTypes.UPDATE_OPTION_PRICE_METHOD_COMPLETE: {
            return {
                ...state,
                optionUpdatePending: false,
                optionUpdateFinished: true,
                optionUpdateError: null
            };
        }

        case fromActions.OptionsActionTypes.UPDATE_OPTION_PRICE_METHOD_FAILED: {
            return {
                ...state,
                optionUpdatePending: false,
                optionUpdateFinished: false,
                optionUpdateError: action.payload
            };
        }
        
        default:
            return state;
    }
}

export const getOptionsEntities = (state: OptionsState) => state.optionsEntity;
export const getOptionsLoading = (state: OptionsState) => state.optionsLoading;
export const getOptionsLoaded = (state: OptionsState) => state.optionsLoaded;
export const getOptionsError = (state: OptionsState) => state.optionsError;

export const getOptionsUpdatePending = (state: OptionsState) => state.optionUpdatePending;
export const getOptionsUpdateComplete = (state: OptionsState) => state.optionUpdateFinished;
export const getOptionsUpdateError = (state: OptionsState) => state.optionUpdateError;

export const getOptionsPriceMethodUpdatePending = (state: OptionsState) => state.optionsPricingMethodUpdatePending;
export const getOptionsPriceMethodUpdateComplete = (state: OptionsState) => state.optionsPricingMethodUpdateFinished;
export const getOptionsPriceMethodUpdateError = (state: OptionsState) => state.optionsPricingMethodUpdateError;

export const getSecurityDetail = (state: OptionsState) => state.securityDetail;
export const getSecurityDetailLoading = (state: OptionsState) => state.securityDetailLoading;
export const getSecurityDetailLoaded = (state: OptionsState) => state.securityDetailLoaded;
export const getSecurityDetailError = (state: OptionsState) => state.securityDetailError;

export const getOptionOwnership = (state: OptionsState) => state.optionOwnership;
export const getOptionOwnershipLoading = (state: OptionsState) => state.optionOwnershipLoading;
export const getOptionOwnershipLoaded = (state: OptionsState) => state.optionOwnershipLoaded;
export const getOptionOwnershipError = (state: OptionsState) => state.optionOwnershipError;
