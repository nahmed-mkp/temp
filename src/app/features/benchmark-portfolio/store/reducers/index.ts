import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromTrades from './trades.reducer';

export interface BenchmarkPortfolioState {
    trades: fromTrades.BenchmarkTradesState;
}

export interface State extends fromRoot.RootState {
    benchmarkPortfolio: BenchmarkPortfolioState;
}

export const reducers = {
    trades: fromTrades.reducer
};

export const getBenchmarkPortfolioState = createFeatureSelector<BenchmarkPortfolioState>('benchmarkPortfolio');
