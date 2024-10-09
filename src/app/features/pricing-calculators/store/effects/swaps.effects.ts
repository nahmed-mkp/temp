import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class SwapsEffects {

    @Effect()
    loadInputs$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SwapsActionTypes.LOAD_INPUTS),
            switchMap(() => {
                return this.service$
                    .loadInputs('swaps')
                    .pipe(
                        map((res: any) => new fromActions.LoadSwapsInputsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSwapsInputsFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private service$: fromServices.CalculationInputService
    ) { }
}

