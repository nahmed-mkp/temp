import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromForwardRates from './forward-rates.reducer';
import * as fromCurve from './curve.reducer';
import * as fromUi from './ui.reducer';
import * as fromParRate from './par-rate.reducer';
import * as fromFuturesBasis from './futures-basis.reducer';
import * as fromInflationSwaps from './inflation-swaps.reducer';

export interface MarketDataRatesState {
    forwardRates: fromForwardRates.State;
    curve: fromCurve.State;
    parRate: fromParRate.State;
    futuresBasis: fromFuturesBasis.State;
    inflationSwaps: fromInflationSwaps.State;
    ui: fromUi.State;
}

export interface State extends fromRoot.RootState {
    marketDateRates: MarketDataRatesState;
}

export const reducers = {
    forwardRates: fromForwardRates.reducer,
    curve: fromCurve.reducer,
    parRate: fromParRate.reducer,
    futuresBasis: fromFuturesBasis.reducer,
    ui: fromUi.reducer,
    inflationSwaps: fromInflationSwaps.reducer
};

export const getMarketDateRatesState = createFeatureSelector<MarketDataRatesState>('marketDateRates');
