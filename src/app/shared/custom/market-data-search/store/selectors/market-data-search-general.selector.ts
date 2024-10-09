import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSecuritySearch from '../reducers/market-data-search-general.reducer';

const getSecuritySearchState = createSelector(
    fromFeature.getMarketDataSearchState,
    (state: fromFeature.MarketDataSearchState) => state.searchGeneral
);

export const getSecuritySearchCriteria = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getSearchCriteria
);

export const getSecuritySearchLoadingStatus = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getSearchResultsLoading
);

export const getSecuritySearchLoadedStatus = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getSearchResultsLoaded
);

export const getSecuritySearchError = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getSearchResultsError
);

export const getSecuritySearchResults = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getSearchResults
);







export const getSelectedSecurity = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getSelectedSecurity
);

export const getMarketDataTypes = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getMarketDataTypes
);

export const getMarketDataTypesLoading = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getMarketDataTypesLoading
);

export const getMarketDataTypesLoaded = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getMarketDataTypesLoaded
);

export const getMarketDataTypesError = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getMarketDataTypesError
);









export const getEnhancedSecuritySearchLoadingStatus = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getEnhancedSecuritySearchLoading
);

export const getEnhancedSecuritySearchLoadedStatus = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getEnhancedSecuritySearchLoaded
);

export const getEnhancedSecuritySearchError = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getEnhancedSecuritySearchError
);

export const getEnhancedSecuritySearchResults = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getEnhancedSecuritySearchResults
);
