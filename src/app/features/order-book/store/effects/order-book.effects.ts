import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom, delay, combineLatest, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions/order-book.actions';
import * as fromServices from './../../services/order-book.service';
import * as fromModels from './../../models/order-book.models';
import * as fromStore from '../reducers';
import * as fromSelector from '../selectors';
import { NotificationService } from 'src/app/factories';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

const orderHistory_dummy = [
    {
        'id': 1,
        'audit': 'Edited',
        'audit date': '05/27/2021 4:01 PM',
        'audit user': 'ylin',
        'Locked': false,
        'order Date': '06/08/2020',
        'pod': 'Macro1',
        'order Type': 'STOP',
        'BuySell': 'BUY',
        'security': 'EURUSD',
        'quantity': 50,
        'order Level': 1.136,
        'type': 'MM',
        'inWithNotIn': 'GS',
        'contact': 'ylin',
        'expiry': 'GTC',
        'orderStatus': 'Filled',
        'lastUpdated': '05/27/2021 4:01 PM',
        'notes': 'NY Hours Only',
    }
];

@Injectable()
export class OrderBookEffects {

    @Effect()
    loadLookups$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OrderBookActionTypes.LOAD_LOOKUPS),
            switchMap(() => {
                return this.orderBookService$
                    .loadLookups()
                    .pipe(
                        map((lookups: any) => new fromActions.LoadLookupsComplete(lookups)),
                        catchError((err: string) => of(new fromActions.LoadLookupsFailed(err))
                    ));
            })
        );

    @Effect()
    liveloadOrders$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OrderBookActionTypes.LIVE_LOAD_ORDERS),
            withLatestFrom(this.store.select(fromSelector.getOrderBookParams)),
            switchMap(([never, payload]) => {
                return this.orderBookService$
                    .loadOrdersByDateRange(payload)
                    .pipe(
                        map((orders: fromModels.IOrder[]) => new fromActions.LoadOrdersComplete(orders)),
                        catchError((err: string) => of(new fromActions.LoadOrdersFailed(err))
                    ));
            })
        );

    @Effect()
    loadOrders$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OrderBookActionTypes.LOAD_ORDERS),
            map((action: fromActions.LoadOrders) => action.payload),
            switchMap((payload: fromModels.IOrderBookParams) => {
                return this.orderBookService$
                    .loadOrdersByDateRange(payload)
                    .pipe(
                        map((orders: fromModels.IOrder[]) => new fromActions.LoadOrdersComplete(orders)),
                        catchError((err: string) => of(new fromActions.LoadOrdersFailed(err))
                    ));
            })
        );

    @Effect()
    loadOrderHistory$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OrderBookActionTypes.LOAD_ORDER_HISTORY),
            map((action: fromActions.LoadOrderHistory) => action.payload),
            switchMap((payload: number) => {
                return this.orderBookService$
                    .loadOrderHistory(payload)
                    .pipe(
                        map((orderHistory: fromModels.IOrderHistory[]) => new fromActions.LoadOrderHistoryComplete(orderHistory)),
                        catchError((err: string) => of(new fromActions.LoadOrderHistoryFailed(err))
                    ));
            })
        );

    @Effect()
    loadOrderNotes$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OrderBookActionTypes.LOAD_ORDER_NOTES),
            map((action: fromActions.LoadOrderNotes) => action.payload),
            switchMap((payload: number) => {
                return this.orderBookService$
                    .loadOrderNotes(payload)
                    .pipe(
                        map((res: fromModels.IOrderHistory[]) => new fromActions.LoadOrderNotesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadOrderNotesFailed(err))
                        ));
            })
        );


    @Effect()
    lockOrders$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OrderBookActionTypes.LOCK_ORDER),
            map((action: fromActions.LockOrder) => action.payload),
            switchMap((payload: fromModels.ILockOrderReq) => {
                return this.orderBookService$
                    .lockOrder(payload)
                    .pipe(
                        switchMap((res) => {
                            return [
                                new fromActions.LockOrderComplete(res),
                                new fromActions.LiveLoadOrders,
                            ]
                        }),
                        catchError((err: string) => of(new fromActions.LockOrderFailed(err))
                    ));
            })
        );


    @Effect()
    startEditOrder$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OrderBookActionTypes.START_EDIT_ORDER),
            withLatestFrom(this.store.select(fromSelector.getOrderBookSelectedOrder)),
            switchMap(([never, payload]) => {

                if (payload.locked === false || payload.locked === undefined || payload.locked === null) {
                    return [new fromActions.LockOrder({
                        locked: true,
                        orderId: payload.orderId
                    })];
                } else {
                    return [];
                }
            })
        );

    @Effect()
    SaveOrders$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OrderBookActionTypes.SAVE_ORDER),
            map((action: fromActions.SaveOrder) => action.payload),
            switchMap((payload: fromModels.ISaveOrderReq) => {
                return this.orderBookService$
                    .saveOrder(payload)
                    .pipe(
                        switchMap((res) => {
                            return [
                                new fromActions.SaveOrderComplete(res),
                                new fromActions.LiveLoadOrders
                            ]
                        }),
                        catchError((err: string) => of(new fromActions.SaveOrderFailed(err))
                    ));
            })
        );

    @Effect()
    SendEmail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OrderBookActionTypes.SEND_ORDER_BOOK_EMAIL),
            map((action: fromActions.SendOrderBookEmail) => action.payload),
            switchMap((payload: fromModels.ISendEmailReq) => {
                return this.orderBookService$
                    .sendEmail(payload)
                    .pipe(
                        map((res) => {
                            this.notificationService.openNotification_green('Email sent successfully!');
                            return new fromActions.SendOrderBookEmailComplete;
                        }),
                        catchError((err: string) => {
                            this.notificationService.openNotification('Email sent failed!');
                            return of(new fromActions.SendOrderBookEmailFailed(err));
                        }
                    ));
            })
        );


    @Effect()
    LoadSecurityMarketData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OrderBookActionTypes.LOAD_SECURITY_MARKET_DATA),
            map((action: fromActions.LoadSecurityMarketData) => action.payload),
            switchMap((payload: number) => {
                return this.orderBookService$
                    .loadSecurityMarketData(payload)
                    .pipe(
                        switchMap((res) => {
                            const targetElement = res.filter(element => element.type === 'Price')[0];
                            return [
                                new fromActions.LoadSecurityCurrentLevel(targetElement.mdid),
                                new fromActions.LoadSecurityMarketDataComplete
                            ]
                        }),
                        catchError((err: string) => of(new fromActions.LoadSecurityMarketDataFailed(err))
                    ));
            }),
        );

    @Effect()
    LoadSecurityCurrentLevel$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OrderBookActionTypes.LOAD_SECURITY_CURRENT_LEVEL),
            map((action: fromActions.LoadSecurityCurrentLevel) => action.payload),
            switchMap((payload: number) => {
                return this.orderBookService$
                    .loadMarketDataPoints(payload)
                    .pipe(
                        map((res) => {
                            const formatData = this.dataService$.csvToObjectArrayWithColumnHeaders(res['data'], 'date') || [];
                            formatData.sort((valueA, valueB) => {
                                const dateA = (new Date(valueA.date)).getTime();
                                const dateB = (new Date(valueB.date)).getTime();
                                return dateB - dateA;
                            })
                            if (formatData.length > 0) {
                                return new fromActions.LoadSecurityCurrentLevelComplete(formatData[0]['live_value']);
                            } else {
                                return new fromActions.LoadSecurityCurrentLevelFailed('Current level is not available');
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadSecurityCurrentLevelFailed(err))
                    ));
            }),
        );



    constructor(
        private actions$: Actions,
        private orderBookService$: fromServices.OrderBookService,
        private store: Store<fromStore.OrderBookState>,
        private notificationService: NotificationService,
        private dataService$: HighchartsDataService
    ) { }
}
