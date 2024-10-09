import * as fromActions from '../actions/login.actions';
import * as fromModels from '../../models/login.models';

export interface State {
    isFreshLogin: boolean;
    authenticatedUser: fromModels.IAuthenticatedUser;
    error?: string;

    isUserLocked: boolean;

    unconfirmedTrades: any[];
    unconfirmedTradesLoading: boolean;
    unconfirmedTradesLoaded: boolean;
    unconfirmedTradesError?: string;
}

const initialState: State = {
    isFreshLogin: false,
    authenticatedUser: null,
    isUserLocked: false,

    unconfirmedTrades: [],
    unconfirmedTradesLoading: false,
    unconfirmedTradesLoaded: false
};

export function reducer(state = initialState, action: fromActions.LoginActions ): State {
    switch (action.type) {

        case fromActions.LoginActionTypes.LOGIN: {
            return {
                ...state,
                error: null
            };
        }

        case fromActions.LoginActionTypes.LOGIN_COMPLETE: {
            return {
                ...state,
                authenticatedUser: action.payload,
                isFreshLogin: true
            };
        }

        case fromActions.LoginActionTypes.LOAD_USER_FROM_LOCAL_STORAGE_COMPLETE:  {
            return {
                ...state,
                isFreshLogin: false,
                authenticatedUser: action.payload
            };
        }

        case fromActions.LoginActionTypes.LOGIN_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }

        case fromActions.LoginActionTypes.LOGOUT_COMPLETE: {
            return {
                ...state,
                authenticatedUser: null
            };
        }

        case fromActions.LoginActionTypes.UPDATE_USER_LOCKED_STATUS: {
            return {
                ...state,
                isUserLocked: action.payload['result']
            };
        }

        case fromActions.LoginActionTypes.LOAD_USER_UNCONFIRMED_TRANSACTIONS: {
            return {
                ...state,
                unconfirmedTradesLoading: true,
                unconfirmedTradesLoaded: false,
                unconfirmedTradesError: null
            };
        }

        case fromActions.LoginActionTypes.LOAD_USER_UNCONFIRMED_TRANSACTIONS_COMPLETE: {
            return {
                ...state,
                unconfirmedTrades: [...action.payload],
                unconfirmedTradesLoading: false,
                unconfirmedTradesLoaded: true
            };
        }

        case fromActions.LoginActionTypes.LOAD_USER_UNCONFIRMED_TRANSACTIONS_FAILED: {
            return {
                ...state,
                unconfirmedTrades: [],
                unconfirmedTradesLoading: false,
                unconfirmedTradesLoaded: false,
                unconfirmedTradesError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getAuthenticatedUser = (state: State) => state.authenticatedUser;
export const getAuthError = (state: State) => state.error;
export const isFreshLogin = (state: State) => state.isFreshLogin;
export const isUserLocked = (state: State) => state.isUserLocked;

export const getUnconfirmedTrades = (state: State) => state.unconfirmedTrades;
export const getUnconfirmedTradesLoading = (state: State) => state.unconfirmedTradesLoading;
export const getUnconfirmedTradesLoaded = (state: State) => state.unconfirmedTradesLoaded;
export const getUnconfirmedTradesError = (state: State) => state.unconfirmedTradesError;



