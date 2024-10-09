import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable, of, pipe } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromActions from '../actions/socket-dashboard.actions';
import * as fromStore from '../../../../shared/custom/sockets/store';
import * as fromSelector from '../../../../shared/custom/sockets/store/selectors';
import * as fromSockets from 'src/app/shared/custom/sockets/services';
import * as fromSocketActions from '../../../../shared/custom/sockets/store/actions/socket.actions';

@Injectable()
export class SocketDashboardEffects {


    subToDashboardData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.subToSocketDashboardData),
        switchMap(() => {
            this.socket.subscribeToChannel('SocketDashboardUpdates');
            return this.store.select(fromSelector.getSocketChannelData)
            .pipe(
                map(res => {
                    if (res.data && res.channel === 'SocketDashboardUpdates') {
                        res.data.map(item => {
                            if (item.authToken){
                                item.username = item.authToken.username;
                            }
                            item.channel = item.channels[0];
                        });
                    }
                    return new fromActions.UpdateSocketDashboardDataComplete(res.data);
                }),
                catchError((err: string) => of(new fromActions.UpdateSocketDashboardDataFailed(err))
                ));
        })
    ))

    testActionWithPayload$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.testActionWithPayload),
        map(({payload}) => {
            console.log('testActionWithPayload$ action: ', payload);
            return new fromActions.UpdateSocketDashboardDataComplete(null);
        })
    ))

    @Effect()
    subscribeToSocketDashboardData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SocketDashboardActionTypes.SUB_TO_SOCKET_DASHBOARD_DATA),
            switchMap(() => {
                this.socket.subscribeToChannel('SocketDashboardUpdates');
                return this.store.select(fromSelector.getSocketChannelData)
                .pipe(
                    map(res => {
                        if (res.data && res.channel === 'SocketDashboardUpdates') {
                            res.data.map(item => {
                                if (item.authToken){
                                    item.username = item.authToken.username;
                                }
                                item.channel = item.channels[0];
                            });
                        }
                        return new fromActions.UpdateSocketDashboardDataComplete(res.data);
                    }),
                    catchError((err: string) => of(new fromActions.UpdateSocketDashboardDataFailed(err))
                    ));
            })
        );

        @Effect()
        unsubscribeFromSocketDashboardData$: Observable<Action> = this.actions$
            .pipe(
                ofType(fromActions.SocketDashboardActionTypes.UNSUB_FROM_SOCKET_DASHBOARD_DATA),
                switchMap(() => {
                    this.socket.unsubscribe('SocketDashboardUpdates');
                    return EMPTY;
                })
            );

    constructor(
        private actions$: Actions,
        private store: Store<fromStore.SocketState>,
        private socket: fromSockets.SocketService
    ) {
        // this.socket.authenticate();
        this.socket.socketUserAuth();
        this.socket.socketEvents.subscribe((event) => {
            if (event !== null) {
                switch (event.event) {
                    // dispatch store action according to event
                    case 'SOCKET_CREATED':
                        this.store.dispatch(new fromSocketActions.SocketCreated());
                        break;
                    case 'SOCKET_CONNECTED':
                        this.store.dispatch(new fromSocketActions.SocketConnected(event.data));
                        break;
                    case 'SOCKET_DISCONNECTED':
                        this.store.dispatch(new fromSocketActions.SocketDisconnected(event.data));
                        break;
                    case 'SOCKET_SUBSCRIBED':
                        this.store.dispatch(new fromSocketActions.SocketSubscribed(event.channelName));
                        break;
                    case 'SOCKET_UNSUBSCRIBED':
                        this.store.dispatch(new fromSocketActions.SocketUnsubscribed(event.channelName));
                        break;
                    case 'SOCKET_CHANNEL_DATA_ARRIVED':
                        this.store.dispatch(new fromSocketActions.SocketChannelDataArrived(event.data));
                        break;
                }
            }
        });
     }
}
