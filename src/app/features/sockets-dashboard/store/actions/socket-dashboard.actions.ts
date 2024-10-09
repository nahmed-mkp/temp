import { Action, createAction, props } from '@ngrx/store';
import * as fromModels from './../../models/socket.models';

export enum SocketDashboardActionTypes {
    SUB_TO_SOCKET_DASHBOARD_DATA = '[Sockets-Admin] Subscribe to socket dashboard data',
    UPDATE_SOCKET_DASHBOARD_DATA_COMPLETE = '[Sockets-Admin] Update socket dashboard data complete',
    UPDATE_SOCKET_DASHBOARD_DATA_FAILED = '[Sockets-Admin] Update socket dashboard data failed',

    UNSUB_FROM_SOCKET_DASHBOARD_DATA = '[Sockets-Admin] Unsubscribe from socket dashboard data',
}

export class SubscribeToSocketDashboardData implements Action {
    readonly type = SocketDashboardActionTypes.SUB_TO_SOCKET_DASHBOARD_DATA;
}

export class UpdateSocketDashboardDataComplete implements Action {
    readonly type = SocketDashboardActionTypes.UPDATE_SOCKET_DASHBOARD_DATA_COMPLETE;
    constructor(public payload: fromModels.SocketDashboardUpdate) { }
}

export class UpdateSocketDashboardDataFailed implements Action {
    readonly type = SocketDashboardActionTypes.UPDATE_SOCKET_DASHBOARD_DATA_FAILED;
    constructor(public payload: string) { }
}

export class UnsubscribeFromSocketDashboardData implements Action {
    readonly type = SocketDashboardActionTypes.UNSUB_FROM_SOCKET_DASHBOARD_DATA;
}

export type SocketDashboardActions
    = SubscribeToSocketDashboardData
    | UpdateSocketDashboardDataComplete
    | UpdateSocketDashboardDataFailed

    | UnsubscribeFromSocketDashboardData
;

// NEW ACTIONS


export const subToSocketDashboardData = createAction('[Sockets-Admin] Subscribe to socket dashboard data');
export const updateSocketDashboardDataComplete = createAction('[Sockets-Admin] Update socket dashboard data complete', props<{payload: fromModels.SocketDashboardUpdate}>());
export const updateSocketDashboardDataFailed = createAction('[Sockets-Admin] Update socket dashboard data failed', props<{payload: string}>());
export const unsubFromSocketDashboardData = createAction('[Sockets-Admin] Unsubscribe from socket dashboard data');
export const testActionWithPayload = createAction('[Sockets-Admin] Test action with payload', props<{payload: string}>())