import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FxActionTypes {
    LOAD_FX = '[PricingEngine] Load FX',
    LOAD_FX_COMPLETE = '[PricingEngine] Load FX complete',
    LOAD_FX_FAILED = '[PricingEngine] Load FX Failed',

    LOAD_FXFORWARD_OWNERSHIP = '[PricingEngine] Load fx forward ownership',
    LOAD_FXFORWARD_OWNERSHIP_COMPLETE = '[PricingEngine] Load fx forward ownership complete',
    LOAD_FXFORWARD_OWNERSHIP_FAILED = '[PricingEngine] Load fx forward ownership Failed',

    LOAD_FXFORWARD_DETAIL = '[PricingEngine] Load fx forward detail',
    LOAD_FXFORWARD_DETAIL_COMPLETE = '[PricingEngine] Load fx forward detail complete',
    LOAD_FXFORWARD_DETAIL_FAILED = '[PricingEngine] Load fx forward detail Failed',
    RESET_FXFORWARD_DETAIL = '[PricingEngine] Reset fx forward detail',

    UPDATE_FXFORWARD = '[PricingEngine] update fx forward',
    UPDATE_FXFORWARD_COMPLETE = '[PricingEngine] update fx forward complete',
    UPDATE_FXFORWARD_FAILED = '[PricingEngine] update fx forward Failed',

}





/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadFx implements Action {
    readonly type = FxActionTypes.LOAD_FX;

    constructor(public payload: fromModels.FxDataReq) { }
}

export class LoadFxComplete implements Action {
    readonly type = FxActionTypes.LOAD_FX_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadFxFailed implements Action {
    readonly type = FxActionTypes.LOAD_FX_FAILED;

    constructor(public payload: string) { }
}


export class LoadFxForwardOwnership implements Action {
    readonly type = FxActionTypes.LOAD_FXFORWARD_OWNERSHIP;

    constructor(public payload: fromModels.SecurityOwnershipReq) { }
}

export class LoadFxForwardOwnershipComplete implements Action {
    readonly type = FxActionTypes.LOAD_FXFORWARD_OWNERSHIP_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadFxForwardOwnershipFailed implements Action {
    readonly type = FxActionTypes.LOAD_FXFORWARD_OWNERSHIP_FAILED;

    constructor(public payload: string) { }
}

export class LoadFxForwardDetail implements Action {
    readonly type = FxActionTypes.LOAD_FXFORWARD_DETAIL;

    constructor(public payload: number) { }
}

export class LoadFxForwardDetailComplete implements Action {
    readonly type = FxActionTypes.LOAD_FXFORWARD_DETAIL_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadFxForwardDetailFailed implements Action {
    readonly type = FxActionTypes.LOAD_FXFORWARD_DETAIL_FAILED;

    constructor(public payload: string) { }
}

export class ResetFxForwardDetail implements Action {
    readonly type = FxActionTypes.RESET_FXFORWARD_DETAIL;
}

export class UpdateFxForward implements Action {
    readonly type = FxActionTypes.UPDATE_FXFORWARD;

    constructor(public payload: fromModels.FxForwardUpdateReq) { }
}

export class UpdateFxForwardComplete implements Action {
    readonly type = FxActionTypes.UPDATE_FXFORWARD_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateFxForwardFailed implements Action {
    readonly type = FxActionTypes.UPDATE_FXFORWARD_FAILED;

    constructor(public payload: string) { }
}





/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FxActions
    = LoadFx
    | LoadFxComplete
    | LoadFxFailed

    | LoadFxForwardOwnership
    | LoadFxForwardOwnershipComplete
    | LoadFxForwardOwnershipFailed

    | LoadFxForwardDetail
    | LoadFxForwardDetailComplete
    | LoadFxForwardDetailFailed
    | ResetFxForwardDetail

    | UpdateFxForward
    | UpdateFxForwardComplete
    | UpdateFxForwardFailed;
