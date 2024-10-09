import * as fromActions from '../actions/inflation-swaps.action';

export interface State {
    inflationSwaps: any;
    inflationSwapsLoading: boolean;
    inflationSwapsLoaded: boolean;
    inflationSwapsError?: string;
    inflationSwapsDataPoints: any;
    inflationSwapsDataPointsLoading: boolean;
    inflationSwapsDataPointsLoaded: boolean;
    inflationSwapsDataPointsError?: string;
}

const initialState: State = {
    inflationSwaps: {},
    inflationSwapsLoading: false,
    inflationSwapsLoaded: false,
    inflationSwapsDataPoints: {},
    inflationSwapsDataPointsLoading: false,
    inflationSwapsDataPointsLoaded: false
};

export function reducer(state = initialState, action: fromActions.InflationSwapsActions): State {

    switch (action.type) {

        case fromActions.InflationSwapsActionTypes.LOAD_INFLATION_SWAPS: {
            return {
                ...state,
                inflationSwapsLoading: true,
                inflationSwapsLoaded: false,
                inflationSwapsError: null
            };
        }

        case fromActions.InflationSwapsActionTypes.LOAD_INFLATION_SWAPS_COMPLETE: {
            return {
                ...state,
                inflationSwaps: action.payload,
                inflationSwapsLoading: false,
                inflationSwapsLoaded: true,
                inflationSwapsError: null
            };
        }

        case fromActions.InflationSwapsActionTypes.LOAD_INFLATION_SWAPS_FAILED: {
            return {
                ...state,
                inflationSwapsLoading: false,
                inflationSwapsLoaded: false,
                inflationSwapsError: action.payload
            };
        }

        case fromActions.InflationSwapsActionTypes.LOAD_INFLATION_SWAPS_DATA_POINTS: {
            return {
                ...state,
                inflationSwapsDataPointsLoading: true,
                inflationSwapsDataPointsLoaded: false,
                inflationSwapsDataPointsError: null
            };
        }

        case fromActions.InflationSwapsActionTypes.LOAD_INFLATION_SWAPS_DATA_POINTS_COMPLETE: {
            return {
                ...state,
                inflationSwapsDataPoints: action.payload,
                inflationSwapsDataPointsLoading: false,
                inflationSwapsDataPointsLoaded: true,
                inflationSwapsDataPointsError: null
            };
        }

        case fromActions.InflationSwapsActionTypes.LOAD_INFLATION_SWAPS_DATA_POINTS_FAILED: {
            return {
                ...state,
                inflationSwapsDataPointsLoading: false,
                inflationSwapsDataPointsLoaded: false,
                inflationSwapsDataPointsError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getInflationSwaps = (state: State) => state.inflationSwaps;
export const getInflationSwapsLoadingStatus = (state: State) => state.inflationSwapsLoading;
export const getInflationSwapsLoadedStatus = (state: State) => state.inflationSwapsLoaded;
export const getInflationSwapsError = (state: State) => state.inflationSwapsError;
export const getInflationSwapsDataPoints = (state: State) => state.inflationSwapsDataPoints;
export const getInflationSwapsDataPointsLoadingStatus = (state: State) => state.inflationSwapsDataPointsLoading;
export const getInflationSwapsDataPointsLoadedStatus = (state: State) => state.inflationSwapsDataPointsLoaded;
export const getInflationSwapsDataPointsError = (state: State) => state.inflationSwapsDataPointsError;
