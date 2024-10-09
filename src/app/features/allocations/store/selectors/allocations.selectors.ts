import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAllocations from '../reducers/allocations.reducer';

const getTradeAllocationsState = createSelector(
    fromFeature.getAllocationsState,
    (state: fromFeature.AllocationsState) => state.allocations
);

export const getTradeAllocationTriggers = createSelector(
    getTradeAllocationsState,
    fromAllocations.getAllocationTriggers
);

export const getTradeAllocationTriggersLoading = createSelector(
    getTradeAllocationsState,
    fromAllocations.getAllocationTriggersLoading
);

export const getTradeAllocationTriggersLoaded = createSelector(
    getTradeAllocationsState,
    fromAllocations.getAllocationTriggersLoaded
);

export const getTradeAllocationTriggersError = createSelector(
    getTradeAllocationsState,
    fromAllocations.getAllocationTriggersError
);

export const getTradeAllocationSelectedTrigger = createSelector(
    getTradeAllocationsState,
    fromAllocations.getSelectedAllocationTrigger
);
