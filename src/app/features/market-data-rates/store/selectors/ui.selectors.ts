import { createSelector } from '@ngrx/store';

import * as fromUi from '../reducers/ui.reducer';
import * as fromFeature from '../reducers';

export const getUiState = createSelector(
    fromFeature.getMarketDateRatesState,
    (state: fromFeature.MarketDataRatesState) => state.ui
);

export const getSelectedDate = createSelector(
    getUiState,
    fromUi.getSelectedDate
);

export const getSelectedFuturesTicker = createSelector(
    getUiState,
    fromUi.getSelectedFuturesTicker
);

export const getDevMode = createSelector(
    getUiState,
    fromUi.getDevMode
);


