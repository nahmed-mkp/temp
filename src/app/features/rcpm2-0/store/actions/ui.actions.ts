/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

 export enum UiActionTypes {

    SET_EXECUTION_DISPLAY_MODE = '[RCPM-2-0] set execution display mode',
    SET_DATA_RETRIEVAL_MODE = '[RCPM-2-0] Set data retrieval mode',
    LOAD_DATA_RETRIEVAL_MODE = '[RCPM-2-0] Load data retrieval mode',
    LOAD_DATA_RETRIEVAL_MODE_COMPLETE = '[RCPM-2-0] Load data retrieval mode complete',
    LOAD_DATA_RETRIEVAL_MODE_FAILED = '[RCPM-2-0] Load data retrieval mode failed'
}


export class SetExecutionDisplayMode {
    readonly type = UiActionTypes.SET_EXECUTION_DISPLAY_MODE;
    constructor(public payload: {layoutName: string; mode: boolean}) {}
}

export class SetDataRetrievalMode {
    readonly type = UiActionTypes.SET_DATA_RETRIEVAL_MODE;
    constructor(public payload: any) {}
}

export class LoadDataRetrievalMode {
    readonly type = UiActionTypes.LOAD_DATA_RETRIEVAL_MODE;
}

export class LoadDataRetrievalModeComplete {
    readonly type = UiActionTypes.LOAD_DATA_RETRIEVAL_MODE_COMPLETE;
    constructor(public payload: any) {}
}

export class LoadDataRetrievalModeFailed {
    readonly type = UiActionTypes.LOAD_DATA_RETRIEVAL_MODE_FAILED;
    constructor(public payload: any) {}
}

export type UiActions
    = SetExecutionDisplayMode
    | SetDataRetrievalMode
    | LoadDataRetrievalMode
    | LoadDataRetrievalModeComplete
    | LoadDataRetrievalModeFailed
    ;
