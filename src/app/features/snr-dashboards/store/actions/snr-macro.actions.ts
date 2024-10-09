import { Action } from '@ngrx/store';

import * as fromModels from './../../models/snr-dashboard.models';

export enum SNRMacroActionTypes {

    LOAD_DATES_AND_COUNTRIES = '[SNRMacroActions] Load dates and countries',
    LOAD_DATES_AND_COUNTRIES_COMPLETE = '[SNRMacroActions] Load dates and countries completed',
    LOAD_DATES_AND_COUNTRIES_FAILED = '[SNRMacroActions] Load dates and countries failed',

    SELECT_MACRO_RUN = '[SNRMacroActions] Select Macro run',

    LOAD_MACRO_RUN_RESULTS = '[SNRMacroActions] Load Macro Runs',
    LOAD_MACRO_RUN_RESULTS_COMPLETE = '[SNRMacroActions] Load Macro Runs completed',
    LOAD_MACRO_RUN_RESULTS_FAILED = '[SNRMacroActions] Load Macro Runs failed',

    GET_CHART_GROUPS_BY_COUNTRY = '[SNRMacroActions] Get Chart Groups by Country',
    GET_CHART_GROUPS_BY_COUNTRY_COMPLETE = '[SNRMacroActions] Get Chart Groups by Country Complete',
    GET_CHART_GROUPS_BY_COUNTRY_FAILED = '[SNRMacroActions] Get Chart Groups by Country Failed',


    PREPARE_CHARTS_BY_CHART_GROUPS_AND_COUNTRY = '[SNRMacroActions] Prepare Charts by Chart Groups and Country and date',

    GET_CHARTS_BY_CHART_GROUPS_AND_COUNTRY_AND_DATE = '[SNRMacroActions] Get Charts by Chart Groups and Country and date',
    GET_CHARTS_BY_CHART_GROUPS_AND_COUNTRY_AND_DATE_COMPLETE = '[SNRMacroActions] Get Charts by Chart Groups and Country and dateComplete',
    GET_CHARTS_BY_CHART_GROUPS_AND_COUNTRY_AND_DATE_FAILED = '[SNRMacroActions] Get Charts by Chart Groups and Country and date Failed'

}

export class LoadDatesAndCountries implements Action {
    readonly type = SNRMacroActionTypes.LOAD_DATES_AND_COUNTRIES;
}

export class LoadDatesAndCountriesComplete implements Action {

    readonly type = SNRMacroActionTypes.LOAD_DATES_AND_COUNTRIES_COMPLETE;

    constructor(public payload: fromModels.IInput) { }
}

export class LoadDatesAndCountriesFailed implements Action {
    readonly type = SNRMacroActionTypes.LOAD_DATES_AND_COUNTRIES_FAILED;

    constructor(public payload: string) { }
}

export class SelectMacroRun implements Action {
    readonly type = SNRMacroActionTypes.SELECT_MACRO_RUN;

    constructor(public payload: fromModels.IMacroRun) { }
}

export class LoadMacroRunResults implements Action {
    readonly type = SNRMacroActionTypes.LOAD_MACRO_RUN_RESULTS;

    constructor(public payload: fromModels.IMacroRun) { }
}

export class LoadMacroRunResultsComplete implements Action {

    readonly type = SNRMacroActionTypes.LOAD_MACRO_RUN_RESULTS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadMacroRunResultsFailed implements Action {
    readonly type = SNRMacroActionTypes.LOAD_MACRO_RUN_RESULTS_FAILED;

    constructor(public payload: string) { }
}






export class GetChartGroupsByCountry implements Action {
    readonly type = SNRMacroActionTypes.GET_CHART_GROUPS_BY_COUNTRY;

    constructor(public payload: fromModels.ICountry) { }
}

export class GetChartGroupsByCountryComplete implements Action {

    readonly type = SNRMacroActionTypes.GET_CHART_GROUPS_BY_COUNTRY_COMPLETE;

    constructor(public payload: {country: string; chartGroups: any[]}) { }
}

export class GetChartGroupsByCountryFailed implements Action {

    readonly type = SNRMacroActionTypes.GET_CHART_GROUPS_BY_COUNTRY_FAILED;

    constructor(public payload: string) { }
}



export class PrepareChartsByChartGroupsAndCountryAndDate implements Action {
    readonly type = SNRMacroActionTypes.PREPARE_CHARTS_BY_CHART_GROUPS_AND_COUNTRY;

    constructor(public payload: fromModels.IChartGroupInput) {}
}


export class GetChartsByChartGroupsAndCountryAndDate implements Action {
    readonly type = SNRMacroActionTypes.GET_CHARTS_BY_CHART_GROUPS_AND_COUNTRY_AND_DATE;

    constructor(public payload: {combineKey: string, req: fromModels.IChartGroupInput}) { }
}

export class GetChartsByChartGroupsAndCountryAndDateComplete implements Action {

    readonly type = SNRMacroActionTypes.GET_CHARTS_BY_CHART_GROUPS_AND_COUNTRY_AND_DATE_COMPLETE;

    constructor(public payload: {combineKey: string, data: any, missingFiles: string[]}) { }
}

export class GetChartsByChartGroupsAndCountryAndDateFailed implements Action {

    readonly type = SNRMacroActionTypes.GET_CHARTS_BY_CHART_GROUPS_AND_COUNTRY_AND_DATE_FAILED;

    constructor(public payload: {combineKey: string, error: string}) { }
}






export type SNRMacroActions
    = LoadDatesAndCountries
    | LoadDatesAndCountriesComplete
    | LoadDatesAndCountriesFailed

    | SelectMacroRun

    | LoadMacroRunResults
    | LoadMacroRunResultsComplete
    | LoadMacroRunResultsFailed

    | GetChartGroupsByCountry
    | GetChartGroupsByCountryComplete
    | GetChartGroupsByCountryFailed

    | PrepareChartsByChartGroupsAndCountryAndDate
    | GetChartsByChartGroupsAndCountryAndDate
    | GetChartsByChartGroupsAndCountryAndDateComplete
    | GetChartsByChartGroupsAndCountryAndDateFailed;
