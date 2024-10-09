import * as fromActions from '../actions/futures-basis.action';

export interface State {

    dateTimeStamp: string;
    futuresBasis: any;

    futuresBasisLoading: boolean;
    futuresBasisLoaded: boolean;
    futuresBasisError?: string;

    futuresContract: {[ticker: string]: any};
    futuresContractLoading: boolean;
    futuresContractLoaded: boolean;
    futuresContractError?: string;
}

const initialState: State = {
    dateTimeStamp: null,
    futuresBasis: {},
    futuresBasisLoading: false,
    futuresBasisLoaded: false,

    futuresContract: {},
    futuresContractLoading: false,
    futuresContractLoaded: false
};

export function reducer(state = initialState, action: fromActions.FuturesBasisActions): State {

    switch (action.type) {

        case fromActions.FuturesBasisActionTypes.LOAD_FUTURES_BASIS_MONITOR: {
            return {
                ...state,
                futuresBasisLoading: true,
                futuresBasisLoaded: false,
                futuresBasisError: null
            };
        }

        case fromActions.FuturesBasisActionTypes.LOAD_FUTURES_BASIS_MONITOR_COMPLETE: {
            const payload = action.payload;

            const dateTimeStamp = (new Date()).toLocaleDateString();
            return {
                ...state,
                dateTimeStamp: dateTimeStamp,
                futuresBasis: {...action.payload},
                futuresBasisLoading: false,
                futuresBasisLoaded: true,
                futuresBasisError: null
            };
        }

        case fromActions.FuturesBasisActionTypes.LOAD_FUTURES_BASIS_MONITOR_FAILED: {
            return {
                ...state,
                futuresBasisLoading: false,
                futuresBasisLoaded: false,
                futuresBasisError: action.payload
            };
        }

        case fromActions.FuturesBasisActionTypes.LOAD_FUTURES_BASIS_CONTRACT: {
            return {
                ...state,
                futuresContractLoading: true,
                futuresContractLoaded: false,
                futuresContractError: null
            };
        }

        case fromActions.FuturesBasisActionTypes.LOAD_FUTURES_BASIS_CONTRACT_COMPLETE: {
            const dateTimeStamp = (new Date()).toLocaleDateString();
            const ticker = action.payload['ticker'];
            const data = action.payload['data'];
            const entities = Object.assign({}, state.futuresContract, {[ticker]: data});
            return {
                ...state,
                dateTimeStamp: dateTimeStamp,
                futuresContract: {...entities},
                futuresContractLoading: false,
                futuresContractLoaded: true,
                futuresContractError: null
            };
        }

        case fromActions.FuturesBasisActionTypes.LOAD_FUTURES_BASIS_CONTRACT_FAILED: {
            return {
                ...state,
                futuresContractLoading: false,
                futuresContractLoaded: false,
                futuresContractError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getFuturesBasisMonitor = (state: State) => state.futuresBasis;
export const getFuturesBasisMonitorLoadingStatus = (state: State) => state.futuresBasisLoading;
export const getFuturesBasisMonitorLoadedStatus = (state: State) => state.futuresBasisLoaded;
export const getFuturesBasisMonitorError = (state: State) => state.futuresBasisError;

export const getFuturesBasisDateTimeStamp = (state: State) =>  state.dateTimeStamp;

export const getFuturesBasisContract = (state: State) => state.futuresContract;
export const getFuturesBasisContractLoadingStatus = (state: State) => state.futuresContractLoading;
export const getFuturesBasisContractLoadedStatus = (state: State) => state.futuresContractLoaded;
export const getFuturesBasisContractError = (state: State) => state.futuresContractError;
