import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromCounterparty from './counterparty.reducer';

export interface ExposuresState {
    counterparty: fromCounterparty.State;
}

export interface State extends fromRoot.RootState {
    exposures: ExposuresState;
}

export const reducers = {
    counterparty: fromCounterparty.reducer
};

export const getExposuresModuleState = createFeatureSelector<ExposuresState>('exposures');
