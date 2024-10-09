import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services/jbot.services';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';

@Injectable()
export class JbotEffects {

    @Effect()
    loadAsOfDate$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.JbotActionTypes.LOAD_AS_OF_DATE),
            mergeMap(() => {
                return this.jbotService$
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
                                new fromActions.LoadJbotResult(res[0])
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadAsOfDateFailed(err))
                    ));
            })
        );

    @Effect()
    loadVolReport$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.JbotActionTypes.LOAD_JBOT_RESULT),
            map((action: fromActions.LoadJbotResult) => action.payload),
            mergeMap((payload) => {
                return this.jbotService$
                    .getJbotResult(payload)
                    .pipe(
                        map(res => new fromActions.LoadJbotResultComplete({[payload]: res})),
                        catchError((err: string) => of(new fromActions.LoadJbotResultFailed(err))
                    ));
            })
        );

    @Effect()
    loadJbotTimeseries$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.JbotActionTypes.LOAD_JBOT_TIMESERIES),
            map((action: fromActions.LoadJbotTimeseries) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getJbotTimeseries)),
            mergeMap(([payload, timeseriesEntity]) => {
                if (timeseriesEntity && timeseriesEntity[payload.seriesName]) {
                    return of(new fromActions.LoadJbotTimeseriesComplete({[payload.seriesName]: timeseriesEntity[payload.seriesName]}));
                } else {
                    return this.jbotService$
                    .getJbotTimeseries(payload)
                    .pipe(
                        map(res => new fromActions.LoadJbotTimeseriesComplete({[payload.seriesName]: res})),
                        catchError((err: string) => of(new fromActions.LoadJbotTimeseriesFailed(err))
                    ));
                }
            })
        );

    constructor(
        private actions$: Actions,
        private jbotService$: fromServices.JbotService,
        private store: Store<fromStore.JbotState>) { }
}
