import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromSizing from './sizing.reducers';

export interface TradeSizingState {
    sizing: fromSizing.State;
}

export interface State extends fromRoot.RootState {
    tradeSizing: TradeSizingState;
}

export const reducers = {
    sizing: fromSizing.reducer
};

export const getTradeSizingState = createFeatureSelector<TradeSizingState>('tradeSizing');
