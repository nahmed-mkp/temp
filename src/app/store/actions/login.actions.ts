import { Action } from '@ngrx/store';

import * as fromModels from './../../models/login.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum LoginActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_COMPLETE = '[Auth] Login complete',
    LOGIN_FAILED = '[Auth] Login failed',

    LOGOUT = '[Auth] Logout',
    LOGOUT_COMPLETE = '[Auth] Logout complete',
    LOGOUT_FAILED = '[Auth] Logout failed',

    LOAD_USER_FROM_LOCAL_STORAGE = '[Auth] Load User from Local Storage',
    LOAD_USER_FROM_LOCAL_STORAGE_COMPLETE = '[Auth] Load User from Local Storage complete',
    LOAD_USER_FROM_LOCAL_STORAGE_FAILED = '[Auth] Load User from Local Storage failed',

    UPDATE_USER_LOCKED_STATUS = '[Auth] Update user locked status',

    LOAD_USER_UNCONFIRMED_TRANSACTIONS = '[Auth] Load users unconfirmed transactions',
    LOAD_USER_UNCONFIRMED_TRANSACTIONS_COMPLETE = '[Auth] Load users unconfirmed transactions complete',
    LOAD_USER_UNCONFIRMED_TRANSACTIONS_FAILED = '[Auth] Load users unconfirmed transactions failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class Login implements Action {
    readonly type = LoginActionTypes.LOGIN;

    constructor(public payload: fromModels.IUserCredential) { }
}

export class LoginComplete implements Action {
    readonly type = LoginActionTypes.LOGIN_COMPLETE;

    constructor(public payload: fromModels.IAuthenticatedUser) { }
}

export class LoginFailed implements Action {
    readonly type = LoginActionTypes.LOGIN_FAILED;

    constructor(public payload: any) { }
}

export class Logout implements Action {
    readonly type = LoginActionTypes.LOGOUT;
}

export class LogoutComplete implements Action {
    readonly type = LoginActionTypes.LOGOUT_COMPLETE;
}

export class LogoutFailed implements Action {
    readonly type = LoginActionTypes.LOGIN_FAILED;

    constructor(public payload: any) { }
}

export class LoadUserFromLocalStorage implements Action {
    readonly type = LoginActionTypes.LOAD_USER_FROM_LOCAL_STORAGE;
}

export class LoadUserFromLocalStorageComplete implements Action {
    readonly type = LoginActionTypes.LOAD_USER_FROM_LOCAL_STORAGE_COMPLETE;

    constructor(public payload: fromModels.IAuthenticatedUser) { }
}

export class LoadUserFromLocalStorageFailed implements Action {
    readonly type = LoginActionTypes.LOAD_USER_FROM_LOCAL_STORAGE_FAILED;

    constructor(public payload: any) { }
}

export class UpdateUserLockedStatus implements Action {
    readonly type = LoginActionTypes.UPDATE_USER_LOCKED_STATUS;

    constructor(public payload: boolean) {}
}

export class LoadUsersUnconfirmedTransactions implements Action {
    readonly type = LoginActionTypes.LOAD_USER_UNCONFIRMED_TRANSACTIONS;
}

export class LoadUsersUnconfirmedTransactionsComplete implements Action {
    readonly type = LoginActionTypes.LOAD_USER_UNCONFIRMED_TRANSACTIONS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadUsersUnconfirmedTransactionsFailed implements Action {
    readonly type = LoginActionTypes.LOAD_USER_UNCONFIRMED_TRANSACTIONS_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type LoginActions
    = Login
    | LoginComplete
    | LoginFailed

    | Logout
    | LogoutComplete
    | LogoutFailed

    | LoadUserFromLocalStorage
    | LoadUserFromLocalStorageComplete
    | LoadUserFromLocalStorageFailed

    | UpdateUserLockedStatus

    | LoadUsersUnconfirmedTransactions
    | LoadUsersUnconfirmedTransactionsComplete
    | LoadUsersUnconfirmedTransactionsFailed;

