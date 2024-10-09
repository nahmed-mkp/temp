import { createSelector } from '@ngrx/store';

import * as fromModels from '../../models';
import * as fromFeature from '../reducers';
import * as fromSnapshot from '../reducers/snapshot.reducer';

export const getSnapshotState = createSelector(
    fromFeature.getClientSolutionsFeatureState,
    (state: fromFeature.ClientSolutionsState) => state.snapshot
);

export const getSnapshotPeriods = createSelector(
    getSnapshotState,
    fromSnapshot.getPeriods
);

export const getSnapshotMonthEndDates = createSelector(
    getSnapshotState,
    fromSnapshot.getMonthEndDates
);

export const getSnapshotMonthEndDatesLoadingStatus = createSelector(
    getSnapshotState,
    fromSnapshot.getMonthEndDatesLoading
);

export const getSnapshotMonthEndDatesLoadedStatus = createSelector(
    getSnapshotState,
    fromSnapshot.getMonthEndDatesLoaded
);

export const getSnapshotMonthEndDatesError = createSelector(
    getSnapshotState,
    fromSnapshot.getMonthEndDatesError
);

export const getSnapshotSupportedGroupings = createSelector(
    getSnapshotState,
    fromSnapshot.getSupportedGroupings
);

export const getSnapshotSupportedGroupingsLoadingStatus = createSelector(
    getSnapshotState,
    fromSnapshot.getSupportedGroupingsLoading
);

export const getSnapshotSupportedGroupingsLoadedStatus = createSelector(
    getSnapshotState,
    fromSnapshot.getSupportedGroupingsLoaded
);

export const getSnapshotSupportedGroupingsError = createSelector(
    getSnapshotState,
    fromSnapshot.getSupportedGroupingsError
);

export const getSnapshotEntitiesMap = createSelector(
    getSnapshotState,
    fromSnapshot.getEntitiesMap
);

export const getSnapshotEntitiesMapLoadingStatus = createSelector(
    getSnapshotState,
    fromSnapshot.getEntitiesMapLoading
);

export const getSnapshotEntitiesMapLoadedStatus = createSelector(
    getSnapshotState,
    fromSnapshot.getEntitiesMapLoaded
);

export const getSnapshotEntitiesError = createSelector(
    getSnapshotState,
    fromSnapshot.getEntitiesMapError
);

export const getSnapshotParam = createSelector(
    getSnapshotState,
    fromSnapshot.getSnapshotParam
);

export const getSnapshotSummaryStats = createSelector(
    getSnapshotState,
    fromSnapshot.getSummaryStats
);

export const getSnapshotSummaryStatsLoadingStatus = createSelector(
    getSnapshotState,
    fromSnapshot.getSummaryStatsLoading
);

export const getSnapshotSummaryStatsLoadedStatus = createSelector(
    getSnapshotState,
    fromSnapshot.getSummaryStatsLoaded
);

export const getSnapshotSummaryStatsError = createSelector(
    getSnapshotState,
    fromSnapshot.getSummaryStatsError
);


export const getSnapshotCorrelationMatrix = createSelector(
    getSnapshotState,
    fromSnapshot.getCorrelationMatrix
);

export const getSnapshotCorrelationMatrixLoadingStatus = createSelector(
    getSnapshotState,
    fromSnapshot.getCorrelationMatrixLoading
);

export const getSnapshotCorrelationMatrixLoadedStatus = createSelector(
    getSnapshotState,
    fromSnapshot.getCorrelationMatrixLoaded
);

export const getSnapshotCorrelationMatrixError = createSelector(
    getSnapshotState,
    fromSnapshot.getCorrelationMatrixError
);

export const getInvestorSnapshotData = createSelector(
    getSnapshotState,
    fromSnapshot.getSnapshotData
);

export const getInvestorSnapshotDataLoading = createSelector(
    getSnapshotState,
    fromSnapshot.getSnapshotDataLoading
);

export const getInvestorSnapshotDataLoaded = createSelector(
    getSnapshotState,
    fromSnapshot.getSnapshotDataLoaded
);

export const getInvestorSnapshotDataError = createSelector(
    getSnapshotState,
    fromSnapshot.getSnapshotDataError
);
