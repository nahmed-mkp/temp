import { Action } from '@ngrx/store';

import * as fromModels from '../../models/futures-root.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FuturesRootActionTypes {

    LOAD_FUTURES_ROOTS = '[FuturesRoot] Load Futures Roots',
    LOAD_FUTURES_ROOTS_COMPLETE = '[FuturesRoot] Load Futures Roots complete',
    LOAD_FUTURES_ROOTS_FAILED = '[FuturesRoot] Load Futures Roots Field Map Failed',

    LOAD_FUTURES_ROOT = '[FuturesRoot] Load Futures Root',
    LOAD_FUTURES_ROOT_COMPLETE = '[FuturesRoot] Load Futures Root complete',
    LOAD_FUTURES_ROOT_FAILED = '[FuturesRoot] Load Futures Root Field Map Failed',

    ADD_FUTURES_ROOT = '[FuturesRoot] Add Futures Root',
    ADD_FUTURES_ROOT_COMPLETE = '[FuturesRoot] Add Futures Root complete',
    ADD_FUTURES_ROOT_FAILED = '[FuturesRoot] Add Futures Root Field Map Failed',

    UPDATE_FUTURES_ROOT = '[FuturesRoot] Update Futures Root',
    UPDATE_FUTURES_ROOT_COMPLETE = '[FuturesRoot] Update Futures Root complete',
    UPDATE_FUTURES_ROOT_FAILED = '[FuturesRoot] Update Futures Root Field Map Failed',

    DELETE_FUTURES_ROOT = '[FuturesRoot] Delete Futures Root',
    DELETE_FUTURES_ROOT_COMPLETE = '[FuturesRoot] Delete Futures Root complete',
    DELETE_FUTURES_ROOT_FAILED = '[FuturesRoot] Delete Futures Root Field Map Failed'

}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadFuturesRoots implements Action {
    readonly type = FuturesRootActionTypes.LOAD_FUTURES_ROOTS;
}

export class LoadFuturesRootsComplete implements Action {
    readonly type = FuturesRootActionTypes.LOAD_FUTURES_ROOTS_COMPLETE;

    constructor(public payload: fromModels.IFutureRoot[]) { }
}

export class LoadFuturesRootsFailed implements Action {
    readonly type = FuturesRootActionTypes.LOAD_FUTURES_ROOTS_FAILED;

    constructor(public payload: string) { }
}

export class LoadFuturesRoot implements Action {
    readonly type = FuturesRootActionTypes.LOAD_FUTURES_ROOT;

    constructor(public payload: number) { }
}

export class LoadFuturesRootComplete implements Action {
    readonly type = FuturesRootActionTypes.LOAD_FUTURES_ROOT_COMPLETE;

    constructor(public payload: fromModels.IFutureRoot) { }
}

export class LoadFuturesRootFailed implements Action {
    readonly type = FuturesRootActionTypes.LOAD_FUTURES_ROOT_FAILED;

    constructor(public payload: string) { }
}

export class AddFuturesRoot implements Action {
    readonly type = FuturesRootActionTypes.ADD_FUTURES_ROOT;

    constructor(public payload: fromModels.IFutureRoot) { }
}

export class AddFuturesRootComplete implements Action {
    readonly type = FuturesRootActionTypes.ADD_FUTURES_ROOT_COMPLETE;

    constructor(public payload: fromModels.IFutureRoot) { }
}

export class AddFuturesRootFailed implements Action {
    readonly type = FuturesRootActionTypes.ADD_FUTURES_ROOT_FAILED;

    constructor(public payload: string) { }
}

export class UpdateFuturesRoot implements Action {
    readonly type = FuturesRootActionTypes.UPDATE_FUTURES_ROOT;

    constructor(public payload: fromModels.IFutureRoot) { }
}

export class UpdateFuturesRootComplete implements Action {
    readonly type = FuturesRootActionTypes.UPDATE_FUTURES_ROOT_COMPLETE;

    constructor(public payload: fromModels.IFutureRoot) { }
}

export class UpdateFuturesRootFailed implements Action {
    readonly type = FuturesRootActionTypes.UPDATE_FUTURES_ROOT_FAILED;

    constructor(public payload: string) { }
}

export class DeleteFuturesRoot implements Action {
    readonly type = FuturesRootActionTypes.DELETE_FUTURES_ROOT;

    constructor(public payload: fromModels.IFutureRoot) { }
}

export class DeleteFuturesRootComplete implements Action {
    readonly type = FuturesRootActionTypes.DELETE_FUTURES_ROOT_COMPLETE;

    constructor(public payload: fromModels.IFutureRoot) { }
}

export class DeleteFuturesRootFailed implements Action {
    readonly type = FuturesRootActionTypes.DELETE_FUTURES_ROOT_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FuturesRootActions
    = LoadFuturesRoots
    | LoadFuturesRootsComplete
    | LoadFuturesRootsFailed

    | LoadFuturesRoot
    | LoadFuturesRootComplete
    | LoadFuturesRootFailed

    | AddFuturesRoot
    | AddFuturesRootComplete
    | AddFuturesRootFailed

    | UpdateFuturesRoot
    | UpdateFuturesRootComplete
    | UpdateFuturesRootFailed

    | DeleteFuturesRoot
    | DeleteFuturesRootComplete
    | DeleteFuturesRootFailed;
