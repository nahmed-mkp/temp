import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromAttribution from './attribution.reducers';
import * as fromUi from './ui.reducer';

export interface PnlAttributionState {
    attribution: fromAttribution.State;
    ui: fromUi.State
}

export interface State extends fromRoot.RootState {
    attribution: PnlAttributionState;
}

export const reducers = {
    attribution: fromAttribution.reducer,
    ui: fromUi.reducer
};

export const getPnlAttributionState = createFeatureSelector<PnlAttributionState>('attribution');
