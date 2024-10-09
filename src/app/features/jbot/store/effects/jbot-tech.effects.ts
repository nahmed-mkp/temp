import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';

@Injectable()
export class JbotTechEffects {

    @Effect()
    loadAsOfDate$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.JbotTechActionTypes.LOAD_JBOT_TECH_AS_OF_DATE),
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
                                new fromActions.LoadJbotTechAsOfDateComplete(res),
                                new fromActions.SetJbotTechActiveAsOfDate(res[0]),
                                new fromActions.LoadJbotTechScore(res[0])
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadJbotTechAsOfDateFailed(err))
                    ));
            })
        );

    @Effect()
    loadJbotTechScore$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.JbotTechActionTypes.LOAD_JBOT_TECH_SCORE),
            map((action: fromActions.LoadJbotTechScore) => action.payload),
            withLatestFrom(
                this.store.select(fromSelector.getJbotTechReverseTimeRange),
                this.store.select(fromSelector.getJbotTechActiveAsOfDate),
            ),
            switchMap(([payload, timeRange, asOfDate]) => {
                let targetDate;
                if (payload === undefined) {
                    targetDate = asOfDate;
                } else {
                    targetDate = payload;
                }
                return this.jbotService$
                    .getJbotTechResult(targetDate, timeRange)
                    .pipe(
                        map(res => new fromActions.LoadJbotTechScoreComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadJbotTechScoreFailed(err))
                    ));
            })
        );

    constructor(
        private actions$: Actions,
        private jbotService$: fromServices.JbotTechService,
        private store: Store<fromStore.JbotState>) { }
}
