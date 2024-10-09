import * as fromActions from '../actions';
import * as fromModels from '../../models';

export interface State {

    status: any;
    statusLoading: boolean;
    statusLoaded: boolean;
    statusError?: string;

    runHistory: any[];
    runHistoryLoading: boolean;
    runHistoryLoaded: boolean;
    runHistoryError?: string;

    socketProcessMonitorData: any;
}

const initialState: State = {

    status: {},
    statusLoading: false,
    statusLoaded: false,

    runHistory: [],
    runHistoryLoading: false,
    runHistoryLoaded: false,

    socketProcessMonitorData: []
};

export function reducer(state = initialState, action: fromActions.HealthStatusActions): State {

    switch (action.type) {

        case fromActions.HealthStatusActionTypes.LOAD_HEALTH_STATUS: {
            return {
                ...state,
                statusLoading: false,
                statusLoaded: false,
                statusError: null
            };
        }

        case fromActions.HealthStatusActionTypes.RESTART_APP: {
            return {
                ...state,
                statusLoading: false, 
                statusLoaded: false, 
                statusError: null
            };
        }

        case fromActions.HealthStatusActionTypes.KILL_MONITORED_PROCESS: {
            return {
                ...state,
                statusLoading: false,
                statusLoaded: false,
                statusError: null
            };
        }

        case fromActions.HealthStatusActionTypes.LOAD_HEALTH_STATUS_COMPLETE: 
        case fromActions.HealthStatusActionTypes.KILL_MONITORED_PROCESS_COMPLETE:
        case fromActions.HealthStatusActionTypes.RESTART_APP_COMPLETE: 
        case fromActions.HealthStatusActionTypes.LOGIN_AND_RESTART_BLOOMBERG_COMPLETE: 
        case fromActions.HealthStatusActionTypes.LOGIN_AND_RESTART_TRADEWEB_COMPLETE:
        case fromActions.HealthStatusActionTypes.RESTART_ALL_CALC_SERVERS_COMPLETE: {

            return {
                ...state,
                status: action.payload,
                statusLoading: false,
                statusLoaded: true,
            };
        }

        case fromActions.HealthStatusActionTypes.LOAD_HEALTH_STATUS_FAILED:
        case fromActions.HealthStatusActionTypes.KILL_MONITORED_PROCESS_FAILED:
        case fromActions.HealthStatusActionTypes.RESTART_APP_FAILED:
        case fromActions.HealthStatusActionTypes.LOGIN_AND_RESTART_BLOOMBERG_FAILED:
        case fromActions.HealthStatusActionTypes.LOGIN_AND_RESTART_TRADEWEB_FAILED:
        case fromActions.HealthStatusActionTypes.RESTART_ALL_CALC_SERVERS_FAILED:  {

            return {
                ...state,
                statusLoading: false,
                statusLoaded: false,
                statusError: action.payload
            };
        }

        case fromActions.HealthStatusActionTypes.VIEW_RUN_HISTORY: {
            return {
                ...state,
                runHistoryLoading: true,
                runHistoryLoaded: false,
                runHistoryError: null
            };
        }

        case fromActions.HealthStatusActionTypes.VIEW_RUN_HISTORY_COMPLETE: {
            return {
                ...state,
                runHistory: [...action.payload],
                runHistoryLoading: false,
                runHistoryLoaded: true
            };
        }

        case fromActions.HealthStatusActionTypes.VIEW_RUN_HISTORY_FAILED: {
            return {
                ...state,
                runHistoryLoading: false,
                runHistoryLoaded: true, 
                runHistoryError: action.payload
            };
        }

        case fromActions.HealthStatusActionTypes.LOAD_PROCESS_MONITOR_NAMES_COMPLETE: {
            const output = action.payload.map(item => ({ name: item.TopicName }));
            return {
                ...state,
                socketProcessMonitorData: output
            };
        }

        case fromActions.HealthStatusActionTypes.UPDATE_PROCESS_MONITOR_DATA_COMPLETE: {
            const temp = state.socketProcessMonitorData.map((item) => {
                if (action.payload !== null && item.name === action.payload.name) {
                    return Object.assign({}, item, {'machine': action.payload.machine, 'status': action.payload.status, 'time': action.payload.time});
                }
                return item;
            });

            return {
                ...state,
                socketProcessMonitorData: [...temp]
            };
        }


        default: {
            return state;
        }
    }
}


export const getHealthStatus = (state: State) => state.status;
export const getHealthStatusLoading = (state: State) => state.statusLoading;
export const getHealthStatusLoaded = (state: State) => state.statusLoaded;
export const getHealthStatusError = (state: State) => state.statusError;


export const getRunHistory = (state: State) => state.runHistory;
export const getRunHistoryLoading = (state: State) => state.runHistoryLoading;
export const getRunHistoryLoaded = (state: State) => state.runHistoryLoaded;
export const getRunHistoryError = (state: State) => state.runHistoryError;

export const getSocketProcessMonitorData = (state: State) => state.socketProcessMonitorData;
