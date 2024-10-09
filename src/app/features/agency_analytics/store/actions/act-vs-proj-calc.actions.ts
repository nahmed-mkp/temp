import { Action } from '@ngrx/store';

import * as fromModels from '../../models/agency-analytics.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ActVsProjActionTypes {

    RUN_ACT_VS_PROJ = '[AgencyAnalytics] Run ActVsProj on entire portfolio',
    RUN_ACT_VS_PROJ_COMPLETE = '[AgencyAnalytics] Run ActVsProj on entire portfolio complete',
    RUN_ACT_VS_PROJ_FAILED = '[AgencyAnalytics] Run ActVsProj on entire portfolio failed',

    RUN_ACT_VS_PROJ_PARTIAL = '[AgencyAnalytics] Run ActVsProj on selected items',
    RUN_ACT_VS_PROJ_PARTIAL_COMPLETE = '[AgencyAnalytics] Run ActVsProj on selected items complete',
    RUN_ACT_VS_PROJ_PARTIAL_FAILED = '[AgencyAnalytics] Run ActVsProj on selected items failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class RunActVsProj implements Action {
    readonly type = ActVsProjActionTypes.RUN_ACT_VS_PROJ;

    constructor(public payload: { portfolioGuid: string, securities: fromModels.ISecurityDetail[] }) { }
}

export class RunActVsProjComplete implements Action {
    readonly type = ActVsProjActionTypes.RUN_ACT_VS_PROJ_COMPLETE;

    constructor(public payload: any[]) { }
}

export class RunActVsProjFailed implements Action {
    readonly type = ActVsProjActionTypes.RUN_ACT_VS_PROJ_FAILED;

    constructor(public payload: string) { }
}

export class RunActVsProjPartial implements Action {
    readonly type = ActVsProjActionTypes.RUN_ACT_VS_PROJ_PARTIAL;

    constructor(public payload: { portfolioGuid: string, securities: fromModels.ISecurityDetail[] }) { }
}

export class RunActVsProjPartialComplete implements Action {
    readonly type = ActVsProjActionTypes.RUN_ACT_VS_PROJ_PARTIAL_COMPLETE;

    constructor(public payload: any[]) { }
}

export class RunActVsProjPartialFailed implements Action {
    readonly type = ActVsProjActionTypes.RUN_ACT_VS_PROJ_PARTIAL_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ActVsProjCalcActions
    = RunActVsProj
    | RunActVsProjComplete
    | RunActVsProjFailed

    | RunActVsProjPartial
    | RunActVsProjPartialComplete
    | RunActVsProjPartialFailed;
