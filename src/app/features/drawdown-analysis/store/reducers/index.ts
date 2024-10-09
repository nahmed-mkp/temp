import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromDrawdown from './drawdown.reducers';

export interface AgencyAnalyticsDrawdownState {
    drawdown: fromDrawdown.State
}

export interface state extends fromRoot.RootState {
    agencyAnalyticsDrawdown: AgencyAnalyticsDrawdownState;
}

export const reducers = {
    drawdown: fromDrawdown.reducer
}

export const getAgencyAnalyticsDrawdownState = createFeatureSelector<AgencyAnalyticsDrawdownState>('agencyAnalyticsDrawdown')