import * as fromActions from '../actions';
import * as fromModels from '../../models';

import * as moment from 'moment';

export interface State {
    // UI State
    asOfDate: string;

    countries: fromModels.ICountry[];
    countriesLoading: boolean;
    countriesLoaded: boolean;
    countriesError?: string;

    columns: string[];

    // Server response
    countryIds: string[];
    countryData: {[id: string]: fromModels.CountryData };
    dataLoading: boolean;
    dataLoaded: boolean;
    dataError?: string;

    usHistory: any[];
    usHistoryLoading: boolean;
    usHistoryLoaded: boolean;
    usHistoryError?: string;

    usStates: string[];
    usStatesEntities: {[id: string]: any[]};

    usStatesHistoryLoading: boolean;
    usStatesHistoryLoaded: boolean;
    usStatesHistoryError?: string;
}

const initialState: State = {

    asOfDate: moment(new Date()).format('MM-DD-YYYY'),

    countries: [],
    countriesLoading: false,
    countriesLoaded: false,

    columns: [],

    // Server response
    countryIds: [],
    countryData: {},
    dataLoading: false,
    dataLoaded: false,

    usHistory: [],
    usHistoryLoading: false,
    usHistoryLoaded: false,

    usStates: [],
    usStatesEntities: {},
    usStatesHistoryLoading: false,
    usStatesHistoryLoaded: false,
};

export function reducer(state = initialState, action: fromActions.CovidActions): State {

    switch (action.type) {

        case fromActions.CovidActionTypes.LOAD_COUNTRIES: {
            return {
                ...state,
                countriesLoading: true,
                countriesLoaded: false,
                countriesError: null
            };
        }

        case fromActions.CovidActionTypes.LOAD_COUNTRIES_COMPLETE: {
            const payload = action.payload;
            return {
                ...state,
                countries: [...payload],
                countriesLoading: false,
                countriesLoaded: true
            };
        }

        case fromActions.CovidActionTypes.LOAD_COUNTRIES_FAILED: {
            return {
                ...state,
                countriesLoading: false,
                countriesLoaded: true,
                countriesError: action.payload
            };
        }

        case fromActions.CovidActionTypes.LOAD_DATA: {
            return {
                ...state,
                dataLoading: true,
                dataLoaded: false,
                dataError: null,
            };
        }

        case fromActions.CovidActionTypes.LOAD_DATA_COMPLETE: {

            const countryData = action.payload.data.reduce((oldState, record) => {
                return Object.assign(oldState, {[record.country]: record});
            }, {});
            return {
                ...state,
                dataLoading: false,
                dataLoaded: true,
                columns: action.payload.cols,
                countryData: countryData,
                dataError: null,
            };
        }

        case fromActions.CovidActionTypes.LOAD_DATA_FAILED: {
            return {
                ...state,
                dataLoading: true,
                dataLoaded: false,
                dataError: action.payload
            };
        }

        case fromActions.CovidActionTypes.LOAD_US_HISTORY: {
            return {
                ...state,
                usHistoryLoading: true,
                usHistoryLoaded: false,
                usHistoryError: null
            };
        }

        case fromActions.CovidActionTypes.LOAD_US_HISTORY_COMPLETE: {
            return {
                ...state,
                usHistoryLoading: false,
                usHistoryLoaded: true,
                usHistory: [...action.payload]
            };
        }

        case fromActions.CovidActionTypes.LOAD_US_HISTORY_FAILED: {
            return {
                ...state,
                usHistoryLoading: false,
                usHistoryLoaded: false,
                usHistoryError: action.payload
            };
        }

        case fromActions.CovidActionTypes.LOAD_US_STATES_HISTORY: {
            return {
                ...state,
                usStatesHistoryLoading: true,
                usStatesHistoryLoaded: false,
                usStatesHistoryError: null
            };
        }

        case fromActions.CovidActionTypes.LOAD_US_STATES_HISTORY_COMPLETE: {
            const payload = action.payload;
            const states = payload.map((record: any) => record.State);
            const distinctStates = states.filter((item, index) => states.indexOf(item) === index);

            const records = distinctStates.reduce((entities: {[id: string]: any[]}, item: string) => {
                const stateVals = payload.filter((record: any) => record.State === item);
                return Object.assign({}, entities, {[item]: stateVals});

            }, {});

            return {
                ...state,
                usStatesHistoryLoading: false,
                usStatesHistoryLoaded: true,
                usStates: [...distinctStates],
                usStatesEntities: records
            };
        }

        case fromActions.CovidActionTypes.LOAD_US_STATES_HISTORY_FAILED: {
            return {
                ...state,
                usStatesHistoryLoading: false,
                usStatesHistoryLoaded: false,
                usStatesHistoryError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getAsOfDate = (state: State) => state.asOfDate;
export const getColumns = (state: State) => state.columns;

export const getCountries = (state: State) => state.countries;
export const getCountriesLoading = (state: State) => state.countriesLoading;
export const getCountriesLoaded = (state: State) => state.countriesLoaded;
export const getCountriesError = (state: State) => state.countriesError;

export const getCountryIds = (state: State) => state.countryIds;
export const getCountryData = (state: State) => state.countryData;
export const getCountryDataLoading = (state: State) => state.dataLoading;
export const getCountryDataLoaded = (state: State) => state.dataLoaded;
export const getCountryDataError = (state: State) => state.dataError;

/** US **/
export const getUSHistory = (state: State) => state.usHistory;
export const getUSHistoryLoading = (state: State) => state.usHistoryLoading;
export const getUSHistoryLoaded = (state: State) => state.usHistoryLoaded;
export const getUSHistoryError = (state: State) => state.usHistoryError;

export const getUSStates = (state: State) => state.usStates;
export const getUSstatesEntities = (state: State) => state.usStatesEntities;
export const getUSStatesHistoryLoading = (state: State) => state.usStatesHistoryLoading;
export const getUSStatesHistoryLoaded = (state: State) => state.usStatesHistoryLoaded;
export const getUSStatesHistoryError = (state: State) => state.usStatesHistoryError;
