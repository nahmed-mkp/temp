import { Action, createAction } from '@ngrx/store';

import * as fromModels from './../../models';


// export const loadSettings = createAction('[Attribution] Load user settings');
// export const loadSettingsComplete = createAction('[Attribution] Load user settings complete', (payload: any) => ({payload}));
// export const loadSettingsFailed = createAction('[Attribution] Load user settings failed', (err: string) => ({err}));

// export const loadCustomGroupingAttributes = createAction('[Attribution] load custom grouping attributes');
// export const loadCustomGroupingAttributesComplete = createAction('[Attribution] load custom grouping attributes complete', (payload: any) => ({payload}));
// export const loadCustomGroupingAttributesFailed = createAction('[Attribution] load custom grouping attributes failed', (err: string) => ({err}));

// export const loadPnlAttribution = createAction('[Attribution] Load p&l attribution');
// export const loadPnlAttributionComplete = createAction('[Attribution] Load p&l attribution complete', (payload: any) => ({payload}));
// export const loadPnlAttributionFailed = createAction('[Attribution] Load p&l attribution failed', (err: string) => ({err}));

// export const loadPositionPnlAttribution = createAction('[Attribution] Load p&l attribution at position level');
// export const loadPositionPnlAttributionComplete = createAction('[Attribution] Load p&l attribution at position level complete', (payload: any) => ({payload}));
// export const loadPositionPnlAttributionFailed = createAction('[Attribution] Load p&l attribution at position level failed', (err: string) => ({err}));

// export const loadPnlAttributionDailyTimeseries = createAction('[Attribution] Load p&l attribution daily timeseries');
// export const loadPnlAttributionDailyTimeseriesAdvance = createAction('[Attribution] Load p&l attribution daily timeseries advance', (payload: any) => ({payload}));
// export const loadPnlAttributionDailyTimeseriesComplete = createAction('[Attribution] Load p&l attribution daily timeseries complete', (payload: any) => ({payload}));
// export const loadPnlAttributionDailyTimeseriesFailed = createAction('[Attribution] Load p&l attribution daily timeseries failed', (err: string) => ({err}));

// export const loadPnlAttributionDailyDetails = createAction('[Attribution] Load p&l attribution daily details');
// export const loadPnlAttributionDailyDetailsAdvance = createAction('[Attribution] Load p&l attribution daily details advance', (payload: any) => ({payload}));
// export const loadPnlAttributionDailyDetailsComplete = createAction('[Attribution] Load p&l attribution daily details complete', (payload: any) => ({payload}));
// export const loadPnlAttributionDailyDetailsFailed = createAction('[Attribution] Load p&l attribution daily details failed', (err: string) => ({err}));

// export const loadPnlAttributionReport = createAction('[Attribution] Load p&l attribution report');
// export const loadPnlAttributionReportComplete = createAction('[Attribution] Load p&l attribution report complete', (payload: any) => ({payload}));
// export const loadPnlAttributionReportFailed = createAction('[Attribution] Load p&l attribution report failed', (err: string) => ({err}));

// export const loadPnlAttributionCapitalReport = createAction('[Attribution] Load p&l attribution capital report');
// export const loadPnlAttributionCapitalReportComplete = createAction('[Attribution] Load p&l attribution capital report complete', (payload: any) => ({payload}));
// export const loadPnlAttributionCapitalReportFailed = createAction('[Attribution] Load p&l attribution capital report failed', (err: string) => ({err}));



/* ================== SETTINGS =================== */

export class LoadSettings {
    readonly type = PnlAttributionActionTypes.LOAD_SETTINGS;
}

export class LoadSettingsComplete {
    readonly type = PnlAttributionActionTypes.LOAD_SETTINGS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSettingsFailed {
    readonly type = PnlAttributionActionTypes.LOAD_SETTINGS_FAILED;

    constructor(public payload: any) { }
}


/* ================== CUSTOM GROUPING =================== */


export class LoadCustomGroupingAttributes {
    readonly type = PnlAttributionActionTypes.LOAD_CUSTOM_GROUPING_ATTRIBUTES;
}

export class LoadCustomGroupingAttributesComplete {
    readonly type = PnlAttributionActionTypes.LOAD_CUSTOM_GROUPING_ATTRIBUTES_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadCustomGroupingAttributesFailed {
    readonly type = PnlAttributionActionTypes.LOAD_CUSTOM_GROUPING_ATTRIBUTES_FAILED;

    constructor(public payload: string) { }
}


/* ================== PNL ATTRIBUTION =================== */


export class LoadPnlAttribution {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION;

    constructor(public payload: {request: fromModels.IAttributionRequest, layoutName: string}) { }
} 

export class LoadPnlAttributionWithGuid {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTOIN_WITH_GUID;

    constructor(public payload: string) { }
} 

export class LoadPnlAttributionComplete {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_COMPLETE;

    constructor(public payload: {result: any, layoutName: string, grouping: string[]}) { }
}

export class LoadPnlAttributionFailed {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_FAILED;

    constructor(public payload: {result: string, layoutName: string}) { }
}


/* ================== POSITION ATTRIBUTION =================== */


export class LoadPositionPnlAttribution {
    readonly type = PnlAttributionActionTypes.LOAD_POSITION_PNL_ATTRIBUTION;

    constructor(public payload: fromModels.IPositionAttributionRequest) { }
}

export class LoadPositionPnlAttributionComplete {
    readonly type = PnlAttributionActionTypes.LOAD_POSITION_PNL_ATTRIBUTION_COMPLETE;

    constructor(public payload: {guid: string; id: number; data: any}) { }
}

export class LoadPositionPnlAttributionFailed {
    readonly type = PnlAttributionActionTypes.LOAD_POSITION_PNL_ATTRIBUTION_FAILED;

    constructor(public payload: {guid: string; id: number; err: string}) { }
}


/* ================== PNL ATTRIBUTION TIMESERIES =================== */


export class LoadPnlAttributionDailyTimeseries {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES;

    constructor(public payload: fromModels.IAttributionDailyTimeseriesRequest) { }
}

export class LoadPnlAttributionDailyTimeseriesAdvance {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES_ADVANCE;

    constructor(public payload: string) { }
}

export class LoadPnlAttributionDailyTimeseriesComplete {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES_COMPLETE;

    constructor(public payload: { guid: string; id: number; data: any }) { }
}

export class LoadPnlAttributionDailyTimeseriesFailed {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES_FAILED;

    constructor(public payload: { guid: string; id: number; err: string }) { }
}


/* ================== ATTRIBUTION TIMESERIES =================== */


export class LoadPnlAttributionDetails {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DETAILS;

    constructor(public payload: fromModels.IAttributionDetailsRequest) {}
}

export class LoadPnlAttributionDetailsAdvance {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DETAILS_ADVANCE;

    constructor(public payload: string) {}
}

export class LoadPnlAttributionDetailsComplete {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DETAILS_COMPLETE;

    constructor(public payload: { guid: string; combineId: string; data: any[] }) { }
}

export class LoadPnlAttributionDetailsFailed {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DETAILS_FAILED;

    constructor(public payload: { guid: string; combineId: string; err: string }) { }
}


/* ================== ATTRIBUTION REPORT  =================== */


export class LoadPnlAttributionReport {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_REPORT;

    constructor(public payload: fromModels.IAttributionReportRequest) { }
}

export class LoadPnlAttributionReportComplete {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_REPORT_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadPnlAttributionReportFailed {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_REPORT_FAILED;

    constructor(public payload: string) { }
}

/* ================== ATTRIBUTION CAPITAL REPORT =================== */


export class LoadPnlAttributionCapitalReport {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_REPORT;

    constructor(public payload: fromModels.IAttributionReportRequest) { }
}

export class LoadPnlAttributionCapitalReportComplete {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_REPORT_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadPnlAttributionCapitalReportFailed {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_REPORT_FAILED;

    constructor(public payload: string) { }
}



/* ================== ATTRIBUTION POD CAPITAL REPORT =================== */


export class LoadPnlAttributionPodCapitalReport {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_REPORT;

    constructor(public payload: fromModels.IAttributionReportRequest) { }
}

export class LoadPnlAttributionPodCapitalReportComplete {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_REPORT_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadPnlAttributionPodCapitalReportFailed {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_REPORT_FAILED;

    constructor(public payload: string) { }
}

/* ================== ATTRIBUTION CAPITAL EOM REPORT =================== */

export class LoadPnlAttributionCapitalEomReport {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_EOM_REPORT;

    constructor(public payload: fromModels.IAttributionReportRequest) { }
}

export class LoadPnlAttributionCapitalEomReportComplete {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_EOM_REPORT_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadPnlAttributionCapitalEomReportFailed {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_EOM_REPORT_FAILED;

    constructor(public payload: string) { }
}


/* ================== ATTRIBUTION POD CAPITAL EOM REPORT =================== */

export class LoadPnlAttributionPodCapitalEomReport {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_EOM_REPORT;

    constructor(public payload: fromModels.IAttributionReportRequest) { }
}

export class LoadPnlAttributionPodCapitalEomReportComplete {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_EOM_REPORT_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadPnlAttributionPodCapitalEomReportFailed {
    readonly type = PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_EOM_REPORT_FAILED;

    constructor(public payload: string) { }
}

/* =================== RECLASSIFY REPO =================== */

export class ToggleReclassifyRepo {
    readonly type = PnlAttributionActionTypes.TOGGLE_RECLASSIFY_REPO;

    constructor() { }
}

/* =================== EXCLUDE FUNDING =================== */

export class ToggleExcludeFunding {
    readonly type = PnlAttributionActionTypes.TOGGLE_EXCLUDE_FUNDING;

    constructor() { }
}

/* =================== TOGGLE BETA ADJUSTMENT =================== */

export class ToggleBetaAdjustment {
    readonly type = PnlAttributionActionTypes.TOGGLE_BETA_ADJUSTMENT;

    constructor() { }
}


export enum PnlAttributionActionTypes {


    TOGGLE_RECLASSIFY_REPO = '[Attribution] Toggle reclassify repo',
    TOGGLE_EXCLUDE_FUNDING = '[Attribution] Toggle exclude funding',
    TOGGLE_BETA_ADJUSTMENT = '[Attribution] Toggle beta adjustment',

    // SET_GRID_DISPLAY_MODE = "[Attribution] Set grid display mode",

    LOAD_SETTINGS = '[Attribution] Load user settings',
    LOAD_SETTINGS_COMPLETE = '[Attribution] Load settings complete',
    LOAD_SETTINGS_FAILED = '[Attribution] Load settings failed',

    // LOAD_META_DATA = '[Attribution] Load meta data',
    // LOAD_META_DATA_COMPLETE = '[Attribution] Load meta data complete',
    // LOAD_META_DATA_FAILED = '[Attribution] Load meta data failed',

    LOAD_CUSTOM_GROUPING_ATTRIBUTES = '[Attribution] load custom grouping attributes',
    LOAD_CUSTOM_GROUPING_ATTRIBUTES_COMPLETE = '[Attribution] load custom grouping attributes complete',
    LOAD_CUSTOM_GROUPING_ATTRIBUTES_FAILED = '[Attribution] load custom grouping attributes failed',

    LOAD_PNL_ATTRIBUTION = '[Attribution] Load p&l attribution',
    LOAD_PNL_ATTRIBUTOIN_WITH_GUID = '[Attribution] Load p&l attribution with guid with guid',
    LOAD_PNL_ATTRIBUTION_COMPLETE = '[Attribution] Load p&l attribution complete',
    LOAD_PNL_ATTRIBUTION_FAILED = '[Attribution] Load p&l attribution failed',

    LOAD_POSITION_PNL_ATTRIBUTION = '[Attribution] Load p&l attribution at position level',
    LOAD_POSITION_PNL_ATTRIBUTION_COMPLETE = '[Attribution] Load p&l attribution at position level complete',
    LOAD_POSITION_PNL_ATTRIBUTION_FAILED = '[Attribution] Load p&l attribution at position level failed',

    LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES = '[Attribution] Load p&l attribution daily timeseries',
    LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES_ADVANCE = '[Attribution] Load p&l attribution daily timeseries advance',
    LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES_COMPLETE = '[Attribution] Load p&l attribution daily timeseries complete',
    LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES_FAILED = '[Attribution] Load p&l attribution daily timeseries failed',

    LOAD_PNL_ATTRIBUTION_DETAILS = '[Attribution] Load p&l attribution details',
    LOAD_PNL_ATTRIBUTION_DETAILS_ADVANCE = '[Attribution] Load p&l attribution details advance',
    LOAD_PNL_ATTRIBUTION_DETAILS_COMPLETE = '[Attribution] Load p&l attribution details complete',
    LOAD_PNL_ATTRIBUTION_DETAILS_FAILED = '[Attribution] Load p&l attribution details failed',

    LOAD_PNL_ATTRIBUTION_REPORT = '[Attribution] Load p&l attribution report',
    LOAD_PNL_ATTRIBUTION_REPORT_COMPLETE = '[Attribution] Load p&l attribution report complete',
    LOAD_PNL_ATTRIBUTION_REPORT_FAILED = '[Attribution] Load p&l attribution report failed',

    LOAD_PNL_ATTRIBUTION_CAPITAL_REPORT = '[Attribution] Load p&l attribution capital report',
    LOAD_PNL_ATTRIBUTION_CAPITAL_REPORT_COMPLETE = '[Attribution] Load p&l attribution capital report complete',
    LOAD_PNL_ATTRIBUTION_CAPITAL_REPORT_FAILED = '[Attribution] Load p&l attribution capital report failed',

    LOAD_PNL_ATTRIBUTION_POD_CAPITAL_REPORT = '[Attribution] Load p&l attribution pod capital report',
    LOAD_PNL_ATTRIBUTION_POD_CAPITAL_REPORT_COMPLETE = '[Attribution] Load p&l attribution pod capital report complete',
    LOAD_PNL_ATTRIBUTION_POD_CAPITAL_REPORT_FAILED = '[Attribution] Load p&l attribution pod capital report failed',

    LOAD_PNL_ATTRIBUTION_CAPITAL_EOM_REPORT = '[Attribution] Load p&l attribution capital eom report',
    LOAD_PNL_ATTRIBUTION_CAPITAL_EOM_REPORT_COMPLETE = '[Attribution] Load p&l attribution capital eom report complete',
    LOAD_PNL_ATTRIBUTION_CAPITAL_EOM_REPORT_FAILED = '[Attribution] Load p&l attribution capital eom report failed',


    LOAD_PNL_ATTRIBUTION_POD_CAPITAL_EOM_REPORT = '[Attribution] Load p&l attribution pod capital eom report',
    LOAD_PNL_ATTRIBUTION_POD_CAPITAL_EOM_REPORT_COMPLETE = '[Attribution] Load p&l attribution pod capital eom report complete',
    LOAD_PNL_ATTRIBUTION_POD_CAPITAL_EOM_REPORT_FAILED = '[Attribution] Load p&l attribution pod capital eom report failed'
}




export type PnlAttributionActions
    = LoadPnlAttribution
    | LoadPnlAttributionWithGuid
    | LoadPnlAttributionComplete
    | LoadPnlAttributionFailed

    | LoadPositionPnlAttribution
    | LoadPositionPnlAttributionComplete
    | LoadPositionPnlAttributionFailed

    | LoadPnlAttributionDailyTimeseries
    | LoadPnlAttributionDailyTimeseriesAdvance
    | LoadPnlAttributionDailyTimeseriesComplete
    | LoadPnlAttributionDailyTimeseriesFailed

    | LoadPnlAttributionDetails
    | LoadPnlAttributionDetailsAdvance
    | LoadPnlAttributionDetailsComplete
    | LoadPnlAttributionDetailsFailed

    | LoadPnlAttributionReport
    | LoadPnlAttributionReportComplete
    | LoadPnlAttributionReportFailed

    | LoadPnlAttributionCapitalReport
    | LoadPnlAttributionCapitalReportComplete
    | LoadPnlAttributionCapitalReportFailed

    | LoadPnlAttributionPodCapitalReport
    | LoadPnlAttributionPodCapitalReportComplete
    | LoadPnlAttributionPodCapitalReportFailed

    | LoadPnlAttributionCapitalEomReport
    | LoadPnlAttributionCapitalEomReportComplete
    | LoadPnlAttributionCapitalEomReportFailed

    | LoadPnlAttributionPodCapitalEomReport
    | LoadPnlAttributionPodCapitalEomReportComplete
    | LoadPnlAttributionPodCapitalEomReportFailed

    | LoadCustomGroupingAttributes
    | LoadCustomGroupingAttributesComplete
    | LoadCustomGroupingAttributesFailed

    | LoadSettings
    | LoadSettingsComplete
    | LoadSettingsFailed

    | ToggleReclassifyRepo
    | ToggleExcludeFunding
    | ToggleBetaAdjustment;
