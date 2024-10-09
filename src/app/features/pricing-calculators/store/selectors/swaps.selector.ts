import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSwaps from '../reducers/swaps.reducer';


export const getSwapsState = createSelector(
    fromFeature.getPricingCalculatorsFeatureState,
    (state: fromFeature.PricingCalculatorsState) => state.swaps
);


export const getSwapsInputs = createSelector(
    getSwapsState,
    fromSwaps.getSwapsInputs
);


export const getSwapsInputsLoading = createSelector(
    getSwapsState,
    fromSwaps.getSwapsInputsLoading
);

export const getSwapsInputsLoaded = createSelector(
    getSwapsState,
    fromSwaps.getSwapsInputsLoaded
);

export const getSwapsError = createSelector(
    getSwapsState,
    fromSwaps.getSwapsInputsError
);

