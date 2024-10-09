import { Action } from '@ngrx/store';
import * as fromModels from './../../models/factor-exposure.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

 export enum FactorExposureActionTypes {

    CHECK_USER_ACCESS = '[Factor Exposure] Check user acccess',
    CHECK_USER_ACCESS_COMPLETE = '[Factor Exposure] Check user acccess complete',
    CHECK_USER_ACCESS_FAILED = '[Factor Exposure] Check user acccess failed',

    PARAMS_CHANGED = '[Factor Exposure] Params changed',

    SET_ACTIVE_DATE = '[Factor Exposure] Set active date',
    SET_ACTIVE_DATE_COMPLETE = '[Factor Exposure] Set active date complete',

    SET_ACTIVE_GROUPING = '[Factor Exposure] Set active grouping',
    SET_ACTIVE_GROUPING_COMPLETE = '[Factor Exposure] Set active grouping complete',

    ADD_NEW_TAB_GROUPING = '[Factor Exposure] Add new tab grouping',
    ADD_NEW_TAB_GROUPING_COMPLETE = '[Factor Exposure] Add new tab grouping complete',
    REMOVE_TAB_GROUPING = '[Factor Exposure] Remove tab grouping',
    REMOVE_TAB_GROUPING_COMPLETE = '[Factor Exposure] Remove tab grouping complete',

    LOAD_DROPDOWN_DATES = '[Factor Exposure] Load dropdown dates',
    LOAD_DROPDOWN_DATES_COMPLETE = '[Factor Exposure] Load dropdown dates complete',
    LOAD_DROPDOWN_DATES_FAILED = '[Factor Exposure] Load dropdown dates failed',

    LOAD_DROPDOWN_GROUPINGS = '[Factor Exposure] Load groupings dropdowm',
    LOAD_DROPDOWN_GROUPINGS_COMPLETE = '[Factor Exposure] Load groupings dropdown complete',
    LOAD_DROPDOWN_GROUPINGS_FAILED = '[Factor Exposure] Load groupings dropdown failed',

    LOAD_GROUPINGS_BY_DATE = '[Factor Exposure] Load groupings by date',
    LOAD_GROUPINGS_BY_DATE_COMPLETE = '[Factor Exposure] Load groupings by date complete',
    LOAD_GROUPINGS_BY_DATE_FAILED = '[Factor Exposure] Load groupings by date failed',

    LOAD_FACTORS_TAB_GRID_DATA = '[Factor Exposure] Load factors tab grid data',
    LOAD_FACTORS_TAB_GRID_DATA_COMPLETE = '[Factor Exposure] Load factors tab grid data complete',
    LOAD_FACTORS_TAB_GRID_DATA_FAILED = '[Factor Exposure] Load factors tab grid data failed',

    LOAD_GROUPING_TAB_GRID_DATA = '[Factor Exposure] Load grouping tab grid data',
    LOAD_GROUPING_TAB_GRID_DATA_COMPLETE = '[Factor Exposure] Load grouping tab grid data complete',
    LOAD_GROUPING_TAB_GRID_DATA_FAILED = '[Factor Exposure] Load grouping tab grid data failed',

    LOAD_POSITIONS_LITE_DATA = '[Factor Exposure] Load positions lite data',
    LOAD_POSITIONS_LITE_DATA_COMPLETE = '[Factor Exposure] Load positions lite data complete',
    LOAD_POSITIONS_LITE_DATA_FAILED = '[Factor Exposure] Load positions lite data failed',

    LOAD_POSITIONS_GROUPING = '[Factor Exposure] Load positions grouping',
    LOAD_POSITIONS_GROUPING_COMPLETE = '[Factor Exposure] Load positions grouping complete',
    LOAD_POSITIONS_GROUPING_FAILED = '[Factor Exposure] Load positions grouping failed',

    APPLY_USD_FILTER = '[Factor Exposure] Apply USD filter',
    REMOVE_USD_FILTER = '[Factor Exposure] Remove USD filter',

    APPLY_BPS_TO_FUND_FILTER = '[Factor Exposure] Apply bpsToFund filter',
    REMOVE_BPS_TO_FUND_FILTER = '[Factor Exposure] Remove bpsToFund filter',

    APPLY_BPS_TO_POD_FILTER = '[Factor Exposure] Apply bpsToPod filter',
    REMOVE_BPS_TO_POD_FILTER = '[Factor Exposure] Remove bpsToPod filter',

    APPLY_NULL_SEC_FILTER = '[Factor Exposure] Apply null security filter',
    REMOVE_NULL_SEC_FILTER = '[Factor Exposure] Remove null security filter',

    LOAD_SETTINGS = '[Factor Exposure] Load settings',
    LOAD_SETTINGS_COMPLETE = '[Factor Exposure] Load settings complete', 
    LOAD_SETTINGS_FAILED = '[Factor Exposure] Load settings failed',

    SAVE_SETTINGS = '[Factor Exposure] Save settings',
    SAVE_SETTINGS_COMPLETE = '[Factor Exposure] Save settings complete',
    SAVE_SETTINGS_FAILED = '[Factor Exposure] Save settings failed',

    SET_TIMESTAMP = '[Factor Exposure] Set data timestamp'
}


export class CheckUserAccess implements Action {
    readonly type = FactorExposureActionTypes.CHECK_USER_ACCESS;
}

export class CheckUserAccessComplete implements Action {
   readonly type = FactorExposureActionTypes.CHECK_USER_ACCESS_COMPLETE;
   
   constructor(public payload: boolean) {}
}

export class CheckUserAccessFailed implements Action {
   readonly type = FactorExposureActionTypes.CHECK_USER_ACCESS_FAILED

   constructor(public payload: string) { }
}

/* ================================== */

export class ParamsChanged implements Action {
    readonly type = FactorExposureActionTypes.PARAMS_CHANGED;
    constructor(public payload: fromModels.IFactorExposureParams) {}
}

/* ================================== */

export class SetActiveDate implements Action {
    readonly type = FactorExposureActionTypes.SET_ACTIVE_DATE;
    constructor(public payload: string) {}
}

export class SetActiveDateComplete implements Action {
    readonly type = FactorExposureActionTypes.SET_ACTIVE_DATE_COMPLETE;
    constructor(public payload: string) {}
}

/* ================================== */

export class SetActiveGrouping implements Action {
    readonly type = FactorExposureActionTypes.SET_ACTIVE_GROUPING;
    constructor(public payload: any) {}
}


export class SetActiveGroupingComplete implements Action {
    readonly type = FactorExposureActionTypes.SET_ACTIVE_GROUPING_COMPLETE;
    constructor(public payload: string) {}
}

/* ================================== */

export class AddNewTabGrouping implements Action {
    readonly type = FactorExposureActionTypes.ADD_NEW_TAB_GROUPING;
    constructor(public payload: string) {}
}

export class AddNewTabGroupingComplete implements Action {
    readonly type = FactorExposureActionTypes.ADD_NEW_TAB_GROUPING_COMPLETE;
    constructor(public payload: string) {}
}

export class RemoveTabGrouping implements Action {
    readonly type = FactorExposureActionTypes.REMOVE_TAB_GROUPING;
    constructor(public payload: string) {}
}

export class RemoveTabGroupingComplete implements Action {
    readonly type = FactorExposureActionTypes.REMOVE_TAB_GROUPING_COMPLETE;
    constructor(public payload: string) {}
}


/* ================================== */

export class LoadDropdownDates implements Action {
     readonly type = FactorExposureActionTypes.LOAD_DROPDOWN_DATES;
}

export class LoadDropdownDatesComplete implements Action {
    readonly type = FactorExposureActionTypes.LOAD_DROPDOWN_DATES_COMPLETE;
    
    constructor(public payload: string[]) {}
}

export class LoadDropdownDatesFailed implements Action {
    readonly type = FactorExposureActionTypes.LOAD_DROPDOWN_DATES_FAILED;

    constructor(public payload: string) { }
}

/* ================================== */

export class LoadDropdownGroupings implements Action {
    readonly type = FactorExposureActionTypes.LOAD_DROPDOWN_GROUPINGS;
    constructor(public payload: string){}
}

export class LoadDropdownGroupingsComplete implements Action {
   readonly type = FactorExposureActionTypes.LOAD_DROPDOWN_GROUPINGS_COMPLETE;
   
   constructor(public payload: string[]) {}
}

export class LoadDropdownGroupingsFailed implements Action {
   readonly type = FactorExposureActionTypes.LOAD_DROPDOWN_GROUPINGS_FAILED;

   constructor(public payload: string) { }
}

/* ================================== */

export class LoadGroupingsByDate implements Action {
    readonly type = FactorExposureActionTypes.LOAD_GROUPINGS_BY_DATE;
}

export class LoadGroupingsByDateComplete implements Action {
    readonly type = FactorExposureActionTypes.LOAD_GROUPINGS_BY_DATE_COMPLETE;

    constructor(public payload: string[]) {}
}

export class LoadGroupingsByDateFailed implements Action {
    readonly type = FactorExposureActionTypes.LOAD_GROUPINGS_BY_DATE_FAILED;
    
    constructor(public payload: string) {}
}

/* ================================== */

export class LoadFactorsTabGridData implements Action {
    readonly type = FactorExposureActionTypes.LOAD_FACTORS_TAB_GRID_DATA;
    constructor() {}
}

export class  LoadFactorsTabGridDataComplete implements Action {
   readonly type = FactorExposureActionTypes.LOAD_FACTORS_TAB_GRID_DATA_COMPLETE;
   
   constructor(public payload: string[]) {}
}

export class  LoadFactorsTabGridDataFailed implements Action {
   readonly type = FactorExposureActionTypes.LOAD_FACTORS_TAB_GRID_DATA_FAILED;

   constructor(public payload: string) { }
}

/* ================================== */

export class LoadGroupingTabGridData implements Action {
    readonly type = FactorExposureActionTypes.LOAD_GROUPING_TAB_GRID_DATA;
    constructor() {}
}

export class  LoadGroupingTabGridDataComplete implements Action {
   readonly type = FactorExposureActionTypes.LOAD_GROUPING_TAB_GRID_DATA_COMPLETE;
   
   constructor(public payload: string[], public grouping: string) {}
}

export class  LoadGroupingTabGridDataFailed implements Action {
   readonly type = FactorExposureActionTypes.LOAD_GROUPING_TAB_GRID_DATA_FAILED;

   constructor(public payload: string) { }
}

/* ================================== */

export class LoadPositionsLiteData implements Action {
    readonly type = FactorExposureActionTypes.LOAD_POSITIONS_LITE_DATA;
    constructor() {}
}

export class LoadPositionsLiteDataComplete implements Action {
    readonly type = FactorExposureActionTypes.LOAD_POSITIONS_LITE_DATA_COMPLETE;
    constructor(public payload: any) {}
}

export class LoadPositionsLiteDataFailed implements Action {
    readonly type = FactorExposureActionTypes.LOAD_POSITIONS_LITE_DATA_FAILED;
    constructor(public payload: string) {}
}

/* ================================== */

export class LoadSettings implements Action {
    readonly type = FactorExposureActionTypes.LOAD_SETTINGS;
}

export class LoadSettingsComplete implements Action {
    readonly type = FactorExposureActionTypes.LOAD_SETTINGS_COMPLETE;

    constructor(public payload: any) {} 
}

export class LoadSettingsFailed implements Action {
    readonly type = FactorExposureActionTypes.LOAD_SETTINGS_FAILED;
    constructor(public payload: any) { }
}

/* ================================== */

export class LoadPositionsGrouping implements Action {
    readonly type = FactorExposureActionTypes.LOAD_POSITIONS_GROUPING;
    constructor() {}
}

export class LoadPositionsGroupingComplete implements Action {
    readonly type = FactorExposureActionTypes.LOAD_POSITIONS_GROUPING_COMPLETE;
    constructor(public payload: any) {}
}

export class LoadPositionsGroupingFailed implements Action {
    readonly type = FactorExposureActionTypes.LOAD_POSITIONS_GROUPING_FAILED;
    constructor(public payload: string) {}
}

/* ================================== */

export class ApplyUSDFilter implements Action {
    readonly type = FactorExposureActionTypes.APPLY_USD_FILTER;
}

export class RemoveUSDFilter implements Action {
    readonly type = FactorExposureActionTypes.REMOVE_USD_FILTER;
}

export class ApplyBpsToFundFilter implements Action {
    readonly type = FactorExposureActionTypes.APPLY_BPS_TO_FUND_FILTER;
}

export class RemoveBpsToFundFilter implements Action {
    readonly type = FactorExposureActionTypes.REMOVE_BPS_TO_FUND_FILTER;
}

export class ApplyBpsToPodFilter implements Action {
    readonly type = FactorExposureActionTypes.APPLY_BPS_TO_POD_FILTER;
}

export class RemoveBpsToPodFilter implements Action {
    readonly type = FactorExposureActionTypes.REMOVE_BPS_TO_POD_FILTER;
}

export class ApplyNullSecFilter implements Action {
    readonly type = FactorExposureActionTypes.APPLY_NULL_SEC_FILTER;
}

export class RemoveNullSecFilter implements Action {
    readonly type = FactorExposureActionTypes.REMOVE_NULL_SEC_FILTER;
}

/* ================================== */


export class SaveSettings implements Action {
    readonly type = FactorExposureActionTypes.SAVE_SETTINGS;
    constructor(public payload: any) { }
}

export class SaveSettingsComplete implements Action {
    readonly type = FactorExposureActionTypes.SAVE_SETTINGS_COMPLETE;
    constructor(public payload: any) { }
}

export class SaveSettingsFailed implements Action {
    readonly type = FactorExposureActionTypes.SAVE_SETTINGS_FAILED;
    constructor(public payload: any) { }
}

/* ================================== */

export class SetTimestamp implements Action {
    readonly type = FactorExposureActionTypes.SET_TIMESTAMP;
    constructor(public payload: string) {}
}

export type FactorExposureActions
    = CheckUserAccess
    | CheckUserAccessComplete
    | CheckUserAccessFailed
    
    | ParamsChanged
    
    | SetActiveDate
    | SetActiveDateComplete

    | SetActiveGrouping
    | SetActiveGroupingComplete

    | AddNewTabGrouping 

    | RemoveTabGrouping

    | LoadDropdownDates
    | LoadDropdownDatesComplete
    | LoadDropdownDatesFailed

    | LoadDropdownGroupings
    | LoadDropdownGroupingsComplete
    | LoadDropdownGroupingsFailed

    | LoadFactorsTabGridData
    | LoadFactorsTabGridDataComplete
    | LoadFactorsTabGridDataFailed

    | LoadGroupingTabGridData  
    | LoadGroupingTabGridDataComplete
    | LoadGroupingTabGridDataFailed
    
    | LoadPositionsLiteData
    | LoadPositionsLiteDataComplete
    | LoadPositionsLiteDataFailed

    | LoadPositionsGrouping
    | LoadPositionsGroupingComplete
    | LoadPositionsGroupingFailed

    | ApplyUSDFilter
    | RemoveUSDFilter 

    | ApplyBpsToFundFilter 
    | RemoveBpsToFundFilter

    | ApplyBpsToPodFilter
    | RemoveBpsToPodFilter
    
    | ApplyNullSecFilter
    | RemoveNullSecFilter

    | LoadSettings
    | LoadSettingsComplete
    | LoadSettingsFailed
    
    | SaveSettings
    | SaveSettingsComplete
    | SaveSettingsFailed

    | SetTimestamp;

    
