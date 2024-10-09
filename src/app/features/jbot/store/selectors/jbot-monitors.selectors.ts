import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromJbotMonitor from '../reducers/jbot-monitor.reducer';

const getJbotMonitorState = createSelector(
    fromFeature.getJbotState,
    (state: fromFeature.JbotState) => state.jbotMonitor
);

export const getJbotMonitorActiveAsOfDate = createSelector(
    getJbotMonitorState,
    fromJbotMonitor.getActiveAsOfDate
);

export const getJbotMonitorReverseTimeRange = createSelector(
    getJbotMonitorState,
    fromJbotMonitor.getReverseTimeRange
);




export const getJbotMonitorAsOfDates = createSelector(
    getJbotMonitorState,
    fromJbotMonitor.getAsOfDates
);

export const getJbotMonitorAsOfDateLoading = createSelector(
    getJbotMonitorState,
    fromJbotMonitor.getAsOfDateLoading
);

export const getJbotMonitorAsOfDateLoaded = createSelector(
    getJbotMonitorState,
    fromJbotMonitor.getAsOfDateLoaded
);

export const getJbotMonitorAsOfDateError = createSelector(
    getJbotMonitorState,
    fromJbotMonitor.getAsOfDateError
);





export const getJbotMonitorScore = createSelector(
    getJbotMonitorState,
    fromJbotMonitor.getJbotMonitorScore
);

export const getJbotMonitorScoreLoading = createSelector(
    getJbotMonitorState,
    fromJbotMonitor.getAsOfDateLoading
);

export const getJbotMonitorScoreLoaded = createSelector(
    getJbotMonitorState,
    fromJbotMonitor.getJbotMonitorScoreLoaded
);

export const getJbotMonitorScoreError = createSelector(
    getJbotMonitorState,
    fromJbotMonitor.getJbotMonitorScoreError
);