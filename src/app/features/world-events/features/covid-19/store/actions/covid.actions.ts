import { Action } from '@ngrx/store';

import * as fromModels from '../../models/covid.models';

export enum CovidActionTypes {

    LOAD_COUNTRIES = '[Covid] Load Countries',
    LOAD_COUNTRIES_COMPLETE = '[Covid] Load Countries complete',
    LOAD_COUNTRIES_FAILED = '[Covid] Load Countries failed',

    LOAD_DATA = '[Covid] Load Data',
    LOAD_DATA_COMPLETE = '[Covid] Load Data complete',
    LOAD_DATA_FAILED = '[Covid] Load Data failed',

    LOAD_US_HISTORY = '[Covid] Load U.S. History',
    LOAD_US_HISTORY_COMPLETE = '[Covid] Load U.S. History complete',
    LOAD_US_HISTORY_FAILED = '[Covid] Load U.S. History failed',

    LOAD_US_STATES_HISTORY = '[Covid] Load U.S. states History',
    LOAD_US_STATES_HISTORY_COMPLETE = '[Covid] Load U.S. states History complete',
    LOAD_US_STATES_HISTORY_FAILED = '[Covid] Load U.S. states History failed',

    LOAD_MOBILITY_INDEX_COUNTRIES = '[Covid] Load Mobility Index countries',
    LOAD_MOBILITY_INDEX_COUNTRIES_COMPLETE = '[Covid] Load Mobility Index countries complete',
    LOAD_MOBILITY_INDEX_COUNTRIES_FAILED = '[Covid] Load Mobility Index countries failed',

    LOAD_MOBILITY_INDEX_SUB_REGIONS = '[Covid] Load Mobility Index sub-regions',
    LOAD_MOBILITY_INDEX_SUB_REGIONS_COMPLETE = '[Covid] Load Mobility Index sub-regions complete',
    LOAD_MOBILITY_INDEX_SUB_REGIONS_FAILED = '[Covid] Load Mobility Index sub-regions failed'
}

export class LoadCountries implements Action {
    readonly type = CovidActionTypes.LOAD_COUNTRIES;
}

export class LoadCountriesComplete implements Action {
    readonly type = CovidActionTypes.LOAD_COUNTRIES_COMPLETE;

    constructor(public payload: fromModels.ICountry[]) { }
}

export class LoadCountriesFailed implements Action {
    readonly type = CovidActionTypes.LOAD_COUNTRIES_FAILED;

    constructor(public payload?: string) {}
}

export class LoadData implements Action {
    readonly type = CovidActionTypes.LOAD_DATA;
}

export class LoadDataComplete implements Action {
    readonly type = CovidActionTypes.LOAD_DATA_COMPLETE;

    constructor(public payload: fromModels.IRecord) { }
}

export class LoadDataFailed implements Action {
    readonly type = CovidActionTypes.LOAD_DATA_FAILED;

    constructor(public payload: string) { }
}

export class LoadUSHistory implements Action {
    readonly type = CovidActionTypes.LOAD_US_HISTORY;
}

export class LoadUSHistoryComplete implements Action {
    readonly type = CovidActionTypes.LOAD_US_HISTORY_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadUSHistoryFailed implements Action {
    readonly type = CovidActionTypes.LOAD_US_HISTORY_FAILED;

    constructor(public payload: string) { }
}

export class LoadUSStatesHistory implements Action {
    readonly type = CovidActionTypes.LOAD_US_STATES_HISTORY;
}

export class LoadUSStatesHistoryComplete implements Action {
    readonly type = CovidActionTypes.LOAD_US_STATES_HISTORY_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadUSStatesHistoryFailed implements Action {
    readonly type = CovidActionTypes.LOAD_US_STATES_HISTORY_FAILED;

    constructor(public payload: string) { }
}

export class LoadMobilityIndexCountries implements Action {
    readonly type = CovidActionTypes.LOAD_MOBILITY_INDEX_COUNTRIES;
}

export class LoadMobilityIndexCountriesComplete implements Action {
    readonly type = CovidActionTypes.LOAD_MOBILITY_INDEX_COUNTRIES_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadMobilityIndexCountriesFailed implements Action {
    readonly type = CovidActionTypes.LOAD_MOBILITY_INDEX_COUNTRIES_FAILED;

    constructor(public payload: string) { }
}

export class LoadMobilityIndexSubregions implements Action {
    readonly type = CovidActionTypes.LOAD_MOBILITY_INDEX_SUB_REGIONS;

    constructor(public payload: string) { }
}

export class LoadMobilityIndexSubregionsComplete implements Action {
    readonly type = CovidActionTypes.LOAD_MOBILITY_INDEX_SUB_REGIONS;

    constructor(public payload: any[]) { }
}

export class LoadMobilityIndexSubregionsFailed implements Action {
    readonly type = CovidActionTypes.LOAD_MOBILITY_INDEX_SUB_REGIONS_FAILED;

    constructor(public payload: string) { }
}



export type CovidActions
    = LoadCountries
    | LoadCountriesComplete
    | LoadCountriesFailed

    | LoadData
    | LoadDataComplete
    | LoadDataFailed

    | LoadUSHistory
    | LoadUSHistoryComplete
    | LoadUSHistoryFailed

    | LoadUSStatesHistory
    | LoadUSStatesHistoryComplete
    | LoadUSStatesHistoryFailed

    | LoadMobilityIndexCountries
    | LoadMobilityIndexCountriesComplete
    | LoadMobilityIndexCountriesFailed

    | LoadMobilityIndexSubregions
    | LoadMobilityIndexSubregionsComplete
    | LoadMobilityIndexSubregionsFailed;

