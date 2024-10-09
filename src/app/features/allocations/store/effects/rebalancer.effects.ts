import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

// import * as fromModels from '../../models/rebalancer.models';
import * as fromServices from '../../services/rebalancer.service';
import * as fromActions from '../actions/rebalancer.actions';

@Injectable()
export class TradeNameAllocationEffects {

    @Effect()
    loadTradeNameAllocations$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.TradeNameAllocationRebalancerActionTypes.LOAD_TRADENAME_ALLOCATIONS),
            map((action: fromActions.LoadTradeNameAllocations) => action.payload),
            switchMap((payload: string) => {
                return this.tradeNameAllocationsService$
                    .loadTradeNameAllocations(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadTradeNameAllocationsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadTradeNameAllocationsFailed(err))
                    ));
            })
        );

    @Effect()
    saveTradeNameAllocations$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.TradeNameAllocationRebalancerActionTypes.SAVE_TRADENAME_ALLOCATIONS),
            map((action: fromActions.SaveTradeNameAllocations) => action.payload),
            switchMap((payload: any[]) => {
                return this.tradeNameAllocationsService$
                    .saveTradeNameAllocations(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.SaveTradeNameAllocationsComplete(res)),
                        catchError((err: string) => of(new fromActions.SaveTradeNameAllocationsFailed(err))
                        ));
            })
        );

    constructor(
        private actions$: Actions,
        private tradeNameAllocationsService$: fromServices.TradeNameAllocationService
    ) { }
}
