import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as fromServices from '../../services/bluepearl.service';
import * as fromActions from '../actions/bluepearl-settlement-ladder.actions';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import moment from 'moment';

@Injectable()
export class BluePearlSettlementLadderEffects {

    loadFunds$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadFunds),
        switchMap( () => {
            return this.bluePearlService$.loadFunds()
            .pipe(
                switchMap( (res: any) => ([fromActions.loadFundsComplete(res), fromActions.changeSelectedFund(res[0])])),
                catchError( (err: string) => of(fromActions.loadFundsFailed(err)))
            )
        })
    ))

    loadSettlementLadder$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadSettlementLadder),
        switchMap( ({payload}) => {
            return this.bluePearlService$.loadSettlementLadder(payload)
            .pipe(
                map( (res) => fromActions.loadSettlementLadderComplete(res)),
                catchError( (err: string) => of(fromActions.loadSettlementLadderFailed(err)))
            ) 
        })
    ))

    constructor(
        private actions$: Actions,
        private bluePearlService$: fromServices.BluePearlService,
        private store: Store<fromStore.BluePearlState>
    ) { }
}
