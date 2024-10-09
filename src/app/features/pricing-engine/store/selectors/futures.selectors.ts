import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromFutures from '../reducers/futures.reducer';




export const getFuturesState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.futures
);

export const getFuturesEntities = createSelector(
    getFuturesState,
    fromFutures.getFuturesEntities
);


export const getFuturesLoading = createSelector(
    getFuturesState,
    fromFutures.getFuturesLoading
);

export const getFuturesLoaded = createSelector(
    getFuturesState,
    fromFutures.getFuturesLoaded
);

export const getFuturesError = createSelector(
    getFuturesState,
    fromFutures.getFuturesError
);

export const getFuturesData = createSelector(
    getFuturesEntities,
    entity => entity && entity['data'] || []
); 

export const getFuturesTimeStamp = createSelector(
    getFuturesEntities,
    entity => entity && entity['timeStamp'] || []
);

export const getFuturesUpdatePending = createSelector(
    getFuturesState,
    fromFutures.getFuturesUpdatePending
);

export const getFuturesUpdateFinished = createSelector(
    getFuturesState,
    fromFutures.getFuturesUpdateFinished
);

export const getFuturesUpdateError = createSelector(
    getFuturesState,
    fromFutures.getFuturesUpdateError
);
