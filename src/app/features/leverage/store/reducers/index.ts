import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromLeverage from './leverage.reducer';

export interface LeverageState {
    leverage: fromLeverage.State;
}

export interface State extends fromRoot.RootState {
    leverage: LeverageState;
}

export const reducers = {
    leverage: fromLeverage.reducer
};

export const getGlobalLeverageState = createFeatureSelector<LeverageState>('leverage');


