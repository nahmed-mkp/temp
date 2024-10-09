import { Action } from '@ngrx/store';
import * as fromModels from '../../models';

export enum RiskSpanRequestActionTypes {

    LOAD_RISK_SPAN_SCHEMA = '[RiskSpanRequest] Load Risk Span Schema',
    LOAD_RISK_SPAN_SCHEMA_COMPLETE = '[RiskSpanRequest] Load Risk Span Schema Complete',
    LOAD_RISK_SPAN_SCHEMA_FAILED = '[RiskSpanRequest] Load Risk Span Schema Failed',

    ADD_REQUEST = '[RiskSpanRequest] Add request',
    UPDATE_REQUEST = '[RiskSpanRequest] Update request',
    DELETE_REQUEST = '[RiskSpanRequest] Delete request',

    // ADD_DATASET = '[RiskSpanRequest] Add dataset to current request',
    // REMOVE_DATASET = '[RiskSpanRequest] Remove dataset from current request',

    // ADD_FACTOR_DATE = '[RiskSpanRequest] Add factor to current request',
    // UPDATE_FACTOR_DATE = '[RiskSpanRequest] Update factor date from current request',

    // ADD_FILTER = '[RiskSpanRequest] Add filter to current request',
    // REMOVE_FILTER = '[RiskSpanRequest] Remove filter from current request',

    // ADD_BUCKET = '[RiskSpanRequest] Add bucket to current request',
    // REMOVE_BUCKET = '[RiskSpanRequest] Remove bucket from current request',

    // ADD_FIELD = '[RiskSpanRequest] Add field to current request',
    // REMOVE_FIELD = '[RiskSpanRequest] Remove field from current request',

    // ADD_DETAIL_FIELD = '[RiskSpanRequest] Add detail field to current request',
    // REMOVE_DETAIL_FIELD = '[RiskSpanRequest] Remove detail field from current request',

    BUILD_QUERY = '[RiskSpanRequest] Build query',
    BUILD_QUERY_COMPLETE = '[RiskSpanRequest] Build query complete',
    BUILD_QUERY_FAILED = '[RiskSpanRequest] Build query failed',

    SUBMIT_REQUEST = '[RiskSpanRequest] Submit request',
    SUBMIT_REQUEST_COMPLETE = '[RiskSpanRequest] Submit request complete',
    SUBMIT_REQUEST_FAILED = '[RiskSpanRequest] Submit request failed',

    SUBMIT_DETAIL_REQUEST = '[RiskSpanRequest] Submit detail request',
    SUBMIT_DETAIL_REQUEST_COMPLETE = '[RiskSpanRequest] Submit detail request complete',
    SUBMIT_DETAIL_REQUEST_FAILED = '[RiskSpanRequest] Submit detail request failed',

}


export class LoadRiskSpanSchema implements Action {

    readonly type = RiskSpanRequestActionTypes.LOAD_RISK_SPAN_SCHEMA;

    constructor() { }
}

export class LoadRiskSpanSchemaComplete implements Action {

    readonly type = RiskSpanRequestActionTypes.LOAD_RISK_SPAN_SCHEMA_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadRiskSpanSchemaFailed implements Action {
    readonly type = RiskSpanRequestActionTypes.LOAD_RISK_SPAN_SCHEMA_FAILED;

    constructor(public payload: string) { }
}

export class AddRequest implements Action {
    readonly type = RiskSpanRequestActionTypes.ADD_REQUEST;

    constructor(public payload: fromModels.IRequest | fromModels.IDetailRequest) { }
}

export class UpdateRequest implements Action {
    readonly type = RiskSpanRequestActionTypes.UPDATE_REQUEST;

    constructor(public payload: fromModels.IRequest | fromModels.IDetailRequest) { }
}


export class DeleteRequest implements Action {
    readonly type = RiskSpanRequestActionTypes.DELETE_REQUEST;

    constructor(public payload: fromModels.IRequest | fromModels.IDetailRequest) { }
}

// export class AddDataSet implements Action {
//     readonly type = RiskSpanRequestActionTypes.ADD_DATASET;

//     constructor(public payload: string) { }
// }

// export class RemoveDataSet implements Action {
//     readonly type = RiskSpanRequestActionTypes.REMOVE_DATASET;

//     constructor(public payload: string) { }
// }

// export class AddFactorDate implements Action {
//     readonly type = RiskSpanRequestActionTypes.ADD_FACTOR_DATE;

//     constructor(public payload: fromModels.IFactorDatesBucket) { }
// }

// export class UpdateFactorDate implements Action {
//     readonly type = RiskSpanRequestActionTypes.UPDATE_FACTOR_DATE;

//     constructor(public payload: fromModels.IFactorDatesBucket) { }
// }

// export class AddFilter implements Action {
//     readonly type = RiskSpanRequestActionTypes.ADD_FILTER;

//     constructor(public payload: fromModels.IFilterSchema) { }
// }

// export class RemoveFilter implements Action {
//     readonly type = RiskSpanRequestActionTypes.REMOVE_FILTER;

//     constructor(public payload: fromModels.IFilterSchema) { }
// }

// export class AddBucket implements Action {
//     readonly type = RiskSpanRequestActionTypes.ADD_BUCKET;

//     constructor(public payload: fromModels.IInputBucket) { }
// }

// export class RemoveBucket implements Action {
//     readonly type = RiskSpanRequestActionTypes.REMOVE_BUCKET;

//     constructor(public payload: fromModels.IInputBucket) { }
// }


// export class AddField implements Action {
//     readonly type = RiskSpanRequestActionTypes.ADD_FIELD;

//     constructor(public payload: string) { }
// }

// export class RemoveField implements Action {
//     readonly type = RiskSpanRequestActionTypes.REMOVE_FIELD;

//     constructor(public payload: string) { }
// }


// export class AddDetailField implements Action {
//     readonly type = RiskSpanRequestActionTypes.ADD_DETAIL_FIELD;

//     constructor(public payload: string) { }
// }

// export class RemoveDetailField implements Action {
//     readonly type = RiskSpanRequestActionTypes.REMOVE_DETAIL_FIELD;

//     constructor(public payload: string) { }
// }

export class BuildQuery implements Action {
    readonly type = RiskSpanRequestActionTypes.BUILD_QUERY;

    constructor(public payload: fromModels.IRequest) { }
}

export class BuildQueryComplete implements Action {
    readonly type = RiskSpanRequestActionTypes.BUILD_QUERY_COMPLETE;

    constructor(public payload: fromModels.IQueryResult) { }
}

export class BuildQueryFailed implements Action {
    readonly type = RiskSpanRequestActionTypes.BUILD_QUERY_FAILED;

    constructor(public payload: any) { }
}


export class SubmitRequest implements Action {
    readonly type = RiskSpanRequestActionTypes.SUBMIT_REQUEST;

    constructor(public payload: fromModels.IRequest) { }
}

export class SubmitRequestComplete implements Action {
    readonly type = RiskSpanRequestActionTypes.SUBMIT_REQUEST_COMPLETE;

    constructor(public payload: any) { }
}

export class SubmitRequestFailed implements Action {
    readonly type = RiskSpanRequestActionTypes.SUBMIT_REQUEST_FAILED;

    constructor(public payload: string) { }
}


export class SubmitDetailRequest implements Action {
    readonly type = RiskSpanRequestActionTypes.SUBMIT_DETAIL_REQUEST;

    constructor(public payload: fromModels.IRequest) { }
}

export class SubmitDetailRequestComplete implements Action {
    readonly type = RiskSpanRequestActionTypes.SUBMIT_DETAIL_REQUEST_COMPLETE;

    constructor(public payload: any) { }
}

export class SubmitDetailRequestFailed implements Action {
    readonly type = RiskSpanRequestActionTypes.SUBMIT_DETAIL_REQUEST_FAILED;

    constructor(public payload: string) { }
}


export type RiskSpanRequestActions

    = LoadRiskSpanSchema
    | LoadRiskSpanSchemaComplete
    | LoadRiskSpanSchemaFailed

    | AddRequest
    | UpdateRequest
    | DeleteRequest

    // | AddDataSet
    // | RemoveDataSet

    // | AddFactorDate
    // | UpdateFactorDate

    // | AddFilter
    // | RemoveFilter

    // | AddBucket
    // | RemoveBucket

    // | AddField
    // | RemoveField

    // | AddDetailField
    // | RemoveDetailField

    | BuildQuery
    | BuildQueryComplete
    | BuildQueryFailed

    | SubmitRequest
    | SubmitRequestComplete
    | SubmitRequestFailed

    | SubmitDetailRequest
    | SubmitDetailRequestComplete
    | SubmitDetailRequestFailed;









