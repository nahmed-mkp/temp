import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMarketDataSearch from '../reducers/market-data-search.reducer';

const getMarketDataSearchState = createSelector(
    fromFeature.getMarketDataSearchState,
    (state: fromFeature.MarketDataSearchState) => state.search
);

export const getMarketDataSearchProviders = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getProviders
);

export const getMarketDataSearchCriteria = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getCriteria
);






export const getMarketDataSearchLoadingStatus = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getLoading
);

export const getMarketDataSearchLoadedStatus = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getLoaded
);

export const getMarketDataSearchError = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getError
);

export const getMarketDataSearchResults = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getResults
);






export const getSearchResultForTimeseriesExporter = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getSearchResultForTimeseriesExporter
);

export const getSearchResultForTimeseriesExporterLoading = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getSearchResultForTimeseriesExporterLoading
);

export const getSearchResultForTimeseriesExporterLoaded = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getSearchResultForTimeseriesExporterLoaded
);

export const getSearchResultForTimeseriesExporterError = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getSearchResultForTimeseriesExporterError
);


export const getSecuritySearchResultForTimeseriesExporter = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getSecuritySearchResultForTimeseriesExporter
);

export const getSecuritySearchResultForTimeseriesExporterLoading = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getSecuritySearchResultForTimeseriesExporterLoading
);

export const getSecuritySearchResultForTimeseriesExporterLoaded = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getSecuritySearchResultForTimeseriesExporterLoaded
);

export const getSecuritySearchResultForTimeseriesExporterError = createSelector(
    getMarketDataSearchState,
    fromMarketDataSearch.getSecuritySearchResultForTimeseriesExporterError
);
