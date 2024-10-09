import * as fromActions from '../actions/rcpm-pnl-rec.actions';

export interface State {

    activeDate: any;

    pnlRecData: any[];
    pnlRecDataLoading: boolean;
    pnlRecDataLoaded: boolean;
    pnlRecDataError?: string;

    posRecData: any[];
    posRecDataLoading: boolean;
    posRecDataLoaded: boolean;
    posRecDataError?: string;

    pricerRecData: any[];
    pricerRecDataLoading: boolean;
    pricerRecDataLoaded: boolean;
    pricerRecDataError?: string;
}

const initialState: State = {

    activeDate: new Date((new Date()).setDate( (new Date()).getDate() - 1)),

    pnlRecData: null,
    pnlRecDataLoading: false,
    pnlRecDataLoaded: false,

    posRecData: null,
    posRecDataLoading: false,
    posRecDataLoaded: false,

    pricerRecData: [],
    pricerRecDataLoading: false,
    pricerRecDataLoaded: false
};

export function reducer(state = initialState, action: fromActions.RCPMPnlRecActions): State {

    switch (action.type) {

        case fromActions.RCPMPnlRecActionTypes.SET_ACTIVE_DATE: {
            return {
                ...state,
                activeDate: action.payload
            };
        }

        case fromActions.RCPMPnlRecActionTypes.LOAD_PNL_REC_DATA: {
            return {
                ...state,
                pnlRecDataLoading: true,
                pnlRecDataLoaded: false,
                pnlRecDataError: null,
            };
        }

        case fromActions.RCPMPnlRecActionTypes.LOAD_PNL_REC_DATA_COMPLETE: {
            return {
                ...state,
                pnlRecData: action.payload,
                pnlRecDataLoading: false,
                pnlRecDataLoaded: true,
                pnlRecDataError: null,
            };
        }

        case fromActions.RCPMPnlRecActionTypes.LOAD_PNL_REC_DATA_FAILED: {
            return {
                ...state,
                pnlRecDataLoading: false,
                pnlRecDataLoaded: false,
                pnlRecDataError: action.payload,
            };
        }






        case fromActions.RCPMPnlRecActionTypes.LOAD_CRD_POS_REC_DATA: {
            return {
                ...state,
                posRecDataLoading: true,
                posRecDataLoaded: false,
                posRecDataError: null,
            };
        }

        case fromActions.RCPMPnlRecActionTypes.LOAD_CRD_POS_REC_DATA_COMPLETE: {
            return {
                ...state,
                posRecData: action.payload,
                posRecDataLoading: false,
                posRecDataLoaded: true,
                posRecDataError: null,
            };
        }

        case fromActions.RCPMPnlRecActionTypes.LOAD_CRD_POS_REC_DATA_FAILED: {
            return {
                ...state,
                posRecDataLoading: false,
                posRecDataLoaded: false,
                posRecDataError: action.payload,
            };
        }





        case fromActions.RCPMPnlRecActionTypes.LOAD_PRICER_REC_DATA: {
            return {
                ...state,
                pricerRecDataLoading: true,
                pricerRecDataLoaded: false,
                pricerRecDataError: null,
            };
        }

        case fromActions.RCPMPnlRecActionTypes.LOAD_PRICER_REC_DATA_COMPLETE: {
            return {
                ...state,
                pricerRecData: action.payload,
                pricerRecDataLoading: false,
                pricerRecDataLoaded: true,
                pricerRecDataError: null,
            };
        }

        case fromActions.RCPMPnlRecActionTypes.LOAD_PRICER_REC_DATA_FAILED: {
            return {
                ...state,
                pricerRecDataLoading: false,
                pricerRecDataLoaded: false,
                pricerRecDataError: action.payload,
            };
        }


        default: {
            return state;
        }
    }
}

export const getActiveDate = (state: State) => state.activeDate;

export const getPnlRecData = (state: State) => state.pnlRecData;
export const getPnlRecDataLoading = (state: State) => state.pnlRecDataLoading;
export const getPnlRecDataLoaded = (state: State) => state.pnlRecDataLoaded;
export const getPnlRecDataError = (state: State) => state.pnlRecDataError;

export const getPosRecData = (state: State) => state.posRecData;
export const getPosRecDataLoading = (state: State) => state.posRecDataLoading;
export const getPosRecDataLoaded = (state: State) => state.posRecDataLoaded;
export const getPosRecDataError = (state: State) => state.posRecDataError;

export const getPricerRecData = (state: State) => state.pricerRecData;
export const getPricerRecDataLoading = (state: State) => state.pricerRecDataLoading;
export const getPricerRecDataLoaded = (state: State) => state.pricerRecDataLoaded;
export const getPricerRecDataError = (state: State) => state.pricerRecDataError;
