import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromModels from '../../models';

import * as fromFeature from '../reducers';
import * as fromFunds from '../reducers/fund.reducer';


/**
 * Fund Selectors
 */
export const getFundsState = createSelector(
  fromFeature.getClientSolutionsFeatureState,
  (state: fromFeature.ClientSolutionsState) => state.funds
);

export const getFundIds = createSelector(getFundsState, fromFunds.getIds);

export const getFundEntities = createSelector(
  getFundsState,
  fromFunds.getEntities
);

export const getFundsLoadingStatus = createSelector(
  getFundsState,
  fromFunds.getLoadingStatus
);

export const getFundsLoadedStatus = createSelector(
  getFundsState,
  fromFunds.getLoadedStatus
);

export const getParams = createSelector(
  getFundsState,
  fromFunds.getParams
);

export const getFundsError = createSelector(getFundsState, fromFunds.getError);

export const getFunds = createSelector(
  getFundEntities,
  getFundIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const getSelectedFund = createSelector(
  getFundsState,
  fromFunds.getSelectedFund
);

export const getReportParams = createSelector(
  getParams,
  getSelectedFund,
  (params, fund) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (fund) {
      return params || { fund: fund, dateRange: { startDate: fund.inceptionDate, endDate: today } };
    } else {
      return {
        fund: null,
        dateRange: {
          startDate: new Date(2000, 1, 1),
          endDate: today
        }
      };
    }
  }
);

export const getDateRange = createSelector(
  getReportParams,
  (state) => state.dateRange
);

export const getDateRangeStartDate = createSelector(
  getDateRange,
  dateRange => dateRange.startDate
);
export const getDateRangeEndDate = createSelector(
  getDateRange,
  dateRange => dateRange.endDate
);


export const getFilteredBenchmarks = createSelector(
  getFundsState,
  fromFunds.getFilteredBenchmarks
);










/**
 * Return Statistics vs. Benchmarks
 */
export const getStatisticsUnfiltered = createSelector(
  getFundsState,
  fromFunds.getStatistics
);

export const getFundStatisticsLoaded = createSelector(
  getFundsState,
  fromFunds.getStatisticsLoaded
);

export const getFundStatisticsLoading = createSelector(
  getFundsState,
  fromFunds.getStatisticsLoading
);

export const getStatistics = createSelector(
  getStatisticsUnfiltered,
  getFilteredBenchmarks,
  (statistics, filters) => {
    if (statistics && filters && filters.length > 0) {
      const benchmarkCodes: string[] = filters.map((filter) => filter.code.toLowerCase());
      return statistics.filter((statistic: fromModels.IStatistics) => {
        if (statistic.code.startsWith('MKP')) {
          return true;
        } else {
          return benchmarkCodes.indexOf(statistic.code.toLowerCase()) >= 0;
        }
      });
    } else {
      return statistics;
    }
});

export const getStatisticsViewHeight = createSelector(
  getStatistics,
  entity => _getMinViewHeight(entity)
);







/**
 * Compounded Returns
 */
export const getFundTimeseries = createSelector(
  getFundsState,
  fromFunds.getTimeseries
);

export const getFundTimeseriesLoaded = createSelector(
  getFundsState,
  fromFunds.getTimeseriesLoaded
);

export const getFundTimeseriesLoading = createSelector(
  getFundsState,
  fromFunds.getTimeseriesLoading
);







/**
 * Raw Returns
 */
export const getFundRawReturns = createSelector(
  getFundsState,
  fromFunds.getRawReturns
);

export const getFundRawReturnsLoaded = createSelector(
  getFundsState,
  fromFunds.getRawReturnsLoaded
);

export const getFundRawReturnsLoading = createSelector(
  getFundsState,
  fromFunds.getRawReturnsLoading
);

export const getFundRawReturnsViewHeight = createSelector(
  getDateRange,
  dateRange => _getMinViewHeightForRawReturn(dateRange)
);










/**
 * Return Distribution
 */
export const getFundHistogram = createSelector(
  getFundsState,
  fromFunds.getHistogram
);

export const getFundHistogramLoaded = createSelector(
  getFundsState,
  fromFunds.getHistogramLoaded
);

export const getFundHistogramLoading = createSelector(
  getFundsState,
  fromFunds.getHistogramLoading
);







/**
 * Summary
 */
export const getFundSummary = createSelector(
  getFundsState,
  fromFunds.getSummary
);

export const getFundSummaryLoaded = createSelector(
  getFundsState,
  fromFunds.getSummaryLoaded
);

export const getFundSummaryLoading = createSelector(
  getFundsState,
  fromFunds.getSummaryLoading
);







/**
 * Fund Correlation vs. Benchmarks
 */
export const getFundCorrelationUnfiltered = createSelector(
  getFundsState,
  fromFunds.getCorrelation
);

export const getFundCorrelationLoaded = createSelector(
  getFundsState,
  fromFunds.getCorrelationLoaded
);

export const getFundCorrelationLoading = createSelector(
  getFundsState,
  fromFunds.getCorrelationLoading
);

export const getFundCorrelation = createSelector(
  getFundCorrelationUnfiltered,
  getFilteredBenchmarks,
  (correlations, filters) => {
    if (correlations && filters && filters.length > 0) {
      const benchmarkCodes: string[] = filters.map((filter) => filter.code.toLowerCase());
      return correlations.filter((correlation: fromModels.ICorrelation) => {
        if (correlation.code.startsWith('MKP')) {
          return true;
        } else {
          return benchmarkCodes.indexOf(correlation.code.toLowerCase()) >= 0;
        }
      });
    } else {
      return correlations || [];
    }
});

export const getFundCorrelationViewHeight = createSelector(
  getFundCorrelation,
  entity => _getMinViewHeight(entity)
);







/**
 * Drawdown Analysis
 */
export const getFundDrawdown = createSelector(
  getFundsState,
  fromFunds.getDrawdown
);

export const getFundDrawdownValue = createSelector(
  getFundDrawdown,
  result => result && result.value || []
);

export const getFundDrawdownloaded = createSelector(
  getFundsState,
  fromFunds.getDrawdownLoaded
);

export const getFundDrawdownloading = createSelector(
  getFundsState,
  fromFunds.getDrawdownLoading
);









/**
 * Alpha Beta Analysis
 */
export const getAlphaBetaLoaded = createSelector(
  getFundsState,
  fromFunds.getAlphaBetaLoaded
);

export const getAlphaBetaLoading = createSelector(
  getFundsState,
  fromFunds.getAlphaBetaLoading
);

export const getAlphaBeta = createSelector(
  getFundsState,
  fromFunds.getAlphaBeta
);









/**
 * Rolling Correlations
 */
export const getRollingCorr = createSelector(
  getFundsState,
  fromFunds.getRollingCorr
);

export const getRollingCorrLoaded = createSelector(
  getFundsState,
  fromFunds.getRollingCorrLoaded
);

export const getRollingCorrLoading = createSelector(
  getFundsState,
  fromFunds.getRollingCorrLoading
);

export const getRollingCorrWindow = createSelector(
  getFundsState,
  fromFunds.getRollingCorrWindow
);

export const getRollingCorrWindowLoaded = createSelector(
  getFundsState,
  fromFunds.getRollingCorrWindowLoaded
);


/**
 * Fund Returns Saving
 */
export const getFundReturnSaving = createSelector(
  getFundsState,
  fromFunds.getFundReturnSaving
);

export const getFundReturnSaved = createSelector(
  getFundsState,
  fromFunds.getFundReturnSaved
);




export const getRefreshDataPending = createSelector(
  getFundsState,
  fromFunds.getRefreshDataPending
);

export const getRefreshDataComplete = createSelector(
  getFundsState,
  fromFunds.getRefreshDataComplete
);

export const getRefreshDataError = createSelector(
  getFundsState,
  fromFunds.getRefreshDataError
);











// Utility -------------------------

function _getMinViewHeight(flatData): string {
  let minHeight = 200;
  if (flatData && flatData.length && flatData.length > 0) {
    minHeight = 18 * flatData.length + 150;
  }
  return minHeight + 'px';
}

function _getMinViewHeightForRawReturn(dateRange: fromModels.IDateRange): string {
  let minHeight = 200;
  if (dateRange) {
    const startYear = dateRange.startDate.getFullYear();
    const endYear = dateRange.endDate.getFullYear();
    minHeight = 18 * (endYear - startYear) + 150;
  }
  return minHeight + 'px';
}
