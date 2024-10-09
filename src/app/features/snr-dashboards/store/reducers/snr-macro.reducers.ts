import * as fromActions from './../actions/snr-macro.actions';
import * as fromModels from './../../models/snr-dashboard.models';

import * as moment from 'moment';

export interface State {

    dates: string[];
    countries: fromModels.ICountry[];
    inputsLoading: boolean;
    inputsLoaded: boolean;
    inputsError?: string;

    selectedRun?: fromModels.IMacroRun;

    macroRunResults: any;
    macroRunResultsLoading: boolean;
    macroRunResultsLoaded: boolean;
    macroRunResultsError?: string;

    chartGroupByCountryEntity: {[country: string]: any[]};
    chartGroupByCountryLoadingEntity: {[country: string]: boolean};
    chartGroupByCountryLoadedEntity: {[country: string]: boolean};
    chartGroupByCountryErrorEntity: {[country: string]: string};

    chartDataByCountryAndChartGroupAndDateEntity: {[combineKey: string]: any};
    chartDataByCountryAndChartGroupAndDateLoadingEntity: {[combineKey: string]: boolean};
    chartDataByCountryAndChartGroupAndDateLoadedEntity: {[combineKey: string]: boolean};
    chartDataByCountryAndChartGroupAndDateErrorEntity: {[combineKey: string]: string};

    chartDataByCountryAndChartGroupAndDateMissingFilesEntity: {[combineKey: string]:  string[]};
}

const initialState: State = {

    dates: [],
    countries: [],
    inputsLoading: false,
    inputsLoaded: false,

    macroRunResults: [],
    macroRunResultsLoading: false,
    macroRunResultsLoaded: false,

    chartGroupByCountryEntity: {},
    chartGroupByCountryLoadingEntity: {},
    chartGroupByCountryLoadedEntity: {},
    chartGroupByCountryErrorEntity: {},

    chartDataByCountryAndChartGroupAndDateEntity: {},
    chartDataByCountryAndChartGroupAndDateLoadingEntity: {},
    chartDataByCountryAndChartGroupAndDateLoadedEntity: {},
    chartDataByCountryAndChartGroupAndDateErrorEntity: {},
    chartDataByCountryAndChartGroupAndDateMissingFilesEntity: {}
};

export function reducer(state = initialState, action: fromActions.SNRMacroActions): State {
    switch (action.type) {

        case fromActions.SNRMacroActionTypes.LOAD_DATES_AND_COUNTRIES: {
            return {
                ...state,
                inputsLoading: true,
                inputsLoaded: false,
                inputsError: null
            };
        }

        case fromActions.SNRMacroActionTypes.LOAD_DATES_AND_COUNTRIES_COMPLETE: {
            const dates = action.payload.dates;
            const countries = action.payload.countries;
            return {
                ...state,
                inputsLoading: false,
                inputsLoaded: true,
                dates: [...dates],
                countries: [...countries]
            };
        }

        case fromActions.SNRMacroActionTypes.LOAD_DATES_AND_COUNTRIES_FAILED: {
            return {
                ...state,
                inputsLoading: false,
                inputsLoaded: false,
                inputsError: action.payload
            };
        }

        case fromActions.SNRMacroActionTypes.SELECT_MACRO_RUN: {
            return {
                ...state,
                selectedRun: action.payload
                // macroRunResultsLoading: true,
                // macroRunResultsLoaded: false,
                // macroRunResultsError: null
            };
        }

        case fromActions.SNRMacroActionTypes.LOAD_MACRO_RUN_RESULTS: {
            return {
                ...state,
                macroRunResultsLoading: true,
                macroRunResultsLoaded: false,
                macroRunResultsError: null
            };
        }

        case fromActions.SNRMacroActionTypes.LOAD_MACRO_RUN_RESULTS_COMPLETE: {
            return {
                ...state,
                macroRunResultsLoading: false,
                macroRunResultsLoaded: true,
                macroRunResults: [...action.payload]
            };
        }

        case fromActions.SNRMacroActionTypes.LOAD_MACRO_RUN_RESULTS_FAILED: {
            return {
                ...state,
                macroRunResultsLoading: false,
                macroRunResultsLoaded: false,
                macroRunResultsError: action.payload
            };
        }



        // -----------------------------------------------------------------------

        case fromActions.SNRMacroActionTypes.GET_CHART_GROUPS_BY_COUNTRY: {
            return {
                ...state,
                chartGroupByCountryLoadingEntity: {...state.chartGroupByCountryLoadingEntity, [action.payload.code]: true},
                chartGroupByCountryLoadedEntity: { ...state.chartGroupByCountryLoadedEntity, [action.payload.code]: false},
                chartGroupByCountryErrorEntity: { ...state.chartGroupByCountryErrorEntity, [action.payload.code]: null}
            };
        }

        case fromActions.SNRMacroActionTypes.GET_CHART_GROUPS_BY_COUNTRY_COMPLETE: {
            return {
                ...state,
                chartGroupByCountryEntity: {...state.chartGroupByCountryEntity, [action.payload.country]: action.payload.chartGroups},
                chartGroupByCountryLoadingEntity: {...state.chartGroupByCountryLoadingEntity, [action.payload.country]: false},
                chartGroupByCountryLoadedEntity: {...state.chartGroupByCountryLoadedEntity, [action.payload.country]: true},
                chartGroupByCountryErrorEntity: {...state.chartGroupByCountryErrorEntity, [action.payload.country]: null},
            };
        }

        case fromActions.SNRMacroActionTypes.GET_CHART_GROUPS_BY_COUNTRY_FAILED: {
            return {
                ...state,
                chartGroupByCountryLoadingEntity: {...state.chartGroupByCountryLoadingEntity, [action.payload]: false},
                chartGroupByCountryLoadedEntity: {...state.chartGroupByCountryLoadedEntity, [action.payload]: false},
                chartGroupByCountryErrorEntity: {...state.chartGroupByCountryErrorEntity, [action.payload]: action.payload},
            };
        }


        //

        case fromActions.SNRMacroActionTypes.GET_CHARTS_BY_CHART_GROUPS_AND_COUNTRY_AND_DATE: {

            return {
                ...state,
                chartDataByCountryAndChartGroupAndDateLoadingEntity: {...state.chartDataByCountryAndChartGroupAndDateLoadingEntity, [action.payload.combineKey]: true},
                chartDataByCountryAndChartGroupAndDateLoadedEntity: {...state.chartDataByCountryAndChartGroupAndDateLoadedEntity, [action.payload.combineKey]: false},
                chartDataByCountryAndChartGroupAndDateErrorEntity: {...state.chartDataByCountryAndChartGroupAndDateErrorEntity, [action.payload.combineKey]: null},
                chartDataByCountryAndChartGroupAndDateMissingFilesEntity: { ...state.chartDataByCountryAndChartGroupAndDateMissingFilesEntity, [action.payload.combineKey]: []}
            };
        }

        case fromActions.SNRMacroActionTypes.GET_CHARTS_BY_CHART_GROUPS_AND_COUNTRY_AND_DATE_COMPLETE: {

            return {
                ...state,
                chartDataByCountryAndChartGroupAndDateEntity: {...state.chartDataByCountryAndChartGroupAndDateEntity, [action.payload.combineKey]: action.payload.data},
                chartDataByCountryAndChartGroupAndDateLoadingEntity: {...state.chartDataByCountryAndChartGroupAndDateLoadingEntity, [action.payload.combineKey]: false},
                chartDataByCountryAndChartGroupAndDateLoadedEntity: {...state.chartDataByCountryAndChartGroupAndDateLoadedEntity, [action.payload.combineKey]: true},
                chartDataByCountryAndChartGroupAndDateErrorEntity: { ...state.chartDataByCountryAndChartGroupAndDateErrorEntity, [action.payload.combineKey]: null },
                chartDataByCountryAndChartGroupAndDateMissingFilesEntity: { ...state.chartDataByCountryAndChartGroupAndDateMissingFilesEntity, [action.payload.combineKey]: action.payload.missingFiles }
            };
        }

        case fromActions.SNRMacroActionTypes.GET_CHARTS_BY_CHART_GROUPS_AND_COUNTRY_AND_DATE_FAILED: {

            return {
                ...state,
                chartDataByCountryAndChartGroupAndDateLoadingEntity: {...state.chartDataByCountryAndChartGroupAndDateLoadingEntity, [action.payload.combineKey]: false},
                chartDataByCountryAndChartGroupAndDateLoadedEntity: {...state.chartDataByCountryAndChartGroupAndDateLoadedEntity, [action.payload.combineKey]: false},
                chartDataByCountryAndChartGroupAndDateErrorEntity: {...state.chartDataByCountryAndChartGroupAndDateErrorEntity, [action.payload.combineKey]: action.payload.error}
            };
        }


        default: {
            return state;
        }
    }
}

export const getDates = (state: State) => state.dates;
export const getCountries = (state: State) => state.countries;
export const getInputsLoading = (state: State) => state.inputsLoading;
export const getInputsLoaded = (state: State) => state.inputsLoaded;
export const getInputsError = (state: State) => state.inputsError;

export const getSelectedMacroRun = (state: State) => state.selectedRun;

export const getMacroRunResults = (state: State) => state.macroRunResults;
export const getMacroRunResultsLoading = (state: State) => state.macroRunResultsLoading;
export const getMacroRunResultsLoaded = (state: State) => state.macroRunResultsLoaded;
export const getMacroRunResultsError = (state: State) => state.macroRunResultsError;

export const getChartGroupByCountryEntity = (state: State) => state.chartGroupByCountryEntity;
export const getChartGroupByCountryLoadingEntity = (state: State) => state.chartGroupByCountryLoadingEntity;
export const getChartGroupByCountryLoadedEntity = (state: State) => state.chartGroupByCountryLoadedEntity;
export const getChartGroupByCountryErrorEntity = (state: State) => state.chartGroupByCountryErrorEntity;

export const getChartDataByCountryAndChartGroupAndDateEntity = (state: State) => state.chartDataByCountryAndChartGroupAndDateEntity;
export const getChartDataByCountryAndChartGroupAndDateLoadingEntity = (state: State) => state.chartDataByCountryAndChartGroupAndDateLoadingEntity;
export const getChartDataByCountryAndChartGroupAndDateLoadedEntity = (state: State) => state.chartDataByCountryAndChartGroupAndDateLoadedEntity;
export const getChartDataByCountryAndChartGroupAndDateErrorEntity = (state: State) => state.chartDataByCountryAndChartGroupAndDateErrorEntity;
export const getChartDataByCountryAndChartGroupAndDateMissingFilesEntity = (state: State) => state.chartDataByCountryAndChartGroupAndDateMissingFilesEntity;
