import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import * as fromServices from '../../services';
import * as fromActions from '../actions';


@Injectable()
export class FXOptionsEffects {

    @Effect()
    loadInputs$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FXOptionActionTypes.LOAD_INPUTS),
            switchMap( () => {
                return this.service$
                    .priceFXOption()
                    .pipe(
                        map((res: any) => new fromActions.LoadInputsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadInputsFailed(err)))
                    );
            })
        );

        
    @Effect()
    getOutput$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FXOptionActionTypes.LOAD_OUTPUTS),
            map((action: fromActions.LoadOutputs) => action.payload),
            switchMap(payload => {
                return this.service$
                    .submitFXParams(payload)
                    .pipe(
                        map((res) => {
                            return new fromActions.LoadOutputsComplete({
                                data: res,
                            })
                        }),
                        catchError((err: string) => of(new fromActions.LoadOutputsFailed(err)))
                    );
            })
        );
            
    constructor(
        private actions$: Actions,
        private service$: fromServices.CalculatorService
    ) { }
}

