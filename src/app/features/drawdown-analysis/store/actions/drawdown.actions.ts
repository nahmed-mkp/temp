import { Action } from '@ngrx/store';

import * as fromModels from './../../models/drawdown.models';

export enum DrawdownActionTypes {
    LOAD_DRAWDOWN_ANALYSIS_SECURITY = '[Drawdown] Load drawdown analysis security',
    LOAD_DRAWDOWN_ANALYSIS_SECURITY_COMPLETE = '[Drawdown] Load drawdown analysis security complete',
    LOAD_DRAWDOWN_ANALYSIS_SECURITY_FAILED = '[Drawdown] Load drawdown analysis security failed',

    LOAD_DRAWDOWN_ANALYSIS = '[Drawdown] Load drawdown analysis',
    LOAD_DRAWDOWN_ANALYSIS_TABLES_COMPLETE = '[Drawdown] Load drawdown analysis table complete',
    LOAD_DRAWDOWN_ANALYSIS_TABLES_FAILED = '[Drawdown] Load drawdown analysis table failed',
    LOAD_DRAWDOWN_ANALYSIS_TIMESERIES_COMPLETE = '[Drawdown] Load drawdown analysis timeseries complete',
    LOAD_DRAWDOWN_ANALYSIS_TIMESERIES_FAILED = '[Drawdown] Load drawdown analysis timeseries failed',

    SET_DRAWDOWN_ANALYSIS_ACTIVE_REQUEST_ID = '[Drawdown] Set drawdown analysis active request id'
}


export class LoadDrawdownAnalysisSecurity implements Action {
    readonly type = DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_SECURITY
}

export class LoadDrawdownAnalysisSecurityComplete implements Action {
    readonly type = DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_SECURITY_COMPLETE

    constructor(public payload: fromModels.DrawDownSecurity[]) {}
}

export class LoadDrawdownAnalysisSecurityFailed implements Action {
    readonly type = DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_SECURITY_FAILED

    constructor(public payload: string) {}
}




export class LoadDrawdownAnalysis implements Action {
    readonly type = DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS;

    constructor(public payload: fromModels.DrawDownAnalysisRequestWithID) {}
}

export class SetDradownAnalysisActiveRequestId implements Action {
    readonly type = DrawdownActionTypes.SET_DRAWDOWN_ANALYSIS_ACTIVE_REQUEST_ID

    constructor(public payload: string) {}
}






export class LoadDrawdownAnalysisTablesComplete implements Action {
    readonly type = DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_TABLES_COMPLETE;

    constructor(public payload: {id: string; payload: fromModels.DrawDownAnalysisResponse[]}) {}
}

export class LoadDrawdownAnalysisTablesFailed implements Action {
    readonly type = DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_TABLES_FAILED;

    constructor(public payload: string) {}
}

export class LoadDrawdownAnalysisTimeSeriesComplete implements Action {
    readonly type = DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_TIMESERIES_COMPLETE;

    constructor(public payload: {id: string; payload: fromModels.DrawDownTimeSeriesResponse[]}) {}
}

export class LoadDrawdownAnalysisTimeSeriesFailed implements Action {
    readonly type = DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_TIMESERIES_FAILED;

    constructor(public payload: string) {}
}




export type DrawdownActions 
    = LoadDrawdownAnalysisSecurity 
    | LoadDrawdownAnalysisSecurityComplete
    | LoadDrawdownAnalysisSecurityFailed
    
    | LoadDrawdownAnalysis
    | LoadDrawdownAnalysisTablesComplete
    | LoadDrawdownAnalysisTablesFailed
    | LoadDrawdownAnalysisTimeSeriesComplete
    | LoadDrawdownAnalysisTimeSeriesFailed;