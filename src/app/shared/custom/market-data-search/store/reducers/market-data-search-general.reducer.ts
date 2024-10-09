import * as fromModels from '../../models';
import * as fromActions from '../actions';

export interface State {
    searchCriteria: fromModels.ISecuritySearch;

    searchResults: any[];
    searchLoading: boolean;
    searchLoaded: boolean;
    searchError?: string;

    selectedSecurity?: string;

    marketDataTypes: any[];
    marketDataTypesLoading: boolean;
    marketDataTypesLoaded: boolean;
    marketDataTypesError?: string;

    // ---------------------------------
    enhancedSecuritySearchResults: fromModels.SecuritySearchResult[];
    enhancedSecuritySearchLoading: boolean;
    enhancedSecuritySearchLoaded: boolean;
    enhancedSecuritySearchError?: string;
}

const initialState: State = {
    searchCriteria: null,

    searchResults: [],
    searchLoading: false,
    searchLoaded: false,

    marketDataTypes: [],
    marketDataTypesLoading: false,
    marketDataTypesLoaded: false,

    enhancedSecuritySearchResults: [],
    enhancedSecuritySearchLoading: false,
    enhancedSecuritySearchLoaded: false,
};



export function reducer(state = initialState, action: fromActions.SecuritySearchActions): State {
    switch (action.type) {

        case fromActions.SecuritySearchActionTypes.SECURITY_SEARCH: {
            return {
                ...state,
                searchCriteria: action.payload,
                searchResults: [],
                searchLoading: true,
                searchLoaded: false,
                searchError: null
            };
        }

        case fromActions.SecuritySearchActionTypes.SECURITY_SEARCH_COMPLETE: {
            return {
                ...state,
                searchResults: [...action.payload],
                searchLoading: false,
                searchLoaded: true
            };
        }


        case fromActions.SecuritySearchActionTypes.SECURITY_SEARCH_FAILED: {
            return {
                ...state,
                searchError: action.payload,
                searchLoading: false,
                searchLoaded: false
            };
        }





        case fromActions.SecuritySearchActionTypes.SELECT_SECURITY: {
            return {
                ...state,
                selectedSecurity: action.payload
            };
        }

        case fromActions.SecuritySearchActionTypes.LOAD_MARKET_DATA_TYPES: {
            return {
                ...state,
                marketDataTypes: [],
                marketDataTypesLoading: true,
                marketDataTypesLoaded: false
            };
        }

        case fromActions.SecuritySearchActionTypes.LOAD_MARKET_DATA_TYPES_COMPLETE: {
            return {
                ...state,
                marketDataTypes: [...action.payload],
                marketDataTypesLoading: false,
                marketDataTypesLoaded: true
            };
        }

        case fromActions.SecuritySearchActionTypes.LOAD_MARKET_DATA_TYPES_FAILED: {
            return {
                ...state,
                marketDataTypesLoading: false,
                marketDataTypesLoaded: false,
                marketDataTypesError: action.payload
            };
        }

        case fromActions.SecuritySearchActionTypes.RESET_SEARCH: {
            return {
                ...state,
                searchResults: [],
                searchLoading: false,
                searchLoaded: false,
                searchError: null,

                marketDataTypes: [],
                marketDataTypesLoading: false,
                marketDataTypesLoaded: false,
                marketDataTypesError: null,

                selectedSecurity: null,

                enhancedSecuritySearchResults: [],
                enhancedSecuritySearchLoading: false,
                enhancedSecuritySearchLoaded: false,
                enhancedSecuritySearchError: null
            };
        }





        case fromActions.SecuritySearchActionTypes.ENHANCED_SECURITY_SEARCH: {
            return {
                ...state,
                enhancedSecuritySearchResults: [],
                enhancedSecuritySearchLoading: true,
                enhancedSecuritySearchLoaded: false,
                enhancedSecuritySearchError: null
            };
        }

        case fromActions.SecuritySearchActionTypes.ENHANCED_SECURITY_SEARCH_COMPLETE: {
            return {
                ...state,
                enhancedSecuritySearchResults: [...action.payload],
                enhancedSecuritySearchLoading: false,
                enhancedSecuritySearchLoaded: true
            };
        }


        case fromActions.SecuritySearchActionTypes.ENHANCED_SECURITY_SEARCH_FAILED: {
            return {
                ...state,
                enhancedSecuritySearchError: action.payload,
                enhancedSecuritySearchLoading: false,
                enhancedSecuritySearchLoaded: false
            };
        }





        default: {
            return state;
        }
    }
}

export const getSearchCriteria = (state: State) => state.searchCriteria;
export const getSearchResults = (state: State) => state.searchResults;
export const getSearchResultsLoading = (state: State) => state.searchLoading;
export const getSearchResultsLoaded = (state: State) => state.searchLoaded;
export const getSearchResultsError = (state: State) => state.searchError;

export const getSelectedSecurity = (state: State) => state.selectedSecurity;

export const getMarketDataTypes = (state: State) => state.marketDataTypes;
export const getMarketDataTypesLoading = (state: State) => state.marketDataTypesLoading;
export const getMarketDataTypesLoaded = (state: State) => state.marketDataTypesLoaded;
export const getMarketDataTypesError = (state: State) => state.marketDataTypesError;

export const getEnhancedSecuritySearchResults = (state: State) => state.enhancedSecuritySearchResults;
export const getEnhancedSecuritySearchLoading = (state: State) => state.enhancedSecuritySearchLoading;
export const getEnhancedSecuritySearchLoaded = (state: State) => state.enhancedSecuritySearchLoaded;
export const getEnhancedSecuritySearchError = (state: State) => state.enhancedSecuritySearchError;
