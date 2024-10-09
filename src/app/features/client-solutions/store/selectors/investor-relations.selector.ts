import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import * as fromFeature from '../reducers';
import * as fromInvestorRelations from '../reducers/investor-relations.reducer';


export const getInvestorRelationsState = createSelector(
  fromFeature.getClientSolutionsFeatureState,
  (state: fromFeature.ClientSolutionsState) => state.investorRelations
);

export const getTabs = createSelector(
    getInvestorRelationsState, 
    fromInvestorRelations.getTabs
);

export const getTabsLoadingStatus = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getTabsLoading
);

export const getTabsLoadedStatus = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getTabsLoaded
);

export const getTabsErrorStatus = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getTabsError
);

export const getFirmAUMBalances = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmAUMBalances
);

export const getFirmAUMBalancesLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmAUMBalancesLoading
);

export const getFirmAUMBalancesLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmAUMBalancesLoaded
);

export const getFirmAUMBalancesError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmAUMBalancesError
);

export const getFirmRelationsList = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmRelationsList
);

export const getFirmRelationsListLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmRelationsListLoading
);

export const getFirmRelationsListLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmRelationsListLoaded
);

export const getFirmRelationsListError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmRelationsListError
);

export const getFirmTop10Investors = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmTop10Investors
);

export const getFirmTop10InvestorsLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmTop10InvestorsLoading
);

export const getFirmTop10InvestorsLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmTop10InvestorsLoaded
);

export const getFirmTop10InvestorsError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmTop10InvestorsError
);

export const getFirmInvestorTypes = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmInvestorTypes
);

export const getFirmInvestorTypesLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmInvestorTypesLoading
);

export const getFirmInvestorTypesLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmInvestorTypesLoaded

    );

export const getFirmInvestorTypesError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmInvestorTypesError
);

export const getFirmRegions = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmRegions
);

export const getFirmRegionsLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmRegionsLoading
);

export const getFirmRegionsLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmRegionsLoaded

    );

export const getFirmRegionsError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFirmRegionsError
);


/* =================== FUND ============== */

export const getFundAUMBalances = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundAUMBalances
);

export const getFundAUMBalancesLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundAUMBalancesLoading
);

export const getFundAUMBalancesLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundAUMBalancesLoaded
);

export const getFundAUMBalancesError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundAUMBalancesError
);

export const getFundTop10Investors = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundTop10Investors
);

export const getFundTop10InvestorsLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundTop10InvestorsLoading
);

export const getFundTop10InvestorsLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundTop10InvestorsLoaded
);

export const getFundTop10InvestorsError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundTop10InvestorsError
);


export const getFundInvestorTypes = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundInvestorTypes
);

export const getFundInvestorTypesLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundInvestorTypesLoading
);

export const getFundInvestorTypesLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundInvestorTypesLoaded

);

export const getFundInvestorTypesError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundInvestorTypesError
);

export const getFundRegions = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundRegions
);

export const getFundRegionsLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundRegionsLoading
);

export const getFundRegionsLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundRegionsLoaded

    );

export const getFundRegionsError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getFundRegionsError
);

export const getInvestors = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getInvestors
);

export const getInvestorsLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getInvestorsLoading
);

export const getInvestorsLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getInvestorsLoaded

    );

export const getInvestorsError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getInvestorsError
);

// Statements

export const getStatementDateRange = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatementsDateRange
);

export const getStatementDateRangeLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatementsLoading
);

export const getStatementDateRangeLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatementsLoaded
);

export const getStatementDateRangeError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatementsError
);


export const getAdminStatements = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatements
);

export const getAdminStatementsLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatementsLoading
);

export const getAdminStatementsLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatementsLoaded

);

export const getAdminStatementsError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatementsError
);

// Exceptions

export const getAdminStatementExceptions = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatementExceptions
);

export const getAdminStatementExceptionsLoading = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatementExceptionsLoading
);

export const getAdminStatementExceptionsLoaded = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatementExceptionsLoaded

);

export const getAdminStatementExceptionsError = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getStatementExceptionsError
);

// Editability

export const getCanEditInvestorDetails = createSelector(
    getInvestorRelationsState,
    fromInvestorRelations.getCanEditInvestorDetails
);
