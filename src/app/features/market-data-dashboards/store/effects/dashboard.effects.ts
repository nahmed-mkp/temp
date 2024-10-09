import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';

import * as fromServices from './../../services/dashboard.service';
import * as fromActions from './../actions/dashboard.actions';
import * as fromStore from '../../store';

import * as fromSocketServices from '../../../../shared/custom/sockets/services';
import * as fromSocketStore from '../../../../shared/custom/sockets/store';
import * as fromSocketActions from '../../../../shared/custom/sockets/store/actions';
import * as fromSocketSelector from '../../../../shared/custom/sockets/store/selectors';
import * as fromSelector from '../../store/selectors';

import { BondChartRequestRow } from '../../models';

@Injectable()
export class MarketDataDashboardEffects {

    @Effect()
    loadMetaData$ = this.action$
        .pipe(
            ofType(fromActions.MarketDataDashboardActionTypes.LOAD_META_DATA),
            switchMap(() => {
                return this.service
                    .loadMetaData()
                    .pipe(
                        map((res: any[]) => {
                            res.push({
                                'params': {
                                    'lookbacks':[
                                        '1BD',
                                        '1WK',
                                        '1M'
                                    ]
                                },
                                'name': 'Bills/Short Coupons'
                            })
                            return new fromActions.LoadDashboardMetaDataComplete(res)
                        }),
                        catchError((err: string) => of(new fromActions.LoadDashboardMetaDataFailed(err)))
                )
            })
    );
    
    @Effect()
    loadDashboardData$ = this.action$
        .pipe(
            ofType(fromActions.MarketDataDashboardActionTypes.LOAD_DASHBOARD_DATA),
            map((action: fromActions.LoadDashboardData) => action.dashboardName),
            switchMap((dashboardName: string) => {
                return this.service
                    .loadDashboardData(dashboardName)
                    .pipe(
                        map((res: any) => {
                            return new fromActions.LoadDashboardDataComplete(dashboardName, res)
                        }),
                        catchError((err: string) => of(new fromActions.LoadDashboardDataFailed(dashboardName, err)))
                    );
            })
        );

    @Effect()
    subscribeToDashboardData$ = this.action$
        .pipe(
            ofType(fromActions.MarketDataDashboardActionTypes.SUBSCRIBE_TO_DASHBOARD_DATA),
            map((action: fromActions.SubscribeToDashboardData) => action.dashboardName),
            withLatestFrom(
                this.store.select(fromSelector.getSelectedDashboard),
            ),
            switchMap(([dashboardName, selectedDashboard]) => {
                this.socket.subscribeToChannel('MarketData')
                return this.socketStore.select(fromSocketSelector.getSocketChannelData)
                    .pipe(
                        map((res: any[]) =>  new fromActions.DashboardDataArrived(dashboardName, res['data'])),
                        catchError((err: string) => of(new fromActions.SubscribeToDashboardDataFailed(dashboardName, err)))
                    );
            })
        );

    @Effect()
    unsubscribeFromMarketDashboardData$: Observable<Action> = this.action$
        .pipe(
            ofType(fromActions.MarketDataDashboardActionTypes.UNSUBSCRIBE_FROM_DASHBOARD_DATA),
            switchMap(() => {
                this.socket.unsubscribe('MarketData');
                return EMPTY;
            })
        );

    @Effect()
    loadChartData$: Observable<Action> = this.action$
        .pipe(
            ofType(fromActions.MarketDataDashboardActionTypes.LOAD_CHART_DATA),
            mergeMap((payload: BondChartRequestRow[]) => {
                return this.service
                    .loadChartData(payload)
                    .pipe(
                        map((res: any) => {
                            return new fromActions.LoadChartDataComplete(res)
                        }),
                        catchError((err: string) => of(new fromActions.LoadChartDataFailed(err)))
                );
            })
        );

    @Effect()
    loadChartSpreadData$: Observable<Action> = this.action$
        .pipe(
            ofType(fromActions.MarketDataDashboardActionTypes.LOAD_CHART_SPREAD_DATA),
            mergeMap((payload: BondChartRequestRow[]) => {
                return this.service
                    .loadChartSpreadData(payload)
                    .pipe(
                        map((res: any) => {
                            return new fromActions.LoadChartSpreadDataComplete(res)
                        }),
                        catchError((err: string) => of(new fromActions.LoadChartSpreadDataFailed(err)))
                );
            })
        );
    

    constructor(private action$: Actions,  private store: Store<fromStore.State>, private socketStore: Store<fromSocketStore.SocketState>, private service: fromServices.MarketDataDashboardService, private socket: fromSocketServices.SocketService ) { 
         // this.socket.authenticate();
         this.socket.socketUserAuth();
         this.socket.socketEvents.subscribe((event) => {
             if (event !== null) {
                 switch (event.event) {
                     // dispatch store action according to event
                     case 'SOCKET_CREATED':
                         this.socketStore.dispatch(new fromSocketActions.SocketCreated());
                         break;
                     case 'SOCKET_CONNECTED':
                         this.socketStore.dispatch(new fromSocketActions.SocketConnected(event.data));
                         break;
                     case 'SOCKET_DISCONNECTED':
                         this.socketStore.dispatch(new fromSocketActions.SocketDisconnected(event.data));
                         break;
                     case 'SOCKET_SUBSCRIBED':
                         this.socketStore.dispatch(new fromSocketActions.SocketSubscribed(event.channelName));
                         break;
                     case 'SOCKET_UNSUBSCRIBED':
                         this.socketStore.dispatch(new fromSocketActions.SocketUnsubscribed(event.channelName));
                         break;
                     case 'SOCKET_CHANNEL_DATA_ARRIVED':
                         this.socketStore.dispatch(new fromSocketActions.SocketChannelDataArrived(event.data));
                         break;
                 }
             }
         });
    }

}
