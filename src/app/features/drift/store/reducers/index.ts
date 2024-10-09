import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromDrift from './drift.reducers';

export interface DriftState {
    drifts: fromDrift.State;
}

export interface State extends fromRoot.RootState {
    drifts: DriftState;
}

export const reducers = {
    drifts: fromDrift.reducer
};

export const getDriftsModuleState = createFeatureSelector<DriftState>('drifts');
