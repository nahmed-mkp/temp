import { Action } from '@ngrx/store';

import * as fromModel from './../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum RCPM2PositionsActionTypes {

    // UI -----------------------------------------------------------------

    LOAD_MISSING_CLOSES = '[RCPM-2-0] Load missing closes',
    LOAD_MISSING_CLOSES_COMPLETE = '[RCPM-2-0] Load missing closes complete',
    LOAD_MISSING_CLOSES_FAILED = '[RCPM-2-0] Load missing closes failed',
    
    SET_ACTIVE_DATE = '[RCPM-2-0] Set active date',
    ACTIVATE_SPINNING = '[RCPM-2-0] Activate spinning',
    CLEAR_CACHE = '[RCPM-2-0] clear cache',
    CLEAR_NONLINEAR_CACHE = '[RCPM-2-0] clear nonlinear data cache',
    CLEAR_NONLINEAR_PNL_CACHE = '[RCPM-2-0] clear nonlinear Pnl risk data cache',

    SET_MODE = '[RCPM-2-0] set mode',
    UPDATE_LATEST_AVAILABLE_DATE = '[RCPM-2-0] update latest available date',

    // Preset Data ----------------------------------------------------------------------------

    LOAD_POSITIONS_LOOKUPS = '[RCPM-2-0] Load position lookups',
    LOAD_POSITIONS_LOOKUPS_COMPLETE = '[RCPM-2-0] Load position lookups complete',
    LOAD_POSITIONS_LOOKUPS_FAILED = '[RCPM-2-0] Load position lookups failed',

    LOAD_POSITIONS_PRESET_LAYOUT = '[RCPM-2-0] load preset layout',
    LOAD_POSITIONS_PRESET_LAYOUT_COMPLETE = '[RCPM-2-0] load preset layout complete',
    LOAD_POSITIONS_PRESET_LAYOUT_FAILED = '[RCPM-2-0] load preset layout fail',

    LOAD_NONLINEAR_SUPPORT_GROUPINGS = '[RCPM-2-0] Load nonlinear support groupings',
    LOAD_NONLINEAR_SUPPORT_GROUPINGS_COMPLETE = '[RCPM-2-0] Load nonlinear support groupings complete',
    LOAD_NONLINEAR_SUPPORT_GROUPINGS_FAILED = '[RCPM-2-0] Load nonlinear support groupings failed',

    LOAD_USER_CUSTOMIZED_LAYOUT = '[RCPM-2-0] Load user customized layouts',
    UPDATE_USER_CUSTOMIZED_LAYOUT = '[RCPM-2-0] Update user customized layouts',
    LOAD_USER_CUSTOMIZED_LAYOUT_STYLE = '[RCPM-2-0] Load user layouts style',

    LOAD_POSITION_DATES = '[RCPM-2-0] Load Position Dates',
    LOAD_POSITION_DATES_COMPLETE = '[RCPM-2-0] Load Position Dates Complete',
    LOAD_POSITION_DATES_FAILED = '[RCPM-2-0] Load Position Dates failed',

    LOAD_LATEST_POSITION_DATE = '[RCPM-2-0] Load latest Position Dates',
    LOAD_LATEST_POSITION_DATE_COMPLETE = '[RCPM-2-0] Load latest Position Dates complete',
    LOAD_LATEST_POSITION_DATE_FAILED = '[RCPM-2-0] Load latest Position Dates failed',
    TOGGLE_LOAD_LATEST_POSITION_DATE = '[RCPM-2-0] toggle Load latest Position Dates',

    LOAD_DATA_SOURCE_PERMISSION = '[RCPM-2-0] Load data source permission',
    LOAD_DATA_SOURCE_PERMISSION_COMPLETE = '[RCPM-2-0] Load data source permission complete',
    LOAD_DATA_SOURCE_PERMISSION_FAILED = '[RCPM-2-0] Load data source permission failed',


    // Layout specific -----------------------------------------------------------------

    // ADD_SELECTED_LAYOUT = '[RCPM-2-0] add selected layout',
    // REMOVE_SELECTED_LAYOUT = '[RCPM-2-0] remove selected layout',
    REMOVE_SELECTED_LAYOUT_MEMORY = '[RCPM-2-0] remove selected layout memory',
    // CHANGE_SELECTED_LAYOUT = '[[RCPM-2-0] change selected layout',


    LOAD_POSITIONS = '[RCPM-2-0] Load Positions',
    LOAD_POSITIONS_COMPLETE = '[RCPM-2-0] Load Positions Complete',
    LOAD_POSITIONS_FAILED = '[RCPM-2-0] Load Positions Failed',
    UPDATE_LATEST_TIMESTAMP = '[RCPM-2-0] Update Latest Timestamp',

    LOAD_EXECUTIONS = '[RCPM-2-0] Load Executions',
    LOAD_EXECUTIONS_COMPLETE = '[RCPM-2-0] Load Executions Complete',
    LOAD_EXECUTIONS_FAILED = '[RCPM-2-0] Load Executions Failed',

    LOAD_EXECUTIONS_ADVANCE = '[RCPM-2-0] Load Executions advance',
    LOAD_EXECUTIONS_ADVANCE_COMPLETE = '[RCPM-2-0] Load Executions advance Complete',
    LOAD_EXECUTIONS_ADVANCE_FAILED = '[RCPM-2-0] Load Executions advance Failed',

    LOAD_POSITIONS_GROUPINGS = '[RCPM-2-0] Load positions groupings',
    LOAD_POSITIONS_GROUPINGS_COMPLETE = '[RCPM-2-0] Load positions groupings complete',
    LOAD_POSITIONS_GROUPINGS_FAILED = '[RCPM-2-0] Load positions groupings failed',

    LOAD_NONLINEAR_AGG_DATA = '[RCPM-2-0] load nonlinear aggregation data',
    LOAD_NONLINEAR_AGG_DATA_COMPLETE = '[RCPM-2-0] load nonlinear aggregation data complete',
    LOAD_NONLINEAR_AGG_DATA_FAILED = '[RCPM-2-0] load nonlinear aggregation data failed',

    LOAD_NONLINEAR_PNL_DATA = '[RCPM-2-0] load nonlinear Pnl data',
    LOAD_NONLINEAR_PNL_DATA_HOLD_OFF = '[RCPM-2-0] load nonlinear Pnl data hold off',
    LOAD_NONLINEAR_PNL_DATA_COMPLETE = '[RCPM-2-0] load nonlinear Pnl data complete',
    LOAD_NONLINEAR_PNL_DATA_FAILED = '[RCPM-2-0] load nonlinear Pnl data failed',


    // Position specific ------------------------------------------------------------

    LOAD_POSITION_INFO = '[RCPM-2-0] load Position Info',
    LOAD_POSITION_INFO_COMPLETE = '[RCPM-2-0] load Position Info complete',
    LOAD_POSITION_INFO_FAILED = '[RCPM-2-0] load Position Info failed',
    RESET_POSITION_INFO = '[RCPM-2-0] reset Position Info'

}

export class SetActiveDate {
    readonly type = RCPM2PositionsActionTypes.SET_ACTIVE_DATE;

    constructor(public payload: string) {}
}

export class ActivateSpinning {
    readonly type = RCPM2PositionsActionTypes.ACTIVATE_SPINNING;

    constructor(public payload: boolean) {}
}

export class ClearCache {
    readonly type = RCPM2PositionsActionTypes.CLEAR_CACHE;

    constructor(public payload: string) {}
}

export class ClearNonlinearCache {
    readonly type = RCPM2PositionsActionTypes.CLEAR_NONLINEAR_CACHE;

    constructor(public payload: string) {}
}

export class ClearNonlinearPnlCache {
    readonly type = RCPM2PositionsActionTypes.CLEAR_NONLINEAR_PNL_CACHE;

    constructor(public payload: string) {}
}

export class UpdateLatestAvailableDate {
    readonly type = RCPM2PositionsActionTypes.UPDATE_LATEST_AVAILABLE_DATE;

    constructor(public payload: any) {}
}
















export class LoadPositionLookups {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS_LOOKUPS;
}

export class LoadPositionLookupsComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS_LOOKUPS_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadPositionLookupsFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS_LOOKUPS_FAILED;

    constructor(public payload: string) {}
}

export class LoadMissingCloses {
    readonly type = RCPM2PositionsActionTypes.LOAD_MISSING_CLOSES
    constructor(public payload: fromModel.MissingClosesRequest) {}
}


export class LoadMissingClosesComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_MISSING_CLOSES_COMPLETE
    constructor(public payload: any) {}
}


export class LoadMissingClosesFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_MISSING_CLOSES_FAILED
    constructor(public err: string) {}
}


export class LoadPresetLayout {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS_PRESET_LAYOUT;
}

export class LoadPresetLayoutComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS_PRESET_LAYOUT_COMPLETE;
    constructor(public payload: fromModel.PositionLayout) {}
}

export class LoadPresetLayoutFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS_PRESET_LAYOUT_FAILED;
    constructor(public payload: string) {}
}




export class LoadNonlinearSupportGrouping {
    readonly type = RCPM2PositionsActionTypes.LOAD_NONLINEAR_SUPPORT_GROUPINGS;
}

export class LoadNonlinearSupportGroupingComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_NONLINEAR_SUPPORT_GROUPINGS_COMPLETE;
    constructor(public payload: any) {}
}

export class LoadNonlinearSupportGroupingFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_NONLINEAR_SUPPORT_GROUPINGS_FAILED;
    constructor(public payload: string) {}
}



export class LoadUserCustomizedLayout {
    readonly type = RCPM2PositionsActionTypes.LOAD_USER_CUSTOMIZED_LAYOUT;
}

export class UpdateUserCustomizedLayout {
    readonly type = RCPM2PositionsActionTypes.UPDATE_USER_CUSTOMIZED_LAYOUT;
}

export class LoadUserCustomizedLayoutStyle {
    readonly type = RCPM2PositionsActionTypes.LOAD_USER_CUSTOMIZED_LAYOUT_STYLE;
}


export class LoadPositionDates {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITION_DATES;
}

export class LoadPositionDatesComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITION_DATES_COMPLETE;
    constructor(public payload: fromModel.PositionDatesResponse) {}
}

export class LoadPositionDatesFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITION_DATES_FAILED;
    constructor(public payload: string) {}
}


export class LoadLatestPositionDate {
    readonly type = RCPM2PositionsActionTypes.LOAD_LATEST_POSITION_DATE;
}

export class LoadLatestPositionDateComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_LATEST_POSITION_DATE_COMPLETE;
    constructor(public payload: any) {}
}

export class LoadLatestPositionDateFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_LATEST_POSITION_DATE_FAILED;
    constructor(public payload: string) {}
}


export class ToggleLoadLatestPositionDate {
    readonly type = RCPM2PositionsActionTypes.TOGGLE_LOAD_LATEST_POSITION_DATE;
    constructor(public payload: boolean) {}
}


export class LoadDataSourcePermission {
    readonly type = RCPM2PositionsActionTypes.LOAD_DATA_SOURCE_PERMISSION;
}

export class LoadDataSourcePermissionComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_DATA_SOURCE_PERMISSION_COMPLETE;

    constructor(public payload: string[]) {}
}

export class LoadDataSourcePermissionFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_DATA_SOURCE_PERMISSION_FAILED;

    constructor(public payload: string) {}
}

// UI Layout action specific ------------------------------------------------------------------------------------

// export class AddSelectedLayout {
//     readonly type = RCPM2PositionsActionTypes.ADD_SELECTED_LAYOUT;

//     constructor(public payload: string) {}
// }

// export class RemoveSelectedLayout {
//     readonly type = RCPM2PositionsActionTypes.REMOVE_SELECTED_LAYOUT;

//     constructor(public payload: string) {}
// }

export class RemoveSelectedLayoutMemory {
    readonly type = RCPM2PositionsActionTypes.REMOVE_SELECTED_LAYOUT_MEMORY;

    constructor(public payload: string) {}
}

// export class ChangeSelectedLayout {
//     readonly type = RCPM2PositionsActionTypes.CHANGE_SELECTED_LAYOUT;

//     constructor(public payload: {targetLayout: string; targetIndex: number}) {}
// }


export class LoadPositions {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS;
    constructor(public payload: {asOfDate: string; layout: string, mode: 'live' | 'close', source?: 'RCPM' | 'PRIZM', data_retrieval_method: 'socket' | 'http'}) {}
}


export class LoadPositionsComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS_COMPLETE;
    constructor(public payload: {data: any[]; layout: string}) {}
}


export class LoadPositionsFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS_FAILED;
    constructor(public payload: {error: string; layout: string}) {}
}

export class UpdateLatestTimestamp {
    readonly type = RCPM2PositionsActionTypes.UPDATE_LATEST_TIMESTAMP;
    constructor(public payload: {
        latestPositionTs: string;
        latestPricingTs: string;
        latestTs: string;
    }) {}
}

export class LoadExecutions {
    readonly type = RCPM2PositionsActionTypes.LOAD_EXECUTIONS;
    constructor(public payload: {date: string, layoutName: string}) {}
}


export class LoadExecutionsComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_EXECUTIONS_COMPLETE;
    constructor(public payload: {data: any[], asOfDate: string}) {}
}


export class LoadExecutionsFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_EXECUTIONS_FAILED;
    constructor(public payload: {error: string; asOfDate: string;}) {}
}

export class LoadExecutionsAdvance {
    readonly type = RCPM2PositionsActionTypes.LOAD_EXECUTIONS_ADVANCE;
    constructor(public payload: {req: fromModel.ExecutionRequest, layoutName: string}) {}
}


export class LoadExecutionsAdvanceComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_EXECUTIONS_ADVANCE_COMPLETE;
    constructor(public payload: {data: any[], layoutName: string}) {}
}


export class LoadExecutionsAdvanceFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_EXECUTIONS_ADVANCE_FAILED;
    constructor(public payload: {error: string; layoutName: string;}) {}
}

export class LoadPositionGroupings {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS_GROUPINGS;
    constructor(public payload: {asOfDate: string; layout: string}) {}
}

export class LoadPositionGroupingsComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS_GROUPINGS_COMPLETE;
    constructor(public payload: {data: any[]; layout: string}) {}
}

export class LoadPositionGroupingsFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITIONS_GROUPINGS_FAILED;
    constructor(public payload: {error: string; layout: string}) {}
}

export class LoadNonlinearAggData {
    readonly type = RCPM2PositionsActionTypes.LOAD_NONLINEAR_AGG_DATA;
    constructor(public payload: {asOfDate: string; layout?: string, grouping: string}) {}
}

export class LoadNonlinearAggDataComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_NONLINEAR_AGG_DATA_COMPLETE;
    constructor(public payload: {data: any[]; layout: string}) {}
}

export class LoadNonlinearAggDataFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_NONLINEAR_AGG_DATA_FAILED;
    constructor(public payload: {error: string; layout: string}) {}
}

export class LoadNonlinearPnlData {
    readonly type = RCPM2PositionsActionTypes.LOAD_NONLINEAR_PNL_DATA;
    constructor(public payload: fromModel.NonlinearPnlRequest) {}
}

export class LoadNonlinearPnlDataHoldOff {
    readonly type = RCPM2PositionsActionTypes.LOAD_NONLINEAR_PNL_DATA_HOLD_OFF;
    constructor(public payload: fromModel.NonlinearPnlRequest) {}
}

export class LoadNonlinearPnlDataComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_NONLINEAR_PNL_DATA_COMPLETE;
    constructor(public payload: {data: any[]; layout: string}) {}
}

export class LoadNonlinearPnlDataFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_NONLINEAR_PNL_DATA_FAILED;
    constructor(public payload: {error: string; layout: string}) {}
}

export class LoadPositionInfo {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITION_INFO;
    constructor(public payload: fromModel.PositionInfoRequest) {}
}

export class LoadPositionInfoComplete {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITION_INFO_COMPLETE;
    constructor(public payload: {data: any; layout: string}) {}
}

export class LoadPositionInfoFailed {
    readonly type = RCPM2PositionsActionTypes.LOAD_POSITION_INFO_FAILED;
    constructor(public payload: {error: string; layout: string}) {}
}

export class ResetPositionInfo {
    readonly type = RCPM2PositionsActionTypes.RESET_POSITION_INFO;
    constructor(public payload: string) {}
}

export type RCPM2PositionsActions
    = SetActiveDate
    | ActivateSpinning
    | ClearCache
    | ClearNonlinearCache
    | ClearNonlinearPnlCache
    | UpdateLatestAvailableDate

    | LoadMissingCloses
    | LoadMissingClosesComplete
    | LoadMissingClosesFailed

    | LoadPositionLookups
    | LoadPositionLookupsComplete
    | LoadPositionLookupsFailed

    | LoadDataSourcePermission
    | LoadDataSourcePermissionComplete
    | LoadDataSourcePermissionFailed

    | LoadPresetLayout
    | LoadPresetLayoutComplete
    | LoadPresetLayoutFailed

    | LoadNonlinearSupportGrouping
    | LoadNonlinearSupportGroupingComplete
    | LoadNonlinearSupportGroupingFailed

    | LoadPositionDates
    | LoadPositionDatesComplete
    | LoadPositionDatesFailed

    | LoadLatestPositionDate
    | LoadLatestPositionDateComplete
    | LoadLatestPositionDateFailed
    | ToggleLoadLatestPositionDate

    | LoadUserCustomizedLayout
    | UpdateUserCustomizedLayout
    | LoadUserCustomizedLayoutStyle

    | LoadPositions
    | LoadPositionsComplete
    | LoadPositionsFailed
    | UpdateLatestTimestamp

    | LoadExecutions
    | LoadExecutionsComplete
    | LoadExecutionsFailed

    | LoadExecutionsAdvance
    | LoadExecutionsAdvanceComplete
    | LoadExecutionsAdvanceFailed

    | LoadPositionGroupings
    | LoadPositionGroupingsComplete
    | LoadPositionGroupingsFailed

    | LoadNonlinearAggData
    | LoadNonlinearAggDataComplete
    | LoadNonlinearAggDataFailed

    | LoadNonlinearPnlData
    | LoadNonlinearPnlDataHoldOff
    | LoadNonlinearPnlDataComplete
    | LoadNonlinearPnlDataFailed

    // | AddSelectedLayout
    // | RemoveSelectedLayout
    | RemoveSelectedLayoutMemory
    // | ChangeSelectedLayout

    | LoadPositionInfo
    | LoadPositionInfoComplete
    | LoadPositionInfoFailed
    | ResetPositionInfo
    ;
