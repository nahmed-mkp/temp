import * as fromActions from '../actions';

export interface State {
    tbaDataLoading: boolean;
    tbaDataLoaded: boolean;
    tbaData: any[];
    tbaError?: string;
}

const initialState: State = {
    tbaDataLoading: false,
    tbaDataLoaded: false,
    tbaData: [],
    tbaError: null,
}


export function reducer(state = initialState, action: fromActions.BenchmarkMonitorActions): State {

    switch (action.type) {

        case fromActions.BenchmarkMonitorActionTypes.LOAD_TBA_DATA: {
            return {
                ...state,
                tbaDataLoading: true,
                tbaDataLoaded: false,
                tbaError: null
            };
        }

        case fromActions.BenchmarkMonitorActionTypes.LOAD_TBA_DATA_COMPLETE: {
            return {
                ...state,
                tbaDataLoading: false,
                tbaDataLoaded: true,
                tbaData: action.payload,
                tbaError: null
            };
        }
        case fromActions.BenchmarkMonitorActionTypes.LOAD_TBA_DATA_FAILED: {
            return {
                ...state,
                tbaDataLoading: false,
                tbaDataLoaded: false,
                tbaError: action.type
            };
        }


        default: {
            return state;
        }
    }
}

export const getTbaDataLoading = (state: State) => state.tbaDataLoading;
export const getTbaDataLoaded = (state: State) => state.tbaDataLoaded;
export const getTbaData = (state: State) => state.tbaData;
export const getTbaError = (state: State) => state.tbaError;