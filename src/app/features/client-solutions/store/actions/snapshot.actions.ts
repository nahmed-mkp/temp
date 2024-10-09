import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum SnapshotActionTypes {

    LOAD_SNAPSHOT_MONTH_END_DATES = '[ClientSolutions-Snapshots] Load month end dates',
    LOAD_SNAPSHOT_MONTH_END_DATES_COMPLETE = '[ClientSolutions-Snapshots] Load month end dates complete',
    LOAD_SNAPSHOT_MONTH_END_DATES_FAILED = '[ClientSolutions-Snapshots] Load month end dates failed',

    LOAD_SNAPSHOT_GROUPINGS = '[ClientSolutions-Snapshots] Load snapshot groupings',
    LOAD_SNAPSHOT_GROUPINGS_COMPLETE = '[ClientSolutions-Snapshots] Load snapshot groupings complete',
    LOAD_SNAPSHOT_GROUPINGS_FAILED = '[ClientSolutions-Snapshots] Load snapshot groupings failed',

    LOAD_ENTITIES_NAME_MAP = '[ClientSolutions-Snapshots] Load entities name map',
    LOAD_ENTITIES_NAME_MAP_COMPLETE = '[ClientSolutions-Snapshots] Load entities name map complete',
    LOAD_ENTITIES_NAME_MAP_FAILED = '[ClientSolutions-Snapshots] Load entities name map failed',

    PARAM_CHANGED = '[ClientSolutions-Snapshots] Parameter changed',

    LOAD_SNAPSHOT_SUMMARY_STATS = '[ClientSolutions-Snapshots] Load summary stats',
    LOAD_SNAPSHOT_SUMMARY_STATS_COMPLETE = '[ClientSolutions-Snapshots] Load summary stats complete',
    LOAD_SNAPSHOT_SUMMARY_STATS_FAILED = '[ClientSolutions-Snapshots] Load summary stats failed',

    LOAD_SNAPSHOT_CORRELATION_MATRIX = '[ClientSolutions-Snapshots] Load correlation matrix',
    LOAD_SNAPSHOT_CORRELATION_MATRIX_COMPLETE = '[ClientSolutions-Snapshots] Load correlation matrix complete',
    LOAD_SNAPSHOT_CORRELATION_MATRIX_FAILED = '[ClientSolutions-Snapshots] Load correlation matrix failed',

    LOAD_SNAPSHOT_DATA = '[ClientSolutions-Snapshots] Load snapshot data',
    LOAD_SNAPSHOT_DATA_COMPLETE = '[ClientSolutions-Snapshots] Load snapshot data complete',
    LOAD_SNAPSHOT_DATA_FAILED = '[ClientSolutions-Snapshots] Load snapshot data failed'
}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */


export class LoadSnapshotMonthEndDates implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_MONTH_END_DATES;
}

export class LoadSnapshotMonthEndDatesComplete implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_MONTH_END_DATES_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadSnapshotMonthEndDatesFailed implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_MONTH_END_DATES_FAILED;

    constructor(public payload: string) { }
}

export class LoadSnapshotGroupings implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_GROUPINGS;
}

export class LoadSnapshotGroupingsComplete implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_GROUPINGS_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadSnapshotGroupingsFailed implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_GROUPINGS_FAILED;

    constructor(public payload: string) { }
}


export class LoadSnapshotEntitiesNameMap implements Action {
    readonly type = SnapshotActionTypes.LOAD_ENTITIES_NAME_MAP;
}

export class LoadSnapshotEntitiesNameMapComplete implements Action {
    readonly type = SnapshotActionTypes.LOAD_ENTITIES_NAME_MAP_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadSnapshotEntitiesNameMapFailed implements Action {
    readonly type = SnapshotActionTypes.LOAD_ENTITIES_NAME_MAP_FAILED;

    constructor(public payload: string) { }
}

export class SnapshotParameterChanged implements Action {
    readonly type = SnapshotActionTypes.PARAM_CHANGED;

    constructor(public payload: fromModels.ISnapshotParameter) { }
}

export class LoadSnapshotSummaryStats implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_SUMMARY_STATS;

    constructor(public payload: fromModels.ISnapshotParameter) { }
}

export class LoadSnapshotSummaryStatsComplete implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_SUMMARY_STATS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadSnapshotSummaryStatsFailed implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_SUMMARY_STATS_FAILED;

    constructor(public payload: string) { }
}

export class LoadSnapshotCorrelationMatrix implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_CORRELATION_MATRIX;

    constructor(public payload: fromModels.ISnapshotParameter) { }
}

export class LoadSnapshotCorrelationMatrixComplete implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_CORRELATION_MATRIX_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadSnapshotCorrelationMatrixFailed implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_CORRELATION_MATRIX_FAILED;

    constructor(public payload: string) { }
}


export class LoadSnapshotData implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_DATA;

    constructor(public payload: fromModels.ISnapshotParameter) { }
}

export class LoadSnapshotDataComplete implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_DATA_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadSnapshotDataFailed implements Action {
    readonly type = SnapshotActionTypes.LOAD_SNAPSHOT_DATA_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SnapshotActions
    = LoadSnapshotMonthEndDates
    | LoadSnapshotMonthEndDatesComplete
    | LoadSnapshotMonthEndDatesFailed

    | LoadSnapshotGroupings
    | LoadSnapshotGroupingsComplete
    | LoadSnapshotGroupingsFailed

    | LoadSnapshotEntitiesNameMap
    | LoadSnapshotEntitiesNameMapComplete
    | LoadSnapshotEntitiesNameMapFailed

    | SnapshotParameterChanged

    | LoadSnapshotSummaryStats
    | LoadSnapshotSummaryStatsComplete
    | LoadSnapshotSummaryStatsFailed

    | LoadSnapshotCorrelationMatrix
    | LoadSnapshotCorrelationMatrixComplete
    | LoadSnapshotCorrelationMatrixFailed

    | LoadSnapshotData
    | LoadSnapshotDataComplete
    | LoadSnapshotDataFailed;
