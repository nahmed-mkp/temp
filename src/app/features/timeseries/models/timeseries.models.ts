import { HighchartsChartComponent } from "highcharts-angular";


/* ===================== LOCAL STORAGE ====================== */

export interface IGuidUrlReq {
    name: string;
    guid: string;
    user: string;
    timeseries: [],
    isShared: boolean;
}

export interface ILocalStorageItem {
    startDate: string,
    portfolios: IPortfolioLite[];
    currPortfolio: IPortfolioLite;
}

/* ===================== PORTFOLIO ====================== */


export interface IPortfolioImportNode {
    name: string;
    guid: string;
    expandable: boolean;
    derivedTimeseries?: IDerivedTimeseries[];
    timeseries: ITimeseries[],
    level: number;
    isShared: boolean;
    children?: IPortfolioImportNode[];
}

export interface IPortfolioDataRequest {
    portfolio: IPortfolio | IPortfolioLite | IGuidUrlReq;
    startDate: string;
    endDate: string;
}


export interface IPortfolioDataResponse {
    guid: string;
    data: string;
}

export interface IPortfolioLite {
    name: string;
    guid: string;
    user: string;
    timeseries: [],
    isShared: boolean;
}

export interface IPortfolio {
    name: string;
    guid?: string;
    path?: string;
    timeseries: ITimeseries[];
    derivedTimeseries?: IDerivedTimeseries[];
    user?: string;
    isShared?: boolean;
}

/* ===================== TIMESERIES ====================== */

export interface ITimeseries {
    label: string;
    axis: AxisType
    id?: number;
    timeseriesId: number;
    variable: string;
    expression?: string;
    alias?: string;
    isSelected?: boolean;
    regression?: string;
}

export interface IDerivedTimeseries {
    label: string;
    variable: string,
    alias?: string,
    expression: string,
    axis: string,
    regression?: string;
}

/* ===================== TAB ====================== */

export interface ITab {
    portfolio: IPortfolio,
    chartData?: any[],
    chartDataLoading?: boolean,
    chartDataLoaded?: boolean,
    chartDataError?: string,
    statData?: any[],
    statDataLoading?: boolean,
    statDataLoaded?: boolean,
    statDataError?: string,
    regressionData?: IRegressionRes,
    regressionDataLoading?: boolean,
    regressionDataLoaded?: boolean,
    regressionDataError?: string
    drawdownData?: { data: any[], drawdown: any },
    drawdownDataLoading?: boolean,
    drawdownDataLoaded?: boolean,
    drawdownDataError?: string,
    regressionViewMode: 'actual' | 'residual' | 'regression',
    selectedRegressionTimeseries?: any,
    selectedDrawdownTimeseries?: string;
    simpleMovingAvgData?: any,
    simpleMovingAvgDataLoading?: boolean,
    simpleMovingAvgDataLoaded?: boolean,
    simpleMovingAvgDataError?: string,
    bollingerBandsData?: any,
    bollingerBandsDataLoading?: boolean,
    bollingerBandsDataLoaded?: boolean,
    bollingerBandsDataError?: string,
    relativeStrengthIndicatorData?: any,
    relativeStrengthIndicatorDataLoading?: boolean,
    relativeStrengthIndicatorDataLoaded?: boolean,
    relativeStrengthIndicatorDataError?: string,
    movingAverageConvergenceDivergenceData?: any,
    movingAverageConvergenceDivergenceDataLoading?: boolean,
    movingAverageConvergenceDivergenceDataLoaded?: boolean,
    movingAverageConvergenceDivergenceDataError?: string,
    selectedTechnicalIndicator?: string,
}

/* ===================== DRAWDOWN ====================== */

export interface IDrawdownReq {
    guid?: string,
    params: {
        window: number;
        calc_method: string;
        direction: string;
        observation: number;
    }
}

/* ===================== REGRESSION ====================== */

export interface IRegressionReq {
    startDate: string,
    endDate: string,
    xy: {}
}

export interface IRegressionRes {
    timeseries: {
        date: string;
        actual: number;
        predicted: number;
        error: number;
    }[],
    expr: string;
    mse: number;
    observations: number,
    regressionPlot: any[],
    r2: number;
    curPoint: any,
    regressionLine: any[],
}

/* =============== TECHNICAL INDICATORS ====================== */

export interface ISimpleMovingAvgReq {
    startDate: string,
    endDate: string,
    guid: string,
    params: {
        window: number
    }
}

export interface IBollingerBandsReq {
    startDate: string,
    endDate: string,
    guid: string,
    params: {
        window: number,
        stdevup: number,
        stdevdown: number
    }
}

export interface IRelativeStrengthIndicatorReq {
    startDate: string,
    endDate: string,
    guid: string,
    params: {
        window: number
    }
}

export interface IMovingAverageConvergenceDivergenceReq {
    startDate: string,
    endDate: string,
    guid: string,
    params: {
        window_slow: number,
        window_fast: number,
        window_signal: number
    }

}

export type Mode = 'import' | 'create' | 'edit' | 'view';
export type AxisType = 'auto' | 'left' | 'right' | 'invertedLeft'| 'invertedRight'