import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum RepoActionTypes {
    LOAD_REPO = '[PricingEngine] Load repo',
    LOAD_REPO_COMPLETE = '[PricingEngine] Load repo complete',
    LOAD_REPO_FAILED = '[PricingEngine] Load repo Failed',
}





/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadRepo implements Action {
    readonly type = RepoActionTypes.LOAD_REPO;
}

export class LoadRepoComplete implements Action {
    readonly type = RepoActionTypes.LOAD_REPO_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadRepoFailed implements Action {
    readonly type = RepoActionTypes.LOAD_REPO_FAILED;

    constructor(public payload: string) { }
}









/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type RepoActions
    = LoadRepo
    | LoadRepoComplete
    | LoadRepoFailed;