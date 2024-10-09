import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUi from '../reducers/ui.reducer';



export const getUiState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.ui
);

export const getLatestPortfolioDate = createSelector(
    getUiState, 
    fromUi.getLatestPortfolioDate
)

export const getSelectedDate = createSelector(
    getUiState,
    fromUi.getSelectedDate
);

export const getLiveMode = createSelector(
    getUiState,
    fromUi.getLiveMode
);

export const getTimestamp = createSelector(
    getUiState,
    fromUi.getTimestamp
);