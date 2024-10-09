import * as fromActions from '../actions/leverage.actions';
import * as moment from 'moment';

export interface State {

    activeDate: string;
    selectedGrouping: string;
    isLive: boolean;

    supportedDates: string[];
    supportedDatesLoading: boolean;
    supportedDatesLoaded: boolean;
    supportedDatesError?: string;

    supportedGroupings: string[];
    supportedGroupingsLoading: boolean;
    supportedGroupingsLoaded: boolean;
    supportedGroupingsError?: string;

    leverage: any;
    leverageLoading: boolean;
    leverageLoaded: boolean;
    leverageError?: string;
}

const initialState: State = {

    activeDate: moment(new Date()).format('MM/DD/YYYY'),
    selectedGrouping: null,
    isLive: true,

    supportedDates: [],
    supportedDatesLoading: false,
    supportedDatesLoaded: false,

    supportedGroupings: [],
    supportedGroupingsLoading: false,
    supportedGroupingsLoaded: false,

    leverage: null,
    leverageLoading: false,
    leverageLoaded: false
};

export function reducer(state = initialState, action: fromActions.LeverageActions): State {

    switch (action.type) {

        case fromActions.LeverageActionTypes.SET_ACTIVE_DATE: {
            return {
                ...state,
                activeDate: moment(action.payload).format('MM/DD/YYYY')
            };
        }




        case fromActions.LeverageActionTypes.LOAD_LEVERAGE_DATE: {
            return {
                ...state,
                supportedDatesLoading: true,
                supportedDatesLoaded: false,
                supportedDatesError: null,
            };
        }

        case fromActions.LeverageActionTypes.LOAD_LEVERAGE_DATE_COMPLETE: {

            const dateTimeCollection = action.payload;

            dateTimeCollection.sort((valueA, valueB) => {
                return (new Date(valueB)).getTime() - (new Date(valueA)).getTime();
            });

            const activeDate = dateTimeCollection[0];

            return {
                ...state,
                activeDate: activeDate,
                supportedDates: action.payload,
                supportedDatesLoading: false,
                supportedDatesLoaded: true,
                supportedDatesError: null,
            };
        }

        case fromActions.LeverageActionTypes.LOAD_LEVERAGE_DATE_FAILED: {
            return {
                ...state,
                supportedDatesLoading: false,
                supportedDatesLoaded: false,
                supportedDatesError: action.payload,
            };
        }




        case fromActions.LeverageActionTypes.LOAD_SUPPORTED_GROUPINGS: {
            return {
                ...state,
                supportedGroupingsLoading: true,
                supportedGroupingsLoaded: false,
                supportedGroupingsError: null,
            };
        }

        case fromActions.LeverageActionTypes.LOAD_SUPPORTED_GROUPINGS_COMPLETE: {
            return {
                ...state,
                supportedGroupings: [...action.payload],
                supportedGroupingsLoading: false,
                supportedGroupingsLoaded: true,
                supportedGroupingsError: null,
            };
        }

        case fromActions.LeverageActionTypes.LOAD_SUPPORTED_GROUPINGS_FAILED: {
            return {
                ...state,
                supportedGroupingsLoading: false,
                supportedGroupingsLoaded: false,
                supportedGroupingsError: action.payload
            };
        }








        case fromActions.LeverageActionTypes.LOAD_LEVERAGE: {
            return {
                ...state,
                activeDate: moment(action.payload.asOfDate).format('MM/DD/YYYY'),
                selectedGrouping: action.payload.grouping,
                isLive: action.payload.isLive,
                leverageLoading: true,
                leverageLoaded: false,
                leverageError: null,
            };
        }

        case fromActions.LeverageActionTypes.LOAD_LEVERAGE_COMPLETE: {
            return {
                ...state,
                leverage: {...action.payload},
                leverageLoading: false,
                leverageLoaded: true,
                leverageError: null,
            };
        }

        case fromActions.LeverageActionTypes.LOAD_LEVERAGE_FAILED: {
            return {
                ...state,
                leverageLoading: false,
                leverageLoaded: false,
                leverageError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getActiveDate = (state: State) => state.activeDate;
export const getSelectedGrouping = (state: State) => state.selectedGrouping;
export const getIsLive = (state: State) => state.isLive;

export const getLeverageDates = (state: State) => state.supportedDates;
export const getLeverageDatesLoading = (state: State) => state.supportedDatesLoading;
export const getLeverageDatesLoaded = (state: State) => state.supportedDatesLoaded;
export const getLeverageDatesError = (state: State) => state.supportedDatesError;

export const getSupportedGroupings = (state: State) => state.supportedGroupings;
export const getSupportedGroupingsLoading = (state: State) => state.supportedGroupingsLoading;
export const getSupportedGroupingsLoaded = (state: State) => state.supportedGroupingsLoaded;
export const getSupportedGroupingsError = (state: State) => state.supportedGroupingsError;

export const getLeverage = (state: State) => state.leverage;
export const getLeverageLoading = (state: State) => state.leverageLoading;
export const getLeverageLoaded = (state: State) => state.leverageLoaded;
export const getLeverageError = (state: State) => state.leverageError;

