import * as fromActions from '../actions';
import { isNumber } from 'util';

export interface ExposureLadderState {

    activeAsOfDate: string;
    timeStamp: string;

    exposureAsOfDates: {
        dates: string[];
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    exposureLadders: {
        data: [];
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

}

const initialState: ExposureLadderState = {

    activeAsOfDate: null,
    timeStamp: null,

    exposureAsOfDates: {
        dates: [],
        loading: false,
        loaded: false
    },

    exposureLadders: {
        data: [],
        loading: false,
        loaded: false
    },

};


export function reducer(state = initialState, action: fromActions.ExposureLadderActions): ExposureLadderState {

    switch (action.type) {

        case fromActions.ExposureLadderActionTypes.LOAD_EXPOSURE_AS_OF_DATES: {
            return {
                ...state,
                exposureAsOfDates: {
                    ...state.exposureAsOfDates,
                    loading: true,
                    loaded: false,
                }
            };
        }

        case fromActions.ExposureLadderActionTypes.LOAD_EXPOSURE_AS_OF_DATES_COMPLETE: {
            return {
                ...state,
                exposureAsOfDates: {
                    dates: action.payload,
                    loading: false,
                    loaded: true,
                    error: null
                }
            };
        }

        case fromActions.ExposureLadderActionTypes.LOAD_EXPOSURE_AS_OF_DATES_FAILED: {
            return {
                ...state,
                exposureAsOfDates: {
                    ...state.exposureAsOfDates,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }

        // ----------------------------------------------------------------------------------

        case fromActions.ExposureLadderActionTypes.LOAD_EXPOSURE_LADDER: {
            return {
                ...state,
                exposureLadders: {
                    ...state.exposureLadders,
                    loading: true,
                    loaded: false,
                }
            };
        }

        case fromActions.ExposureLadderActionTypes.LOAD_EXPOSURE_LADDER_COMPLETE: {
            return {
                ...state,
                exposureLadders: {
                    data: action.payload.data,
                    loading: false,
                    loaded: true,
                    error: null
                }
            };
        }

        case fromActions.ExposureLadderActionTypes.LOAD_EXPOSURE_LADDER_FAILED: {
            return {
                ...state,
                exposureLadders: {
                    ...state.exposureLadders,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }


        default: {
            return state;
        }
    }
}


export const getExposureAsOfDates = (state: ExposureLadderState) => state.exposureAsOfDates.dates;
export const getExposureAsOfDatesLoading = (state: ExposureLadderState) => state.exposureAsOfDates.loading;
export const getExposureAsOfDatesLoaded = (state: ExposureLadderState) => state.exposureAsOfDates.loaded;
export const getExposureAsOfDatesError = (state: ExposureLadderState) => state.exposureAsOfDates.error;

export const getExposureLadder = (state: ExposureLadderState) => state.exposureLadders;
export const getExposureLadderData = (state: ExposureLadderState) => state.exposureLadders.data;
export const getExposureLadderLoading = (state: ExposureLadderState) => state.exposureLadders.loading;
export const getExposureLadderLoaded = (state: ExposureLadderState) => state.exposureLadders.loaded;
export const getExposureLadderError = (state: ExposureLadderState) => state.exposureLadders.error;

export const getActiveAsOfDate = (state: ExposureLadderState) => state.activeAsOfDate;