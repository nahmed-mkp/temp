import * as fromActions from '../actions';
import * as fromModels from '../../models';
import { FundBenchmark } from '../../models';

export interface FundState {
  ids: string[];
  entities: { [id: string]: fromModels.IFund };

  selectedFund?: fromModels.IFund;
  params: fromModels.IReportParameter;

  rollingCorrWindow: fromModels.IRollingCorrWindow[];
  filteredBenchmarks: fromModels.IBenchmark[];

  loading: boolean;
  loaded: boolean;
  error?: string;

  timeseries: any;
  timeseriesLoaded: boolean;
  timeseriesLoading: boolean;

  rawReturns: any;
  rawReturnsLoaded: boolean;
  rawReturnsLoading: boolean;

  stats: fromModels.IStatistics[];
  statisticsLoaded: boolean;
  statisticsLoading: boolean;

  correlation: fromModels.ICorrelation[];
  correlationLoaded: boolean;
  correlationLoading: boolean;

  histogram: fromModels.IHistogram[];
  histogramLoaded: boolean;
  histogramLoading: boolean;

  summary: fromModels.ISummary[];
  summaryLoaded: boolean;
  summaryLoading: boolean;

  drawdown: fromModels.IDrawdown;
  drawdownLoaded: boolean;
  drawdownLoading: boolean;

  alphaBeta: fromModels.IAlphaBetaStats[];
  alphaBetaLoaded: boolean;
  alphaBetaLoading: boolean;

  rollingCorr: string;
  rollingCorrLoaded: boolean;
  rollingCorrLoading: boolean;

  rollingCorrWindowLoaded: boolean;

  fundReturnsSaving: boolean;
  fundReturnsSaved: boolean;

  refreshDataPending: boolean;
  refreshDataComplete: boolean;
  refreshDataError?: string;
}

const initialState: FundState = {
  ids: [],
  entities: {},

  rollingCorrWindow: null,
  params: null,
  filteredBenchmarks: [],

  loading: false,
  loaded: false,

  timeseries: null,
  timeseriesLoading: false,
  timeseriesLoaded: false,

  rawReturns: null,
  rawReturnsLoading: false,
  rawReturnsLoaded: false,

  stats: [],
  statisticsLoading: false,
  statisticsLoaded: false,

  correlation: null,
  correlationLoading: false,
  correlationLoaded: false,

  histogram: [],
  histogramLoading: false,
  histogramLoaded: false,

  summary: null,
  summaryLoading: false,
  summaryLoaded: false,

  drawdown: null,
  drawdownLoading: false,
  drawdownLoaded: false,

  alphaBeta: null,
  alphaBetaLoading: false,
  alphaBetaLoaded: false,

  rollingCorr: null,
  rollingCorrLoaded: false,
  rollingCorrLoading: false,

  rollingCorrWindowLoaded: false,

  fundReturnsSaving: false,
  fundReturnsSaved: false,


  refreshDataPending: false,
  refreshDataComplete: false,
};


class FundsReducerHelper {

  constructor() { }

  public intializeFunds(state: FundState): FundState {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    };
  }

  public loadFunds(state: FundState, payload: fromModels.IFund[]): FundState {
    const ids = payload.map((fund: fromModels.IFund) => fund.code);
    let defaultFund: fromModels.Fund;
    const newEntities = payload.reduce(
      (entities: { [id: string]: fromModels.Fund }, fund: fromModels.IFund) => {

        const formattedFund: fromModels.Fund = new fromModels.Fund(fund);
        if (formattedFund.code === 'MKPOPOS') {
          defaultFund = formattedFund;
        }
        return {
          ...entities,
          [fund.code]: formattedFund
        };
      },
      {}
    );
    return {
      ...state,
      ids: [...ids],
      entities: newEntities,
      loading: false,
      loaded: true,

      selectedFund: defaultFund,
      params: {
        fund: defaultFund,
        dateRange: {
          startDate: new Date(defaultFund.inceptionDate),
          endDate: new Date()
        }
      }
    };
  }

  public loadBenchmarks(state: FundState, payload: fromModels.IFundBenchmarks): FundState {
    const fund = payload.fund;
    const benchmarks: fromModels.IBenchmark[] = payload.benchmarks;
    const existingFund = Object.assign({}, state.entities[fund.code],
      { benchmarkIds: benchmarks.map((benchmark) => benchmark.id), benchmarksLoaded: true });
    if (existingFund) {
      const entities = Object.assign({}, state.entities, { [existingFund.code]: existingFund });
      return {
        ...state,
        entities: entities
      };
    } else {
      return state;
    }
  }

  public loadFundBenchmarks(state: FundState, payload: fromModels.IFundBenchmarks): FundState {
    const fund = Object.assign({}, state.entities[payload.fund.code], { benchmarksLoaded: true });
    fund.benchmarks = [...payload.benchmarks];
    return {
      ...state,
      entities: Object.assign({}, state.entities, { [fund.code]: fund }),
      filteredBenchmarks: [...payload.benchmarks]
    };
  }

  public loadStatistics(state: FundState, payload: fromModels.IStatistics[]) {
    return {
      ...state,
      stats: [...payload],
      statisticsLoaded: true,
      statisticsLoading: false,
    };
  }

  public loadTimeseries(state: FundState, payload: fromModels.ITimeseriesResponse): FundState {
    return {
      ...state,
      timeseries: payload.value,
      timeseriesLoaded: true,
      timeseriesLoading: false,
    };
  }

  public loadRawReturns(state: FundState, payload: fromModels.ITimeseriesResponse): FundState {
    return {
      ...state,
      rawReturns: payload.value,
      rawReturnsLoaded: true,
      rawReturnsLoading: false,
    };
  }

  public loadHistogram(state: FundState, payload: fromModels.IHistogram[]) {
    return {
      ...state,
      histogram: [...payload],
      histogramLoaded: true,
      histogramLoading: false,
    };
  }

  public loadSummary(state: FundState, payload: fromModels.ISummary[]) {
    return {
      ...state,
      summary: [...payload],
      summaryLoaded: true,
      summaryLoading: false,
    };
  }

  public loadCorrelation(state: FundState, payload: fromModels.ICorrelation[]) {
    return {
      ...state,
      correlation: [...payload],
      correlationLoaded: true,
      correlationLoading: false,
    };
  }

  public loadDrawdown(state: FundState, payload: fromModels.IDrawdown) {
    return {
      ...state,
      drawdownLoaded: true,
      drawdownLoading: false,
      drawdown: payload
    };
  }

  public changeReportParameter(state: FundState, payload: fromModels.IReportParameter): FundState {
    const params: fromModels.IReportParameter = Object.assign({}, state.params, { fund: payload.fund, dateRange: payload.dateRange });
    return {
      ...state,
      params: params,

      statisticsLoading: true,
      statisticsLoaded: false,

      timeseriesLoading: true,
      timeseriesLoaded: false,

      correlationLoading: true,
      correlationLoaded: false,

      drawdownLoading: true,
      drawdownLoaded: false,

      histogramLoading: true,
      histogramLoaded: false,

      alphaBetaLoading: true,
      alphaBetaLoaded: false,

      rawReturnsLoading: true,
      rawReturnsLoaded: false,
    };
  }

  public updateError(state: FundState, payload: any): FundState {
    return {
      ...state,
      error: payload
    };
  }

  public downloadRawReturns(state: FundState, payload: any): FundState {
    return state;
  }

  public loadAlphaBeta(state: FundState, payload: fromModels.IAlphaBetaStats[]): FundState {
    return {
      ...state,
      alphaBetaLoaded: true,
      alphaBetaLoading: false,
      alphaBeta: payload
    };
  }

  public loadRollingCorr(state: FundState, payload: string): FundState {
    return {
      ...state,
      rollingCorrLoaded: true,
      rollingCorrLoading: false,
      rollingCorr: payload
    };
  }

  public loadRollingCorrWindow(state: FundState, payload: fromModels.IRollingCorrWindow[]): FundState {
    return {
      ...state,
      rollingCorrWindowLoaded: true,
      rollingCorrWindow: payload
    };
  }

}

export function reducer(
  state = initialState,
  action: fromActions.FundActions
): FundState {

  const helper = new FundsReducerHelper();

  switch (action.type) {

    case fromActions.FundActionsType.LOAD_FUNDS: {
      return helper.intializeFunds(state);
    }

    case fromActions.FundActionsType.LOAD_FUNDS_COMPLETE: {
      return helper.loadFunds(state, action.payload);
    }

    case fromActions.FundActionsType.SELECT_FUND: {
      return {
        ...state,
        selectedFund: action.payload
      };
    }

    case fromActions.FundActionsType.ADD_FUND: {
      return {
        ...state
      };
    }

    case fromActions.FundActionsType.ADD_FUND_COMPLETE: {
      return {
        ...state
      };
    }

    case fromActions.FundActionsType.UPDATE_FUND: {
      return {
        ...state
      };
    }

    case fromActions.FundActionsType.UPDATE_FUND_COMPLETE: {
      return {
        ...state
      };
    }

    case fromActions.FundActionsType.REMOVE_FUND: {
      return {
        ...state
      };
    }

    case fromActions.FundActionsType.REMOVE_FUND_COMPLETE: {
      return {
        ...state
      };
    }

    case fromActions.FundActionsType.ADD_BENCHMARK_TO_FUND: {
      // TODO
      return {
        ...state
      };
    }

    case fromActions.FundActionsType.ADD_BENCHMARK_TO_FUND_COMPLETE: {
      // TODO
      return {
        ...state
      };
    }

    case fromActions.FundActionsType.REMOVE_BENCHMARK_FROM_FUND: {
      // TODO
      return {
        ...state
      };
    }

    case fromActions.FundActionsType.REMOVE_BENCHMARK_FROM_FUND_COMPLETE: {
      // TODO
      return {
        ...state
      };
    }

    case fromActions.FundActionsType.FILTER_BENCHMARKS: {
      return {
        ...state,
        filteredBenchmarks: [...action.payload]
      };
    }

    case fromActions.FundActionsType.LOAD_STATISTICS: {
      return {
        ...state,
        statisticsLoaded: false
      };
    }
    case fromActions.FundActionsType.LOAD_TIMESERIES: {
      return {
        ...state,
        timeseriesLoaded: false
      };
    }
    case fromActions.FundActionsType.LOAD_RAW_RETURNS: {
      return {
        ...state,
        rawReturnsLoaded: false
      };
    }
    case fromActions.FundActionsType.LOAD_HISTOGRAM: {
      return {
        ...state,
        histogramLoaded: false
      };
    }
    case fromActions.FundActionsType.LOAD_SUMMARY: {
      return {
        ...state,
        summaryLoaded: false
      };
    }
    case fromActions.FundActionsType.LOAD_CORRELATION: {
      return {
        ...state,
        correlationLoaded: false
      };
    }

    case fromActions.FundActionsType.LOAD_DRAWDOWN: {
      return {
        ...state,
        drawdownLoaded: false
      };
    }

    case fromActions.FundActionsType.LOAD_ALPHA_BETA: {
      return {
        ...state,
        alphaBetaLoaded: false
      };
    }

    case fromActions.FundActionsType.LOAD_ROLLING_CORR: {
      return {
        ...state,
        rollingCorrLoaded: false
      };
    }

    case fromActions.FundActionsType.LOAD_ROLLING_CORR_WINDOW: {
      return {
        ...state,
        rollingCorrWindowLoaded: false
      };
    }

    case fromActions.FundActionsType.SAVE_FUND_RETURNS: {
      return {
        ...state,
        fundReturnsSaving: true,
        fundReturnsSaved: false
      };
    }

    case fromActions.FundActionsType.SAVE_FUND_RETURNS_FAILED: {
      return {
        ...state,
        fundReturnsSaving: false,
        fundReturnsSaved: false
      };
    }

    case fromActions.FundActionsType.LOAD_FUND_BENCHMARKS_COMPLETE: {
      return helper.loadFundBenchmarks(state, action.payload);
    }

    case fromActions.FundActionsType.LOAD_STATISTICS_COMPLETE: {
      return helper.loadStatistics(state, action.payload);
    }
    case fromActions.FundActionsType.LOAD_TIMESERIES_COMPLETE: {
      return helper.loadTimeseries(state, action.payload);
    }
    case fromActions.FundActionsType.LOAD_HISTOGRAM_COMPLETE: {
      return helper.loadHistogram(state, action.payload);
    }
    case fromActions.FundActionsType.LOAD_SUMMARY_COMPLETE: {
      return helper.loadSummary(state, action.payload);
    }
    case fromActions.FundActionsType.LOAD_DRAWDOWN_COMPLETE: {
      return helper.loadDrawdown(state, action.payload);
    }
    case fromActions.FundActionsType.LOAD_CORRELATION_COMPLETE: {
      return helper.loadCorrelation(state, action.payload);
    }
    case fromActions.FundActionsType.LOAD_RAW_RETURNS_COMPLETE: {
      return helper.loadRawReturns(state, action.payload);
    }
    case fromActions.FundActionsType.LOAD_ALPHA_BETA_COMPLETE: {
      return helper.loadAlphaBeta(state, action.payload);
    }
    case fromActions.FundActionsType.LOAD_ROLLING_CORR_COMPLETE: {
      return helper.loadRollingCorr(state, action.payload);
    }

    case fromActions.FundActionsType.LOAD_ROLLING_CORR_WINDOW_COMPLETE: {
      return helper.loadRollingCorrWindow(state, action.payload);
    }

    case fromActions.FundActionsType.SAVE_FUND_RETURNS_COMPLETE: {
      return {
        ...state,
        fundReturnsSaving: false,
        fundReturnsSaved: true
      };
    }

    case fromActions.FundActionsType.SAVE_FUND_RETURNS_POPUP_DISMISSED: {
      return {
        ...state,
        fundReturnsSaved: false,
        fundReturnsSaving: false
      };
    }

    case fromActions.FundActionsType.LOAD_ROLLING_CORR_WINDOW_FAILED:
    case fromActions.FundActionsType.LOAD_ROLLING_CORR_FAILED:
    case fromActions.FundActionsType.LOAD_FUNDS_FAILED:
    case fromActions.FundActionsType.LOAD_ALPHA_BETA_FAILED:
    case fromActions.FundActionsType.LOAD_FUND_BENCHMARKS_FAILED:
    case fromActions.FundActionsType.ADD_FUND_FAILED:
    case fromActions.FundActionsType.UPDATE_FUND_FAILED:
    case fromActions.FundActionsType.REMOVE_FUND_FAILED:
    case fromActions.FundActionsType.ADD_BENCHMARK_TO_FUND_FAILED:
    case fromActions.FundActionsType.REMOVE_BENCHMARK_FROM_FUND_FAILED:
    case fromActions.FundActionsType.LOAD_STATISTICS_FAILED:
    case fromActions.FundActionsType.LOAD_TIMESERIES_FAILED:
    case fromActions.FundActionsType.LOAD_HISTOGRAM_FAILED:
    case fromActions.FundActionsType.LOAD_DRAWDOWN_FAILED:
    case fromActions.FundActionsType.LOAD_SUMMARY_FAILED:
    case fromActions.FundActionsType.LOAD_CORRELATION_FAILED:
    case fromActions.FundActionsType.SAVE_FUND_RETURNS_FAILED: {
      return helper.updateError(state, action.payload);
    }

    case fromActions.FundActionsType.CHANGE_REPORT_PARAMETER: {
      return helper.changeReportParameter(state, action.payload);
    }

    case fromActions.FundActionsType.LOAD_RAW_RETURNS_COMPLETE: {
      return helper.downloadRawReturns(state, action.payload);
    }


    case fromActions.FundActionsType.REFRESH_DATA: {
      return {
        ...state,
        refreshDataPending: true,
        refreshDataComplete: false,
        refreshDataError: null,
      }
    }

    case fromActions.FundActionsType.REFRESH_DATA_COMPLETE: {
      return {
        ...state,
        refreshDataPending: false,
        refreshDataComplete: true,
        refreshDataError: null,
      }
    }

    case fromActions.FundActionsType.REFRESH_DATA_FAILED: {
      return {
        ...state,
        refreshDataPending: false,
        refreshDataComplete: false,
        refreshDataError: action.payload,
      }
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: FundState) => state.ids;
export const getEntities = (state: FundState) => state.entities;
export const getLoadingStatus = (state: FundState) => state.loading;
export const getLoadedStatus = (state: FundState) => state.loaded;
export const getParams = (state: FundState) => state.params;
export const getError = (state: FundState) => state.error;
export const getSelectedFund = (state: FundState) => state.selectedFund;

export const getFilteredBenchmarks = (state: FundState) => state.filteredBenchmarks;

export const getStatistics = (state: FundState) => state.stats;
export const getStatisticsLoaded = (state: FundState) => state.statisticsLoaded;
export const getStatisticsLoading = (state: FundState) => state.statisticsLoading;

export const getTimeseries = (state: FundState) => state.timeseries;
export const getTimeseriesLoaded = (state: FundState) => state.timeseriesLoaded;
export const getTimeseriesLoading = (state: FundState) => state.timeseriesLoading;

export const getRawReturns = (state: FundState) => state.rawReturns;
export const getRawReturnsLoaded = (state: FundState) => state.rawReturnsLoaded;
export const getRawReturnsLoading = (state: FundState) => state.rawReturnsLoading;

export const getSummary = (state: FundState) => state.summary;
export const getSummaryLoaded = (state: FundState) => state.summaryLoaded;
export const getSummaryLoading = (state: FundState) => state.summaryLoading;

export const getHistogram = (state: FundState) => state.histogram;
export const getHistogramLoaded = (state: FundState) => state.histogramLoaded;
export const getHistogramLoading = (state: FundState) => state.histogramLoading;

export const getCorrelation = (state: FundState) => state.correlation;
export const getCorrelationLoaded = (state: FundState) => state.correlationLoaded;
export const getCorrelationLoading = (state: FundState) => state.correlationLoading;

export const getDrawdown = (state: FundState) => state.drawdown;
export const getDrawdownLoaded = (state: FundState) => state.drawdownLoaded;
export const getDrawdownLoading = (state: FundState) => state.drawdownLoading;

export const getAlphaBeta = (state: FundState) => state.alphaBeta;
export const getAlphaBetaLoaded = (state: FundState) => state.alphaBetaLoaded;
export const getAlphaBetaLoading = (state: FundState) => state.alphaBetaLoading;

export const getRollingCorr = (state: FundState) => state.rollingCorr;
export const getRollingCorrLoaded = (state: FundState) => state.rollingCorrLoaded;
export const getRollingCorrLoading = (state: FundState) => state.rollingCorrLoading;

export const getRollingCorrWindow = (state: FundState) => state.rollingCorrWindow;
export const getRollingCorrWindowLoaded = (state: FundState) => state.rollingCorrWindowLoaded;

export const getFundReturnSaving = (state: FundState) => state.fundReturnsSaving;
export const getFundReturnSaved = (state: FundState) => state.fundReturnsSaved;

export const getRefreshDataPending = (state: FundState) => state.refreshDataPending;
export const getRefreshDataComplete = (state: FundState) => state.refreshDataComplete;
export const getRefreshDataError = (state: FundState) => state.refreshDataError;
