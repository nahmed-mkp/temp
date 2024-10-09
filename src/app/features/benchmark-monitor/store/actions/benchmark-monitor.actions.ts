import { Action } from '@ngrx/store';

export enum BenchmarkMonitorActionTypes {

    LOAD_TBA_DATA = '[Benchmark Monitor] load TBA data',
    LOAD_TBA_DATA_COMPLETE = '[Benchmark Monitor] load TBA data complete',
    LOAD_TBA_DATA_FAILED = '[Benchmark Monitor] load TBA data failed',
}

export class LoadTbaData implements Action {
    readonly type = BenchmarkMonitorActionTypes.LOAD_TBA_DATA;
}

export class LoadTbaDataComplete implements Action {
    readonly type = BenchmarkMonitorActionTypes.LOAD_TBA_DATA_COMPLETE;
    
    constructor(public payload: any[]) { }
}

export class LoadTbaDataFailed implements Action {
    readonly type = BenchmarkMonitorActionTypes.LOAD_TBA_DATA_FAILED;

    constructor(public payload: string) { }
}

export type BenchmarkMonitorActions
    = LoadTbaData
    | LoadTbaDataComplete
    | LoadTbaDataFailed
;
