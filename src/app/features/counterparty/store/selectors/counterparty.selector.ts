import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCounterparty from '../reducers/counterparty.reducer';

const getCounterpartyExposureState = createSelector(
    fromFeature.getExposuresModuleState,
    (state: fromFeature.ExposuresState) => state.counterparty
);

export const getCounterpartyCDSSpreads = createSelector(
    getCounterpartyExposureState,
    fromCounterparty.getCounterpartyCDSSpreads
);

export const getCounterpartyCDSSpreadsLoadingStatus = createSelector(
    getCounterpartyExposureState,
    fromCounterparty.getCounterpartyCDSSpreadsLoading
);

export const getCounterpartyCDSSpreadsLoadedStatus = createSelector(
    getCounterpartyExposureState,
    fromCounterparty.getCounterpartyCDSSpreadsLoaded
);

export const getCounterpartyCDSSpreadsErrorStatus = createSelector(
    getCounterpartyExposureState,
    fromCounterparty.getCounterpartyCDSSpreadsError
);
