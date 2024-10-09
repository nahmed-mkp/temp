import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum ShockAnalysisActionTypes {

    LOAD_SHOCK_INFO = '[RCPM-2-0] Load shock info',
    LOAD_SHOCK_INFO_COMPLETE = '[RCPM-2-0] Load shock info complete',
    LOAD_SHOCK_INFO_FAILED = '[RCPM-2-0] Load shock info failed',

    LOAD_SHOCK_ASSET_CLASS = '[RCPM-2-0] Load shock asset class',
    LOAD_SHOCK_ASSET_CLASS_COMPLETE = '[RCPM-2-0] Load shock asset class complete',
    LOAD_SHOCK_ASSET_CLASS_FAILED = '[RCPM-2-0] Load shock asset class failed',

    HIT_SHOCK_TRIGGER = '[RCPM-2-0] Hit shorck trigger',
    HIT_SHOCK_TRIGGER_COMPLETE = '[RCPM-2-0] Hit shorck trigger complete',
    HIT_SHOCK_TRIGGER_FAILED = '[RCPM-2-0] Hit shorck trigger failed',
}

export class LoadShockInfo {
    readonly type = ShockAnalysisActionTypes.LOAD_SHOCK_INFO;
}

export class LoadShockInfoComplete {
    readonly type = ShockAnalysisActionTypes.LOAD_SHOCK_INFO_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadShockInfoFailed {
    readonly type = ShockAnalysisActionTypes.LOAD_SHOCK_INFO_FAILED;

    constructor(public payload: string) {}
}




export class LoadShockAssetClass {
    readonly type = ShockAnalysisActionTypes.LOAD_SHOCK_ASSET_CLASS;
    constructor(public payload: string) {}
}

export class LoadShockAssetClassComplete {
    readonly type = ShockAnalysisActionTypes.LOAD_SHOCK_ASSET_CLASS_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadShockAssetClassFailed {
    readonly type = ShockAnalysisActionTypes.LOAD_SHOCK_ASSET_CLASS_FAILED;

    constructor(public payload: string) {}
}




export class HitShockTrigger {
    readonly type = ShockAnalysisActionTypes.HIT_SHOCK_TRIGGER;
}

export class HitShockTriggerComplete {
    readonly type = ShockAnalysisActionTypes.HIT_SHOCK_TRIGGER_COMPLETE;

    constructor(public payload: any) {}
}

export class HitShockTriggerFailed {
    readonly type = ShockAnalysisActionTypes.HIT_SHOCK_TRIGGER_FAILED;

    constructor(public payload: string) {}
}




export type ShockAnalysisActions
    = LoadShockInfo
    | LoadShockInfoComplete
    | LoadShockInfoFailed

    | LoadShockAssetClass
    | LoadShockAssetClassComplete
    | LoadShockAssetClassFailed

    | HitShockTrigger
    | HitShockTriggerComplete
    | HitShockTriggerFailed
    ;