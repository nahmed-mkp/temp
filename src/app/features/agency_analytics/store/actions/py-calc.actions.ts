import { Action } from '@ngrx/store';

import * as fromModels from '../../models/agency-analytics.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PYCalcActionTypes {

    RUN_PY_CALC = '[AgencyAnalytics] Run P/Y Calculations on entire portfolio',
    RUN_PY_CALC_COMPLETE = '[AgencyAnalytics] Run P/Y Calculations on entire portfolio complete',
    RUN_PY_CALC_FAILED = '[AgencyAnalytics] Run P/Y Calculations on entire portfolio failed',

    RUN_PY_CALC_PARTIAL = '[AgencyAnalytics] Run P/Y Calculations on selected items',
    RUN_PY_CALC_PARTIAL_COMPLETE = '[AgencyAnalytics] Run P/Y Calculations on selected items complete',
    RUN_PY_CALC_PARTIAL_FAILED = '[AgencyAnalytics] Run P/Y Calculations on selected items failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class RunPYCalc implements Action {
    readonly type = PYCalcActionTypes.RUN_PY_CALC;

    constructor(public payload: { portfolioGuid: string, securities: fromModels.ISecurityDetail[] }) { }
}

export class RunPYCalcComplete implements Action {
    readonly type = PYCalcActionTypes.RUN_PY_CALC_COMPLETE;

    constructor(public payload: any[]) { }
}

export class RunPYCalcFailed implements Action {
    readonly type = PYCalcActionTypes.RUN_PY_CALC_FAILED;

    constructor(public payload: string) { }
}

export class RunPYCalcPartial implements Action {
    readonly type = PYCalcActionTypes.RUN_PY_CALC_PARTIAL;

    constructor(public payload: { portfolioGuid: string, securities: fromModels.ISecurityDetail[] }) { }
}

export class RunPYCalcPartialComplete implements Action {
    readonly type = PYCalcActionTypes.RUN_PY_CALC_PARTIAL_COMPLETE;

    constructor(public payload: any[]) { }
}

export class RunPYCalcPartialFailed implements Action {
    readonly type = PYCalcActionTypes.RUN_PY_CALC_PARTIAL_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PYCalcActions
    = RunPYCalc
    | RunPYCalcComplete
    | RunPYCalcFailed
    
    | RunPYCalcPartial
    | RunPYCalcPartialComplete
    | RunPYCalcPartialFailed;
