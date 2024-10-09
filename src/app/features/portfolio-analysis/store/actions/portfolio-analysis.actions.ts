import { Action } from '@ngrx/store';

import * as fromModels from './../../models/portfolio-analysis.models';

export enum PortfolioAnalysisActionTypes {
    LOAD_PORTFOLIO_ANALYSIS_SECURITY_LIST = '[Portfolio Analysis] Load portfolio analysis security list',
    LOAD_PORTFOLIO_ANALYSIS_SECURITY_LIST_COMPLETE = '[Portfolio Analysis] Load portfolio analysis security list completed',
    LOAD_PORTFOLIO_ANALYSIS_SECURITY_LIST_FAILED = '[Portfolio Analysis] Load portfolio analysis security list failed',

    LOAD_PORTFOLIO_ANALYSIS = '[Portfolio Analysis] Load portfolio analysis',
    LOAD_PORTFOLIO_ANALYSIS_COMPLETE = '[Portfolio Analysis] Load portfolio analysis completed',
    LOAD_PORTFOLIO_ANALYSIS_FAILED = '[Portfolio Analysis] Load portfolio analysis failed',
}

export class LoadPortfolioAnalysisSecurityList implements Action {
    readonly type = PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS_SECURITY_LIST
}

export class LoadPortfolioAnalysisSecurityListComplete implements Action {
    readonly type = PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS_SECURITY_LIST_COMPLETE

    constructor(public payload: fromModels.PortfolioAnalysisSecurity[]) {}
}

export class LoadPortfolioAnalysisSecurityListFailed implements Action {
    readonly type = PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS_SECURITY_LIST_FAILED

    constructor(public payload: string) {}
}



export class LoadPortfolioAnalysis implements Action {
    readonly type = PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS

    constructor(public payload: fromModels.PortfolioAnalysisRequestWithID) {}
}

export class LoadPortfolioAnalysisComplete implements Action {
    readonly type = PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS_COMPLETE

    constructor(public payload: fromModels.PortfolioAnalysisResponse) {}
}

export class LoadPortfolioAnalysisFailed implements Action {
    readonly type = PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS_FAILED

    constructor(public payload: string) {}
}

export type PortfolioAnalysisActions
    = LoadPortfolioAnalysisSecurityList
    | LoadPortfolioAnalysisSecurityListComplete
    | LoadPortfolioAnalysisSecurityListFailed
    
    | LoadPortfolioAnalysis
    | LoadPortfolioAnalysisComplete
    | LoadPortfolioAnalysisFailed;