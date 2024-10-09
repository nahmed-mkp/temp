import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromFXOptionsGrid from './fx-options-grid.reducer';

export interface FXOptionsGridState {
    optionsGrid: fromFXOptionsGrid.State;
}

export interface State extends fromRoot.RootState {
    optionsGrid: FXOptionsGridState;
}

export const reducers = {
    optionsGrid: fromFXOptionsGrid.reducer
};

export const getFXOptionsGridFeatureState = createFeatureSelector<FXOptionsGridState>('optionsGrid');
