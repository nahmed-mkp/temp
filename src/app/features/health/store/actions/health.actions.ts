import { Action } from '@ngrx/store';

import * as fromModels from '../../models/health.models';

export enum HealthStatusActionTypes {

    LOAD_HEALTH_STATUS = '[HealthStatus] Load health status',
    LOAD_HEALTH_STATUS_COMPLETE = '[HealthStatus] Load health status complete', 
    LOAD_HEALTH_STATUS_FAILED = '[HealthStatus] Load health status failed',

    VIEW_RUN_HISTORY = '[HealthStatus] View Run History',
    VIEW_RUN_HISTORY_COMPLETE = '[HealthStatus] View Run History complete',
    VIEW_RUN_HISTORY_FAILED = '[HealthStatus] View Run History Failed',

    LOGIN_AND_RESTART_BLOOMBERG = '[HealthStatus] Login and restart Bloomberg',
    LOGIN_AND_RESTART_BLOOMBERG_COMPLETE = '[HealthStatus] Login and restart Bloomberg complete',
    LOGIN_AND_RESTART_BLOOMBERG_FAILED = '[HealthStatus] Login and restart Bloomberg failed',

    LOGIN_AND_RESTART_TRADEWEB = '[HealthStatus] Login and restart Tradeweb',
    LOGIN_AND_RESTART_TRADEWEB_COMPLETE = '[HealthStatus] Login and restart Tradeweb complete',
    LOGIN_AND_RESTART_TRADEWEB_FAILED = '[HealthStatus] Login and restart Tradeweb failed',

    RESTART_ALL_CALC_SERVERS = '[HealthStatus] Restart all calc servers',
    RESTART_ALL_CALC_SERVERS_COMPLETE = '[HealthStatus] Restart all calc servers complete',
    RESTART_ALL_CALC_SERVERS_FAILED = '[HealthStatus] Restart all calc servers failed',

    RESTART_APP = '[HealthStatus] Restart App',
    RESTART_APP_COMPLETE = '[HealthStatus] Restart App complete',
    RESTART_APP_FAILED = '[HealthStatus] Restart App failed',

    KILL_MONITORED_PROCESS = '[HealthStatus] Kill monitored process',
    KILL_MONITORED_PROCESS_COMPLETE = '[HealthStatus] Kill monitored process complete',
    KILL_MONITORED_PROCESS_FAILED = '[HealthStatus] Kill monitored process failed',

    SUB_TO_PROCESS_MONITOR_DATA = '[Sockets] - Subcribe to socket process monitor data',
    UNSUB_FROM_PROCESS_MONITOR_DATA = '[Sockets] - Unsubscribe from process monitor data',

    UPDATE_PROCESS_MONITOR_DATA_COMPLETE = '[Sockets] - Load socket process monitor data complete',
    UPDATE_PROCESS_MONITOR_DATA_FAILED = '[Sockets] - Load socket process monitor data failed',

    LOAD_PROCESS_MONITOR_NAMES = '[HealthStatus] Loading Process Monitor Job Names',
    LOAD_PROCESS_MONITOR_NAMES_COMPLETE = '[HealthStatus] Loading Process Monitor job names complete',
    LOAD_PROCESS_MONITOR_NAMES_FAILED = '[HealthStatus] Loading Process Monitor job names failed'
}

export class LoadHealthStatus implements Action {
    readonly type = HealthStatusActionTypes.LOAD_HEALTH_STATUS;
}

export class LoadHealthStatusComplete implements Action {
    readonly type = HealthStatusActionTypes.LOAD_HEALTH_STATUS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadHealthStatusFailed implements Action {
    readonly type = HealthStatusActionTypes.LOAD_HEALTH_STATUS_FAILED;

    constructor(public payload: string) { }
}

export class ViewRunHistory implements Action {
    readonly type = HealthStatusActionTypes.VIEW_RUN_HISTORY;

    constructor(public payload: fromModels.RunHistoryRequest) { }
}

export class ViewRunHistoryComplete implements Action {
    readonly type = HealthStatusActionTypes.VIEW_RUN_HISTORY_COMPLETE;

    constructor(public payload: any[]) { }
}

export class ViewRunHistoryFailed implements Action {
    readonly type = HealthStatusActionTypes.VIEW_RUN_HISTORY_FAILED;

    constructor(public payload: string) { }
}

export class LoginAndRestartBloomberg implements Action {
    readonly type = HealthStatusActionTypes.LOGIN_AND_RESTART_BLOOMBERG;

    constructor(public payload: fromModels.BulkRequest) { }
}

export class LoginAndRestartBloombergComplete implements Action {
    readonly type = HealthStatusActionTypes.LOGIN_AND_RESTART_BLOOMBERG_COMPLETE;

    constructor(public payload: any) { }
}

export class LoginAndRestartBloombergFailed implements Action {
    readonly type = HealthStatusActionTypes.LOGIN_AND_RESTART_BLOOMBERG_FAILED;

    constructor(public payload: string) { }
}

export class LoginAndRestartTradeweb implements Action {
    readonly type = HealthStatusActionTypes.LOGIN_AND_RESTART_TRADEWEB;

    constructor(public payload: fromModels.BulkRequest) { }
}

export class LoginAndRestartTradewebComplete implements Action {
    readonly type = HealthStatusActionTypes.LOGIN_AND_RESTART_TRADEWEB_COMPLETE

    constructor(public payload: any) { }
}

export class LoginAndRestartTradewebFailed implements Action {
    readonly type = HealthStatusActionTypes.LOGIN_AND_RESTART_TRADEWEB_FAILED;

    constructor(public payload: string) { }
}

export class RestartAllCalcServers implements Action {
    readonly type = HealthStatusActionTypes.RESTART_ALL_CALC_SERVERS;

    constructor(public payload: fromModels.BulkRequest) { }
}

export class RestartAllCalcServersComplete implements Action {
    readonly type = HealthStatusActionTypes.RESTART_ALL_CALC_SERVERS_COMPLETE;

    constructor(public payload: any) { }
}

export class RestartAllCalcServersFailed implements Action {
    readonly type = HealthStatusActionTypes.RESTART_ALL_CALC_SERVERS_FAILED;

    constructor(public payload: string) { }
}

export class RestartApp implements Action {
    readonly type = HealthStatusActionTypes.RESTART_APP;

    constructor(public payload: fromModels.AppRestartRequest) { }
}

export class RestartAppComplete implements Action {
    readonly type = HealthStatusActionTypes.RESTART_APP_COMPLETE;

    constructor(public payload: any) { }
}

export class RestartAppFailed implements Action {
    readonly type = HealthStatusActionTypes.RESTART_APP_FAILED;

    constructor(public payload: string) { }
}

export class KillMonitoredProcess implements Action {
    readonly type = HealthStatusActionTypes.KILL_MONITORED_PROCESS;

    constructor(public payload: fromModels.ProcessKillRequest) { }
}

export class KillMonitoredProcessComplete implements Action {
    readonly type = HealthStatusActionTypes.KILL_MONITORED_PROCESS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class KillMonitoredProcessFailed implements Action {
    readonly type = HealthStatusActionTypes.KILL_MONITORED_PROCESS_FAILED;

    constructor(public payload: string) { }
}


export class SubToProcessMonitorData implements Action {
    readonly type = HealthStatusActionTypes.SUB_TO_PROCESS_MONITOR_DATA;
}

export class UnsubFromProcessMonitorData implements Action {
    readonly type = HealthStatusActionTypes.UNSUB_FROM_PROCESS_MONITOR_DATA;
}


export class UpdateProcessMonitorDataComplete implements Action {
    readonly type = HealthStatusActionTypes.UPDATE_PROCESS_MONITOR_DATA_COMPLETE;
    constructor(public payload: fromModels.ProcessMonitorUpdate) { }
}

export class UpdateProcessMonitorDataFailed implements Action {
    readonly type = HealthStatusActionTypes.UPDATE_PROCESS_MONITOR_DATA_FAILED;
        constructor(public payload: string) { }
}

export class LoadProcessMonitorNames implements Action {
    readonly type = HealthStatusActionTypes.LOAD_PROCESS_MONITOR_NAMES;
}

export class LoadProcessMonitorNamesComplete implements Action {
    readonly type = HealthStatusActionTypes.LOAD_PROCESS_MONITOR_NAMES_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadProcessMonitorNamesFailed implements Action {
    readonly type = HealthStatusActionTypes.LOAD_PROCESS_MONITOR_NAMES_FAILED;
    constructor(public payload: string) { }
}


export type HealthStatusActions
    = LoadHealthStatus
    | LoadHealthStatusComplete
    | LoadHealthStatusFailed

    | ViewRunHistory
    | ViewRunHistoryComplete
    | ViewRunHistoryFailed

    | LoginAndRestartBloomberg
    | LoginAndRestartBloombergComplete
    | LoginAndRestartBloombergFailed

    | LoginAndRestartTradeweb
    | LoginAndRestartTradewebComplete
    | LoginAndRestartTradewebFailed

    | RestartAllCalcServers
    | RestartAllCalcServersComplete
    | RestartAllCalcServersFailed

    | RestartApp
    | RestartAppComplete
    | RestartAppFailed

    | KillMonitoredProcess
    | KillMonitoredProcessComplete
    | KillMonitoredProcessFailed

    | SubToProcessMonitorData
    | UnsubFromProcessMonitorData

    | UpdateProcessMonitorDataComplete
    | UpdateProcessMonitorDataFailed

    | LoadProcessMonitorNames
    | LoadProcessMonitorNamesComplete
    | LoadProcessMonitorNamesFailed;


