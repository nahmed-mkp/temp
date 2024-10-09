import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromHealthStatus from './health.reducers';

export interface HealthStatusState {
    status: fromHealthStatus.State;
}

export interface State extends fromRoot.RootState {
    health: HealthStatusState;
}

export const reducers = {
    status: fromHealthStatus.reducer
};

export const getHealthTrackingFeatureState = createFeatureSelector<HealthStatusState>('health');
