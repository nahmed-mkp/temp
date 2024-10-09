import { Action } from '@ngrx/store';

import * as fromModels from '../../models';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum TreasuryActionTypes {
    LOAD_TREASURY = '[PricingEngine] Load treasury',
    LOAD_TREASURY_COMPLETE = '[PricingEngine] Load treasury complete',
    LOAD_TREASURY_FAILED = '[PricingEngine] Load treasury Failed',

    LOAD_AUCTION_DATES = '[PricingEngine] Load auction dates',
    LOAD_AUCTION_DATES_COMPLETE = '[PricingEngine] Load auction dates complete',
    LOAD_AUCTION_DATES_FAILED = '[PricingEngine] Load auction dates failed',

    UPDATE_TREASURY = '[PricingEngine] Update treasury',
    UPDATE_TREASURY_COMPLETE = '[PricingEngine] Update treasury complete',
    UPDATE_TREASURY_FAILED = '[PricingEngine] Update treasury failed',

    LOAD_BVAL_SECURITY_SUGGESTIONS = '[PricingEngine] Get BVAL Security Suggestions',
    LOAD_BVAL_SECURITY_SUGGESTIONS_COMPLETE = '[PricingEngine] Get BVAL Security Suggestions Complete',
    LOAD_BVAL_SECURITY_SUGGESTIONS_FAILED = '[PricingEngine] Get BVAL Security Suggestions Failed',
    RESET_BVAL_SECURITY_SUGGESTIONS = '[PricingEngine] Reset BVAL Security Suggestions',

    SAVE_BVAL_PROXY = '[PricingEngine] Save BVAL Proxy Bond',
    SAVE_BVAL_PROXY_COMPLETE = '[PricingEngine] Save BVAL Proxy Bond Complete',
    SAVE_BVAL_PROXY_FAILED = '[PricingEngine] Save BVAL Proxy Bond Failed'
}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadTreasury implements Action {
    readonly type = TreasuryActionTypes.LOAD_TREASURY;

    constructor(public payload: fromModels.TreasuriesDataReq) {}
}

export class LoadTreasuryComplete implements Action {
    readonly type = TreasuryActionTypes.LOAD_TREASURY_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadTreasuryFailed implements Action {
    readonly type = TreasuryActionTypes.LOAD_TREASURY_FAILED;

    constructor(public payload: string) { }
}

export class UpdateTreasury implements Action {
    readonly type = TreasuryActionTypes.UPDATE_TREASURY;

    constructor(public payload: fromModels.TreasuryUpdateReq) {}
}

export class UpdateTreasuryComplete implements Action {
    readonly type = TreasuryActionTypes.UPDATE_TREASURY_COMPLETE;

    constructor(public payload: any) { }
}

export class UpdateTreasuryFailed implements Action {
    readonly type = TreasuryActionTypes.UPDATE_TREASURY_FAILED;

    constructor(public payload: string) { }
}








export class LoadAuctionDates implements Action {
    readonly type = TreasuryActionTypes.LOAD_AUCTION_DATES;
}

export class LoadAuctionDatesComplete implements Action {
    readonly type = TreasuryActionTypes.LOAD_AUCTION_DATES_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadAuctionDatesFailed implements Action {
    readonly type = TreasuryActionTypes.LOAD_AUCTION_DATES_FAILED;

    constructor(public payload: string) { }
}


export class LoadBVALSecSuggestions implements Action {
    readonly type = TreasuryActionTypes.LOAD_BVAL_SECURITY_SUGGESTIONS;

    constructor(public payload: any) {}
}

export class LoadBVALSecSuggestionsComplete implements Action { 
    readonly type = TreasuryActionTypes.LOAD_BVAL_SECURITY_SUGGESTIONS_COMPLETE;

    constructor(public payload: fromModels.IBVALSuggestion[]) { }
}

export class LoadBVALSecSuggestionsFailed implements Action {  
    readonly type = TreasuryActionTypes.LOAD_BVAL_SECURITY_SUGGESTIONS_FAILED;

    constructor(public payload: string) { }
}

export class ResetBVALSecSuggestions implements Action {  
    readonly type = TreasuryActionTypes.RESET_BVAL_SECURITY_SUGGESTIONS;
}


export class SaveBVALProxy implements Action {
    readonly type = TreasuryActionTypes.SAVE_BVAL_PROXY;

    constructor(public payload: fromModels.IBVALProxyReq) {}
}

export class SaveBVALProxyComplete implements Action {
    readonly type = TreasuryActionTypes.SAVE_BVAL_PROXY_COMPLETE;

    constructor(public payload: any) { }
}

export class SaveBVALProxyFailed implements Action {    
    readonly type = TreasuryActionTypes.SAVE_BVAL_PROXY_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TreasuryActions
    = LoadTreasury
    | LoadTreasuryComplete
    | LoadTreasuryFailed

    | LoadAuctionDates
    | LoadAuctionDatesComplete
    | LoadAuctionDatesFailed

    | UpdateTreasury
    | UpdateTreasuryComplete
    | UpdateTreasuryFailed

    | LoadBVALSecSuggestions
    | LoadBVALSecSuggestionsComplete
    | LoadBVALSecSuggestionsFailed
    | ResetBVALSecSuggestions

    | SaveBVALProxy
    | SaveBVALProxyComplete
    | SaveBVALProxyFailed;