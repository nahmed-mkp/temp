import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromSecMasterConfigDownstreamMapping from '../reducers/sec-master-config-downstream-mapping.reducer';

/**
 * Futures Root Management
 */
export const getSecMasterConfigDownstreamMappingState = createSelector(
    fromFeature.getSecurityMasterFeatureState,
    (state: fromFeature.SecurityMasterState) => state.configDownStreamMapping
);

// Futures Root
export const getDownstreamMapping = createSelector(
    getSecMasterConfigDownstreamMappingState,
    fromSecMasterConfigDownstreamMapping.getDownstreamMapping
);

export const getDownstreamMappingLoadingStatus = createSelector(
    getSecMasterConfigDownstreamMappingState,
    fromSecMasterConfigDownstreamMapping.getDownstreamMappingLoading
);

export const getDownstreamMappingLoadedStatus = createSelector(
    getSecMasterConfigDownstreamMappingState,
    fromSecMasterConfigDownstreamMapping.getDownstreamMappingLoaded
);

export const getDownstreamMappingError = createSelector(
    getSecMasterConfigDownstreamMappingState,
    fromSecMasterConfigDownstreamMapping.getDownstreamMappingError
);
1
