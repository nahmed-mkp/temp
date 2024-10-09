import { Action } from '@ngrx/store';

import * as fromModels from '../../models/sec-master-global.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SecMasterGlobalActionTypes {

    SET_ACTIVE_SEC_TYPE = '[SecMasterGlobal] set active sec type',
    SET_ACTIVE_REQUEST_ID = '[SecMasterGlobal] set active request id',
    SET_ACTIVE_SECURITY_DETAIL_ID = '[SecMasterGlobal] set active security detail id',
    TOGGLE_USER_ACTIVITY_VIEWER = '[SecMasterGlobal] toggle user activity viewer',

    // ---------------------------------------------------------------------------

    LOAD_ASSET_CLASS_FIELD_MAP = '[SecMasterGlobal] Load Asset Class Field Map',
    LOAD_ASSET_CLASS_FIELD_MAP_COMPLETE = '[SecMasterGlobal] Load Asset Class Field Map complete',
    LOAD_ASSET_CLASS_FIELD_MAP_FAILED = '[SecMasterGlobal] Load Asset Class Field Map Failed',

    LOAD_SEC_MASTER_LOOKUPS = '[SecMasterGlobal] Load SecMaster lookups',
    LOAD_SEC_MASTER_LOOKUPS_COMPLETE = '[SecMasterGlobal] Load SecMaster lookups complete',
    LOAD_SEC_MASTER_LOOKUPS_FAILED = '[SecMasterGlobal] Load SecMaster lookups failed',

    LOAD_USER_ACTIVITY = '[SecMasterGlobal] Load user activity',
    LOAD_USER_ACTIVITY_COMPLETE = '[SecMasterGlobal] Load user activity complete',
    LOAD_USER_ACTIVITY_FAILED = '[SecMasterGlobal] Load user activity failed',

    LOAD_USER_ACTIVITY_PROGRESS = '[SecMasterGlobal] Load user activity progress',
    LOAD_USER_ACTIVITY_PROGRESS_COMPLETE = '[SecMasterGlobal] Load user activity progress complete',
    LOAD_USER_ACTIVITY_PROGRESS_FAILED = '[SecMasterGlobal] Load user activity progress failed',

    LOAD_MARKET_DATA_DEFAULTS = '[SecMasterGlobal] Load market data default',
    LOAD_MARKET_DATA_DEFAULTS_COMPLETE = '[SecMasterGlobal] Load market data default complete',
    LOAD_MARKET_DATA_DEFAULTS_FAILED = '[SecMasterGlobal] Load market data default failed',


    LOAD_SECURITY_VIEWER_DYNAMIC_TAB_DICT = '[SecMasterGlobal] Load security viewer dynamic tabs',
    LOAD_SECURITY_VIEWER_DYNAMIC_TAB_DICT_COMPLETE = '[SecMasterGlobal] Load security viewer dynamic tabs complete',
    LOAD_SECURITY_VIEWER_DYNAMIC_TAB_DICT_FAILED = '[SecMasterGlobal] Load security viewer dynamic tabs failed',

    LOAD_SECURITY_DETAIL = '[SecMasterGlobal] Load security detail',
    LOAD_SECURITY_DETAIL_COMPLETE = '[SecMasterGlobal] Load security detail complete',
    LOAD_SECURITY_DETAIL_FAILED = '[SecMasterGlobal] Load security detail failed',


    CREATE_NEW_SECURITY = '[SecMasterGlobal] Create new security',
    CREATE_NEW_SECURITY_COMPLETE = '[SecMasterGlobal] Create new security complete',
    CREATE_NEW_SECURITY_FAILED = '[SecMasterGlobal] Create new security failed',

    LOAD_SECURITY_SEARCH_RESULT = '[SecMasterGlobal] Load security search result',
    LOAD_SECURITY_SEARCH_RESULT_COMPLETE = '[SecMasterGlobal] Load security search result complete',
    LOAD_SECURITY_SEARCH_RESULT_FAILED = '[SecMasterGlobal] Load security search result failed',

    LOAD_SECURITY_DETAIL_FROM_SEARCH = '[SecMasterGlobal] Load security detail from search',
    LOAD_SECURITY_DETAIL_FROM_SEARCH_COMPLETE = '[SecMasterGlobal] Load security detail from search complete',
    LOAD_SECURITY_DETAIL_FROM_SEARCH_FAILED = '[SecMasterGlobal] Load security detail from search failed',

    UPDATE_SECURITY_DETAIL = '[SecMasterGlobal] Update security detail',
    UPDATE_SECURITY_DETAIL_COMPLETE = '[SecMasterGlobal] Update security detail complete',
    UPDATE_SECURITY_DETAIL_FAILED = '[SecMasterGlobal] Update security detail failed',

    RETRY_CREATE_NEW_SECURITY = '[SecMasterGlobal] Retry create new security',
    RETRY_CREATE_NEW_SECURITY_COMPLETE = '[SecMasterGlobal] Retry create new security complete',
    RETRY_CREATE_NEW_SECURITY_FAILED = '[SecMasterGlobal] Retry create new security failed',

    // ---------------------------------------------------------------------------------------------------------------

    LOAD_SECURITY_FOR_DELETE = '[SecMasterGlobal] Load security for delete',
    LOAD_SECURITY_FOR_DELETE_COMPLETE = '[SecMasterGlobal] Load security for delete complete',
    LOAD_SECURITY_FOR_DELETE_FAILED = '[SecMasterGlobal] Load security for delete failed',

    DELETE_SECURITY = '[SecMasterGlobal] Delete security',
    DELETE_SECURITY_COMPLETE = '[SecMasterGlobal] Delete security complete',
    DELETE_SECURITY_FAILED = '[SecMasterGlobal] Delete security failed',


    // ----------------------------------------------------------------------------------------------------------------


    LOAD_SECURITY_DO_NOT_UPDATE_FLAG_LIST = '[SecMasterGlobal] Load security do-not-update flag list',
    LOAD_SECURITY_DO_NOT_UPDATE_FLAG_LIST_COMPLETE = '[SecMasterGlobal] Load security do-not-update flag list complete',
    LOAD_SECURITY_DO_NOT_UPDATE_FLAG_LIST_FAILED = '[SecMasterGlobal] Load security do-not-update flag list failed',

    SET_SECURITY_DO_NOT_UPDATE_FLAG = '[SecMasterGlobal] Set security do-not-update flag',
    SET_SECURITY_DO_NOT_UPDATE_FLAG_COMPLETE = '[SecMasterGlobal] Set security do-not-update flag complete',
    SET_SECURITY_DO_NOT_UPDATE_FLAG_FAILED = '[SecMasterGlobal] Set security do-not-update flag failed',

    MANUAL_SET_SECURITY_DO_NOT_UPDATE_FLAG = '[SecMasterGlobal] Manual set security do-not-update flag',
    MANUAL_SET_SECURITY_DO_NOT_UPDATE_FLAG_COMPLETE = '[SecMasterGlobal] Manual set security do-not-update flag complete',
    MANUAL_SET_SECURITY_DO_NOT_UPDATE_FLAG_FAILED = '[SecMasterGlobal] Manual set security do-not-update flag failed',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class SetActiveSecType implements Action {
    readonly type = SecMasterGlobalActionTypes.SET_ACTIVE_SEC_TYPE;

    constructor(public payload: {display: 'create' | 'edit'; data: string}) { }
}

export class SetActiveRequestId implements Action {
    readonly type = SecMasterGlobalActionTypes.SET_ACTIVE_REQUEST_ID;

    constructor(public payload: string) { }
}

export class SetActiveSecurityDetailId implements Action {
    readonly type = SecMasterGlobalActionTypes.SET_ACTIVE_SECURITY_DETAIL_ID;

    constructor(public payload: {display: 'create' | 'edit'; data: string}) { }
}

export class ToggleUserActivityViewer implements Action {
    readonly type = SecMasterGlobalActionTypes.TOGGLE_USER_ACTIVITY_VIEWER;
}








export class LoadAssetClassFieldMap implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_ASSET_CLASS_FIELD_MAP;
}

export class LoadAssetClassFieldMapComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_ASSET_CLASS_FIELD_MAP_COMPLETE;

    constructor(public payload: fromModels.IAssetClassFieldMap[]) { }
}

export class LoadAssetClassFieldMapFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_ASSET_CLASS_FIELD_MAP_FAILED;

    constructor(public payload: string) { }
}





export class LoadSecMasterLookups implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SEC_MASTER_LOOKUPS;
}

export class LoadSecMasterLookupsComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SEC_MASTER_LOOKUPS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSecMasterLookupsFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SEC_MASTER_LOOKUPS_FAILED;

    constructor(public payload: string) { }
}






export class LoadMarketDataDefaults implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_MARKET_DATA_DEFAULTS;
}

export class LoadMarketDataDefaultsComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_MARKET_DATA_DEFAULTS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadMarketDataDefaultsFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_MARKET_DATA_DEFAULTS_FAILED;

    constructor(public payload: string) { }
}







export class LoadSecurityViewerDynamicTabDict implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_VIEWER_DYNAMIC_TAB_DICT;
}

export class LoadSecurityViewerDynamicTabDictComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_VIEWER_DYNAMIC_TAB_DICT_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSecurityViewerDynamicTabDictFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_VIEWER_DYNAMIC_TAB_DICT_FAILED;

    constructor(public payload: string) { }
}







export class LoadUserActivity implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_USER_ACTIVITY;
}

export class LoadUserActivityComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_USER_ACTIVITY_COMPLETE;

    constructor(public payload: fromModels.IUserActivity[]) { }
}

export class LoadUserActivityFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_USER_ACTIVITY_FAILED;

    constructor(public payload: string) { }
}







export class LoadUserActivityProgress implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_USER_ACTIVITY_PROGRESS;

    constructor(public payload: any) { }
}

export class LoadUserActivityProgressComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_USER_ACTIVITY_PROGRESS_COMPLETE;

    constructor(public payload: fromModels.IUserActivity) { }
}

export class LoadUserActivityProgressFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_USER_ACTIVITY_PROGRESS_FAILED;

    constructor(public payload: string) { }
}






export class LoadSecurityDetail implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL;

    constructor(public payload: any) { }
}

export class LoadSecurityDetailComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSecurityDetailFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL_FAILED;

    constructor(public payload: any) { }
}













export class CreateNewSecurity implements Action {
    readonly type = SecMasterGlobalActionTypes.CREATE_NEW_SECURITY;

    constructor(public payload: fromModels.INewSecurity) {}
}

export class CreateNewSecurityComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.CREATE_NEW_SECURITY_COMPLETE;

    constructor(public payload: fromModels.IUserActivity) { }
}

export class CreateNewSecurityFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.CREATE_NEW_SECURITY_FAILED;

    constructor(public payload: string) { }
}




export class RetryCreateNewSecurity implements Action {
    readonly type = SecMasterGlobalActionTypes.RETRY_CREATE_NEW_SECURITY;

    constructor(public payload: string) { }
}

export class RetryCreateNewSecurityComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.RETRY_CREATE_NEW_SECURITY_COMPLETE;

    constructor(public payload: fromModels.IUserActivity) { }
}

export class RetryCreateNewSecurityFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.RETRY_CREATE_NEW_SECURITY_FAILED;

    constructor(public payload: string) { }
}








export class LoadSecuritySearchResult implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_SEARCH_RESULT;

    constructor(public payload: fromModels.ISecuritySearchReq) {}
}

export class LoadSecuritySearchResultComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_SEARCH_RESULT_COMPLETE;

    constructor(public payload: fromModels.ISecuritySearchResult[]) {}
}

export class LoadSecuritySearchResultFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_SEARCH_RESULT_FAILED;

    constructor(public payload: string) {}
}






export class LoadSecurityDetailFromSearch implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL_FROM_SEARCH;

    constructor(public payload: fromModels.ISecurityDetailReq) { }
}

export class LoadSecurityDetailFromSearchComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL_FROM_SEARCH_COMPLETE;

    constructor(public payload: {id: string; data: any}) { }
}

export class LoadSecurityDetailFromSearchFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL_FROM_SEARCH_FAILED;

    constructor(public payload: {id: string; error: string}) { }
}







export class UpdateSecurityDetail implements Action {
    readonly type = SecMasterGlobalActionTypes.UPDATE_SECURITY_DETAIL;

    constructor(public payload: any) { }
}

export class UpdateSecurityDetailComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.UPDATE_SECURITY_DETAIL_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateSecurityDetailFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.UPDATE_SECURITY_DETAIL_FAILED;

    constructor(public payload: string) { }
}






export class LoadSecurityForDelete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_FOR_DELETE;

    constructor(public payload: number) { }
}

export class LoadSecurityForDeleteComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_FOR_DELETE_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSecurityForDeleteFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_FOR_DELETE_FAILED;

    constructor(public payload: string) { }
}






export class DeleteSecurity implements Action {
    readonly type = SecMasterGlobalActionTypes.DELETE_SECURITY;

    constructor(public payload: number) { }
}

export class DeleteSecurityComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.DELETE_SECURITY_COMPLETE;

    constructor(public payload: any) { }
}

export class DeleteSecurityFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.DELETE_SECURITY_FAILED;

    constructor(public payload: string) { }
}










export class LoadSecurityDoNotUpdateFlagList implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_DO_NOT_UPDATE_FLAG_LIST;
}

export class LoadSecurityDoNotUpdateFlagListComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_DO_NOT_UPDATE_FLAG_LIST_COMPLETE;

    constructor(public payload: fromModels.ISecurityForDoNotUpdateFlag[]) { }
}

export class LoadSecurityDoNotUpdateFlagListFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.LOAD_SECURITY_DO_NOT_UPDATE_FLAG_LIST_FAILED;

    constructor(public payload: string) { }
}







export class SetSecurityDoNotUpdateFlag implements Action {
    readonly type = SecMasterGlobalActionTypes.SET_SECURITY_DO_NOT_UPDATE_FLAG;

    constructor(public payload: fromModels.ISetDoNotUpdateFlag) { }
}

export class SetSecurityDoNotUpdateFlagComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.SET_SECURITY_DO_NOT_UPDATE_FLAG_COMPLETE;

    constructor(public payload: any) { }
}

export class SetSecurityDoNotUpdateFlagFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.SET_SECURITY_DO_NOT_UPDATE_FLAG_FAILED;

    constructor(public payload: string) { }
}






export class ManualSetSecurityDoNotUpdateFlag implements Action {
    readonly type = SecMasterGlobalActionTypes.MANUAL_SET_SECURITY_DO_NOT_UPDATE_FLAG;

    constructor(public payload: any) { }
}

export class ManualSetSecurityDoNotUpdateFlagComplete implements Action {
    readonly type = SecMasterGlobalActionTypes.MANUAL_SET_SECURITY_DO_NOT_UPDATE_FLAG_COMPLETE;

    constructor(public payload: any) { }
}

export class ManualSetSecurityDoNotUpdateFlagFailed implements Action {
    readonly type = SecMasterGlobalActionTypes.MANUAL_SET_SECURITY_DO_NOT_UPDATE_FLAG_FAILED;

    constructor(public payload: string) { }
}





/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SecMasterGlobalActions
    = SetActiveSecType
    | SetActiveRequestId
    | SetActiveSecurityDetailId
    | ToggleUserActivityViewer

    | LoadAssetClassFieldMap
    | LoadAssetClassFieldMapComplete
    | LoadAssetClassFieldMapFailed

    | LoadSecMasterLookups
    | LoadSecMasterLookupsComplete
    | LoadSecMasterLookupsFailed

    | LoadMarketDataDefaults
    | LoadMarketDataDefaultsComplete
    | LoadMarketDataDefaultsFailed

    | LoadUserActivity
    | LoadUserActivityComplete
    | LoadUserActivityFailed

    | LoadUserActivityProgress
    | LoadUserActivityProgressComplete
    | LoadUserActivityProgressFailed

    | LoadSecurityViewerDynamicTabDict
    | LoadSecurityViewerDynamicTabDictComplete
    | LoadSecurityViewerDynamicTabDictFailed

    | LoadSecurityDetail
    | LoadSecurityDetailComplete
    | LoadSecurityDetailFailed

    | CreateNewSecurity
    | CreateNewSecurityComplete
    | CreateNewSecurityFailed

    | RetryCreateNewSecurity
    | RetryCreateNewSecurityComplete
    | RetryCreateNewSecurityFailed

    | LoadSecuritySearchResult
    | LoadSecuritySearchResultComplete
    | LoadSecuritySearchResultFailed

    | LoadSecurityDetailFromSearch
    | LoadSecurityDetailFromSearchComplete
    | LoadSecurityDetailFromSearchFailed

    | UpdateSecurityDetail
    | UpdateSecurityDetailComplete
    | UpdateSecurityDetailFailed

    | LoadSecurityForDelete
    | LoadSecurityForDeleteComplete
    | LoadSecurityForDeleteFailed

    | DeleteSecurity
    | DeleteSecurityComplete
    | DeleteSecurityFailed

    | LoadSecurityDoNotUpdateFlagList
    | LoadSecurityDoNotUpdateFlagListComplete
    | LoadSecurityDoNotUpdateFlagListFailed

    | SetSecurityDoNotUpdateFlag
    | SetSecurityDoNotUpdateFlagComplete
    | SetSecurityDoNotUpdateFlagFailed

    | ManualSetSecurityDoNotUpdateFlag
    | ManualSetSecurityDoNotUpdateFlagComplete
    | ManualSetSecurityDoNotUpdateFlagFailed
;



