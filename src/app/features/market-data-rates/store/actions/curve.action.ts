
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum CurveActionTypes {

    LOAD_CURVE_PREPROCESS = '[Market Data Rates] load curve preprocess',
    LOAD_CURVE = '[Market Data Rates] load curve',
    LOAD_CURVE_COMPLETE = '[Market Data Rates] load curve complete',
    LOAD_CURVE_FAILED = '[Market Data Rates] load curve failed',

}

export class LoadCurvePreprocess {
    readonly type = CurveActionTypes.LOAD_CURVE_PREPROCESS;
}

export class LoadCurve {
    readonly type = CurveActionTypes.LOAD_CURVE;
}

export class LoadCurveComplete {
    readonly type = CurveActionTypes.LOAD_CURVE_COMPLETE;

    constructor(public payload: {date: string; result: any}) {}
}

export class LoadCurveFailed {
    readonly type = CurveActionTypes.LOAD_CURVE_FAILED;

    constructor(public payload: string) {}
}

export type CurveActions
    = LoadCurve
    | LoadCurveComplete
    | LoadCurveFailed
    | LoadCurvePreprocess;
