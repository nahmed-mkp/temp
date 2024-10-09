import { createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromSocket from '../reducers/socket.reducer';

export const getSocketState = createSelector(
    fromFeature.getSocketFeatureState,
    (state: fromFeature.SocketState) => state.sockets
);

export const getSocketConnections = createSelector(
    getSocketState,
    fromSocket.getSocketConnections
);

export const getSocketAuthentication = createSelector(
    getSocketState,
    fromSocket.getSocketAuthentication
);

export const getSocketSubscriptions = createSelector(
    getSocketState,
    fromSocket.getSocketSubscriptions
);

export const getSocketChannelData = createSelector(
    getSocketState,
    fromSocket.getSocketChannelData
);

export const getSocketTransmittedData = createSelector(
    getSocketState,
    fromSocket.getSocketTransmittedData
);

export const getSocketError = createSelector(
    getSocketState,
    fromSocket.getSocketError
);
