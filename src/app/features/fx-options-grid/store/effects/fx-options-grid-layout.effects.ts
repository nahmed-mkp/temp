import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services';
import * as fromModels from './../../models/fx-options-grid.models';

@Injectable()
export class FXOptionsGridEffects {

    @Effect()
    loadLatest$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FXOptionsgridActionTypes.LOAD_LATEST),
            switchMap(() => {
                return this.fxOptionsGridService$
                    .loadLatest()
                    .pipe(
                        map(res => new fromActions.LoadLatestComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadLatestFailed(err))
                        ));
            })
        );

    @Effect()
    loadAsOfDate$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FXOptionsgridActionTypes.LOAD_AS_OF_DATE),
            map((action: fromActions.LoadAsOfDate) => action.payload),
            switchMap((payload: string) => {
                return this.fxOptionsGridService$
                    .loadAsOfDate(payload)
                    .pipe(
                        map(res => new fromActions.LoadAsOfDateComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadAsOfDateFailed(err))
                        ));
            })
        );

    constructor(
        private actions$: Actions,
        private fxOptionsGridService$: fromServices.FXOptionsGridService
    ) { }
}
