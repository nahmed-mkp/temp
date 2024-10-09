import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/';
import * as fromDailyTracking from '../reducers/benchmark-monitor.reducer';

const getDailyTrackingState = createSelector(
    fromFeature.getDailyTrackingState,
    (state: fromFeature.BenchmarkMonitorState) => state.main
);

export const getTbaDataLoading = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getTbaDataLoading
);

export const getTbaDataLoaded = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getTbaDataLoaded
);


export const getTbaData = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getTbaData
);

export const getTbaError = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getTbaError
);

