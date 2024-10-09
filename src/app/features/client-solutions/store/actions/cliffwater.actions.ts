import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum CliffwaterActionsType {
    LOAD_CLIFFWATER_DATA = '[ClientSolutions] load cliffwater data set',
    LOAD_CLIFFWATER_DATA_COMPLETE = '[ClientSolutions] load cliffwater data set complete',
    LOAD_CLIFFWATER_DATA_FAILED = '[ClientSolutions] load cliffwater data set failed',
}

export class LoadCliffwaterData implements Action {
    readonly type = CliffwaterActionsType.LOAD_CLIFFWATER_DATA;

    constructor(public payload: fromModels.ICliffwaterReq) { }
}

export class LoadCliffwaterDataComplete implements Action {
    readonly type = CliffwaterActionsType.LOAD_CLIFFWATER_DATA_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadCliffwaterDataFailed implements Action {
    readonly type = CliffwaterActionsType.LOAD_CLIFFWATER_DATA_FAILED;

    constructor(public payload: string) { }
}

export type CliffwaterActions
    = LoadCliffwaterData
    | LoadCliffwaterDataComplete
    | LoadCliffwaterDataFailed;
