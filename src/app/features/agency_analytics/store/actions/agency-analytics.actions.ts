import { Action } from '@ngrx/store';

import * as fromModels from '../../models';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AgencyAnalyticsActionTypes {

    TOGGLE_LIVE_OR_CLOSE_MODE = '[AgencyAnalytics] Change live/close mode',

    LOAD_LOOKUPS = '[AgencyAnalytics] Load lookups',
    LOAD_LOOKUPS_COMPLETE = '[AgencyAnalytics] Load lookups complete',
    LOAD_LOOKUPS_FAILED = '[AgencyAnalytics] Load lookups failed',

    CREATE_PORTFOLIO = '[AgencyAnalytics] Create portfolio',
    CREATE_PORTFOLIO_COMPLETE = '[AgencyAnalytics] Create portfolio complete',
    CREATE_PORTFOLIO_FAILED = '[AgencyAnalytics] Create portfolio failed',

    SAVE_PORTFOLIO = '[AgencyAnalytics] Save portfolio',
    SAVE_PORTFOLIO_COMPLETE = '[AgencyAnalytics] Save portolio complete',
    SAVE_PORTFOLIO_FAILED = '[AgencyAnalytics] Save portfolio failed',

    LOAD_PORTFOLIOS = '[AgencyAnalytics] Load portfolios',
    LOAD_PORTFOLIOS_COMPLETE = '[AgencyAnalytics] Load portfolios complete',
    LOAD_PORTFOLIOS_FAILED = '[AgencyAnalytics] Load portfolios failed',

    LOAD_PORTFOLIO = '[AgencyAnalytics] Load portfolio',
    LOAD_PORTFOLIO_COMPLETE = '[AgencyAnalytics] Load portfolio complete',
    LOAD_PORTFOLIO_FAILED = '[AgencyAnalytics] Load portfolio failed',

    RELOAD_PORTFOLIO = '[AgencyAnalytics] Reload portfolio',
    RELOAD_PORTFOLIO_COMPLETE = '[AgencyAnalytics] Reload portfolio complete',
    RELOAD_PORTFOLIO_FAILED = '[AgencyAnalytics] Reload portfolio failed',

    UPDATE_PORTFOLIO = '[AgencyAnalytics] Update portfolio',
    UPDATE_PORTFOLIO_COMPLETE = '[AgencyAnalytics] Update portfolio complete',
    UPDATE_PORTFOLIO_FAILED = '[AgencyAnalytics] Update portfolio failed',

    DELETE_PORTFOLIO = '[AgencyAnalytics] Delete portfolio',
    DELETE_PORTFOLIO_COMPLETE = '[AgencyAnalytics] Delete portfolio complete',
    DELETE_PORTFOLIO_FAILED = '[AgencyAnalytics] Delete portfolio failed',

    SEARCH_SECURITY = '[Agency Analytics] Search security',
    SEARCH_SECURITY_COMPLETE = '[Agency Analytics] Search security complete',
    SEARCH_SECURITY_FAILED = '[Agency Analytics] Search security failed',
    
    VALIDATE_SECURITIES = '[Agency Analytics] Validate securities',
    VALIDATE_SECURITIES_COMPLETE = '[Agency Analytics] Validate securities complete',
    VALIDATE_SECURITIES_FAILED = '[Agency Analytics] Validate securities failed',    

    // UI Only actions
    EXPAND_NODE = '[Agency Analytics] Expand Portfolio',
    COLLAPSE_NODE = '[Agency Analytics] Collapse Portfolio',

    RESET_CREATION_STATE = '[Agency Analytics] Reset Creation State',
    SELECT_PORTFOLIO = '[Agency Analytics] Select Portfolio',
    CLOSE_PORTFOLIO = '[Agency Analytics] Close Portfolio',
    CHANGE_PORTFOLIO_GRID_VIEWS = '[Agency Analytics] Change Portfolio Grid Views'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadLookups implements Action {
    readonly type = AgencyAnalyticsActionTypes.LOAD_LOOKUPS;
}

export class LoadLookupsComplete implements Action {
    readonly type = AgencyAnalyticsActionTypes.LOAD_LOOKUPS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadLookupsFailed implements Action {
    readonly type = AgencyAnalyticsActionTypes.LOAD_LOOKUPS_FAILED;

    constructor(public payload: string) { }
}

export class ToggleLiveCloseMode implements Action { 
    readonly type = AgencyAnalyticsActionTypes.TOGGLE_LIVE_OR_CLOSE_MODE;
}

export class LoadPortfolios implements Action {
    readonly type = AgencyAnalyticsActionTypes.LOAD_PORTFOLIOS;
}

export class LoadPortfoliosComplete implements Action {
    readonly type = AgencyAnalyticsActionTypes.LOAD_PORTFOLIOS_COMPLETE;

    constructor(public payload: fromModels.IPortfolio[]) { }
}

export class LoadPortfoliosFailed implements Action {
    readonly type = AgencyAnalyticsActionTypes.LOAD_PORTFOLIOS_FAILED;

    constructor(public payload: string) { }
}

export class CreatePortfolio implements Action {
    readonly type = AgencyAnalyticsActionTypes.CREATE_PORTFOLIO;

    constructor(public payload: fromModels.INewPortfolio) { }
}

export class CreatePortfolioComplete implements Action {
    readonly type = AgencyAnalyticsActionTypes.CREATE_PORTFOLIO_COMPLETE;

    constructor(public payload: fromModels.IPortfolio) { }
}

export class CreatePortfolioFailed implements Action {
    readonly type = AgencyAnalyticsActionTypes.CREATE_PORTFOLIO_FAILED;

    constructor(public payload: string) { }
}

export class UpdatePortfolio implements Action {
    readonly type = AgencyAnalyticsActionTypes.UPDATE_PORTFOLIO;

    constructor(public payload: fromModels.IPortfolio) { }
}

export class UpdatePortfolioComplete implements Action {
    readonly type = AgencyAnalyticsActionTypes.UPDATE_PORTFOLIO_COMPLETE;

    constructor(public payload: fromModels.IPortfolio) { }
}

export class UpdatePortfolioFailed implements Action {
    readonly type = AgencyAnalyticsActionTypes.UPDATE_PORTFOLIO_FAILED;

    constructor(public payload: string) { }
}

export class DeletePortfolio implements Action {
    readonly type = AgencyAnalyticsActionTypes.DELETE_PORTFOLIO;

    constructor(public payload: fromModels.IPortfolio) { }
}

export class DeletePortfolioComplete implements Action {
    readonly type = AgencyAnalyticsActionTypes.DELETE_PORTFOLIO_COMPLETE;

    constructor(public payload: fromModels.IPortfolio) { }
}

export class DeletePortfolioFailed implements Action {
    readonly type = AgencyAnalyticsActionTypes.DELETE_PORTFOLIO_FAILED;

    constructor(public payload: string) { }
}

export class LoadPortfolio implements Action {
    readonly type = AgencyAnalyticsActionTypes.LOAD_PORTFOLIO;

    constructor(public portfolio: fromModels.IPortfolio) { }
}

export class LoadPortfolioComplete implements Action {
    readonly type = AgencyAnalyticsActionTypes.LOAD_PORTFOLIO_COMPLETE;

    constructor(public portfolio: fromModels.IPortfolio, public details: fromModels.IPortfolioDetail) { }
}

export class LoadPortfolioFailed implements Action {
    readonly type = AgencyAnalyticsActionTypes.LOAD_PORTFOLIO_FAILED;

    constructor(public portfolio: fromModels.IPortfolio, public payload: string) { }
}


export class ReloadPortfolio implements Action {
    readonly type = AgencyAnalyticsActionTypes.RELOAD_PORTFOLIO;

    constructor(public portfolio: fromModels.IPortfolio) { }
}

export class ReloadPortfolioComplete implements Action {
    readonly type = AgencyAnalyticsActionTypes.RELOAD_PORTFOLIO_COMPLETE;

    constructor(public portfolio: fromModels.IPortfolio, public details: fromModels.IPortfolioDetail) { }
}

export class ReloadPortfolioFailed implements Action {
    readonly type = AgencyAnalyticsActionTypes.RELOAD_PORTFOLIO_FAILED;

    constructor(public portfolio: fromModels.IPortfolio, public payload: string) { }
}

export class SearchSecurity implements Action {
    readonly type = AgencyAnalyticsActionTypes.SEARCH_SECURITY;

    constructor(public payload: fromModels.IQuickSearch) { }
}

export class SearchSecurityComplete implements Action {
    readonly type = AgencyAnalyticsActionTypes.SEARCH_SECURITY_COMPLETE;

    constructor(public payload: fromModels.ISearchResult) { }
}

export class SearchSecurityFailed implements Action {
    readonly type = AgencyAnalyticsActionTypes.SEARCH_SECURITY_FAILED;

    constructor(public payload: string) { }
}

export class ValidateSecurities implements Action {
    readonly type = AgencyAnalyticsActionTypes.VALIDATE_SECURITIES;

    constructor(public payload: string[]) { }
}

export class ValidateSecuritiesComplete implements Action {
    readonly type = AgencyAnalyticsActionTypes.VALIDATE_SECURITIES_COMPLETE;

    constructor(public payload: fromModels.IValidSecurity[]) { }
}

export class ValidateSecuritiesFailed implements Action {
    readonly type = AgencyAnalyticsActionTypes.VALIDATE_SECURITIES_FAILED;

    constructor(public payload: string) { }
}

export class ResetCreationState implements Action {
    readonly type = AgencyAnalyticsActionTypes.RESET_CREATION_STATE;
}

export class SelectPortfolio implements Action {
    readonly type = AgencyAnalyticsActionTypes.SELECT_PORTFOLIO;

    constructor(public portfolio: fromModels.IPortfolio) { }
}

export class ClosePortfolio implements Action {
    readonly type = AgencyAnalyticsActionTypes.CLOSE_PORTFOLIO;

    constructor(public portfolio: fromModels.IPortfolio) { }
}

export class ChangePortfolioGridViews implements Action {
    readonly type = AgencyAnalyticsActionTypes.CHANGE_PORTFOLIO_GRID_VIEWS;

    constructor(public portfolio: fromModels.IPortfolio, public selectedViews: fromModels.IGridViews) { }
}

export class ExpandNode implements Action {
    readonly type = AgencyAnalyticsActionTypes.EXPAND_NODE;

    constructor(public node: fromModels.TreeNode) { }
}

export class CollapseNode implements Action {
    readonly type = AgencyAnalyticsActionTypes.COLLAPSE_NODE;

    constructor(public node: fromModels.TreeNode) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AgencyAnalyticsActions

    = ToggleLiveCloseMode

    | LoadLookups
    | LoadLookupsComplete
    | LoadLookupsFailed
    
    | LoadPortfolios
    | LoadPortfoliosComplete
    | LoadPortfoliosFailed
    
    | CreatePortfolio
    | CreatePortfolioComplete
    | CreatePortfolioFailed

    | UpdatePortfolio
    | UpdatePortfolioComplete
    | UpdatePortfolioFailed

    | DeletePortfolio
    | DeletePortfolioComplete
    | DeletePortfolioFailed
    
    | LoadPortfolio
    | LoadPortfolioComplete
    | LoadPortfolioFailed

    | ReloadPortfolio
    | ReloadPortfolioComplete
    | ReloadPortfolioFailed
    
    | SearchSecurity
    | SearchSecurityComplete
    | SearchSecurityFailed
    
    | ValidateSecurities
    | ValidateSecuritiesComplete
    | ValidateSecuritiesFailed
    
    | ResetCreationState

    | SelectPortfolio
    | ClosePortfolio
    | ChangePortfolioGridViews
    
    | ExpandNode
    | CollapseNode;
