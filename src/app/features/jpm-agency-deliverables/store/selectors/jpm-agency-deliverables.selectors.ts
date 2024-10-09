import { createSelector } from '@ngrx/store';
import * as fromAgencyDeliverables from '../reducers/jpm-agency-deliverables.reducer';
import * as fromFeature from '../reducers';

export const getAgencyDeliverablesState = createSelector(
    fromFeature.getState,
    (state: fromFeature.AgencyDeliverablesState) => state.jpmAgencyDeliverables
);

/* ==================== PORTFOLIO DATES ====================== */

export const getPortfolioDates = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getPortfolioDates
)

export const getPortfolioDatesLoading = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getPortfolioDatesLoading
)

export const getPortfolioDatesLoaded = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getPortfolioDatesLoaded
)

export const getPortfolioDatesError = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getPortfolioDatesError
)

/* ==================== LATEST PORTFOLIO DATE ====================== */

export const getLatestPortfolioDate = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getLatestPortfolioDate
)

export const getLatestPortfolioDateLoading = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getLatestPortfolioDateLoading
)

export const getLatestPortfolioDateLoaded = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getLatestPortfolioDateLoaded
)

export const getLatestPortfolioDateError = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getLatestPortfolioDateError
)

/* ==================== CONFIG DATA ====================== */

export const getDeliverableConfigData = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getDeliverableConfigData
)

export const getDeliverableConfigDataLoading = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getDeliverableConfigDataLoading
)

export const getDeliverableConfigDataLoaded = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getDeliverableConfigDataLoaded
)

export const getDeliverableConfigDataError = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getDeliverableConfigDataError
)

/* ==================== DELIVERABLE DATA ====================== */

export const getDeliverableData = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getDeliverableData
)

export const getDeliverableDataLoading = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getDeliverableDataLoading
)

export const getDeliverableDataLoaded = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getDeliverableDataLoaded
)

export const getDeliverableDataError = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getDeliverableDataError
)

/* ==================== CASH DATA ====================== */

export const getCashData = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getCashData
)

export const getCashDataLoading = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getCashDataLoading
)

export const getCashDataLoaded = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getCashDataLoaded
)

export const getCashDataError = createSelector(
    getAgencyDeliverablesState,
    fromAgencyDeliverables.getCashDataError
)