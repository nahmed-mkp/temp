import { Action } from '@ngrx/store';

import * as fromModels from '../../models/capitals.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum CapitalsActionTypes {

    LOAD_FUND_COMPLEXES = '[Capitals] Load fund complexes', 
    LOAD_FUND_COMPLEXES_COMPLETE = '[Capitals] Load fund complexes complete', 
    LOAD_FUND_COMPLEXES_FAILED = '[Capitals] Load fund complexes failed',

    LOAD_LATEST_CAPITAL_MATRIX = '[Capitals] Load latest capital matrix', 
    LOAD_LATEST_CAPITAL_MATRIX_COMPLETE = '[Capitals] Load latest capital matrix complete',
    LOAD_LATEST_CAPITAL_MATRIX_FAILED = '[Capitals] Load latest capital matrix failed',

    LOAD_CAPITAL_MATRIX = '[Capitals] Load capital matrix',
    LOAD_CAPITAL_MATRIX_COMPLETE = '[Capitals] Load capital matrix complete',
    LOAD_CAPITAL_MATRIX_FAILED = '[Capitals] Load capital matrix failed',

    LOAD_FUND_CAPITAL_FLOWS = '[Capitals] Load fund capital flows',
    LOAD_FUND_CAPITAL_FLOWS_COMPLETE = '[Capitals] Load fund capital flows complete',
    LOAD_FUND_CAPITAL_FLOWS_FAILED = '[Capitals] Load fund capital flows failed',

    LOAD_POD_CAPITAL_FLOWS = '[Capital] Load pod capital flows',
    LOAD_POD_CAPITAL_FLOWS_COMPLETE = '[Capital] Load pod capital flows complete',
    LOAD_POD_CAPITAL_FLOWS_FAILED = '[Capital] Load pod capital flows failed',

    LOAD_FUND_CAPITAL_HISTORY = '[Capital] Load fund capital history',
    LOAD_FUND_CAPITAL_HISTORY_COMPLETE = '[Capital] Load fund capital history complete',
    LOAD_FUND_CAPITAL_HISTORY_FAILED = '[Capital] Load fund capital history failed',

    LOAD_POD_CAPITAL_HISTORY = '[Capital] Load pod capital history',
    LOAD_POD_CAPITAL_HISTORY_COMPLETE = '[Capital] Load pod capital history complete',
    LOAD_POD_CAPITAL_HISTORY_FAILED = '[Capital] Load pod capital history failed',



    // ==============================================================================

    UPDATE_CROSSPOD_CAPITAL = '[Capital] Update crosspod capital',
    UPDATE_CROSSPOD_CAPITAL_COMPLETE = '[Capital] Update crosspod capital complete',
    UPDATE_CROSSPOD_CAPITAL_FAILED = '[Capital] Update crosspod capital failed',

    UPDATE_FUND_CAPITAL = '[Capital] Update fund capital',
    UPDATE_FUND_CAPITAL_COMPLETE = '[Capital] Update fund capital complete',
    UPDATE_FUND_CAPITAL_FAILED = '[Capital] Update fund capital failed',

    RESET_CAPITAL_CHANGES = '[Capital] Reset capital changes',
    RESET_CAPITAL_CHANGES_COMPLETE = '[Capital] Reset capital changes complete',
    RESET_CAPITAL_CHANGES_FAILED = '[Capital] Reset capital changes failed',

    PREVIEW_CAPITAL_CHANGES = '[Capital] Preview capital changes',
    PREVIEW_CAPITAL_CHANGES_COMPLETE = '[Capital] Preview capital changes complete',
    PREVIEW_CAPITAL_CHANGES_FAILED = '[Capital] Preview capital changes failed',

    SAVE_CAPITAL_CHANGES = '[Capital] Save capital changes',
    SAVE_CAPITAL_CHANGES_COMPLETE = '[Capital] Save capital changes complete',
    SAVE_CAPITAL_CHANGES_FAILED = '[Capital] Save capital changes failed',

    RESET_CAPITAL_CHANGES_RESULT = '[Capital] Reset capital changes result'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadFundComplexes implements Action {
    readonly type = CapitalsActionTypes.LOAD_FUND_COMPLEXES;
}

export class LoadFundComplexesComplete implements Action {
    readonly type = CapitalsActionTypes.LOAD_FUND_COMPLEXES_COMPLETE;

    constructor(public payload: string[]) {}
}

export class LoadFundComplexesFailed implements Action {
    readonly type = CapitalsActionTypes.LOAD_FUND_COMPLEXES_FAILED;

    constructor(public payload: string) {}
}

 export class LoadLatestCapitalMatrix implements Action {
     readonly type = CapitalsActionTypes.LOAD_LATEST_CAPITAL_MATRIX;
 }

 export class LoadLatestCapitalMatrixComplete implements Action {
     readonly type = CapitalsActionTypes.LOAD_LATEST_CAPITAL_MATRIX_COMPLETE;

     constructor(public payload: fromModels.ICapitalMatrix) { }
 }

export class LoadLatestCapitalMatrixFailed implements Action {
     readonly type = CapitalsActionTypes.LOAD_LATEST_CAPITAL_MATRIX_FAILED;

     constructor(public payload: any) {}
 }

export class LoadCapitalMatrix implements Action {
    readonly type = CapitalsActionTypes.LOAD_CAPITAL_MATRIX;

    constructor(public payload: fromModels.ICapitalInput) { }
}

export class LoadCapitalMatrixComplete implements Action {
    readonly type = CapitalsActionTypes.LOAD_CAPITAL_MATRIX_COMPLETE;

    constructor(public payload: fromModels.ICapitalMatrix) { }
}

export class LoadCapitalMatrixFailed implements Action {
    readonly type = CapitalsActionTypes.LOAD_CAPITAL_MATRIX_FAILED;

    constructor(public payload: string) { }
}





export class LoadFundCapitalFlows implements Action {
    readonly type = CapitalsActionTypes.LOAD_FUND_CAPITAL_FLOWS;

    constructor(public payload: fromModels.ICapitalFlowInput) { }
}

export class LoadFundCapitalFlowsComplete implements Action {
    readonly type = CapitalsActionTypes.LOAD_FUND_CAPITAL_FLOWS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadFundCapitalFlowsFailed implements Action {
    readonly type = CapitalsActionTypes.LOAD_FUND_CAPITAL_FLOWS_FAILED;

    constructor(public payload: string) { }
}

export class LoadPodCapitalFlows implements Action {
    readonly type = CapitalsActionTypes.LOAD_POD_CAPITAL_FLOWS;

    constructor(public payload: fromModels.ICapitalFlowInput) { }
}

export class LoadPodCapitalFlowsComplete implements Action {
    readonly type = CapitalsActionTypes.LOAD_POD_CAPITAL_FLOWS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadPodCapitalFlowsFailed implements Action {
    readonly type = CapitalsActionTypes.LOAD_POD_CAPITAL_FLOWS_FAILED;

    constructor(public payload: any) { }
}

export class LoadFundCapitalHistory implements Action {
    readonly type = CapitalsActionTypes.LOAD_FUND_CAPITAL_HISTORY;

    constructor(public payload: fromModels.ICapitalHistoryInput) { }
}

export class LoadFundCapitalHistoryComplete implements Action {
    readonly type = CapitalsActionTypes.LOAD_FUND_CAPITAL_HISTORY_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadFundCapitalHistoryFailed implements Action {
    readonly type = CapitalsActionTypes.LOAD_FUND_CAPITAL_HISTORY_FAILED;

    constructor(public payload: any) { }
}

export class LoadPodCapitalHistory implements Action {
    readonly type = CapitalsActionTypes.LOAD_POD_CAPITAL_HISTORY;

    constructor(public payload: fromModels.ICapitalHistoryInput) { }
}

export class LoadPodCapitalHistoryComplete implements Action {
    readonly type = CapitalsActionTypes.LOAD_POD_CAPITAL_HISTORY_COMPLETE;

    constructor(public payload: {'fundID': number, 'history': any[]}) { }
}

export class LoadPodCapitalHistoryFailed implements Action {
    readonly type = CapitalsActionTypes.LOAD_POD_CAPITAL_HISTORY_FAILED;

    constructor(public payload: any) { }
}



export class UpdateCrosspodCapital implements Action {
    readonly type = CapitalsActionTypes.UPDATE_CROSSPOD_CAPITAL;

    constructor(public payload: fromModels.ICrossPodCapitalChange) { }
}

export class UpdateCrosspodCapitalComplete implements Action {
    readonly type = CapitalsActionTypes.UPDATE_CROSSPOD_CAPITAL_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateCrosspodCapitalFailed implements Action {
    readonly type = CapitalsActionTypes.UPDATE_CROSSPOD_CAPITAL_FAILED;

    constructor(public payload: string) { }
}


export class UpdateFundCapital implements Action {
    readonly type = CapitalsActionTypes.UPDATE_FUND_CAPITAL;

    constructor(public payload: fromModels.IFundCapitalChange) { }
}

export class UpdateFundCapitalComplete implements Action {
    readonly type = CapitalsActionTypes.UPDATE_FUND_CAPITAL_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateFundCapitalFailed implements Action {
    readonly type = CapitalsActionTypes.UPDATE_FUND_CAPITAL_FAILED;

    constructor(public payload: string) { }
}

export class ResetCapitalChanges implements Action {
    readonly type = CapitalsActionTypes.RESET_CAPITAL_CHANGES;

    constructor(public payload: fromModels.ICapitalInput) { }
}

export class ResetCapitalChangesComplete implements Action {
    readonly type = CapitalsActionTypes.RESET_CAPITAL_CHANGES_COMPLETE;

    constructor(public payload: any) { }
}

export class ResetCapitalChangesFailed implements Action {
    readonly type = CapitalsActionTypes.RESET_CAPITAL_CHANGES_FAILED;

    constructor(public payload: string) { }
}

export class PreviewCapitalChanges implements Action {
    readonly type = CapitalsActionTypes.PREVIEW_CAPITAL_CHANGES;

    constructor(public payload: fromModels.ICapitalInput) { }
}

export class PreviewCapitalChangesComplete implements Action {
    readonly type = CapitalsActionTypes.PREVIEW_CAPITAL_CHANGES_COMPLETE;

    constructor(public payload: any) { }
}

export class PreviewCapitalChangesFailed implements Action {
    readonly type = CapitalsActionTypes.PREVIEW_CAPITAL_CHANGES_FAILED;

    constructor(public payload: string) { }
}
export class SaveCapitalChanges implements Action {
    readonly type = CapitalsActionTypes.SAVE_CAPITAL_CHANGES;

    constructor(public payload: fromModels.ICapitalSaveInput) { }
}

export class SaveCapitalChangesComplete implements Action {
    readonly type = CapitalsActionTypes.SAVE_CAPITAL_CHANGES_COMPLETE;

    constructor(public payload: fromModels.ISaveCapitalResult) { }
}

export class SaveCapitalChangesFailed implements Action {
    readonly type = CapitalsActionTypes.SAVE_CAPITAL_CHANGES_FAILED;

    constructor(public payload: fromModels.ISaveCapitalResult) { }
}

export class ResetCapitalChangesResult implements Action {
    readonly type = CapitalsActionTypes.RESET_CAPITAL_CHANGES_RESULT;
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CapitalsActions
    = LoadFundComplexes
    | LoadFundComplexesComplete
    | LoadFundComplexesFailed

    | LoadLatestCapitalMatrix
    | LoadLatestCapitalMatrixComplete
    | LoadLatestCapitalMatrixFailed

    | LoadCapitalMatrix
    | LoadCapitalMatrixComplete
    | LoadCapitalMatrixFailed

    | LoadFundCapitalFlows
    | LoadFundCapitalFlowsComplete
    | LoadFundCapitalFlowsFailed

    | LoadPodCapitalFlows
    | LoadPodCapitalFlowsComplete
    | LoadPodCapitalFlowsFailed

    | LoadFundCapitalHistory
    | LoadFundCapitalHistoryComplete
    | LoadFundCapitalHistoryFailed

    | LoadPodCapitalHistory
    | LoadPodCapitalHistoryComplete
    | LoadPodCapitalHistoryFailed

    | UpdateCrosspodCapital
    | UpdateCrosspodCapitalComplete
    | UpdateCrosspodCapitalFailed

    | UpdateFundCapital
    | UpdateFundCapitalComplete
    | UpdateFundCapitalFailed

    | ResetCapitalChanges
    | ResetCapitalChangesComplete
    | ResetCapitalChangesFailed

    | PreviewCapitalChanges
    | PreviewCapitalChangesComplete
    | PreviewCapitalChangesFailed

    | SaveCapitalChanges
    | SaveCapitalChangesComplete
    | SaveCapitalChangesFailed

    | ResetCapitalChangesResult;
