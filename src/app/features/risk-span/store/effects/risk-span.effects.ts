import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers'

@Injectable()
export class RiskSpanEffects {

    @Effect()
    loadReports$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RiskSpanActionTypes.LOAD_REPORTS),
            switchMap(() => {
                return this.RiskSpanService$
                    .loadReports()
                    .pipe(
                        map(res => new fromActions.LoadReportsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadReportsFailed(err)))
                    )
            })
        )
    
    @Effect()
    loadXAxis$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RiskSpanActionTypes.LOAD_X_AXIS),
            switchMap(() => {
                return this.RiskSpanService$
                    .loadXAxis()
                    .pipe(
                        map(res => new fromActions.LoadXAxisComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadXAxisFailed(err)))
                    )
            })
        )

    @Effect()
    loadYAxis$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RiskSpanActionTypes.LOAD_Y_AXIS),
            switchMap(() => {
                return this.RiskSpanService$
                    .loadYAxis()
                    .pipe(
                        map(res => new fromActions.LoadYAxisComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadYAxisFailed(err)))
                    )
            })
        )

    @Effect()
    uploadSheet: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RiskSpanActionTypes.UPLOAD_SHEET),
            map((action: fromActions.UpdateReport) => action.payload),
            switchMap(payload => {
                return this.RiskSpanService$
                    .uploadSheet(payload)
                    .pipe(
                        map((res) => new fromActions.UpdateReportComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateReportFailed(err)))
                    )
            })
        )

    @Effect()
    loadMultiPlot$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RiskSpanActionTypes.LOAD_MULTI_PLOT),
            map((action: fromActions.LoadMultiplePlot) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getActiveReportId)),
            switchMap(([payload, reportId]) => {
                return this.RiskSpanService$
                    .getReportPlot(payload, reportId)
                    .pipe(
                        map(res => new fromActions.LoadMultiplePlotComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadMultiplePlotFailed(err)))
                    )
            })
        )

    

    constructor(
        private actions$: Actions,
        private RiskSpanService$: fromServices.RiskSpanService,
        private store: Store<fromStore.State>
    ) { }
}