import { Action } from '@ngrx/store';

import * as fromModels from './../../models/sec-master.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SecMasterActionTypes {

    SEARCH_SECURITIES = '[SecMaster] Search Securities',
    SEARCH_SECURITIES_COMPLETE = '[SecMaster] Search Securities complete',
    SEARCH_SECURITIES_FAILED = '[SecMaster] Search Securities failed',

    LOAD_RECENT_SECURITIES = '[SecMaster] Load recent securities',
    LOAD_RECENT_SECURITIES_COMPLETE = '[SecMaster] Load recent securities complete',
    LOAD_RECENT_SECURITIES_FAILED = '[SecMaster] Load recent securities failed',

    LOAD_SECURITY = '[SecMaster] Load security',
    LOAD_SECURITY_COMPLETE = '[SecMaster] Load security complete',
    LOAD_SECURITY_FAILED = '[SecMaster] Load security failed',

    SAVE_SECURITY = '[SecMaster] Save security',
    SAVE_SECURITY_COMPLETE = '[SecMaster] Save security complete',
    SAVE_SECURITY_FAILED = '[SecMaster] Save security failed',

    SAVE_SECURITY_TAG = '[SecMaster] Save security tag',
    SAVE_SECURITY_TAG_COMPLETE = '[SecMaster] Save security tag complete',
    SAVE_SECURITY_TAG_FAILED = '[SecMaster] Save security tag failed',

    LOAD_SECURITY_MARKET_DATA = '[SecMaster] Load security market data',
    LOAD_SECURITY_MARKET_DATA_COMPLETE = '[SecMaster] Load security market data complete',
    LOAD_SECURITY_MARKET_DATA_FAILED = '[SecMaster] Load security market data failed',

    LOAD_MARKET_DATA_POINTS = '[SecMaster] Load market data points',
    LOAD_MARKET_DATA_POINTS_COMPLETE = '[SecMaster] Load market data points complete',
    LOAD_MARKET_DATA_POINTS_FAILED = '[SecMaster] Load market data points failed',

    LOAD_SECURITY_TAGS = '[SecMaster] Load security tags',
    LOAD_SECURITY_TAGS_COMPLETE = '[SecMaster] Load security tags complete',
    LOAD_SECURITY_TAGS_FAILED = '[SecMaster] Load security tags failed',

    UPDATE_SECURITY_TAG = '[SecMaster] Update security tag',
    UPDATE_SECURITY_TAG_COMPLETE = '[SecMaster] Update security tag complete',
    UPDATE_SECURITY_TAG_FAILED = '[SecMaster] Update security tag failed',



    // -----------------------------------------------------------------------

}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class SearchSecurities implements Action {
    readonly type = SecMasterActionTypes.SEARCH_SECURITIES;

    constructor(public payload: fromModels.ISecMasterSearch) { }
}

export class SearchSecuritiesComplete implements Action {
    readonly type = SecMasterActionTypes.SEARCH_SECURITIES_COMPLETE;

    constructor(public payload: any[]) { }
}

export class SearchSecuritiesFailed implements Action {
    readonly type = SecMasterActionTypes.SEARCH_SECURITIES_FAILED;

    constructor(public payload: string) { }
}

export class LoadRecentSecurities implements Action {
    readonly type = SecMasterActionTypes.LOAD_RECENT_SECURITIES;
}

export class LoadRecentSecuritiesComplete implements Action {
    readonly type = SecMasterActionTypes.LOAD_RECENT_SECURITIES_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadRecentSecuritiesFailed implements Action {
    readonly type = SecMasterActionTypes.LOAD_RECENT_SECURITIES_FAILED;

    constructor(public payload: string) { }
}






export class LoadSecurityTags implements Action {
    readonly type = SecMasterActionTypes.LOAD_SECURITY_TAGS;
}

export class LoadSecurityTagsComplete implements Action {
    readonly type = SecMasterActionTypes.LOAD_SECURITY_TAGS_COMPLETE;

    constructor(public payload: fromModels.ISecurityTag[]) { }
}

export class LoadSecurityTagsFailed implements Action {
    readonly type = SecMasterActionTypes.LOAD_SECURITY_TAGS_FAILED;

    constructor(public payload: string) { }
}






export class UpdateSecurityTag implements Action {
    readonly type = SecMasterActionTypes.UPDATE_SECURITY_TAG;

    constructor(public payload: fromModels.ISecurityTagUpdateReq) { }
}

export class UpdateSecurityTagComplete implements Action {
    readonly type = SecMasterActionTypes.UPDATE_SECURITY_TAG_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateSecurityTagFailed implements Action {
    readonly type = SecMasterActionTypes.UPDATE_SECURITY_TAG_FAILED;

    constructor(public payload: string) { }
}







export class LoadSecurity implements Action {
    readonly type = SecMasterActionTypes.LOAD_SECURITY;

    constructor(public payload: number) { }
}

export class LoadSecurityComplete implements Action {
    readonly type = SecMasterActionTypes.LOAD_SECURITY_COMPLETE;

    constructor(public payload: fromModels.ISecurity) { }
}

export class LoadSecurityFailed implements Action {
    readonly type = SecMasterActionTypes.LOAD_SECURITY_FAILED;

    constructor(public payload: string) { }
}

export class LoadSecurityMarketData implements Action {
    readonly type = SecMasterActionTypes.LOAD_SECURITY_MARKET_DATA;

    constructor(public payload: number) { }
}

export class LoadSecurityMarketDataComplete implements Action {
    readonly type = SecMasterActionTypes.LOAD_SECURITY_MARKET_DATA_COMPLETE;

    constructor(public payload: fromModels.IMarketData[]) { }
}

export class LoadSecurityMarketDataFailed implements Action {
    readonly type = SecMasterActionTypes.LOAD_SECURITY_MARKET_DATA_FAILED;

    constructor(public payload: string) { }
}


export class LoadMarketDataPoints implements Action {
    readonly type = SecMasterActionTypes.LOAD_MARKET_DATA_POINTS;

    constructor(public payload: number) { }
}

export class LoadMarketDataPointsComplete implements Action {
    readonly type = SecMasterActionTypes.LOAD_MARKET_DATA_POINTS_COMPLETE;

    constructor(public payload: fromModels.IMarketDataPoint[]) { }
}

export class LoadMarketDataPointsFailed implements Action {
    readonly type = SecMasterActionTypes.LOAD_MARKET_DATA_POINTS_FAILED;

    constructor(public payload: string) { }
}

export class SaveSecurity implements Action {
    readonly type = SecMasterActionTypes.SAVE_SECURITY;

    constructor(public payload: fromModels.ISecurity) { }
}

export class SaveSecurityComplete implements Action {
    readonly type = SecMasterActionTypes.SAVE_SECURITY_COMPLETE;

    constructor(public payload: fromModels.ISecurity) { }
}

export class SaveSecurityFailed implements Action {
    readonly type = SecMasterActionTypes.SAVE_SECURITY_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SecMasterActions
    = SearchSecurities
    | SearchSecuritiesComplete
    | SearchSecuritiesFailed

    | LoadRecentSecurities
    | LoadRecentSecuritiesComplete
    | LoadRecentSecuritiesFailed

    | LoadSecurityTags
    | LoadSecurityTagsComplete
    | LoadSecurityTagsFailed

    | UpdateSecurityTag
    | UpdateSecurityTagComplete
    | UpdateSecurityTagFailed

    | LoadSecurity
    | LoadSecurityComplete
    | LoadSecurityFailed

    | LoadSecurityMarketData
    | LoadSecurityMarketDataComplete
    | LoadSecurityMarketDataFailed

    | LoadMarketDataPoints
    | LoadMarketDataPointsComplete
    | LoadMarketDataPointsFailed

    | SaveSecurity
    | SaveSecurityComplete
    | SaveSecurityFailed;


