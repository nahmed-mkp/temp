import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum OptionsActionTypes {
    LOAD_OPTIONS = '[PricingEngine] Load options',
    LOAD_OPTIONS_COMPLETE = '[PricingEngine] Load options complete',
    LOAD_OPTIONS_FAILED = '[PricingEngine] Load options Failed',

    UPDATE_OPTION = '[PricingEngine] Update option',
    UPDATE_OPTION_COMPLETE = '[PricingEngine] Update option complete',
    UPDATE_OPTION_FAILED = '[PricingEngine] Update option failed',

    LOAD_OPTION_OWNERSHIP = '[PricingEngine] Load option ownership',
    LOAD_OPTION_OWNERSHIP_COMPLETE = '[PricingEngine] Load option ownership complete',
    LOAD_OPTION_OWNERSHIP_FAILED = '[PricingEngine] Load option ownership Failed',

    LOAD_OPTION_DETAIL = '[PricingEngine] Load option detail',
    LOAD_OPTION_DETAIL_COMPLETE = '[PricingEngine] Load option detail complete',
    LOAD_OPTION_DETAIL_FAILED = '[PricingEngine] Load option detail Failed',

    UPDATE_OPTION_PRICE_METHOD = '[PricingEngine] Update option pricing method',
    UPDATE_OPTION_PRICE_METHOD_COMPLETE = '[PricingEngine] Update option pricing method complete',
    UPDATE_OPTION_PRICE_METHOD_FAILED = '[PricingEngine] Update option pricing method failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadOptions implements Action {
    readonly type = OptionsActionTypes.LOAD_OPTIONS;

    constructor(public payload: fromModels.OptionsDataReq) { }
}

export class LoadOptionsComplete implements Action {
    readonly type = OptionsActionTypes.LOAD_OPTIONS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadOptionsFailed implements Action {
    readonly type = OptionsActionTypes.LOAD_OPTIONS_FAILED;

    constructor(public payload: string) { }
}



export class LoadOptionOwnership implements Action {
    readonly type = OptionsActionTypes.LOAD_OPTION_OWNERSHIP;

    constructor(public payload: fromModels.SecurityOwnershipReq) { }
}

export class LoadOptionOwnershipComplete implements Action {
    readonly type = OptionsActionTypes.LOAD_OPTION_OWNERSHIP_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadOptionOwnershipFailed implements Action {
    readonly type = OptionsActionTypes.LOAD_OPTION_OWNERSHIP_FAILED;

    constructor(public payload: string) { }
}




export class LoadOptionsDetail implements Action {
    readonly type = OptionsActionTypes.LOAD_OPTION_DETAIL;

    constructor(public payload: number) { }
}

export class LoadOptionsDetailComplete implements Action {
    readonly type = OptionsActionTypes.LOAD_OPTION_DETAIL_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadOptionsDetailFailed implements Action {
    readonly type = OptionsActionTypes.LOAD_OPTION_DETAIL_FAILED;

    constructor(public payload: string) { }
}





export class UpdateOption implements Action {
    readonly type = OptionsActionTypes.UPDATE_OPTION;

    constructor(public payload: fromModels.OptionUpdateReq) { }
}

export class UpdateOptionComplete implements Action {
    readonly type = OptionsActionTypes.UPDATE_OPTION_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateOptionFailed implements Action {
    readonly type = OptionsActionTypes.UPDATE_OPTION_FAILED;

    constructor(public payload: string) { }
}

export class UpdateOptionPriceMethod implements Action {
    readonly type = OptionsActionTypes.UPDATE_OPTION_PRICE_METHOD;

    constructor(public payload: fromModels.OptionPriceMethodUpdateReq) { }
}

export class UpdateOptionPriceMethodComplete implements Action {
    readonly type = OptionsActionTypes.UPDATE_OPTION_PRICE_METHOD_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateOptionPriceMethodFailed implements Action {
    readonly type = OptionsActionTypes.UPDATE_OPTION_PRICE_METHOD_FAILED;

    constructor(public payload: string) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type OptionsActions
    = LoadOptions
    | LoadOptionsComplete
    | LoadOptionsFailed

    | UpdateOption
    | UpdateOptionComplete
    | UpdateOptionFailed

    | UpdateOptionPriceMethod
    | UpdateOptionPriceMethodComplete
    | UpdateOptionPriceMethodFailed

    | LoadOptionOwnership
    | LoadOptionOwnershipComplete
    | LoadOptionOwnershipFailed

    | LoadOptionsDetail
    | LoadOptionsDetailComplete
    | LoadOptionsDetailFailed
    ;
