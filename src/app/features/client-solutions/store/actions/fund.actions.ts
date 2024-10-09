import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FundActionsType {

    LOAD_FUNDS = '[ClientSolutions-Funds] Load funds',
    LOAD_FUNDS_COMPLETE = '[ClientSolutions-Funds] Load funds complete',
    LOAD_FUNDS_FAILED = '[ClientSolutions-Funds] Load funds failed',

    SELECT_FUND = '[ClientSolutions-Fund] Select fund',

    ADD_FUND = '[ClientSolutions-Funds] Add fund complete',
    ADD_FUND_COMPLETE = '[ClientSolutions-Funds] Add fund complete',
    ADD_FUND_FAILED = '[ClientSolutions-Funds] Add fund failed',

    UPDATE_FUND = '[ClientSolutions-Funds] Update fund',
    UPDATE_FUND_COMPLETE = '[ClientSolutions-Funds] Update fund complete',
    UPDATE_FUND_FAILED = '[ClientSolutions-Funds] Update fund failed',

    REMOVE_FUND = '[ClientSolutions-Funds] Remove fund',
    REMOVE_FUND_COMPLETE = '[ClientSolutions-Funds] Remove fund complete',
    REMOVE_FUND_FAILED = '[ClientSolutions-Funds] Remove fund failed',

    LOAD_FUND_BENCHMARKS = '[ClientSolutions-Funds] Load fund benchmarks',
    LOAD_FUND_BENCHMARKS_COMPLETE = '[ClientSolutions-Funds] Load fund benchmarks complete',
    LOAD_FUND_BENCHMARKS_FAILED = '[ClientSolutions-Funds] Load fund benchmarks failed',

    LOAD_TIMESERIES = '[ClientSolutions-Funds] Load timeseries',
    LOAD_TIMESERIES_COMPLETE = '[ClientSolutions-Funds] Load timeseries complete',
    LOAD_TIMESERIES_FAILED = '[ClientSolutions-Funds] Load timeseries failed',

    LOAD_STATISTICS = '[ClientSolutions-Funds] Load statistics',
    LOAD_STATISTICS_COMPLETE = '[ClientSolutions-Funds] Load statistics complete',
    LOAD_STATISTICS_FAILED = '[ClientSolutions-Funds] Load statistics failed',

    LOAD_HISTOGRAM = '[ClientSolutions-Funds] Load histogram',
    LOAD_HISTOGRAM_COMPLETE = '[ClientSolutions-Funds] Load histogram complete',
    LOAD_HISTOGRAM_FAILED = '[ClientSolutions-Funds] Load histogram failed',

    LOAD_SUMMARY = '[ClientSolutions-Funds] Load summary',
    LOAD_SUMMARY_COMPLETE = '[ClientSolutions-Funds] Load summary complete',
    LOAD_SUMMARY_FAILED = '[ClientSolutions-Funds] Load summary failed',

    LOAD_CORRELATION = '[ClientSolutions-Funds] Load correlation',
    LOAD_CORRELATION_COMPLETE = '[ClientSolutions-Funds] Load correlation complete',
    LOAD_CORRELATION_FAILED = '[ClientSolutions-Funds] Load correlation failed',

    ADD_BENCHMARK_TO_FUND = '[ClientSolutions-Funds] Add benchmark to fund',
    ADD_BENCHMARK_TO_FUND_COMPLETE = '[ClientSolutions-Funds] Add benchmark to fund complete',
    ADD_BENCHMARK_TO_FUND_FAILED = '[ClientSolutions-Funds] Add benchmarks to fund failed',

    REMOVE_BENCHMARK_FROM_FUND = '[ClientSolutions-Funds] Remove benchmarks from fund',
    REMOVE_BENCHMARK_FROM_FUND_COMPLETE = '[ClientSolutions-Funds] Remove benchmarks from fund complete',
    REMOVE_BENCHMARK_FROM_FUND_FAILED = '[ClientSolutions-Funds] Remove benchmarks from fund failed',

    CHANGE_REPORT_PARAMETER = '[ClientSolutions-Funds] Change report parameter',
    CHANGE_REPORT_PARAMETER_COMPLETE = '[ClientSolutions-Funds] Change report parameter complete',
    CHANGE_REPORT_PARAMETER_FAILED = '[ClientSolutions-Funds] Change report parameter failed',

    LOAD_RAW_RETURNS = '[ClientSolutions-Funds] Load raw returns',
    LOAD_RAW_RETURNS_COMPLETE = '[ClientSolutions-Funds] Load raw returns complete',
    LOAD_RAW_RETURNS_FAILED = '[ClientSolutions-Funds] Load raw returns failed',

    LOAD_DRAWDOWN = '[ClientSolutions-Funds] Load drawdown',
    LOAD_DRAWDOWN_COMPLETE = '[ClientSolutions-Funds] Load drawdown complete',
    LOAD_DRAWDOWN_FAILED = '[ClientSolutions-Funds] Load drawdown failed',

    LOAD_ALPHA_BETA = '[ClientSolutions] Load Alpha beta',
    LOAD_ALPHA_BETA_COMPLETE = '[ClientSolutions] Load Alpha beta complete',
    LOAD_ALPHA_BETA_FAILED = '[ClientSolutions] Load Alpha beta failed',

    LOAD_ROLLING_CORR = '[ClientSolutions] Load Rolling Correlation',
    LOAD_ROLLING_CORR_COMPLETE = '[ClientSolutions] Load Rolling Correlation Complete',
    LOAD_ROLLING_CORR_FAILED = '[ClientSolutions] Load Rolling Correlation Failed',

    FILTER_BENCHMARKS = '[ClientSolutions] Filter benchmarks',
    DOWNLOAD_NET_RETURNS = '[ClientSolutions] Download net returns',

    LOAD_ROLLING_CORR_WINDOW = '[ClientSolutions] Load Rolling Correlation Window',
    LOAD_ROLLING_CORR_WINDOW_COMPLETE = '[ClientSolutions] Load Rolling Correlation Window Complete',
    LOAD_ROLLING_CORR_WINDOW_FAILED = '[ClientSolutions] Load Rolling Correlation Window Failed',

    SAVE_FUND_RETURNS = '[ClientSolutions] Save Fund Net Returns',
    SAVE_FUND_RETURNS_COMPLETE = '[ClientSolutions] Save Fund Net Returns Complete',
    SAVE_FUND_RETURNS_FAILED = '[ClientSolutions] Save Fund Net Returns Failed',

    SAVE_FUND_RETURNS_POPUP_DISMISSED = '[ClientSolutions] Save Fund Returns Popup Dismissed',

    REFRESH_DATA = '[ClientSolutions] refresh data',
    REFRESH_DATA_COMPLETE = '[ClientSolutions] refresh data complete',
    REFRESH_DATA_FAILED = '[ClientSolutions] refresh data failed',
}

export class LoadFunds implements Action {
    readonly type = FundActionsType.LOAD_FUNDS;
}

export class LoadFundsComplete implements Action {
    readonly type = FundActionsType.LOAD_FUNDS_COMPLETE;

    constructor(public payload: fromModels.IFund[]) { }
}

export class LoadFundsFailed implements Action {
    readonly type = FundActionsType.LOAD_FUNDS_FAILED;

    constructor(public payload?: any) { }
}

export class SelectFund implements Action {
    readonly type = FundActionsType.SELECT_FUND;

    constructor(public payload: fromModels.IFund) { }
}

export class AddFund implements Action {
    readonly type = FundActionsType.ADD_FUND;

    constructor(public payload: fromModels.IFund) { }
}

export class AddFundComplete implements Action {
    readonly type = FundActionsType.ADD_FUND_COMPLETE;

    constructor(public payload: fromModels.IFund) { }
}

export class AddFundFailed implements Action {
    readonly type = FundActionsType.ADD_FUND_FAILED;

    constructor(public payload?: any) { }
}

export class UpdateFund implements Action {
    readonly type = FundActionsType.UPDATE_FUND;

    constructor(public payload: fromModels.IFund) { }
}

export class UpdateFundComplete implements Action {
    readonly type = FundActionsType.UPDATE_FUND_COMPLETE;

    constructor(public payload: fromModels.IFund) { }
}

export class UpdateFundFailed implements Action {
    readonly type = FundActionsType.UPDATE_FUND_FAILED;

    constructor(public payload?: any) { }
}

export class RemoveFund implements Action {
    readonly type = FundActionsType.REMOVE_FUND;

    constructor(public payload: fromModels.IFund) { }
}

export class RemoveFundComplete implements Action {
    readonly type = FundActionsType.REMOVE_FUND_COMPLETE;

    constructor(public payload: fromModels.IFund) { }
}

export class RemoveFundFailed implements Action {
    readonly type = FundActionsType.REMOVE_FUND_FAILED;

    constructor(public payload?: any) { }
}

export class LoadFundBenchmarks implements Action {
    readonly type = FundActionsType.LOAD_FUND_BENCHMARKS;

    constructor(public payload: fromModels.IFund) { }
}

export class LoadFundBenchmarksComplete implements Action {
    readonly type = FundActionsType.LOAD_FUND_BENCHMARKS_COMPLETE;

    constructor(public payload: fromModels.IFundBenchmarks) { }
}

export class LoadFundBenchmarksFailed implements Action {
    readonly type = FundActionsType.LOAD_FUND_BENCHMARKS_FAILED;

    constructor(public payload?: any) { }
}

export class AddBenchmarkToFund implements Action {
    readonly type = FundActionsType.ADD_BENCHMARK_TO_FUND;

    constructor(public payload: fromModels.IFundBenchmark) { }
}

export class AddBenchmarkToFundComplete implements Action {
    readonly type = FundActionsType.ADD_BENCHMARK_TO_FUND_COMPLETE;

    constructor(public payload: fromModels.IBenchmark[]) { }
}

export class AddBenchmarkToFundFailed implements Action {
    readonly type = FundActionsType.ADD_BENCHMARK_TO_FUND_FAILED;

    constructor(public payload?: any) { }
}

export class RemoveBenchmarkFromFund implements Action {
    readonly type = FundActionsType.REMOVE_BENCHMARK_FROM_FUND;

    constructor(public payload: fromModels.IFundBenchmark) { }
}

export class RemoveBenchmarkFromFundComplete implements Action {
    readonly type = FundActionsType.REMOVE_BENCHMARK_FROM_FUND_COMPLETE;

    constructor(public payload: fromModels.IBenchmark) { }
}

export class RemoveBenchmarkFromFundFailed implements Action {
    readonly type = FundActionsType.REMOVE_BENCHMARK_FROM_FUND_FAILED;

    constructor(public payload?: any) { }
}

export class LoadTimeseries implements Action {
    readonly type = FundActionsType.LOAD_TIMESERIES;

    constructor(public payload: fromModels.IReportParameter) { }
}

export class LoadTimeseriesComplete implements Action {
    readonly type = FundActionsType.LOAD_TIMESERIES_COMPLETE;

    constructor(public payload: fromModels.ITimeseriesResponse) { }
}

export class LoadTimeseriesFailed implements Action {
    readonly type = FundActionsType.LOAD_TIMESERIES_FAILED;

    constructor(public payload?: any) { }
}


export class LoadStatistics implements Action {
    readonly type = FundActionsType.LOAD_STATISTICS;

    constructor(public payload: fromModels.IReportParameter) { }
}

export class LoadStatisticsComplete implements Action {
    readonly type = FundActionsType.LOAD_STATISTICS_COMPLETE;

    constructor(public payload: fromModels.IStatistics[]) { }
}

export class LoadStatisticsFailed implements Action {

    readonly type = FundActionsType.LOAD_STATISTICS_FAILED;

    constructor(public payload?: any) { }
}

export class LoadHistogram implements Action {
    
    readonly type = FundActionsType.LOAD_HISTOGRAM;

    constructor(public payload: fromModels.IReportParameter) { }
}

export class LoadHistogramComplete implements Action {
    readonly type = FundActionsType.LOAD_HISTOGRAM_COMPLETE;
    constructor(public payload: fromModels.IHistogram[]) { }
}

export class LoadHistogramFailed implements Action {
    readonly type = FundActionsType.LOAD_HISTOGRAM_FAILED;
    constructor(public payload?: any) { }
}

export class LoadCorrelation implements Action {
    readonly type = FundActionsType.LOAD_CORRELATION;
    constructor(public payload: fromModels.IReportParameter) { }
}

export class LoadCorrelationComplete implements Action {
    readonly type = FundActionsType.LOAD_CORRELATION_COMPLETE;
    constructor(public payload: fromModels.ICorrelation[]) { }
}

export class LoadCorrelationFailed implements Action {
    readonly type = FundActionsType.LOAD_CORRELATION_FAILED;
    constructor(public payload?: any) { }
}

export class ChangeReportParameter implements Action {
    readonly type = FundActionsType.CHANGE_REPORT_PARAMETER;

    constructor(public payload: fromModels.IReportParameter) { }
}

export class ChangeReportParameterComplete implements Action {
    readonly type = FundActionsType.CHANGE_REPORT_PARAMETER_COMPLETE;

    constructor(public payload: fromModels.IReportParameter) { }
}

export class ChangeReportParameterFailed implements Action {
    readonly type = FundActionsType.CHANGE_REPORT_PARAMETER_FAILED;

    constructor(public payload?: any) { }
}

export class LoadRawReturns implements Action {
    readonly type = FundActionsType.LOAD_RAW_RETURNS;

    constructor(public payload: fromModels.IReportParameter) { }
}

export class LoadRawReturnsComplete implements Action {
    readonly type = FundActionsType.LOAD_RAW_RETURNS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadRawReturnsFailed implements Action {
    readonly type = FundActionsType.LOAD_RAW_RETURNS_FAILED;

    constructor(public payload?: any) { }
}

export class LoadSummary implements Action {
    readonly type = FundActionsType.LOAD_SUMMARY;
    constructor(public payload: fromModels.IReportParameter) { }
}

export class LoadSummaryComplete implements Action {
    readonly type = FundActionsType.LOAD_SUMMARY_COMPLETE;
    constructor(public payload: fromModels.ISummary[]) { }
}

export class LoadSummaryFailed implements Action {
    readonly type = FundActionsType.LOAD_SUMMARY_FAILED;
    constructor(public payload?: any) { }
}

export class LoadDrawdown implements Action {
    readonly type = FundActionsType.LOAD_DRAWDOWN;
    constructor(public payload: fromModels.IReportParameter) { }
}

export class LoadDrawdownComplete implements Action {
    readonly type = FundActionsType.LOAD_DRAWDOWN_COMPLETE;
    constructor(public payload: fromModels.IDrawdown) { }
}

export class LoadDrawdownFailed implements Action {
    readonly type = FundActionsType.LOAD_DRAWDOWN_FAILED;
    constructor(public payload?: any) { }
}

export class LoadAlphaBeta implements Action {
    readonly type = FundActionsType.LOAD_ALPHA_BETA;
    constructor(public payload: fromModels.IFund) { }
}

export class LoadAlphaBetaComplete implements Action {
    readonly type = FundActionsType.LOAD_ALPHA_BETA_COMPLETE;
    constructor(public payload: fromModels.IAlphaBetaStats[]) { }
}

export class LoadAlphaBetaFailed implements Action {
    readonly type = FundActionsType.LOAD_ALPHA_BETA_FAILED;
    constructor(public payload: any) { }
}

export class LoadRollingCorr implements Action {
    readonly type = FundActionsType.LOAD_ROLLING_CORR;
    constructor(public payload: fromModels.IReportParameter) { }
}

export class LoadRollingCorrComplete implements Action {
    readonly type = FundActionsType.LOAD_ROLLING_CORR_COMPLETE;
    constructor(public payload: string) { }
}

export class LoadRollingCorrFailed implements Action {
    readonly type = FundActionsType.LOAD_ROLLING_CORR_FAILED;
    constructor(public payload: any) { }
}

export class LoadRollingCorrWindow implements Action {
    readonly type = FundActionsType.LOAD_ROLLING_CORR_WINDOW;
}

export class FilterBenchmarks implements Action {
    readonly type = FundActionsType.FILTER_BENCHMARKS;
    constructor(public payload: fromModels.IBenchmark[]) { }
}

export class DownloadNetReturns implements Action {
    readonly type = FundActionsType.DOWNLOAD_NET_RETURNS;

    constructor(public payload: fromModels.IFund) {}
}

export class LoadRollingCorrWindowComplete implements Action {
    readonly type = FundActionsType.LOAD_ROLLING_CORR_WINDOW_COMPLETE;
    constructor(public payload: fromModels.IRollingCorrWindow[]) { }
}


export class LoadRollingCorrWindowFailed implements Action {
    readonly type = FundActionsType.LOAD_ROLLING_CORR_WINDOW_FAILED;
    constructor(public payload: string) { }
}

export class SaveFundReturns implements Action {
    readonly type = FundActionsType.SAVE_FUND_RETURNS;
    constructor(public payload: fromModels.IFundReturn) {}
}

export class SaveFundReturnsComplete implements Action {
    readonly type = FundActionsType.SAVE_FUND_RETURNS_COMPLETE;
    constructor(public payload: fromModels.IFundReturn) {}
}

export class SaveFundReturnsFailed implements Action {
    readonly type = FundActionsType.SAVE_FUND_RETURNS_FAILED;
    constructor(public payload: string) {}
}

export class SaveFundReturnsPopupDismissed implements Action {
    readonly type = FundActionsType.SAVE_FUND_RETURNS_POPUP_DISMISSED;
    constructor(public payload:boolean){}
}








export class RefreshData implements Action {
    readonly type = FundActionsType.REFRESH_DATA;
    constructor(public payload: fromModels.RefreshDataReqParameter) {}
}

export class RefreshDataComplete implements Action {
    readonly type = FundActionsType.REFRESH_DATA_COMPLETE;
}

export class RefreshDataFailed implements Action {
    readonly type = FundActionsType.REFRESH_DATA_FAILED;
    constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */

export type FundActions
    = LoadFunds
    | LoadFundsComplete
    | LoadFundsFailed

    | SelectFund

    | AddFund
    | AddFundComplete
    | AddFundFailed

    | UpdateFund
    | UpdateFundComplete
    | UpdateFundFailed

    | RemoveFund
    | RemoveFundComplete
    | RemoveFundFailed

    | FilterBenchmarks
    | DownloadNetReturns

    | LoadFundBenchmarks
    | LoadFundBenchmarksComplete
    | LoadFundBenchmarksFailed

    | AddBenchmarkToFund
    | AddBenchmarkToFundComplete
    | AddBenchmarkToFundFailed

    | RemoveBenchmarkFromFund
    | RemoveBenchmarkFromFundComplete
    | RemoveBenchmarkFromFundFailed

    | LoadTimeseries
    | LoadTimeseriesComplete
    | LoadTimeseriesFailed

    | LoadStatistics
    | LoadStatisticsComplete
    | LoadStatisticsFailed

    | LoadHistogram
    | LoadHistogramComplete
    | LoadHistogramFailed

    | LoadSummary
    | LoadSummaryComplete
    | LoadSummaryFailed

    | LoadCorrelation
    | LoadCorrelationComplete
    | LoadCorrelationFailed

    | ChangeReportParameter
    | ChangeReportParameterComplete
    | ChangeReportParameterFailed

    | LoadRawReturns
    | LoadRawReturnsComplete
    | LoadRawReturnsFailed

    | LoadDrawdown
    | LoadDrawdownComplete
    | LoadDrawdownFailed

    | LoadAlphaBeta
    | LoadAlphaBetaComplete
    | LoadAlphaBetaFailed

    | LoadRollingCorr
    | LoadRollingCorrComplete
    | LoadRollingCorrFailed

    | LoadRollingCorrWindow
    | LoadRollingCorrWindowComplete
    | LoadRollingCorrWindowFailed

    | SaveFundReturns
    | SaveFundReturnsComplete
    | SaveFundReturnsFailed
    | SaveFundReturnsPopupDismissed

    | RefreshData
    | RefreshDataComplete
    | RefreshDataFailed;
