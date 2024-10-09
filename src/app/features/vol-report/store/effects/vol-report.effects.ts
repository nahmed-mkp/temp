import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, takeUntil } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services/vol-report.service';

@Injectable()
export class VolReportEffects {

    @Effect()
    loadAsOfDate$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.VolReportActionTypes.LOAD_AS_OF_DATE),
            mergeMap(() => {
                return this.volReportService$
                    .getAsOfDates()
                    .pipe(
                        switchMap(res => {
                            res.sort((date1, date2) => {
                                const date1Object = new Date(date1);
                                const date2Object = new Date(date2);
                                return date2Object.getTime() - date1Object.getTime();
                            });

                            return [
                                new fromActions.LoadAsOfDateComplete(res),
                                new fromActions.SetActiveAsOfDate(res[0]),
                                new fromActions.LoadVolReport(res[0])
                            ]
                        }),
                        catchError((err: string) => of(new fromActions.LoadAsOfDateFailed(err))
                    ));
            })
        )

    @Effect()
    loadVolReport$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.VolReportActionTypes.LOAD_VOL_REPORT),
            map((action: fromActions.LoadVolReport) => action.payload),
            mergeMap((payload) => {
                return this.volReportService$
                    .getVolReport(payload)
                    .pipe(
                        map(res => new fromActions.LoadVolReportComplete({[payload]: res})),
                        catchError((err: string) => of(new fromActions.LoadVolReportFailed(err))
                    ));
            })
        )

    @Effect()
    loadTimeseries$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.VolReportActionTypes.LOAD_TIMESERIES),
            map((action: fromActions.LoadVolReport) => action.payload),
            mergeMap((payload) => {
                return this.volReportService$
                    .getTimeseries(payload)
                    .pipe(
                        map(res => new fromActions.LoadTimeseriesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadTimeseriesFailed(err))
                    ));
            })
        )

    


    constructor(
        private actions$: Actions,
        private volReportService$: fromServices.VolReportService,
    ){}
}