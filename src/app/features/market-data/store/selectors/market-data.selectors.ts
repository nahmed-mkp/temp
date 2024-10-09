import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromMarketData from '../reducers/market-data.reducer';

/**
 * Price Master Management
 */
export const getMarketDataState = createSelector(
    fromFeature.getMarketDataFeatureState,
    (state: fromFeature.MarketDataState) => state.MarketData
);

// Price Master
export const getMarketDataSearchCriteria = createSelector(
    getMarketDataState,
    fromMarketData.getSearchCriteria
);

export const getMarketDataSearchLoading = createSelector(
    getMarketDataState,
    fromMarketData.getSearchLoading
);

export const getMarketDataSearchLoaded = createSelector(
    getMarketDataState,
    fromMarketData.getSearchLoaded
);

export const getMarketDataSearchError = createSelector(
    getMarketDataState,
    fromMarketData.getSearchError
);

export const getMarketDataSearchResults = createSelector(
    getMarketDataState,
    fromMarketData.getSearchResults
);







export const getMarketDataDetail = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataDetail
);

export const getMarketDataDetailLoading = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataDetailLoading
);

export const getMarketDataDetailLoaded = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataDetailLoaded
);

export const getMarketDataDetailError = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataDetailError
);




export const getMarketDataPriceSource = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataPriceSource
);

export const getMarketDataPriceSourceLoading = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataPriceSourceLoading
);

export const getMarketDataPriceSourceLoaded = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataPriceSourceLoaded
);

export const getMarketDataPriceSourceError = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataPriceSourceError
);



export const getMarketDataType = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataType
);

export const getMarketDataTypeLoading = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataTypeLoading
);

export const getMarketDataTypeLoaded = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataTypeLoaded
);

export const getMarketDataTypeError = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataTypeError
);



export const getMarketDataTimeseries = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataTimeseries
);

export const getMarketDataTimeseriesLoading = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataTimeseriesLoading
);

export const getMarketDataTimeseriesLoaded = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataTimeseriesLoaded
);

export const getMarketDataTimeseriesError = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataTimeseriesError
);








export const getMarketDataBackFillPending = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataBackFillPending
);

export const getMarketDataBackFillFinished = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataBackFillFinished
);

export const getMarketDataBackFillError = createSelector(
    getMarketDataState,
    fromMarketData.getMarketDataBackFillError
);
