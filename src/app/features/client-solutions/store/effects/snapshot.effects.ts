import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as fromActions from '../actions';
import * as fromModels from '../../models';

@Injectable()
export class SnapshotEffects {

    @Effect()
    loadMonthEndDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_MONTH_END_DATES),
            switchMap(() => {
                return this.snapshotService$
                    .getMonthEndDates()
                    .pipe(
                        map((res: string[]) => new fromActions.LoadSnapshotMonthEndDatesComplete(res)),
                        catchError(err => of(new fromActions.LoadSnapshotMonthEndDatesFailed(err)))
                    );
            }));

    @Effect()
    loasSnapshotGroupings$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_GROUPINGS),
            switchMap(() => {
                return this.snapshotService$
                    .getSupportedGroupings()
                    .pipe(
                        map((res: string[]) => new fromActions.LoadSnapshotGroupingsComplete(res)),
                        catchError(err => of(new fromActions.LoadSnapshotGroupingsFailed(err)))
                    );
            }));

    @Effect()
    loadSnapshotEntitiesMap$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SnapshotActionTypes.LOAD_ENTITIES_NAME_MAP),
            switchMap(() => {
                return this.snapshotService$
                    .getEntitiesNameMap()
                    .pipe(
                        map((res: string[]) => new fromActions.LoadSnapshotEntitiesNameMapComplete(res)),
                        catchError(err => of(new fromActions.LoadSnapshotEntitiesNameMapFailed(err)))
                    );
            }));

    @Effect()
    loadSnapshotData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_DATA),
            map((action: fromActions.LoadSnapshotData) => action.payload),
            switchMap((payload: fromModels.ISnapshotParameter) => {
                return this.snapshotService$
                    .getSnapshotData(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadSnapshotDataComplete(res)),
                        catchError(err => of(new fromActions.LoadSnapshotDataFailed(err)))
                    );
            }));


    @Effect()
    loadSummaryStats$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_SUMMARY_STATS),
            map((action: fromActions.LoadSnapshotSummaryStats) => action.payload),
            switchMap((payload: fromModels.ISnapshotParameter) => {
                return this.snapshotService$
                    .getSummaryStats(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadSnapshotSummaryStatsComplete(res)),
                        catchError(err => of(new fromActions.LoadSnapshotSummaryStatsFailed(err)))
                    );
            }));

    @Effect()
    loadCorrelationMatrix$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_CORRELATION_MATRIX),
            map((action: fromActions.LoadSnapshotCorrelationMatrix) => action.payload),
            switchMap((payload: fromModels.ISnapshotParameter) => {
                return this.snapshotService$
                    .getCorrelationMatrix(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadSnapshotCorrelationMatrixComplete(res)),
                        catchError(err => of(new fromActions.LoadSnapshotCorrelationMatrixFailed(err)))
                    );
            }));

    constructor(private actions$: Actions, private snapshotService$: fromServices.SnapshotService) { }
}
