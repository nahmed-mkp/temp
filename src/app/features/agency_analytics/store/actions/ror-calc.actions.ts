import { Action } from '@ngrx/store';

import * as fromModels from '../../models/agency-analytics.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum RoRActionTypes {

    RUN_ROR = '[AgencyAnalytics] Run ROR on entire portfolio',
    RUN_ROR_COMPLETE = '[AgencyAnalytics] Run ROR on entire portfolio complete',
    RUN_ROR_FAILED = '[AgencyAnalytics] Run ROR on entire portfolio failed',

    RUN_ROR_PARTIAL = '[AgencyAnalytics] Run ROR on selected items',
    RUN_ROR_PARTIAL_COMPLETE = '[AgencyAnalytics] Run ROR on selected items complete',
    RUN_ROR_PARTIAL_FAILED = '[AgencyAnalytics] Run ROR on selected items failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class RunRoR implements Action {
    readonly type = RoRActionTypes.RUN_ROR;

    constructor(public payload: { portfolioGuid: string, securities: fromModels.ISecurityDetail[] }) { }
}

export class RunRoRComplete implements Action {
    readonly type = RoRActionTypes.RUN_ROR_COMPLETE;

    constructor(public payload: any[]) { }
}

export class RunRoRFailed implements Action {
    readonly type = RoRActionTypes.RUN_ROR_FAILED;

    constructor(public payload: string) { }
}

export class RunRoRPartial implements Action {
    readonly type = RoRActionTypes.RUN_ROR_PARTIAL;

    constructor(public payload: { portfolioGuid: string, securities: fromModels.ISecurityDetail[] }) { }
}

export class RunRoRPartialComplete implements Action {
    readonly type = RoRActionTypes.RUN_ROR_PARTIAL_COMPLETE;

    constructor(public payload: any[]) { }
}

export class RunRoRPartialFailed implements Action {
    readonly type = RoRActionTypes.RUN_ROR_PARTIAL_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type RoRCalcActions
    = RunRoR
    | RunRoRComplete
    | RunRoRFailed

    | RunRoRPartial
    | RunRoRPartialComplete
    | RunRoRPartialFailed;
