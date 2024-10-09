import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromModels from '../../models/futures-root.models';
import * as fromServices from '../../services/futures-root.service';
import * as fromActions from '../actions/futures-root.actions';

@Injectable()
export class FuturesRootEffects {

    @Effect()
    loadFuturesRoots$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FuturesRootActionTypes.LOAD_FUTURES_ROOTS),
            switchMap(() => {
                return this.service$
                    .loadFuturesRoots()
                    .pipe(
                        map((res: fromModels.IFutureRoot[]) => new fromActions.LoadFuturesRootsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadFuturesRootsFailed(err)))
                    );
            })
        );

    @Effect()
    loadFuturesRoot$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FuturesRootActionTypes.LOAD_FUTURES_ROOT),
            map((action: fromActions.LoadFuturesRoot) => action.payload),
            switchMap((payload: number) => {
                return this.service$
                    .loadFuturesRoot(payload)
                    .pipe(
                        map((res: fromModels.IFutureRoot) => new fromActions.LoadFuturesRootComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadFuturesRootFailed(err)))
                    );
            })
        );

    @Effect()
    addFuturesRoot$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FuturesRootActionTypes.ADD_FUTURES_ROOT),
            map((action: fromActions.AddFuturesRoot) => action.payload),
            switchMap((payload: fromModels.IFutureRoot) => {
                return this.service$
                    .addFuturesRoot(payload)
                    .pipe(
                        map((res: fromModels.IFutureRoot) => new fromActions.AddFuturesRootComplete(res)),
                        catchError((err: string) => of(new fromActions.AddFuturesRootFailed(err)))
                    );
            })
        );

    @Effect()
    updateFuturesRoot$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FuturesRootActionTypes.UPDATE_FUTURES_ROOT),
            map((action: fromActions.UpdateFuturesRoot) => action.payload),
            switchMap((payload: fromModels.IFutureRoot) => {
                return this.service$
                    .updateFuturesRoot(payload)
                    .pipe(
                        map((res: fromModels.IFutureRoot) => new fromActions.UpdateFuturesRootComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateFuturesRootFailed(err)))
                    );
            })
    );

    @Effect()
    deleteFuturesRoot$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FuturesRootActionTypes.DELETE_FUTURES_ROOT),
            map((action: fromActions.DeleteFuturesRoot) => action.payload),
            switchMap((payload: fromModels.IFutureRoot) => {
                return this.service$
                    .deleteFuturesRoot(payload)
                    .pipe(
                        map((res: fromModels.IFutureRoot) => new fromActions.DeleteFuturesRootComplete(res)),
                        catchError((err: string) => of(new fromActions.DeleteFuturesRootFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.FuturesRootService
    ) { }
}

