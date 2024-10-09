import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDrawdown from '../reducers/drawdown.reducers';

const getAgencyAnalyticsDrawdownState = createSelector(
    fromFeature.getAgencyAnalyticsDrawdownState,
    (state: fromFeature.AgencyAnalyticsDrawdownState) => state.drawdown
);




export const getAgencyAnalyticsDrawdownSecuritiesIds = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownSecurityIds
)

export const getAgencyAnalyticsDrawdownSecuritiesEntities = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownSecurityEntities
)

export const getAgencyAnalyticsDrawdownSecuritiesLoadingStatus = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownSecurityLoading
)

export const getAgencyAnalyticsDrawdownSecuritiesLoadedStatus = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownSecurityLoaded
)

export const getAgencyAnalyticsDrawdownSecuritiesLoadedError = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownSecurityError
)

export const getAgencyAnalyticsDrawdownSecuritiesEntitiesFlat = createSelector(
    getAgencyAnalyticsDrawdownSecuritiesIds,
    getAgencyAnalyticsDrawdownSecuritiesEntities,
    (ids, entities) => {
        if(ids.length >= 1) return ids.map(id => entities[id])
        else return [];
    }
)




export const getAgencyAnalyticsDrawdownRequestIds = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisRequestsIds
)

export const getAgencyAnalyticsDrawdownRequestEntities = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisRequestsEntities
)

export const getAgencyAnalyticsDrawdownActiveRequestId = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawdownAnalysisActiveRequestId
)





export const getAgencyAnalyticsDrawdownTableResponsesIds = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisTableResponsesIds
)

export const getAgencyAnalyticsDrawdownTableResponsesEntities = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisTableResponsesEntities
)

export const getAgencyAnalyticsDrawdownTableResponsesError = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisTableResponsesError
)

export const getAgencyAnalyticsDrawdownTableResponsesLoadingStatus = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisTableResponsesLoading
)

export const getAgencyAnalyticsDrawdownTableResponsesLoadedStatus = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisTableResponsesLoaded
)

export const getAgencyAnalyticsDrawdownTableActiveResponse = createSelector(
    getAgencyAnalyticsDrawdownActiveRequestId,
    getAgencyAnalyticsDrawdownTableResponsesEntities,
    (drawDownActiveRequestId, drawDowntableEntities) => drawDowntableEntities[drawDownActiveRequestId]
)









export const getAgencyAnalyticsDrawdownTimeseriesResponsesIds = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisTimeseriesResponsesIds
)

export const getAgencyAnalyticsDrawdownTimeseriesResponsesEntities = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisTimeseriesResponsesEntities
)

export const getAgencyAnalyticsDrawdownTimeseriesResponsesError = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisTimeseriesResponsesError
)

export const getAgencyAnalyticsDrawdownTimeseriesResponsesLoadingStatus = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisTimeseriesResponsesLoading
)

export const getAgencyAnalyticsDrawdownTimeseriesResponsesLoadedStatus = createSelector(
    getAgencyAnalyticsDrawdownState,
    fromDrawdown.getDrawDownAnalysisTimeseriesResponsesLoaded
)

export const getAgencyAnalyticsDrawdownTimeseriesActiveResponse = createSelector(
    getAgencyAnalyticsDrawdownActiveRequestId,
    getAgencyAnalyticsDrawdownTimeseriesResponsesEntities,
    (drawDownActiveRequestId, drawDownTimeseriesEntities) => drawDownTimeseriesEntities[drawDownActiveRequestId]
)
