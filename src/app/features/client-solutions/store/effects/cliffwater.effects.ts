import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as fromActions from '../actions';
import * as fromModels from '../../models';

@Injectable()
export class CliffwaterEffects {
    @Effect()
    loadBenchmarks$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CliffwaterActionsType.LOAD_CLIFFWATER_DATA),
            map((action: fromActions.LoadCliffwaterData) => action.payload),
            switchMap(payload => {
                return this.cliffwaterService$
                    .getCliffwaterData(payload)
                    .pipe(
                        map((res: fromModels.IBenchmark[]) => new fromActions.LoadCliffwaterDataComplete(res)),
                        catchError(err => of(new fromActions.LoadCliffwaterDataFailed(err)))
                    );
        }));

        constructor(private actions$: Actions, private cliffwaterService$: fromServices.CliffwaterService) { }
}