import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTrades from '../reducers/trades.reducer';

export const getBenchmarkPortfolioTradesState = createSelector(
    fromFeature.getBenchmarkPortfolioState,
    (state: fromFeature.BenchmarkPortfolioState) => state.trades
);

/**
 * Trade Dates
 */

export const getBenchmarkPortfolioTradeDatesLoadingStatus = createSelector(
    getBenchmarkPortfolioTradesState,
    fromTrades.getTradeDatesLoadingStatus
);

export const getBenchmarkPortfolioTradeDatesLoadedStatus = createSelector(
    getBenchmarkPortfolioTradesState,
    fromTrades.getTradeDatesLoadedStatus
);

export const getBenchmarkPortfolioTradeDatesError = createSelector(
    getBenchmarkPortfolioTradesState,
    fromTrades.getTradeDatesError
);

export const getBenchmarkPortfolioTradeDates = createSelector(
    getBenchmarkPortfolioTradesState,
    fromTrades.getTradeDates
);

export const getBenchmarkPortfolioSelectedTradeDate = createSelector(
    getBenchmarkPortfolioTradesState,
    fromTrades.getSelectedTradeDate
);

/**
 * FX Trades
*/

export const getBenchmarkPortfolioFXTradesLoadingStatus = createSelector(
    getBenchmarkPortfolioTradesState,
    fromTrades.getFXTradesLoadingStatus
);

export const getBenchmarkPortfolioFXTradesLoadedStatus = createSelector(
    getBenchmarkPortfolioTradesState,
    fromTrades.getFXTradesLoadedStatus
);

export const getBenchmarkPortfolioFXTradesError = createSelector(
    getBenchmarkPortfolioTradesState,
    fromTrades.getFXTradesError
);

export const getBenchmarkPortfolioFXTradeIds = createSelector(
    getBenchmarkPortfolioTradesState,
    fromTrades.getFXTradeIds
);

export const getBenchmarkPortfolioFXTradeEntities = createSelector(
    getBenchmarkPortfolioTradesState,
    fromTrades.getFXTradeEntities
);

export const getBenchmarkPortfolioFXTrades = createSelector(
    getBenchmarkPortfolioFXTradeIds,
    getBenchmarkPortfolioFXTradeEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);

