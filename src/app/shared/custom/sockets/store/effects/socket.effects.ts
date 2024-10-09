import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, EMPTY } from 'rxjs';
import { switchMap, map, catchError, mergeMap, withLatestFrom, tap } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import * as fromStore from './../reducers';
import * as fromActions from './../actions';
import * as fromServices from './../../services';

@Injectable()
export class SocketEffects {

    @Effect()
    socketConnected$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SocketsActionTypes.SOCKET_CONNECTED),
            switchMap(() => {
                this.socket.transmitEvent('SocketDashboardUpdate', 'socket_connected');
                return [];
            })
        );

     @Effect()
    socketDisconnected$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SocketsActionTypes.SOCKET_DISCONNECTED),
            switchMap(() => {
                this.socket.transmitEvent('SocketDashboardUpdate', 'socket_disconnected');
                return [];
            })
        );

    @Effect()
    subscriptionStarted$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SocketsActionTypes.SOCKET_SUBSCRIBED),
            map((action: fromActions.SocketSubscribed) => action.payload),
            switchMap((payload: any) => {
                return EMPTY;
            })
        );

    @Effect()
    subscriptionEnded$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SocketsActionTypes.SOCKET_UNSUBSCRIBED),
            map((action: fromActions.SocketUnsubscribed) => action.payload),
            switchMap((payload: any) => {
                return EMPTY;
            })
        );

    constructor(
        private actions$: Actions,
        private socket: fromServices.SocketService
    ) {
        // this.socket.authenticate();
     }
}
