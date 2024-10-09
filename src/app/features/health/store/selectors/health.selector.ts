import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromHealthStatus from './../reducers/health.reducers';

const getHealthTrackingState = createSelector(
    fromFeature.getHealthTrackingFeatureState,
    (state: fromFeature.HealthStatusState) => state.status
);

export const getHealthStatus = createSelector(
    getHealthTrackingState,
    fromHealthStatus.getHealthStatus
);

export const getHealthStatusLoading = createSelector(
    getHealthTrackingState,
    fromHealthStatus.getHealthStatusLoading
);

export const getHealthStatusLoaded = createSelector(
    getHealthTrackingState,
    fromHealthStatus.getHealthStatusLoaded
);

export const getHealthStatusError = createSelector(
    getHealthTrackingState,
    fromHealthStatus.getHealthStatusError
);

export const getRunHistory = createSelector(
    getHealthTrackingState,
    fromHealthStatus.getRunHistory
);

export const getRunHistoryLoading = createSelector(
    getHealthTrackingState,
    fromHealthStatus.getRunHistoryLoading
);

export const getRunHistoryLoaded = createSelector(
    getHealthTrackingState,
    fromHealthStatus.getRunHistoryLoaded
);

export const getRunHistoryError = createSelector(
    getHealthTrackingState,
    fromHealthStatus.getRunHistoryError
);

export const getSocketProcessMonitorData = createSelector(
    getHealthTrackingState,
    fromHealthStatus.getSocketProcessMonitorData
);
