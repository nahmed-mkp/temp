import { Action } from '@ngrx/store';

import * as fromModels from './../../models/dials.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum DialsActionTypes {

    LOAD_DIALS_SETS = '[Dials] Load Dials Sets',
    LOAD_DIALS_SETS_COMPLETE = '[Dials] Load Dials Sets complete',
    LOAD_DIALS_SETS_FAILED = '[Dials] Load Dials Sets failed',

    ADD_DIALS_SET = '[Dials] Add Dials Set',
    ADD_DIALS_SET_COMPLETE = '[Dials] Add Dials Set complete',
    ADD_DIALS_SET_FAILED = '[Dials] Add Dials Set failed',

    CLONE_DIALS_SET = '[Dials] Clone Dials Set',
    CLONE_DIALS_SET_COMPLETE = '[Dials] Clone Dials Set complete',
    CLONE_DIALS_SET_FAILED = '[Dials] Clone Dials Set failed',

    SELECT_DIALS_SET = '[Dials] Select dials Set',

    UPDATE_DIALS_SET = '[Dials] Update Dials Set',
    UPDATE_DIALS_SET_COMPLETE = '[Dials] Update Dials Set complete',
    UPDATE_DIALS_SET_FAILED = '[Dials] Update Dials Set failed',

    DELETE_DIALS_SET = '[Dials] Delete Dials Set',
    DELETE_DIALS_SET_COMPLETE = '[Dials] Delete Dials Set complete',
    DELETE_DIALS_SET_FAILED = '[Dials] Delete Dials Set failed',

    LOAD_DIALS = '[Dials] Load Dials',
    LOAD_DIALS_COMPLETE = '[Dials] Load Dials complete',
    LOAD_DIALS_FAILED = '[Dials] Load Dials failed',

    UPDATE_DIAL = '[Dials] Update Dial',
    UPDATE_DIAL_COMPLETE = '[Dials] Update Dial complete',
    UPDATE_DIAL_FAILED = '[Dials] Update Dial failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadDialsSets implements Action {
    readonly type = DialsActionTypes.LOAD_DIALS_SETS;
}

export class LoadDialsSetsComplete implements Action {
    readonly type = DialsActionTypes.LOAD_DIALS_SETS_COMPLETE;

    constructor(public payload: fromModels.DialsSet[]) { }
}

export class LoadDialsSetsFailed implements Action {
    readonly type = DialsActionTypes.LOAD_DIALS_SETS_FAILED;

    constructor(public payload: string) { }
}

export class AddDialsSet implements Action {
    readonly type = DialsActionTypes.ADD_DIALS_SET;

    constructor(public payload: fromModels.NewDialsSet) { }
}

export class AddDialsSetComplete implements Action {
    readonly type = DialsActionTypes.ADD_DIALS_SET_COMPLETE;

    constructor(public payload: fromModels.DialsSet) { }
}

export class AddDialsSetFailed implements Action {
    readonly type = DialsActionTypes.ADD_DIALS_SET_FAILED;

    constructor(public payload: string) { }
}

export class CloneDialsSet implements Action {
    readonly type = DialsActionTypes.CLONE_DIALS_SET;

    constructor(public payload: fromModels.DialsSet) { }
}

export class CloneDialsSetComplete implements Action {
    readonly type = DialsActionTypes.CLONE_DIALS_SET_COMPLETE;

    constructor(public payload: fromModels.DialsSet) { }
}

export class CloneDialsSetFailed implements Action {
    readonly type = DialsActionTypes.CLONE_DIALS_SET_FAILED;

    constructor(public payload: string) { }
}

export class UpdateDialsSet implements Action {
    readonly type = DialsActionTypes.UPDATE_DIALS_SET;

    constructor(public payload: fromModels.DialsSet) { }
}

export class UpdateDialsSetComplete implements Action {
    readonly type = DialsActionTypes.UPDATE_DIALS_SET_COMPLETE;

    constructor(public payload: fromModels.DialsSet) { }
}

export class UpdateDialsSetFailed implements Action {
    readonly type = DialsActionTypes.UPDATE_DIALS_SET_FAILED;

    constructor(public payload: string) { }
}

export class DeleteDialsSet implements Action {
    readonly type = DialsActionTypes.DELETE_DIALS_SET;

    constructor(public payload: fromModels.DialsSet) { }
}

export class DeleteDialsSetComplete implements Action {
    readonly type = DialsActionTypes.DELETE_DIALS_SET_COMPLETE;

    constructor(public payload: fromModels.DialsSet) { }
}

export class DeleteDialsSetFailed implements Action {
    readonly type = DialsActionTypes.DELETE_DIALS_SET_FAILED;

    constructor(public payload: string) { }
}

export class SelectDialsSet implements Action {
    readonly type = DialsActionTypes.SELECT_DIALS_SET;

    constructor(public payload: fromModels.DialsSet) {}
}

export class LoadDials implements Action {
    readonly type = DialsActionTypes.LOAD_DIALS;

    constructor(public payload: fromModels.DialsSet) { }
}

export class LoadDialsComplete implements Action {
    readonly type = DialsActionTypes.LOAD_DIALS_COMPLETE;

    constructor(public payload: fromModels.Dial[]) { }
}

export class LoadDialsFailed implements Action {
    readonly type = DialsActionTypes.LOAD_DIALS_FAILED;

    constructor(public payload: string) { }
}

export class UpdateDial implements Action {
    readonly type = DialsActionTypes.UPDATE_DIAL;

    constructor(public payload: fromModels.DialUpdate) { }
}

export class UpdateDialComplete implements Action {
    readonly type = DialsActionTypes.UPDATE_DIAL_COMPLETE;

    constructor(public payload: fromModels.Dial[]) { }
}

export class UpdateDialFailed implements Action {
    readonly type = DialsActionTypes.UPDATE_DIAL_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type DialsActions
    = LoadDialsSets
    | LoadDialsSetsComplete
    | LoadDialsSetsFailed

    | AddDialsSet
    | AddDialsSetComplete
    | AddDialsSetFailed

    | CloneDialsSet
    | CloneDialsSetComplete
    | CloneDialsSetFailed

    | UpdateDialsSet
    | UpdateDialsSetComplete
    | UpdateDialsSetFailed

    | DeleteDialsSet
    | DeleteDialsSetComplete
    | DeleteDialsSetFailed

    | SelectDialsSet

    | LoadDials
    | LoadDialsComplete
    | LoadDialsFailed

    | UpdateDial
    | UpdateDialComplete
    | UpdateDialFailed;
