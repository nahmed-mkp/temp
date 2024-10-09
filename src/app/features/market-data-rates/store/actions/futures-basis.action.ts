
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum FuturesBasisActionTypes {

    LOAD_FUTURES_BASIS_MONITOR = '[Market Data Rates] Load futures basis monitor',
    LOAD_FUTURES_BASIS_MONITOR_COMPLETE = '[Market Data Rates] Load futures basis monitor complete',
    LOAD_FUTURES_BASIS_MONITOR_FAILED = '[Market Data Rates] Load futures basis monitor failed',

    LOAD_FUTURES_BASIS_CONTRACT = '[Market Data Rates] Load futures basis contract',
    LOAD_FUTURES_BASIS_CONTRACT_COMPLETE = '[Market Data Rates] Load futures basis contract complete',
    LOAD_FUTURES_BASIS_CONTRACT_FAILED = '[Market Data Rates] Load futures basis contract failed'

}

export class LoadFuturesBasisMonitor {
    readonly type = FuturesBasisActionTypes.LOAD_FUTURES_BASIS_MONITOR;
}

export class LoadFuturesBasisMonitorComplete {
    readonly type = FuturesBasisActionTypes.LOAD_FUTURES_BASIS_MONITOR_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadFuturesBasisMonitorFailed {
    readonly type = FuturesBasisActionTypes.LOAD_FUTURES_BASIS_MONITOR_FAILED;

    constructor(public payload: any) {}
}

export class LoadFuturesBasisContract {
    readonly type = FuturesBasisActionTypes.LOAD_FUTURES_BASIS_CONTRACT;

    constructor(public payload: string) {}
}

export class LoadFuturesBasisContractComplete {
    readonly type = FuturesBasisActionTypes.LOAD_FUTURES_BASIS_CONTRACT_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadFuturesBasisContractFailed {
    readonly type = FuturesBasisActionTypes.LOAD_FUTURES_BASIS_CONTRACT_FAILED;

    constructor(public payload: any) { }
}

export type FuturesBasisActions
    = LoadFuturesBasisMonitor
    | LoadFuturesBasisMonitorComplete
    | LoadFuturesBasisMonitorFailed

    | LoadFuturesBasisContract
    | LoadFuturesBasisContractComplete
    | LoadFuturesBasisContractFailed;
