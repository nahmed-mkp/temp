import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromFuturesRoot from '../reducers/futures-root.reducer';

/**
 * Futures Root Management
 */
export const getFuturesRootState = createSelector(
    fromFeature.getSecurityMasterFeatureState,
    (state: fromFeature.SecurityMasterState) => state.futuresRoot
);

// Futures Root
export const getFuturesRootIds = createSelector(
    getFuturesRootState,
    fromFuturesRoot.getFuturesRootIds
);

export const getFuturesRootEntities = createSelector(
    getFuturesRootState,
    fromFuturesRoot.getFuturesRootEntities
);

export const getFuturesRootLoadingStatus = createSelector(
    getFuturesRootState,
    fromFuturesRoot.getFuturesRootLoading
);

export const getFuturesRootLoadedStatus = createSelector(
    getFuturesRootState,
    fromFuturesRoot.getFuturesRootLoaded
);

export const getFuturesRootError = createSelector(
    getFuturesRootState,
    fromFuturesRoot.getFuturesRootError
);

export const getFuturesRoots = createSelector(
    getFuturesRootIds,
    getFuturesRootEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);
