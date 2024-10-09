import { Action } from '@ngrx/store';

import * as fromModels from './../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AgencyPortfolioActionTypes {

    // UI Action
    SET_ACTIVE_REQUEST = '[AgencyPortfolio] Set active request',
    SET_ACTIVE_AS_OF_DATE = '[AgencyPortfolio] Set active as of date',
    SET_ACTIVE_LAYOUT = '[AgencyPortfolio] Set active layout',
    SET_ACTIVE_TAB = '[AgencyPortfolio] Set active tab',
    TOOGLE_BAR_CHART = '[AgencyPortfolio] Toogle bar chart',
    SET_GLOBAL_TEXT_FILTER = '[AgencyPortfolio] set global text filter',
    SET_COLUMNS_SEARCH_DICT = '[AgencyPortfolio] set columns search dict',
    SET_TARGET_COLUMN = '[AgencyPortfolio] set target column',
    ALLOW_LOADING_DISPLAY = '[AgencyPortfolio] allow loading display',

    // LOAD_POSITIONS = '[AgencyPortfolio] Load Positions',
    LOAD_POSITIONS_COMPLETE = '[AgencyPortfolio] Load Positions Complete',
    LOAD_POSITIONS_FAILED = '[AgencyPortfolio] Load Positions Failed',

    // LOAD_SECURITIES = '[AgencyPortfolio] Load Securities',
    LOAD_SECURITIES_COMPLETE = '[AgencyPortfolio] Load Securities Complete',
    LOAD_SECURITIES_FAILED = '[AgencyPortfolio] Load Securities Failed',

    // LOAD_BENCHMARKS = '[AgencyPortfolio] Load Benchmarks',
    LOAD_BENCHMARKS_COMPLETE = '[AgencyPortfolio] Load Benchmarks Complete',
    LOAD_BENCHMARKS_FAILED = '[AgencyPortfolio] Load Benchmarks Failed',

    // LOAD_ROLLS = '[AgencyPortfolio] Load Benchmarks',
    LOAD_ROLLS_COMPLETE = '[AgencyPortfolio] Load rolls Complete',
    LOAD_ROLLS_FAILED = '[AgencyPortfolio] Load rolls Failed',

    LOAD_DATA = '[AgencyPortfolio] Load Data',
    LOAD_DATA_COMPLETE = '[AgencyPortfolio] Load Data Complete',
    LOAD_DATA_FAILED = '[AgencyPortfolio] Load Data Failed',

    LOAD_LAYOUT = '[AgencyPortfolio] load layout',
    LOAD_LAYOUT_COMPLETE = '[AgencyPortfolio] load layout complete',
    LOAD_LAYOUT_FAILED = '[AgencyPortfolio] load layout failed',

    SAVE_LAYOUT = '[AgencyPortfolio] Save Layout',
    SAVE_LAYOUT_COMPLETE = '[AgencyPortfolio] Save Layout complete',
    SAVE_LAYOUT_FAILED = '[AgencyPortfolio] Save Layout failed',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class SetActiveRequest implements Action {
    readonly type = AgencyPortfolioActionTypes.SET_ACTIVE_REQUEST;

    constructor(public payload: string) { }
}

export class SetActiveAsOfDate implements Action {
    readonly type = AgencyPortfolioActionTypes.SET_ACTIVE_AS_OF_DATE;

    constructor(public payload: string) { }
}

export class SetActiveLayout implements Action {
    readonly type = AgencyPortfolioActionTypes.SET_ACTIVE_LAYOUT;

    constructor(public payload: {category: string; name:string}) { }
}

export class SetActiveTab implements Action {
    readonly type = AgencyPortfolioActionTypes.SET_ACTIVE_TAB;

    constructor(public payload: string) {}
}




export class ToogleBarChart implements Action {
    readonly type = AgencyPortfolioActionTypes.TOOGLE_BAR_CHART;

    constructor(public payload: boolean) {}
}

export class SetGlobalTextFilter implements Action {
    readonly type = AgencyPortfolioActionTypes.SET_GLOBAL_TEXT_FILTER;

     constructor(public payload: string) {}
}

export class SetColumnsSearchDict implements Action {
    readonly type = AgencyPortfolioActionTypes.SET_COLUMNS_SEARCH_DICT;

    constructor(public payload: {[category: string]: string[]}) {}
}

export class SetTargetColumn implements Action {
    readonly type = AgencyPortfolioActionTypes.SET_TARGET_COLUMN;

    constructor(public payload: string) {}
}

export class AllowLoadingDisplay implements Action {
    readonly type = AgencyPortfolioActionTypes.ALLOW_LOADING_DISPLAY;

    constructor(public payload: boolean) {}
}


// export class LoadPositions implements Action {
//     readonly type = AgencyPortfolioActionTypes.LOAD_POSITIONS;

//     constructor(public payload: fromModels.AgencyPortfolioRequest) { }
// }

export class LoadPositionsComplete implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_POSITIONS_COMPLETE;

    constructor(public payload: {date: string, data:fromModels.Position[]}) { }
}

export class LoadPositionsFailed implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_POSITIONS_FAILED;

    constructor(public payload?: string) { }
}

// export class LoadSecurities implements Action {
//     readonly type = AgencyPortfolioActionTypes.LOAD_SECURITIES;

//     constructor(public payload: fromModels.AgencyPortfolioRequest) { }
// }

export class LoadSecuritiesComplete implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_SECURITIES_COMPLETE;

    constructor(public payload: {date: string, data: fromModels.Security[]}) { }
}

export class LoadSecuritiesFailed implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_SECURITIES_FAILED;

    constructor(public payload?: string) { }
}

// export class LoadBenchmarks implements Action {
//     readonly type = AgencyPortfolioActionTypes.LOAD_BENCHMARKS;

//     constructor(public payload: fromModels.AgencyPortfolioRequest) { }
// }

export class LoadBenchmarksComplete implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_BENCHMARKS_COMPLETE;

    constructor(public payload: {date: string, data: fromModels.Benchmark[]}) { }
}

export class LoadBenchmarksFailed implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_BENCHMARKS_FAILED;

    constructor(public payload?: string) { }
}




export class LoadRollsComplete implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_ROLLS_COMPLETE;

    constructor(public payload: {date: string, data: any}) { }
}

export class LoadRollsFailed implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_ROLLS_FAILED;

    constructor(public payload?: string) { }
}




export class LoadData implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_DATA;

    constructor(public payload: fromModels.AgencyPortfolioRequest) {}
}



export class Loadlayout implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_LAYOUT;
}

export class LoadlayoutComplete implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_LAYOUT_COMPLETE;

    constructor(public payload: fromModels.Layout[]) {}
}

export class LoadlayoutFailed implements Action {
    readonly type = AgencyPortfolioActionTypes.LOAD_LAYOUT_FAILED;

    constructor(public payload: string) {}
}



export class SaveLayout implements Action {
    readonly type = AgencyPortfolioActionTypes.SAVE_LAYOUT;

    constructor(public payload: fromModels.Layout) {}
}

export class SaveLayoutComplete implements Action {
    readonly type = AgencyPortfolioActionTypes.SAVE_LAYOUT_COMPLETE;

    constructor(public payload: fromModels.Layout) {}
}

export class SaveLayoutFailed implements Action {
    readonly type = AgencyPortfolioActionTypes.SAVE_LAYOUT_FAILED;

    constructor(public payload: string) {}
}






/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AgencyPortfolioActions
    = SetActiveRequest 
    | SetActiveAsOfDate
    | SetActiveLayout
    | SetActiveTab
    | ToogleBarChart
    | SetGlobalTextFilter
    | SetColumnsSearchDict
    | SetTargetColumn
    | AllowLoadingDisplay

    // | LoadPositions
    | LoadPositionsComplete
    | LoadPositionsFailed

    // | LoadSecurities
    | LoadSecuritiesComplete
    | LoadSecuritiesFailed

    // | LoadBenchmarks
    | LoadBenchmarksComplete
    | LoadBenchmarksFailed

    // | LoadRools
    | LoadRollsComplete
    | LoadRollsFailed
    
    | LoadData
    
    | SaveLayout
    | SaveLayoutComplete
    | SaveLayoutFailed

    | Loadlayout
    | LoadlayoutComplete
    | LoadlayoutFailed
    ;
