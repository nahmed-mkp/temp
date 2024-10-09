import { Action } from '@ngrx/store';

import * as fromModels from './../../models/pool-viewer.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PoolViewerActionTypes {

    LOAD_POOL_VIEWER_INFO = '[PoolViewer] Load pool viewer info',
    LOAD_POOL_VIEWER_INFO_COMPLETE = '[PoolViewer] Load pool viewer info complete',
    LOAD_POOL_VIEWER_INFO_FAILED = '[PoolViewer] Load pool viewer info failed',

    LOAD_POOL_VIEWER_ITEMS = '[PoolViewer] Load pool viewer items',
    LOAD_POOL_VIEWER_ITEMS_COMPLETE = '[PoolViewer] Load pool viewer items complete',
    LOAD_POOL_VIEWER_ITEMS_FAILED = '[PoolViewer] Load pool viewer items failed',

    ADD_POOL_VIEWER_ITEM = '[PoolViewer] Add pool viewer item',
    ADD_POOL_VIEWER_ITEM_COMPLETE = '[PoolViewer] Add pool viewer item complete',
    ADD_POOl_VIEWER_ITEM_FAILED = '[PoolViewer] ADd pool viewer item failed',

    UPDATE_POOL_VIEWER_ITEM = '[PoolViewer] Update pool viewer item',
    UPDATE_POOL_VIEWER_ITEM_COMPLETE = '[PoolViewer] Update pool viewer item complete',
    UPDATE_POOl_VIEWER_ITEM_FAILED = '[PoolViewer] Update pool viewer item failed',

    DELETE_POOL_VIEWER_ITEM = '[PoolViewer] Delete pool viewer item',
    DELETE_POOL_VIEWER_ITEM_COMPLETE = '[PoolViewer] Delete pool viewer item complete',
    DELETE_POOl_VIEWER_ITEM_FAILED = '[PoolViewer] Delete pool viewer item failed',

    LOAD_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT = '[PoolViewer] Load pool viewer items grid table columns layout',
    LOAD_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_COMPLETE = '[PoolViewer] Load pool viewer items grid table columns layout completed',
    LOAD_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_FAILED = '[PoolViewer] Load pool viewer items grid table columns layout failed',

    SAVE_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT = '[PoolViewer] Save pool viewer items grid table columns layout',
    SAVE_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_COMPLETE = '[PoolViewer] Save pool viewer items grid table columns layout completed',
    SAVE_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_FAILED = '[PoolViewer] Save pool viewer items grid table columns layout failed',

    LOAD_POOL_VIEWER_ITEMS_GROUPINGS = '[PoolViewer] Load pool viewer items groupings',
    LOAD_POOL_VIEWER_ITEMS_GROUPINGS_COMPLETE = '[PoolViewer] Load pool viewer items groupings complete',
    LOAD_POOL_VIEWER_ITEMS_GROUPINGS_FAIL =  '[PoolViewer] Load pool viewer items groupings fail',

    SAVE_POOL_VIEWER_ITEMS_GROUPING = '[PoolViewer] Save pool viewer items grouping',
    SAVE_POOL_VIEWER_ITEMS_GROUPING_COMPLETE = '[PoolViewer] Save pool viewer items grouping complete',
    SAVE_POOL_VIEWER_ITEMS_GROUPING_FAIL =  '[PoolViewer] Save pool viewer items grouping fail',


    LOAD_POOL_VIEWER_CONFIGURAIONS = '[PoolViewer] Load pool viewer configurations',
    LOAD_POOL_VIEWER_CONFIGURAIONS_COMPLETE = '[PoolViewer] Load pool viewer configurations complete',
    LOAD_POOL_VIEWER_CONFIGURAIONS_FAILED = '[PoolViewer] Load pool viewer configurations failed',

    LOAD_PORTFOLIO_YIELDBOOK_RESULT = '[PoolViewer] Load Portfolio yieldbook result',
    LOAD_PORTFOLIO_YIELDBOOK_RESULT_COMPLETE = '[PoolViewer] Load Portfolio yieldbook result complete',
    LOAD_PORTFOLIO_YIELDBOOK_RESULT_FAILED = '[PoolViewer] Load Portfolio yieldbook result failed',

    RELOAD_PORTFOLIO_YIELDBOOK_RESULT = '[PoolViewer] Reload Portfolio yieldbook result',
    RELOAD_PORTFOLIO_YIELDBOOK_RESULT_COMPLETE = '[PoolViewer] Reload Portfolio yieldbook result complete',
    RELOAD_PORTFOLIO_YIELDBOOK_RESULT_FAILED = '[PoolViewer] Reload Portfolio yieldbook result failed',

    // UI Action
    UPDATE_POOL_VIEWER_GRID_SIZE = '[Pool Viewer Ui] Update the overall gird size of the pool viewer'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class UpdatePoolViewerGridSize implements Action {
    readonly type = PoolViewerActionTypes.UPDATE_POOL_VIEWER_GRID_SIZE;

    constructor(public payload: string) { }
}


export class LoadPoolViewerInfo implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_INFO;

    constructor(public payload: fromModels.Portfolio) { }
}

export class LoadPoolViewerInfoComplete implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_INFO_COMPLETE;

    constructor(public payload: fromModels.PoolViewerInfo) { }
}

export class LoadPoolViewerInfoFailed implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_INFO_FAILED;

    constructor(public payload: string) { }
}






export class LoadPoolViewerItems implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS;

    constructor(public payload: fromModels.PoolViewerInfo) { }
}

export class LoadPoolViewerItemsComplete implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_COMPLETE;

    constructor(public payload: {portfolioId: string | number; securities: fromModels.Security[]}) { }
}

export class LoadPoolViewerItemsFailed implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_FAILED;

    constructor(public payload: string) { }
}


// ------------------------------ Column Layout Action ---------------------------------------


export class LoadPoolViewerItemsColumnsLayout implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT;
}

export class LoadPoolViewerItemsColumnsLayoutComplete implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_COMPLETE;

    constructor(public payload: fromModels.PoolItemsGridColumnLayout[]) {}
}

export class LoadPoolViewerItemsColumnsLayoutFailed implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_FAILED;

    constructor(public payload: string) {}
}



export class SavePoolViewerItemsColumnsLayout implements Action {
    readonly type = PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT;

    constructor(public payload: fromModels.PoolItemsGridColumnLayout) {}
}

export class SavePoolViewerItemsColumnsLayoutComplete implements Action {
    readonly type = PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_COMPLETE;

    constructor(public payload: fromModels.PoolItemsGridColumnLayout) {}
}

export class SavePoolViewerItemsColumnsLayoutFailed implements Action {
    readonly type = PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_FAILED;

    constructor(public payload: string) {}
}




// ---------------------------- Grid Item Grouping Action -----------------------------------


export class LoadPoolViewerItemsGroupings implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_GROUPINGS;
}

export class LoadPoolViewerItemsGroupingsComplete implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_GROUPINGS_COMPLETE;

    constructor(public payload: fromModels.PoolItemGridRowGrouping[]) {}
}

export class LoadPoolViewerItemsGroupingsFailed implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_GROUPINGS_FAIL;

    constructor(public payload: string) {}
}


export class SavePoolViewerItemsGrouping implements Action {
    readonly type = PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_GROUPING;

    constructor(public payload: fromModels.PoolItemGridRowGrouping) {}
}

export class SavePoolViewerItemsGroupingComplete implements Action {
    readonly type = PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_GROUPING_COMPLETE;

    constructor(public payload: fromModels.PoolItemGridRowGrouping) {}
}

export class SavePoolViewerItemsGroupingFailed implements Action {
    readonly type = PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_GROUPING_FAIL;

    constructor(public payload: string) {}
}


// --------------------------------------------------------------------------------------------




export class LoadPoolViewerConfigurations implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_CONFIGURAIONS;
}

export class LoadPoolViewerConfigurationsComplete implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_CONFIGURAIONS_COMPLETE;

    constructor(public payload: fromModels.configurations) {}
}

export class LoadPoolViewerConfigurationsFailed implements Action {
    readonly type = PoolViewerActionTypes.LOAD_POOL_VIEWER_CONFIGURAIONS_FAILED;

    constructor(public payload: string) {}
}


// -------------------------------------------------------------------------------------

export class LoadPortfolioYieldbookResult implements Action {
    readonly type = PoolViewerActionTypes.LOAD_PORTFOLIO_YIELDBOOK_RESULT;

    constructor(public payload: fromModels.PortfolioYieldbookResultRequest) {}
}

export class LoadPortfolioYieldbookResultComplete implements Action {
    readonly type = PoolViewerActionTypes.LOAD_PORTFOLIO_YIELDBOOK_RESULT_COMPLETE;

    constructor(public payload: {portfolioId: number; data: any[]}) {}
}

export class LoadPortfolioYieldbookResultFailed implements Action {
    readonly type = PoolViewerActionTypes.LOAD_PORTFOLIO_YIELDBOOK_RESULT_FAILED;

    constructor(public payload: string) {}
}


export class ReloadPortfolioYieldbookResult implements Action {
    readonly type = PoolViewerActionTypes.RELOAD_PORTFOLIO_YIELDBOOK_RESULT;

    constructor(public payload: fromModels.PortfolioYieldbookResultRequest) { }
}

export class ReloadPortfolioYieldbookResultComplete implements Action {
    readonly type = PoolViewerActionTypes.RELOAD_PORTFOLIO_YIELDBOOK_RESULT_COMPLETE;

    constructor(public payload: { portfolioId: number; data: any[] }) { }
}

export class ReloadPortfolioYieldbookResultFailed implements Action {
    readonly type = PoolViewerActionTypes.RELOAD_PORTFOLIO_YIELDBOOK_RESULT_FAILED;

    constructor(public payload: string) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PoolViewerActions
        = LoadPoolViewerInfo
        | LoadPoolViewerInfoComplete
        | LoadPoolViewerInfoFailed

        | LoadPoolViewerItems
        | LoadPoolViewerItemsComplete
        | LoadPoolViewerItemsFailed

        | LoadPoolViewerItemsColumnsLayout
        | LoadPoolViewerItemsColumnsLayoutComplete
        | LoadPoolViewerItemsColumnsLayoutFailed

        | SavePoolViewerItemsColumnsLayout
        | SavePoolViewerItemsColumnsLayoutComplete
        | SavePoolViewerItemsColumnsLayoutFailed

        | LoadPoolViewerItemsGroupings
        | LoadPoolViewerItemsGroupingsComplete
        | LoadPoolViewerItemsGroupingsFailed

        | SavePoolViewerItemsGrouping
        | SavePoolViewerItemsGroupingComplete
        | SavePoolViewerItemsGroupingFailed

        | LoadPoolViewerConfigurations
        | LoadPoolViewerConfigurationsComplete
        | LoadPoolViewerConfigurationsFailed

        | LoadPortfolioYieldbookResult
        | LoadPortfolioYieldbookResultComplete
        | LoadPortfolioYieldbookResultFailed
        
        | ReloadPortfolioYieldbookResult
        | ReloadPortfolioYieldbookResultComplete
        | ReloadPortfolioYieldbookResultFailed;

