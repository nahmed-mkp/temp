import { Action } from '@ngrx/store';

import * as fromModels from '../../models/sec-master-history.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SecMasterHistoryActionTypes {

    LOAD_CREATE_HISTORY = '[Sec master] Load create history',
    LOAD_CREATE_HISTORY_COMPLETE = '[Sec master] Load create history complete',
    LOAD_CREATE_HISTORY_FAILED = '[Sec master] Load create history Failed',

    LOAD_UPDATE_HISTORY = '[Sec master] update create history',
    LOAD_UPDATE_HISTORY_COMPLETE = '[Sec master] update create history complete',
    LOAD_UPDATE_HISTORY_FAILED = '[Sec master] update create history Failed',

    ADD_DO_NOT_UPDATE_FLAG_FROM_CREATION_HISTORY = '[SecMasterGlobal] Add do-not-update flag from creation history',
    ADD_DO_NOT_UPDATE_FLAG_FROM_CREATION_HISTORY_COMPLETE = '[SecMasterGlobal] Add do-not-update flag from creation history complete',
    ADD_DO_NOT_UPDATE_FLAG_FROM_CREATION_HISTORY_FAILED = '[SecMasterGlobal] Add do-not-update flag from creation history failed',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadCreateHistory implements Action {
    readonly type = SecMasterHistoryActionTypes.LOAD_CREATE_HISTORY;

    constructor(public payload: fromModels.ISecurityHistoryReq) { }
}

export class LoadCreateHistoryComplete implements Action {
    readonly type = SecMasterHistoryActionTypes.LOAD_CREATE_HISTORY_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadCreateHistoryFailed implements Action {
    readonly type = SecMasterHistoryActionTypes.LOAD_CREATE_HISTORY_FAILED;

    constructor(public payload: string) { }
}




export class LoadUpdateHistory implements Action {
    readonly type = SecMasterHistoryActionTypes.LOAD_UPDATE_HISTORY;

    constructor(public payload: fromModels.ISecurityHistoryReq) { }
}

export class LoadUpdateHistoryComplete implements Action {
    readonly type = SecMasterHistoryActionTypes.LOAD_UPDATE_HISTORY_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadUpdateHistoryFailed implements Action {
    readonly type = SecMasterHistoryActionTypes.LOAD_UPDATE_HISTORY_FAILED;

    constructor(public payload: string) { }
}






export class AddDoNotUpdateFlagFromCreationHistory implements Action {
    readonly type = SecMasterHistoryActionTypes.ADD_DO_NOT_UPDATE_FLAG_FROM_CREATION_HISTORY;

    constructor(public payload: number) { }
}

export class AddDoNotUpdateFlagFromCreationHistoryComplete implements Action {
    readonly type = SecMasterHistoryActionTypes.ADD_DO_NOT_UPDATE_FLAG_FROM_CREATION_HISTORY_COMPLETE;

    constructor(public payload: any) { }
}

export class AddDoNotUpdateFlagFromCreationHistoryFailed implements Action {
    readonly type = SecMasterHistoryActionTypes.ADD_DO_NOT_UPDATE_FLAG_FROM_CREATION_HISTORY_FAILED;

    constructor(public payload: string) { }
} 


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SecMasterHistoryActions
    = LoadCreateHistory
    | LoadCreateHistoryComplete
    | LoadCreateHistoryFailed

    | LoadUpdateHistory
    | LoadUpdateHistoryComplete
    | LoadUpdateHistoryFailed

    | AddDoNotUpdateFlagFromCreationHistory
    | AddDoNotUpdateFlagFromCreationHistoryComplete
    | AddDoNotUpdateFlagFromCreationHistoryFailed
;

