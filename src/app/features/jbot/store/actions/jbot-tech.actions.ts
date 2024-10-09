import { Action } from '@ngrx/store';

import * as fromModels from '../../models/jbot-tech.models';

export enum JbotTechActionTypes {
    SET_JBOT_TECH_ACTIVE_AS_OF_DATE = '[Jbot] Set jbot tech active as of date',
    SET_JBOT_TECH_REVERSE_TIME_RANGE = '[Jbot] Set reverse time range',
    // SET_ACTIVE_SERIES = '[Jbot] Set active seriesName',

    // Server Action
    LOAD_JBOT_TECH_AS_OF_DATE = '[Jbot] Load jbot tech as of date',
    LOAD_JBOT_TECH_AS_OF_DATE_COMPLETE = '[Jbot] Load jbot tech as of date complete',
    LOAD_JBOT_TECH_AS_OF_DATE_FAILED = '[Jbot] Load jbot tech as of date failed',

    LOAD_JBOT_TECH_SCORE = '[Jbot] Load Jbot tech result',
    LOAD_JBOT_TECH_SCORE_COMPLETE = '[Jbot] Load Jbot tech result complete',
    LOAD_JBOT_TECH_SCORE_FAILED = '[Jbot] Load Jbot tech result failed',
}



export class SetJbotTechActiveAsOfDate implements Action {
    readonly type = JbotTechActionTypes.SET_JBOT_TECH_ACTIVE_AS_OF_DATE;

    constructor(public payload: string) {}
}

export class SetJbotTechReverseTimeRange implements Action {
    readonly type = JbotTechActionTypes.SET_JBOT_TECH_REVERSE_TIME_RANGE;

    constructor(public payload: number) {}
}




export class LoadJbotTechAsOfDate implements Action {
    readonly type = JbotTechActionTypes.LOAD_JBOT_TECH_AS_OF_DATE;
}

export class LoadJbotTechAsOfDateComplete implements Action {
    readonly type = JbotTechActionTypes.LOAD_JBOT_TECH_AS_OF_DATE_COMPLETE;

    constructor(public payload: string[]) {}
}

export class LoadJbotTechAsOfDateFailed implements Action {
    readonly type = JbotTechActionTypes.LOAD_JBOT_TECH_AS_OF_DATE_FAILED;

    constructor(public payload: string) {}
}





export class LoadJbotTechScore implements Action {
    readonly type = JbotTechActionTypes.LOAD_JBOT_TECH_SCORE;

    constructor(public payload?: string) {}
}

export class LoadJbotTechScoreComplete implements Action {
    readonly type = JbotTechActionTypes.LOAD_JBOT_TECH_SCORE_COMPLETE;

    constructor(public payload: fromModels.JbotTechScore[]) {}
}

export class LoadJbotTechScoreFailed implements Action {
    readonly type = JbotTechActionTypes.LOAD_JBOT_TECH_SCORE_FAILED;

    constructor(public payload: string) {}
}




export type JbotTechAction 
    = SetJbotTechActiveAsOfDate
    | SetJbotTechReverseTimeRange

    | LoadJbotTechAsOfDate
    | LoadJbotTechAsOfDateComplete
    | LoadJbotTechAsOfDateFailed

    | LoadJbotTechScore
    | LoadJbotTechScoreComplete
    | LoadJbotTechScoreFailed
    ;
