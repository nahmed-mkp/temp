import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromEuroRates from './euro-rates.reducers';

export interface EuroRateState {
    euroRates: fromEuroRates.State
}

export interface state extends fromRoot.RootState {
    euroRates: EuroRateState
}

export const reducers = {
    euroRates: fromEuroRates.reducer
}

export const getEuroRatesState = createFeatureSelector<EuroRateState>('euroRates');