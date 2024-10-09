import { createSelector } from '@ngrx/store';

import * as fromModels from '../../models';

import * as fromFeature from '../reducers';
import * as fromCommissions from '../reducers/commissions.reducers';

/**
 * Commissions Selectors
 */
export const getCommissionsState = createSelector(
    fromFeature.getCommissionsFeatureState,
    (state: fromFeature.CommissionsState) => state.commissions
);

export const getCommissions = createSelector(
    getCommissionsState,
    fromCommissions.getCommissions
);

export const getCommissionsLoadingStatus = createSelector(
    getCommissionsState,
    fromCommissions.getLoading
);

export const getCommissionsLoadedStatus = createSelector(
    getCommissionsState,
    fromCommissions.getLoaded
);

export const getCommissionsError = createSelector(
    getCommissionsState,
    fromCommissions.getError
);
