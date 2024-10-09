import * as fromActions from '../actions';


export interface DividendState {
    dividendInfo: any;
    dividendInfoLoadinng: boolean;
    dividendInfoLoaded: boolean;
    dividendInfoError?: string;

    dividendAllocationInfo: any;
    dividendAllocationInfoLoadinng: boolean;
    dividendAllocationInfoLoaded: boolean;
    dividendAllocationInfoError?: string;

    updateDividendAllocationPending: boolean;
    updateDividendAllocationFinished: boolean;
    updateDividendAllocationError?: string;
};

export const initialState: DividendState = {
    dividendInfo: [],
    dividendInfoLoadinng: false,
    dividendInfoLoaded: false,

    dividendAllocationInfo: [],
    dividendAllocationInfoLoadinng: false,
    dividendAllocationInfoLoaded: false,

    updateDividendAllocationPending: false,
    updateDividendAllocationFinished: false,
}


export function reducer(state = initialState, action: fromActions.DividendActions) {

    switch (action.type) {

        case fromActions.DividendActionTypes.LOAD_DIVIDEND_INFO: {
            return {
                ...state,
                dividendInfo: [],
                dividendInfoLoadinng: true,
                dividendInfoLoaded: false,
                dividendInfoError: null
            }
        }

        case fromActions.DividendActionTypes.LOAD_DIVIDEND_INFO_COMPLETE: {
            return {
                ...state,
                dividendInfo: action.payload,
                dividendInfoLoadinng: false,
                dividendInfoLoaded: true,
                dividendInfoError: null
            }
        }

        case fromActions.DividendActionTypes.LOAD_DIVIDEND_INFO_FAILED: {
            return {
                ...state,
                dividendInfo: [],
                dividendInfoLoadinng: false,
                dividendInfoLoaded: false,
                dividendInfoError: action.payload
            }
        }






        case fromActions.DividendActionTypes.LOAD_DIVIDEND_ALLOCATION_INFO: {
            return {
                ...state,
                dividendAllocationInfo: [],
                dividendAllocationInfoLoadinng: true,
                dividendAllocationInfoLoaded: false,
                dividendAllocationInfoError: null
            }
        }

        case fromActions.DividendActionTypes.LOAD_DIVIDEND_ALLOCATION_INFO_COMPLETE: {
            return {
                ...state,
                dividendAllocationInfo: action.payload,
                dividendAllocationInfoLoadinng: false,
                dividendAllocationInfoLoaded: true,
                dividendAllocationInfoError: null
            }
        }

        case fromActions.DividendActionTypes.LOAD_DIVIDEND_ALLOCATION_INFO_FAILED: {
            return {
                ...state,
                dividendAllocationInfo: [],
                dividendAllocationInfoLoadinng: false,
                dividendAllocationInfoLoaded: false,
                dividendAllocationInfoError: action.payload
            }
        }





        case fromActions.DividendActionTypes.UPDATE_DIVIDEND_ALLOCATION_INFO: {
            return {
                ...state,
                updateDividendAllocationPending: true,
                updateDividendAllocationFinished: false,
                updateDividendAllocationError: null
            };
        }

        case fromActions.DividendActionTypes.UPDATE_DIVIDEND_ALLOCATION_INFO_COMPLETE: {
            return {
                ...state,
                updateDividendAllocationPending: false,
                updateDividendAllocationFinished: true,
                updateDividendAllocationError: null
            };
        }

        case fromActions.DividendActionTypes.UPDATE_DIVIDEND_ALLOCATION_INFO_FAILED: {
            return {
                ...state,
                updateDividendAllocationPending: false,
                updateDividendAllocationFinished: false,
                updateDividendAllocationError: action.payload
            };
        }

        default:
            return state;
    }
}


export const getDividendInfo = (state: DividendState) => state.dividendInfo;
export const getDividendInfoLoading = (state: DividendState) => state.dividendInfoLoadinng;
export const getDividendInfoLoaded = (state: DividendState) => state.dividendInfoLoaded;
export const getDividendInfoError = (state: DividendState) => state.dividendInfoError;

export const getDividendAllocationInfo = (state: DividendState) => state.dividendAllocationInfo;
export const getDividendAllocationInfoLoading = (state: DividendState) => state.dividendAllocationInfoLoadinng;
export const getDividendAllocationInfoLoaded = (state: DividendState) => state.dividendAllocationInfoLoaded;
export const getDividendAllocationInfoError = (state: DividendState) => state.dividendAllocationInfoError;

export const getUpdateDividendAllocationPending = (state: DividendState) => state.updateDividendAllocationPending;
export const getUpdateDividendAllocationFinished = (state: DividendState) => state.updateDividendAllocationFinished;
export const getUpdateDividendAllocationError = (state: DividendState) => state.updateDividendAllocationError;
