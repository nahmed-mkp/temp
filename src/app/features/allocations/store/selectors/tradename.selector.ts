import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTradeName from '../reducers/tradename.reducer';

const getTradeNamesState = createSelector(
    fromFeature.getAllocationsState,
    (state: fromFeature.AllocationsState) => state.tradeNames
);

export const getTradeNamePMPodDetails = createSelector(
    getTradeNamesState,
    fromTradeName.getPMPodDetails
);

export const getTradeNameDetailsLoading = createSelector(
    getTradeNamesState,
    fromTradeName.getDetailsLoading
);

export const getTradeNameDetailsLoaded = createSelector(
    getTradeNamesState,
    fromTradeName.getDetailsLoaded
);

export const getTradeNameDetailsError = createSelector(
    getTradeNamesState,
    fromTradeName.getDetailsError
);

export const getCrossPodStratergyMapping = createSelector(
    getTradeNamesState,
    fromTradeName.getCrossPodStratergyMapping
);

export const getClientServicesTradeThemes = createSelector(
    getTradeNamesState,
    fromTradeName.getClientServicesTradeThemes
)













export const getTradeNameCreatingTradeNameStatus = createSelector(
    getTradeNamesState,
    fromTradeName.getCreatingTradeNameStatus
);

export const getTradeNameCreatedTradeNameStatus = createSelector(
    getTradeNamesState,
    fromTradeName.getCreatedTradeNameStatus
);

export const getTradeNameCreateTradeNameSuccessMessage = createSelector(
    getTradeNamesState,
    fromTradeName.getCreateTradeNameSuccessMessage
);

export const getTradeNameCreateTradeNameFailureMessage = createSelector(
    getTradeNamesState,
    fromTradeName.getCreateTradeNameFailureMessage
);

// Multiple Alloc TradeNames
export const getTradeNameMultipleAllocTradeNames = createSelector(
    getTradeNamesState,
    fromTradeName.getMultipleAllocTradeNames
);

export const getTradeNameMultipleAllocTradeNamesLoading = createSelector(
    getTradeNamesState,
    fromTradeName.getMultipleAllocTradeNamesLoading
);

export const getTradeNameMultipleAllocTradeNamesLoaded = createSelector(
    getTradeNamesState,
    fromTradeName.getMultipleAllocTradeNamesLoaded
);

export const getTradeNameMultipleAllocTradeNamesError = createSelector(
    getTradeNamesState,
    fromTradeName.getMultipleAllocTradeNamesError
);

export const getTradeNameMultipleAllocationSplit = createSelector(
    getTradeNamesState,
    fromTradeName.getMultipleAllocationSplit
);

export const getTradeNameMultipleAllocationSplitLoading = createSelector(
    getTradeNamesState,
    fromTradeName.getMultipleAllocationSplitLoading
);

export const getTradeNameMultipleAllocationSplitLoaded = createSelector(
    getTradeNamesState,
    fromTradeName.getMultipleAllocationSplitLoaded
);

export const getTradeNameMultipleAllocationSplitError = createSelector(
    getTradeNamesState,
    fromTradeName.getMultipleAllocationSplitError
);

export const getTradeNameMultipleAllocationSplitStatus = createSelector(
    getTradeNamesState,
    fromTradeName.getMultipleAllocationSplitStatus
);

