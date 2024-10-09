import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromSecMasterBbgDataMap from '../reducers/sec-master-bbg-data-map.reducer';

/**
 * Futures Root Management
 */
export const getSecMasterBbgDataMapState = createSelector(
    fromFeature.getSecurityMasterFeatureState,
    (state: fromFeature.SecurityMasterState) => state.secMasterBbgDataMap
);

// Futures Root
export const getBbgDataMap = createSelector(
    getSecMasterBbgDataMapState,
    fromSecMasterBbgDataMap.getBbgDataMap
);

export const getBbgDataMapLoadingStatus = createSelector(
    getSecMasterBbgDataMapState,
    fromSecMasterBbgDataMap.getBbgDataMapLoading
);

export const getBbgDataMapLoadedStatus = createSelector(
    getSecMasterBbgDataMapState,
    fromSecMasterBbgDataMap.getBbgDataMapLoaded
);

export const getBbgDataMapError = createSelector(
    getSecMasterBbgDataMapState,
    fromSecMasterBbgDataMap.getBbgDataMapError
);
1
