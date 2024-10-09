import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum DividendActionTypes {

    LOAD_DIVIDEND_INFO = '[Dividend] Load dividend info',
    LOAD_DIVIDEND_INFO_COMPLETE = '[Dividend] Load dividend info complete',
    LOAD_DIVIDEND_INFO_FAILED = '[Dividend] Load dividend info failed',

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




/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */

export type DividendActions
    = LoadDividendInfo
    | LoadDividendInfoComplete
    | LoadDividendInfoFailed;
