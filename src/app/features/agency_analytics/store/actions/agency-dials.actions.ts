import { Action } from '@ngrx/store';

import * as fromModels from '../../models';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AgencyDialsActionTypes {

    LOAD_DIALS = '[AgencyAnalytics] Load dials',
    LOAD_DIALS_COMPLETE = '[AgencyAnalytics] Load dials complete',
    LOAD_DIALS_FAILED = '[AgencyAnalytics] Load dials failed',

    LOAD_DIAL = '[AgencyAnalytics] Load dial',
    LOAD_DIAL_COMPLETE = '[AgencyAnalytics] Load dial complete',
    LOAD_DIAL_FAILED = '[AgencyAnalytics] Load dial failed',

    ADD_DIAL = '[AgencyAnalytics] Add dial',
    ADD_DIAL_COMPLETE = '[AgencyAnalytics] Add dial complete',
    ADD_DIAL_FAILED = '[AgencyAnalytics] Add dial failed',

    CLONE_DIAL = '[AgencyAnalytics] Clone dial',
    CLONE_DIAL_COMPLETE = '[AgencyAnalytics] Clone dial complete',
    CLONE_DIAL_FAILED = '[AgencyAnalytics] Clone dial failed',

    UPDATE_DIAL = '[AgencyAnalytics] Update dial',
    UPDATE_DIAL_COMPLETE = '[AgencyAnalytics] Update dial complete',
    UPDATE_DIAL_FAILED = '[AgencyAnalytics] Update dial failed',

    DELETE_DIAL = '[AgencyAnalytics] Delete dial',
    DELETE_DIAL_COMPLETE = '[AgencyAnalytics] Delete dial complete',
    DELETE_DIAL_FAILED = '[AgencyAnalytics] Delete dial failed',

    LOAD_DEFAULT_TEMPLATE = '[AgencyAnalytics] Load default template',
    LOAD_DEFAULT_TEMPLATE_COMPLETE = '[AgencyAnalytics] Load default template complete',
    LOAD_DEFAULT_TEMPLATE_FAILED = '[AgencyAnalytics] Load default template failed',

    CLEAR_SELECTED_DIAL = '[AgencyAnalytics] Clear selected dial'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadDials implements Action {
    readonly type = AgencyDialsActionTypes.LOAD_DIALS;
}

export class LoadDialsComplete implements Action {
    readonly type = AgencyDialsActionTypes.LOAD_DIALS_COMPLETE;

    constructor(public payload: fromModels.IDial[]) { }
}

export class LoadDialsFailed implements Action {
    readonly type = AgencyDialsActionTypes.LOAD_DIALS_FAILED;

    constructor(public payload: string) { }
}

export class LoadDial implements Action {
    readonly type = AgencyDialsActionTypes.LOAD_DIAL;

    constructor(public payload: string) { }
}

export class LoadDialComplete implements Action {
    readonly type = AgencyDialsActionTypes.LOAD_DIAL_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadDialFailed implements Action {
    readonly type = AgencyDialsActionTypes.LOAD_DIAL_FAILED;

    constructor(public payload: string) { }
}

export class AddDial implements Action {
    readonly type = AgencyDialsActionTypes.ADD_DIAL;

    constructor(public payload: fromModels.INewDialDetail) { }
}

export class AddDialComplete implements Action {
    readonly type = AgencyDialsActionTypes.ADD_DIAL_COMPLETE;

    constructor(public payload: fromModels.IDialDetail) { }
}

export class AddDialFailed implements Action {
    readonly type = AgencyDialsActionTypes.ADD_DIAL_FAILED;

    constructor(public payload: string) { }
}

export class CloneDial implements Action {
    readonly type = AgencyDialsActionTypes.CLONE_DIAL;

    constructor(public payload: fromModels.IClonedDialDetail) { }
}

export class CloneDialComplete implements Action {
    readonly type = AgencyDialsActionTypes.CLONE_DIAL_COMPLETE;

    constructor(public payload: fromModels.IDialDetail) { }
}

export class CloneDialFailed implements Action {
    readonly type = AgencyDialsActionTypes.CLONE_DIAL_FAILED;

    constructor(public payload: string) { }
}

export class UpdateDial implements Action {
    readonly type = AgencyDialsActionTypes.UPDATE_DIAL;

    constructor(public payload: fromModels.IDialDetail) { }
}

export class UpdateDialComplete implements Action {
    readonly type = AgencyDialsActionTypes.UPDATE_DIAL_COMPLETE;

    constructor(public payload: fromModels.IDialDetail) { }
}

export class UpdateDialFailed implements Action {
    readonly type = AgencyDialsActionTypes.UPDATE_DIAL_FAILED;

    constructor(public payload: string) { }
}

export class DeleteDial implements Action {
    readonly type = AgencyDialsActionTypes.DELETE_DIAL;

    constructor(public payload: fromModels.IDialDetail) { }
}

export class DeleteDialComplete implements Action {
    readonly type = AgencyDialsActionTypes.DELETE_DIAL_COMPLETE;

    constructor(public payload: fromModels.IDialDetail) { }
}

export class DeleteDialFailed implements Action {
    readonly type = AgencyDialsActionTypes.DELETE_DIAL_FAILED;

    constructor(public payload: string) { }
}

export class LoadDefaultTemplate implements Action {
    readonly type = AgencyDialsActionTypes.LOAD_DEFAULT_TEMPLATE;
}

export class LoadDefaultTemplateComplete implements Action {
    readonly type = AgencyDialsActionTypes.LOAD_DEFAULT_TEMPLATE_COMPLETE;

    constructor(public payload: fromModels.IDialDetail) { }
}

export class LoadDefaultTemplateFailed implements Action {
    readonly type = AgencyDialsActionTypes.LOAD_DEFAULT_TEMPLATE_FAILED;

    constructor(public payload: string) { }
}

export class ClearSelectedDial implements Action {
    readonly type = AgencyDialsActionTypes.CLEAR_SELECTED_DIAL;
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AgencyDialsActions

    = LoadDials
    | LoadDialsComplete
    | LoadDialsFailed
    
    | LoadDial
    | LoadDialComplete
    | LoadDialFailed

    | AddDial
    | AddDialComplete
    | AddDialFailed

    | CloneDial
    | CloneDialComplete
    | CloneDialFailed

    | UpdateDial
    | UpdateDialComplete
    | UpdateDialFailed
    
    | DeleteDial
    | DeleteDialComplete
    | DeleteDialFailed
    
    | LoadDefaultTemplate
    | LoadDefaultTemplateComplete
    | LoadDefaultTemplateFailed
    
    | ClearSelectedDial;
