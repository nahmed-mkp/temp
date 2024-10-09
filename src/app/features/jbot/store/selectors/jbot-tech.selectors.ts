import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromModel from '../../models';
import * as fromJbotTech from '../reducers/jbot-tech.reducer';

const getJbotTechState = createSelector(
    fromFeature.getJbotState,
    (state: fromFeature.JbotState) => state.jbotTech
);

export const getJbotTechActiveAsOfDate = createSelector(
    getJbotTechState,
    fromJbotTech.getActiveAsOfDate
);

export const getJbotTechReverseTimeRange = createSelector(
    getJbotTechState,
    fromJbotTech.getReverseTimeRange
);




export const getJbotTechAsOfDates = createSelector(
    getJbotTechState,
    fromJbotTech.getAsOfDates
);

export const getJbotTechAsOfDateLoading = createSelector(
    getJbotTechState,
    fromJbotTech.getAsOfDateLoading
);

export const getJbotTechAsOfDateLoaded = createSelector(
    getJbotTechState,
    fromJbotTech.getAsOfDateLoaded
);

export const getJbotTechAsOfDateError = createSelector(
    getJbotTechState,
    fromJbotTech.getAsOfDateError
);





export const getJbotTechScore = createSelector(
    getJbotTechState,
    fromJbotTech.getJbotTechScore
);

export const getJbotTechScoreLoading = createSelector(
    getJbotTechState,
    fromJbotTech.getAsOfDateLoading
);

export const getJbotTechScoreLoaded = createSelector(
    getJbotTechState,
    fromJbotTech.getJbotTechScoreLoaded
);

export const getJbotTechScoreError = createSelector(
    getJbotTechState,
    fromJbotTech.getJbotTechScoreError
);