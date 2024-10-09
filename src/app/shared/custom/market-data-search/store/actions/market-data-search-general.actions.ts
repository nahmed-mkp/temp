import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SecuritySearchActionTypes {
    SECURITY_SEARCH = '[MarketDataSearch] Search Securities',
    SECURITY_SEARCH_COMPLETE = '[MarketDataSearch] Search Securities Complete',
    SECURITY_SEARCH_FAILED = '[MarketDataSearch] Search Securities Failed',

    SELECT_SECURITY = '[MarketDataSearch] Select Security',

    LOAD_MARKET_DATA_TYPES = '[MarketDataSearch] Load Market Data Types',
    LOAD_MARKET_DATA_TYPES_COMPLETE = '[MarketDataSearch] Load Market Data Types Complete',
    LOAD_MARKET_DATA_TYPES_FAILED = '[MarketDataSearch] Load Market Data Types Failed',

    RESET_SEARCH = '[MarketDataSearch] Reset search',

    // -----------------------------------------------------

    ENHANCED_SECURITY_SEARCH = '[MarketDataSearch] Enhance Search Securities',
    ENHANCED_SECURITY_SEARCH_COMPLETE = '[MarketDataSearch] Enhance Search Securities Complete',
    ENHANCED_SECURITY_SEARCH_FAILED = '[MarketDataSearch] Enhance Search Securities Failed',
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

    constructor(public payload: number) { }
}

export class LoadMarketDataTypesComplete implements Action {
    readonly type = SecuritySearchActionTypes.LOAD_MARKET_DATA_TYPES_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadMarketDataTypesFailed implements Action {
    readonly type = SecuritySearchActionTypes.LOAD_MARKET_DATA_TYPES_FAILED;

    constructor(public payload: string) { }
}






export class ResetSearch implements Action {
    readonly type = SecuritySearchActionTypes.RESET_SEARCH;
}







export class EnhanceSearchSecurity implements Action {
    readonly type = SecuritySearchActionTypes.ENHANCED_SECURITY_SEARCH;

    constructor(public payload: fromModels.SecuritySearchCriteria) { }
}

export class EnhanceSearchSecurityComplete implements Action {
    readonly type = SecuritySearchActionTypes.ENHANCED_SECURITY_SEARCH_COMPLETE;

    constructor(public payload: fromModels.SecuritySearchResult[]) { }
}

export class EnhanceSearchSecurityFailed implements Action {
    readonly type = SecuritySearchActionTypes.ENHANCED_SECURITY_SEARCH_FAILED;

    constructor(public payload: string) { }
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

    | EnhanceSearchSecurity
    | EnhanceSearchSecurityComplete
    | EnhanceSearchSecurityFailed

    | ResetSearch;
