import { createFeatureSelector } from '@ngrx/store';
import * as fromRoot from './../../../../store';
import * as fromSocketDashboard from './socket-dashboard.reducer';

export interface SocketDashboardState {
    socketDashboard: fromSocketDashboard.State;
}

export interface State extends fromRoot.RootState {
    socketDashboard: SocketDashboardState;
}


export const reducers = {
    socketDashboard: fromSocketDashboard.featureReducer
};

export const getSocketDashboardState = createFeatureSelector<SocketDashboardState>('socketDashboard');
