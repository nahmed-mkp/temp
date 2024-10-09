import { Action } from '@ngrx/store';

import * as fromModels from './../../models/correlation.model';

export enum CorrelationTypes {
    LOAD_MOVING_CORRELATION_SECURITY_LIST = '[Correlation] Load moving correlation security list',
    LOAD_MOVING_CORRELATION_SECURITY_LIST_COMPLETE = '[Correlation] Load moving correlation security list complete',
    LOAD_MOVING_CORRELATION_SECURITY_LIST_FAILED = '[Correlation] Load moving correlation security list failed',

    LOAD_MOVING_CORRELATION_ROLLING_CORRELATION = '[Correlation] Load rolling correlation of moving correlation',
    LOAD_MOVING_CORRELATION_ROLLING_CORRELATION_COMPLETE = '[Correlation] Load rolling correlation of moving correlation complete',
    LOAD_MOVING_CORRELATION_ROLLING_CORRELATION_FAILED = '[Correlation] Load rolling correlation of moving correlation failed',

    SET_MOVING_CORRELATION_ACTIVE_REQUEST_ID = '[Correlation] Set moving correlation active request Id'
}


export class LoadMovingCorrelationSecurityList implements Action {
    readonly type = CorrelationTypes.LOAD_MOVING_CORRELATION_SECURITY_LIST
} 

export class LoadMovingCorrelationSecurityListComplete implements Action {
    readonly type = CorrelationTypes.LOAD_MOVING_CORRELATION_SECURITY_LIST_COMPLETE

    constructor(public payload: string[]) {}
} 

export class LoadMovingCorrelationSecurityListFailed implements Action {
    readonly type = CorrelationTypes.LOAD_MOVING_CORRELATION_SECURITY_LIST_FAILED

    constructor(public payload: string) {}
} 





export class LoadMovingCorrelationRollingCorrelation implements Action {
    readonly type = CorrelationTypes.LOAD_MOVING_CORRELATION_ROLLING_CORRELATION

    constructor(public payload: fromModels.CorrelationRequestWithID) {}
}

export class LoadMovingCorrelationRollingCorrelationComplete implements Action {
    readonly type = CorrelationTypes.LOAD_MOVING_CORRELATION_ROLLING_CORRELATION_COMPLETE

    constructor(public payload: fromModels.CorrelationResponse) {}
}

export class LoadMovingCorrelationRollingCorrelationFailed implements Action {
    readonly type = CorrelationTypes.LOAD_MOVING_CORRELATION_ROLLING_CORRELATION_FAILED

    constructor(public payload: string) {}
}

export type CorrelationActions
    = LoadMovingCorrelationSecurityList
    | LoadMovingCorrelationSecurityListComplete
    | LoadMovingCorrelationSecurityListFailed

    | LoadMovingCorrelationRollingCorrelation
    | LoadMovingCorrelationRollingCorrelationComplete
    | LoadMovingCorrelationRollingCorrelationFailed;