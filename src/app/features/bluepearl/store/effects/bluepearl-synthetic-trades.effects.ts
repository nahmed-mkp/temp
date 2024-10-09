import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../services/bluepearl.service';
import * as fromActions from '../actions/bluepearl-synthetic-trades.actions';

@Injectable()
export class BluePearlSyntheticTradesEffects {

    loadSyntheticTrades$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadSyntheticTrades),
        switchMap( () => {
            return this.bluePearlService$.loadSyntheticTrades()
            .pipe(
                map( (res) => fromActions.loadSyntheticTradesComplete(res)),
                catchError( (err: string) => of(fromActions.loadSyntheticTradesFailed(err)))
            ) 
        })
    ))

    constructor(
        private actions$: Actions,
        private bluePearlService$: fromServices.BluePearlService
    ) { }
}
