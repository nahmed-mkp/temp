import * as fromRouterStore from '@ngrx/router-store';
import * as fromLogin from './login.reducer';
import * as fromSockets from '../../shared/custom/sockets/store/reducers/socket.reducer';
import * as fromError from './error.reducer';
import * as fromRouterModels from './../../models/router.models';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface RootState {
    auth: fromLogin.State;
    router: fromRouterStore.RouterReducerState<fromRouterModels.RouterStateUrl>;
    error: fromError.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers = {
    auth: fromLogin.reducer,
    router: fromRouterStore.routerReducer,
    error: fromError.reducer,
};

export const getAuthState = (state: RootState) => state.auth;
export const getErrorState = (state: RootState) => state.error;
export const getRouteState = (state: RootState) => state.router;
