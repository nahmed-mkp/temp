import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSizing from '../reducers/subscription.reducers';

const getSubscriptionState = createSelector(
    fromFeature.getSubscriptionsState,
    (state: fromFeature.SubscriptionsState) => state.subscriptions
);
