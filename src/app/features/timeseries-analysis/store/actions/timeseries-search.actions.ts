import { Action } from '@ngrx/store';

import * as fromModels from './../../models/timeseries.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum TimeseriesSearchActionTypes {

    LOAD_SOURCES = '[TimeseriesSearch] Load sources',
    LOAD_SOURCES_COMPLETE = '[TimeseriesSearch] Load sources complete',
    LOAD_SOURCES_FAILED = '[TimeseriesSearch] Load sources failed',

    CREATE_USER_CHART = '[TimeseriesSearch] Create user chart',
    CREATE_USER_CHART_COMPLETE = '[TimeseriesSearch] Create user chart complete',
    CREATE_USER_CHART_FAILED = '[TimeseriesSearch] Create user chart failed',

    UPDATE_USER_CHART = '[TimeseriesSearch] Update user chart',
    UPDATE_USER_CHART_COMPLETE = '[TimeseriesSearch] Update user chart complete',
    UPDATE_USER_CHART_FAILED = '[TimeseriesSearch] Update user chart failed',

    DELETE_USER_CHART = '[TimeseriesSearch] Delete user chart',
    DELETE_USER_CHART_COMPLETE = '[TimeseriesSearch] Delete user chart complete',
    DELETE_USER_CHART_FAILED = '[TimeseriesSearch] Delete user chart failed',

    SEARCH_TIMESERIES = '[TimeseriesSearch] Search timeseries',
    SEARCH_TIMESERIES_COMPLETE = '[TimeseriesSearch] Search timeseries complete',
    SEARCH_TIMESERIES_FAILED = '[TimeseriesSearch] Search timeseries failed',

    PREVIEW_TIMESERIES = '[TimeseriesSearch] Preview timeseries',
    PREVIEW_TIMESERIES_COMPLETE = '[TimeseriesSearch] Preview timeseries complete',
    PREVIEW_TIMESERIES_FAILED = '[TimeseriesSearch] Preview timeseries failed'

};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class LoadSources implements Action {
    readonly type = TimeseriesSearchActionTypes.LOAD_SOURCES;
}

export class LoadSourcesComplete implements Action {
    readonly type = TimeseriesSearchActionTypes.LOAD_SOURCES_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadSourcesFailed implements Action {
    readonly type = TimeseriesSearchActionTypes.LOAD_SOURCES_FAILED;

    constructor(public payload: string) { }
}


export class SearchTimeseries implements Action {
    readonly type = TimeseriesSearchActionTypes.SEARCH_TIMESERIES;

    constructor(public payload: fromModels.ITimeseriesSearch) { }
}

export class SearchTimeseriesComplete implements Action {
    readonly type = TimeseriesSearchActionTypes.SEARCH_TIMESERIES_COMPLETE;

    constructor(public payload: fromModels.ITimeseries[]) { }
}

export class SearchTimeseriesFailed implements Action {
    readonly type = TimeseriesSearchActionTypes.SEARCH_TIMESERIES_FAILED;

    constructor(public payload: string) { }
}


export class PreviewTimeseries implements Action {
    readonly type = TimeseriesSearchActionTypes.PREVIEW_TIMESERIES;

    constructor(public payload: fromModels.ITimeseries) { }
}

export class PreviewTimeseriesComplete implements Action {
    readonly type = TimeseriesSearchActionTypes.PREVIEW_TIMESERIES_COMPLETE;

    constructor(public payload: fromModels.ITimeseriesPreview) { }
}

export class PreviewTimeseriesFailed implements Action {
    readonly type = TimeseriesSearchActionTypes.PREVIEW_TIMESERIES_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TimeseriesSearchActions
    = LoadSources
    | LoadSourcesComplete
    | LoadSourcesFailed

    | SearchTimeseries
    | SearchTimeseriesComplete
    | SearchTimeseriesFailed
    
    | PreviewTimeseries
    | PreviewTimeseriesComplete
    | PreviewTimeseriesFailed;

