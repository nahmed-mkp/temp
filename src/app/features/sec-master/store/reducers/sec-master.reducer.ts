import * as fromActions from './../actions/sec-master.actions';
import * as fromModels from './../../models/sec-master.models';

export interface SecMasterState {
    searchTerm?: string;

    searchResultIds: number[];
    searchResultEntities: { [id: number]: any };
    searching: boolean;
    searched: boolean;
    searchError?: string;

    recentSecuritiesLoading: boolean;
    recentSecuritiesLoaded: boolean;
    recentSecuritiesError?: string;

    securityTags: string[];
    securityTagsLoading: boolean;
    securityTagsLoaded: boolean;
    securityTagsError?: string;

    updateSecurityTagPending: boolean;
    updateSecurityTagFinished: boolean;
    updateSecurityTagError?: string;

    selectedSecurity?: number;

    sids: number[];
    securityEntities: { [id: number]: fromModels.ISecurity };
    securityLoading: boolean;
    securityLoaded: boolean;
    securityError?: string;

    marketDataEntities: { [id: number]: fromModels.IMarketData[] };
    marketDataLoading: boolean;
    marketDataLoaded: boolean;
    marketDataError?: string;

    selectedMarketData?: number;

    mdids: number[];
    marketDataPointEntities: { [id: number]: fromModels.IMarketDataPoint[] };
    marketDataPointsLoading: boolean;
    marketDataPointsLoaded: boolean;
    marketDataPointsError?: string;
}

export const initialState: SecMasterState = {

    searchResultIds: [],
    searchResultEntities: {},
    searching: false,
    searched: false,

    recentSecuritiesLoading: false,
    recentSecuritiesLoaded: false,

    securityTags: [],
    securityTagsLoading: false,
    securityTagsLoaded: false,

    updateSecurityTagPending: false,
    updateSecurityTagFinished: false,

    sids: [],
    securityEntities: {},
    securityLoading: false,
    securityLoaded: false,

    marketDataEntities: {},
    marketDataLoading: false,
    marketDataLoaded: false,

    mdids: [],
    marketDataPointEntities: {},
    marketDataPointsLoading: false,
    marketDataPointsLoaded: false
};

export function reducer(state = initialState, action: fromActions.SecMasterActions) {
    switch (action.type) {

        case fromActions.SecMasterActionTypes.SEARCH_SECURITIES: {
            return {
                ...state,
                searchTerm: action.payload,
                searching: true,
                searched: false,
                searchError: null
            };
        }

        case fromActions.SecMasterActionTypes.SEARCH_SECURITIES_COMPLETE: {
            const payload = action.payload;
            const ids = payload.map((item) => item.sid);
            const newEntities = payload.reduce((entities: { [id: number]: any }, item: any) => {
                return Object.assign({}, entities, { [item.sid]: item });
            }, {});
            return {
                ...state,
                searching: false,
                searched: true,
                searchResultIds: [...ids],
                searchResultEntities: newEntities
            };
        }

        case fromActions.SecMasterActionTypes.SEARCH_SECURITIES_FAILED: {
            return {
                ...state,
                searching: false,
                searched: false,
                searchError: action.payload
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_RECENT_SECURITIES: {
            return {
                ...state,
                recentSecuritiesLoading: true,
                recentSecuritiesLoaded: false,
                recentSecuritiesError: null
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_RECENT_SECURITIES_COMPLETE: {
            const payload = action.payload;
            const ids = payload.map((item) => item.sid);
            const newEntities = payload.reduce((entities: { [id: number]: any }, item: any) => {
                return Object.assign({}, entities, { [item.sid]: item });
            }, {});
            return {
                ...state,
                recentSecuritiesLoading: false,
                recentSecuritiesLoaded: true,
                searchResultIds: [...ids],
                searchResultEntities: newEntities
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_RECENT_SECURITIES_FAILED: {
            const payload = action.payload;
            return {
                ...state,
                recentSecuritiesLoading: false,
                recentSecuritiesLoaded: false,
                recentSecuritiesError: action.payload
            };
        }





        case fromActions.SecMasterActionTypes.LOAD_SECURITY_TAGS: {
            return {
                ...state,
                securityTagsLoading: true,
                securityTagsLoaded: false,
                securityTagsError: null
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_SECURITY_TAGS_COMPLETE: {
            return {
                ...state,
                securityTagsLoading: false,
                securityTagsLoaded: true,
                securityTags: [...action.payload]
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_SECURITY_TAGS_FAILED: {
            return {
                ...state,
                securityTagsLoading: false,
                securityTagsLoaded: true,
                securityTagsError: action.payload
            };
        }





        case fromActions.SecMasterActionTypes.UPDATE_SECURITY_TAG: {
            return {
                ...state,
                updateSecurityTagPending: true,
                updateSecurityTagFinished: false,
                updateSecurityTagError: null,
            };
        }

        case fromActions.SecMasterActionTypes.UPDATE_SECURITY_TAG_COMPLETE: {
            return {
                ...state,
                updateSecurityTagPending: false,
                updateSecurityTagFinished: true,
                updateSecurityTagError: null,
            };
        }

        case fromActions.SecMasterActionTypes.UPDATE_SECURITY_TAG_FAILED: {
            return {
                ...state,
                updateSecurityTagPending: false,
                updateSecurityTagFinished: false,
                updateSecurityTagError: action.payload,
            };
        }







        case fromActions.SecMasterActionTypes.LOAD_SECURITY_TAGS: {
            return {
                ...state,
                securityTagsLoading: true,
                securityTagsLoaded: false,
                securityTagsError: null
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_SECURITY_TAGS_COMPLETE: {
            return {
                ...state,
                securityTagsLoading: false,
                securityTagsLoaded: true,
                securityTags: [...action.payload]
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_SECURITY: {
            return {
                ...state,
                selectedSecurity: action.payload,
                selectedMarketData: null,
                securityLoading: true,
                securityLoaded: false,
                securityError: null
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_SECURITY_COMPLETE: {
            const payload = action.payload;
            const newSID = payload.sid;
            const newSIDs = [newSID, ...state.sids.filter((sid) => sid !== newSID)];
            const newEntities = Object.assign({}, state.securityEntities, { [newSID]: payload });
            return {
                ...state,
                securityLoading: false,
                securityLoaded: true,
                sids: newSIDs,
                selectedMarketData: null,
                securityEntities: newEntities
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_SECURITY_FAILED: {
            const payload = action.payload;
            return {
                ...state,
                securityLoading: false,
                securityLoaded: false,
                selectedMarketData: null,
                securityError: action.payload
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_SECURITY_MARKET_DATA: {
            return {
                ...state,
                marketDataLoading: true,
                marketDataLoaded: false,
                selectedMarketData: null,
                marketDataError: null
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_SECURITY_MARKET_DATA_COMPLETE: {
            const payload = action.payload;
            if (payload && payload.length > 0) {
                const newSID = payload[0].sid;
                const newSIDs = [newSID, ...state.sids.filter((sid) => sid !== newSID)];
                const newMarketDataEntities = Object.assign({}, state.marketDataEntities, { [newSID]: action.payload });
                return {
                    ...state,
                    sids: [...newSIDs],
                    marketDataLoading: false,
                    marketDataLoaded: true,
                    selectedMarketData: null,
                    marketDataEntities: newMarketDataEntities
                };
            } else {
                return {
                    ...state
                };
            }
        }

        case fromActions.SecMasterActionTypes.LOAD_SECURITY_MARKET_DATA_FAILED: {
            return {
                ...state,
                marketDataLoading: false,
                marketDataLoaded: false,
                selectedMarketData: null,
                marketDataError: action.payload
            };
        }


        case fromActions.SecMasterActionTypes.LOAD_MARKET_DATA_POINTS: {
            return {
                ...state,
                selectedMarketData: action.payload,
                marketDataPointsLoading: true,
                marketDataPointsLoaded: false,
                marketDataPointsError: null
            };
        }

        case fromActions.SecMasterActionTypes.LOAD_MARKET_DATA_POINTS_COMPLETE: {
            const payload = action.payload;
            if (payload && payload.length > 0) {
                const newMDID = payload[0].mdid;
                const newMDIDs = [newMDID, ...state.mdids.map((mdid) => mdid !== newMDID)];
                const newMarketDataPointEntities = Object.assign({}, state.marketDataEntities, { [newMDID]: action.payload });
                return {
                    ...state,
                    mdids: [...newMDIDs],
                    marketDataPointsLoading: false,
                    marketDataPointsLoaded: true,
                    marketDataPointEntities: newMarketDataPointEntities
                };
            } else {
                return {
                    ...state
                };
            }
        }

        case fromActions.SecMasterActionTypes.LOAD_MARKET_DATA_POINTS_FAILED: {
            return {
                ...state,
                marketDataPointsLoading: false,
                marketDataPointsLoaded: false,
                marketDataPointsError: action.payload
            };
        }

        default:
            return state;
    }
}

// Search
export const getSearchTerm = (state: SecMasterState) => state.searchTerm;
export const getSearching = (state: SecMasterState) => state.searching;
export const getSearched = (state: SecMasterState) => state.searched;
export const getSearchError = (state: SecMasterState) => state.searchError;
export const getSearchResultIds = (state: SecMasterState) => state.searchResultIds;
export const getSearchResultEntities = (state: SecMasterState) => state.searchResultEntities;

// Recent securities
export const getRecentSecuritiesLoading = (state: SecMasterState) => state.recentSecuritiesLoading;
export const getRecentSecuritiesLoaded = (state: SecMasterState) => state.recentSecuritiesLoaded;
export const getRecentSecuritiesError = (state: SecMasterState) => state.recentSecuritiesError;

// Security Tags
export const getSecurityTagsLoading = (state: SecMasterState) => state.securityTagsLoading;
export const getSecurityTagsLoaded = (state: SecMasterState) => state.securityTagsLoaded;
export const getSecurityTagsError = (state: SecMasterState) => state.securityTagsError;
export const getSecurityTags = (state: SecMasterState) => state.securityTags;

export const getSecurityTagsUpdatePending = (state: SecMasterState) => state.updateSecurityTagPending;
export const getSecurityTagsUpdateFinished = (state: SecMasterState) => state.updateSecurityTagFinished;
export const getSecurityTagsUpdateError = (state: SecMasterState) => state.updateSecurityTagError;

// Security
export const getSelectedSecurity = (state: SecMasterState) => state.selectedSecurity;
export const getSecurityEntities = (state: SecMasterState) => state.securityEntities;
export const getSecurityLoading = (state: SecMasterState) => state.securityLoading;
export const getSecurityLoaded = (state: SecMasterState) => state.securityLoaded;
export const getSecurityError = (state: SecMasterState) => state.securityError;

// Security MarketData
export const getMarketDataLoading = (state: SecMasterState) => state.marketDataLoading;
export const getMarketDataLoaded = (state: SecMasterState) => state.marketDataLoaded;
export const getMarketDataError = (state: SecMasterState) => state.marketDataError;
export const getMarketDataEntities = (state: SecMasterState) => state.marketDataEntities;


// MarketData Points
export const getMarketDataPointIDs = (state: SecMasterState) => state.mdids;
export const getSelectedMarketData = (state: SecMasterState) => state.selectedMarketData;
export const getMarketDataPointEntities = (state: SecMasterState) => state.marketDataPointEntities;
export const getMarketDataPointsLoading = (state: SecMasterState) => state.marketDataPointsLoading;
export const getMarketDataPointsLoaded = (state: SecMasterState) => state.marketDataPointsLoaded;
export const getMarketDataPointsError = (state: SecMasterState) => state.marketDataPointsError;
