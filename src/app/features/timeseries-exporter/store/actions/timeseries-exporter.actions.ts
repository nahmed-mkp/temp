import { Action } from '@ngrx/store';

import * as fromModels from './../../models';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum TimeseriesExporterActionTypes {

    CHANGE_PARAMS = '[Monitors] Change params',

    SELECT_MONITOR = '[Monitors] Select monitor',

    LOAD_MONITORS = '[Monitors] Load monitors',
    LOAD_MONITORS_COMPLETE = '[Monitors] Load monitors complete',
    LOAD_MONITORS_FAILED = '[Monitors] Load monitors failed',

    LOAD_MONITOR_DATA = '[Monitors] Load monitor data',
    LOAD_MONITOR_DATA_COMPLETE = '[Monitors] Load monitor data complete',
    LOAD_MONITOR_DATA_FAILED = '[Monitors] Load monitor data failed',

    SAVE_MONITOR = '[Monitors] Save monitor',
    SAVE_MONITOR_COMPLETE = '[Monitors] Save monitor complete',
    SAVE_MONITOR_FAILED = '[Monitors] Save monitor failed',

    DELETE_MONITOR_LIST = '[Monitors] delete monitor list',
    DELETE_MONITOR_LIST_COMPLETE = '[Monitors] delete monitor list complete',
    DELETE_MONITOR_LIST_FAILED = '[Monitors] delete monitor list failed',

    LOAD_TIME_SERIES = '[Monitors] Load timeseries',
    LOAD_TIME_SERIES_COMPLETE = '[Monitors] Load timeseries complete',
    LOAD_TIME_SERIES_FAILED = '[Monitors] Load timeseries failed',

    LOAD_TIME_SERIES_WITH_MDID_LIST = '[Monitors] Load timeseries with mdid list',
    LOAD_TIME_SERIES_WITH_MDID_LIST_COMPLETE = '[Monitors] Load timeseries  with mdid list complete',
    LOAD_TIME_SERIES_WITH_MDID_LIST_FAILED = '[Monitors] Load timeseries with mdid list failed',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class ChangeParams {
    readonly type = TimeseriesExporterActionTypes.CHANGE_PARAMS;

    constructor(public payload: fromModels.IDateRange) { }
}

export class SelectMonitor {
    readonly type = TimeseriesExporterActionTypes.SELECT_MONITOR;

    constructor(public payload: string) { }
}

export class LoadMonitors implements Action {
    readonly type = TimeseriesExporterActionTypes.LOAD_MONITORS;
}

export class LoadMonitorsComplete {
    readonly type = TimeseriesExporterActionTypes.LOAD_MONITORS_COMPLETE;

    constructor(public payload: fromModels.IMonitor[]) { }
}

export class LoadMonitorsFailed {
    readonly type = TimeseriesExporterActionTypes.LOAD_MONITORS_FAILED;

    constructor(public payload: string) { }
}

export class LoadMonitorData implements Action {
    readonly type = TimeseriesExporterActionTypes.LOAD_MONITOR_DATA;

    constructor(public payload: fromModels.IMonitorRequest) { }
}

export class LoadMonitorDataComplete {
    readonly type = TimeseriesExporterActionTypes.LOAD_MONITOR_DATA_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadMonitorDataFailed {
    readonly type = TimeseriesExporterActionTypes.LOAD_MONITOR_DATA_FAILED;

    constructor(public payload: string) { }
}

export class SaveMonitor implements Action {
    readonly type = TimeseriesExporterActionTypes.SAVE_MONITOR;

    constructor(public payload: fromModels.ISaveMonitorRequest) { }
}

export class SaveMonitorComplete {
    readonly type = TimeseriesExporterActionTypes.SAVE_MONITOR_COMPLETE;

    constructor(public payload: fromModels.ISaveMonitorResponse) { }
}

export class SaveMonitorFailed {
    readonly type = TimeseriesExporterActionTypes.SAVE_MONITOR_FAILED;

    constructor(public payload: string) { }
}

export class DeleteMonitorList implements Action {
    readonly type = TimeseriesExporterActionTypes.DELETE_MONITOR_LIST;

    constructor(public payload: string) { }
}

export class DeleteMonitorListComplete {
    readonly type = TimeseriesExporterActionTypes.DELETE_MONITOR_LIST_COMPLETE;

    constructor(public payload: string) { }
}

export class DeleteMonitorListFailed {
    readonly type = TimeseriesExporterActionTypes.DELETE_MONITOR_LIST_FAILED;

    constructor(public payload: string) { }
}






export class LoadTimeseries {
    readonly type = TimeseriesExporterActionTypes.LOAD_TIME_SERIES;

    constructor(public payload: fromModels.ITimeseriesRequest) {}
}

export class LoadTimeseriesComplete {
    readonly type = TimeseriesExporterActionTypes.LOAD_TIME_SERIES_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadTimeseriesFailed {
    readonly type = TimeseriesExporterActionTypes.LOAD_TIME_SERIES_FAILED;

    constructor(public payload: string) { }
}






export class LoadTimeseriesWithMdidList {
    readonly type = TimeseriesExporterActionTypes.LOAD_TIME_SERIES_WITH_MDID_LIST;

    constructor(public payload: {mdidList: number[], fullList: any[]}) {}
}

export class LoadTimeseriesWithMdidListComplete {
    readonly type = TimeseriesExporterActionTypes.LOAD_TIME_SERIES_WITH_MDID_LIST_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadTimeseriesWithdidListFailed {
    readonly type = TimeseriesExporterActionTypes.LOAD_TIME_SERIES_WITH_MDID_LIST_FAILED;

    constructor(public payload: string) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TimeseriesExporterActions
    =  ChangeParams

    | SelectMonitor

    | LoadMonitors
    | LoadMonitorsComplete
    | LoadMonitorsFailed

    | LoadMonitorData
    | LoadMonitorDataComplete
    | LoadMonitorDataFailed

    | SaveMonitor
    | SaveMonitorComplete
    | SaveMonitorFailed

    | DeleteMonitorList
    | DeleteMonitorListComplete
    | DeleteMonitorListFailed

    | LoadTimeseries
    | LoadTimeseriesComplete
    | LoadTimeseriesFailed

    | LoadTimeseriesWithMdidList
    | LoadTimeseriesWithMdidListComplete
    | LoadTimeseriesWithdidListFailed;
