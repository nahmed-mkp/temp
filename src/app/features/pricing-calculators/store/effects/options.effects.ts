import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromServices from '../../services';
import * as fromActions from '../actions';


@Injectable()
export class OptionsEffects {

    @Effect()
    loadInputs$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionActionTypes.OPTIONS_LOAD_INPUTS),
            switchMap(() => {
                return this.service$
                    .loadInputs('options')
                    .pipe(
                        map((res: any) => new fromActions.OptionsLoadInputsComplete(res)),
                        catchError((err: string) => of(new fromActions.OptionsLoadInputsFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private service$: fromServices.CalculationInputService
    ) { }
}

