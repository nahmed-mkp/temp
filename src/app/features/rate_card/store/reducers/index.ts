import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromRateCard from './rate-card.reducers';

export interface RateCardState  {
   rateCard: fromRateCard.State
}

export interface State extends fromRoot.RootState {
    'ratecard': RateCardState;
}

export  const reducers = {
    rateCard: fromRateCard.reducer
};

export const getRateCardState = createFeatureSelector<RateCardState>('ratecard');
