import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSecuritySearch from '../reducers/search.reducer';

const getSecuritySearchState = createSelector(
    fromFeature.getTimeseriesExporterFeatureState,
    (state: fromFeature.TimeseriesExporterState) => state.search
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


export const getActiveSecurityName = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getActiveSecurityName
);

export const getMarketDataTypesWithSIDEntity = createSelector(
    getSecuritySearchState,
    fromSecuritySearch.getMarketDataTypesWithSID
);

export const getMarketDataTypesWithActiveSecurityName = createSelector(
    getActiveSecurityName,
    getMarketDataTypesWithSIDEntity,
    (name, entity) => {
        if (name && entity && entity[name]) {
            return  entity[name].data;
        } else {
            return []
        }
    }
);

export const getMarketDataTypesLoadingWithActiveSecurityName = createSelector(
    getActiveSecurityName,
    getMarketDataTypesWithSIDEntity,
    (name, entity) => {
        if (name && entity && entity[name]) {
            return  entity[name].loading;
        }
    }
);

export const getMarketDataTypesLoadedWithActiveSecurityName = createSelector(
    getActiveSecurityName,
    getMarketDataTypesWithSIDEntity,
    (name, entity) => {
        if (name && entity && entity[name]) {
            return  entity[name].loaded;
        }
    }
);

export const getMarketDataTypesErrorWithActiveSecurityName = createSelector(
    getActiveSecurityName,
    getMarketDataTypesWithSIDEntity,
    (name, entity) => {
        if (name && entity && entity[name]) {
            return  entity[name].error;
        }
    }
);
