import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromModels from './../../models/jbot-summary.models';
import * as fromActions from '../actions/jbot-summary.actions';
import * as fromServices from '../../services/jbot-summary.service';

@Injectable()
export class JbotSummaryEffects {

    @Effect()
    loadJbotSummaryAsOfDates$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.JbotSummaryActionTypes.LOAD_JBOT_SUMMARY_AS_OF_DATES),
            mergeMap(() => {
                return this.jbotService$
                    .getAsOfDates()
                    .pipe(
                        switchMap((res: string[]) => {
                            res.sort((date1, date2) => {
                                const date1Object = new Date(date1);
                                const date2Object = new Date(date2);
                                return date2Object.getTime() - date1Object.getTime();
                            });

                            return [
                                new fromActions.LoadJbotSummaryAsOfDatesComplete(res),
                                new fromActions.SetJbotSummaryActiveAsOfDate(res[0]),
                                new fromActions.LoadJbotSummary(res[0])
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadJbotSummaryAsOfDatesFailed(err))
                    ));
            })
        );

    @Effect()
    loadJbotSummarys$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.JbotSummaryActionTypes.LOAD_JBOT_SUMMARY),
            map((action: fromActions.LoadJbotSummary) => action.payload),
            mergeMap((payload: string) => {
                return this.jbotService$
                    .getJbotSummary(payload)
                    .pipe(
                        map((res: fromModels.JbotSummaryGridData[]) => new fromActions.LoadJbotSummaryComplete({[payload]: res})),
                        catchError((err: string) => of(new fromActions.LoadJbotSummaryFailed(err))
                        ));
            })
        );


    @Effect()
    loadJbotExplodedSummarys$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.JbotSummaryActionTypes.LOAD_JBOT_EXPLODED_SUMMARY),
            map((action: fromActions.LoadJbotExplodedSummary) => action.payload),
            mergeMap((payload: string) => {
                return this.jbotService$
                    .getJbotExplodedSummary(payload)
                    .pipe(
                        map((res: fromModels.JbotExplodedSummaryGridData[]) => new fromActions.LoadJbotExplodedSummaryComplete({ [payload]: res })),
                        catchError((err: string) => of(new fromActions.LoadJbotExplodedSummaryFailed(err))
                        ));
            })
        );

    constructor(
        private actions$: Actions,
        private jbotService$: fromServices.JbotSummaryService) { }
}
