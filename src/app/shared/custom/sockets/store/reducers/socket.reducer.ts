import * as fromActions from './../actions';

export interface State {
    sockets: any;
    socketConnections: any;
    socketAuthentication: any;
    socketSubscriptions: any;
    socketChannelData: any;
    socketTransmittedData: any;
    socketError: null | string;
}

const initialState: State = {
    sockets: null,
    socketConnections: [],
    socketAuthentication: [],
    socketSubscriptions: [],
    socketChannelData: [],
    socketTransmittedData: [],
    socketError: null
};

export function reducer(state = initialState, action: fromActions.SocketActions ): State {

    switch (action.type) {

        case fromActions.SocketsActionTypes.SOCKET_CREATED: {
            return {
                ...state,
            };
        }

        case fromActions.SocketsActionTypes.SOCKET_CONNECTED: {
            return {
                ...state,
                socketConnections: action.payload
            };
        }

        case fromActions.SocketsActionTypes.SOCKET_DISCONNECTED: {
            return {
                ...state,
                socketConnections: []
            };
        }

        case fromActions.SocketsActionTypes.AUTHENTICATE_SOCKET: {
            return {
                ...state,
                socketAuthentication: action.payload
            };
        }

        case fromActions.SocketsActionTypes.DEAUTHENTICATE_SOCKET: {
            return {
                ...state,
                socketAuthentication: []
            };
        }

        case fromActions.SocketsActionTypes.SOCKET_SUBSCRIBED: {
            return {
                ...state,
                socketSubscriptions: action.payload
            };
        }

        case fromActions.SocketsActionTypes.SOCKET_UNSUBSCRIBED: {
            return {
                ...state,
                socketSubscriptions: []
            };
        }

        case fromActions.SocketsActionTypes.SOCKET_CHANNEL_DATA_ARRIVED: {
            return {
                ...state,
                socketChannelData: action.payload
            };

        }

        case fromActions.SocketsActionTypes.SOCKET_TRANSMITTED_DATA: {
            return {
                ...state,
                socketTransmittedData: action.payload
            };
        }

        case fromActions.SocketsActionTypes.SOCKET_ERROR: {
            return {
                ...state,
                socketError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getSocket = (state: State) => state.sockets;
export const getSocketConnections = (state: State) => state.socketConnections;
export const getSocketAuthentication = (state: State) => state.socketAuthentication;
export const getSocketSubscriptions = (state: State) => state.socketSubscriptions;
export const getSocketChannelData = (state: State) => state.socketChannelData;
export const getSocketTransmittedData = (state: State) => state.socketTransmittedData;
export const getSocketError = (state: State) => state.socketError;
