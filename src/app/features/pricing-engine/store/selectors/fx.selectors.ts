import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromFx from '../reducers/fx.reducer';




export const getFxState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.fx
);




export const getFxEntities = createSelector(
    getFxState,
    fromFx.getFxEntities
);


export const getFxLoading = createSelector(
    getFxState,
    fromFx.getFxLoading
);

export const getFxLoaded = createSelector(
    getFxState,
    fromFx.getFxLoaded
);

export const getFxError = createSelector(
    getFxState,
    fromFx.getFxError
);

export const getFxData = createSelector(
    getFxEntities,
    entity => entity && entity['data'] || []
);

export const getFxTimeStamp = createSelector(
    getFxEntities,
    entity => entity && entity['timeStamp'] || []
);







export const getFxOwnership = createSelector(
    getFxState,
    fromFx.getFxOwnership
);

export const getFxOwnershipLoading = createSelector(
    getFxState,
    fromFx.getFxOwnershipLoading
);

export const getFxOwnershipLoaded = createSelector(
    getFxState,
    fromFx.getFxOwnershipLoaded
);

export const getFxOwnershipError = createSelector(
    getFxState,
    fromFx.getFxOwnershipError
);







export const getFxUpdatePending = createSelector(
    getFxState,
    fromFx.getFxUpdatePending
);

export const getFxUpdateFinished = createSelector(
    getFxState,
    fromFx.getFxUpdateFinished
);

export const getFxUpdateError = createSelector(
    getFxState,
    fromFx.getFxUpdateError
);

export const getFxDetail = createSelector(
    getFxState,
    fromFx.getFxDetail
);

export const getFxDetailLoading = createSelector(
    getFxState,
    fromFx.getFxDetailLoading
);

export const getFxDetailLoaded = createSelector(
    getFxState,
    fromFx.getFxDetailLoaded
);

export const getFxDetailError = createSelector(
    getFxState,
    fromFx.getFxDetailError
);

