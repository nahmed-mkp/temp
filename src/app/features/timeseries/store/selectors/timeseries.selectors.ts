import { createSelector } from '@ngrx/store';
import * as fromTimeseries from '../reducers/timeseries.reducer';
import * as fromFeature from '../reducers';

export const getTimeseriesState = createSelector(
    fromFeature.getState,
    (state: fromFeature.TimeseriesState) => state.timeseries
);

/* ================================ TABS  =============================== */

export const getTabs = createSelector(
    getTimeseriesState,
    fromTimeseries.getTabs
)

export const getCurrTab = createSelector(
    getTimeseriesState,
    fromTimeseries.getCurrTab
)

/* ================================ DATE RANGE  ====================== */

export const getStartDate = createSelector(
    getTimeseriesState,
    fromTimeseries.getStartDate
)

export const getEndDate = createSelector(
    getTimeseriesState,
    fromTimeseries.getEndDate
)

/* ================ TIMESERIES NAVIGATION NODES  ===================== */

export const getTimeseriesHierarchy = createSelector(
    getTimeseriesState,
    fromTimeseries.getTimeseriesHierarchy
);

export const getTimeseriesHierarchyLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getTimeseriesHierarchyLoading 
);

export const getTimeseriesHierarchyLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getTimeseriesHierarchyLoaded
);


export const getTimeseriesHierarchyError = createSelector(
    getTimeseriesState,
    fromTimeseries.getTimeseriesHierarchyError
);

/* ================ SELECTED TIMESERIES  ===================== */

// export const getSelectedTimeseries = createSelector(
//     getTimeseriesState, 
//     fromTimeseries.getSelectedTimeseries
// )

/* ============================ IMPORTABLE TIMESERIES   ======================== */

export const getImportableTimeseriesPortfolios = createSelector(
    getTimeseriesState,
    fromTimeseries.getImportableTimeseriesPortfolios
);

export const getImportableTimeseriesPortfoliosLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getImportableTimeseriesPortfoliosLoading
);

export const getImportableTimeseriesPortfoliosLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getImportableTimeseriesPortfoliosLoaded
);

export const getImportableTimeseriesPortfoliosError = createSelector(
    getTimeseriesState,
    fromTimeseries.getImportableTimeseriesPortfoliosError
);

/* ========================= CREATE TIMESERIES PORTFOLIO  ===================== */

export const getCreateTimeseriesPortfolio = createSelector(
    getTimeseriesState,
    fromTimeseries.getCreateTimeseriesPortfolio
);

export const getCreateTimeseriesPortfolioLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getCreateTimeseriesPortfolioLoading
);

export const getCreateTimeseriesPortfolioLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getCreateTimeseriesPortfolioLoaded
);

export const getCreateTimeseriesPortfolioError = createSelector(
    getTimeseriesState,
    fromTimeseries.getCreateTimeseriesPortfolioError
);

/* ============================ UPDATE TIMESERIES PORTFOLIO  ============================= */

export const getUpdatePortfolio = createSelector(
    getTimeseriesState,
    fromTimeseries.getUpdatePortfolio
);

export const getUpdatePortfolioLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getUpdatePortfolioLoading
);

export const getUpdatePortfolioLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getUpdatePortfolioLoaded
);

export const getUpdatePortfolioError = createSelector(
    getTimeseriesState,
    fromTimeseries.getUpdatePortfolioError
);

/* ================================  CHART DATA ============================ */

export const getSelectedTimeseriesChartData = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedTimeseriesChartData
)

export const getSelectedTimeseriesChartDataLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedTimeseriesChartDataLoading
)

export const getSelectedTimeseriesChartDataLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedTimeseriesChartDataLoaded
)

export const getSelectedTimeseriesChartDataError = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedTimeseriesChartDataError
)

/* ============================ STAT DATA ============================ */

export const getSelectedTimeseriesStats = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedTimeseriesStats
)

export const getSelectedTimeseriesStatsLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedTimeseriesStatsLoading
)

export const getSelectedTimeseriesStatsLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedTimeseriesStatsLoaded
)

export const getSelectedTimeseriesStatsError = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedTimeseriesStatsError
)

/* ============================== DRAWDOWN DATA ======================= */

export const getDrawdownData = createSelector(
    getTimeseriesState,
    fromTimeseries.getDrawdownData
)

export const getDrawdownDataLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getDrawdownDataLoading
)

export const getDrawdownDataLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getDrawdownDataLoaded
)

export const getDrawdownDataError = createSelector(
    getTimeseriesState,
    fromTimeseries.getDrawdownDataError
)

export const getSelectedDrawdownTimeseries = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedDrawdownTimeseries
)

/* ======================= REGRESSION DATA =============================== */

export const getSelectedRegressionViewMode = createSelector(
    getTimeseriesState,
    fromTimeseries.getRegressionViewMode
)

export const getRegressionData = createSelector(
    getTimeseriesState,
    fromTimeseries.getRegressionData
)

export const getRegressionDataLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getRegressionDataLoading
)

export const getRegressionDataLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getRegressionDataLoaded
)

export const getRegressionDataError = createSelector(
    getTimeseriesState,
    fromTimeseries.getRegressionDataError
)

/* ======================= SELECTED REGRESSION DATA =============================== */

export const getSelectedRegressionTimeseries = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedRegressionTimeseries
)

export const getSelectedRegressionTimeseriesRow = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedRegressionTimeseriesRow
)

/* ======================= MISC =============================== */

export const getPortfolioFromUrlFailed = createSelector(
    getTimeseriesState,
    fromTimeseries.getLoadPortfolioFromUrlError
)

export const getSelectedTimeseriesWithinTab = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedTimeseriesWithinTab
)

/* ====================== SIMPLE MOVING AVG ================== */

export const getSimpleMovingAvgData = createSelector(
    getTimeseriesState,
    fromTimeseries.getSimpleMovingAvgData
)

export const getSimpleMovingAvgDataLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getSimpleMovingAvgDataLoading
)

export const getSimpleMovingAvgDataLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getSimpleMovingAvgDataLoaded
)

export const getSimpleMovingAvgDataError = createSelector(
    getTimeseriesState,
    fromTimeseries.getSimpleMovingAvgDataError
)

/* ==================== BOLLINGER BANDS ======================== */

export const getBollingerBandsData = createSelector(
    getTimeseriesState,
    fromTimeseries.getBollingerBandsData
)

export const getBollingerBandsDataLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getBollingerBandsDataLoading
)

export const getBollingerBandsDataLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getBollingerBandsDataLoaded
)

export const getBollingerBandsDataError = createSelector(
    getTimeseriesState,
    fromTimeseries.getBollingerBandsDataError
)

/* ================================= RSI ============================= */

export const getRelativeStrengthIndicatorData = createSelector(
    getTimeseriesState,
    fromTimeseries.getRelativeStrengthIndicatorData
)

export const getRelativeStrengthIndicatorDataLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getRelativeStrengthIndicatorDataLoading
)

export const getRelativeStrengthIndicatorDataLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getRelativeStrengthIndicatorDataLoaded
)

export const getRelativeStrengthIndicatorDataError = createSelector(
    getTimeseriesState,
    fromTimeseries.getRelativeStrengthIndicatorDataError
)

/* ============================= MACD ========================= */

export const getMovingAverageConvergenceDivergenceData = createSelector(
    getTimeseriesState,
    fromTimeseries.getMovingAverageConvergenceDivergenceData
)

export const getMovingAverageConvergenceDivergenceDataLoading = createSelector(
    getTimeseriesState,
    fromTimeseries.getMovingAverageConvergenceDivergenceDataLoading
)

export const getMovingAverageConvergenceDivergenceDataLoaded = createSelector(
    getTimeseriesState,
    fromTimeseries.getMovingAverageConvergenceDivergenceDataLoaded
)

export const getMovingAverageConvergenceDivergenceDataError = createSelector(
    getTimeseriesState,
    fromTimeseries.getMovingAverageConvergenceDivergenceDataError
)

export const getSelectedTechnicalIndicator = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedTechnicalIndicator
)

/* ============================= DERIVED TIMESERIES ========================= */

export const getDerivedTimeseries = createSelector(
    getTimeseriesState,
    fromTimeseries.getDerivedTimeseries
)


export const getScratchpadDeleted = createSelector(
    getTimeseriesState,
    fromTimeseries.getScratchpadDeleted
)