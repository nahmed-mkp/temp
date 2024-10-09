import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromSubscriptions from './subscription.reducers';

export interface SubscriptionsState {
    subscriptions: fromSubscriptions.State;
}

export interface State extends fromRoot.RootState {
    subscriptions: SubscriptionsState;
}

export const reducers = {
    subscriptions: fromSubscriptions.reducer
};

export const getSubscriptionsState = createFeatureSelector<SubscriptionsState>('subscriptions');
