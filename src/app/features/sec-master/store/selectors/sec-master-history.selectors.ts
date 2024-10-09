import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromSecMasterHistory from '../reducers/sec-master-history.reducer';

// Getting Upper State

export const getSecMasterHistoryState = createSelector(
    fromFeature.getSecurityMasterFeatureState,
    (state: fromFeature.SecurityMasterState) => state.secMasterHistory
);


// Individual Selector

export const getCreateHistory = createSelector(
    getSecMasterHistoryState,
    fromSecMasterHistory.getCreateHistory
);

export const getCreateHistoryLoading = createSelector(
    getSecMasterHistoryState,
    fromSecMasterHistory.getCreateHistoryLoading
);

export const getCreateHistoryLoaded = createSelector(
    getSecMasterHistoryState,
    fromSecMasterHistory.getCreateHistoryLoaded
);

export const getCreateHistoryError = createSelector(
    getSecMasterHistoryState,
    fromSecMasterHistory.getCreateHistoryError
);








export const getUpdateHistory = createSelector(
    getSecMasterHistoryState,
    fromSecMasterHistory.getUpdateHistory
);

export const getUpdateHistoryLoading = createSelector(
    getSecMasterHistoryState,
    fromSecMasterHistory.getUpdateHistoryLoading
);

export const getUpdateHistoryLoaded = createSelector(
    getSecMasterHistoryState,
    fromSecMasterHistory.getUpdateHistoryLoaded
);

export const getUpdateHistoryError = createSelector(
    getSecMasterHistoryState,
    fromSecMasterHistory.getUpdateHistoryError
);





export const getAddDoNotUpdateFlagPending = createSelector(
    getSecMasterHistoryState,
    fromSecMasterHistory.getAddDoNotUpdateFlagPending
);

export const getAddDoNotUpdateFlagComplete = createSelector(
    getSecMasterHistoryState,
    fromSecMasterHistory.getAddDoNotUpdateFlagComplete
);

export const getAddDoNotUpdateFlagError = createSelector(
    getSecMasterHistoryState,
    fromSecMasterHistory.getAddDoNotUpdateFlagError
);




