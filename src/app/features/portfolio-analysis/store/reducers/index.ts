import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromPortfolioAnalysis from './portfolio-analysis.reducers';

export interface AgencyAnalyticsPortfolioAnalysisState {
    portfolioAnalysis: fromPortfolioAnalysis.State
}

export interface state extends fromRoot.RootState {
    agencyAnalyticsPortfolioAnalysis: AgencyAnalyticsPortfolioAnalysisState
}

export const reducers = {
    portfolioAnalysis: fromPortfolioAnalysis.reducer
}

export const getAgencyAnalyticsPortfolioAnalysisState = createFeatureSelector<AgencyAnalyticsPortfolioAnalysisState>('agencyAnalyticsPortfolioAnalysis');