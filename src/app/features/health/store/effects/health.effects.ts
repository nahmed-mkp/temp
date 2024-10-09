import { Injectable } from '@angular/core';
import { Observable, of, empty, EMPTY } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services';
import * as fromModels from './../../models/health.models';

import * as fromSocketStore from '../../../../shared/custom/sockets/store';
import * as fromSockets from '../../../../shared/custom/sockets/services';
import * as fromSocketActions from '../../../../shared/custom/sockets/store/actions/socket.actions';
import * as fromSocketSelector from '../../../../shared/custom/sockets/store/selectors/socket.selector';

@Injectable()
export class HealthStatusEffects {

    @Effect()
    loadHealthStatus$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.HealthStatusActionTypes.LOAD_HEALTH_STATUS),
            switchMap(() => {
                return this.healthService$
                    .getHealthStatus()
                    .pipe(
                        map(res => new fromActions.LoadHealthStatusComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadHealthStatusFailed(err))
                        ));
            })
        );

    @Effect()
    viewRunHistory$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.HealthStatusActionTypes.VIEW_RUN_HISTORY),
            map((action: fromActions.ViewRunHistory) => action.payload),
            switchMap((payload: fromModels.RunHistoryRequest) => {
                return this.healthService$
                    .viewRunHistory(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.ViewRunHistoryComplete(res)),
                        catchError((err: string) => of(new fromActions.ViewRunHistoryFailed(err))
                        ));
            })
        );

    @Effect()
    restartApp$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.HealthStatusActionTypes.RESTART_APP),
            map((action: fromActions.RestartApp) => action.payload),
            switchMap((payload: fromModels.AppRestartRequest) => {
                return this.healthService$
                    .restartApp(payload)
                    .pipe(
                        map((res: any) => new fromActions.RestartAppComplete(res)),
                        catchError((err: string) => of(new fromActions.RestartAppFailed(err))
                        ));
            })
        );

    @Effect()
    killMonitoredProcess$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.HealthStatusActionTypes.KILL_MONITORED_PROCESS),
            map((action: fromActions.KillMonitoredProcess) => action.payload),
            switchMap((payload: fromModels.ProcessKillRequest) => {
                return this.healthService$
                    .killMonitoredProcess(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.KillMonitoredProcessComplete(res)),
                        catchError((err: string) => of(new fromActions.KillMonitoredProcessFailed(err))
                        ));
            })
        );


    @Effect()
    loginAndRestartBloomberg$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.HealthStatusActionTypes.LOGIN_AND_RESTART_BLOOMBERG),
            map((action: fromActions.LoginAndRestartBloomberg) => action.payload),
            switchMap((payload: fromModels.BulkRequest) => {
                return this.healthService$
                    .sendBulkRequest(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoginAndRestartBloombergComplete(res)),
                        catchError((err: string) => of(new fromActions.LoginAndRestartBloombergFailed(err))
                        ));
            })
        );

    @Effect()
    loginAndRestartTradeweb$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.HealthStatusActionTypes.LOGIN_AND_RESTART_TRADEWEB),
            map((action: fromActions.LoginAndRestartTradeweb) => action.payload),
            switchMap((payload: fromModels.BulkRequest) => {
                return this.healthService$
                    .sendBulkRequest(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoginAndRestartTradewebComplete(res)),
                        catchError((err: string) => of(new fromActions.LoginAndRestartTradewebFailed(err))
                        ));
            })
        );

    @Effect()
    restartAllCalcServers$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.HealthStatusActionTypes.RESTART_ALL_CALC_SERVERS),
            map((action: fromActions.RestartAllCalcServers) => action.payload),
            switchMap((payload: fromModels.BulkRequest) => {
                return this.healthService$
                    .sendBulkRequest(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.RestartAllCalcServersComplete(res)),
                        catchError((err: string) => of(new fromActions.RestartAllCalcServersFailed(err))
                        ));
            })
        );

    @Effect()
    subToProcessMonitorData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.HealthStatusActionTypes.SUB_TO_PROCESS_MONITOR_DATA),
            switchMap(() => {
                this.socket.unsubscribe(this.socket.getSubscriptions()[0]);
                this.socket.subscribeToChannel('ProcessMonitorData');

                return this.socketStore.select(fromSocketSelector.getSocketChannelData)
                    .pipe(
                        map(res => {
                            if (res.data && res.channel === 'ProcessMonitorData') {
                                return new fromActions.UpdateProcessMonitorDataComplete(res.data);
                            }
                            return new fromActions.UpdateProcessMonitorDataComplete(null);
                        }),
                        catchError((err: string) => of(new fromActions.UpdateProcessMonitorDataFailed(err))
                        ));
            })
        );

    @Effect()
    unsubFromProcessMonitorData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.HealthStatusActionTypes.UNSUB_FROM_PROCESS_MONITOR_DATA),
            switchMap(() => {
                this.socket.unsubscribe('ProcessMonitorData');
                return EMPTY;
            })
        );

    @Effect()
    loadProcessMonitorNames$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.HealthStatusActionTypes.LOAD_PROCESS_MONITOR_NAMES),
            switchMap(() => {
                return this.healthService$
                    .loadProcessNames()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadProcessMonitorNamesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadProcessMonitorNamesFailed(err))
                        ));
            })
        );

    constructor(
        private actions$: Actions,
        private socketStore: Store<fromSocketStore.SocketState>,
        private healthService$: fromServices.HealthService,
        private socket: fromSockets.SocketService
    ) {
        this.socket.socketUserAuth();
        this.socket.socketEvents.subscribe((msg) => {
            if(msg !== null) {
                switch (msg.event) {
                    // dispatch store action according to event
                    case 'SOCKET_CREATED':
                        this.socketStore.dispatch(new fromSocketActions.SocketCreated());
                        break;
                    case 'SOCKET_CONNECTED':
                        this.socketStore.dispatch(new fromSocketActions.SocketConnected(msg.data));
                        break;
                    case 'SOCKET_DISCONNECTED':
                        this.socketStore.dispatch(new fromSocketActions.SocketDisconnected(msg.data));
                        break;
                    case 'SOCKET_SUBSCRIBED':
                        this.socketStore.dispatch(new fromSocketActions.SocketSubscribed(msg.channelName));
                        break;
                    case 'SOCKET_UNSUBSCRIBED':
                        this.socketStore.dispatch(new fromSocketActions.SocketUnsubscribed(msg.channelName));
                        break;
                    case 'SOCKET_CHANNEL_DATA_ARRIVED':
                        this.socketStore.dispatch(new fromSocketActions.SocketChannelDataArrived(msg.data));
                        break;
                }
            }
        });
    }
}
