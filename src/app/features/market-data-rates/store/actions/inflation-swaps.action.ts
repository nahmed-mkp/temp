/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

 export enum InflationSwapsActionTypes {
    LOAD_INFLATION_SWAPS = '[Market Data Rates] load inflation swaps',
    LOAD_INFLATION_SWAPS_COMPLETE = '[Market Data Rates] load inflation swaps complete',
    LOAD_INFLATION_SWAPS_FAILED = '[Market Data Rates] load inflation swaps failed',

    LOAD_INFLATION_SWAPS_DATA_POINTS = '[Market Data Rates] load inflation swaps plot data points',
    LOAD_INFLATION_SWAPS_DATA_POINTS_COMPLETE = '[Market Data Rates] load inflation swaps data points complete',
    LOAD_INFLATION_SWAPS_DATA_POINTS_FAILED = '[Market Data Rates] load inflation swaps data points failed',
 }

export class LoadInflationSwaps {
    readonly type = InflationSwapsActionTypes.LOAD_INFLATION_SWAPS;
}

export class LoadInflationSwapsComplete {
    readonly type = InflationSwapsActionTypes.LOAD_INFLATION_SWAPS_COMPLETE;
    constructor(public payload) {}
}

export class LoadInflationSwapsFailed {
    readonly type = InflationSwapsActionTypes.LOAD_INFLATION_SWAPS_FAILED;
    constructor(public payload: string) {}
}

export class LoadInflationSwapsDataPoints {
    readonly type = InflationSwapsActionTypes.LOAD_INFLATION_SWAPS_DATA_POINTS;
}

export class LoadInflationSwapsDataPointsComplete {
    readonly type = InflationSwapsActionTypes.LOAD_INFLATION_SWAPS_DATA_POINTS_COMPLETE;
    constructor(public payload) {}
}

export class LoadInflationSwapsDataPointsFailed {
    readonly type = InflationSwapsActionTypes.LOAD_INFLATION_SWAPS_DATA_POINTS_FAILED;
    constructor(public payload: string) {}
}

export type InflationSwapsActions
    = LoadInflationSwaps
    | LoadInflationSwapsComplete
    | LoadInflationSwapsFailed
    | LoadInflationSwapsDataPoints
    | LoadInflationSwapsDataPointsComplete
    | LoadInflationSwapsDataPointsFailed;
