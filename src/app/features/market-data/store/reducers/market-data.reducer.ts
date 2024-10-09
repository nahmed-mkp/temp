import * as fromActions from '../actions/market-data.actions';
import * as fromModels from '../../models/market-data.models';

export interface State {

    searchCriteria?: fromModels.IMarketDataSearch;
    searchLoading: boolean;
    searchLoaded: boolean;
    searchError?: string;

    searchResults: any[];

    marketDataDetail: any[];
    marketDataDetailLoading: boolean;
    marketDataDetailLoaded: boolean;
    marketDataDetailError?: string;

    marketDataPriceSource: any[];
    marketDataPriceSourceLoading: boolean;
    marketDataPriceSourceLoaded: boolean;
    marketDataPriceSourceError?: string;

    marketDataType: any[];
    marketDataTypeLoading: boolean;
    marketDataTypeLoaded: boolean;
    marketDataTypeError?: string;

    marketDataTimeseries: any[];
    marketDataTimeseriesLoading: boolean;
    marketDataTimeseriesLoaded: boolean;
    marketDataTimeseriesError?: string;


    marketDataBackFillPending: boolean;
    marketDataBackFillFinished: boolean;
    marketDataBackFillError?: string;
}

export const initialState: State = {

    searchLoading: false,
    searchLoaded: false,

    searchResults: [],

    marketDataDetail: [],
    marketDataDetailLoading: false,
    marketDataDetailLoaded: false,

    marketDataPriceSource: [],
    marketDataPriceSourceLoading: false,
    marketDataPriceSourceLoaded: false,

    marketDataType: [],
    marketDataTypeLoading: false,
    marketDataTypeLoaded: false,

    marketDataTimeseries: [],
    marketDataTimeseriesLoading: false,
    marketDataTimeseriesLoaded: false,

    marketDataBackFillPending: false,
    marketDataBackFillFinished: false,
};

export function reducer(state = initialState, action: fromActions.MarketDataActions) {
    switch (action.type) {

        case fromActions.MarketDataActionTypes.SEARCH_MARKET_DATA: {
            return {
                ...state,
                searchResults: [],
                searchCriteria: action.payload,
                searchLoading: true,
                searchLoaded: false,
                searchError: null
            };
        }

        case fromActions.MarketDataActionTypes.SEARCH_MARKET_DATA_COMPLETE: {
            const payload = action.payload;
            const ids = payload.map((map) => map.mapId);
            return {
                ...state,

                searchCriteria: action.payload,
                searchLoading: true,
                searchLoaded: false,
                searchError: null
            };
        }

        case fromActions.MarketDataActionTypes.SEARCH_MARKET_DATA_FAILED: {
            return {
                ...state,

                searchLoading: false,
                searchLoaded: false,
                searchError: action.payload
            };
        }







        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_DETAIL: {
            return {
                ...state,
                marketDataDetail: [],
                marketDataDetailLoading: true,
                marketDataDetailLoaded: false,
                marketDataDetailError: null
            }
        }

        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_DETAIL_COMPLETE: {
            return {
                ...state,
                marketDataDetail: action.payload,
                marketDataDetailLoading: false,
                marketDataDetailLoaded: true,
                marketDataDetailError: null
            }
        }

        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_DETAIL_FAILED: {
            return {
                ...state,
                marketDataDetail: [],
                marketDataDetailLoading: false,
                marketDataDetailLoaded: false,
                marketDataDetailError: action.payload
            }
        }







        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_PRICE_SOURCE: {
            return {
                ...state,
                marketDataPriceSource: [],
                marketDataPriceSourceLoading: true,
                marketDataPriceSourceLoaded: false,
                marketDataPriceSourceError: null
            }
        }

        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_PRICE_SOURCE_COMPLETE: {
            return {
                ...state,
                marketDataPriceSource: action.payload,
                marketDataPriceSourceLoading: false,
                marketDataPriceSourceLoaded: true,
                marketDataPriceSourceError: null
            }
        }

        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_PRICE_SOURCE_FAILED: {
            return {
                ...state,
                marketDataPriceSource: [],
                marketDataPriceSourceLoading: false,
                marketDataPriceSourceLoaded: false,
                marketDataPriceSourceError: action.payload
            }
        }







        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_TYPE: {
            return {
                ...state,
                marketDataType: [],
                marketDataTypeLoading: true,
                marketDataTypeLoaded: false,
                marketDataTypeError: null
            }
        }

        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_TYPE_COMPLETE: {
            return {
                ...state,
                marketDataType: action.payload,
                marketDataTypeLoading: false,
                marketDataTypeLoaded: true,
                marketDataTypeError: null
            }
        }

        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_TYPE_FAILED: {
            return {
                ...state,
                marketDataType: [],
                marketDataTypeLoading: false,
                marketDataTypeLoaded: false,
                marketDataTypeError: action.payload
            }
        }






        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_TIMESERIES: {
            return {
                ...state,
                marketDataTimeseries: [],
                marketDataTimeseriesLoading: true,
                marketDataTimeseriesLoaded: false,
                marketDataTimeseriesError: null
            }
        }

        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_TIMESERIES_COMPLETE: {
            return {
                ...state,
                marketDataTimeseries: action.payload,
                marketDataTimeseriesLoading: false,
                marketDataTimeseriesLoaded: true,
                marketDataTimeseriesError: null
            }
        }

        case fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_TIMESERIES_FAILED: {
            return {
                ...state,
                marketDataTimeseries: [],
                marketDataTimeseriesLoading: false,
                marketDataTimeseriesLoaded: false,
                marketDataTimeseriesError: action.payload
            }
        }









        case fromActions.MarketDataActionTypes.BACKFILL_MARKET_DATA: {
            return {
                ...state,
                marketDataBackFillPending: true,
                marketDataBackFillFinished: false,
                marketDataBackFillError: null,
            }
        }

        case fromActions.MarketDataActionTypes.BACKFILL_MARKET_DATA_COMPLETE: {
            return {
                ...state,
                marketDataBackFillPending: false,
                marketDataBackFillFinished: true,
                marketDataBackFillError: null,
            }
        }

        case fromActions.MarketDataActionTypes.BACKFILL_MARKET_DATA_FAILED: {
            return {
                ...state,
                marketDataBackFillPending: false,
                marketDataBackFillFinished: false,
                marketDataBackFillError: action.payload,
            }
        }



        default:
            return state;
    }
}

// Search
export const getSearchCriteria = (state: State) => state.searchCriteria;
export const getSearchLoading = (state: State) => state.searchLoading;
export const getSearchLoaded = (state: State) => state.searchLoaded;
export const getSearchError = (state: State) => state.searchError;
export const getSearchResults = (state: State) => state.searchResults;

export const getMarketDataDetail = (state: State) => state.marketDataDetail;
export const getMarketDataDetailLoading = (state: State) => state.marketDataDetailLoading;
export const getMarketDataDetailLoaded = (state: State) => state.marketDataDetailLoaded;
export const getMarketDataDetailError = (state: State) => state.marketDataDetailError;

export const getMarketDataPriceSource = (state: State) => state.marketDataPriceSource;
export const getMarketDataPriceSourceLoading = (state: State) => state.marketDataPriceSourceLoading;
export const getMarketDataPriceSourceLoaded = (state: State) => state.marketDataPriceSourceLoaded;
export const getMarketDataPriceSourceError = (state: State) => state.marketDataPriceSourceError;

export const getMarketDataType = (state: State) => state.marketDataType;
export const getMarketDataTypeLoading = (state: State) => state.marketDataTypeLoading;
export const getMarketDataTypeLoaded = (state: State) => state.marketDataTypeLoaded;
export const getMarketDataTypeError = (state: State) => state.marketDataTypeError;

export const getMarketDataTimeseries = (state: State) => state.marketDataTimeseries;
export const getMarketDataTimeseriesLoading = (state: State) => state.marketDataTimeseriesLoading;
export const getMarketDataTimeseriesLoaded = (state: State) => state.marketDataTimeseriesLoaded;
export const getMarketDataTimeseriesError = (state: State) => state.marketDataTimeseriesError;

export const getMarketDataBackFillPending = (state: State) => state.marketDataBackFillPending;
export const getMarketDataBackFillFinished = (state: State) => state.marketDataBackFillFinished;
export const getMarketDataBackFillError = (state: State) => state.marketDataBackFillError;



