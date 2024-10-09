import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum ReportsActionTypes {

    LOAD_REPORTS = '[ExternalReports] Load reports',
    LOAD_REPORTS_COMPLETE = '[ExternalReports] Load reports complete',
    LOAD_REPORTS_FAILED = '[ExternalReports] Load reports failed',

    ADD_REPORT = '[ExternalReports] Add report',
    ADD_REPORT_COMPLETE = '[ExternalReports] Add report complete',
    ADD_REPORT_FAILED = '[ExternalReports] Add report failed',

    UPDATE_REPORT = '[ExternalReports] Update report',
    UPDATE_REPORT_COMPLETE = '[ExternalReports] Update report complete',
    UPDATE_REPORT_FAILED = '[ExternalReports] Update report failed',

    DELETE_REPORT = '[ExternalReports] Delete report',
    DELETE_REPORT_COMPLETE = '[ExternalReports] Delete report complete',
    DELETE_REPORT_FAILED = '[ExternalReports] Delete report failed',

    VIEW_REPORT = '[ExternalReports] View report',
    VIEW_REPORT_COMPLETE = '[ExternalReports] View report complete',
    VIEW_REPORT_FAILED = '[ExternalReports] View report failed',

    TOGGLE_FAVORITE_REPORT = '[ExternalReports] Toggle favorite report',
    TOGGLE_FAVORITE_REPORT_COMPLETE = '[ExternalReports] Toggle favorite report complete',
    TOGGLE_FAVORITE_REPORT_FAILED = '[ExternalReports] Toggle favorite report failed',

    CLEAR_REPORT_STATUS = '[ExternalReports] Clear report status'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadReports implements Action {
    readonly type = ReportsActionTypes.LOAD_REPORTS;

    constructor(public payload: fromModels.Workbook) { }
}

export class LoadReportsComplete implements Action {
    readonly type = ReportsActionTypes.LOAD_REPORTS_COMPLETE;

    constructor(public payload: fromModels.Report[]) { }
}

export class LoadReportsFailed implements Action {
    readonly type = ReportsActionTypes.LOAD_REPORTS_FAILED;

    constructor(public payload?: any) { }
}

export class AddReport implements Action {
    readonly type = ReportsActionTypes.ADD_REPORT;

    constructor(public payload: fromModels.Report) { }
}

export class AddReportComplete implements Action {
    readonly type = ReportsActionTypes.ADD_REPORT_COMPLETE;

    constructor(public payload: fromModels.Report) { }
}

export class AddReportFailed implements Action {
    readonly type = ReportsActionTypes.ADD_REPORT_FAILED;

    constructor(public payload: any) { }
}


export class UpdateReport implements Action {
    readonly type = ReportsActionTypes.UPDATE_REPORT;

    constructor(public payload: fromModels.Report) { }
}

export class UpdateReportComplete implements Action {
    readonly type = ReportsActionTypes.UPDATE_REPORT_COMPLETE;

    constructor(public payload: fromModels.Report) { }
}

export class UpdateReportFailed implements Action {
    readonly type = ReportsActionTypes.UPDATE_REPORT_FAILED;

    constructor(public payload: any) { }
}

export class DeleteReport implements Action {
    readonly type = ReportsActionTypes.DELETE_REPORT;

    constructor(public payload: fromModels.Report) { }
}

export class DeleteReportComplete implements Action {
    readonly type = ReportsActionTypes.DELETE_REPORT_COMPLETE;

    constructor(public payload: fromModels.Report) { }
}

export class DeleteReportFailed implements Action {
    readonly type = ReportsActionTypes.DELETE_REPORT_FAILED;

    constructor(public payload: any) { }
}

export class ClearReportStatus implements Action {
    readonly type = ReportsActionTypes.CLEAR_REPORT_STATUS;
}

export class ViewReport implements Action {
    readonly type = ReportsActionTypes.VIEW_REPORT;

    constructor(public payload: fromModels.Report) { }
}

export class ViewReportComplete implements Action {
    readonly type = ReportsActionTypes.VIEW_REPORT_COMPLETE;

    constructor(public payload: fromModels.Report) { }
}

export class ViewReportFailed implements Action {
    readonly type = ReportsActionTypes.VIEW_REPORT_FAILED;

    constructor(public payload: any) { }
}

export class ToggleFavoriteReport implements Action {
    readonly type = ReportsActionTypes.TOGGLE_FAVORITE_REPORT;

    constructor(public payload: fromModels.Report) { }
}

export class ToggleFavoriteReportComplete implements Action {
    readonly type = ReportsActionTypes.TOGGLE_FAVORITE_REPORT_COMPLETE;

    constructor(public payload: fromModels.Report) { }
}

export class ToggleFavoriteReportFailed implements Action {
    readonly type = ReportsActionTypes.TOGGLE_FAVORITE_REPORT_FAILED;

    constructor(public payload: any) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ReportsActions
    = LoadReports
    | LoadReportsComplete
    | LoadReportsFailed

    | AddReport
    | AddReportComplete
    | AddReportFailed

    | UpdateReport
    | UpdateReportComplete
    | UpdateReportFailed

    | DeleteReport
    | DeleteReportComplete
    | DeleteReportFailed

    | ToggleFavoriteReport
    | ToggleFavoriteReportComplete
    | ToggleFavoriteReportFailed

    | ViewReport
    | ViewReportComplete
    | ViewReportFailed

    | ClearReportStatus;


