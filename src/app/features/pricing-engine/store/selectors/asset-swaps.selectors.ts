import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAssetSwaps from '../reducers/asset-swaps.reducer';




export const getAssetSwapsState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.assetSwaps
);





export const getAssetSwapsEntities = createSelector(
    getAssetSwapsState,
    fromAssetSwaps.getAssetSwapsEntities
);


export const getAssetSwapsLoading = createSelector(
    getAssetSwapsState,
    fromAssetSwaps.getAssetSwapsLoading
);

export const getAssetSwapsLoaded = createSelector(
    getAssetSwapsState,
    fromAssetSwaps.getAssetSwapsLoaded
);

export const getAssetSwapsError = createSelector(
    getAssetSwapsState,
    fromAssetSwaps.getAssetSwapsError
);

