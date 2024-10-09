import { Action } from '@ngrx/store';

import * as fromModels from '../../models/fx-options-grid.models';

export enum FXOptionsgridActionTypes {

    LOAD_LATEST = '[FXOptionsGrid] Load latest data',
    LOAD_LATEST_COMPLETE = '[FXOptionsGrid] Load latest data complete',
    LOAD_LATEST_FAILED = '[FXOptionsGrid] Load latest data failed',

    LOAD_AS_OF_DATE = '[FXOptionsGrid] Load as of date',
    LOAD_AS_OF_DATE_COMPLETE = '[FXOptionsGrid] Load as of date complete',
    LOAD_AS_OF_DATE_FAILED = '[FXOptionsGrid] Load as of date failed'
}

export class LoadLatest implements Action {
    readonly type = FXOptionsgridActionTypes.LOAD_LATEST;
}

export class LoadLatestComplete implements Action {
    readonly type = FXOptionsgridActionTypes.LOAD_LATEST_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadLatestFailed implements Action {
    readonly type = FXOptionsgridActionTypes.LOAD_LATEST_FAILED;

    constructor(public payload: any) { }
}

export class LoadAsOfDate implements Action {
    readonly type = FXOptionsgridActionTypes.LOAD_AS_OF_DATE;

    constructor(public payload: string) { }
}

export class LoadAsOfDateComplete implements Action {
    readonly type = FXOptionsgridActionTypes.LOAD_AS_OF_DATE_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadAsOfDateFailed implements Action {
    readonly type = FXOptionsgridActionTypes.LOAD_AS_OF_DATE_FAILED;

    constructor(public payload: any) { }
}

export type FXOptionsGridActions
    = LoadLatest
    | LoadLatestComplete
    | LoadLatestFailed

    | LoadAsOfDate
    | LoadAsOfDateComplete
    | LoadAsOfDateFailed;


