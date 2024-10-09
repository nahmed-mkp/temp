import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services';


@Injectable()
export class BenchmarkMonitorEffects {

    @Effect()
    loadData$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.BenchmarkMonitorActionTypes.LOAD_TBA_DATA),
            // map((action: fromActions.LoadTbaData) => action.payload),
            switchMap(() => {
                return this.service$
                    .loadTbaData()
                    .pipe(
                        map(res => {
                            const result = JSON.parse(res.Data);
                            return new fromActions.LoadTbaDataComplete(result)
                        }),
                        catchError((err: string) => of(new fromActions.LoadTbaDataFailed(err))
                    ));
            })
        );

    


    constructor(
        private actions$: Actions,
        private service$: fromServices.BenchmarkMonitorService,
    ) {}
}