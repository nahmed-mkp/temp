import * as fromActions from './../actions/tradename-helper.actions';
import * as fromModels from './../../models/tradename-helper.models';


export interface State {

    taxLots: fromModels.ITaxLot[];
    taxLotsLoaded: boolean;
    taxLotsLoading: boolean;
    taxLotsError?: string;

    tradeNames: fromModels.ITradeName[];
    tradeNamesLoading: boolean;
    tradeNamesLoaded: boolean;
    tradeNamesError?: string;

    tradeNameCounters: fromModels.ITradeNameCounter[];
    tradeNameCountersLoading: boolean;
    tradeNameCountersLoaded: boolean;
    tradeNameCountersError?: string;
}

const initialState: State = {

    taxLots: [],
    taxLotsLoading: false,
    taxLotsLoaded: false,

    tradeNames: [],
    tradeNamesLoading: false,
    tradeNamesLoaded: false,

    tradeNameCounters: [],
    tradeNameCountersLoading: false,
    tradeNameCountersLoaded: false
};

export function reducer(state = initialState, action: fromActions.TradeNameHelperActions): State {
    switch (action.type) {

        case fromActions.TradeNameHelperActionTypes.LOAD_TAXLOTS: {
            return {
                ...state,
                taxLotsLoading: true,
                taxLotsLoaded: false,
                taxLotsError: null
            };
        }

        case fromActions.TradeNameHelperActionTypes.LOAD_TAXLOTS_COMPLETE: {
            return {
                ...state,
                taxLots: [...action.payload],
                taxLotsLoading: false,
                taxLotsLoaded: true
            };
        }

        case fromActions.TradeNameHelperActionTypes.LOAD_TAXLOTS_FAILED: {
            return {
                ...state,
                taxLotsLoading: false,
                taxLotsLoaded: false,
                taxLotsError: action.payload
            };
        }

        case fromActions.TradeNameHelperActionTypes.LOAD_ALL_TRADENAMES: {
            return {
                ...state,
                tradeNamesLoading: true,
                tradeNamesLoaded: false,
                tradeNamesError: null
            };
        }

        case fromActions.TradeNameHelperActionTypes.LOAD_ALL_TRADENAMES_COMPLETE:
        case fromActions.TradeNameHelperActionTypes.REINSTATE_TRADENAME_COMPLETE:
        case fromActions.TradeNameHelperActionTypes.UPDATE_TRADENAME_COMPLETE: {
            return {
                ...state,
                tradeNames: [...action.payload],
                tradeNamesLoading: false,
                tradeNamesLoaded: true
            };
        }

        case fromActions.TradeNameHelperActionTypes.LOAD_ALL_TRADENAMES_FAILED: {
            return {
                ...state,
                tradeNamesLoading: false,
                tradeNamesLoaded: false,
                tradeNamesError: action.payload
            };
        }

        case fromActions.TradeNameHelperActionTypes.LOAD_TRADENAME_COUNTERS: {
            return {
                ...state,
                tradeNameCountersLoading: true,
                tradeNameCountersLoaded: false,
                tradeNameCountersError: null
            };
        }

        case fromActions.TradeNameHelperActionTypes.LOAD_TRADENAME_COUNTERS_COMPLETE: {
            return {
                ...state,
                tradeNameCounters: [...action.payload],
                tradeNameCountersLoading: false,
                tradeNameCountersLoaded: true
            };
        }

        case fromActions.TradeNameHelperActionTypes.LOAD_TRADENAME_COUNTERS_FAILED: {
            return {
                ...state,
                tradeNameCountersLoading: false,
                tradeNameCountersLoaded: false,
                tradeNameCountersError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getTaxlots = (state: State) => state.taxLots;
export const getTaxlotsLoading = (state: State) => state.taxLotsLoading;
export const getTaxlotsLoaded = (state: State) => state.taxLotsLoaded;
export const getTaxlotsError = (state: State) => state.taxLotsError;

export const getTradeNames = (state: State) => state.tradeNames;
export const getTradeNamesLoading = (state: State) => state.tradeNamesLoading;
export const getTradeNamesLoaded = (state: State) => state.tradeNamesLoaded;
export const getTradeNamesError = (state: State) => state.tradeNamesError;

export const getTradeNameCounters = (state: State) => state.tradeNameCounters;
export const getTradeNameCountersLoading = (state: State) => state.tradeNameCountersLoading;
export const getTradeNameCountersLoaded = (state: State) => state.tradeNameCountersLoaded;
export const getTradeNameCountersError = (state: State) => state.tradeNameCountersError;


