import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromManualMarks from '../reducers/manual-marks.reducer';

export const getManualMarksState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.manualMarks
);

/* ============= AS OF DATE ================= */

export const getDate = createSelector(
    getManualMarksState,
    fromManualMarks.getAsOfDate
);

/* ============= MANUAL MARKS DATA ================= */

export const getManualMarksData = createSelector(
    getManualMarksState,
    fromManualMarks.getManualMarks
);

export const getManualMarksDataLoading = createSelector(
    getManualMarksState,
    fromManualMarks.getManualMarksLoading
);

export const getManualMarksDataLoaded = createSelector(
    getManualMarksState,
    fromManualMarks.getManualMarksLoaded
);

export const getManualMarksDataError = createSelector(
    getManualMarksState,
    fromManualMarks.getManualMarksError
);

