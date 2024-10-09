import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromMacro from './snr-macro.reducers';

export interface SNRDashboardState {
    macro: fromMacro.State;
}

export interface State extends fromRoot.RootState {
    snr: SNRDashboardState;
}

export const reducers = {
    macro: fromMacro.reducer
};

export const getSNRDashboardState = createFeatureSelector<SNRDashboardState>('snr');
