import * as fromModels from '../../models/trades.models';
import * as fromActions from '../actions/trades.actions';

export interface BenchmarkTradesState {

    tradeDates: string[];
    tradeDatesLoading: boolean;
    tradeDatesLoaded: boolean;
    tradeDatesError?: string;

    selectedTradeDate?: string;

    fxTradeIds: number[];
    fxTradeEntities: {[id: number]: fromModels.IFXTrade};
    fxTradesLoading: boolean;
    fxTradesLoaded: boolean;
    fxTradesError?: string;
}

export const initialState: BenchmarkTradesState = {

    tradeDates: [],
    tradeDatesLoading: false,
    tradeDatesLoaded: false,

    fxTradeIds: [],

    fxTradeEntities: {},
    fxTradesLoading: false,
    fxTradesLoaded: false
};


export function reducer(state = initialState, action: fromActions.BenchmarkTradesActions): BenchmarkTradesState {

    switch (action.type) {

        case fromActions.BenchmarkTradesActionTypes.LOAD_TRADE_DATES: {
            return {
                ...state,
                tradeDatesLoading: true,
                tradeDatesLoaded: false,
                tradeDatesError: null
            };
        }

        case fromActions.BenchmarkTradesActionTypes.LOAD_TRADE_DATES_COMPLETE: {
            return {
                ...state,
                tradeDatesLoading: false,
                tradeDatesLoaded: true,
                tradeDates: [...action.payload]
            };
        }

        case fromActions.BenchmarkTradesActionTypes.LOAD_TRADE_DATES_FAILED: {
            return {
                ...state,
                tradeDatesLoading: false,
                tradeDatesLoaded: false,
                tradeDatesError: action.payload
            };
        }

        case fromActions.BenchmarkTradesActionTypes.LOAD_FX_TRADES:
             {
            return {
                ...state,
                selectedTradeDate: action.payload,
                fxTradesLoading: true,
                fxTradesLoaded: false,
                fxTradesError: null
            };
        }

        case fromActions.BenchmarkTradesActionTypes.SEND_FX_TRADES_TO_CRD: {
            return {
                ...state,
                fxTradesLoading: true,
                fxTradesLoaded: false,
                fxTradesError: null
            };
        }

        case fromActions.BenchmarkTradesActionTypes.LOAD_FX_TRADES_COMPLETE:
        case fromActions.BenchmarkTradesActionTypes.SEND_FX_TRADES_TO_CRD_COMPLETE: {
            const payload = action.payload;
            const ids = payload.map((trade: fromModels.IFXTrade) => trade.id);
            const newEntities = payload.reduce((entities: {[id: number]: fromModels.IFXTrade}, item: fromModels.IFXTrade) => {
                return Object.assign({}, entities, {[item.id]: item});
            }, {});
            return {
                ...state,
                fxTradesLoading: false,
                fxTradesLoaded: true,
                fxTradeIds: [...ids],
                fxTradeEntities: newEntities
            };
        }

        case fromActions.BenchmarkTradesActionTypes.LOAD_TRADE_DATES_FAILED:
        case fromActions.BenchmarkTradesActionTypes.SEND_FX_TRADES_TO_CRD_FAILED: {
            return {
                ...state,
                fxTradesLoading: false,
                fxTradesLoaded: false,
                fxTradesError: action.payload
            };
        }

        default: {
            return state;
        }

    }
}

/**
 * Selectors
 */
export const getTradeDates = (state: BenchmarkTradesState) => state.tradeDates;
export const getTradeDatesLoadingStatus = (state: BenchmarkTradesState) => state.tradeDatesLoading;
export const getTradeDatesLoadedStatus = (state: BenchmarkTradesState) => state.tradeDatesLoaded;
export const getTradeDatesError = (state: BenchmarkTradesState) => state.tradeDatesError;
export const getSelectedTradeDate = (state: BenchmarkTradesState) => state.selectedTradeDate;

export const getFXTradeIds = (state: BenchmarkTradesState) => state.fxTradeIds;
export const getFXTradeEntities = (state: BenchmarkTradesState) => state.fxTradeEntities;
export const getFXTradesLoadingStatus = (state: BenchmarkTradesState) => state.fxTradesLoading;
export const getFXTradesLoadedStatus = (state: BenchmarkTradesState) => state.fxTradesLoaded;
export const getFXTradesError = (state: BenchmarkTradesState) => state.fxTradesError;
