import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as fromActions from './../actions/tradename-helper.actions';
import * as fromServices from './../../services/tradename-helper.service';
import * as fromModels from './../../models/tradename-helper.models';

// import all requried services or any dependencies

@Injectable()
export class TradeNameHelperEffects {

    constructor(private action$: Actions,
        private tradenameHelperService$: fromServices.TradeNameHelperService) { }

    @Effect()
    loadAllTradeNames$ = this.action$.pipe(
        ofType(fromActions.TradeNameHelperActionTypes.LOAD_ALL_TRADENAMES),
        switchMap(() => {
            return this.tradenameHelperService$
                .loadAllTradeNames()
                .pipe(
                    map((data: fromModels.ITradeName[]) => new fromActions.LoadAllTradeNamesComplete(data)),
                    catchError(error => of(new fromActions.LoadAllTradeNamesFailed(error)))
                );
        })
    );

    @Effect()
    loadTaxLots$ = this.action$.pipe(
        ofType(fromActions.TradeNameHelperActionTypes.LOAD_TAXLOTS),
        switchMap(() => {
            return this.tradenameHelperService$
                .loadTaxlots()
                .pipe(
                    map((data: fromModels.ITaxLot[]) => new fromActions.LoadTaxlotsComplete(data)),
                    catchError(error => of(new fromActions.LoadTaxlotsFailed(error)))
                );
        })
    );

    @Effect()
    loadTradeNameCounters$ = this.action$.pipe(
        ofType(fromActions.TradeNameHelperActionTypes.LOAD_TRADENAME_COUNTERS),
        switchMap(() => {
            return this.tradenameHelperService$
                .loadTradeNameCounters()
                .pipe(
                    map((data: fromModels.ITradeNameCounter[]) => new fromActions.LoadTradeNameCountersComplete(data)),
                    catchError(error => of(new fromActions.LoadTradeNameCountersFailed(error)))
                );
        })
    );

    @Effect()
    updateTradeName$ = this.action$.pipe(
        ofType(fromActions.TradeNameHelperActionTypes.UPDATE_TRADENAME),
        map((action: fromActions.UpdateTradeName) => action.payload),
        switchMap((payload: fromModels.ITradeName) => {
            return this.tradenameHelperService$
                .updateTradeName(payload)
                .pipe(
                    map((data: fromModels.ITradeName[]) => new fromActions.UpdateTradeNameComplete(data)),
                    catchError(error => of(new fromActions.UpdateTradeNameFailed(error)))
                );
        })
    );

    @Effect()
    reinstateTradeName$ = this.action$.pipe(
        ofType(fromActions.TradeNameHelperActionTypes.REINSTATE_TRADENAME),
        map((action: fromActions.ReinstateTradeName) => action.payload),
        switchMap((payload: fromModels.ITradeName) => {
            return this.tradenameHelperService$
                .reinstateTradeName(payload)
                .pipe(
                    map((data: fromModels.ITradeName[]) => new fromActions.ReinstateTradeNameComplete(data)),
                    catchError(error => of(new fromActions.ReinstateTradeNameFailed(error)))
                );
        })
    );
}
