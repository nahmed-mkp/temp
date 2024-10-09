import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromAgencyPortfolio from './agency-portfolio.reducer';

export interface AgencyPortfolioState {
    agencyPortfolio: fromAgencyPortfolio.State
}

export interface state extends fromRoot.RootState {
    agencyPortfolio: AgencyPortfolioState
}

export const reducers = {
    agencyPortfolio: fromAgencyPortfolio.reducer
}

export const getAgencyPortfolioState = createFeatureSelector<AgencyPortfolioState>('agencyPortfolio')