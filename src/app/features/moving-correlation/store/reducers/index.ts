import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromCorrelation from './correlation.reducers';

export interface AgencyAnalyticsMovingCorrelationState {
    movingCorrelation: fromCorrelation.State
}

export interface state extends fromRoot.RootState {
    agencyAnalyticsMovingCorrelation: AgencyAnalyticsMovingCorrelationState
}

export const reducers = {
    movingCorrelation: fromCorrelation.reducer
}

export const getAgencyAnalyticsMovingCorrelationState = createFeatureSelector<AgencyAnalyticsMovingCorrelationState>('agencyAnalyticsMovingCorrelation');