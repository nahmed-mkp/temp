import * as fromActions from '../actions';
import * as _ from 'lodash';

export interface State {
    parRateLoading: boolean;
    parRateLoaded: boolean;
    parRateError?: string;

    spreadEntity: {[date: string]: any};
    spreadGroups: {[date: string]: string[]};

    swapEntity: {[date: string]: any};
    swapGroups: {[date: string]: string[]};

    treasuryEntity: {[date: string]: any};
    treasuryGroups: {[date: string]: string[]};

    timestamp: any;
}

const initialState: State = {
    parRateLoading: false,
    parRateLoaded: false,

    spreadEntity: null,
    spreadGroups: null,

    swapEntity: null,
    swapGroups: null,

    treasuryEntity: null,
    treasuryGroups: null,

    timestamp: null,
};


export function reducer(state = initialState, action: fromActions.ParRateActions): State {

    switch (action.type) {

        case fromActions.ParRateActionTypes.LOAD_PAR_RATE: {
            return {
                ...state,
                parRateLoading: true,
                parRateLoaded: false,
                parRateError: null
            };
        }


        case fromActions.ParRateActionTypes.LOAD_PAR_RATE_COMPLETE: {

            const targetDate = action.payload.date;
            const result = action.payload.result;
            const timestamp = action.payload.result['timestamp'] || '';

            const spreadResult_new = action.payload.result['spread'];
            const spreadGroups_new = Object.keys(spreadResult_new);

            const swapResult_new = action.payload.result['swap'];
            const swapGroups_new = Object.keys(swapResult_new);

            const treasuryresult_new = action.payload.result['treasury'];
            const treasuryGroups_new = Object.keys(treasuryresult_new);

            return {
                ...state,
                parRateLoading: false,
                parRateLoaded: true,
                parRateError: null,

                spreadEntity: {
                    ...state.spreadEntity,
                    [targetDate]: spreadResult_new
                },
                spreadGroups: {
                    ...state.spreadGroups,
                    [targetDate]: spreadGroups_new
                },



                swapEntity: {
                    ...state.swapEntity,
                    [targetDate]: swapResult_new
                },
                swapGroups: {
                    ...state.swapGroups,
                    [targetDate]: swapGroups_new
                },



                treasuryEntity: {
                    ...state.treasuryEntity,
                    [targetDate]: treasuryresult_new
                },
                treasuryGroups: {
                    ...state.treasuryGroups,
                    [targetDate]: treasuryGroups_new
                },

                timestamp: {
                    ...state.timestamp,
                    [targetDate]: timestamp
                }
            };
        }

        case fromActions.ParRateActionTypes.LOAD_PAR_RATE_FAILED: {
            return {
                ...state,
                parRateLoading: false,
                parRateLoaded: false,
                parRateError: action.payload
            };
        }


        default: {
            return state;
        }
    }
}


export const getParRateLoadingStatus = (state: State) => state.parRateLoading;
export const getParRateLoadedStatus = (state: State) => state.parRateLoaded;
export const getParRateError = (state: State) => state.parRateError;

export const getSpreadEntity = (state: State) => state.spreadEntity;
export const getSpreadGroups = (state: State) => state.spreadGroups;

export const getSwapEntity = (state: State) => state.swapEntity;
export const getSwapGroups = (state: State) => state.swapGroups;

export const getTreasuryEntity = (state: State) => state.treasuryEntity;
export const getTreasuryGroups = (state: State) => state.treasuryGroups;

export const getParRateTimestamp = (state: State) => state.timestamp;
