import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromPortfolioAnalysis from '../reducers/portfolio-analysis.reducers';

const getAgencyAnalyticsPortfolioAnalysisState = createSelector(
    fromFeature.getAgencyAnalyticsPortfolioAnalysisState,
    (state: fromFeature.AgencyAnalyticsPortfolioAnalysisState) => state.portfolioAnalysis
);



export const getAgencyAnalyticsPortfolioAnalysisActiveRequestId = createSelector(
    getAgencyAnalyticsPortfolioAnalysisState,
    fromPortfolioAnalysis.getPortfolioAnalysisActiveRequestId
);





export const getAgencyAnalyticsPortfolioAnalysisSecurityListEntities = createSelector(
    getAgencyAnalyticsPortfolioAnalysisState,
    fromPortfolioAnalysis.getPortfolioAnalysisSecurityListEntities
);

export const getAgencyAnalyticsPortfolioAnalysisSecurityListLoadingStatus = createSelector(
    getAgencyAnalyticsPortfolioAnalysisState,
    fromPortfolioAnalysis.getPortfolioAnalysisSecurityListLoading
);

export const getAgencyAnalyticsPortfolioAnalysisSecurityListLoadedStatus = createSelector(
    getAgencyAnalyticsPortfolioAnalysisState,
    fromPortfolioAnalysis.getPortfolioAnalysisSecurityListLoaded
);

export const getAgencyAnalyticsPortfolioAnalysisSecurityListError = createSelector(
    getAgencyAnalyticsPortfolioAnalysisState,
    fromPortfolioAnalysis.getPortfolioAnalysisSecurityListError
);






export const getAgencyAnalyticsPortfolioAnalysisResponsesIds = createSelector(
    getAgencyAnalyticsPortfolioAnalysisState,
    fromPortfolioAnalysis.getPortfolioAnalysisResponsesIds
);

export const getAgencyAnalyticsPortfolioAnalysisResponsesEntites = createSelector(
    getAgencyAnalyticsPortfolioAnalysisState,
    fromPortfolioAnalysis.getPortfolioAnalysisResponsesEntities
);

export const getAgencyAnalyticsPortfolioAnalysisResponsesLoadingStatus = createSelector(
    getAgencyAnalyticsPortfolioAnalysisState,
    fromPortfolioAnalysis.getPortfolioAnalysisResponsesLoading
);

export const getAgencyAnalyticsPortfolioAnalysisResponsesLoadedStatus = createSelector(
    getAgencyAnalyticsPortfolioAnalysisState,
    fromPortfolioAnalysis.getPortfolioAnalysisResponsesLoaded
);

export const getAgencyAnalyticsPortfolioAnalysisResponsesError = createSelector(
    getAgencyAnalyticsPortfolioAnalysisState,
    fromPortfolioAnalysis.getPortfolioAnalysisResponsesError
);




export const getAgencyAnalyticsPortfolioAnalysisActiveResponse = createSelector(
    getAgencyAnalyticsPortfolioAnalysisActiveRequestId,
    getAgencyAnalyticsPortfolioAnalysisResponsesEntites,
    (portfolioAnalysisActiveRequestId, portfolioAnalysisResponsesEntites) => portfolioAnalysisResponsesEntites[portfolioAnalysisActiveRequestId]
);

export const getAgencyAnalyticsPortfolioAnalysisActiveResponseTimeseries = createSelector(
    getAgencyAnalyticsPortfolioAnalysisActiveResponse,
    portfolioAnalysisActiveResponse => portfolioAnalysisActiveResponse && portfolioAnalysisActiveResponse.payload.plot
);

export const getAgencyAnalyticsPortfolioAnalysisActiveResponseStats = createSelector(
    getAgencyAnalyticsPortfolioAnalysisActiveResponse,
    portfolioAnalysisActiveResponse => portfolioAnalysisActiveResponse && portfolioAnalysisActiveResponse.payload.stats
);

export const getAgencyAnalyticsPortfolioAnalysisActiveResponseCorrMatrix = createSelector(
    getAgencyAnalyticsPortfolioAnalysisActiveResponse,
    portfolioAnalysisActiveResponse => portfolioAnalysisActiveResponse && portfolioAnalysisActiveResponse.payload.corr_matrix
)