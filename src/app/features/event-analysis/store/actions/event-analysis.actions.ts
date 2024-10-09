import { Action } from '@ngrx/store';

import * as fromModels from './../../models';

export enum EventAnalysisActionTypes {

    /** UI Actions */

    SET_ACTIVE_GUID = '[Timeseries Analysis] Set active guid',
    SET_ACTIVE_CALENDER_ID = '[Timeseries Analysis] Set active calender id', 
    SET_SELECTED_EVENT_ANALYSIS_DATE = '[Timeseries Analysis] Set selected event analysis date',
    SET_EVENT_PLOT_SERIES_VISIBILITY = '[Timeseries Analysis] Set event plot series visibility',

    /**  Metadata Management **/

    LOAD_PREPROCESSING_OPTIONS = '[Timeseries Analysis] load preprocessing options',
    LOAD_PREPROCESSING_OPTIONS_COMPLETE = '[Timeseries Analysis] load preprocessing options complete',
    LOAD_PREPROCESSING_OPTIONS_FAILED = '[Timeseries Analysis] load preprocessing options failed',

    LOAD_CUSTOM_FUNCTIONSET = '[Timeseries Analysis] load custom function set',
    LOAD_CUSTOM_FUNCTIONSET_COMPLETE = '[Timeseries Analysis] load custom function set complete',
    LOAD_CUSTOM_FUNCTIONSET_FAILED = '[Timeseries Analysis] load custom function set failed',

    /** Calendar Management **/
    LOAD_EVENT_CALENDARS = '[Timeseries Analysis] load event calendars',
    LOAD_EVENT_CALENDARS_COMPLETE = '[Timeseries Analysis] load event calendars omplete',
    LOAD_EVENT_CALENDARS_FAILED = '[Timeseries Analysis] load event calendars failed',

    ADD_CALENDAR = '[Timeseries Analysis] Add calendar',
    ADD_CALENDAR_COMPLETE = '[Timeseries Analysis] Add calendar complete',
    ADD_CALENDAR_FAILED = '[Timeseris Anlaysis] Add calendar failed',

    UPDATE_CALENDAR = '[Timeseries Analysis] Update calendar',
    UPDATE_CALENDAR_COMPLETE = '[Timeseries Analysis] Update calendar complete',
    UPDATE_CALENDAR_FAILED = '[Timeseries Analysis] Update calendar failed',

    DELETE_CALENDAR = '[Timeseries Analysis] Delete calendar',
    DELETE_CALENDAR_COMPLETE = '[Timeseries Analysis] Delete calendar complete',
    DELETE_CALENDAR_FAILED = '[Timeseries Analysis] Delete calendar failed',

    LOAD_CALENDAR_DATES = '[Timeseries Analysis] Load calendar dates',
    LOAD_CALENDAR_DATES_COMPLETE = '[Timeseries Analysis] Load calendar dates complete',
    LOAD_CALENDAR_DATES_FAILED = '[Timeseries Analysis] Load calendar dates failed',


    ADD_CALENDAR_DATE = '[Timeseries Analysis] Add calendar date',
    ADD_CALENDAR_DATE_COMPLETE = '[Timeseries Analysis] Add calendar date complete',
    ADD_CALENDAR_DATE_FAILED = '[Timeseries Analysis] Add calendar date failed',

    DELETE_CALENDAR_DATE = '[Timeseries Analysis] Delete calendar date',
    DELETE_CALENDAR_DATE_COMPLETE = '[Timeseries Analysis] Delete calendar date complete',
    DELETE_CALENDAR_DATE_FAILED = '[Timeseries Analysis] Delete calendar date failed',

    /** Analyses Management **/

    LOAD_TIMESERIES_ANALYSES = '[Timeseries Analysis] Load analyses',
    LOAD_TIMESERIES_ANALYSES_COMPLETE = '[Timeseries Analysis] Load analyses complete',
    LOAD_TIMESERIES_ANALYSES_FAILED = '[Timeseries Analysis] Load analyses failed',

    ADD_TIMESERIES_ANALYSIS = '[Timeseries Analysis] Add analysis',
    ADD_TIMESERIES_ANALYSIS_COMPLETE = '[Timeseries Analysis] Add analysis complete',
    ADD_TIMESERIES_ANALYSIS_FAILED = '[Timeseries Analysis] Add analysis failed',

    UPDATE_TIMESERIES_ANALYSIS = '[Timeseries Analysis] Update analysis',
    UPDATE_TIMESERIES_ANALYSIS_COMPLETE = '[Timeseries Analysis] Update analysis complete',
    UPDATE_TIMESERIES_ANALYSIS_FAILED = '[Timeseries Analysis] Update analysis failed',

    DELETE_TIMESERIES_ANALYSIS = '[Timeseries Analysis] Delete analysis',
    DELETE_TIMESERIES_ANALYSIS_COMPLETE = '[Timeseries Analysis] Delete analysis complete',
    DELETE_TIMESERIES_ANALYSIS_FAILED = '[Timeseries Analysis] Delete analysis failed',

    /**  Configuration Management **/

    LOAD_CONFIGURATION = '[Timeseries Analysis] Load configuration',
    LOAD_CONFIGURATION_COMPLETE = '[Timeseries Analysis] Load configuration complete',
    LOAD_CONFIGURATION_FAILED = '[Timeseries Analysis] Load configuration failed',

    ADD_CONFIGURATION = '[Timeseries Analysis] Add configuration',
    ADD_CONFIGURATION_COMPLETE = '[Timeseries Analysis] Add configuration complete',
    ADD_CONFIGURATION_FAILED = '[Timeseries Analysis] Add configuration failed',

    UPDATE_CONFIGURATION = '[Timeseries Analysis] Update configuration',
    UPDATE_CONFIGURATION_COMPLETE = '[Timeseries Analysis] Update configuration complete',
    UPDATE_CONFIGURATION_FAILED = '[Timeseries Analysis] Update configuration failed',

    SAVE_CONFIGURATION = '[Timeseries Analysis] Save configuration',
    SAVE_CONFIGURATION_COMPLETE = '[Timeseries Analysis] Save configuration complete',
    SAVE_CONFIGURATION_FAILED = '[Timeseries Analysis] Save configuration failed',

    LOAD_TIMESERIES_FORMULAS = '[Timeseries Analysis] load timeseries formulas',
    LOAD_TIMESERIES_FORMULAS_COMPLETE = '[Timeseries Analysis] load timeseries formulas complete',
    LOAD_TIMESERIES_FORMULAS_FAILED = '[Timeseries Analysis] load timeseries formulas failed',

    ADD_OR_SAVE_TIMESERIES_FORMULAS = '[Timeseries Analysis] add or save timeseries formula',
    ADD_OR_SAVE_TIMESERIES_FORMULAS_COMPLETE = '[Timeseries Analysis] add or save timeseries formula complete',
    ADD_OR_SAVE_TIMESERIES_FORMULAS_FAILED = '[Timeseries Analysis] add or save timeseries formula failed',

    DELETE_TIMESERIES_FORMULAS = '[Timeseries Analysis] delete timeseries formulas',
    DELETE_TIMESERIES_FORMULAS_COMPLETE = '[Timeseries Analysis] delete timeseries formulas complete',
    DELETE_TIMESERIES_FORMULAS_FAILED = '[Timeseries Analysis] delete timeseries formulas failed',

    /** Analysis Management **/

    LOAD_RAW_DATA = '[Timeseries Analysis] Load raw data',
    LOAD_RAW_DATA_COMPLETE = '[Timeseries Analysis] Load raw data complete',
    LOAD_RAW_DATA_FAILED = '[Timeseries Analysis] Load raw data failed',

    LOAD_PLOT_DATA = '[Timeseries Analysis] Load plot data',
    LOAD_PLOT_DATA_COMPLETE = '[Timeseries Analysis] Load plot data complete',
    LOAD_PLOT_DATA_FAILED = '[Timeseries Analysis] Load plot data failed',

    LOAD_EVENT_ANALYSIS = '[Timeseries Analysis] Load event analysis',
    LOAD_EVENT_ANALYSIS_COMPLETE = '[Timeseries Analysis] Load event analysis complete',
    LOAD_EVENT_ANALYSIS_FAILED = '[Timeseries Analysis] Load event analysis failed',

    LOAD_STATISTICS = '[Timeseies Analysis] Load statistics',
    LOAD_STATISTICS_COMPLETE = '[Timeseries Analysis] Load statistics complete',
    LOAD_STATISTICS_FAILED = '[Timeseries Analysis] Load statistics failed',

    LOAD_MULTI_FACTOR_REGRESSION_ANALYSIS = '[Timeseries Analysis] Load multi-factor regression',
    LOAD_MULTI_FACTOR_REGRESSION_ANALYSIS_COMPLETE = '[Timeseries Analysis] Load multi-factor regression complete',
    LOAD_MULTI_FACTOR_REGRESSION_ANALYSIS_FAILED = '[Timeseries Analysis] Load multi-factor regression failed',

    LOAD_EVENT_ANALYSIS_MOVING_AVERAGE = '[Timeseries Analysis] Load event analysis moving average',
    LOAD_EVENT_ANALYSIS_MOVING_AVERAGE_COMPLETE = '[Timeseries Analysis] Load event analysis moving average complete',
    LOAD_EVENT_ANALYSIS_MOVING_AVERAGE_FAILED = '[Timeseries Analysis] Load event analysis moving average failed',
}

/***************************************************************************** */
/*                          UI Data Management                               */
/***************************************************************************** */

export class SetActiveGuid implements Action {
    readonly type = EventAnalysisActionTypes.SET_ACTIVE_GUID;

    constructor(public payload: string) {}
}

export class SetActiveCalenderId implements Action {
    readonly type = EventAnalysisActionTypes.SET_ACTIVE_CALENDER_ID;

    constructor(public payload: number) {}
}

export class SetSelectedEventAnalysisDate implements Action {
    readonly type = EventAnalysisActionTypes.SET_SELECTED_EVENT_ANALYSIS_DATE;

    constructor(public payload: string[]) {}
}

export class SetEventPlotSeriesVisibility implements Action {
    readonly type = EventAnalysisActionTypes.SET_EVENT_PLOT_SERIES_VISIBILITY;

    constructor(public payload: {[series: string]: boolean}) {}
}


/***************************************************************************** */
/*                          Meta Data Management                               */
/***************************************************************************** */

export class LoadPreprocessingOptions implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_PREPROCESSING_OPTIONS;
}

export class LoadPreprocessingOptionsComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_PREPROCESSING_OPTIONS_COMPLETE;

    constructor(public payload: fromModels.PreprocessOption[]) {}
}

export class LoadPreprocessingOptionsFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_PREPROCESSING_OPTIONS_FAILED;

    constructor(public payload: string) {}
}




export class LoadCustomFunctionSet implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_CUSTOM_FUNCTIONSET;
}

export class LoadCustomFunctionSetComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_CUSTOM_FUNCTIONSET_COMPLETE;

    constructor(public payload: fromModels.customFunctionSet) {}
}

export class LoadCustomFunctionSetFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_CUSTOM_FUNCTIONSET_FAILED;

    constructor(public payload: string) {}
}

/***************************************************************************** */
/*                           Calendar Management                               */
/***************************************************************************** */

export class LoadEventCalendars implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_EVENT_CALENDARS;
}

export class LoadEventCalendarsComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_EVENT_CALENDARS_COMPLETE;

    constructor(public payload: fromModels.ICalendar[]) {}
}

export class LoadEventCalendarsFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_EVENT_CALENDARS_FAILED;

    constructor(public payload: string) {}
}

export class AddEventCalendar implements Action {
    readonly type = EventAnalysisActionTypes.ADD_CALENDAR;

    constructor(public payload: fromModels.ICalendar) { }
}

export class AddEventCalendarComplete implements Action {
    readonly type = EventAnalysisActionTypes.ADD_CALENDAR_COMPLETE;

    constructor(public payload: fromModels.ICalendar) { }
}

export class AddEventCalendarFailed implements Action {
    readonly type = EventAnalysisActionTypes.ADD_CALENDAR_FAILED;

    constructor(public payload: string) { }
}

export class UpdateEventCalendar implements Action {
    readonly type = EventAnalysisActionTypes.UPDATE_CALENDAR;

    constructor(public payload: fromModels.ICalendar) { }
}

export class UpdateEventCalendarComplete implements Action {
    readonly type = EventAnalysisActionTypes.UPDATE_CALENDAR_COMPLETE;

    constructor(public payload: fromModels.ICalendar) { }
}

export class UpdateEventCalendarFailed implements Action {
    readonly type = EventAnalysisActionTypes.UPDATE_CALENDAR_FAILED;

    constructor(public payload: string) { }
}

export class DeleteEventCalendar implements Action {
    readonly type = EventAnalysisActionTypes.DELETE_CALENDAR;

    constructor(public payload: fromModels.ICalendar) { }
}

export class DeleteEventCalendarComplete implements Action {
    readonly type = EventAnalysisActionTypes.DELETE_CALENDAR_COMPLETE;

    constructor(public payload: fromModels.ICalendar) { }
}

export class DeleteEventCalendarFailed implements Action {
    readonly type = EventAnalysisActionTypes.DELETE_CALENDAR_FAILED;

    constructor(public payload: string) { }
}

export class LoadCalendarDates implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_CALENDAR_DATES;

    constructor(public payload: fromModels.ICalendar) { }
}

export class LoadCalendarDatesComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_CALENDAR_DATES_COMPLETE;

    constructor(public payload: {id: number, data: string[]}) { }
}

export class LoadCalendarDatesFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_CALENDAR_DATES_FAILED;

    constructor(public payload: string) { }
}

export class AddCalendarDate implements Action {
    readonly type = EventAnalysisActionTypes.ADD_CALENDAR_DATE;

    constructor(public payload: fromModels.ICalendarDate) { }
}

export class AddCalendarDateComplete implements Action {
    readonly type = EventAnalysisActionTypes.ADD_CALENDAR_DATE_COMPLETE;

    constructor(public payload: {id: number, data: string[]}) { }
}

export class AddCalendarDateFailed implements Action {
    readonly type = EventAnalysisActionTypes.ADD_CALENDAR_DATE_FAILED;

    constructor(public payload: string) { }
}

export class DeleteCalendarDate implements Action {
    readonly type = EventAnalysisActionTypes.DELETE_CALENDAR_DATE;

    constructor(public payload: fromModels.ICalendarDate) { }
}

export class DeleteCalendarDateComplete implements Action {
    readonly type = EventAnalysisActionTypes.DELETE_CALENDAR_DATE_COMPLETE;

    constructor(public payload: {id: number, data: string[]}) { }
}

export class DeleteCalendarDateFailed implements Action {
    readonly type = EventAnalysisActionTypes.DELETE_CALENDAR_DATE_FAILED;

    constructor(public payload: string) { }
}


/***************************************************************************** */
/*                           Analyses Management                               */
/***************************************************************************** */

export class LoadTimeseriesAnalyses implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_TIMESERIES_ANALYSES;
}

export class LoadTimeseriesAnalysesComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_TIMESERIES_ANALYSES_COMPLETE;

    constructor(public payload: fromModels.TimeseriesAnalysis[]) {}
}

export class LoadTimeseriesAnalysesFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_TIMESERIES_ANALYSES_FAILED;

    constructor(public payload: string) {}
}

export class AddTimeseriesAnalysis implements Action {
    readonly type = EventAnalysisActionTypes.ADD_TIMESERIES_ANALYSIS;

    constructor(public payload: fromModels.TimeseriesAnalysis) {}
}

export class AddTimeseriesAnalysisComplete implements Action {
    readonly type = EventAnalysisActionTypes.ADD_TIMESERIES_ANALYSIS_COMPLETE;

    constructor(public payload: fromModels.TimeseriesAnalysis) {}
}

export class AddTimeseriesAnalysisFailed implements Action {
    readonly type = EventAnalysisActionTypes.ADD_TIMESERIES_ANALYSIS_FAILED;

    constructor(public payload: string) {}
}

export class UpdateTimeseriesAnalysis implements Action {
    readonly type = EventAnalysisActionTypes.UPDATE_TIMESERIES_ANALYSIS;

    constructor(public payload: fromModels.TimeseriesAnalysis) { }
}

export class UpdateTimeseriesAnalysisComplete implements Action {
    readonly type = EventAnalysisActionTypes.UPDATE_TIMESERIES_ANALYSIS_COMPLETE;

    constructor(public payload: fromModels.TimeseriesAnalysis) { }
}

export class UpdateTimeseriesAnalysisFailed implements Action {
    readonly type = EventAnalysisActionTypes.UPDATE_TIMESERIES_ANALYSIS_FAILED;

    constructor(public payload: string) { }
}

export class DeleteTimeseriesAnalysis implements Action {
    readonly type = EventAnalysisActionTypes.DELETE_TIMESERIES_ANALYSIS;

    constructor(public payload: string) {}
}

export class DeleteTimeseriesAnalysisComplete implements Action {
    readonly type = EventAnalysisActionTypes.DELETE_TIMESERIES_ANALYSIS_COMPLETE;

    constructor(public payload: string) {}
}

export class DeleteTimeseriesAnalysisFailed implements Action {
    readonly type = EventAnalysisActionTypes.DELETE_TIMESERIES_ANALYSIS_FAILED;

    constructor(public payload: string) {}
}

/***************************************************************************** */
/*                        Configuration Management                             */
/***************************************************************************** */

export class LoadConfiguration implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_CONFIGURATION;

    constructor(public payload: string) {}
}

export class LoadConfigurationComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_CONFIGURATION_COMPLETE;

    constructor(public payload: fromModels.Configuration) {}
}

export class LoadConfigurationFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_CONFIGURATION_FAILED;

    constructor(public payload: {error: string; guid: string}) {}
}

export class AddConfiguration implements Action {
    readonly type = EventAnalysisActionTypes.ADD_CONFIGURATION;

    constructor(public payload: fromModels.Configuration) { }
}

export class AddConfigurationComplete implements Action {
    readonly type = EventAnalysisActionTypes.ADD_CONFIGURATION_COMPLETE;

    constructor(public payload: fromModels.Configuration) { }
}

export class AddConfigurationFailed implements Action {
    readonly type = EventAnalysisActionTypes.ADD_CONFIGURATION_FAILED;

    constructor(public payload: { error: string; guid: string }) { }
}

export class UpdateConfiguration implements Action {
    readonly type = EventAnalysisActionTypes.UPDATE_CONFIGURATION;

    constructor(public payload: fromModels.Configuration) { }
}

export class UpdateConfigurationComplete implements Action {
    readonly type = EventAnalysisActionTypes.UPDATE_CONFIGURATION_COMPLETE;

    constructor(public payload: fromModels.Configuration) { }
}

export class UpdateConfigurationFailed implements Action {
    readonly type = EventAnalysisActionTypes.UPDATE_CONFIGURATION_FAILED;

    constructor(public payload: { error: string; guid: string }) { }
}

/***************************************************************************** */
/*                            Analysis Management                              */
/***************************************************************************** */

export class LoadRawData implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_RAW_DATA;

    constructor(public payload: fromModels.Configuration) { }
}

export class LoadRawDataComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_RAW_DATA_COMPLETE;

    constructor(public payload: {guid: string, data: any}) { }
}

export class LoadRawDataFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_RAW_DATA_FAILED;

    constructor(public payload: { guid: string, error: string }) { }
}

export class LoadPlotData implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_PLOT_DATA;

    constructor(public payload: fromModels.Configuration) { }
}

export class LoadPlotDataComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_PLOT_DATA_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadPlotDataFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_PLOT_DATA_FAILED;

    constructor(public payload: { guid: string, error: string }) { }
}

export class LoadEventAnalysis implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_EVENT_ANALYSIS;

    constructor(public payload: fromModels.Configuration) {}
}

export class LoadEventAnalysisComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_EVENT_ANALYSIS_COMPLETE;

    constructor(public payload: {guid: string; data: fromModels.EventAnalysisResultData}) {}
}

export class LoadEventAnalysisFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_EVENT_ANALYSIS_FAILED;

    constructor(public payload: {guid: string; error: any}) {}
}




export class LoadEventAnalysisMovingAverage implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_EVENT_ANALYSIS_MOVING_AVERAGE;

    constructor(public payload: {data: number[][], name: string, symbol?: string}[]) {}
}

export class LoadEventAnalysisMovingAverageComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_EVENT_ANALYSIS_MOVING_AVERAGE_COMPLETE;

    constructor(public payload: {data: number[][], name: string, symbol?: string}[]) {}
}

export class LoadEventAnalysisMovingAverageFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_EVENT_ANALYSIS_MOVING_AVERAGE_FAILED;

    constructor(public payload: string) {}
}







export class LoadStatistics implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_STATISTICS;

    constructor(public payload: fromModels.Configuration) { }
}

export class LoadStatisticsComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_STATISTICS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadStatisticsFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_STATISTICS_FAILED;

    constructor(public payload: {guid: string, error: string}) { }
}

export class LoadMultiFactorRegressionAnalysis implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_MULTI_FACTOR_REGRESSION_ANALYSIS;

    constructor(public payload: fromModels.Configuration) { }
}

export class LoadMultiFactorRegressionAnalysisComplete implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_MULTI_FACTOR_REGRESSION_ANALYSIS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadMultiFactorRegressionAnalysisFailed implements Action {
    readonly type = EventAnalysisActionTypes.LOAD_MULTI_FACTOR_REGRESSION_ANALYSIS_FAILED;

    constructor(public payload: { guid: string, error: string }) { }
}

export type EventAnalysisActions
    = LoadPreprocessingOptions
    | LoadPreprocessingOptionsComplete
    | LoadPreprocessingOptionsFailed

    | LoadCustomFunctionSet
    | LoadCustomFunctionSetComplete
    | LoadCustomFunctionSetFailed

    // Calendars
    | LoadEventCalendars
    | LoadEventCalendarsComplete
    | LoadEventCalendarsFailed

    | AddEventCalendar
    | AddEventCalendarComplete
    | AddEventCalendarFailed

    | UpdateEventCalendar
    | UpdateEventCalendarComplete
    | UpdateEventCalendarFailed

    | DeleteEventCalendar
    | DeleteEventCalendarComplete
    | DeleteEventCalendarFailed

    | LoadCalendarDates
    | LoadCalendarDatesComplete
    | LoadCalendarDatesFailed

    | AddCalendarDate
    | AddCalendarDateComplete
    | AddCalendarDateFailed

    | DeleteCalendarDate
    | DeleteCalendarDateComplete
    | DeleteCalendarDateFailed

    // Analyses
    | LoadTimeseriesAnalyses
    | LoadTimeseriesAnalysesComplete
    | LoadTimeseriesAnalysesFailed

    | AddTimeseriesAnalysis
    | AddTimeseriesAnalysisComplete
    | AddTimeseriesAnalysisFailed

    | UpdateTimeseriesAnalysis
    | UpdateTimeseriesAnalysisComplete
    | UpdateTimeseriesAnalysisFailed

    | DeleteTimeseriesAnalysis
    | DeleteTimeseriesAnalysisComplete
    | DeleteTimeseriesAnalysisFailed

    // Configurations
    | LoadConfiguration
    | LoadConfigurationComplete
    | LoadConfigurationFailed

    | AddConfiguration
    | AddConfigurationComplete
    | AddConfigurationFailed

    | UpdateConfiguration
    | UpdateConfigurationComplete
    | UpdateConfigurationFailed

    // Analysis
    | LoadRawData
    | LoadRawDataComplete
    | LoadRawDataFailed

    | LoadPlotData
    | LoadPlotDataComplete
    | LoadPlotDataFailed

    | LoadEventAnalysis
    | LoadEventAnalysisComplete
    | LoadEventAnalysisFailed

    | LoadStatistics
    | LoadStatisticsComplete
    | LoadStatisticsFailed

    | LoadMultiFactorRegressionAnalysis
    | LoadMultiFactorRegressionAnalysisComplete
    | LoadMultiFactorRegressionAnalysisFailed

    | LoadEventAnalysisMovingAverage
    | LoadEventAnalysisMovingAverageComplete
    | LoadEventAnalysisMovingAverageFailed

    // UI action
    | SetActiveGuid
    | SetActiveCalenderId
    | SetSelectedEventAnalysisDate
    | SetEventPlotSeriesVisibility;

