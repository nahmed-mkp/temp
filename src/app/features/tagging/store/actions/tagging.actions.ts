import { Action } from '@ngrx/store';

import * as fromModels from './../../models/tagging.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum TaggingActionTypes {

    LOAD_TAG_LIST = '[Tagging] Load Tag list',
    LOAD_TAG_LIST_COMPLETE = '[Tagging] Load Tag list complete',
    LOAD_TAG_LIST_FAILED = '[Tagging] Load Tag list failed',

    LOAD_TAGGING_LOOKUPS = '[Tagging] Load Tagging Lookups',
    LOAD_TAGGING_LOOKUPS_COMPLETE = '[Tagging] Load Tagging Lookups complete',
    LOAD_TAGGING_LOOKUPS_FAILED = '[Tagging] Load Tagging Lookups failed',

    LOAD_SECURITY_TAGS = '[Tagging] Load security tags',
    LOAD_SECURITY_TAGS_COMPLETE = '[Tagging] Load security tags complete',
    LOAD_SECURITY_TAGS_FAILED = '[Tagging] Load security tags failed',

    UPDATE_SECURITY_TAGS = '[Tagging] Update security tags',
    UPDATE_SECURITY_TAGS_COMPLETE = '[Tagging] Update security tags complete',
    UPDATE_SECURITY_TAGS_FAILED = '[Tagging] Update security tags failed',

    LOAD_TRADE_NAME_TAGS = '[Tagging] Load tradeName tags',
    LOAD_TRADE_NAME_TAGS_COMPLETE = '[Tagging] Load tradeName tags complete',
    LOAD_TRADE_NAME_TAGS_FAILED = '[Tagging] Load tradeName tags failed',

    UPDATE_TRADE_NAME_TAGS = '[Tagging] Update tradeName tags',
    UPDATE_TRADE_NAME_TAGS_COMPLETE = '[Tagging] Update tradeName tags complete',
    UPDATE_TRADE_NAME_TAGS_FAILED = '[Tagging] Update tradeName tags failed',

    LOAD_POSITION_TAGS = '[Tagging] Load position tags',
    LOAD_POSITION_TAGS_COMPLETE = '[Tagging] Load position tags complete',
    LOAD_POSITION_TAGS_FAILED = '[Tagging] Load position tags failed',

    UPDATE_POSITION_TAGS = '[Tagging] Update Position tags',
    UPDATE_POSITION_TAGS_COMPLETE = '[Tagging] Update Position tags complete',
    UPDATE_POSITION_TAGS_FAILED = '[Tagging] Update Position tags failed',
}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadTagList implements Action {
    readonly type = TaggingActionTypes.LOAD_TAG_LIST;
}

export class LoadTagListComplete {
    readonly type = TaggingActionTypes.LOAD_TAG_LIST_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadTagListFailed {
    readonly type = TaggingActionTypes.LOAD_TAG_LIST_FAILED;

    constructor(public payload: string) { }
}


export class LoadTaggingLookups implements Action {
    readonly type = TaggingActionTypes.LOAD_TAGGING_LOOKUPS;
}

export class LoadTaggingLookupsComplete {
    readonly type = TaggingActionTypes.LOAD_TAGGING_LOOKUPS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadTaggingLookupsFailed {
    readonly type = TaggingActionTypes.LOAD_TAGGING_LOOKUPS_FAILED;

    constructor(public payload: string) { }
}

export class LoadSecurityTags implements Action {
    readonly type = TaggingActionTypes.LOAD_SECURITY_TAGS;

    constructor(public payload: fromModels.IDateRange) { }
}

export class LoadSecurityTagsComplete {
    readonly type = TaggingActionTypes.LOAD_SECURITY_TAGS_COMPLETE;

    constructor(public payload: any[]) { }
}
export class LoadSecurityTagsFailed {
    readonly type = TaggingActionTypes.LOAD_SECURITY_TAGS_FAILED;

    constructor(public payload: any) { }
}

export class UpdateSecurityTags implements Action {
    readonly type = TaggingActionTypes.UPDATE_SECURITY_TAGS;

    constructor(public payload: fromModels.ISecurityTagChanges) { }
}

export class UpdateSecurityTagsComplete {
    readonly type = TaggingActionTypes.UPDATE_SECURITY_TAGS_COMPLETE;

    constructor(public payload: any[]) { }
}
export class UpdateSecurityTagsFailed {
    readonly type = TaggingActionTypes.UPDATE_SECURITY_TAGS_FAILED;

    constructor(public payload: any) { }
}

/**
 * TradeName Tags
 */
export class LoadTradeNameTags implements Action {
    readonly type = TaggingActionTypes.LOAD_TRADE_NAME_TAGS;

    constructor(public payload: fromModels.IDateRange) { }
}

export class LoadTradeNameTagsComplete {
    readonly type = TaggingActionTypes.LOAD_TRADE_NAME_TAGS_COMPLETE;

    constructor(public payload: any[]) { }
}
export class LoadTradeNameTagsFailed {
    readonly type = TaggingActionTypes.LOAD_TRADE_NAME_TAGS_FAILED;

    constructor(public payload: any) { }
}

export class UpdateTradeNameTags {
    readonly type = TaggingActionTypes.UPDATE_TRADE_NAME_TAGS;

    constructor(public payload: fromModels.ITradeNameTagChanges) { }
}

export class UpdateTradeNameTagsComplete implements Action {
    readonly type = TaggingActionTypes.UPDATE_TRADE_NAME_TAGS_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateTradeNameTagsFailed {
    readonly type = TaggingActionTypes.UPDATE_TRADE_NAME_TAGS_FAILED;

    constructor(public payload: string) { }
}


/**
 * Position Tags
 */

export class LoadPositionTags {
    readonly type = TaggingActionTypes.LOAD_POSITION_TAGS;

    constructor(public payload: fromModels.IDateRange) { }
}

export class LoadPositionTagsComplete implements Action {
    readonly type = TaggingActionTypes.LOAD_POSITION_TAGS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadPositionTagsFailed {
    readonly type = TaggingActionTypes.LOAD_POSITION_TAGS_FAILED;

    constructor(public payload: string) { }
}

export class UpdatePositionTags {
    readonly type = TaggingActionTypes.UPDATE_POSITION_TAGS;

    constructor(public payload: fromModels.IPositionTagChangesAdvance[]) { }
}

export class UpdatePositionTagsComplete implements Action {
    readonly type = TaggingActionTypes.UPDATE_POSITION_TAGS_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdatePositionTagsFailed {
    readonly type = TaggingActionTypes.UPDATE_POSITION_TAGS_FAILED;

    constructor(public payload: string) { }
}

// -----------------------------------------------------------------------------



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TaggingActions
    = LoadTagList
    | LoadTagListComplete
    | LoadTagListFailed

    | LoadTaggingLookups
    | LoadTaggingLookupsComplete
    | LoadTaggingLookupsFailed

    | LoadSecurityTags
    | LoadSecurityTagsComplete
    | LoadSecurityTagsFailed

    | UpdateSecurityTags
    | UpdateSecurityTagsComplete
    | UpdateSecurityTagsFailed

    | LoadTradeNameTags
    | LoadTradeNameTagsComplete
    | LoadTradeNameTagsFailed

    | UpdateTradeNameTags
    | UpdateTradeNameTagsComplete
    | UpdateTradeNameTagsFailed

    | LoadPositionTags
    | LoadPositionTagsComplete
    | LoadPositionTagsFailed

    | UpdatePositionTags
    | UpdatePositionTagsComplete
    | UpdatePositionTagsFailed;
