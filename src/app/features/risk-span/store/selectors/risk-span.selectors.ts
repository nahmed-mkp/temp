import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRiskSpan from '../reducers/risk-span.reducer';

export const getRiskSpanState = createSelector(
    fromFeature.getRiskSpanFeatureState,
    (state: fromFeature.RiskSpanState) => state.riskSpan
);

/**
 * Plot
 */

export const getActiveReportId = createSelector(
    getRiskSpanState,
    fromRiskSpan.getActiveReportId
);

export const getMultiPlotMode = createSelector(
    getRiskSpanState,
    fromRiskSpan.getMultiPlotMode
);

export const getUiViewMode = createSelector(
    getRiskSpanState,
    fromRiskSpan.getUiViewMode
);

export const getColumnsCollection = createSelector(
    getRiskSpanState,
    fromRiskSpan.getColumnsCollection
);

export const getTargetColumn = createSelector(
    getRiskSpanState,
    fromRiskSpan.getTargetColumn
);

export const getSearchText = createSelector(
    getRiskSpanState,
    fromRiskSpan.getSearchText
);










export const getReports = createSelector(
    getRiskSpanState,
    fromRiskSpan.getReports
);

export const getReportsLoadingStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getReportsLoading
);

export const getReportsLoadedStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getReportsLoaded
);

export const getReportsError = createSelector(
    getRiskSpanState,
    fromRiskSpan.getReportsError
);

export const getXAxisCollection = createSelector(
    getRiskSpanState,
    fromRiskSpan.getXAxisCollection
);

export const getXAxisCollectionLoadingStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getXAxisCollectionLoading
);

export const getXAxisCollectionLoadedStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getXAxisCollectionLoaded
);

export const getXAxisCollectionError = createSelector(
    getRiskSpanState,
    fromRiskSpan.getXAxisCollectionError
);

export const getYAxisCollection = createSelector(
    getRiskSpanState,
    fromRiskSpan.getYAxisCollection
);

export const getYAxisCollectionLoadingStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getYAxisCollectionLoading
);

export const getYAxisCollectionLoadedStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getYAxisCollectionLoaded
);

export const getYAxisCollectionError = createSelector(
    getRiskSpanState,
    fromRiskSpan.getYAxisCollectionError
);

export const getPlotResponse = createSelector(
    getRiskSpanState,
    fromRiskSpan.getPlotResponse
);

export const getPlotLoadingStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getPlotLoading
);

export const getPlotLoadedStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getPlotLoaded
);

export const getPlotError = createSelector(
    getRiskSpanState,
    fromRiskSpan.getPlotError
);

/**
 * Schema
 */
export const getRiskSpanSchema = createSelector(
    getRiskSpanState,
    fromRiskSpan.getSchema
);

export const getRiskSpanSchemaLoadingStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getSchemaLoading
);

export const getRiskSpanSchemaLoadedStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getSchemaLoaded
);

export const getRiskSpanSchemaError = createSelector(
    getRiskSpanState,
    fromRiskSpan.getSchemaError
);

/**
 * Request
 */

export const getRiskSpanRequestIds = createSelector(
    getRiskSpanState,
    fromRiskSpan.getRequestIds
);

export const getRiskSpanRequestEntities = createSelector(
    getRiskSpanState,
    fromRiskSpan.getRequestEntities
);

export const getRiskSpanCurrentRequestId = createSelector(
    getRiskSpanState,
    fromRiskSpan.getCurrentRequestId
);

export const getRiskSpanRequestSavingStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getRequestSavingStatus
);

export const getRiskSpanRequestSavedStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getRequestSavedStatus
);

export const getRiskSpanRequestErrorStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getRequestError
);

export const getRiskSpanRequests = createSelector(
    getRiskSpanRequestIds,
    getRiskSpanRequestEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);

export const getRiskSpanCurrentRequest = createSelector(
    getRiskSpanCurrentRequestId,
    getRiskSpanRequestEntities,
    (id, entities) => {
        return entities[id];
    }
);

/**
 * Results
 */

export const getRiskSpanRequestSubmittingStatus = createSelector(
     getRiskSpanState,
     fromRiskSpan.getRequestSubmittingStatus
);

export const getRiskSpanRequestSubmittedStatus = createSelector(
    getRiskSpanState,
    fromRiskSpan.getRequestSubmittedStatus
);

export const getRiskSpanRequestSubmitError = createSelector(
    getRiskSpanState,
    fromRiskSpan.getRequestSubmitError
);

export const getRiskSpanQueryResult = createSelector(
    getRiskSpanState,
    fromRiskSpan.getQueryResult
);

export const getRiskSpanResults = createSelector(
    getRiskSpanState,
    fromRiskSpan.getResults
);

export const getRiskSpanDetailResults = createSelector(
    getRiskSpanState,
    fromRiskSpan.getDetailResults
);
