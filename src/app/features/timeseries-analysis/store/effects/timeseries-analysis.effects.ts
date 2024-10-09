import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as fromActions from './../actions/timeseries-analysis.actions';
import * as fromServices from './../../services/timeseries-analysis.service';

// import all requried services or any dependencies

@Injectable()
export class TimeseriesAnalysisEffects {

    constructor(private action$: Actions,
        private timeseriesAnalysisService$: fromServices.TimeseriesAnalysisService) { }

    @Effect()
    loadUserCharts$ = this.action$.pipe(
        ofType(fromActions.TimeseriesAnalysisActionTypes.LOAD_USER_WATCHLISTS),
        switchMap(() => {
            return this.timeseriesAnalysisService$
                .loadUserWatchilists()
                .pipe(
                    map((data: any[]) => new fromActions.LoadUserWatchlistsComplete(data)),
                    catchError(error => of(new fromActions.LoadUserWatchlistsFailed(error)))
                );
        })
    );

    @Effect()
    createUserChart$ = this.action$.pipe(
        ofType(fromActions.TimeseriesAnalysisActionTypes.CREATE_USER_WATCHLIST),
        map((action: fromActions.CreateUseWatchlist) => action.payload),
        switchMap((payload: any) => {
            return this.timeseriesAnalysisService$
                .createUserWatchlist(payload)
                .pipe(
                    map((data: any) => new fromActions.CreateUserWatchlistComplete(data)),
                    catchError(error => of(new fromActions.CreateUserWatchlistFailed(error)))
                );
        })
    );

    @Effect()
    updateUserChart$ = this.action$.pipe(
        ofType(fromActions.TimeseriesAnalysisActionTypes.UPDATE_USER_WATCHLIST),
        map((action: fromActions.UpdateUserWatchlist) => action.payload),
        switchMap((payload: any) => {
            return this.timeseriesAnalysisService$
                .updateUserWatchlist(payload)
                .pipe(
                    map((data: any) => new fromActions.UpdateUserWatchlistComplete(data)),
                    catchError(error => of(new fromActions.UpdateUserWatchlistFailed(error)))
                );
        })
    );

    @Effect()
    deleteUserChart$ = this.action$.pipe(
        ofType(fromActions.TimeseriesAnalysisActionTypes.DELETE_USER_WATCHLIST),
        map((action: fromActions.DeleteUserWatchlist) => action.payload),
        switchMap((payload: any) => {
            return this.timeseriesAnalysisService$
                .deleteUserWatchlist(payload)
                .pipe(
                    map((data: any) => new fromActions.DeleteUserWatchlistComplete(data)),
                    catchError(error => of(new fromActions.DeleteUserWatchlistFailed(error)))
                );
        })
    );
}
