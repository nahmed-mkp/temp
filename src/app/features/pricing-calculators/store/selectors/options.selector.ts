import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromOptions from '../reducers/options.reducer';


export const getOptionsState = createSelector(
    fromFeature.getPricingCalculatorsFeatureState,
    (state: fromFeature.PricingCalculatorsState) => state.options
);

export const getOptionInputs = createSelector(
    getOptionsState,
    fromOptions.getOptionsInputs
);

export const getOptionsInputsLoading = createSelector(
    getOptionsState,
    fromOptions.getOptionsInputsLoading
);

export const getOptionsInputsLoaded = createSelector(
    getOptionsState,
    fromOptions.getOptionsInputsLoaded
);

export const getOptionsError = createSelector(
    getOptionsState,
    fromOptions.getOptionsInputsError
);

