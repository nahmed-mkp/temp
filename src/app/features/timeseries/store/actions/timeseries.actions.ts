import * as fromModels from '../../models/timeseries.models';
import { createAction, props } from '@ngrx/store';


export const updateStartDate = createAction('[Timeseries] Update start date range', (startDate: Date) => ({startDate}));
export const updateEndDate = createAction('[Timeseries] Update end date range', (endDate: Date) => ({endDate}));

export const loadTimeseriesHierarchyData = createAction('[Timeseries] Load timeseries hierarchy data');
export const loadTimeseriesHierarchyDataComplete = createAction('[Timeseries] Load timeseries hierarchy data complete', (payload: any[]) => ({payload}));
export const loadTimeseriesHierarchyDataFailed = createAction('[Timeseries] Load timeseries hierarchy data failed', (payload: string) => ({payload}));

export const loadParentCatalogData = createAction('[Timeseries] Load parent catalog data');
export const loadParentCatalogDataComplete = createAction('[Timeseries] Load parent catalog data complete', (payload: any[]) => ({payload}));
export const loadParentCatalogDataFailed = createAction('[Timeseries] Load parent catalog data failed', (payload: string) => ({ payload }));

export const loadTimeseriesByIdData = createAction('[Timeseries] Load timeseries by ID', (id: number) => ({id}));
export const loadTimeseriesByIdDataComplete = createAction('[Timeseries] Load timeseries by ID complete', (payload: any[]) => ({payload}));
export const loadTimeseriesByIdDataFailed = createAction('[Timeseries] Load timeseries by ID failed', (payload: string) => ({ payload }));

/* =================== IMPORT PORTFOLIOS ======================== */

export const loadImportablePortfolios = createAction('[Timeseries] Load all importable portfolios');
export const loadImportablePortfoliosComplete = createAction('[Timeseries] Load all importable portfolios complete', (portfolios: {
    shared: fromModels.IPortfolio[],
    personal: fromModels.IPortfolio[]
}) => ({portfolios}));
export const loadImportablePortfoliosFailed = createAction('[Timeseries] Load all importable portfolios failed', (payload: string) => ({payload}));

export const importTimeseriesPortfolio = createAction('[Timeseries] Import timeseries portfolio', (payload: fromModels.IPortfolio) => ({payload}));
 
/* ==================== TAB / PORTFOLIO MANAGEMENT ================= */

export const addTab = createAction('[Timeseries] Add portfolio footer tab', (tab: fromModels.ITab) => ({tab}));
export const addTabFromLocalStorage = createAction('[Timeseries] Add portfolio footer tab from local storage', (tab: fromModels.ITab) => ({tab}));
export const saveCurrTab = createAction('[Timeseries] Save current tab data', (tab: fromModels.ITab) => ({tab}));
export const switchTab = createAction('[Timeseries] Switch portfolio tab', (tabName: string) => ({tabName}));

export const createPortfolio = createAction('[Timeseries] Create a new portfolio', (portfolio: fromModels.IPortfolio) => portfolio);
export const createPortfolioComplete = createAction('[Timeseries] Create a new portfolio complete', props<{portfolio: fromModels.IPortfolio}>());
export const createPortfolioFailed = createAction('[Timeseries] Create a new portfolio failed', (err: string) => ({ err }));

export const deletePortfolio = createAction('[Timeseries] Delete existing portfolio', (portfolio: fromModels.IPortfolio) => ({portfolio}));
export const deletePortfolioComplete = createAction('[Timeseries] Delete existing portfolio complete', (res: any) => ({res}));
export const deletePortfolioError = createAction('[Timeseries] Delete existing portfolio error', (err: string) => ({err}));

export const deleteScratchpad = createAction('[Timeseries] Delete scratchpad portfolio', (guid: string) => ({ guid }));
export const deleteScratchpadComplete = createAction('[Timeseries] Delete scratchpad portfolio complete', (res: any) => ({ res }));
export const deleteScratchpadError = createAction('[Timeseries] Delete scratchpad portfolio error', (err: string) => ({ err }));

export const updatePortfolioName = createAction('[Timeseries] Update portfolio name', (portfolio: fromModels.IPortfolio) => ({portfolio}));
export const updatePortfolioNameComplete = createAction('[Timeseries] Update portfolio name complete', (res: any) => ({res}));
export const updatePortfolioNameFailed = createAction('[Timeseries] Update portfolio name failed', (err: string) => ({err}));

export const updateCurrPortfolioName = createAction('[Timeseries] Update curr portfolio name', (portfolio: fromModels.IPortfolio) => ({portfolio}));
export const updateCurrPortfolioNameComplete = createAction('[Timeseries] Update curr portfolio name complete', (res: any) => ({res}));
export const updateCurrPortfolioNameFailed = createAction('[Timeseries] Update curr portfolio name failed', (err: string) => ({err}));

export const updatePortfolio = createAction('[Timeseries] Update selected portfolio in backend', (portfolio: fromModels.IPortfolio) => ({portfolio}));
export const updatePortfolioComplete = createAction('[Timeseries] Update selected portfolio in backend complete', (res: any) => ({res}));
export const updatePortfolioFailed = createAction('[Timeseries] Update portfolio in backend failed', (err: string) => ({err}));

export const deletePortfolioTab = createAction('[Timeseries] Remove portfolio tab', (tab: fromModels.ITab) => ({tab}));

/* ===================== TIMESERIES MANAGEMENT =================== */

export const clearTimeseriesSelection = createAction('[Timeseries] Clear timeseries selection');

export const deleteTimeseriesFromSelection = createAction('[Timeseries] Timeseries deleted via selection', (timeseriesId: string) => ({timeseriesId}));
export const deleteDerivedTimeseriesFromSelection = createAction('[Timeseries] Derived timeseries deleted via navigation', (variable: string) => ({variable}));

export const selectTimeseriesfromNav = createAction('[Timeseries] Timeseries selected via navigation', (payload: fromModels.ITimeseries) => ({payload}));
export const deleteTimeseriesFromNav = createAction('[Timeseries] Timeseries deleted via navigation', (payload: fromModels.ITimeseries) => ({payload}));

export const updateTimeseriesAxis = createAction('[Timeseries] Update timeseries axis', (payload: {timeseriesId: string, axisVal: fromModels.AxisType}) => ({payload}))
export const updateTimeseriesRegression = createAction('[Timeseries] Update timeseries regression' , (payload: {timeseriesId: string, regressionVal: string}) => ({payload}))
export const updateTimeseriesAlias = createAction('[Timeseries] Update timeseries alias', (payload: {timeseriesId: string, aliasVal: string}) => ({payload}))

export const createDerivedTimeseries = createAction('[Timeseries] Create derived timeseries', (payload: fromModels.IDerivedTimeseries) => ({payload}));

export const updateDerivedTimeseriesAxis = createAction('[Timeseries] Update derived timeseries axis', (payload: {variable: string, axisVal: fromModels.AxisType}) => ({payload}))
export const updateDerivedTimeseriesRegression = createAction('[Timeseries] Update derived timeseries regression', (payload: {variable: string, regressionVal: string}) => ({payload}))
export const updateDerivedTimeseriesAlias = createAction('[Timeseries] Update derived timeseries alias', (payload: {variable: string, aliasVal: string}) => ({payload}))
export const updateDerivedTimeseriesExpression = createAction('[Timeseries] Update derived timeseries expression', (payload: {variable: string, expVal: string}) => ({payload}))
export const updateDerivedTimeseriesLabel = createAction('[Timeseries] Update derived timeseries label', (payload: {variable: string, labelVal: string}) => ({payload}))

/* ======================= PORTFOLIO SPECIFIC DATA ==================== */

export const loadPortfolioTimeseriesData = createAction('[Timeseries] Load portfolio timeseries data', (timeseriesData: fromModels.IPortfolioDataRequest) => timeseriesData);
export const loadPortfolioTimeseriesDataComplete = createAction('[Timeseries] Load portfolio timeseries data complete', (data: any[]) => ({ data }));
export const loadPortfolioTimeseriesDataFailed = createAction('[Timeseries] Load portfolio timeseries data failed', (payload: string) => ({ payload }));

export const loadTimeseriesStatsData = createAction('[Timeseries] Get timeseries stats', (timeseriesData: fromModels.IPortfolioDataRequest) => timeseriesData);
export const loadTimeseriesStatsDataComplete = createAction('[Timeseries] Get timeseries stats complete', (data: any[]) => ({ data }));
export const loadTimeseriesStatsDataFailed = createAction('[Timeseries] Get timeseries stats failed', (err: string) => ({ err }));

export const updateChartConfig = createAction('[Timeeries] Update chart config', (chartConfig: any) => ({chartConfig}));

/* ======================= DRAWDOWN ==================== */

export const loadDrawdownData = createAction('[Timeseries] Load drawdown data from timeseries', (request: fromModels.IDrawdownReq) => ({request}));
export const loadDrawdownDataComplete = createAction('[Timeseries] Load drawdown data from timesries complete', (res: any) => ({res}));
export const loadDrawdownDataFailed = createAction('[Timeseries] Load drawdown data from timeseries failed', (err: string) => ({err}));

export const selectDrawdownTimeseries = createAction('[Timeseries] Select drawdown timeseries for viewing', (tsLabel: string) => ({tsLabel}));
export const selectDrawdownTimeseriesRow = createAction('[Timeseries] Select drawdown timeseries row', (row: any) => ({row}));

/* ======================= REGRESSION ==================== */

export const changeRegressionViewMode = createAction('[Timeseries] Change regression view mode', (mode: 'actual' | 'residual') => ({mode}));

export const loadRegressionData = createAction('[Timeseries] Load regression data', (request: fromModels.IRegressionReq) => ({request}));
export const loadRegressionDataComplete = createAction('[Timeseries] Load regression data complete', (res: fromModels.IRegressionRes) => ({res}));
export const loadRegressionDataFailed = createAction('[Timeseries] Load regression data failed', (err: string) => ({err}));


/* ============= LOCAL STORAGE ================ */

export const loadPortfolioDataFromLocalStorage = createAction('[Timeseries] Load portfolio data from local storage', (req: fromModels.IPortfolioDataRequest) => ({req}));
export const loadPortfolioDataFromLocalStorageComplete = createAction('[Timeseries] Load portfolio data from local storage complete', (res: {
    portfolio: fromModels.IPortfolio,
    startDate: string,
    endDate: string 
}) => ({res}));
export const loadPortfolioDataFromLocalStorageFailed = createAction('[Timeseries] Load portfolio data from local storage failed', (payload: string) => ({payload}));


export const loadPortfolioFromURL = createAction('[Timeseries] Load portfolio from URL', (guid: string) => ({guid}));
export const loadPortfolioFromURLComplete = createAction('[Timeseries] Load portfolio from URL complete', (res: any) => ({res}));
export const loadPortfolioFromURLFailed = createAction('[Timeseries] Load portfolio from URL failed', (err: string) => ({err}));

export const clearScratchPad = createAction('[Timeseries] Clear scratchpad', (guid: string) => ({ guid }));
export const clearScratchPadComplete = createAction('[Timeseries] Clear scratchpad complete', (str: string) => ({ str }));
export const clearScratchPadFaliled = createAction('[Timeseries] Clear scratchpad complete', (err: string) => ({ err }));

/* =============== TECHNICAL INDICATORS ================== */   

export const loadSimpleMovingAvgData = createAction('[Timeseries] Load simple moving average', (req: fromModels.ISimpleMovingAvgReq) => ({req}));
export const loadSimpleMovingAvgDataComplete = createAction('[Timeseries] Load simple moving average complete', (res: any) => ({res}));
export const loadSimpleMovingAvgDataFailed = createAction('[Timeseries] Load simple moving average failed', (err: string) => ({err}));
export const clearSimpleMovingAvgData = createAction('[Timeseries] Clear simple moving average data');

export const loadBollingerBandsData = createAction('[Timeseries] Load bollinger bands', (req: fromModels.IBollingerBandsReq) => ({req}));
export const loadBollingerBandsDataComplete = createAction('[Timeseries] Load bollinger bands complete', (res: any) => ({res}));
export const loadBollingerBandsDataFailed = createAction('[Timeseries] Load bollinger bands failed', (err: string) => ({err}));
export const clearBollingerBandsData = createAction('[Timeseries] Clear bollinger bands data');

export const loadRelativeStrengthIndicatorData = createAction('[Timeseries] Load relative strength indicator', (req: fromModels.IRelativeStrengthIndicatorReq) => ({req}));
export const loadRelativeStrengthIndicatorDataComplete = createAction('[Timeseries] Load relative strength indicator complete', (res: any) => ({res}));
export const loadRelativeStrengthIndicatorDataFailed = createAction('[Timeseries] Load relative strength indicator failed', (err: string) => ({err}));
export const clearRelativeStrengthIndicatorData = createAction('[Timeseries] Clear relative strength indicator data');

export const loadMovingAverageConvergenceDivergenceData = createAction('[Timeseries] Load moving average convergence divergence', (req: fromModels.IMovingAverageConvergenceDivergenceReq) => ({req}));
export const loadMovingAverageConvergenceDivergenceDataComplete = createAction('[Timeseries] Load moving average convergence divergence complete', (res: any) => ({res}));
export const loadMovingAverageConvergenceDivergenceDataFailed = createAction('[Timeseries] Load moving average convergence divergence failed', (err: string) => ({err}));
export const clearMovingAverageConvergenceDivergenceData = createAction('[Timeseries] Clear moving average convergence divergence data');

export const changeSelectedTechnicalIndicator = createAction('[Timeseries] Change selected technical indicator', (indicator: string) => ({indicator}));