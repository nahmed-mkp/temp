import * as fromModels from './../../models';
import * as fromActions from './../actions/investor-relations.actions';

export interface InvestorRelationsState {
    tabs: any[];
    tabsLoading: boolean;
    tabsLoaded: boolean;
    tabsError?: string;

    firmAUMBalances: any[];
    firmAUMBalancesLoading: boolean;
    firmAUMBalancesLoaded: boolean;
    firmAUMBalancesError?: string;

    firmRelationsList: any[];
    firmRelationsListLoading: boolean;
    firmRelationsListLoaded: boolean;
    firmRelationsListError?: string;

    firmTop10Investors: any[];
    firmTop10InvestorsLoading: boolean;
    firmTop10InvestorsLoaded: boolean;
    firmTop10InvestorsError?: string;

    firmInvestorTypes: any[];
    firmInvestorTypesLoading: boolean;
    firmInvestorTypesLoaded: boolean;
    firmInvestorTypesError?: string;

    firmRegions: any[];
    firmRegionsLoading: boolean;
    firmRegionsLoaded: boolean;
    firmRegionsError?: string;

    fundAUMBalances: any[];
    fundAUMBalancesLoading: boolean;
    fundAUMBalancesLoaded: boolean;
    fundAUMBalancesError?: string;

    fundTop10Investors: any[];
    fundTop10InvestorsLoading: boolean;
    fundTop10InvestorsLoaded: boolean;
    fundTop10InvestorsError?: string;

    fundInvestorTypes: any[];
    fundInvestorTypesLoading: boolean;
    fundInvestorTypesLoaded: boolean;
    fundInvestorTypesError?: string;

    fundRegions: any[];
    fundRegionsLoading: boolean;
    fundRegionsLoaded: boolean;
    fundRegionsError?: string;

    investors: any[];
    investorsLoading: boolean;
    investorsLoaded: boolean;
    investorsError?: string;

    statements: any[];
    statementsLoading: boolean;
    statementsLoaded: boolean;
    statementsError?: string;

    exceptions: any[];
    exceptionsLoading: boolean;
    exceptionsLoaded: boolean;
    exceptionsError?: string;

    statementDateRange?: fromModels.DateRange;
    statementDatesLoading: boolean;
    statementDatesLoaded: boolean;
    statementDatesError?: string;

    canEdit: boolean;
}

const initialState: InvestorRelationsState = {

    tabs: [],
    tabsLoading: false,
    tabsLoaded: false,

    firmAUMBalances: [],
    firmAUMBalancesLoading: false,
    firmAUMBalancesLoaded: false,

    firmRelationsList: [],
    firmRelationsListLoading: false,
    firmRelationsListLoaded: false,

    firmTop10Investors: [],
    firmTop10InvestorsLoading: false,
    firmTop10InvestorsLoaded: false,

    firmInvestorTypes: [],
    firmInvestorTypesLoading: false,
    firmInvestorTypesLoaded: false,

    firmRegions: [],
    firmRegionsLoading: false,
    firmRegionsLoaded: false,

    fundAUMBalances: [],
    fundAUMBalancesLoading: false,
    fundAUMBalancesLoaded: false,

    fundTop10Investors: [],
    fundTop10InvestorsLoading: false,
    fundTop10InvestorsLoaded: false,

    fundInvestorTypes: [],
    fundInvestorTypesLoading: false,
    fundInvestorTypesLoaded: false,

    fundRegions: [],
    fundRegionsLoading: false,
    fundRegionsLoaded: false,

    investors: [],
    investorsLoading: false,
    investorsLoaded: false,

    statements: [],
    statementsLoading: false,
    statementsLoaded: false,

    exceptions: [],
    exceptionsLoading: false,
    exceptionsLoaded: false,

    statementDatesLoading: false,
    statementDatesLoaded: false,
    canEdit: false

};

export function reducer(state = initialState, action: fromActions.InvestorRelationsActions ): InvestorRelationsState {
    switch (action.type) {

        case fromActions.InvestorRelationsActionsType.LOAD_TABS: {
            return {
                ...state,
                tabsLoading: true,
                tabsLoaded: false,
                tabsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_TABS_COMPLETE: {
            return {
                ...state,
                tabs: action.payload,
                tabsLoading: false,
                tabsLoaded: true,
                tabsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_TABS_FAILED: {
            return {
                ...state,
                tabsLoading: false,
                tabsLoaded: false,
                tabsError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_AUM_BALANCES: {
            return {
                ...state,
                firmAUMBalancesLoading: true,
                firmAUMBalancesLoaded: false,
                firmAUMBalancesError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_AUM_BALANCES_COMPLETE: {
            return {
                ...state,
                firmAUMBalances: [...action.payload],
                firmAUMBalancesLoading: false,
                firmAUMBalancesLoaded: true,
                firmAUMBalancesError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_AUM_BALANCES_FAILED: {
            return {
                ...state,
                firmAUMBalancesLoading: false,
                firmAUMBalancesLoaded: false,
                firmAUMBalancesError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_RELATIONS_LIST: {
            return {
                ...state,
                firmRelationsListLoading: true,
                firmRelationsListLoaded: false,
                firmRelationsListError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_RELATIONS_LIST_COMPLETE: {
            return {
                ...state,
                firmRelationsList: [...action.payload],
                firmRelationsListLoading: false,
                firmRelationsListLoaded: true,
                firmRelationsListError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_RELATIONS_LIST_FAILED: {
            return {
                ...state,
                firmRelationsListLoading: false,
                firmRelationsListLoaded: false,
                firmRelationsListError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_TOP_10_INVESTORS: {
            return {
                ...state,
                firmTop10InvestorsLoading: true,
                firmTop10InvestorsLoaded: false,
                firmTop10InvestorsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_TOP_10_INVESTORS_COMPLETE: {
            return {
                ...state,
                firmTop10Investors: [...action.payload],
                firmTop10InvestorsLoading: false,
                firmTop10InvestorsLoaded: true,
                firmTop10InvestorsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_TOP_10_INVESTORS_FAILED: {
            return {
                ...state,
                firmTop10InvestorsLoading: false,
                firmTop10InvestorsLoaded: false,
                firmTop10InvestorsError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_INVESTOR_TYPES: {
            return {
                ...state,
                firmInvestorTypesLoading: true,
                firmInvestorTypesLoaded: false,
                firmInvestorTypesError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_INVESTOR_TYPES_COMPLETE: {
            return {
                ...state,
                firmInvestorTypes: [...action.payload],
                firmInvestorTypesLoading: false,
                firmInvestorTypesLoaded: true,
                firmInvestorTypesError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_INVESTOR_TYPES_FAILED: {
            return {
                ...state,
                firmInvestorTypesLoading: false,
                firmInvestorTypesLoaded: false,
                firmInvestorTypesError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_REGIONS: {
            return {
                ...state,
                firmRegionsLoading: true,
                firmRegionsLoaded: false,
                firmRegionsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_REGIONS_COMPLETE: {
            return {
                ...state,
                firmRegions: [...action.payload],
                firmRegionsLoading: false,
                firmRegionsLoaded: true,
                firmRegionsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FIRM_REGIONS_FAILED: {
            return {
                ...state,
                firmRegionsLoading: false,
                firmRegionsLoaded: false,
                firmRegionsError: action.payload
            };
        }


        case fromActions.InvestorRelationsActionsType.LOAD_FUND_AUM_BALANCES: {
            return {
                ...state,
                fundAUMBalancesLoading: true,
                fundAUMBalancesLoaded: false,
                fundAUMBalancesError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FUND_AUM_BALANCES_COMPLETE: {
            return {
                ...state,
                fundAUMBalances: [...action.payload],
                fundAUMBalancesLoading: false,
                fundAUMBalancesLoaded: true,
                fundAUMBalancesError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FUND_AUM_BALANCES_FAILED: {
            return {
                ...state,
                fundAUMBalancesLoading: false,
                fundAUMBalancesLoaded: false,
                fundAUMBalancesError: action.payload
            };
        }


        case fromActions.InvestorRelationsActionsType.LOAD_FUND_TOP_10_INVESTORS: {
            return {
                ...state,
                fundTop10InvestorsLoading: true,
                fundTop10InvestorsLoaded: false,
                fundTop10InvestorsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FUND_TOP_10_INVESTORS_COMPLETE: {
            return {
                ...state,
                fundTop10Investors: [...action.payload],
                fundTop10InvestorsLoading: false,
                fundTop10InvestorsLoaded: true,
                fundTop10InvestorsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FUND_TOP_10_INVESTORS_FAILED: {
            return {
                ...state,
                fundTop10InvestorsLoading: false,
                fundTop10InvestorsLoaded: false,
                fundTop10InvestorsError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FUND_INVESTOR_TYPES: {
            return {
                ...state,
                fundInvestorTypesLoading: true,
                fundInvestorTypesLoaded: false,
                fundInvestorTypesError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FUND_INVESTOR_TYPES_COMPLETE: {
            return {
                ...state,
                fundInvestorTypes: [...action.payload],
                fundInvestorTypesLoading: false,
                fundInvestorTypesLoaded: true,
                fundInvestorTypesError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FUND_INVESTOR_TYPES_FAILED: {
            return {
                ...state,
                fundInvestorTypesLoading: false,
                fundInvestorTypesLoaded: false,
                fundInvestorTypesError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FUND_REGIONS: {
            return {
                ...state,
                fundRegionsLoading: true,
                fundRegionsLoaded: false,
                fundRegionsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FUND_REGIONS_COMPLETE: {
            return {
                ...state,
                fundRegions: [...action.payload],
                fundRegionsLoading: false,
                fundRegionsLoaded: true,
                fundRegionsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_FUND_REGIONS_FAILED: {
            return {
                ...state,
                fundRegionsLoading: false,
                fundRegionsLoaded: false,
                fundRegionsError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_INVESTORS: {
            return {
                ...state,
                investorsLoading: true,
                investorsLoaded: false,
                investorsError: null
            };
        }


        case fromActions.InvestorRelationsActionsType.LOAD_INVESTORS_COMPLETE: {
            return {
                ...state,
                investors: [...action.payload],
                investorsLoading: false,
                investorsLoaded: true
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_INVESTORS_FAILED: {
            return {
                ...state,
                investorsLoading: false,
                investorsLoaded: false,
                investorsError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.EDIT_INVESTOR:
        case fromActions.InvestorRelationsActionsType.EDIT_INVESTOR_COMPLETE:
        case fromActions.InvestorRelationsActionsType.EDIT_INVESTOR_FAILED:

        case fromActions.InvestorRelationsActionsType.DELETE_INVESTOR: {
            return {
                ...state,
                investorsLoading: true,
                investorsLoaded: false,
                investorsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.DELETE_INVESTOR_COMPLETE: {
            return {
                ...state,
                investors: action.payload,
                investorsLoading: false,
                investorsLoaded: true,
                investorsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.DELETE_INVESTOR_FAILED: {
            return {
                ...state,
                investorsLoading: false,
                investorsLoaded: false,
                investorsError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_ADMIN_STATEMENTS: {
            return {
                ...state,
                statementsLoading: true,
                statementsLoaded: false,
                statementsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_ADMIN_STATEMENTS_COMPLETE: {
            return {
                ...state,
                statements: [...action.payload],
                statementsLoading: false,
                statementsLoaded: true
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_ADMIN_STATEMENTS_FAILED: {
            return {
                ...state,
                statementsLoading: false,
                statementsLoaded: false,
                statementsError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.GET_PERMISSIONS_COMPLETE: {
            return {
                ...state,
                canEdit: action.payload
            };
        }



        case fromActions.InvestorRelationsActionsType.LOAD_ADMIN_STATEMENT_EXCEPTIONS: {
            return {
                ...state,
                exceptionsLoading: true,
                exceptionsLoaded: false,
                exceptionsError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_ADMIN_STATEMENT_EXCEPTIONS_COMPLETE: {
            return {
                ...state,
                exceptions: [...action.payload],
                exceptionsLoading: false,
                exceptionsLoaded: true
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_ADMIN_STATEMENT_EXCEPTIONS_FAILED: {
            return {
                ...state,
                exceptionsLoading: false,
                exceptionsLoaded: false,
                exceptionsError: action.payload
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_STATEMENT_DATES: {
            return {
                ...state,
                statementDatesLoading: true,
                statementDatesLoaded: false,
                statementDatesError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_STATEMENT_DATES_COMPLETE: {
            return {
                ...state,
                statementDatesLoading: false,
                statementDatesLoaded: true,
                statementDatesError: null
            };
        }

        case fromActions.InvestorRelationsActionsType.LOAD_STATEMENT_DATES_FAILED: {
            return {
                ...state,
                statementDatesLoading: false,
                statementDatesLoaded: false,
                statementDatesError: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

export const getTabs = (state: InvestorRelationsState) => state.tabs;
export const getTabsLoading = (state: InvestorRelationsState) => state.tabsLoading;
export const getTabsLoaded = (state: InvestorRelationsState) => state.tabsLoaded;
export const getTabsError = (state: InvestorRelationsState) => state.tabsError;

export const getFirmAUMBalances = (state: InvestorRelationsState) => state.firmAUMBalances;
export const getFirmAUMBalancesLoading = (state: InvestorRelationsState) => state.firmAUMBalances;
export const getFirmAUMBalancesLoaded = (state: InvestorRelationsState) => state.firmAUMBalancesLoaded;
export const getFirmAUMBalancesError = (state: InvestorRelationsState) => state.firmAUMBalancesError;

export const getFirmRelationsList = (state: InvestorRelationsState) => state.firmRelationsList;
export const getFirmRelationsListLoading = (state: InvestorRelationsState) => state.firmRelationsListLoading;
export const getFirmRelationsListLoaded = (state: InvestorRelationsState) => state.firmRelationsListLoaded;
export const getFirmRelationsListError = (state: InvestorRelationsState) => state.firmRelationsListError;

export const getFirmTop10Investors = (state: InvestorRelationsState) => state.firmTop10Investors;
export const getFirmTop10InvestorsLoading = (state: InvestorRelationsState) => state.firmTop10InvestorsLoading;
export const getFirmTop10InvestorsLoaded = (state: InvestorRelationsState) => state.firmTop10InvestorsLoaded;
export const getFirmTop10InvestorsError = (state: InvestorRelationsState) => state.firmTop10InvestorsError;

export const getFirmInvestorTypes = (state: InvestorRelationsState) => state.firmInvestorTypes;
export const getFirmInvestorTypesLoading = (state: InvestorRelationsState) => state.firmAUMBalancesLoading;
export const getFirmInvestorTypesLoaded = (state: InvestorRelationsState) => state.firmAUMBalancesLoaded;
export const getFirmInvestorTypesError = (state: InvestorRelationsState) => state.firmInvestorTypesError;

export const getFirmRegions = (state: InvestorRelationsState) => state.firmRegions;
export const getFirmRegionsLoading = (state: InvestorRelationsState) => state.firmRegionsLoading;
export const getFirmRegionsLoaded = (state: InvestorRelationsState) => state.firmRegionsLoading;
export const getFirmRegionsError = (state: InvestorRelationsState) => state.firmRegionsError;

export const getFundAUMBalances = (state: InvestorRelationsState) => state.fundAUMBalances;
export const getFundAUMBalancesLoading = (state: InvestorRelationsState) => state.fundAUMBalances;
export const getFundAUMBalancesLoaded = (state: InvestorRelationsState) => state.fundAUMBalancesLoaded;
export const getFundAUMBalancesError = (state: InvestorRelationsState) => state.fundAUMBalancesError;

export const getFundTop10Investors = (state: InvestorRelationsState) => state.fundTop10Investors;
export const getFundTop10InvestorsLoading = (state: InvestorRelationsState) => state.fundTop10InvestorsLoading;
export const getFundTop10InvestorsLoaded = (state: InvestorRelationsState) => state.fundTop10InvestorsLoaded;
export const getFundTop10InvestorsError = (state: InvestorRelationsState) => state.fundTop10InvestorsError;

export const getFundInvestorTypes = (state: InvestorRelationsState) => state.fundInvestorTypes;
export const getFundInvestorTypesLoading = (state: InvestorRelationsState) => state.fundAUMBalancesLoading;
export const getFundInvestorTypesLoaded = (state: InvestorRelationsState) => state.fundAUMBalancesLoaded;
export const getFundInvestorTypesError = (state: InvestorRelationsState) => state.fundInvestorTypesError;

export const getFundRegions = (state: InvestorRelationsState) => state.fundRegions;
export const getFundRegionsLoading = (state: InvestorRelationsState) => state.fundRegionsLoading;
export const getFundRegionsLoaded = (state: InvestorRelationsState) => state.fundRegionsLoaded;
export const getFundRegionsError = (state: InvestorRelationsState) => state.fundRegionsError;

export const getInvestors = (state: InvestorRelationsState) => state.investors;
export const getInvestorsLoading = (state: InvestorRelationsState) => state.investorsLoading;
export const getInvestorsLoaded = (state: InvestorRelationsState) => state.investorsLoaded;
export const getInvestorsError = (state: InvestorRelationsState) => state.investorsError;

export const getStatementsDateRange = (state: InvestorRelationsState) => state.statementDateRange;
export const getStatementsDateRangeLoading = (state: InvestorRelationsState) => state.statementDatesLoading;
export const getStatementsDateRangeLoaded = (state: InvestorRelationsState) => state.statementDatesLoaded;
export const getStatementsDateRangeError = (state: InvestorRelationsState) => state.statementDatesError;

export const getStatements = (state: InvestorRelationsState) => state.statements;
export const getStatementsLoading = (state: InvestorRelationsState) => state.statementsLoading;
export const getStatementsLoaded = (state: InvestorRelationsState) => state.statementsLoaded;
export const getStatementsError = (state: InvestorRelationsState) => state.statementsError;

export const getStatementExceptions = (state: InvestorRelationsState) => state.exceptions;
export const getStatementExceptionsLoading = (state: InvestorRelationsState) => state.exceptionsLoading;
export const getStatementExceptionsLoaded = (state: InvestorRelationsState) => state.exceptionsLoaded;
export const getStatementExceptionsError = (state: InvestorRelationsState) => state.exceptionsError;

export const getCanEditInvestorDetails = (state: InvestorRelationsState) => state.canEdit;
