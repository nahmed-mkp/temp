import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions/trades.actions';
import * as fromServices from './../../services/trades.service';
import * as fromModels from './../../models/trades.models';

@Injectable()
export class BenchmarkTradesEffects {

    @Effect()
    loadTradeDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BenchmarkTradesActionTypes.LOAD_TRADE_DATES),
            switchMap(() => {
                return this.TradesService$
                    .loadTradeDates()
                    .pipe(
                        switchMap(res => {
                            res.sort((date1, date2) => {
                                const date1Object = new Date(date1);
                                const date2Object = new Date(date2);
                                return date2Object.getTime() - date1Object.getTime();
                            });
                            return [
                                new fromActions.LoadTradeDatesComplete(res),
                                new fromActions.LoadFXTrades(res[0])
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadTradeDatesFailed(err)))
                    );
            })
        );

    @Effect()
    loadFXTrades$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BenchmarkTradesActionTypes.LOAD_FX_TRADES),
            map((action: fromActions.LoadFXTrades) => action.payload),
            switchMap((payload: string) => {
                return this.TradesService$
                    .loadFXTrades(payload)
                    .pipe(
                        map((res: fromModels.IFXTrade[]) => new fromActions.LoadFXTradesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadFXTradesFailed(err)))
                    );
            })
        );

    @Effect()
    sendToCRD$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BenchmarkTradesActionTypes.SEND_FX_TRADES_TO_CRD),
            map((action: fromActions.SendFXTradesToCRD) => action.payload),
            switchMap((payload: string) => {
                return this.TradesService$
                    .sendFXTradesToCRD(payload)
                    .pipe(
                        map((res: fromModels.IFXTrade[]) => new fromActions.SendFXTradesToCRDComplete(res)),
                        catchError((err: string) => of(new fromActions.SendFXTradesToCRDFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private TradesService$: fromServices.BenchmarkTradesService
    ) { }
}
