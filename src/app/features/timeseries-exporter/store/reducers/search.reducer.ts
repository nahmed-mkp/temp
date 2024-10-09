import * as fromModels from '../../models/search.models';
import * as fromActions from '../actions/search.actions';

export interface State {

    activeSecurityName: string;

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

    marktDataTypesWithSID: {
        [sid: string]: {
            data: any[];
            loading: boolean;
            loaded: boolean;
            error: string;
        }
    }
}

const initialState: State = {
    activeSecurityName: null,
    searchCriteria: null,

    searchResults: [],
    searchLoading: false,
    searchLoaded: false,

    marketDataTypes: [],
    marketDataTypesLoading: false,
    marketDataTypesLoaded: false,

    marktDataTypesWithSID: null,
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
                marketDataTypesLoaded: false,

                marktDataTypesWithSID: {
                    ...state.marktDataTypesWithSID,
                    [action.payload.securityName]: {
                        data: [],
                        loading: true,
                        loaded: false,
                        error: null
                    }
                }
            };
        }

        case fromActions.SecuritySearchActionTypes.LOAD_MARKET_DATA_TYPES_COMPLETE: {
            return {
                ...state,
                marketDataTypes: [...action.payload.data],
                marketDataTypesLoading: false,
                marketDataTypesLoaded: true,

                marktDataTypesWithSID: {
                    ...state.marktDataTypesWithSID,
                    [action.payload.securityName]: {
                        data: action.payload.data,
                        loading: false,
                        loaded: true,
                        error: null
                    }
                }
            };
        }

        case fromActions.SecuritySearchActionTypes.LOAD_MARKET_DATA_TYPES_FAILED: {
            return {
                ...state,
                marketDataTypesLoading: false,
                marketDataTypesLoaded: false,
                marketDataTypesError: action.payload.data,

                marktDataTypesWithSID: {
                    ...state.marktDataTypesWithSID,
                    [action.payload.securityName]: {
                        data: [],
                        loading: false,
                        loaded: false,
                        error: action.payload.data
                    }
                }
            };
        }



        case fromActions.SecuritySearchActionTypes.SET_ACTIVE_SECURITY_NAME: {
            return {
                ...state,
                activeSecurityName: action.payload
            }
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

                selectedSecurity: null
            }
        }

        default: {
            return state;
        }
    }
}

export const getActiveSecurityName = (state: State) => state.activeSecurityName;

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
export const getMarketDataTypesWithSID = (state: State) => state.marktDataTypesWithSID;
