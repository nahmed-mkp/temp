import { Action } from '@ngrx/store';

import * as fromModels from '../../models/jbots.models';

export enum JbotActionTypes {
    SET_ACTIVE_AS_OF_DATE = '[Jbot] Set active as of date',
    SET_ACTIVE_SERIES = '[Jbot] Set active seriesName',

    // Server Action
    LOAD_AS_OF_DATE = '[Jbot] Load as of date',
    LOAD_AS_OF_DATE_COMPLETE = '[Jbot] Load as of date complete',
    LOAD_AS_OF_DATE_FAILED = '[Jbot] Load as of date failed',

    LOAD_JBOT_RESULT = '[Jbot] Load Jbot result',
    LOAD_JBOT_RESULT_COMPLETE = '[Jbot] Load Jbot result complete',
    LOAD_JBOT_RESULT_FAILED = '[Jbot] Load Jbot result failed',

    LOAD_JBOT_TIMESERIES = '[Jbot] Load Jbot Timeseries',
    LOAD_JBOT_TIMESERIES_COMPLETE = '[Jbot] Load Jbot Timeseries Complete',
    LOAD_JBOT_TIMESERIES_FAILED = '[Jbot] Load Jbot Timeseries Failed',
}



export class SetActiveAsOfDate implements Action {
    readonly type = JbotActionTypes.SET_ACTIVE_AS_OF_DATE;

    constructor(public payload: string) {}
}

export class SetActiveSeries implements Action {
    readonly type = JbotActionTypes.SET_ACTIVE_SERIES;

    constructor(public payload: string) {}
}




export class LoadAsOfDate implements Action {
    readonly type = JbotActionTypes.LOAD_AS_OF_DATE;
}

export class LoadAsOfDateComplete implements Action {
    readonly type = JbotActionTypes.LOAD_AS_OF_DATE_COMPLETE;

    constructor(public payload: string[]) {}
}

export class LoadAsOfDateFailed implements Action {
    readonly type = JbotActionTypes.LOAD_AS_OF_DATE_FAILED;

    constructor(public payload: string) {}
}





export class LoadJbotResult implements Action {
    readonly type = JbotActionTypes.LOAD_JBOT_RESULT;

    constructor(public payload: string) {}
}

export class LoadJbotResultComplete implements Action {
    readonly type = JbotActionTypes.LOAD_JBOT_RESULT_COMPLETE;

    constructor(public payload: {[asofDate: string]: fromModels.JbotGridData[]}) {}
}

export class LoadJbotResultFailed implements Action {
    readonly type = JbotActionTypes.LOAD_JBOT_RESULT_FAILED;

    constructor(public payload: string) {}
}




export class LoadJbotTimeseries implements Action {
    readonly type = JbotActionTypes.LOAD_JBOT_TIMESERIES;

    constructor(public payload: {category: string, seriesName: string}) {}
}

export class LoadJbotTimeseriesComplete implements Action {
    readonly type = JbotActionTypes.LOAD_JBOT_TIMESERIES_COMPLETE;

    constructor(public payload: {[seriesName: string]: fromModels.JbotTimeseriesResponse}) {}
}

export class LoadJbotTimeseriesFailed implements Action {
    readonly type = JbotActionTypes.LOAD_JBOT_TIMESERIES_FAILED;

    constructor(public payload: string) {}
}



export type JbotAction 
    = SetActiveAsOfDate
    | SetActiveSeries

    | LoadAsOfDate
    | LoadAsOfDateComplete
    | LoadAsOfDateFailed

    | LoadJbotResult
    | LoadJbotResultComplete
    | LoadJbotResultFailed

    | LoadJbotTimeseries
    | LoadJbotTimeseriesComplete
    | LoadJbotTimeseriesFailed
    ;
