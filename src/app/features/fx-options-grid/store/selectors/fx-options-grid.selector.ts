import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromFXOptionsGrid from './../reducers/fx-options-grid.reducer';

const getFXOptionsGridState = createSelector(
    fromFeature.getFXOptionsGridFeatureState,
    (state: fromFeature.FXOptionsGridState) => state.optionsGrid
);

export const getSelectedDate = createSelector(
    getFXOptionsGridState,
    fromFXOptionsGrid.getSelectedDate
);

export const getCurrencies = createSelector(
    getFXOptionsGridState,
    fromFXOptionsGrid.getCurrencies
);

export const getGrids = createSelector(
    getFXOptionsGridState,
    fromFXOptionsGrid.getGrids
);

export const getGridsLoading = createSelector(
    getFXOptionsGridState,
    fromFXOptionsGrid.getGridsLoading
);

export const getGridsLoaded = createSelector(
    getFXOptionsGridState,
    fromFXOptionsGrid.getGridsLoaded
);

export const getGridsError = createSelector(
    getFXOptionsGridState,
    fromFXOptionsGrid.getGridsError
);

export const getSnapTimes = createSelector(
    getFXOptionsGridState,
    fromFXOptionsGrid.getSnapTimes
);

