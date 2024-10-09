import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';

@Injectable()
export class JbotMonitorEffects {

    @Effect()
    loadAsOfDate$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.JbotMonitorActionTypes.LOAD_JBOT_MONITOR_AS_OF_DATE),
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
                                new fromActions.LoadJbotMonitorAsOfDateComplete(res),
                                new fromActions.SetJbotMonitorActiveAsOfDate(res[0]),
                                new fromActions.LoadJbotMonitorScore(res[0])
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadJbotMonitorAsOfDateFailed(err))
                    ));
            })
        );

    @Effect()
    loadJbotMonitorScore$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.JbotMonitorActionTypes.LOAD_JBOT_MONITOR_SCORE),
            map((action: fromActions.LoadJbotMonitorScore) => action.payload),
            withLatestFrom(
                this.store.select(fromSelector.getJbotMonitorReverseTimeRange),
                this.store.select(fromSelector.getJbotMonitorActiveAsOfDate),
            ),
            switchMap(([payload, timeRange, asOfDate]) => {
                let targetDate
                if(payload === undefined) targetDate = asOfDate;
                else targetDate = payload;
                return this.jbotService$
                    .getJbotMonitorResult(targetDate, timeRange)
                    .pipe(
                        map(res => new fromActions.LoadJbotMonitorScoreComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadJbotMonitorScoreFailed(err))
                    ));
            })
        );

    constructor(
        private actions$: Actions,
        private jbotService$: fromServices.JbotMonitorService,
        private store: Store<fromStore.JbotState>) { }
}