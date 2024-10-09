import { Action } from '@ngrx/store';

import * as fromModels from '../../models/jbot-summary.models';

export enum JbotSummaryActionTypes {

    SET_JBOT_SUMMARY_ACTIVE_AS_OF_DATE = '[JbotSummary] Set active as of date',

    // Server Action
    LOAD_JBOT_SUMMARY_AS_OF_DATES = '[JbotSummary] Load dates',
    LOAD_JBOT_SUMMARY_AS_OF_DATES_COMPLETE = '[JbotSummary] Load dates complete',
    LOAD_JBOT_SUMMARY_AS_OF_DATES_FAILED = '[JbotSummary] Load dates failed',

    LOAD_JBOT_SUMMARY = '[JbotSummary] Load Jbot summary',
    LOAD_JBOT_SUMMARY_COMPLETE = '[JbotSummary] Load Jbot summary complete',
    LOAD_JBOT_SUMMARY_FAILED = '[JbotSummary] Load Jbot summary failed',

    LOAD_JBOT_EXPLODED_SUMMARY = '[JbotSummary] Load Jbot exploded summary',
    LOAD_JBOT_EXPLODED_SUMMARY_COMPLETE = '[JbotSummary] Load Jbot exploded summary Complete',
    LOAD_JBOT_EXPLODED_SUMMARY_FAILED = '[JbotSummary] Load Jbot exploded summary Failed',
}

export class SetJbotSummaryActiveAsOfDate implements Action {
    readonly type = JbotSummaryActionTypes.SET_JBOT_SUMMARY_ACTIVE_AS_OF_DATE;

    constructor(public payload: string) { }
}

export class LoadJbotSummaryAsOfDates implements Action {
    readonly type = JbotSummaryActionTypes.LOAD_JBOT_SUMMARY_AS_OF_DATES;
}

export class LoadJbotSummaryAsOfDatesComplete implements Action {
    readonly type = JbotSummaryActionTypes.LOAD_JBOT_SUMMARY_AS_OF_DATES_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadJbotSummaryAsOfDatesFailed implements Action {
    readonly type = JbotSummaryActionTypes.LOAD_JBOT_SUMMARY_AS_OF_DATES_FAILED;

    constructor(public payload: string) { }
}

export class LoadJbotSummary implements Action {
    readonly type = JbotSummaryActionTypes.LOAD_JBOT_SUMMARY;

    constructor(public payload: string) { }
}

export class LoadJbotSummaryComplete implements Action {
    readonly type = JbotSummaryActionTypes.LOAD_JBOT_SUMMARY_COMPLETE;

    constructor(public payload: { [asofDate: string]: fromModels.JbotSummaryGridData[] }) { }
}

export class LoadJbotSummaryFailed implements Action {
    readonly type = JbotSummaryActionTypes.LOAD_JBOT_SUMMARY_FAILED;

    constructor(public payload: string) { }
}

export class LoadJbotExplodedSummary implements Action {
    readonly type = JbotSummaryActionTypes.LOAD_JBOT_EXPLODED_SUMMARY;

    constructor(public payload: string) { }
}

export class LoadJbotExplodedSummaryComplete implements Action {
    readonly type = JbotSummaryActionTypes.LOAD_JBOT_EXPLODED_SUMMARY_COMPLETE;

    constructor(public payload: { [asofDate: string]: fromModels.JbotExplodedSummaryGridData[] }) { }
}

export class LoadJbotExplodedSummaryFailed implements Action {
    readonly type = JbotSummaryActionTypes.LOAD_JBOT_EXPLODED_SUMMARY_FAILED;

    constructor(public payload: string) { }
}



export type JbotSummaryActions
    = SetJbotSummaryActiveAsOfDate

    | LoadJbotSummaryAsOfDates
    | LoadJbotSummaryAsOfDatesComplete
    | LoadJbotSummaryAsOfDatesFailed

    | LoadJbotSummary
    | LoadJbotSummaryComplete
    | LoadJbotSummaryFailed

    | LoadJbotSummary
    | LoadJbotSummaryComplete
    | LoadJbotSummaryFailed
    ;
