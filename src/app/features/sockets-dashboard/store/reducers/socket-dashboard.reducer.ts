import { createReducer, on } from '@ngrx/store';
import * as fromActions from './../actions/socket-dashboard.actions';

export interface State {
    data: any;
}

const initialState: State = {
    data: null
};

export function reducer(state = initialState, action: fromActions.SocketDashboardActions ): State {
    switch (action.type) {

        case fromActions.SocketDashboardActionTypes.UPDATE_SOCKET_DASHBOARD_DATA_COMPLETE: {
            return {
                ... state,
                data: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

// NEW REDUCER


const testInitialState = {
    data: null,
    testVal: 'demo test for new reducers'
}

export const featureReducer = createReducer(
    testInitialState,
    on(fromActions.updateSocketDashboardDataComplete, (state, {payload}) => ({...state, data: payload})),
)

export const getSocketDashboardData = (state: State) => state.data;
