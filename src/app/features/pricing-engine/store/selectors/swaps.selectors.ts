import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSwaps from '../reducers/swaps.reducer';




export const getSwapsState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.swaps
);




export const getSwapsEntities = createSelector(
    getSwapsState,
    fromSwaps.getSwapsEntities
);


export const getSwapsLoading = createSelector(
    getSwapsState,
    fromSwaps.getSwapsLoading
);

export const getSwapsLoaded = createSelector(
    getSwapsState,
    fromSwaps.getSwapsLoaded
);

export const getSwapsError = createSelector(
    getSwapsState,
    fromSwaps.getSwapsError
);

export const getSwapsData = createSelector(
    getSwapsEntities,
    entity => entity && entity['data'] || []
);

export const getSwapsTimeStamp = createSelector(
    getSwapsEntities,
    entity => entity && entity['timeStamp'] || []
);










export const getSwapOwnership = createSelector(
    getSwapsState,
    fromSwaps.getSwapOwnership
);

export const getSwapOwnershipLoading = createSelector(
    getSwapsState,
    fromSwaps.getSwapOwnershipLoading
);

export const getSwapOwnershipLoaded = createSelector(
    getSwapsState,
    fromSwaps.getSwapOwnershipLoaded
);

export const getSwapOwnershipError = createSelector(
    getSwapsState,
    fromSwaps.getSwapOwnershipError
);







export const getSwapUpdatePending = createSelector(
    getSwapsState,
    fromSwaps.getSwapUpdatePending
);

export const getSwapUpdateFinished = createSelector(
    getSwapsState,
    fromSwaps.getSwapUpdateFinished
);

export const getSwapUpdateError = createSelector(
    getSwapsState,
    fromSwaps.getSwapUpdateError
);









export const getSwapDetail = createSelector(
    getSwapsState,
    fromSwaps.getSecurityDetail
);

export const getSwapDetailLoading = createSelector(
    getSwapsState,
    fromSwaps.getSecurityDetailLoading
);

export const getSwapDetailLoaded = createSelector(
    getSwapsState,
    fromSwaps.getSecurityDetailLoaded
);

export const getSwapDetailError = createSelector(
    getSwapsState,
    fromSwaps.getSecurityDetailError
);

