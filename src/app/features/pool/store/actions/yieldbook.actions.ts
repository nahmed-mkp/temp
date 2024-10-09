import { Action } from '@ngrx/store';
import * as fromModels from './../../models/yieldbook.models';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum YieldbookActionTypes {

    LOAD_YIELDBOOK_REQUEST_LOGS_BY_DATE = '[Yieldbook] Load yieldbook request logs by date',
    LOAD_YIELDBOOK_REQUEST_LOGS_BY_DATE_COMPLETE = '[Yieldbook] Load yieldbook request logs by date complete',
    LOAD_YIELDBOOK_REQUEST_LOGS_BY_DATE_FAILED = '[Yieldbook] Load yieldbook request logs by date failed',

    LOAD_YIELDBOOK_REQUEST_BY_ID = '[Yieldbook] Load yieldbook request by id',
    LOAD_YIELDBOOK_REQUEST_BY_ID_COMPLETE = '[Yieldbook] Load yieldbook request by id complete',
    LOAD_YIELDBOOK_REQUEST_BY_ID_FAILED = '[Yieldbook] Load yieldbook request by id failed',

    LOAD_YIELDBOOK_RESPONSE_BY_ID = '[Yieldbook] Load yieldbook response by id',
    LOAD_YIELDBOOK_RESPONSE_BY_ID_COMPLETE = '[Yieldbook] Load yieldbook response by id complete',
    LOAD_YIELDBOOK_RESPONSE_BY_ID_FAILED = '[Yieldbook] Load yieldbook response by id failed',

    RUN_PYCALC = '[Yieldbook] Run PY calculation',
    RUN_PYCALC_COMPLETE = '[Yieldbook] Run PY calculation complete',
    RUN_PYCALC_FAILED = '[Yieldbook] Run PY calculation failed',

    RUN_SENSITIVITIES = '[Yieldbook] Run sensitivities',
    RUN_SENSITIVITIES_COMPLETE = '[Yieldbook] Run sensitivities complete',
    RUN_SENSITIVITIES_FAILED = '[Yieldbook] Run sensitivities failed',

    RUN_HORIZON_ANALYSIS = '[Yieldbook] Run horizon analysis',
    RUN_HORIZON_ANALYSIS_COMPLETE = '[Yieldbook] Run horizon analysis complete',
    RUN_HORIZON_ANALYSIS_FAILED = '[Yieldbook] Run horizon analysis failed',

    RUN_MODEL_VALIDATION = '[Yieldbook] Run model validation',
    RUN_MODEL_VALIDATION_COMPLETE = '[Yieldbook] Run model validation complete',
    RUN_MODEL_VALIDATION_FAILED = '[Yieldbook] Run model validation failed',

    CHECK_REQUEST_STATUS = '[Yieldbook] check request status',
    CHECK_REQUEST_STATUS_COMPLETE = '[Yieldbook] check request status complete',
    CHECK_REQUEST_STATUS_FAILED = '[Yieldbook] check request status failed',

    GET_YIELDBOOK_RESULT = '[Yieldbook] get yieldbook result',
    GET_YIELDBOOK_RESULT_COMPLETE = '[Yieldbook] get yieldbook result complete',
    GET_YIELDBOOK_RESULT_FAILED = '[Yieldbook] get yieldbook result failed',

}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadYieldbookRequestLogsByDate implements Action {
    readonly type = YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_LOGS_BY_DATE;

    constructor(public payload: string) { }
}

export class LoadYieldbookRequestLogsByDateComplete implements Action {
    readonly type = YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_LOGS_BY_DATE_COMPLETE;

    constructor(public payload: fromModels.IYieldbookRequestLog[]) { }
}

export class LoadYieldbookRequestLogsByDateFailed implements Action {
    readonly type = YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_LOGS_BY_DATE_FAILED;

    constructor(public payload: string) { }
}

export class LoadYieldbookRequestById implements Action {
    readonly type = YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_BY_ID;

    constructor(public payload: number) { }
}

export class LoadYieldbookRequestByIdComplete implements Action {
    readonly type = YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_BY_ID_COMPLETE;

    constructor(public payload: fromModels.IYieldbookRequest) { }
}

export class LoadYieldbookRequestByIdFailed implements Action {
    readonly type = YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_BY_ID_FAILED;

    constructor(public payload: fromModels.IYieldbookError) { }
}

export class LoadYieldbookResponseById implements Action {
    readonly type = YieldbookActionTypes.LOAD_YIELDBOOK_RESPONSE_BY_ID;

    constructor(public payload: number) { }
}

export class LoadYieldbookResponseByIdComplete implements Action {
    readonly type = YieldbookActionTypes.LOAD_YIELDBOOK_RESPONSE_BY_ID_COMPLETE;

    constructor(public payload: fromModels.IYieldbookRequest) { }
}

export class LoadYieldbookResponseByIdFailed implements Action {
    readonly type = YieldbookActionTypes.LOAD_YIELDBOOK_RESPONSE_BY_ID_FAILED;

    constructor(public payload: fromModels.IYieldbookError) { }
}

export class RunPYCalc implements Action {
    readonly type = YieldbookActionTypes.RUN_PYCALC;

    constructor(public payload: any) { }
}

export class RunPYCalcComplete implements Action {
    readonly type = YieldbookActionTypes.RUN_PYCALC_COMPLETE;

    constructor(public payload: any) { }
}

export class RunPYCalcFailed implements Action {
    readonly type = YieldbookActionTypes.RUN_PYCALC_FAILED;

    constructor(public payload: string) { }
}

export class RunSensitivities implements Action {
    readonly type = YieldbookActionTypes.RUN_SENSITIVITIES;

    constructor(public payload: any) { }
}

export class RunSensitivitiesComplete implements Action {
    readonly type = YieldbookActionTypes.RUN_SENSITIVITIES_COMPLETE;

    constructor(public payload: any) { }
}

export class RunSensitivitiesFailed implements Action {
    readonly type = YieldbookActionTypes.RUN_SENSITIVITIES_FAILED;

    constructor(public payload: string) { }
}

export class RunHorizonAnalysis implements Action {
    readonly type = YieldbookActionTypes.RUN_HORIZON_ANALYSIS;

    constructor(public payload: any) { }
}

export class RunHorizonAnalysisComplete implements Action {
    readonly type = YieldbookActionTypes.RUN_HORIZON_ANALYSIS_COMPLETE;

    constructor(public payload: any) { }
}

export class RunHorizonAnalysisFailed implements Action {
    readonly type = YieldbookActionTypes.RUN_HORIZON_ANALYSIS_FAILED;

    constructor(public payload: string) { }
}

export class RunModelValidation implements Action {
    readonly type = YieldbookActionTypes.RUN_MODEL_VALIDATION;

    constructor(public payload: any) { }
}

export class RunModelValidationComplete implements Action {
    readonly type = YieldbookActionTypes.RUN_MODEL_VALIDATION_COMPLETE;

    constructor(public payload: any) { }
}

export class RunModelValidationFailed implements Action {
    readonly type = YieldbookActionTypes.RUN_MODEL_VALIDATION_FAILED;

    constructor(public payload: string) { }
}




export class CheckRequestStatus implements Action {
    readonly type = YieldbookActionTypes.CHECK_REQUEST_STATUS;

    constructor(public payload: {PortfolioId: string; RecordId: string; BatchId: string}) {}
}

export class CheckRequestStatusComplete implements Action {
    readonly type = YieldbookActionTypes.CHECK_REQUEST_STATUS_COMPLETE;

    constructor(public payload: {PortfolioId: string; RecordId: string; status: string}) {}
}

export class CheckRequestStatusFailed implements Action {
    readonly type = YieldbookActionTypes.CHECK_REQUEST_STATUS_FAILED;

    constructor(public payload: {PortfolioId: string; RecordId: string; error: string}) {}
}



export class GetYieldbookResult implements Action {
    readonly type = YieldbookActionTypes.GET_YIELDBOOK_RESULT;

    constructor(public payload: {PortfolioId: string; RecordId: string; BatchId: string}) {}
}

export class GetYieldbookResultComplete implements Action {
    readonly type = YieldbookActionTypes.GET_YIELDBOOK_RESULT_COMPLETE;

    constructor(public payload: {PortfolioId: string; RecordId: string; result: string}) {}
}

export class GetYieldbookResultFailed implements Action {
    readonly type = YieldbookActionTypes.GET_YIELDBOOK_RESULT_FAILED;

    constructor(public payload: {PortfolioId: string; RecordId: string; error: string}) {}
}







/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type YieldbookActions
    = LoadYieldbookRequestLogsByDate
    | LoadYieldbookRequestLogsByDateComplete
    | LoadYieldbookRequestLogsByDateFailed

    | LoadYieldbookRequestById
    | LoadYieldbookRequestByIdComplete
    | LoadYieldbookRequestByIdFailed

    | LoadYieldbookResponseById
    | LoadYieldbookResponseByIdComplete
    | LoadYieldbookResponseByIdFailed

    | RunPYCalc
    | RunPYCalcComplete
    | RunPYCalcFailed

    | RunSensitivities
    | RunSensitivitiesComplete
    | RunSensitivitiesFailed

    | RunHorizonAnalysis
    | RunHorizonAnalysisComplete
    | RunHorizonAnalysisFailed

    | RunModelValidation
    | RunModelValidationComplete
    | RunModelValidationFailed

    | CheckRequestStatus
    | CheckRequestStatusComplete
    | CheckRequestStatusFailed

    | GetYieldbookResult
    | GetYieldbookResultComplete
    | GetYieldbookResultFailed
    ;

