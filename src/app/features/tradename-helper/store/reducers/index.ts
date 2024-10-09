import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromTradeNameHelper from './tradename-helper.reducer';

export interface TradeNameHelperState {
    tradeNameHelper: fromTradeNameHelper.State;
}

export interface State extends fromRoot.RootState {
    tradeNameHelper: TradeNameHelperState;
}

export const reducers = {
    tradeNameHelper: fromTradeNameHelper.reducer,
};

export const getTradeNameHelperFeatureState = createFeatureSelector<TradeNameHelperState>('tradeNameHelper');
