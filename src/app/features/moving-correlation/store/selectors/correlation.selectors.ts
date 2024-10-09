import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCorrelation from '../reducers/correlation.reducers';

const getAgencyAnalyticsMovingCorrelationState = createSelector(
    fromFeature.getAgencyAnalyticsMovingCorrelationState,
    (state: fromFeature.AgencyAnalyticsMovingCorrelationState) => state.movingCorrelation
);




export const getAgencyAnalyticsMovingCorrelationActiveRequestId = createSelector(
    getAgencyAnalyticsMovingCorrelationState,
    fromCorrelation.getMovingCorrelationActiveRequestId
);



export const getAgencyAnalyticsMovingCorrelationSecurityListEntities = createSelector(
    getAgencyAnalyticsMovingCorrelationState,
    fromCorrelation.getMovingCorrelationSecurityListEntities
);

export const getAgencyAnalyticsMovingCorrelationSecurityListLoadingStatus = createSelector(
    getAgencyAnalyticsMovingCorrelationState,
    fromCorrelation.getMovingCorrelationSecurityListLoading
);

export const getAgencyAnalyticsMovingCorrelationSecurityListLoadedStatus = createSelector(
    getAgencyAnalyticsMovingCorrelationState,
    fromCorrelation.getMovingCorrelationSecurityListLoaded
);

export const getAgencyAnalyticsMovingCorrelationSecurityListError = createSelector(
    getAgencyAnalyticsMovingCorrelationState,
    fromCorrelation.getMovingCorrelationSecurityListError
);




export const getAgencyAnalyticsMovingCorrelationResponsesIds = createSelector(
    getAgencyAnalyticsMovingCorrelationState,
    fromCorrelation.getMovingCorrelationResponsesIds
);

export const getAgencyAnalyticsMovingCorrelationResponsesEntites = createSelector(
    getAgencyAnalyticsMovingCorrelationState,
    fromCorrelation.getMovingCorrelationResponsesEntities
);

export const getAgencyAnalyticsMovingCorrelationResponsesLoadingStatus = createSelector(
    getAgencyAnalyticsMovingCorrelationState,
    fromCorrelation.getMovingCorrelationResponsesLoading
);

export const getAgencyAnalyticsMovingCorrelationResponsesLoadedStatus = createSelector(
    getAgencyAnalyticsMovingCorrelationState,
    fromCorrelation.getMovingCorrelationResponsesLoaded
);

export const getAgencyAnalyticsMovingCorrelationResponsesError = createSelector(
    getAgencyAnalyticsMovingCorrelationState,
    fromCorrelation.getMovingCorrelationResponsesError
);

export const getAgencyAnalyticsMovingCorrelationActiveResponse = createSelector(
    getAgencyAnalyticsMovingCorrelationActiveRequestId,
    getAgencyAnalyticsMovingCorrelationResponsesEntites,
    (correlationActiveRequestId, correlationResponsesEntites) => correlationResponsesEntites[correlationActiveRequestId]
);