import * as fromRoot from '../../../../store';
import * as fromPnlAdjustments from './pnl-adjustments.reducer';
import { createFeatureSelector } from '@ngrx/store';

export interface PnlAdjustmentsState  {
  pnlAdjustments: fromPnlAdjustments.State
}

export interface State extends fromRoot.RootState {
  pnlAdjustments: PnlAdjustmentsState;
}

export  const reducers = {
  pnlAdjustments: fromPnlAdjustments.reducer
};

export const getPnlAdjustmentsState = createFeatureSelector<PnlAdjustmentsState>('pnl-adjustments');
