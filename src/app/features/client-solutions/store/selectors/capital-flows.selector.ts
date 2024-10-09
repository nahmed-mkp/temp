import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromCapitalFlows from '../reducers/capital-flows.reducer';


export const getCapitalFlowsState = createSelector(
  fromFeature.getClientSolutionsFeatureState,
  (state: fromFeature.ClientSolutionsState) => state.capitalFlows
);

export const getCapitalFlowDateRange = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getDateRange
);

export const getCapitalFlowDateRangeLoading = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getDateRangeLoading
);

export const getCapitalFlowDateRangeLoaded = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getDateRangeLoaded
);

export const getCapitalFlowDateRangeError = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getDateRangeError
);

export const getCapitalFlowIds = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowIds
);

export const getCapitalFlowEntities = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowEntities
);

export const getCapitalFlowsLoading = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowsLoading
);

export const getCapitalFlowsLoaded = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowsLoaded
);

export const getCapitalFlowsError = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowsError
);

export const getCapitalFlows = createSelector(
    getCapitalFlowIds,
    getCapitalFlowEntities,
    (ids, entities) => {
        return ids.map(id => entities[id]);
    }
);

// Stats
export const getCapitalFlowStatsLoading = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowStatsLoading
);

export const getCapitalFlowStatsLoaded = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowStatsLoaded
);

export const getCapitalFlowStatsError = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowStatsError
);

export const getCapitalFlowStats = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowStats
);

// Projected AUM
export const getCapitalFlowProjectedAUMLoading = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowProjectedAUMLoading
);

export const getCapitalFlowProjectedAUMLoaded = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowProjectedAUMLoaded
);

export const getCapitalFlowProjectedAUMError = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowProjectedAUMError
);

export const getCapitalFlowProjectedAUM = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowProjectedAUM
);

// Form Data
export const getCapitalFlowFormDataLoading = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowFormDataLoading
);

export const getCapitalFlowFormDataLoaded = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowFormDataLoaded
);

export const getCapitalFlowFormDataError = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowFormDataError
);

export const getCapitalFlowFormData = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCapitalFlowFormData
);

// Email

export const getCapitalFlowEmailSending = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getEmailSending
);

export const getCapitalFlowEmailSent = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getEmailSent
);

export const getCapitalFlowEmailError = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getEmailError
);

// Editability

export const getCanEditCapitalFlows = createSelector(
    getCapitalFlowsState,
    fromCapitalFlows.getCanEditCapitalFlows
);
