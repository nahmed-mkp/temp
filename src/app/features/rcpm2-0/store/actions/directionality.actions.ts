import { Action } from '@ngrx/store';

import * as fromModels from './../../models/directionality.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum DirectionalityActionTypes {

    // UI ------------------------------------------------------------------

    SET_SELECTED_LOOKBACK = '[Directionality] set selected lookback',
    SET_ACTIVE_TAB_INDEX = '[Directionality] set active tab index',
    SET_GRID_CLEARING = '[Directionality] set grid clearing',
    SET_DISPLAY_MODE = '[Directionality] set display mode',

    // Data loading -------------------------------------------------------------------------

    LOAD_DIRECTIONALITY_INPUTS = '[Directionality] Load directionality Inputs',
    LOAD_DIRECTIONALITY_INPUTS_COMPLETE = '[Directionality] Load directionality Inputs complete',
    LOAD_DIRECTIONALITY_INPUTS_FAILED = '[Directionality] Load directionality Inputs failed',

    LOAD_DIRECTIONALITY = '[Directionality] Load directionality',
    LOAD_DIRECTIONALITY_COMPLETE = '[Directionality] Load directionality complete',
    LOAD_DIRECTIONALITY_FAILED = '[Directionality] Load directionality failed',

    LOAD_SCATTER_PLOT = '[Directionality] Load scatter plot',
    LOAD_SCATTER_PLOT_COMPLETE = '[Directionality] Load scatter plot complete',
    LOAD_SCATTER_PLOT_FAILED = '[Directionality] Load scatter plot failed',





    LOAD_REGRESSION_FACTORS = '[Directionality] Load regression factors',
    LOAD_REGRESSION_FACTORS_COMPLETE = '[Directionality] Load regression factors complete',
    LOAD_REGRESSION_FACTORS_FAILED = '[Directionality] Load regression factors failed',

    RUN_REGRESSION = '[Directionality] run regression',
    RUN_REGRESSION_COMPLETE = '[Directionality] run regression complete',
    RUN_REGRESSION_FAILED = '[Directionality] run regression failed',

}


export class SetSelectedLookback {
    readonly type = DirectionalityActionTypes.SET_SELECTED_LOOKBACK;

    constructor(public payload: string[], public layoutName: string) {}
}

export class SetDirectionalityActiveTabIndex {
    readonly type = DirectionalityActionTypes.SET_ACTIVE_TAB_INDEX;

    constructor(public payload: number, public layoutName: string) {}
}

export class SetDirectionalityGridClearing {
    readonly type = DirectionalityActionTypes.SET_GRID_CLEARING;

    constructor(public payload: boolean, public layoutName: string) {}
}

export class SetDirectionalityDisplayMode {
    readonly type = DirectionalityActionTypes.SET_DISPLAY_MODE;

    constructor(public payload: string, public layoutName: string) {}
}













export class LoadDirectionalityInputs {
    readonly type = DirectionalityActionTypes.LOAD_DIRECTIONALITY_INPUTS;

    // constructor(public layoutName: string) {}
}

export class LoadDirectionalityInputsComplete {
    readonly type = DirectionalityActionTypes.LOAD_DIRECTIONALITY_INPUTS_COMPLETE;

    // constructor(public payload: fromModels.DirectionalityInputs, public layoutName: string) {}
    constructor(public payload: fromModels.DirectionalityInputs) {}
}

export class LoadDirectionalityInputsFailed {
    readonly type = DirectionalityActionTypes.LOAD_DIRECTIONALITY_INPUTS_FAILED;

    // constructor(public payload: any, public layoutName: string) {}
    constructor(public payload: string) {}
}







export class LoadDirectionality {
    readonly type = DirectionalityActionTypes.LOAD_DIRECTIONALITY;
    constructor(public payload: fromModels.DirectionalityRequest, public layoutName: string) { }
}

export class LoadDirectionalityComplete {
    readonly type = DirectionalityActionTypes.LOAD_DIRECTIONALITY_COMPLETE;
    constructor(public payload: any, public layoutName: string) { }
}

export class LoadDirectionalityFailed {
    readonly type = DirectionalityActionTypes.LOAD_DIRECTIONALITY_FAILED;
    constructor(public payload: any, public layoutName: string) { }
}







export class LoadScatterPlot {
    readonly type = DirectionalityActionTypes.LOAD_SCATTER_PLOT;

    constructor(public payload: fromModels.ScatterPlotRequest, public layoutName: string, public lookback: string, public lookbackIndex: string) { }
}

export class LoadScatterPlotComplete {
    readonly type = DirectionalityActionTypes.LOAD_SCATTER_PLOT_COMPLETE;

    constructor(public payload: any, public layoutName: string,  public lookback: string, public lookbackIndex: string) { }
}

export class LoadScatterPlotFailed {
    readonly type = DirectionalityActionTypes.LOAD_SCATTER_PLOT_FAILED;
    constructor(public payload: any, public layoutName: string,  public lookback: string, public lookbackIndex: string) { }
}








export class LoadRegressionFactors {
    readonly type = DirectionalityActionTypes.LOAD_REGRESSION_FACTORS;
}

export class LoadRegressionFactorsComplete {
    readonly type = DirectionalityActionTypes.LOAD_REGRESSION_FACTORS_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadRegressionFactorsFailed {
    readonly type = DirectionalityActionTypes.LOAD_REGRESSION_FACTORS_FAILED;

    constructor(public payload: string) {}
}

export class RunRegression {
    readonly type = DirectionalityActionTypes.RUN_REGRESSION;
    
    constructor(public payload: fromModels.regressionRequest, public layoutName: string, ) {}
}

export class RunRegressionComplete {
    readonly type = DirectionalityActionTypes.RUN_REGRESSION_COMPLETE;

    constructor(public payload: any, public layoutName: string) {}
}

export class RunRegressionFailed {
    readonly type = DirectionalityActionTypes.RUN_REGRESSION_FAILED;

    constructor(public payload: string, public layoutName: string) {}
}

export type DirectionalityActions
    = SetSelectedLookback
    | SetDirectionalityActiveTabIndex
    | SetDirectionalityGridClearing
    | SetDirectionalityDisplayMode

    | LoadDirectionalityInputs
    | LoadDirectionalityInputsComplete
    | LoadDirectionalityInputsFailed

    | LoadDirectionality
    | LoadDirectionalityComplete
    | LoadDirectionalityFailed

    | LoadScatterPlot
    | LoadScatterPlotComplete
    | LoadScatterPlotFailed
    
    | LoadRegressionFactors
    | LoadRegressionFactorsComplete
    | LoadRegressionFactorsFailed
    
    | RunRegression
    | RunRegressionComplete
    | RunRegressionFailed;
