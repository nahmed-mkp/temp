import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromFXOptions from '../reducers/fx-options.reducer';

export const getFXOptionsState = createSelector(
    fromFeature.getPricingCalculatorsFeatureState,
    (state: fromFeature.PricingCalculatorsState) => state.fxOptions
);

export const getFXOptionsInputs = createSelector(
    getFXOptionsState,
    fromFXOptions.getInputs
);

export const getFXOptionsInputsLoading = createSelector(
    getFXOptionsState,
    fromFXOptions.getInputsLoading
);

export const getFXOptionsInputsLoaded = createSelector(
    getFXOptionsState,
    fromFXOptions.getInputsLoaded
);

export const getFXOptionsError = createSelector(
    getFXOptionsState,
    fromFXOptions.getInputsError
);


export const getFXOptionsOutputs = createSelector(
    getFXOptionsState,
    fromFXOptions.getOutputs
);

export const getFXOptionsOutputsLoading = createSelector(
    getFXOptionsState,
    fromFXOptions.getOutputsLoading
);

export const getFXOptionsOutputsLoaded = createSelector(
    getFXOptionsState,
    fromFXOptions.getOutputsLoaded
);

export const getFXOptionsOutputError = createSelector(
    getFXOptionsState,
    fromFXOptions.getOutputsError
);

