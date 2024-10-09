import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromAgreements from './agreements.reducer';
import * as fromAllocations from './allocations.reducer';
import * as fromCapitals from './capitals.reducer';
import * as fromRebalancer from './rebalancer.reducer';
import * as fromTradeName from './tradename.reducer';

export interface AllocationsState {
    tradeAgreements: fromAgreements.State;
    allocations: fromAllocations.State;
    capitals: fromCapitals.State;
    rebalancer: fromRebalancer.State;
    tradeNames: fromTradeName.State;
}

export interface State extends fromRoot.RootState {
    allocations: AllocationsState;
}

export const reducers = {
    tradeAgreements: fromAgreements.reducer,
    allocations: fromAllocations.reducer,
    capitals: fromCapitals.reducer,
    rebalancer: fromRebalancer.reducer,
    tradeNames: fromTradeName.reducer
};

export const getAllocationsState = createFeatureSelector<AllocationsState>('allocations');
