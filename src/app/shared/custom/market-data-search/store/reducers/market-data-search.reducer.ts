import * as fromActions from '../actions/market-data-search.actions';
import * as fromModels from '../../models';

export interface State {
    criteria: fromModels.MarketDataSearchCriteria;
    results: fromModels.MarketDataSearchResult[];
    providers: fromModels.MarketDataProvider[];
    loading: boolean;
    loaded: boolean;
    error?: string;

    searchResultForTimeseriesExporter: fromModels.MarketDataForTimeseriesExporter[];
    searchResultForTimeseriesExporterLoading: boolean;
    searchResultForTimeseriesExporterLoaded: boolean;
    searchResultForTimeseriesExporterError?: string;

    securitySearchResultForTimeseriesExporter: fromModels.SecurityForTimeseriesExporter[];
    securitySearchResultForTimeseriesExporterLoading: boolean;
    securitySearchResultForTimeseriesExporterLoaded: boolean;
    securitySearchResultForTimeseriesExporterError?: string;
}

const initialState: State = {
    criteria: null,
    results: [],
    providers: [],
    loading: false,
    loaded: false,

    searchResultForTimeseriesExporter: [],
    searchResultForTimeseriesExporterLoading: false,
    searchResultForTimeseriesExporterLoaded: false,

    securitySearchResultForTimeseriesExporter: [],
    securitySearchResultForTimeseriesExporterLoading: false,
    securitySearchResultForTimeseriesExporterLoaded: false
};

export function reducer(state = initialState, action: fromActions.MarketDataSearchActions ): State {
    switch (action.type) {

        case fromActions.MarketDataSearchActionTypes.LOAD_PROVIDERS: {
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null
            };
        }

        case fromActions.MarketDataSearchActionTypes.LOAD_PROVIDERS_COMPLETE: {
            return {
                ...state,
                providers: [...action.payload],
                loading: false,
                loaded: true
            };
        }

        case fromActions.MarketDataSearchActionTypes.LOAD_PROVIDERS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case fromActions.MarketDataSearchActionTypes.UPDATE_CRITERIA: {
            return {
                ...state,
                criteria: action.payload
            };
        }

        case fromActions.MarketDataSearchActionTypes.SEARCH_MARKET_DATA: {
            return {
                ...state,
                criteria: action.payload,
                loading: true,
                loaded: false,
                error: null
            };
        }

        case fromActions.MarketDataSearchActionTypes.SEARCH_MARKET_DATA_COMPLETE: {
            return {
                ...state,
                results: [...action.payload]
            };
        }

        case fromActions.MarketDataSearchActionTypes.SEARCH_MARKET_DATA_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }






        case fromActions.MarketDataSearchActionTypes.SEARCH_MARKET_DATA_FOR_TIMESERIES_EXPORTER: {
            return {
                ...state,
                searchResultForTimeseriesExporter: [],
                searchResultForTimeseriesExporterLoading: true,
                searchResultForTimeseriesExporterLoaded: false
            };
        }

        case fromActions.MarketDataSearchActionTypes.SEARCH_MARKET_DATA_FOR_TIMESERIES_EXPORTER_COMPLETE: {
            return {
                ...state,
                searchResultForTimeseriesExporter: [...action.payload],
                searchResultForTimeseriesExporterLoading: false,
                searchResultForTimeseriesExporterLoaded: true
            };
        }

        case fromActions.MarketDataSearchActionTypes.SEARCH_MARKET_DATA_FOR_TIMESERIES_EXPORTER_FAILED: {
            return {
                ...state,
                searchResultForTimeseriesExporterLoading: false,
                searchResultForTimeseriesExporterLoaded: false,
                searchResultForTimeseriesExporterError: action.payload
            };
        }



        case fromActions.MarketDataSearchActionTypes.SEARCH_SECURITY_FOR_TIMESERIES_EXPORTER: {
            return {
                ...state,
                securitySearchResultForTimeseriesExporter: [],
                securitySearchResultForTimeseriesExporterLoading: true,
                securitySearchResultForTimeseriesExporterLoaded: false
            };
        }

        case fromActions.MarketDataSearchActionTypes.SEARCH_SECURITY_FOR_TIMESERIES_EXPORTER_COMPLETE: {
            return {
                ...state,
                securitySearchResultForTimeseriesExporter: [...action.payload],
                securitySearchResultForTimeseriesExporterLoading: true,
                securitySearchResultForTimeseriesExporterLoaded: false
            };
        }

        case fromActions.MarketDataSearchActionTypes.SEARCH_MARKET_DATA_FOR_TIMESERIES_EXPORTER_FAILED: {
            return {
                ...state,
                searchResultForTimeseriesExporterLoading: false,
                searchResultForTimeseriesExporterLoaded: false,
                searchResultForTimeseriesExporterError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getProviders = (state: State) => state.providers;
export const getCriteria = (state: State) => state.criteria;
export const getResults = (state: State) => state.results;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getError = (state: State) => state.error;

export const getSearchResultForTimeseriesExporter = (state: State) => state.searchResultForTimeseriesExporter;
export const getSearchResultForTimeseriesExporterLoading = (state: State) => state.searchResultForTimeseriesExporterLoading;
export const getSearchResultForTimeseriesExporterLoaded = (state: State) => state.searchResultForTimeseriesExporterLoaded;
export const getSearchResultForTimeseriesExporterError = (state: State) => state.searchResultForTimeseriesExporterError;

export const getSecuritySearchResultForTimeseriesExporter = (state: State) => state.securitySearchResultForTimeseriesExporter;
export const getSecuritySearchResultForTimeseriesExporterLoading = (state: State) => state.securitySearchResultForTimeseriesExporterLoading;
export const getSecuritySearchResultForTimeseriesExporterLoaded = (state: State) => state.securitySearchResultForTimeseriesExporterLoaded;
export const getSecuritySearchResultForTimeseriesExporterError = (state: State) => state.securitySearchResultForTimeseriesExporterError;
