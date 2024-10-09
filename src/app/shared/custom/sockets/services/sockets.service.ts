import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AGClientSocket, create } from 'socketcluster-client';
import { Store } from '@ngrx/store';

import * as fromAuth from './../../../../services/auth.service';
import * as fromEnvironments from './../../../../environments/environments';
import * as fromModels from '../models/sockets.models';
import * as fromSelector from '../store/selectors';
import * as fromStore from '../store';


@Injectable()
export class SocketService {

    socket: AGClientSocket;
    socket_datastream: any = [];

    private hostname: string;
    private port: number;

    public socketEvents: BehaviorSubject<fromModels.SocketEventMsg> = new BehaviorSubject<fromModels.SocketEventMsg>(null);

    constructor(private store: Store<fromStore.SocketState>, private authService: fromAuth.AuthService, public client: HttpClient) {
        this.hostname = fromEnvironments.environment.socketBrokerUrl;
        this.port = fromEnvironments.environment.socketBrokerPort;
    }

    public authenticate(): any {
        return this.client
        .post<any>(`http://prizm-map.mkpcap.com/api/v1/auth/verifytoken`, {user: this.authService.getUser(), accessToken: JSON.parse(localStorage.getItem('currentUser')).accessToken})
        .pipe(catchError((err: HttpErrorResponse) => {
            return throwError((err.error.message));
        }));
    }

    public getSocket(): AGClientSocket {
        if (!this.socket) {
            this.socket = create({hostname: this.hostname, port: this.port});
            (async () => {
                for await (const data of this.socket.listener('connect')) {
                    this.socketEvents.next({event: 'SOCKET_CONNECTED', 'data': data});
                }
            })();
            (async () => {
                for await (const data of this.socket.listener('disconnect')) {
                    this.socketEvents.next({event: 'SOCKET_DISCONNECTED', 'data': data});
                }
            })();
        }
        return this.socket;
    }

    public async socketUserAuth() {
        try {
            await Promise.resolve(this.getSocket().invoke('userTokenAuthGen', {username: this.authService.getName(), token: JSON.parse(localStorage.getItem('currentUser')).accessToken }));
        } catch (err) {
            console.log(err);
            return;
        }
    }

    public getSubscriptionToken(): any {
        return JSON.parse(localStorage.getItem('currentUser')).accessToken;
    }

    public subscribeToChannel(channel: string) {
        const subscribedChannel = this.getSocket().subscribe(channel);
        this.socketEvents.next({event: 'SOCKET_SUBSCRIBED', channelName: channel});
        (async () => {
            for await (const data of subscribedChannel) {
                if(this.getSubscriptions().length > 0) {
                    this.socketEvents.next({
                        event: 'SOCKET_CHANNEL_DATA_ARRIVED',
                        data: {channel: channel, data: data.data, timestamp: data.timestamp}
                    });
                }
            }
        })();
    }

    public viewSocketChannelData(): Observable<any> {
        return this.store.select(fromSelector.getSocketChannelData);
    }

    public transmitEvent(channel: string, data: any): void {
        this.getSocket().transmit(channel, data);
    }

    public getSubscriptions(): any {
        return this.getSocket().subscriptions();
    }

    public unsubscribe(channel: string) {
        this.getSocket().unsubscribe(channel);
        this.socketEvents.next({event: 'SOCKET_UNSUBSCRIBED', channelName: channel});
    }
}


