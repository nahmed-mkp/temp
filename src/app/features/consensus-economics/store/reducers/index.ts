import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromConsenusEconomics from './consensus-economics.reducer';

export interface ConsensusEconomicsState {
    data: fromConsenusEconomics.ConsenusEconomicsDataState;
}

export interface State extends fromRoot.RootState {
    consensusEconomics: ConsensusEconomicsState;
}

export const reducers = {
    data: fromConsenusEconomics.reducer
};

export const getConsensusEconomicsState = createFeatureSelector<ConsensusEconomicsState>('consensusEconomics');
