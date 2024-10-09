import { Action } from '@ngrx/store';

import * as fromModels from './../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum SecurityEditorActionTypes {

    LOAD_RECENT_SECURITIES = '[Security Editor] Load recent securities',
    LOAD_RECENT_SECURITIES_COMPLETE = '[Security Editor] Load recent securities complete',
    LOAD_RECENT_SECURITIES_FAILED = '[Security Editor] Load recent securities failed',

    SEARCH_SECURITIES = '[Security Editor] Search Securities',
    SEARCH_SECURITIES_COMPLETE = '[Security Editor] Search Securities complete',
    SEARCH_SECURITIES_FAILED = '[Security Editor] Search Securities failed',

    LOAD_SECURITY = '[Security Editor] Load security',
    LOAD_SECURITY_COMPLETE = '[Security Editor] Load security complete',
    LOAD_SECURITY_FAILED = '[Security Editor] Load security failed',

    LOAD_SECURITY_MARKET_DATA = '[Security Editor] Load security market data',
    LOAD_SECURITY_MARKET_DATA_COMPLETE = '[Security Editor] Load security market data complete',
    LOAD_SECURITY_MARKET_DATA_FAILED = '[Security Editor] Load security market data failed',

    LOAD_MARKET_DATA_POINTS = '[Security Editor] Load market data points',
    LOAD_MARKET_DATA_POINTS_COMPLETE = '[Security Editor] Load market data points complete',
    LOAD_MARKET_DATA_POINTS_FAILED = '[Security Editor] Load market data points failed',



    LOAD_SECURITY_TAGS = '[Security Editor] Load security tags',
    LOAD_SECURITY_TAGS_COMPLETE = '[Security Editor] Load security tags complete',
    LOAD_SECURITY_TAGS_FAILED = '[Security Editor] Load security tags failed',

    UPDATE_SECURITY_TAG = '[Security Editor] Update security tag',
    UPDATE_SECURITY_TAG_COMPLETE = '[Security Editor] Update security tag complete',
    UPDATE_SECURITY_TAG_FAILED = '[Security Editor] Update security tag failed',

    DELETE_SECURITY_TAG = '[Security Editor] Delete security tag',
    DELETE_SECURITY_TAG_COMPLETE = '[Security Editor] Delete security tag complete',
    DELETE_SECURITY_TAG_FAILED = '[Security Editor] Delete security tag failed',
}






export class LoadRecentSecurities implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_RECENT_SECURITIES;
}

export class LoadRecentSecuritiesComplete implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_RECENT_SECURITIES_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadRecentSecuritiesFailed implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_RECENT_SECURITIES_FAILED;

    constructor(public payload: string) { }
}







export class SearchSecurities implements Action {
    readonly type = SecurityEditorActionTypes.SEARCH_SECURITIES;

    constructor(public payload: fromModels.ISecMasterSearch) { }
}

export class SearchSecuritiesComplete implements Action {
    readonly type = SecurityEditorActionTypes.SEARCH_SECURITIES_COMPLETE;

    constructor(public payload: any[]) { }
}

export class SearchSecuritiesFailed implements Action {
    readonly type = SecurityEditorActionTypes.SEARCH_SECURITIES_FAILED;

    constructor(public payload: string) { }
}






export class LoadSecurity implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_SECURITY;

    constructor(public payload: number) { }
}

export class LoadSecurityComplete implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_SECURITY_COMPLETE;

    constructor(public payload: fromModels.ISecurity) { }
}

export class LoadSecurityFailed implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_SECURITY_FAILED;

    constructor(public payload: string) { }
}





export class LoadSecurityMarketData implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_SECURITY_MARKET_DATA;

    constructor(public payload: number) { }
}

export class LoadSecurityMarketDataComplete implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_SECURITY_MARKET_DATA_COMPLETE;

    constructor(public payload: fromModels.IMarketData[]) { }
}

export class LoadSecurityMarketDataFailed implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_SECURITY_MARKET_DATA_FAILED;

    constructor(public payload: string) { }
}






export class LoadMarketDataPoints implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_MARKET_DATA_POINTS;

    constructor(public payload: number) { }
}

export class LoadMarketDataPointsComplete implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_MARKET_DATA_POINTS_COMPLETE;

    constructor(public payload: fromModels.IMarketDataPoint[]) { }
}

export class LoadMarketDataPointsFailed implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_MARKET_DATA_POINTS_FAILED;

    constructor(public payload: string) { }
}










export class LoadSecurityTags implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_SECURITY_TAGS;
}

export class LoadSecurityTagsComplete implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_SECURITY_TAGS_COMPLETE;

    constructor(public payload: fromModels.ISecurityTag[]) { }
}

export class LoadSecurityTagsFailed implements Action {
    readonly type = SecurityEditorActionTypes.LOAD_SECURITY_TAGS_FAILED;

    constructor(public payload: string) { }
}







export class UpdateSecurityTag implements Action {
    readonly type = SecurityEditorActionTypes.UPDATE_SECURITY_TAG;

    constructor(public payload: fromModels.ISecurityTagUpdateReq) { }
}

export class UpdateSecurityTagComplete implements Action {
    readonly type = SecurityEditorActionTypes.UPDATE_SECURITY_TAG_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateSecurityTagFailed implements Action {
    readonly type = SecurityEditorActionTypes.UPDATE_SECURITY_TAG_FAILED;

    constructor(public payload: string) { }
}








export class DeleteSecurityTag implements Action {
    readonly type = SecurityEditorActionTypes.DELETE_SECURITY_TAG;

    constructor(public payload: fromModels.ISecurityTagDeleteReq) { }
}

export class DeleteSecurityTagComplete implements Action {
    readonly type = SecurityEditorActionTypes.DELETE_SECURITY_TAG_COMPLETE;

    // constructor(public payload: any) { }
}

export class DeleteSecurityTagFailed implements Action {
    readonly type = SecurityEditorActionTypes.DELETE_SECURITY_TAG_FAILED;

    constructor(public payload: string) { }
}





/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SecurityEditorActions
    = LoadRecentSecurities
    | LoadRecentSecuritiesComplete
    | LoadRecentSecuritiesFailed

    | SearchSecurities
    | SearchSecuritiesComplete
    | SearchSecuritiesFailed

    | LoadSecurity
    | LoadSecurityComplete
    | LoadSecurityFailed

    | LoadSecurityMarketData
    | LoadSecurityMarketDataComplete
    | LoadSecurityMarketDataFailed

    | LoadMarketDataPoints
    | LoadMarketDataPointsComplete
    | LoadMarketDataPointsFailed

    | LoadSecurityTags
    | LoadSecurityTagsComplete
    | LoadSecurityTagsFailed

    | UpdateSecurityTag
    | UpdateSecurityTagComplete
    | UpdateSecurityTagFailed

    | DeleteSecurityTag
    | DeleteSecurityTagComplete
    | DeleteSecurityTagFailed
;