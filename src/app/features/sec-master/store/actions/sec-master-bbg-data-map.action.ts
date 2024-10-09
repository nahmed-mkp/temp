import { Action } from '@ngrx/store';

import * as fromModels from '../../models/sec-master-global.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SecMasterBbgDataMapActionTypes {

    LOAD_BBG_DATA_MAP = '[SecMasterGlobal] Load Bbg data Map',
    LOAD_BBG_DATA_MAP_COMPLETE = '[SecMasterGlobal] Load Bbg data Map complete',
    LOAD_BBG_DATA_MAP_FAILED = '[SecMasterGlobal] Load Bbg data Map Failed',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadBbgDataMap implements Action {
    readonly type = SecMasterBbgDataMapActionTypes.LOAD_BBG_DATA_MAP;
}

export class LoadBbgDataMapComplete implements Action {
    readonly type = SecMasterBbgDataMapActionTypes.LOAD_BBG_DATA_MAP_COMPLETE;

    constructor(public payload: fromModels.IBbgDataMap[]) { }
}

export class LoadBbgDataMapFailed implements Action {
    readonly type = SecMasterBbgDataMapActionTypes.LOAD_BBG_DATA_MAP_FAILED;

    constructor(public payload: string) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SecMasterBbgDataMapActions
    = LoadBbgDataMap
    | LoadBbgDataMapComplete
    | LoadBbgDataMapFailed;



