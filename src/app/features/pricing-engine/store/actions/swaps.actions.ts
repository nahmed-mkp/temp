import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SwapsActionTypes {
    LOAD_SWAPS = '[PricingEngine] Load swaps',
    LOAD_SWAPS_COMPLETE = '[PricingEngine] Load swaps complete',
    LOAD_SWAPS_FAILED = '[PricingEngine] Load swaps Failed',



    LOAD_SWAP_OWNERSHIP = '[PricingEngine] Load swap ownership',
    LOAD_SWAP_OWNERSHIP_COMPLETE = '[PricingEngine] Load swap ownership complete',
    LOAD_SWAP_OWNERSHIP_FAILED = '[PricingEngine] Load swap ownership Failed',


    LOAD_SWAP_DETAIL = '[PricingEngine] Load swap detail',
    LOAD_SWAP_DETAIL_COMPLETE = '[PricingEngine] Load swap detail complete',
    LOAD_SWAP_DETAIL_FAILED = '[PricingEngine] Load swap detail Failed',
    RESET_SWAP_DETAIL = '[PricingEngine] Reset swap detail',


    UPDATE_SWAP = '[PricingEngine] update swaps',
    UPDATE_SWAP_COMPLETE = '[PricingEngine] update swaps complete',
    UPDATE_SWAP_FAILED = '[PricingEngine] update swaps Failed',
}





/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadSwaps implements Action {
    readonly type = SwapsActionTypes.LOAD_SWAPS;

    constructor(public payload: fromModels.SwapsDataReq) { }
}

export class LoadSwapsComplete implements Action {
    readonly type = SwapsActionTypes.LOAD_SWAPS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSwapsFailed implements Action {
    readonly type = SwapsActionTypes.LOAD_SWAPS_FAILED;

    constructor(public payload: string) { }
}








export class LoadSwapOwnership implements Action {
    readonly type = SwapsActionTypes.LOAD_SWAP_OWNERSHIP;

    constructor(public payload: fromModels.SecurityOwnershipReq) { }
}

export class LoadSwapOwnershipComplete implements Action {
    readonly type = SwapsActionTypes.LOAD_SWAP_OWNERSHIP_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSwapOwnershipFailed implements Action {
    readonly type = SwapsActionTypes.LOAD_SWAP_OWNERSHIP_FAILED;

    constructor(public payload: string) { }
}












export class LoadSwapDetail implements Action {
    readonly type = SwapsActionTypes.LOAD_SWAP_DETAIL;

    constructor(public payload: number) { }
}

export class LoadSwapDetailComplete implements Action {
    readonly type = SwapsActionTypes.LOAD_SWAP_DETAIL_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSwapDetailFailed implements Action {
    readonly type = SwapsActionTypes.LOAD_SWAP_DETAIL_FAILED;

    constructor(public payload: string) { }
}

export class ResetSwapDetail implements Action {
    readonly type = SwapsActionTypes.RESET_SWAP_DETAIL;
}

export class UpdateSwap implements Action {
    readonly type = SwapsActionTypes.UPDATE_SWAP;

    constructor(public payload: fromModels.SwapUpdateReq) { }
}

export class UpdateSwapComplete implements Action {
    readonly type = SwapsActionTypes.UPDATE_SWAP_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateSwapFailed implements Action {
    readonly type = SwapsActionTypes.UPDATE_SWAP_FAILED;

    constructor(public payload: string) { }
}












/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SwapsActions
    = LoadSwaps
    | LoadSwapsComplete
    | LoadSwapsFailed

    | LoadSwapOwnership
    | LoadSwapOwnershipComplete
    | LoadSwapOwnershipFailed

    | LoadSwapDetail
    | LoadSwapDetailComplete
    | LoadSwapDetailFailed
    | ResetSwapDetail

    | UpdateSwap
    | UpdateSwapComplete
    | UpdateSwapFailed;
