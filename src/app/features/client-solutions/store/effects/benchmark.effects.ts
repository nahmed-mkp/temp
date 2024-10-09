import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../services/benchmark.service';
import * as fromActions from '../actions/benchmark.actions';
import * as fromModels from '../../models/benchmark.model';

@Injectable()
export class BenchmarkEffects {
   
    @Effect()
    loadBenchmarks$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BenchmarkActionTypes.LOAD_ALL_BENCHMARKS),
            switchMap(() => {
                return this.benchmarkService$
                    .getBenchmarks()
                    .pipe(
                        map((res: fromModels.IBenchmark[]) => new fromActions.LoadAllBenchmarksComplete(res)),
                        catchError(err => of(new fromActions.LoadAllBenchmarksFailed(err)))
                    );
        }));
        
    @Effect()
    loadBenchmark$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BenchmarkActionTypes.LOAD_BENCHMARK),
            map((action: fromActions.LoadBenchmark) => action.payload),
            switchMap((payload: string) => {
                return this.benchmarkService$
                    .getBenchmark(payload)
                    .pipe(
                        map((res: fromModels.IBenchmark) => new fromActions.LoadBenchmarkComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadBenchmarkFailed(err)))
                    );
        }));

    @Effect()
    addBenchmark$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BenchmarkActionTypes.ADD_BENCHMARK),
            map((action: fromActions.AddBenchmark) => action.payload),
            switchMap((payload: fromModels.IBenchmark) => {
                return this.benchmarkService$
                    .addBenchmark(payload)
                    .pipe(
                        map((res: fromModels.IBenchmark) => new fromActions.AddBenchmarkComplete(res)),
                        catchError((err: string) => of(new fromActions.AddBenchmarkFailed(err)))
                    );
            })
        );

    @Effect()
    updateBenchmark$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BenchmarkActionTypes.UPDATE_BENCHMARK),
            map((action: fromActions.UpdateBenchmark) => action.payload),
            switchMap((payload: fromModels.IBenchmark) => {
                return this.benchmarkService$
                    .updateBenchmark(payload)
                    .pipe(
                        map((res: fromModels.IBenchmark) => new fromActions.UpdateBenchmarkComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateBenchmarkFailed(err)))
                    );
            })
        );

    @Effect()
    deleteBenchmark$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BenchmarkActionTypes.DELETE_BENCHMARK),
            map((action: fromActions.DeleteBenchmark) => action.payload),
            switchMap((payload: fromModels.IBenchmark) => {
                return this.benchmarkService$
                    .deleteBenchmark(payload)
                    .pipe(
                        map((res: fromModels.IBenchmark) => new fromActions.DeleteBenchmarkComplete(res)),
                        catchError((err: string) => of(new fromActions.DeleteBenchmarkFailed(err)))
                    );
            })
        );

    @Effect()
    updateAllBenchmarkReturns$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BenchmarkActionTypes.UPDATE_ALL_BENCHMARK_RETURNS),
            switchMap(() => {
                return this.benchmarkService$
                    .updateAllBenchmarkReturns()
                    .pipe(
                        map((res: string) => new fromActions.UpdateAllBenchmarkReturnsComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateAllBenchmarkReturnsFailed(err)))
                    );
            })
        );

    @Effect()
    updateBenchmarkReturn$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BenchmarkActionTypes.UPDATE_BENCHMARK_RETURNS),
            map((action: fromActions.UpdateBenchmarkReturns) => action.payload),
            switchMap((payload: fromModels.IBenchmark) => {
                return this.benchmarkService$
                    .updateBenchmarkReturns(payload)
                    .pipe(
                        map((res: string) => new fromActions.UpdateBenchmarkReturnsComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateBenchmarkReturnsFailed(err)))
                    );
            })
        );
        
    constructor(private actions$: Actions, private benchmarkService$: fromServices.BenchmarkService) { }
}
