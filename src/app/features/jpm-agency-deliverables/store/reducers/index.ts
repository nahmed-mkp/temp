import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromJpmAgencyDeliverables from './jpm-agency-deliverables.reducer';

export interface AgencyDeliverablesState {
    jpmAgencyDeliverables: fromJpmAgencyDeliverables.State;
}

export interface State extends fromRoot.RootState {
    'jpmAgencyDeliverables': AgencyDeliverablesState;
}

export const reducers = {
    jpmAgencyDeliverables: fromJpmAgencyDeliverables.reducer
};

export const getState = createFeatureSelector<AgencyDeliverablesState>('jpmAgencyDeliverables');
