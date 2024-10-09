
import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

export const LOAD_MISSING_DATES = '[TBAReports] Load missing dates';
export const LOAD_MISSING_DATES_COMPLETE = '[TBAReports] Load missing dates complete';
export const LOAD_MISSING_DATES_FAILED = '[TBAReports] Load missing dates failed';

export const RESET_STEP = '[TBAReports] Reset step';
export const UPDATE_STEP = '[TBAReports] Update step';
export const NEXT_STEP = '[TBAReports] Next step';
export const PREVIOUS_STEP = '[TBAReports] Previous step';

export const SAVE_CACHE_KEY = '[TBAReports] Save cache key';

export const PARSE_DEALER_FILE_COMPLETE = '[TBAReports] Parse dealer file complete';
export const PARSE_DEALER_FILE_FAILED = '[TBAReports] Parse dealer file failed';

export const SAVE_RESULTS = '[TBAReports] Save results';
export const SAVE_RESULTS_COMPLETE = '[TBAReports] Save results complete';
export const SAVE_RESULTS_FAILED = '[TBAReports] Save results failed';

export const UPLOAD_FROM_TEMPLATE = '[TBAReports] Upload from template';
export const UPLOAD_FROM_TEMPLATE_COMPLETE = '[TBAReports] Upload from template complete';
export const UPLOAD_FROM_TEMPLATE_FAILED = '[TBAReports] Upload from template failed';

export const INVALID_REQUEST = '[TBAReports] Invalid request';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful type
 * checking in reducer functions.
 */

 export class LoadMissingDates implements Action {
     readonly type = LOAD_MISSING_DATES;
 }

export class LoadMissingDatesComplete implements Action {
    readonly type = LOAD_MISSING_DATES_COMPLETE;

    constructor(public payload: fromModels.MissingDate[]) { }
}

export class LoadMissingDatesFailed implements Action {
    readonly type = LOAD_MISSING_DATES_FAILED;

    constructor(public payload?: any) { }
}

export class ResetStep implements Action {
    readonly type = RESET_STEP;
}

export class UpdateStep implements Action {
    readonly type = UPDATE_STEP;

    constructor(public payload: fromModels.Step) { }
}

export class NextStep implements Action {
    readonly type = NEXT_STEP;
}

export class PreviousStep implements Action {
    readonly type = PREVIOUS_STEP;
}

export class SaveCacheKey implements Action {
    readonly type = SAVE_CACHE_KEY;

    constructor(public payload: string) { }
}

export class ParseDealerFileComplete implements Action {
    readonly type = PARSE_DEALER_FILE_COMPLETE;

    constructor(public payload: fromModels.ParserResult) { }
}

export class ParseDealerFileFailed implements Action {
    readonly type = PARSE_DEALER_FILE_FAILED;

    constructor(public payload: any) { }
}

export class SaveResults implements Action {
    readonly type = SAVE_RESULTS;

    constructor(public payload: string) {}
}

export class SaveResultsComplete implements Action {
    readonly type = SAVE_RESULTS_COMPLETE;

    constructor(public payload: fromModels.ParserResult) { }
}

export class SaveResultsFailed implements Action {
    readonly type = SAVE_RESULTS_FAILED;

    constructor(public payload: any) { }
}

export class InvalidRequest implements Action {
    readonly type = INVALID_REQUEST;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ParserActions
    = LoadMissingDates
    | LoadMissingDatesComplete
    | LoadMissingDatesFailed

    | ResetStep
    | UpdateStep
    | NextStep
    | PreviousStep

    | SaveCacheKey

    | ParseDealerFileComplete
    | ParseDealerFileFailed

    | SaveResults
    | SaveResultsComplete
    | SaveResultsFailed

    | InvalidRequest;
