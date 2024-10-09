import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromModel from '../../models';
import * as fromJbotSummary from '../reducers/jbot-summary.reducer';

const getJbotSummaryState = createSelector(
    fromFeature.getJbotState,
    (state: fromFeature.JbotState) => state.jbotSummary
);


export const getJbotSummaryActiveAsOfDate = createSelector(
    getJbotSummaryState,
    fromJbotSummary.getActiveAsOfDate
);





export const getJbotSummaryAsOfDates = createSelector(
    getJbotSummaryState,
    fromJbotSummary.getAsOfDates
);

export const getJbotSummaryAsOfDateLoadingStatus = createSelector(
    getJbotSummaryState,
    fromJbotSummary.getAsOfDateLoading
);

export const getJbotSummaryAsOfDateLoadedStatus = createSelector(
    getJbotSummaryState,
    fromJbotSummary.getAsOfDateLoaded
);

export const getJbotSummaryAsOfDateError = createSelector(
    getJbotSummaryState,
    fromJbotSummary.getAsOfDateError
);





export const getJbotSummary = createSelector(
    getJbotSummaryState,
    fromJbotSummary.getJbotSummary
);

export const getJbotSummaryLoadingStatus = createSelector(
    getJbotSummaryState,
    fromJbotSummary.getJbotSummaryLoading
);

export const getJbotSummaryLoadedStatus = createSelector(
    getJbotSummaryState,
    fromJbotSummary.getJbotSummaryLoaded
);

export const getJbotSummaryError = createSelector(
    getJbotSummaryState,
    fromJbotSummary.getJbotSummaryError
);








export const getActiveJbotSummary = createSelector(
    getJbotSummaryActiveAsOfDate,
    getJbotSummary,
    (activeAsOfDate, JbotSummaryEntities) => {
        if (activeAsOfDate && JbotSummaryEntities) {
            return JbotSummaryEntities[activeAsOfDate];
        } else {
            return [];
        }
    }
);