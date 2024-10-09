import { createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../../../store';
import * as fromSockets from './socket.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface SocketState {
    sockets: fromSockets.State;
}

export interface State extends fromRoot.RootState {
    sockets: SocketState;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers = {
   sockets: fromSockets.reducer
};

export const getSocketFeatureState = createFeatureSelector<SocketState>('sockets');
