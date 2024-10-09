import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromModels from '../../models';

@Injectable()
export class ReportsEffects {

    @Effect()
    loadReports$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ReportsActionTypes.LOAD_REPORTS),
            map((action: fromActions.LoadReports) => action.payload),
            mergeMap((payload: fromModels.Workbook) => {
                return this.reportsService
                    .loadReports(payload)
                    .pipe(
                        map((res: fromModels.Report[]) => new fromActions.LoadReportsComplete(res)),
                        catchError(err => of(new fromActions.LoadReportsFailed(err)))
                    );
            })
        );

    @Effect()
    addReport$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ReportsActionTypes.ADD_REPORT),
            map((action: fromActions.AddReport) => action.payload),
            switchMap((payload: fromModels.Report) => {
                return this.reportsService
                    .addReport(payload)
                    .pipe(
                        map((res: fromModels.Report) => new fromActions.AddReportComplete(res)),
                        catchError(err => of(new fromActions.AddReportFailed(err)))
                    );
            })
        );

    @Effect()
    updateReport$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ReportsActionTypes.UPDATE_REPORT),
            map((action: fromActions.UpdateReport) => action.payload),
            switchMap((payload: fromModels.Report) => {
                return this.reportsService
                    .updateReport(payload)
                    .pipe(
                        map((res: fromModels.Report) => new fromActions.UpdateReportComplete(res)),
                        catchError(err => of(new fromActions.UpdateReportFailed(err)))
                    );
            })
        );


    @Effect()
    deleteReport$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ReportsActionTypes.DELETE_REPORT),
            map((action: fromActions.DeleteReport) => action.payload),
            switchMap((payload: fromModels.Report) => {
                return this.reportsService
                    .deleteReport(payload)
                    .pipe(
                        map((res: fromModels.Report) => new fromActions.DeleteReportComplete(res)),
                        catchError(err => of(new fromActions.DeleteReportFailed(err)))
                    );
            })
        );

    @Effect()
    toggleFavorite$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ReportsActionTypes.TOGGLE_FAVORITE_REPORT),
            map((action: fromActions.ToggleFavoriteReport) => action.payload),
            switchMap((payload: fromModels.Report) => {
                return this.reportsService
                    .toggleFavorite(payload)
                    .pipe(
                        map((res: fromModels.Report) => new fromActions.ToggleFavoriteReportComplete(res)),
                        catchError(err => of(new fromActions.ToggleFavoriteReportFailed(err)))
                    );
            })
        );

    @Effect()
    reportViewed$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ReportsActionTypes.VIEW_REPORT),
            map((action: fromActions.ViewReport) => action.payload),
            switchMap((payload: fromModels.Report) => {
                return this.reportsService
                    .viewReport(payload)
                    .pipe(
                        map((res: fromModels.Report) => new fromActions.ViewReportComplete(res)),
                        catchError(err => of(new fromActions.ViewReportFailed(err)))
                    );
            })
        );

    constructor(private actions$: Actions,
        private reportsService: fromServices.ReportsService) { }

}
