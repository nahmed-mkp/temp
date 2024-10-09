import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromPoolViewer from './pool-viewer.reducers';
import * as fromDials from './dials.reducers';
import * as fromYieldbook from './yieldbook.reducers';
import * as fromBidlistParsers from './bidlist-parser.reducers';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AgencyAnalyticsState {
    poolViewer: fromPoolViewer.State;
    dials: fromDials.State;
    yieldbook: fromYieldbook.State;
    bidlistParsers: fromBidlistParsers.State;
}

export interface State extends fromRoot.RootState {
    agencyAnalytics: AgencyAnalyticsState;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers = {
    poolViewer: fromPoolViewer.reducer,
    dials: fromDials.reducer,
    yieldbook: fromYieldbook.reducer,
    bidlistParsers: fromBidlistParsers.reducer
};

/**
 * AgencyAnalytics State
 */
export const getAgencyAnalyticsState = createFeatureSelector<AgencyAnalyticsState>('agencyAnalytics');
