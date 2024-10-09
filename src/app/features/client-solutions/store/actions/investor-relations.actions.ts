import { Action } from '@ngrx/store';
import * as fromModels from '../../models';

export enum InvestorRelationsActionsType {

    LOAD_TABS= '[ClientSolutions] load investor relations tabs',
    LOAD_TABS_COMPLETE = '[ClientSolutions] load investor relations tabs complete',
    LOAD_TABS_FAILED = '[ClientSolutions] load investor relations tabs failed',

    LOAD_ADMIN_STATEMENTS = '[ClientSolutions] Load admin statements',
    LOAD_ADMIN_STATEMENTS_COMPLETE = '[ClientSolutions] Load admin statements complete',
    LOAD_ADMIN_STATEMENTS_FAILED = '[ClientSolutions] Load admin statements failed',

    LOAD_FIRM_AUM_BALANCES= '[ClientSolutions] load investor relations firm AUM balances',
    LOAD_FIRM_AUM_BALANCES_COMPLETE = '[ClientSolutions] load investor relations firm AUM balances complete',
    LOAD_FIRM_AUM_BALANCES_FAILED = '[ClientSolutions] load investor relations firm AUM balancess failed',

    LOAD_FIRM_RELATIONS_LIST = '[ClientSolutions] load investor relations list',
    LOAD_FIRM_RELATIONS_LIST_COMPLETE = '[ClientSolutions] load investor relations list complete',
    LOAD_FIRM_RELATIONS_LIST_FAILED = '[ClientSolutions] load investor list failed',

    LOAD_FIRM_TOP_10_INVESTORS = '[ClientSolutions] load investor relations firm top 10',
    LOAD_FIRM_TOP_10_INVESTORS_COMPLETE = '[ClientSolutions] load investor relations firm top 10 complete',
    LOAD_FIRM_TOP_10_INVESTORS_FAILED = '[ClientSolutions] load investor relations firm top 10 failed',

    LOAD_FIRM_INVESTOR_TYPES = '[ClientSolutions] load investor relations firm investor types',
    LOAD_FIRM_INVESTOR_TYPES_COMPLETE = '[ClientSolutions] load investor relations firm investor types complete',
    LOAD_FIRM_INVESTOR_TYPES_FAILED = '[ClientSolutions] load investor relations firm investor types failed',

    LOAD_FIRM_REGIONS = '[ClientSolutions] load investor relations firm regions',
    LOAD_FIRM_REGIONS_COMPLETE = '[ClientSolutions] load investor relations firm regions complete',
    LOAD_FIRM_REGIONS_FAILED = '[ClientSolutions] load investor relations firm regions failed',

    LOAD_FUND_AUM_BALANCES= '[ClientSolutions] load investor relations fund AUM balances',
    LOAD_FUND_AUM_BALANCES_COMPLETE = '[ClientSolutions] load investor relations fund AUM balances complete',
    LOAD_FUND_AUM_BALANCES_FAILED = '[ClientSolutions] load investor relations fund AUM balancess failed',

    LOAD_FUND_TOP_10_INVESTORS = '[ClientSolutions] load investor relations fund top 10',
    LOAD_FUND_TOP_10_INVESTORS_COMPLETE = '[ClientSolutions] load investor relations fund top 10 complete',
    LOAD_FUND_TOP_10_INVESTORS_FAILED = '[ClientSolutions] load investor fund top 10 failed',

    LOAD_FUND_INVESTOR_TYPES = '[ClientSolutions] load investor relations fund investor types',
    LOAD_FUND_INVESTOR_TYPES_COMPLETE = '[ClientSolutions] load investor relations fund investor types complete',
    LOAD_FUND_INVESTOR_TYPES_FAILED = '[ClientSolutions] load investor relations fund investor types failed',

    LOAD_FUND_REGIONS = '[ClientSolutions] load investor relations fund regions',
    LOAD_FUND_REGIONS_COMPLETE = '[ClientSolutions] load investor relations fund regions complete',
    LOAD_FUND_REGIONS_FAILED = '[ClientSolutions] load investor relations fund regions failed',

    LOAD_INVESTORS = '[ClientSolutions] load investors',
    LOAD_INVESTORS_COMPLETE = '[ClientSolutions] load investors complete',
    LOAD_INVESTORS_FAILED = '[ClientSolutions] load investors failed',

    EDIT_INVESTOR = '[ClientSolutions] Edit Investor',
    EDIT_INVESTOR_COMPLETE = '[ClientSolutions] Edit Investor complete',
    EDIT_INVESTOR_FAILED = '[ClientSolutions] Edit Investor failed',

    DELETE_INVESTOR = '[ClientSolutions] Delete Investor',
    DELETE_INVESTOR_COMPLETE = '[ClientSolutions] Delete Investor complete',
    DELETE_INVESTOR_FAILED = '[ClientSolutions] Delete Investor failed',

    GET_PERMISSIONS = '[ClientSolutions] Get can edit Investor Details',
    GET_PERMISSIONS_COMPLETE = '[ClientSolutions] Get can edit Investor Details complete',
    GET_PERMISSIONS_FAILED = '[ClientSolutions] Get can edit Investor Details failed',

    LOAD_ADMIN_STATEMENT_EXCEPTIONS = '[ClientSolutions] Load admin statement exceptions',
    LOAD_ADMIN_STATEMENT_EXCEPTIONS_COMPLETE = '[ClientSolutions] Load admin statement exceptions complete',
    LOAD_ADMIN_STATEMENT_EXCEPTIONS_FAILED = '[ClientSolutions] Load admin statement exceptions failed',
    
    LOAD_STATEMENT_DATES = '[ClientSolutions] Load statement dates',
    LOAD_STATEMENT_DATES_COMPLETE = '[ClientSolutions] Load statement dates complete',
    LOAD_STATEMENT_DATES_FAILED = '[ClientSolutions] Load statement dates complete',
}

export class LoadTabs implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_TABS;
    constructor() { }
}

export class LoadTabsDataComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_TABS_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadTabsDataFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_TABS_FAILED;
    constructor(public payload: string) { }
}

export class LoadAdminStatements implements Action {

    readonly type = InvestorRelationsActionsType.LOAD_ADMIN_STATEMENTS;

    constructor(public payload: fromModels.DateRange) { }
}

export class LoadAdminStatementsComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_ADMIN_STATEMENTS_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadAdminStatementsFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_ADMIN_STATEMENTS_FAILED;
    constructor(public payload: string) { }
}

export class LoadFirmAUMBalances implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_AUM_BALANCES;
    constructor(public payload: any) { }
}

export class LoadFirmAUMBalancesComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_AUM_BALANCES_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadFirmAUMBalancesFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_AUM_BALANCES_FAILED;
    constructor(public payload: string) { }
}

export class LoadFirmRelationsList implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_RELATIONS_LIST;
    constructor(public payload: any) { }
}

export class LoadFirmRelationsListComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_RELATIONS_LIST_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadFirmRelationsListFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_RELATIONS_LIST_FAILED;
    constructor(public payload: string) { }
}

export class LoadFirmRelationsTop10 implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_TOP_10_INVESTORS;
    constructor(public payload: any) { }
}

export class LoadFirmRelationsTop10Complete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_TOP_10_INVESTORS_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadFirmRelationsTop10Failed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_TOP_10_INVESTORS_FAILED;
    constructor(public payload: string) { }
}

export class LoadFirmInvestorTypes implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_INVESTOR_TYPES;
    constructor(public payload: any) { }
}

export class LoadFirmInvestorTypesComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_INVESTOR_TYPES_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadFirmInvestorTypesFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_INVESTOR_TYPES_FAILED;
    constructor(public payload: string) { }
}


export class LoadFirmRegions implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_REGIONS;
    constructor(public payload: any) { }
}

export class LoadFirmRegionsComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_REGIONS_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadFirmRegionsFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FIRM_REGIONS_FAILED;
    constructor(public payload: string) { }
}


/* ============= FUND ========== */

export class LoadFundAUMBalances implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_AUM_BALANCES;
    constructor(public payload: any) { }
}

export class LoadFundAUMBalancesComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_AUM_BALANCES_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadFundAUMBalancesFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_AUM_BALANCES_FAILED;
    constructor(public payload: string) { }
}

export class LoadFundRelationsTop10 implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_TOP_10_INVESTORS;
    constructor(public payload: any) { }
}

export class LoadFundRelationsTop10Complete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_TOP_10_INVESTORS_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadFundRelationsTop10Failed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_TOP_10_INVESTORS_FAILED;
    constructor(public payload: string) { }
}


export class LoadFundInvestorTypes implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_INVESTOR_TYPES;
    constructor(public payload: any) { }
}

export class LoadFundInvestorTypesComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_INVESTOR_TYPES_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadFundInvestorTypesFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_INVESTOR_TYPES_FAILED;
    constructor(public payload: string) { }
}

export class LoadFundRegions implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_REGIONS;
    constructor(public payload: any) { }
}

export class LoadFundRegionsComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_REGIONS_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadFundRegionsFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_FUND_REGIONS_FAILED;
    constructor(public payload: string) { }
}


export class LoadInvestors implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_INVESTORS;
    constructor() { }
}

export class LoadInvestorsComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_INVESTORS_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadInvestorsFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_INVESTORS_FAILED;
    constructor(public payload: string) { }
}


export class EditInvestor implements Action {
    readonly type = InvestorRelationsActionsType.EDIT_INVESTOR;
    constructor(public payload: any) { }
}

export class EditInvestorComplete implements Action {
    readonly type = InvestorRelationsActionsType.EDIT_INVESTOR_COMPLETE;
    constructor(public payload: any[]) { }
}

export class EditInvestorFailed implements Action {
    readonly type = InvestorRelationsActionsType.EDIT_INVESTOR_FAILED;
    constructor(public payload: string) { }
}

export class DeleteInvestor implements Action {
    readonly type = InvestorRelationsActionsType.DELETE_INVESTOR;
    constructor(public payload: any) { }
}

export class DeleteInvestorComplete implements Action {
    readonly type = InvestorRelationsActionsType.DELETE_INVESTOR_COMPLETE;
    constructor(public payload: any[]) { }
}

export class DeleteInvestorFailed implements Action {
    readonly type = InvestorRelationsActionsType.DELETE_INVESTOR_FAILED;
    constructor(public payload: string) { }
}


export class CanEditInvestorDetails implements Action {
    readonly type = InvestorRelationsActionsType.GET_PERMISSIONS;
    constructor() { }
}

export class CanEditInvestorDetailsComplete implements Action {
    readonly type = InvestorRelationsActionsType.GET_PERMISSIONS_COMPLETE;
    constructor(public payload: boolean) { }
}

export class CanEditInvestorDetailsFailed implements Action {
    readonly type = InvestorRelationsActionsType.GET_PERMISSIONS_FAILED;
    constructor(public payload: string) { }
}

export class LoadAdminStatementExceptions implements Action {

    readonly type = InvestorRelationsActionsType.LOAD_ADMIN_STATEMENT_EXCEPTIONS;
}

export class LoadAdminStatementExceptionsComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_ADMIN_STATEMENT_EXCEPTIONS_COMPLETE;
    constructor(public payload: any[]) { }
}

export class LoadAdminStatementExceptionsFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_ADMIN_STATEMENT_EXCEPTIONS_FAILED;
    constructor(public payload: string) { }
}

export class LoadStatementDates implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_STATEMENT_DATES;
    constructor(public payload: any) { }
}

export class LoadStatementDatesComplete implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_STATEMENT_DATES_COMPLETE;
    constructor(public payload: any) { }
}

export class LoadStatementDatesFailed implements Action {
    readonly type = InvestorRelationsActionsType.LOAD_STATEMENT_DATES_FAILED;
    constructor(public payload: string) { }
}

export type InvestorRelationsActions
    = LoadTabs
    | LoadTabsDataComplete
    | LoadTabsDataFailed

    | LoadAdminStatements
    | LoadAdminStatementsComplete
    | LoadAdminStatementsFailed

    | LoadFirmAUMBalances
    | LoadFirmAUMBalancesComplete
    | LoadFirmAUMBalancesFailed

    | LoadFirmRelationsList
    | LoadFirmRelationsListComplete
    | LoadFirmRelationsListFailed

    | LoadFirmRelationsTop10
    | LoadFirmRelationsTop10Complete
    | LoadFirmRelationsTop10Failed

    | LoadFirmInvestorTypes
    | LoadFirmInvestorTypesComplete
    | LoadFirmInvestorTypesFailed

    | LoadFirmRegions
    | LoadFirmRegionsComplete
    | LoadFirmRegionsFailed

    | LoadFundAUMBalances
    | LoadFundAUMBalancesComplete
    | LoadFundAUMBalancesFailed

    | LoadFundRelationsTop10
    | LoadFundRelationsTop10Complete
    | LoadFundRelationsTop10Failed

    | LoadFundInvestorTypes
    | LoadFundInvestorTypesComplete
    | LoadFundInvestorTypesFailed

    | LoadFundRegions
    | LoadFundRegionsComplete
    | LoadFundRegionsFailed

    | LoadInvestors
    | LoadInvestorsComplete
    | LoadInvestorsFailed

    | EditInvestor
    | EditInvestorComplete
    | EditInvestorFailed

    | DeleteInvestor
    | DeleteInvestorComplete
    | DeleteInvestorFailed

    | CanEditInvestorDetails
    | CanEditInvestorDetailsComplete
    | CanEditInvestorDetailsFailed

    | LoadAdminStatementExceptions
    | LoadAdminStatementExceptionsComplete
    | LoadAdminStatementExceptionsFailed

    | LoadStatementDates
    | LoadStatementDatesComplete
    | LoadStatementDatesFailed;
