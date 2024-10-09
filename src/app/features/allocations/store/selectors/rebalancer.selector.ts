import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAllocations from '../reducers/rebalancer.reducer';

const getTradeRebalancerState = createSelector(
    fromFeature.getAllocationsState,
    (state: fromFeature.AllocationsState) => state.rebalancer
);

export const getRebalanceTradeNameSelectedDate = createSelector(
    getTradeRebalancerState,
    fromAllocations.getSelectedDate
);

export const getRebalanceTradeNameAllocations = createSelector(
    getTradeRebalancerState,
    fromAllocations.getAllocations
);

export const getRebalanceTradeNameAllocationsLoading = createSelector(
    getTradeRebalancerState,
    fromAllocations.getAllocationsLoading
);

export const getRebalanceTradeNameAllocationsLoaded = createSelector(
    getTradeRebalancerState,
    fromAllocations.getAllocationsLoaded
);

export const getRebalanceTradeNameAllocationsError = createSelector(
    getTradeRebalancerState,
    fromAllocations.getAllocationsError
);

export const getUniqueStrategyPercentage = createSelector(
    getTradeRebalancerState,
    fromAllocations.getUniqueStrategyPercentage
);
