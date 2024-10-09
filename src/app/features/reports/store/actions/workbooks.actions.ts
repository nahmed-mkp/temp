import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum WorkbookActionTypes {
    LOAD_WORKBOOKS = '[ExternalReports] Load workbooks',
    LOAD_WORKBOOKS_COMPLETE = '[ExternalReports] Load workbooks complete',
    LOAD_WORKBOOKS_FAILED = '[ExternalReports] Load workbooks failed',

    ADD_WORKBOOK = '[ExternalReports] Add workbook',
    ADD_WORKBOOK_COMPLETE = '[ExternalReports] Add workbook complete',
    ADD_WORKBOOK_FAILED = '[ExternalReports] Add workbook failed',

    UPDATE_WORKBOOK = '[ExternalReports] Update workbook',
    UPDATE_WORKBOOK_COMPLETE = '[ExternalReports] Update workbook complete',
    UPDATE_WORKBOOK_FAILED = '[ExternalReports] Update workbook failed',

    DELETE_WORKBOOK = '[ExternalReports] Delete workbook',
    DELETE_WORKBOOK_COMPLETE = '[ExternalReports] Delete workbook complete',
    DELETE_WORKBOOK_FAILED = '[ExternalReports] Delete workbook failed',

    CLEAR_WORKBOOK_STATUS = '[ExternalReports] Clear workbook status',

    TOGGLE_FAVORITE_WORKBOOK = '[ExternalReports] Toggle favorite workbook',
    TOGGLE_FAVORITE_WORKBOOK_COMPLETE = '[ExternalReports] Toggle favorite workbook complete',
    TOGGLE_FAVORITE_WORKBOOK_FAILED = '[ExternalReports] Toggle favorite workbook failed'
}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadWorkbooks implements Action {
    readonly type = WorkbookActionTypes.LOAD_WORKBOOKS;

    constructor(public payload: fromModels.Project) { }
}

export class LoadWorkbooksComplete implements Action {
    readonly type = WorkbookActionTypes.LOAD_WORKBOOKS_COMPLETE;

    constructor(public payload: fromModels.Workbook[]) { }
}

export class LoadWorkbooksFailed implements Action {
    readonly type = WorkbookActionTypes.LOAD_WORKBOOKS_FAILED;

    constructor(public payload?: any) { }
}

export class AddWorkbook implements Action {
    readonly type = WorkbookActionTypes.ADD_WORKBOOK;

    constructor(public payload: fromModels.Workbook) { }
}

export class AddWorkbookComplete implements Action {
    readonly type = WorkbookActionTypes.ADD_WORKBOOK_COMPLETE;

    constructor(public payload: fromModels.Workbook) { }
}

export class AddWorkbookFailed implements Action {
    readonly type = WorkbookActionTypes.ADD_WORKBOOK_FAILED;

    constructor(public payload: any) { }
}


export class UpdateWorkbook implements Action {
    readonly type = WorkbookActionTypes.UPDATE_WORKBOOK;

    constructor(public payload: fromModels.Workbook) { }
}

export class UpdateWorkbookComplete implements Action {
    readonly type = WorkbookActionTypes.UPDATE_WORKBOOK_COMPLETE;

    constructor(public payload: fromModels.Workbook) { }
}

export class UpdateWorkbookFailed implements Action {
    readonly type = WorkbookActionTypes.UPDATE_WORKBOOK_FAILED;

    constructor(public payload: any) { }
}

export class DeleteWorkbook implements Action {
    readonly type = WorkbookActionTypes.DELETE_WORKBOOK;

    constructor(public payload: fromModels.Workbook) { }
}

export class DeleteWorkbookComplete implements Action {
    readonly type = WorkbookActionTypes.DELETE_WORKBOOK_COMPLETE;

    constructor(public payload: fromModels.Workbook) { }
}

export class DeleteWorkbookFailed implements Action {
    readonly type = WorkbookActionTypes.DELETE_WORKBOOK_FAILED;

    constructor(public payload: any) { }
}

export class ClearWorkbookStatus implements Action {
    readonly type = WorkbookActionTypes.CLEAR_WORKBOOK_STATUS;
}

export class ToggleFavoriteWorkbook implements Action {
    readonly type = WorkbookActionTypes.TOGGLE_FAVORITE_WORKBOOK;

    constructor(public payload: fromModels.Workbook) { }
}

export class ToggleFavoriteWorkbookComplete implements Action {
    readonly type = WorkbookActionTypes.TOGGLE_FAVORITE_WORKBOOK_COMPLETE;

    constructor(public payload: fromModels.Workbook) { }
}

export class ToggleFavoriteWorkbookFailed implements Action {
    readonly type = WorkbookActionTypes.TOGGLE_FAVORITE_WORKBOOK_FAILED;

    constructor(public payload: any) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type WorkbooksActions
    = LoadWorkbooks
    | LoadWorkbooksComplete
    | LoadWorkbooksFailed

    | AddWorkbook
    | AddWorkbookComplete
    | AddWorkbookFailed

    | UpdateWorkbook
    | UpdateWorkbookComplete
    | UpdateWorkbookFailed

    | DeleteWorkbook
    | DeleteWorkbookComplete
    | DeleteWorkbookFailed

    | ClearWorkbookStatus

    | ToggleFavoriteWorkbook
    | ToggleFavoriteWorkbookComplete
    | ToggleFavoriteWorkbookFailed;
