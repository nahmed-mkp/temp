import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSynthetics from '../reducers/synthetics.reducer';




export const getSyntheticsState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.synthetics
);




export const getSyntheticsEntities = createSelector(
    getSyntheticsState,
    fromSynthetics.getSyntheticsEntities
);


export const getSyntheticsLoading = createSelector(
    getSyntheticsState,
    fromSynthetics.getSyntheticsLoading
);

export const getSyntheticsLoaded = createSelector(
    getSyntheticsState,
    fromSynthetics.getSyntheticsLoaded
);

export const getSyntheticsError = createSelector(
    getSyntheticsState,
    fromSynthetics.getSyntheticsError
);

