import { Action } from '@ngrx/store';

import * as fromModels from './../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AgreementActionTypes {

    RESET_AGREEMENT_GRID = '[Agreements] reset agreement grid',
    SAVE_AGREEMENT_GRID_ORIGIN_DATA = '[Agreements] save agreement grid origin data',

    LOAD_TRADE_AGREEMENT_TYPES = '[Agreements] Load trade agreement types',
    LOAD_TRADE_AGREEMENT_TYPES_COMPLETE = '[Agreements] Load trade agreement types complete',
    LOAD_TRADE_AGREEMENT_TYPES_FAILED = '[Agreements] Load trade agreement types failed',

    SELECT_AGREEMENT_TYPES = '[Agreements] Select agreement types',
    CLEAR_AGREEMENT_TYPES = '[Agreements] Clear agreement types',

    LOAD_TRADE_AGREEMENT_SEC_TYPES = '[Agreements] Trade agreement sec types',
    LOAD_TRADE_AGREEMENT_SEC_TYPES_COMPLETE = '[Agreements] Trade agreement sec types complete',
    LOAD_TRADE_AGREEMENT_SEC_TYPES_FAILED = '[Agreements] Trade agreement sec types failed',

    LOAD_TRADE_AGREEMENTS = '[Agreements] Load trade agreements',
    LOAD_TRADE_AGREEMENTS_COMPLETE = '[Agreements] Load trade agreements complete',
    LOAD_TRADE_AGREEMENTS_FAILED = '[Agreements] Load trade agreements failed',

    ADD_TRADE_AGREEMENT = '[Agreements] Add trade agreement',
    ADD_TRADE_AGREEMENT_COMPLETE = '[Agreements] Add trade agreement complete',
    ADD_TRADE_AGREEMENT_FAILED = '[Agreements] Add trade agreement failed',

    UPDATE_TRADE_AGREEMENT = '[Agreements] Update trade agreement',
    UPDATE_TRADE_AGREEMENT_COMPLETE = '[Agreements] Update trade agreement complete',
    UPDATE_TRADE_AGREEMENT_FAILED = '[Agreements] Update trade agreement failed',

    DELETE_TRADE_AGREEMENT = '[Agreements] Delete trade agreement',
    DELETE_TRADE_AGREEMENT_COMPLETE = '[Agreements] Delete trade agreement complete',
    DELETE_TRADE_AGREEMENT_FAILED = '[Agreements] Delete trade agreement failed',

    LOAD_TRADE_AGREEMENT_ALLOCATION_CACHE = '[Agreements] Load Trade Agreements Allocation cache',
    LOAD_TRADE_AGREEMENT_ALLOCATION_CACHE_COMPLETE = '[Agreements] Load Trade Agreements Allocation cache complete',
    LOAD_TRADE_AGREEMENT_ALLOCATION_CACHE_FAILED = '[Agreements] Load Trade Agreements Allocation cache failed',

    UPDATE_TRADE_AGREEMENT_ALLOCATION_CACHE = '[Agreements] Update Trade Agreements Allocation cache',
    UPDATE_TRADE_AGREEMENT_ALLOCATION_CACHE_COMPLETE = '[Agreements] Update Trade Agreements Allocation cache complete',
    UPDATE_TRADE_AGREEMENT_ALLOCATION_CACHE_FAILED = '[Agreements] Update Trade Agreements Allocation cache failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class ResetAgreementGrid implements Action {
    readonly type = AgreementActionTypes.RESET_AGREEMENT_GRID;
}

export class SaveAgreementGridOriginData implements Action {
    readonly type = AgreementActionTypes.SAVE_AGREEMENT_GRID_ORIGIN_DATA;

    constructor(public payload: any) {}
}



export class LoadTradeAgreementTypes implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENT_TYPES;
}

export class LoadTradeAgreementTypesComplete implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENT_TYPES_COMPLETE;

    constructor(public payload: fromModels.ITradeAgreementType[]) { }
}

export class LoadTradeAgreementTypesFailed implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENT_TYPES_FAILED;

    constructor(public payload: string) { }
}

export class SelectAgreementTypes implements Action {
    readonly type = AgreementActionTypes.SELECT_AGREEMENT_TYPES;

    constructor(public payload: fromModels.ITradeAgreementType[]) { }
}

export class ClearAgreementTypes implements Action {
    readonly type = AgreementActionTypes.CLEAR_AGREEMENT_TYPES;
}

export class LoadTradeAgreementSecTypes implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENT_SEC_TYPES;
}

export class LoadTradeAgreementSecTypesComplete implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENT_SEC_TYPES_COMPLETE;

    constructor(public payload: fromModels.ITradeAgreementSecType[]) { }
}

export class LoadTradeAgreementSecTypesFailed implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENT_SEC_TYPES_FAILED;

    constructor(public payload: string) { }
}

export class LoadTradeAgreements implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENTS;
}

export class LoadTradeAgreementsComplete implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENTS_COMPLETE;

    constructor(public payload: fromModels.ITradeAgreement[]) { }
}

export class LoadTradeAgreementsFailed implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENTS_FAILED;

    constructor(public payload: string) { }
}

export class AddTradeAgreement implements Action {
    readonly type = AgreementActionTypes.ADD_TRADE_AGREEMENT;

    constructor(public payload: fromModels.ITradeAgreement) { }
}

export class AddTradeAgreementComplete implements Action {
    readonly type = AgreementActionTypes.ADD_TRADE_AGREEMENT_COMPLETE;

    constructor(public payload: fromModels.ITradeAgreement) { }
}

export class AddTradeAgreementFailed implements Action {
    readonly type = AgreementActionTypes.ADD_TRADE_AGREEMENT_FAILED;

    constructor(public payload: string) { }
}

export class UpdateTradeAgreement implements Action {
    readonly type = AgreementActionTypes.UPDATE_TRADE_AGREEMENT;

    constructor(public payload: fromModels.ITradeAgreement) { }
}

export class UpdateTradeAgreementComplete implements Action {
    readonly type = AgreementActionTypes.UPDATE_TRADE_AGREEMENT_COMPLETE;

    constructor(public payload: fromModels.ITradeAgreement) { }
}

export class UpdateTradeAgreementFailed implements Action {
    readonly type = AgreementActionTypes.UPDATE_TRADE_AGREEMENT_FAILED;

    constructor(public payload: string) { }
}

export class DeleteTradeAgreement implements Action {
    readonly type = AgreementActionTypes.DELETE_TRADE_AGREEMENT;

    constructor(public payload: fromModels.ITradeAgreement) { }
}

export class DeleteTradeAgreementComplete implements Action {
    readonly type = AgreementActionTypes.DELETE_TRADE_AGREEMENT_COMPLETE;

    constructor(public payload: fromModels.ITradeAgreement) { }
}

export class DeleteTradeAgreementFailed implements Action {
    readonly type = AgreementActionTypes.DELETE_TRADE_AGREEMENT_FAILED;

    constructor(public payload: string) { }
}

export class LoadTradeAgreementAllocationCache implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENT_ALLOCATION_CACHE;

    constructor() { }
}

export class LoadTradeAgreementAllocationCacheComplete implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENT_ALLOCATION_CACHE_COMPLETE;

    constructor(public payload: fromModels.ITradeAgreementAllocationCache[]) { }
}

export class LoadTradeAgreementAllocationCacheFailed implements Action {
    readonly type = AgreementActionTypes.LOAD_TRADE_AGREEMENT_ALLOCATION_CACHE_FAILED;

    constructor(public payload: string) { }
}

export class UpdateTradeAgreementAllocationCache implements Action {
    readonly type = AgreementActionTypes.UPDATE_TRADE_AGREEMENT_ALLOCATION_CACHE;
}

export class UpdateTradeAgreementAllocationCacheComplete implements Action {
    readonly type = AgreementActionTypes.UPDATE_TRADE_AGREEMENT_ALLOCATION_CACHE_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateTradeAgreementAllocationCacheFailed implements Action {

    readonly type = AgreementActionTypes.UPDATE_TRADE_AGREEMENT_ALLOCATION_CACHE_FAILED;

    constructor(public payload: string) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AgreementActions
    = ResetAgreementGrid
    | SaveAgreementGridOriginData

    | LoadTradeAgreementTypes
    | LoadTradeAgreementTypesComplete
    | LoadTradeAgreementTypesFailed

    | SelectAgreementTypes
    | ClearAgreementTypes

    | LoadTradeAgreementSecTypes
    | LoadTradeAgreementSecTypesComplete
    | LoadTradeAgreementSecTypesFailed

    | LoadTradeAgreements
    | LoadTradeAgreementsComplete
    | LoadTradeAgreementsFailed

    | AddTradeAgreement
    | AddTradeAgreementComplete
    | AddTradeAgreementFailed

    | UpdateTradeAgreement
    | UpdateTradeAgreementComplete
    | UpdateTradeAgreementFailed

    | DeleteTradeAgreement
    | DeleteTradeAgreementComplete
    | DeleteTradeAgreementFailed

    | LoadTradeAgreementAllocationCache
    | LoadTradeAgreementAllocationCacheComplete
    | LoadTradeAgreementAllocationCacheFailed

    | UpdateTradeAgreementAllocationCache
    | UpdateTradeAgreementAllocationCacheComplete
    | UpdateTradeAgreementAllocationCacheFailed;

