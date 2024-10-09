import { Action } from '@ngrx/store';

import * as fromModels from '../../models/jbot-monitor.models';

export enum JbotMonitorActionTypes {
    SET_JBOT_MONITOR_ACTIVE_AS_OF_DATE = '[Jbot] Set jbot monitor active as of date',
    SET_JBOT_MONITOR_REVERSE_TIME_RANGE = '[Jbot] Set jbot monitor reverse time range',
    // SET_ACTIVE_SERIES = '[Jbot] Set active seriesName',

    // Server Action
    LOAD_JBOT_MONITOR_AS_OF_DATE = '[Jbot] Load jbot monitor as of date',
    LOAD_JBOT_MONITOR_AS_OF_DATE_COMPLETE = '[Jbot] Load jbot monitor as of date complete',
    LOAD_JBOT_MONITOR_AS_OF_DATE_FAILED = '[Jbot] Load jbot monitor as of date failed',

    LOAD_JBOT_MONITOR_SCORE = '[Jbot] Load Jbot monitor result',
    LOAD_JBOT_MONITOR_SCORE_COMPLETE = '[Jbot] Load Jbot monitor result complete',
    LOAD_JBOT_MONITOR_SCORE_FAILED = '[Jbot] Load Jbot monitor result failed',
}



export class SetJbotMonitorActiveAsOfDate implements Action {
    readonly type = JbotMonitorActionTypes.SET_JBOT_MONITOR_ACTIVE_AS_OF_DATE;

    constructor(public payload: string) {}
}

export class SetJbotMonitorReverseTimeRange implements Action {
    readonly type = JbotMonitorActionTypes.SET_JBOT_MONITOR_REVERSE_TIME_RANGE;

    constructor(public payload: number) {}
}




export class LoadJbotMonitorAsOfDate implements Action {
    readonly type = JbotMonitorActionTypes.LOAD_JBOT_MONITOR_AS_OF_DATE;
}

export class LoadJbotMonitorAsOfDateComplete implements Action {
    readonly type = JbotMonitorActionTypes.LOAD_JBOT_MONITOR_AS_OF_DATE_COMPLETE;

    constructor(public payload: string[]) {}
}

export class LoadJbotMonitorAsOfDateFailed implements Action {
    readonly type = JbotMonitorActionTypes.LOAD_JBOT_MONITOR_AS_OF_DATE_FAILED;

    constructor(public payload: string) {}
}





export class LoadJbotMonitorScore implements Action {
    readonly type = JbotMonitorActionTypes.LOAD_JBOT_MONITOR_SCORE;

    constructor(public payload?: string) {}
}

export class LoadJbotMonitorScoreComplete implements Action {
    readonly type = JbotMonitorActionTypes.LOAD_JBOT_MONITOR_SCORE_COMPLETE;

    constructor(public payload: fromModels.JbotMonitorScore[]) {}
}

export class LoadJbotMonitorScoreFailed implements Action {
    readonly type = JbotMonitorActionTypes.LOAD_JBOT_MONITOR_SCORE_FAILED;

    constructor(public payload: string) {}
}




export type JbotMonitorAction 
    = SetJbotMonitorActiveAsOfDate
    | SetJbotMonitorReverseTimeRange

    | LoadJbotMonitorAsOfDate
    | LoadJbotMonitorAsOfDateComplete
    | LoadJbotMonitorAsOfDateFailed

    | LoadJbotMonitorScore
    | LoadJbotMonitorScoreComplete
    | LoadJbotMonitorScoreFailed
    ;
