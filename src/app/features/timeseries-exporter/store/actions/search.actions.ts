import { Action } from '@ngrx/store';

import * as fromModels from '../../models/search.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SecuritySearchActionTypes {
    SECURITY_SEARCH = '[SecuritySearch] Search Securities',
    SECURITY_SEARCH_COMPLETE = '[SecuritySearch] Search Securities Complete',
    SECURITY_SEARCH_FAILED = '[SecuritySearch] Search Securities Failed',

    SELECT_SECURITY = '[SecuritySearch] Select Security',

    LOAD_MARKET_DATA_TYPES = '[SecuritySearch] Load Market Data Types',
    LOAD_MARKET_DATA_TYPES_COMPLETE = '[SecuritySearch] Load Market Data Types Complete',
    LOAD_MARKET_DATA_TYPES_FAILED = '[SecuritySearch] Load Market Data Types Failed',

    SET_ACTIVE_SECURITY_NAME = '[SecuritySearch] set active security name',
    RESET_SEARCH = '[SecuritySearch] Reset search'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class SearchSecurity implements Action {
    readonly type = SecuritySearchActionTypes.SECURITY_SEARCH;

    constructor(public payload: fromModels.ISecuritySearch) { }
}

export class SearchSecurityComplete implements Action {
    readonly type = SecuritySearchActionTypes.SECURITY_SEARCH_COMPLETE;

    constructor(public payload: any[]) { }
}

export class SearchSecurityFailed implements Action {
    readonly type = SecuritySearchActionTypes.SECURITY_SEARCH_FAILED;

    constructor(public payload: string) { }
}

export class SelectSecurity implements Action {
    readonly type = SecuritySearchActionTypes.SELECT_SECURITY;

    constructor(public payload: string) { }
}

export class LoadMarketDataTypes implements Action {
    readonly type = SecuritySearchActionTypes.LOAD_MARKET_DATA_TYPES;

    constructor(public payload: {sid: number, securityName: string}) { }
}

export class LoadMarketDataTypesComplete implements Action {
    readonly type = SecuritySearchActionTypes.LOAD_MARKET_DATA_TYPES_COMPLETE;

    constructor(public payload: {securityName: string, data: any[]}) { }
}

export class LoadMarketDataTypesFailed implements Action {
    readonly type = SecuritySearchActionTypes.LOAD_MARKET_DATA_TYPES_FAILED;

    constructor(public payload: {securityName: string, data: string}) { }
}




export class SetActiveSecurityName implements Action {
    readonly type = SecuritySearchActionTypes.SET_ACTIVE_SECURITY_NAME;

    constructor(public payload: string) {}
}

export class ResetSearch implements Action {
    readonly type = SecuritySearchActionTypes.RESET_SEARCH;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SecuritySearchActions
    = SearchSecurity
    | SearchSecurityComplete
    | SearchSecurityFailed

    | SelectSecurity

    | LoadMarketDataTypes
    | LoadMarketDataTypesComplete
    | LoadMarketDataTypesFailed

    | ResetSearch
    | SetActiveSecurityName;
