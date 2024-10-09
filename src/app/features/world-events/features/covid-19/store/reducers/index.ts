import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../../../store';
import * as fromCovid from './covid.reducer';

export interface CovidState {
    covid: fromCovid.State;
}

export interface State extends fromRoot.RootState {
    covid: CovidState;
}

export const reducers = {
    covid: fromCovid.reducer
};

export const getCovidState = createFeatureSelector<CovidState>('covid');
