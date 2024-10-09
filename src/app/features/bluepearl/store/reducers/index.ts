import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromBluePearlSyntheticTrades from './bluepearl-synthetic-trades.reducer';
import * as fromBluePearlSettlementLadder from './bluepearl-settlement-ladder.reducer';

export interface BluePearlState {
    bluePearlSyntheticTrades: fromBluePearlSyntheticTrades.BluePearlSyntheticTradesState;
    bluePearlSettlementLadder: fromBluePearlSettlementLadder.BluePearlSettlementLadderState
}

export interface State extends fromRoot.RootState {
    bluePearl: BluePearlState
}

export const reducers = {
    bluePearlSyntheticTrades: fromBluePearlSyntheticTrades.reducer,
    bluePearlSettlementLadder: fromBluePearlSettlementLadder.reducer
}

export const getBluePearlState = createFeatureSelector<BluePearlState>('bluepearl');