import { Action } from '@ngrx/store';

import * as fromModels from './../../models/pool-viewer.models';
import * as fromLookupModels from './../../models/lookups.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PortfolioActionTypes {

    SET_SHORTCUT_PORTFOLIOS = '[Portfolios] Set shortcut portfolios',

    LOAD_ALL_LOOKUPS = '[Portfolios] Load all lookups',
    LOAD_ALL_LOOKUPS_COMPLETE = '[Portfolios] Load all lookups complete',
    LOAD_ALL_LOOKUPS_FAILED = '[Portfolios] Load all lookups failed',

    LOAD_PORTFOLIOS = '[Portfolios] Load portfolios',
    LOAD_PORTFOLIOS_COMPLETE = '[Portfolios] Load portfolios complete',
    LOAD_PORTFOLIOS_FAILED = '[Portfolios] Load portfolios failed',

    CREATE_TEMP_PORTFOLIO = '[Portfolios] Create Tempary portfolio',
    CREATE_TEMP_PORTFOLIO_WITH_EXPLODE_DATA = '[Portfolios] Create Tempary portfolio with explode data',

    CREATE_EMPTY_PORTFOLIO = '[Portfolios] Create empty portfolio',
    CREATE_EMPTY_PORTFOLIO_COMPLETE = '[Portfolios] Create empty portfolio complete',
    CREATE_EMPTY_PORTFOLIO_FAILED = '[Portfolios] Create empty portfolio failed',

    CREATE_PORTFOLIO_FROM_SELECTION = '[Portfolios] Create portfolio from selection',
    CREATE_PORTFOLIO_FROM_SELECTION_COMPLETE = '[Portfolios] Create portfolio from selection complete',
    CREATE_PORTFOLIO_FROM_SELECTION_FAILED = '[Portfolios] Create portfolio from selection failed',

    CLONE_PORTFOLIO = '[Portfolios] Clone portfolio',
    CLONE_PORTFOLIO_COMPLETE = '[Portfolios] Clone portfolio complete',
    CLONE_PORTFOLIO_FAILED = '[Portfolios] Clone portfolio failed',

    ADD_CUSIPS_TO_PORTFOLIO = '[Portfolios] Add cusips to portfolio',
    ADD_CUSIPS_TO_PORTFOLIO_COMPLETE = '[Portfolios] Add cusips to portfolio complete',
    ADD_CUSIPS_TO_PORTFOLIO_FAILED = '[Portfolios] Add cusips to portfolio failed',

    LOAD_DEFAULT_SCENARIO = '[Portfolios] load default scenario',
    LOAD_DEFAULT_SCENARIO_COMPLETE = '[Portfolios] load default scenario complete',
    LOAD_DEFAULT_SCENARIO_FAILED = '[Portfolios] load default scenario failed',


    // ----------------------------------------------------------------------------------------

    LOAD_PORTFOLIO_MODEL_VALIDATION_DETAIL = '[Portfolios] load portfolio model validation detail',
    LOAD_PORTFOLIO_MODEL_VALIDATION_DETAIL_COMPLETE = '[Portfolios] load portfolio model validation detail complete',
    LOAD_PORTFOLIO_MODEL_VALIDATION_DETAIL_FAILED = '[Portfolios] load portfolio model validation detail failed',

    LOAD_PORTFOLIO_MODEL_VALIDATION_SUMMARY = '[Portfolios] load portfolio model validation summary',
    LOAD_PORTFOLIO_MODEL_VALIDATION_SUMMARY_COMPLETE = '[Portfolios] load portfolio model validation summary complete',
    LOAD_PORTFOLIO_MODEL_VALIDATION_SUMMARY_FAILED = '[Portfolios] load portfolio model validation summary failed',


    // --------------------------------------------------------------------------------------

    TOGGLE_BIDLISTS_VIEWING = '[Portfolios] toggle bidlists view',
    LOAD_BIDLISTS = '[Portfolios] load bidlists',
    LOAD_BIDLISTS_COMPLETE = '[Portfolios] load bidlists complete',
    LOAD_BIDLISTS_FAILED = '[Portfolios] load bidlists failed',

    // -------------------------------------------------------------------------------------

    LOAD_RISK_FREE_RATE = '[Portfolios] load risk free rate',
    LOAD_RISK_FREE_RATE_COMPLETE = '[Portfolios] load risk free rate complete',
    LOAD_RISK_FREE_RATE_FAILED = '[Portfolios] load risk free rate failed',

    UPDATE_RISK_FREE_RATE = '[Portfolios] Update risk free rate',
    UPDATE_RISK_FREE_RATE_COMPLETE = '[Portfolios] Update risk free rate complete',
    UPDATE_RISK_FREE_RATE_FAILED = '[Portfolios] Update risk free rate failed',

    // UI Action
    ADD_ACTIVE_PORTFOLIO_ACTION = '[Portfolios] Add Active Portfolio',
    REMOVE_ACTIVE_PORTFOLIO_ACTION = '[Portfolios] Remove Active Portfolio'
}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class SetShortcutPortfolios implements Action {
    readonly type = PortfolioActionTypes.SET_SHORTCUT_PORTFOLIOS;

    constructor(public payload: {cashPortfolio: number; deliverablePortfolio: number; tbaPortfolio: number}) {}
}





export class LoadAllLookups implements Action {
    readonly type = PortfolioActionTypes.LOAD_ALL_LOOKUPS;
}

export class LoadAllLookupsComplete implements Action {
    readonly type = PortfolioActionTypes.LOAD_ALL_LOOKUPS_COMPLETE;

    constructor(public payload: fromLookupModels.ILookups) { }
}

export class LoadAllLookupsFailed implements Action {
    readonly type = PortfolioActionTypes.LOAD_ALL_LOOKUPS_FAILED;

    constructor(public payload: string) { }
}

export class LoadPortfolios implements Action {
    readonly type = PortfolioActionTypes.LOAD_PORTFOLIOS;
}

export class LoadPortfoliosComplete implements Action {
    readonly type = PortfolioActionTypes.LOAD_PORTFOLIOS_COMPLETE;

    constructor(public payload: fromModels.Portfolio[]) { }
}

export class LoadPortfoliosFailed implements Action {
    readonly type = PortfolioActionTypes.LOAD_PORTFOLIOS_FAILED;

    constructor(public payload: string) { }
}

export class CreateTempPortfolio implements Action {
    readonly type = PortfolioActionTypes.CREATE_TEMP_PORTFOLIO;

    constructor(public payload?: fromModels.Security[]) {}
}

export class CreateTempPortfolioWithExplodeData implements Action {
    readonly type = PortfolioActionTypes.CREATE_TEMP_PORTFOLIO_WITH_EXPLODE_DATA;

    constructor(public payload: {name: string; data: string[]}) {}
}





export class CreatePortfolio implements Action {
    readonly type = PortfolioActionTypes.CREATE_EMPTY_PORTFOLIO;

    constructor(public payload: fromModels.Portfolio) {}
}

export class CreatePortfolioComplete implements Action {
    readonly type = PortfolioActionTypes.CREATE_EMPTY_PORTFOLIO_COMPLETE;

    constructor(public payload: fromModels.Portfolio) {}
}

export class CreatePortfolioFailed implements Action {
    readonly type = PortfolioActionTypes.CREATE_EMPTY_PORTFOLIO_FAILED;

    constructor(public payload: string) {}
}

export class CreatePortfolioFromSelection implements Action {
    readonly type = PortfolioActionTypes.CREATE_PORTFOLIO_FROM_SELECTION;

    constructor(public payload: {portfolio: fromModels.Portfolio, securities: fromModels.Security[]}) {}
}

export class CreatePortfolioFromSelectionComplete implements Action {
    readonly type = PortfolioActionTypes.CREATE_PORTFOLIO_FROM_SELECTION;

    constructor(public payload: {portfolio: fromModels.Portfolio, securities: fromModels.Security[]}) {}
}

export class CreatePortfolioFromSelectionFailed implements Action {
    readonly type = PortfolioActionTypes.CREATE_PORTFOLIO_FROM_SELECTION;

    constructor(public payload: string) {}
}

export class ClonePortfolio implements Action {
    readonly type = PortfolioActionTypes.CLONE_PORTFOLIO;

    constructor(public payload: fromModels.Portfolio) {}
}

export class ClonePortfolioComplete implements Action {
    readonly type = PortfolioActionTypes.CLONE_PORTFOLIO_COMPLETE;

    constructor(public payload: fromModels.NewPortfolio) {}
}

export class ClonePortfolioFailed implements Action {
    readonly type = PortfolioActionTypes.CLONE_PORTFOLIO_FAILED;

    constructor(public payload: string) {}
}

export class AddCusipsToPortfolio implements Action {
    readonly type = PortfolioActionTypes.ADD_CUSIPS_TO_PORTFOLIO;

    constructor(public payload: fromModels.cusipsAddOrRemove) {}
}

export class AddCusipsToPortfolioComplete implements Action {
    readonly type = PortfolioActionTypes.ADD_CUSIPS_TO_PORTFOLIO_COMPLETE;

    constructor(public payload: fromModels.cusipsAddOrRemoveResponse) {}
}

export class AddCusipsToPortfolioFailed implements Action {
    readonly type = PortfolioActionTypes.ADD_CUSIPS_TO_PORTFOLIO_FAILED;

    constructor(public payload: string) {}
}

export class RemoveActivePortfolio implements Action {
    readonly type = PortfolioActionTypes.REMOVE_ACTIVE_PORTFOLIO_ACTION;

    constructor(public payload: string) {}
}

export class AddActivePortfolio implements Action {
    readonly type = PortfolioActionTypes.ADD_ACTIVE_PORTFOLIO_ACTION;

    constructor(public payload: string | number) {}
}


export class LoadDefaultScenario implements Action {
    readonly type = PortfolioActionTypes.LOAD_DEFAULT_SCENARIO;
}

export class LoadDefaultScenarioComplete implements Action {
    readonly type = PortfolioActionTypes.LOAD_DEFAULT_SCENARIO_COMPLETE;

    constructor(public payload: fromModels.defaultScenario[]) {}
}

export class LoadDefaultScenarioFailed implements Action {
    readonly type = PortfolioActionTypes.LOAD_DEFAULT_SCENARIO_FAILED;

    constructor(public payload: string) {}
}

// ----------------------------------------------------------------------------

export class LoadPortfolioModelValidationDetail implements Action {
    readonly type = PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_DETAIL;

    constructor(public payload: fromModels.PortfolioModelValidationRequest) {}
}

export class LoadPortfolioModelValidationDetailComplete implements Action {
    readonly type = PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_DETAIL_COMPLETE;

    constructor(public payload:  {cusip: string; data: any[]}) {}
}

export class LoadPortfolioModelValidationDetailFailed implements Action {
    readonly type = PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_DETAIL_FAILED;

    constructor(public payload: string) {}
}


export class LoadPortfolioModelValidationSummary implements Action {
    readonly type = PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_SUMMARY;

    constructor(public payload: fromModels.PortfolioModelValidationRequest) {}
}

export class LoadPortfolioModelValidationSummaryComplete implements Action {
    readonly type = PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_SUMMARY_COMPLETE;

    constructor(public payload: {cusip: string; data: any[]}) {}
}

export class LoadPortfolioModelValidationSummaryFailed implements Action {
    readonly type = PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_SUMMARY_FAILED;

    constructor(public payload: string) {}
}

// --------------------------------------------------------------------------------

export class ToggleBidlistsView implements Action {
    readonly type = PortfolioActionTypes.TOGGLE_BIDLISTS_VIEWING;
}

export class LoadBidlists implements Action {
    readonly type = PortfolioActionTypes.LOAD_BIDLISTS;

    constructor(public payload: fromModels.BidlistsRequest) {}
}

export class LoadBidlistsComplete implements Action {
    readonly type = PortfolioActionTypes.LOAD_BIDLISTS_COMPLETE;

    constructor(public payload: {requestType: string; data: any[]}) {}
}

export class LoadBidlistsFailed implements Action {
    readonly type = PortfolioActionTypes.LOAD_BIDLISTS_FAILED;

    constructor(public payload: {requestType: string; error: string}) {}
}



// -----------------------------------------------------------------------------

export class LoadRiskFreeRate implements Action {
    readonly type = PortfolioActionTypes.LOAD_RISK_FREE_RATE;
}

export class LoadRiskFreeRateComplete implements Action {
    readonly type = PortfolioActionTypes.LOAD_RISK_FREE_RATE_COMPLETE;

    constructor(public payload: number) { }
}

export class LoadRiskFreeRateError implements Action {
    readonly type = PortfolioActionTypes.LOAD_RISK_FREE_RATE_FAILED;

    constructor(public payload: string) {}
}

export class UpdateRiskFreeRate implements Action {
    readonly type =  PortfolioActionTypes.UPDATE_RISK_FREE_RATE;

    constructor(public payload: number) {}
}

export class UpdateRiskFreeRateComplete implements Action {
    readonly type = PortfolioActionTypes.UPDATE_RISK_FREE_RATE_COMPLETE;

    constructor(public payload: any) {}
}

export class UpdateRiskFreeRateFailed implements Action {
    readonly type =  PortfolioActionTypes.UPDATE_RISK_FREE_RATE_FAILED;

    constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PortfolioActions
        = SetShortcutPortfolios
        
        | LoadAllLookups
        | LoadAllLookupsComplete
        | LoadAllLookupsFailed

        | LoadPortfolios
        | LoadPortfoliosComplete
        | LoadPortfoliosFailed

        | CreateTempPortfolio
        | CreateTempPortfolioWithExplodeData

        | CreatePortfolio
        | CreatePortfolioComplete
        | CreatePortfolioFailed

        | CreatePortfolioFromSelection
        | CreatePortfolioFromSelectionComplete
        | CreatePortfolioFromSelectionFailed

        | ClonePortfolio
        | ClonePortfolioComplete
        | ClonePortfolioFailed

        | AddCusipsToPortfolio
        | AddCusipsToPortfolioComplete
        | AddCusipsToPortfolioFailed

        | RemoveActivePortfolio
        | AddActivePortfolio

        | LoadDefaultScenario
        | LoadDefaultScenarioComplete
        | LoadDefaultScenarioFailed

        | LoadPortfolioModelValidationDetail
        | LoadPortfolioModelValidationDetailComplete
        | LoadPortfolioModelValidationDetailFailed

        | LoadPortfolioModelValidationSummary
        | LoadPortfolioModelValidationSummaryComplete
        | LoadPortfolioModelValidationSummaryFailed

        | ToggleBidlistsView
        | LoadBidlists
        | LoadBidlistsComplete
        | LoadBidlistsFailed

        | LoadRiskFreeRate
        | LoadRiskFreeRateComplete
        | LoadRiskFreeRateError

        | UpdateRiskFreeRate
        | UpdateRiskFreeRateComplete
        | UpdateRiskFreeRateFailed;
