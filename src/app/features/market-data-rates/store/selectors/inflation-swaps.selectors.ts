import { createSelector } from '@ngrx/store';
import * as fromInflationSwaps from '../reducers/inflation-swaps.reducer';
import * as fromFeature from '../reducers';

export const getInflationSwapsState = createSelector(
    fromFeature.getMarketDateRatesState,
    (state: fromFeature.MarketDataRatesState) => state.inflationSwaps
);

export const getInflationSwapsData = createSelector(
    getInflationSwapsState,
    fromInflationSwaps.getInflationSwaps
);

export const getInflationSwapsLoadingStatus = createSelector(
    getInflationSwapsState,
    fromInflationSwaps.getInflationSwapsLoadingStatus
);

export const getInflationSwapsLoadedStatus = createSelector(
    getInflationSwapsState,
    fromInflationSwaps.getInflationSwapsLoadedStatus
);

export const getInflationSwapsError = createSelector(
    getInflationSwapsState,
    fromInflationSwaps.getInflationSwapsError
);

export const getInflationSwapsDataPoints = createSelector(
    getInflationSwapsState,
    fromInflationSwaps.getInflationSwapsDataPoints
);

export const getInflationSwapsDataPointsLoadingStatus = createSelector(
    getInflationSwapsState,
    fromInflationSwaps.getInflationSwapsDataPointsLoadingStatus
);

export const getInflationSwapsDataPointsLoadedStatus = createSelector(
    getInflationSwapsState,
    fromInflationSwaps.getInflationSwapsDataPointsLoadedStatus
);

export const getInflationSwapsDataPointsError = createSelector(
    getInflationSwapsState,
    fromInflationSwaps.getInflationSwapsDataPointsError
);
