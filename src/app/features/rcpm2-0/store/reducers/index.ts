
import * as fromRoot from '../../../../store';

import * as fromRCPM2Positions from './rcpm2-positions.reducer';
import * as fromShockAnalysis from './shocks-analysis.reducer';
import * as fromLayout from './layout.reducer';
import * as fromTradeNames from './tradename.reducers';
import * as fromSimulation from './simulation.reducer';
import * as fromDirectionality from './directionality.reducer';
import * as fromReturns from './returns.reducer';
import * as fromUi from './ui.reducer';

import { createFeatureSelector } from '@ngrx/store';

export interface RCPM2State  {
    positions: fromRCPM2Positions.State;
    shocks: fromShockAnalysis.State;
    layout: fromLayout.State;
    tradenames: fromTradeNames.State;
    simulation: fromSimulation.State;
    directionality: fromDirectionality.State;
    returns: fromReturns.State;
    ui: fromUi.State;
}

export interface State extends fromRoot.RootState {
    RCPM2: RCPM2State;
}

export  const reducers = {
    positions: fromRCPM2Positions.reducer,
    shocks: fromShockAnalysis.reducer,
    layout: fromLayout.reducer,
    tradenames: fromTradeNames.reducer,
    simulation: fromSimulation.reducer,
    directionality: fromDirectionality.reducer,
    returns: fromReturns.reducer,
    ui: fromUi.reducer
};

export const getRCPM2State = createFeatureSelector<RCPM2State>('RCPM2');
