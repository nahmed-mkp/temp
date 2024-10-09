import { Action } from '@ngrx/store';

import * as fromModel from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum DividendActionTypes {

    LOAD_DIVIDEND_INFO = '[Blotter] Load dividend info',
    LOAD_DIVIDEND_INFO_COMPLETE = '[Blotter] Load dividend info complete',
    LOAD_DIVIDEND_INFO_FAILED = '[Blotter] Load dividend info failed',

    LOAD_DIVIDEND_ALLOCATION_INFO = '[Blotter] Load dividend allocation info',
    LOAD_DIVIDEND_ALLOCATION_INFO_COMPLETE = '[Blotter] Load dividend allocation info complete',
    LOAD_DIVIDEND_ALLOCATION_INFO_FAILED = '[Blotter] Load dividend allocation info failed',

    UPDATE_DIVIDEND_ALLOCATION_INFO = '[Blotter] Update dividend allocation info',
    UPDATE_DIVIDEND_ALLOCATION_INFO_COMPLETE = '[Blotter] Update dividend allocation info complete',
    UPDATE_DIVIDEND_ALLOCATION_INFO_FAILED = '[Blotter] Update dividend allocation info failed',
}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadDividendInfo implements Action {
    readonly type = DividendActionTypes.LOAD_DIVIDEND_INFO;

    constructor(public payload: string) { }
}

export class LoadDividendInfoComplete implements Action {
    readonly type = DividendActionTypes.LOAD_DIVIDEND_INFO_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadDividendInfoFailed implements Action {
    readonly type = DividendActionTypes.LOAD_DIVIDEND_INFO_FAILED;

    constructor(public payload: string) { }
}





export class LoadDividendAllocationInfo implements Action {
    readonly type = DividendActionTypes.LOAD_DIVIDEND_ALLOCATION_INFO;
}

export class LoadDividendAllocationInfoComplete implements Action {
    readonly type = DividendActionTypes.LOAD_DIVIDEND_ALLOCATION_INFO_COMPLETE;

    constructor(public payload: fromModel.DividendAllocationInfo[]) { }
}

export class LoadDividendAllocationInfoFailed implements Action {
    readonly type = DividendActionTypes.LOAD_DIVIDEND_ALLOCATION_INFO_FAILED;

    constructor(public payload: string) { }
}





export class UpdateDividendAllocationInfo implements Action {
    readonly type = DividendActionTypes.UPDATE_DIVIDEND_ALLOCATION_INFO;

    constructor(public payload: fromModel.DividendAllocationInfo[]) { }
}

export class UpdateDividendAllocationInfoComplete implements Action {
    readonly type = DividendActionTypes.UPDATE_DIVIDEND_ALLOCATION_INFO_COMPLETE;

    constructor(public payload: fromModel.DividendAllocationInfo) { }
}

export class UpdateDividendAllocationInfoFailed implements Action {
    readonly type = DividendActionTypes.UPDATE_DIVIDEND_ALLOCATION_INFO_FAILED;

    constructor(public payload: string) { }
}




/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */

export type DividendActions
    = LoadDividendInfo
    | LoadDividendInfoComplete
    | LoadDividendInfoFailed

    | LoadDividendAllocationInfo
    | LoadDividendAllocationInfoComplete
    | LoadDividendAllocationInfoFailed
    
    | UpdateDividendAllocationInfo
    | UpdateDividendAllocationInfoComplete
    | UpdateDividendAllocationInfoFailed;
