import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromExposureLadder from './exposure-ladder.reducer';

export interface ExposureLadderState {
    exposureLadder: fromExposureLadder.ExposureLadderState;
}

export interface State extends fromRoot.RootState {
    exposureLadder: ExposureLadderState
}


export const reducers = {
    exposureLadder: fromExposureLadder.reducer
}

export const getExposureState = createFeatureSelector<ExposureLadderState>('exposureLadder');