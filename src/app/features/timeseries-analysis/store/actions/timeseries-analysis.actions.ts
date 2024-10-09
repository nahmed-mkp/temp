import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum TimeseriesAnalysisActionTypes {

    LOAD_USER_WATCHLISTS = '[TimeseriesAnalysis] Load user watchlists',
    LOAD_USER_WATCHLISTS_COMPLETE = '[TimeseriesAnalysis] Load user watchlists complete',
    LOAD_USER_WATCHLISTS_FAILED = '[TimeseriesAnalysis] Load user watchlists failed',

    CREATE_USER_WATCHLIST = '[TimeseriesAnalysis] Create user watchlist',
    CREATE_USER_WATCHLIST_COMPLETE = '[TimeseriesAnalysis] Create user watchlist complete',
    CREATE_USER_WATCHLIST_FAILED = '[TimeseriesAnalysis] Create user watchlist failed',

    UPDATE_USER_WATCHLIST = '[TimeseriesAnalysis] Update user watchlist',
    UPDATE_USER_WATCHLIST_COMPLETE = '[TimeseriesAnalysis] Update user watchlist complete',
    UPDATE_USER_WATCHLIST_FAILED = '[TimeseriesAnalysis] Update user watchlist failed',

    DELETE_USER_WATCHLIST = '[TimeseriesAnalysis] Delete user watchlist',
    DELETE_USER_WATCHLIST_COMPLETE = '[TimeseriesAnalysis] Delete user watchlist complete',
    DELETE_USER_WATCHLIST_FAILED = '[TimeseriesAnalysis] Delete user watchlist failed',

    LOAD_WATCHLIST = '[TimeseriesAnalysis] Load watchlist',
    LOAD_WATCHLIST_COMPLETE = '[TimeseriesAnalysis] Load watchlist complete',
    LOAD_WATCHLIST_FAILED = '[TimeseriesAnalysis] Load watchlist failed',    
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class LoadUserWatchlists implements Action {
    readonly type = TimeseriesAnalysisActionTypes.LOAD_USER_WATCHLISTS;
}

export class LoadUserWatchlistsComplete implements Action {
    readonly type = TimeseriesAnalysisActionTypes.LOAD_USER_WATCHLISTS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadUserWatchlistsFailed implements Action {
    readonly type = TimeseriesAnalysisActionTypes.LOAD_USER_WATCHLISTS_COMPLETE;

    constructor(public payload: string) { }
}

export class CreateUseWatchlist implements Action {
    readonly type = TimeseriesAnalysisActionTypes.CREATE_USER_WATCHLIST;

    constructor(public payload: any) { }
}

export class CreateUserWatchlistComplete implements Action {
    readonly type = TimeseriesAnalysisActionTypes.CREATE_USER_WATCHLIST_COMPLETE;

    constructor(public payload: any) { }
}

export class CreateUserWatchlistFailed implements Action {
    readonly type = TimeseriesAnalysisActionTypes.CREATE_USER_WATCHLIST_FAILED;

    constructor(public payload: string) { }
}


export class UpdateUserWatchlist implements Action {
    readonly type = TimeseriesAnalysisActionTypes.UPDATE_USER_WATCHLIST;

    constructor(public payload: any) { }
}

export class UpdateUserWatchlistComplete implements Action {
    readonly type = TimeseriesAnalysisActionTypes.UPDATE_USER_WATCHLIST_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateUserWatchlistFailed implements Action {
    readonly type = TimeseriesAnalysisActionTypes.UPDATE_USER_WATCHLIST_FAILED;

    constructor(public payload: string) { }
}


export class DeleteUserWatchlist implements Action {
    readonly type = TimeseriesAnalysisActionTypes.DELETE_USER_WATCHLIST;

    constructor(public payload: any) { }
}

export class DeleteUserWatchlistComplete implements Action {
    readonly type = TimeseriesAnalysisActionTypes.DELETE_USER_WATCHLIST_COMPLETE;

    constructor(public payload: any) { }
}

export class DeleteUserWatchlistFailed implements Action {
    readonly type = TimeseriesAnalysisActionTypes.DELETE_USER_WATCHLIST_FAILED;

    constructor(public payload: string) { }
}


export class LoadWatchlist implements Action {
    readonly type = TimeseriesAnalysisActionTypes.LOAD_WATCHLIST;

    constructor(public payload: any) { }
}

export class LoadWatchlistComplete implements Action {
    readonly type = TimeseriesAnalysisActionTypes.LOAD_WATCHLIST_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadWatchlistFailed implements Action {
    readonly type = TimeseriesAnalysisActionTypes.LOAD_WATCHLIST_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TimeseriesAnalysisActions
    = LoadUserWatchlists
    | LoadUserWatchlistsComplete
    | LoadUserWatchlistsFailed
    
    | CreateUseWatchlist
    | CreateUserWatchlistComplete
    | CreateUserWatchlistFailed
    
    | UpdateUserWatchlist
    | UpdateUserWatchlistComplete
    | UpdateUserWatchlistFailed
    
    | DeleteUserWatchlist
    | DeleteUserWatchlistComplete
    | DeleteUserWatchlistFailed
    
    | LoadWatchlist
    | LoadWatchlistComplete
    | LoadWatchlistFailed;

