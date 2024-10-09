import { createSelector } from '@ngrx/store';

import * as fromModels from '../../models';
import * as fromFeature from '../reducers';
import * as fromCliffwater from '../reducers/cliffwater.reducer';

export const getCliffwaterState = createSelector(
    fromFeature.getClientSolutionsFeatureState,
    (state: fromFeature.ClientSolutionsState) => state.cliffwater
);

export const getCliffwaterData = createSelector(
    getCliffwaterState,
    fromCliffwater.getData
);

export const getCliffwaterDataLoadingStatus = createSelector(
    getCliffwaterState,
    fromCliffwater.getLoading
);

export const getCliffwaterDataLoadedStatus = createSelector(
    getCliffwaterState,
    fromCliffwater.getLoaded
);

export const getCliffwaterDataError = createSelector(
    getCliffwaterState,
    fromCliffwater.getError
);