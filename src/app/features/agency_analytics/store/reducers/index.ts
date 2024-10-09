import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';

import * as fromAgencyAnalytics from './agency-analytics.reducers';
import * as fromAgencyDials from './agency-dials.reducers';

export interface AgencyAnalyticsState {
    agencyAnalytics: fromAgencyAnalytics.State;
    agencyDials: fromAgencyDials.State;
}

export interface State extends fromRoot.RootState {
    agencyAnalytics: AgencyAnalyticsState;
}

export const reducers = {
    agencyAnalytics: fromAgencyAnalytics.reducer,
    agencyDials: fromAgencyDials.reducer
};

export const getAgencyAnalyticsFeatureState = createFeatureSelector<AgencyAnalyticsState>('agencyAnalytics');
