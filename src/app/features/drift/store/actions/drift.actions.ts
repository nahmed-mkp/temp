import { Action } from '@ngrx/store';

import * as fromModels from './../../models/drift.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum DriftActionTypes {

    CLIENT_SIDE_PARAMETER_CHANGED = '[Drift] Client side parameter changed',

    LOAD_POSITIONS_DRIFT = '[Drift] Load positions drift',
    LOAD_POSITIONS_DRIFT_COMPLETE = '[Drift] Load positions drift complete',
    LOAD_POSITIONS_DRIFT_FAILED = '[Drift] Load positions drift failed',

    LOAD_POSITION_DRIFT = '[Drift] Load Position Drift',
    LOAD_POSITION_DRIFT_COMPLETE = '[Drift] Load Position Drift complete',
    LOAD_POSITION_DRIFT_FAILED = '[Drift] Load Position Drift failed',

    LOAD_PNL = '[Drift] Load PnL',
    LOAD_PNL_COMPLETE = '[Drift] Load PnL',
    LOAD_PNL_FAILED = '[Drift] Load PnL'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

 export class ClientSideParameterChanged implements Action {
    readonly type = DriftActionTypes.CLIENT_SIDE_PARAMETER_CHANGED;

    constructor(public payload: fromModels.PositionsDriftRequest) { }
}

export class LoadPositionsDrift implements Action {
    readonly type = DriftActionTypes.LOAD_POSITIONS_DRIFT;

    constructor(public payload: fromModels.PositionsDriftRequest) { }
}

export class LoadPositionsDriftComplete implements Action {
    readonly type = DriftActionTypes.LOAD_POSITIONS_DRIFT_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadPositionsDriftFailed implements Action {
    readonly type = DriftActionTypes.LOAD_POSITIONS_DRIFT_FAILED;

    constructor(public payload: string) { }
}

export class LoadPositionDrift implements Action {
    readonly type = DriftActionTypes.LOAD_POSITION_DRIFT;

    constructor(public payload: fromModels.PositionDriftRequest) { }
}

export class LoadPositionDriftComplete implements Action {
    readonly type = DriftActionTypes.LOAD_POSITION_DRIFT_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadPositionDriftFailed implements Action {
    readonly type = DriftActionTypes.LOAD_POSITION_DRIFT_FAILED;

    constructor(public payload: string) { }
}


export class LoadPnL implements Action {
    readonly type = DriftActionTypes.LOAD_PNL;

    constructor(public payload: fromModels.PnlLoadRequest) { }
}

export class LoadPnLComplete implements Action {
    readonly type = DriftActionTypes.LOAD_PNL_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadPnLFailed implements Action {
    readonly type = DriftActionTypes.LOAD_PNL_FAILED;

    constructor(public payload: string) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type DriftActions
    = ClientSideParameterChanged
    | LoadPositionsDrift
    | LoadPositionsDriftComplete
    | LoadPositionsDriftFailed

    | LoadPositionDrift
    | LoadPositionDriftComplete
    | LoadPositionDriftFailed

    | LoadPnL
    | LoadPnLComplete
    | LoadPnLFailed;

