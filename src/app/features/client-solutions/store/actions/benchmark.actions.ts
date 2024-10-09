import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum BenchmarkActionTypes {

    LOAD_ALL_BENCHMARKS = '[ClientSolutions-Benchmarks] Load all benchmarks',
    LOAD_ALL_BENCHMARKS_COMPLETE = '[ClientSolutions-Benchmarks] Load all benchmarks complete',
    LOAD_ALL_BENCHMARKS_FAILED = '[ClientSolutions-Benchmarks] Load all benchmarks failed',

    LOAD_BENCHMARK = '[ClientSolutions-Benchmarks] Load benchmark',
    LOAD_BENCHMARK_COMPLETE = '[ClientSolutions-Benchmarks] Load benchmark complete',
    LOAD_BENCHMARK_FAILED = '[ClientSolutions-Benchmarks] Load benchmark failed',

    ADD_BENCHMARK = '[ClientSolutions-Benchmarks] Add benchmark',
    ADD_BENCHMARK_COMPLETE = '[ClientSolutions-Benchmarks] Add benchmark complete',
    ADD_BENCHMARK_FAILED = '[ClientSolutions-Benchmarks] Add benchmark failed',

    UPDATE_BENCHMARK = '[ClientSolutions-Benchmarks] Update benchmark',
    UPDATE_BENCHMARK_COMPLETE = '[ClientSolutions-Benchmarks] Update benchmark complete',
    UPDATE_BENCHMARK_FAILED = '[ClientSolutions-Benchmarks] Update benchmark failed',

    DELETE_BENCHMARK = '[ClientSolutions-Benchmarks] Delete benchmark',
    DELETE_BENCHMARK_COMPLETE = '[ClientSolutions-Benchmarks] Delete benchmark complete',
    DELETE_BENCHMARK_FAILED = '[ClientSolutions-Benchmarks] Delete benchmark failed',

    UPDATE_ALL_BENCHMARK_RETURNS = '[ClientSolutions-Benchmarks] Update all benchmark returns',
    UPDATE_ALL_BENCHMARK_RETURNS_COMPLETE = '[ClientSolutions-Benchmarks] Update all benchmark returns complete',
    UPDATE_ALL_BENCHMARK_RETURNS_FAILED = '[ClientSolutions-Benchmarks] Update all benchmark returns failed',

    UPDATE_BENCHMARK_RETURNS = '[ClientSolutions-Benchmarks] Update benchmark returns',
    UPDATE_BENCHMARK_RETURNS_COMPLETE = '[ClientSolutions-Benchmarks] Update benchmark returns complete',
    UPDATE_BENCHMARK_RETURNS_FAILED = '[ClientSolutions-Benchmarks] Update benchmark returns failed',

    SELECT_BENCHMARK = '[ClientSolutions-Benchmarks] Select benchmark'
}



/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadAllBenchmarks implements Action {
    readonly type = BenchmarkActionTypes.LOAD_ALL_BENCHMARKS;

    constructor() { }
}

export class LoadAllBenchmarksComplete implements Action {
    readonly type = BenchmarkActionTypes.LOAD_ALL_BENCHMARKS_COMPLETE;

    constructor(public payload: fromModels.IBenchmark[]) { }
}

export class LoadAllBenchmarksFailed implements Action {
    readonly type = BenchmarkActionTypes.LOAD_ALL_BENCHMARKS_FAILED;

    constructor(public payload?: any) { }
}


export class LoadBenchmark implements Action {
    readonly type = BenchmarkActionTypes.LOAD_BENCHMARK;

    constructor(public payload: string) { }
}

export class LoadBenchmarkComplete implements Action {
    readonly type = BenchmarkActionTypes.LOAD_BENCHMARK_COMPLETE;

    constructor(public payload: fromModels.IBenchmark) { }
}

export class LoadBenchmarkFailed implements Action {
    readonly type = BenchmarkActionTypes.LOAD_BENCHMARK_FAILED;

    constructor(public payload?: any) { }
}

export class AddBenchmark implements Action {
    readonly type = BenchmarkActionTypes.ADD_BENCHMARK;

    constructor(public payload: fromModels.IBenchmark) { }
}

export class AddBenchmarkComplete implements Action {
    readonly type = BenchmarkActionTypes.ADD_BENCHMARK_COMPLETE;

    constructor(public payload: fromModels.IBenchmark) { }
}

export class AddBenchmarkFailed implements Action {
    readonly type = BenchmarkActionTypes.ADD_BENCHMARK_FAILED;

    constructor(public payload?: any) { }
}

export class UpdateBenchmark implements Action {
    readonly type = BenchmarkActionTypes.UPDATE_BENCHMARK;

    constructor(public payload: fromModels.IBenchmark) { }
}

export class UpdateBenchmarkComplete implements Action {
    readonly type = BenchmarkActionTypes.UPDATE_BENCHMARK_COMPLETE;

    constructor(public payload: fromModels.IBenchmark) { }
}

export class UpdateBenchmarkFailed implements Action {
    readonly type = BenchmarkActionTypes.UPDATE_BENCHMARK_FAILED;

    constructor(public payload?: any) { }
}

export class DeleteBenchmark implements Action {
    readonly type = BenchmarkActionTypes.DELETE_BENCHMARK;

    constructor(public payload: fromModels.IBenchmark) { }
}

export class DeleteBenchmarkComplete implements Action {
    readonly type = BenchmarkActionTypes.DELETE_BENCHMARK_COMPLETE;

    constructor(public payload: fromModels.IBenchmark) { }
}

export class DeleteBenchmarkFailed implements Action {
    readonly type = BenchmarkActionTypes.DELETE_BENCHMARK_FAILED;

    constructor(public payload?: any) { }
}

export class UpdateAllBenchmarkReturns implements Action {
    readonly type = BenchmarkActionTypes.UPDATE_ALL_BENCHMARK_RETURNS;
}

export class UpdateAllBenchmarkReturnsComplete implements Action {
    readonly type = BenchmarkActionTypes.UPDATE_ALL_BENCHMARK_RETURNS_COMPLETE;

    constructor(public payload: string) { }
}

export class UpdateAllBenchmarkReturnsFailed implements Action {
    readonly type = BenchmarkActionTypes.UPDATE_ALL_BENCHMARK_RETURNS_FAILED;

    constructor(public payload?: any) { }
}

export class UpdateBenchmarkReturns implements Action {
    readonly type = BenchmarkActionTypes.UPDATE_BENCHMARK_RETURNS;

    constructor(public payload: fromModels.IBenchmark) { }
}

export class UpdateBenchmarkReturnsComplete implements Action {
    readonly type = BenchmarkActionTypes.UPDATE_BENCHMARK_RETURNS_COMPLETE;

    constructor(public payload: string) { }
}

export class UpdateBenchmarkReturnsFailed implements Action {
    readonly type = BenchmarkActionTypes.UPDATE_BENCHMARK_RETURNS_FAILED;

    constructor(public payload?: any) { }
}

export class SelectBenchmark implements Action {
    readonly type = BenchmarkActionTypes.SELECT_BENCHMARK;

    constructor(public payload: fromModels.IBenchmark) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type BenchmarkActions
    = LoadAllBenchmarks
    | LoadAllBenchmarksComplete
    | LoadAllBenchmarksFailed

    | LoadBenchmark
    | LoadBenchmarkComplete
    | LoadBenchmarkFailed

    | AddBenchmark
    | AddBenchmarkComplete
    | AddBenchmarkFailed

    | UpdateBenchmark
    | UpdateBenchmarkComplete
    | UpdateBenchmarkFailed

    | DeleteBenchmark
    | DeleteBenchmarkComplete
    | DeleteBenchmarkFailed

    | UpdateAllBenchmarkReturns
    | UpdateAllBenchmarkReturnsComplete
    | UpdateAllBenchmarkReturnsFailed

    | UpdateBenchmarkReturns
    | UpdateBenchmarkReturnsComplete
    | UpdateBenchmarkReturnsFailed

    | SelectBenchmark;

