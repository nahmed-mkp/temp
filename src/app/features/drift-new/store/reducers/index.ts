import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromDrift from './drift-new.reducer';

export interface DriftState {
    driftsNew: fromDrift.State;
}

export interface State extends fromRoot.RootState {
    driftsNew: DriftState;
}

export const reducers = {
    driftsNew: fromDrift.reducer
};

export const getDriftsModuleState = createFeatureSelector<DriftState>('driftsNew');
