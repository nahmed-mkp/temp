import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromYieldbook from '../reducers/yieldbook.reducers';

/**
 * Yieldbook Selector
 */
export const getYieldbookState = createSelector(
    fromFeature.getAgencyAnalyticsState,
    (state: fromFeature.AgencyAnalyticsState) => state.yieldbook
);

export const getYieldbookSelectedDate = createSelector(
    getYieldbookState,
    fromYieldbook.getSelectedDate
);

export const getYieldbookSelectedRequestLog = createSelector(
    getYieldbookState,
    fromYieldbook.getSelectedRequestLog
);

export const getYieldbookRequestLogIds = createSelector(
    getYieldbookState,
    fromYieldbook.getRequestLogIds
);

export const getYieldbookRequestLogEntities = createSelector(
    getYieldbookState,
    fromYieldbook.getRequestLogEntities
);

export const getYieldbookRequestLogsLoadingStatus = createSelector(
    getYieldbookState,
    fromYieldbook.getRequestLogsLoading
);

export const getYieldbookRequestLogsLoadedStatus = createSelector(
    getYieldbookState,
    fromYieldbook.getRequestLogsLoading
);

export const getYieldbookRequestLogsError = createSelector(
    getYieldbookState,
    fromYieldbook.getRequestLogsError
);

export const getYieldbookRequestLogs = createSelector(
    getYieldbookRequestLogIds,
    getYieldbookRequestLogEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);

export const getYieldbookRequestIds = createSelector(
    getYieldbookState,
    fromYieldbook.getRequestIds
);

export const getYieldbookRequestEntities = createSelector(
    getYieldbookState,
    fromYieldbook.getRequestEntities
);

export const getYieldbookRequests = createSelector(
    getYieldbookRequestIds,
    getYieldbookRequestEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);

export const getYieldbookResponseIds = createSelector(
    getYieldbookState,
    fromYieldbook.getResponseIds
);

export const getYieldbookResponseEntities = createSelector(
    getYieldbookState,
    fromYieldbook.getResponseEntities
);

export const getYieldbookResponses = createSelector(
    getYieldbookResponseIds,
    getYieldbookResponseEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);
