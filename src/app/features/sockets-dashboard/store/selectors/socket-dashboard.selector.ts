import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromSocketDashboard from '../reducers/socket-dashboard.reducer';

export const getDashboardState = createSelector(
    fromFeature.getSocketDashboardState,
    (state: fromFeature.SocketDashboardState) => state.socketDashboard
);

export const getDashboardData = createSelector(
    getDashboardState,
    fromSocketDashboard.getSocketDashboardData
);
