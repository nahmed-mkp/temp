import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromMultiAssetOptions from '../reducers/multi-asset-options.reducer';

export const getMultiAssetOptionsState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.multiAssetOptions
);

export const getMultiAssetOptionsEntities = createSelector(
    getMultiAssetOptionsState,
    fromMultiAssetOptions.getMultiAssetOptions
);

export const getMultiAssetOptionsData = createSelector(
    getMultiAssetOptionsEntities,
    entity => entity && entity['data'] || []
); 

export const getMultiAssetOptionsTimeStamp = createSelector(
    getMultiAssetOptionsEntities,
    entity => entity && entity['timeStamp'] || []
);

export const getMultiAssetOptionsLoading = createSelector(
    getMultiAssetOptionsState,
    fromMultiAssetOptions.getMultiAssetOptionsLoading
);

export const getMultiAssetOptionsLoaded = createSelector(
    getMultiAssetOptionsState,
    fromMultiAssetOptions.getMultiAssetOptionsLoaded
);


export const getMultiAssetOptionsOwnership = createSelector(
    getMultiAssetOptionsState,
    fromMultiAssetOptions.getMultiAssetOptionsOwnership
);

export const getMultiAssetOptionsOwnershipLoading = createSelector(
    getMultiAssetOptionsState,
    fromMultiAssetOptions.getMultiAssetOptionsOwnershipLoading
);

export const getMultiAssetOptionsOwnershipLoaded = createSelector(
    getMultiAssetOptionsState,
    fromMultiAssetOptions.getMultiAssetOptionsOwnershipLoaded
);


export const getMultiAssetOptionsDetail = createSelector(
    getMultiAssetOptionsState,
    fromMultiAssetOptions.getMultiAssetOptionSecurityDetail
);

export const getMultiAssetOptionsDetailLoading = createSelector(
    getMultiAssetOptionsState,
    fromMultiAssetOptions.getMultiAssetOptionSecurityDetailLoading
);

export const getMultiAssetOptionsDetailLoaded = createSelector(
    getMultiAssetOptionsState,
    fromMultiAssetOptions.getMultiAssetOptionSecurityDetailLoaded
);


