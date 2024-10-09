import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCapitals from '../reducers/capitals.reducer';

const getTradeAllocationsState = createSelector(
    fromFeature.getAllocationsState,
    (state: fromFeature.AllocationsState) => state.capitals
);

export const getCapitalsFundComplexes = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundComplexes
);

export const getCapitalsFundComplexesLoading = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundComplexesLoading
);

export const getCapitalsFundComplexesLoaded = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundComplexesLoaded
);

export const getCapitalsFundComplexesError = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundComplexesError
);

export const getCapitalsInput = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalsInput
);

export const getCapitalMatrixLoading = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalMatrixLoading
);

export const getCapitalMatrixLoaded = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalMatrixLoaded
);

export const getCapitalMatrixError = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalMatrixError
);

export const getCapitalMatrixFunds = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalMatrixFunds
);

export const getCapitalMatrix = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalMatrix
);

export const getCapitalMatrixNew = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalMatrixNew
);

export const getCapitalMatrixDiff = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalMatrixDiff
);


export const getCapitalMatrixPct = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalMatrixPct
);

export const getCapitalMatrixPctNew = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalMatrixPctNew
);

export const getCapitalMatrixPctDiff = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalMatrixPctDiff
);


export const getFundCapitalChangesPreview = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPreviewFundCapitalChanges
);

export const getPodCapitalChangesPreview = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPreviewPodCapitalChanges
);

export const getPreviewCapitalChangesLoading = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPreviewCapitalChangesLoading
);

export const getPreviewCapitalChangesLoaded = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPreviewCapitalChangesLoaded
);

export const getPreviewCapitalChangesError = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPreviewCapitalChangesError
);

export const getSaveCapitalChangesLoading = createSelector(
    getTradeAllocationsState,
    fromCapitals.getSaveCapitalChangesLoading
);

export const getSaveCapitalChangesLoaded = createSelector(
    getTradeAllocationsState,
    fromCapitals.getSaveCapitalChangesLoaded
);

export const getSaveCapitalChangesResult = createSelector(
    getTradeAllocationsState,
    fromCapitals.getSaveCapitalChangesResult
);

export const getCapitalFlowsInput = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalFlowInput
);

export const getFundCapitalFlows = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundCapitalFlows
);

export const getFundCapitalFlowsLoading = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundCapitalFlowsLoading
);

export const getFundCapitalFlowsLoaded = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundCapitalFlowsLoaded
);

export const getFundCapitalFlowsError = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundCapitalFlowsError
);

export const getPodCapitalFlows = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPodCapitalFlows
);

export const getPodCapitalFlowsLoading = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPodCapitalFlowsLoading
);

export const getPodCapitalFlowsLoaded = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPodCapitalFlowsLoaded
);

export const getPodCapitalFlowsError = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPodCapitalFlowsError
);

export const getCapitalHistoryInput = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCapitalHistoryInput
);

export const getFundCapitalHistory = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundCapitalHistory
);
export const getFundCapitalHistoryLoading = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundCapitalHistoryLoading
);
export const getFundCapitalHistoryLoaded = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundCapitalHistoryLoaded
);
export const getFundCapitalHistoryError = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundCapitalHistoryError
);

export const getPodCapitalHistoryFundIDs = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPodCapitalHistoryFundIDs
);

export const getPodCapitalHistory = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPodCapitalHistory
);

export const getPodCapitalHistoryLoading = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPodCapitalHistoryLoading
);

export const getPodCapitalHistoryLoaded = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPodCapitalHistoryLoaded
);

export const getPodCapitalHistoryError = createSelector(
    getTradeAllocationsState,
    fromCapitals.getPodCapitalHistoryError
);

export const getUpdateCrosspodCapitalPending = createSelector(
    getTradeAllocationsState,
    fromCapitals.getUpdateCrosspodCapitalPending
);

export const getUpdateCrosspodCapitalFinished = createSelector(
    getTradeAllocationsState,
    fromCapitals.getUpdateCrosspodCapitalFinished
);

export const getUpdateCrosspodCapitalError = createSelector(
    getTradeAllocationsState,
    fromCapitals.getUpdateCrosspodCapitalError
);

export const getUpdateFundCapitalPending = createSelector(
    getTradeAllocationsState,
    fromCapitals.getUpdateFundCapitalPending
);

export const getUpdateFundCapitalFinished = createSelector(
    getTradeAllocationsState,
    fromCapitals.getUpdateFundCapitalFinished
);

export const getUpdateFundCapitalError = createSelector(
    getTradeAllocationsState,
    fromCapitals.getUpdateFundCapitalError
);


export const getResetCapitalChangesPending = createSelector(
    getTradeAllocationsState,
    fromCapitals.getResetCapitalChangesPending
);

export const getResetCapitalChangesFinished = createSelector(
    getTradeAllocationsState,
    fromCapitals.getResetCapitalChangesFinished
);

export const getResetCapitalChangesError = createSelector(
    getTradeAllocationsState,
    fromCapitals.getResetCapitalChangesError
);


export const getFundMapping = createSelector(
    getTradeAllocationsState,
    fromCapitals.getFundMapping
);

export const getCrossPodMapping = createSelector(
    getTradeAllocationsState,
    fromCapitals.getCrossPodMapping
);

