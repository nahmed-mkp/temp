import { Action } from '@ngrx/store';

import * as fromModels from './../../models/error.models';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ErrorHandleActionTypes {
    ADD_ERROR = '[Error Handle] add error',
    REMOVE_ERROR = '[Error Handle] remove error',
    REMOVE_ALL_ERRORS = '[Error Handle] remove all errors',
}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class AddError implements Action {
    readonly type = ErrorHandleActionTypes.ADD_ERROR;

    constructor(public payload: fromModels.HttpError) { }
}

export class RemoveError implements Action {
    readonly type = ErrorHandleActionTypes.REMOVE_ERROR;

    constructor(public payload: number) { }
}

export class RemoveAllErrors implements Action {
    readonly type = ErrorHandleActionTypes.REMOVE_ALL_ERRORS;
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ErrorHandleActions
    = AddError
    | RemoveError
    | RemoveAllErrors;