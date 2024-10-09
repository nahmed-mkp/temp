import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SwaptionsActionTypes {
    LOAD_SWAPTIONS = '[PricingEngine] Load swaptions',
    LOAD_SWAPTIONS_COMPLETE = '[PricingEngine] Load swaptions complete',
    LOAD_SWAPTIONS_FAILED = '[PricingEngine] Load swaptions Failed',

    LOAD_SWAPTION_OWNERSHIP = '[PricingEngine] Load swaption ownership',
    LOAD_SWAPTION_OWNERSHIP_COMPLETE = '[PricingEngine] Load swaption ownership complete',
    LOAD_SWAPTION_OWNERSHIP_FAILED = '[PricingEngine] Load swaption ownership Failed',

    LOAD_SWAPTION_DETAIL = '[PricingEngine] Load swaption detail',
    LOAD_SWAPTION_DETAIL_COMPLETE = '[PricingEngine] Load swaption detail complete',
    LOAD_SWAPTION_DETAIL_FAILED = '[PricingEngine] Load swaption detail Failed',
    RESET_SWAPTION_DETAIL = '[PricingEngine] Reset swaption detail',

    UPDATE_SWAPTION = '[PricingEngine] update swaption',
    UPDATE_SWAPTION_COMPLETE = '[PricingEngine] update swaption complete',
    UPDATE_SWAPTION_FAILED = '[PricingEngine] update swaption Failed',
}





/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadSwaptions implements Action {
    readonly type = SwaptionsActionTypes.LOAD_SWAPTIONS;

    constructor(public payload: fromModels.SwaptionsDataReq) { }
}

export class LoadSwaptionsComplete implements Action {
    readonly type = SwaptionsActionTypes.LOAD_SWAPTIONS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSwaptionsFailed implements Action {
    readonly type = SwaptionsActionTypes.LOAD_SWAPTIONS_FAILED;

    constructor(public payload: string) { }
}


export class LoadSwaptionOwnership implements Action {
    readonly type = SwaptionsActionTypes.LOAD_SWAPTION_OWNERSHIP;

    constructor(public payload: fromModels.SecurityOwnershipReq) { }
}

export class LoadSwaptionOwnershipComplete implements Action {
    readonly type = SwaptionsActionTypes.LOAD_SWAPTION_OWNERSHIP_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSwaptionOwnershipFailed implements Action {
    readonly type = SwaptionsActionTypes.LOAD_SWAPTION_OWNERSHIP_FAILED;

    constructor(public payload: string) { }
}

export class LoadSwaptionDetail implements Action {
    readonly type = SwaptionsActionTypes.LOAD_SWAPTION_DETAIL;

    constructor(public payload: number) { }
}

export class LoadSwaptionDetailComplete implements Action {
    readonly type = SwaptionsActionTypes.LOAD_SWAPTION_DETAIL_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSwaptionDetailFailed implements Action {
    readonly type = SwaptionsActionTypes.LOAD_SWAPTION_DETAIL_FAILED;

    constructor(public payload: string) { }
}

export class ResetSwaptionDetail implements Action {
    readonly type = SwaptionsActionTypes.RESET_SWAPTION_DETAIL;
}

export class UpdateSwaption implements Action {
    readonly type = SwaptionsActionTypes.UPDATE_SWAPTION;

    constructor(public payload: fromModels.SwaptionUpdateReq) { }
}

export class UpdateSwaptionComplete implements Action {
    readonly type = SwaptionsActionTypes.UPDATE_SWAPTION_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateSwaptionFailed implements Action {
    readonly type = SwaptionsActionTypes.UPDATE_SWAPTION_FAILED;

    constructor(public payload: string) { }
}










/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SwaptionsActions
    = LoadSwaptions
    | LoadSwaptionsComplete
    | LoadSwaptionsFailed

    | LoadSwaptionOwnership
    | LoadSwaptionOwnershipComplete
    | LoadSwaptionOwnershipFailed

    | LoadSwaptionDetail
    | LoadSwaptionDetailComplete
    | LoadSwaptionDetailFailed
    | ResetSwaptionDetail

    | UpdateSwaption
    | UpdateSwaptionComplete
    | UpdateSwaptionFailed;
