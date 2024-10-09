import { Action } from '@ngrx/store';
import * as fromModels from './../../models/router.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum RouterActionTypes {
    GO = '[Router] Go',
    BACK = '[Router] Back',
    FORWARD = '[Router] Forward'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class Go implements Action {
    readonly type = RouterActionTypes.GO;

    constructor(public payload: fromModels.NavigationPayload) { }
}

export class Back implements Action {
    readonly type = RouterActionTypes.BACK;
}


export class Forward implements Action {
    readonly type = RouterActionTypes.FORWARD;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type RouterActions
    = Go
    | Back
    | Forward;

