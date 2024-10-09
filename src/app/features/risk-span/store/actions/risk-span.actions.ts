import { Action } from '@ngrx/store';
import * as fromModels from './../../models';

export enum RiskSpanActionTypes {

    // UI ----------------------------------------------------------

    SET_UI_VIEW_MODE = '[RiskSpan] Set UI view mode',
    SET_ACTIVE_REPORT_ID = '[RiskSpan] Set active report id',
    RESET_WORKFLOW = '[RiskSpan] Reset workflow',
    SET_COLUMNS_COLLECTION = '[RiskSpan] set columns collection',
    SET_TARGET_COLUMN = '[RiskSpan] set target column',
    SET_SEARCH_TEXT = '[RiskSpan] set search text',

    // --------------------------------------------------------------

    LOAD_X_AXIS = '[RiskSpan] load x axis',
    LOAD_X_AXIS_COMPLETE = '[RiskSpan] load x axis complete',
    LOAD_X_AXIS_FAILED = '[RiskSpan] load x axis failed',

    LOAD_Y_AXIS = '[RiskSpan] load y axis',
    LOAD_Y_AXIS_COMPLETE = '[RiskSpan] load y axis complete',
    LOAD_Y_AXIS_FAILED = '[RiskSpan] load y axis failed',

    LOAD_REPORTS = '[RiskSpan] Load reports',
    LOAD_REPORTS_COMPLETE = '[RiskSpan] Load reports complete',
    LOAD_REPORTS_FAILED = '[RiskSpan] Load reports failed',

    LOAD_RAW_REPORTS = '[RiskSpan] Load raw reports',
    LOAD_RAW_REPORTS_COMPLETE = '[RiskSpan] Load raw reports complete',
    LOAD_RAW_REPORTS_FAILED = '[RiskSpan] Load raw reports failed',

    UPDATE_REPORT = '[RiskSpan] Update report',
    UPDATE_REPORT_COMPLETE = '[RiskSpan] Update report complete',
    UPDATE_REPORT_FAILED = '[RiskSpan] Update report failed',

    UPLOAD_SHEET = '[RiskSpan] upload sheet',
    UPLOAD_SHEET_COMPLETE = '[RiskSpan] upload sheet complete',
    UPLOAD_SHEET_FAILED = '[RiskSpan] upload sheet failed',

    LOAD_SINGLE_PLOT = '[RiskSpan] load single plot',
    LOAD_SINGLE_PLOT_COMPLETE = '[RiskSpan] load single plot complete',
    LOAD_SINGLE_PLOT_FAILED = '[RiskSpan] load single plot failed',

    LOAD_MULTI_PLOT = '[RiskSpan] load multiple plot',
    LOAD_MULTI_PLOT_COMPLETE = '[RiskSpan] load multiple plot complete',
    LOAD_MULTI_PLOT_FAILED = '[RiskSpan] load multiple plot failed',
}

export class SetUiViewMode implements Action {
    readonly type = RiskSpanActionTypes.SET_UI_VIEW_MODE;

    constructor(public payload: 'plot' | 'raw' | 'rawDetail' | 'query') {}
}

export class SetActiveReportId implements Action {
    readonly type = RiskSpanActionTypes.SET_ACTIVE_REPORT_ID;

    constructor(public payload: number) {}
}

export class SetColumnsCollection implements Action {
    readonly type = RiskSpanActionTypes.SET_COLUMNS_COLLECTION;

    constructor(public payload: string[]) {}
}

export class SetTargetColumn implements Action {
    readonly type = RiskSpanActionTypes.SET_TARGET_COLUMN;

    constructor(public payload: string) {}
}

export class SetSearchText implements Action {
    readonly type = RiskSpanActionTypes.SET_SEARCH_TEXT;

    constructor(public payload: string) {}
}

export class ResetWorkflow implements Action {
    readonly type = RiskSpanActionTypes.RESET_WORKFLOW;
}




export class LoadXAxis implements Action {
    readonly type = RiskSpanActionTypes.LOAD_X_AXIS;
}

export class LoadXAxisComplete implements Action {
    readonly type = RiskSpanActionTypes.LOAD_X_AXIS_COMPLETE;

    constructor(public payload: string[]) {}
}

export class LoadXAxisFailed implements Action {
    readonly type = RiskSpanActionTypes.LOAD_X_AXIS_FAILED;

    constructor(public payload: string) {}
}




export class LoadYAxis implements Action {
    readonly type = RiskSpanActionTypes.LOAD_Y_AXIS;
}

export class LoadYAxisComplete implements Action {
    readonly type = RiskSpanActionTypes.LOAD_Y_AXIS_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadYAxisFailed implements Action {
    readonly type = RiskSpanActionTypes.LOAD_Y_AXIS_FAILED;

    constructor(public payload: string) {}
}




export class LoadReports implements Action {
    readonly type = RiskSpanActionTypes.LOAD_REPORTS;
}

export class LoadReportsComplete implements Action {
    readonly type = RiskSpanActionTypes.LOAD_REPORTS_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadReportsFailed implements Action {
    readonly type = RiskSpanActionTypes.LOAD_REPORTS_FAILED;

    constructor(public payload: string) {}
}





export class LoadRawReports implements Action {
    readonly type = RiskSpanActionTypes.LOAD_RAW_REPORTS;
}

export class LoadRawReportsComplete implements Action {
    readonly type = RiskSpanActionTypes.LOAD_RAW_REPORTS_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadRawReportsFailed implements Action {
    readonly type = RiskSpanActionTypes.LOAD_RAW_REPORTS_FAILED;

    constructor(public payload: string) {}
}




export class UpdateReport implements Action {
    readonly type = RiskSpanActionTypes.UPDATE_REPORT;

    constructor(public payload: any) {}
}

export class UpdateReportComplete implements Action {
    readonly type = RiskSpanActionTypes.UPDATE_REPORT_COMPLETE;

    constructor(public payload: any) {}
}

export class UpdateReportFailed implements Action {
    readonly type = RiskSpanActionTypes.UPDATE_REPORT_FAILED;

    constructor(public payload: string) {}
}



export class LoadSinglePlot implements Action {
    readonly type = RiskSpanActionTypes.LOAD_SINGLE_PLOT;
}

export class LoadSinglePlotComplete implements Action {
    readonly type = RiskSpanActionTypes.LOAD_SINGLE_PLOT_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadSinglePlotFailed implements Action {
    readonly type = RiskSpanActionTypes.LOAD_SINGLE_PLOT_FAILED;

    constructor(public payload: string) {}
}




export class LoadMultiplePlot implements Action {
    readonly type = RiskSpanActionTypes.LOAD_MULTI_PLOT;

    constructor(public payload: fromModels.ReportPlotRequest) {}
}

export class LoadMultiplePlotComplete implements Action {
    readonly type = RiskSpanActionTypes.LOAD_MULTI_PLOT_COMPLETE;

    constructor(public payload: fromModels.ReportPlotResponse) {}
}

export class LoadMultiplePlotFailed implements Action {
    readonly type = RiskSpanActionTypes.LOAD_MULTI_PLOT_FAILED;

    constructor(public payload: string) {}
}





export type RiskSpanActions 
    = SetActiveReportId
    | ResetWorkflow
    | SetUiViewMode
    | SetColumnsCollection
    | SetTargetColumn
    | SetSearchText

    | LoadXAxis
    | LoadXAxisComplete
    | LoadXAxisFailed

    | LoadYAxis
    | LoadYAxisComplete
    | LoadYAxisFailed

    | LoadReports
    | LoadReportsComplete
    | LoadReportsFailed

    | LoadRawReports
    | LoadRawReportsComplete
    | LoadRawReportsFailed

    | UpdateReport
    | UpdateReportComplete
    | UpdateReportFailed

    | LoadSinglePlot
    | LoadSinglePlotComplete
    | LoadSinglePlotFailed

    | LoadMultiplePlot
    | LoadMultiplePlotComplete
    | LoadMultiplePlotFailed
    ;





