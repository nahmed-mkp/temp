import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDials from '../reducers/dials.reducers';

/**
 * Dials Selector
 */
export const getAgencyAnalyticsDialsSelector = createSelector(
    fromFeature.getAgencyAnalyticsState,
    (state: fromFeature.AgencyAnalyticsState) => state.dials
);

export const getAgencyAnalyticsDialsSetIds = createSelector(
    getAgencyAnalyticsDialsSelector,
    fromDials.getDialSetIds
);

export const getAgencyAnalyticsSelectedDialsSetId = createSelector(
    getAgencyAnalyticsDialsSelector,
    fromDials.getSelectedDialSetId
);

export const getAgencyAnalyticsDialsSetEntities = createSelector(
    getAgencyAnalyticsDialsSelector,
    fromDials.getDialSetEntities
);

export const getAgencyAnalyticsDialsSetsLoadingStatus = createSelector(
    getAgencyAnalyticsDialsSelector,
    fromDials.getDialSetsLoading
);

export const getAgencyAnalyticsDialsSetsLoadedStatus = createSelector(
    getAgencyAnalyticsDialsSelector,
    fromDials.getDialSetsLoaded
);

export const getAgencyAnalyticsDialsSetssError = createSelector(
    getAgencyAnalyticsDialsSelector,
    fromDials.getDialSetsError
);

export const getAgencyAnalyticsDialsSets = createSelector(
    getAgencyAnalyticsDialsSetIds,
    getAgencyAnalyticsDialsSetEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);

export const getAgencyAnalyticsDialIds = createSelector(
    getAgencyAnalyticsDialsSelector,
    fromDials.getDialIds
);

export const getAgencyAnalyticsDialEntities = createSelector(
    getAgencyAnalyticsDialsSelector,
    fromDials.getDialEntities
);

export const getAgencyAnalyticsDialsLoadingStatus = createSelector(
    getAgencyAnalyticsDialsSelector,
    fromDials.getDialsLoading
);

export const getAgencyAnalyticsDialsLoadedStatus = createSelector(
    getAgencyAnalyticsDialsSelector,
    fromDials.getDialsLoaded
);

export const getAgencyAnalyticsDialsError = createSelector(
    getAgencyAnalyticsDialsSelector,
    fromDials.getDialsError
);

export const getAgencyAnalyticsDials = createSelector(
    getAgencyAnalyticsDialIds,
    getAgencyAnalyticsDialEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);

export const getAgencyAnalyticsSelectedDialsSet = createSelector(
    getAgencyAnalyticsDialsSetEntities,
    getAgencyAnalyticsSelectedDialsSetId,
    (entities, selectedId) => {
        return entities[selectedId];
    }
);


export const getAgencyAnalyticsSelectedDialsSetDials = createSelector(
    getAgencyAnalyticsDialEntities,
    getAgencyAnalyticsSelectedDialsSetId,
    (entities, selectedId) => {
        return entities[selectedId] || [];
    }
);
