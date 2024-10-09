import { Action } from '@ngrx/store';
import * as fromModels from './../../models/sockets.models';

export enum SocketsActionTypes {

    SOCKET_CREATED = '[Sockets] Socket created',

    SOCKET_CONNECTED = '[Sockets] Socket connnected',
    SOCKET_DISCONNECTED = '[Sockets] Socket disconnnected',

    AUTHENTICATE_SOCKET = '[Sockets] Socket authenticaticated',
    DEAUTHENTICATE_SOCKET = '[Sockets] Socket deauthenticated',

    SOCKET_SUBSCRIBED = '[Sockets] Subscribed to channel',
    SOCKET_UNSUBSCRIBED = '[Sockets] Unsubscribed from channel',

    SOCKET_CHANNEL_DATA_ARRIVED = '[Sockets] Channel data arrived',
    SOCKET_TRANSMITTED_DATA = '[Sockets] Socket transmitted data',

    SOCKET_CLOSED = '[Sockets] - Socket closed',
    SOCKET_ERROR = '[Sockets] Socket error',

}

export class SocketCreated implements Action {
    readonly type = SocketsActionTypes.SOCKET_CREATED;
    constructor() { }
}

export class SocketConnected implements Action {
    readonly type = SocketsActionTypes.SOCKET_CONNECTED;
    constructor(public payload: any) { }
}

export class SocketDisconnected implements Action {
    readonly type = SocketsActionTypes.SOCKET_DISCONNECTED;
    constructor(public payload: any) { }
}

export class SocketAuthenticated implements Action {
    readonly type = SocketsActionTypes.AUTHENTICATE_SOCKET;
    constructor(public payload: any) { }
}

export class SocketDeauthenticated implements Action {
    readonly type = SocketsActionTypes.DEAUTHENTICATE_SOCKET;
    constructor(public payload: any) { }
}

export class SocketSubscribed implements Action {
    readonly type = SocketsActionTypes.SOCKET_SUBSCRIBED;
    constructor(public payload: any) { }
}

export class SocketUnsubscribed implements Action {
    readonly type = SocketsActionTypes.SOCKET_UNSUBSCRIBED;
    constructor(public payload: any) { }
}

export class SocketChannelDataArrived implements Action {
    readonly type = SocketsActionTypes.SOCKET_CHANNEL_DATA_ARRIVED;
    constructor(public payload: any) { }
}

export class SocketTransmittedData implements Action {
    readonly type = SocketsActionTypes.SOCKET_TRANSMITTED_DATA;
    constructor(public payload: any) { }
}

export class SocketError implements Action {
    readonly type = SocketsActionTypes.SOCKET_ERROR;
    constructor(public payload: any) { }
}

export type SocketActions
    = SocketCreated
    | SocketConnected
    | SocketDisconnected
    | SocketAuthenticated
    | SocketDeauthenticated
    | SocketSubscribed
    | SocketUnsubscribed
    | SocketChannelDataArrived
    | SocketTransmittedData
    | SocketError
;
