import { Action } from '@ngrx/store';

import * as fromModels from '../../models/vol-report.models';

export enum VolReportActionTypes {
    // UI Action
    SAVE_TIMESERIES_RECORD = '[Vol Report] Save timeseries record temporary',
    REMOVE_TIMESERIES_RECORD = '[Vol Report] Remove timeseries record temporary',
    SET_ACTIVE_AS_OF_DATE = '[Vol Report] Set active as of date',

    // Server Action

    LOAD_AS_OF_DATE = '[Vol Report] Load as of date',
    LOAD_AS_OF_DATE_COMPLETE = '[Vol Report] Load as of date complete',
    LOAD_AS_OF_DATE_FAILED = '[Vol Report] Load as of date failed',

    LOAD_VOL_REPORT = '[Vol Report] Load vol report',
    LOAD_VOL_REPORT_COMPLETE = '[Vol Report] Load vol report complete',
    LOAD_VOL_REPORT_FAILED = '[Vol Report] Load vol report failed',

    LOAD_TIMESERIES = '[Vol Report] Load timeseries',
    LOAD_TIMESERIES_COMPLETE = '[Vol Report] Load timeseries complete',
    LOAD_TIMESERIES_FAILED = '[Vol Report] Load timeseries failed',
}

// UI Action ---------------------------------------------------------------------

export class SaveTimeseriesRecord implements Action {
    readonly type = VolReportActionTypes.SAVE_TIMESERIES_RECORD;

    constructor(public payload: string) {}
}

export class RemoveTimeseriesRecord implements Action {
    readonly type = VolReportActionTypes.REMOVE_TIMESERIES_RECORD;

    constructor(public payload: string) {}
}

export class SetActiveAsOfDate implements Action {
    readonly type = VolReportActionTypes.SET_ACTIVE_AS_OF_DATE;

    constructor(public payload: string) {}
}




// Server Action -----------------------------------------------------------------

export class LoadAsOfDate implements Action {
    readonly type = VolReportActionTypes.LOAD_AS_OF_DATE;
}

export class LoadAsOfDateComplete implements Action {
    readonly type = VolReportActionTypes.LOAD_AS_OF_DATE_COMPLETE;

    constructor(public payload: string[]) {}
}

export class LoadAsOfDateFailed implements Action {
    readonly type = VolReportActionTypes.LOAD_AS_OF_DATE_FAILED;

    constructor(public payload: string) {}
}




export class LoadVolReport implements Action {
    readonly type = VolReportActionTypes.LOAD_VOL_REPORT;

    constructor(public payload: string) {}
}

export class LoadVolReportComplete implements Action {
    readonly type = VolReportActionTypes.LOAD_VOL_REPORT_COMPLETE;

    constructor(public payload: {[asofDate: string]: fromModels.VolReportData[]}) {}
}

export class LoadVolReportFailed implements Action {
    readonly type = VolReportActionTypes.LOAD_VOL_REPORT_FAILED;

    constructor(public payload: string) {}
}





export class LoadTimeseries implements Action {
    readonly type = VolReportActionTypes.LOAD_TIMESERIES;

    constructor(public payload: any) {}
}

export class LoadTimeseriesComplete implements Action {
    readonly type = VolReportActionTypes.LOAD_TIMESERIES_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadTimeseriesFailed implements Action {
    readonly type = VolReportActionTypes.LOAD_TIMESERIES_FAILED;

    constructor(public payload: string) {}
}



export type VolReportAction 
    = SaveTimeseriesRecord
    | RemoveTimeseriesRecord
    | SetActiveAsOfDate

    | LoadAsOfDate
    | LoadAsOfDateComplete
    | LoadAsOfDateFailed

    | LoadVolReport
    | LoadVolReportComplete
    | LoadVolReportFailed

    | LoadTimeseries
    | LoadTimeseriesComplete
    | LoadTimeseriesFailed
    ;