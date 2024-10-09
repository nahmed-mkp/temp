import * as fromRoot from '../../../../store';
import * as fromSovereignCDSSpreads from './sovereign-cds-spreads.reducers';
import { createFeatureSelector } from '@ngrx/store';

export interface SovereignCdsFeedsState  {
  sovereignCdsSpreads: fromSovereignCDSSpreads.State
}

export interface State extends fromRoot.RootState {
  sovereignCdsSpreads: SovereignCdsFeedsState;
}

export  const reducers = {
  sovereignCdsSpreads: fromSovereignCDSSpreads.reducer
};

export const getSovereignCdsFeedsState = createFeatureSelector<SovereignCdsFeedsState>('sovereign-cds-spreads');
