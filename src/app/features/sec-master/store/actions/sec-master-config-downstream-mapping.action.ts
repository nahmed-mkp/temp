import { Action } from '@ngrx/store';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SecMasterConfigDownstreamMappingActionTypes {

    LOAD_DOWNSTREAM_MAPPING = '[SecMasterGlobal] Load downstream mapping',
    LOAD_DOWNSTREAM_MAPPING_COMPLETE = '[SecMasterGlobal] Load downstream mapping complete',
    LOAD_DOWNSTREAM_MAPPING_FAILED = '[SecMasterGlobal] Load downstream mapping Failed',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadDownstreamMapping implements Action {
    readonly type = SecMasterConfigDownstreamMappingActionTypes.LOAD_DOWNSTREAM_MAPPING;
}

export class LoadDownstreamMappingComplete implements Action {
    readonly type = SecMasterConfigDownstreamMappingActionTypes.LOAD_DOWNSTREAM_MAPPING_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadDownstreamMappingFailed implements Action {
    readonly type = SecMasterConfigDownstreamMappingActionTypes.LOAD_DOWNSTREAM_MAPPING_FAILED;

    constructor(public payload: string) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SecMasterConfigDownstreamMappingActions
    = LoadDownstreamMapping
    | LoadDownstreamMappingComplete
    | LoadDownstreamMappingFailed;



