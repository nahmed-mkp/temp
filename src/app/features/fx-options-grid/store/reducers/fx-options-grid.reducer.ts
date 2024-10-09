import * as fromActions from '../actions';
import * as fromModels from '../../models';

export interface State {

    selectedDate?: string;
    currencies: string[];
    snapTimes: {[ccyPair: string]: string};

    grids: {[ccyPair: string]: any };
    gridsLoading: boolean;
    gridsLoaded: boolean;
    gridsError?: string;
}

const initialState: State = {

    currencies: [],
    snapTimes: {},
    grids: {},
    gridsLoading: false,
    gridsLoaded: false
};

export function reducer(state = initialState, action: fromActions.FXOptionsGridActions): State {

    switch (action.type) {

        case fromActions.FXOptionsgridActionTypes.LOAD_LATEST:
        case fromActions.FXOptionsgridActionTypes.LOAD_AS_OF_DATE: {
            return {
                ...state,
                gridsLoading: false,
                gridsLoaded: false,
                gridsError: null
            };
        }

        case fromActions.FXOptionsgridActionTypes.LOAD_LATEST_COMPLETE:
        case fromActions.FXOptionsgridActionTypes.LOAD_AS_OF_DATE_COMPLETE: {
            const snapTimes = {};
            const currencies = action.payload['ccyPairs'];
            const snapTimesByCurrencies = currencies.map((currency) => {
                const snaptime = action.payload[currency]['snaptime'];
                snapTimes[currency] = snaptime;
            });
            return {
                ...state,
                currencies: [...currencies],
                snapTimes: {...snapTimes },
                grids: { ...action.payload },
                gridsLoading: false,
                gridsLoaded: true,
                gridsError: null
            };
        }

        case fromActions.FXOptionsgridActionTypes.LOAD_LATEST_FAILED:
        case fromActions.FXOptionsgridActionTypes.LOAD_AS_OF_DATE_FAILED: {
            return {
                ...state,
                gridsLoading: false,
                gridsLoaded: false,
                gridsError: null
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedDate = (state: State) => state.selectedDate;

export const getGrids = (state: State) => state.grids;
export const getCurrencies = (state: State) => state.currencies;
export const getSnapTimes = (state: State) => state.snapTimes;
export const getGridsLoading = (state: State) => state.gridsLoading;
export const getGridsLoaded = (state: State) => state.gridsLoaded;
export const getGridsError = (state: State) => state.gridsError;
