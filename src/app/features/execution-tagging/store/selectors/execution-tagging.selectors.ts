import { createSelector } from '@ngrx/store';

import * as fromExecutionTagging from '../reducers/execution-tagging.reducer';
import * as fromFeature from '../reducers';

export const getExecutionTaggingStateSlice = createSelector(
    fromFeature.getExecutionTaggingState,
    (state: fromFeature.ExecutionTaggingState) => state.executionTagging
);

export const getShowReasonEditor = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getShowReasonEditor
)

// ================== DATES ==================

export const getStartDate = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getStartDate
)

export const getEndDate = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getEndDate
)

// ================== PORTFOLIO MANAGERS ==================

export const getCurrentPortfolioManager = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getCurrentPortfolioManager
)

export const getPortfolioManagers = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getPortfolioManagers
)

export const getPortfolioManagersLoading = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getPortfolioManagersLoading
)

export const getPortfolioManagersLoaded = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getPortfolioManagersLoaded
)

export const getPortfolioManagersFailed = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getPortfolioManagersFailed
)

// ================== EXECUTIONS ==================

export const getExecutionsTaggingData = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getExecutionTaggingData
)

export const getExecutionsTaggingDataLoading = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getExecutionTaggingDataLoading
)

export const getExecutionsTaggingDataLoaded = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getExecutionTaggingDataLoaded
)

export const getExecutionsTaggingDataFailed = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getExecutionTaggingDataFailed
)

// ================== EXECUTIONS ==================

export const getReasons = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getReasons
)

export const getReasonsLoading = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getReasonsLoading
)

export const getReasonsLoaded = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getReasonsLoaded
)

export const getReasonsFailed = createSelector(
  getExecutionTaggingStateSlice,
  fromExecutionTagging.getReasonsFailed
)