import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';


@Injectable()
export class DividendEffects {

    @Effect()
    loadDividend$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DividendActionTypes.LOAD_DIVIDEND_INFO),
            map((action: fromActions.LoadDividendInfo) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadDividendInfo(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadDividendInfoComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDividendInfoFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.DividendService
    ) { }
}