import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */


 export enum PnlAttributionUiActionTypes {

    SET_ACTIVE_LAYOUT = '[RCPM-2-0] set active layout',
    SET_GUID = '[RCPM-2-0] set guid',
    SET_ATTRIBUTION_REQUEST = '[RCPM-2-0] set attribution request',
    SET_GRID_DISPLAY_MODE = '[RCPM-2-0] set grid display mode',
    SET_READ_ONLY_MODE = '[RCPM-2-0] set read only mode',

    SET_ACTIVE_NODE_ID_BY_LAYOUT= '[RCPM-2-0] set active node Id for each layout',
    SET_ACTIVE_NODE_CELL_WITH_MONTH_YEAR_BY_LAYOUT = '[RCPM-2-0] set active node cell with month and year for each layout',

    ADD_SELECTED_LAYOUT = '[RCPM-2-0] add selected layout',
    REMOVE_SELECTED_LAYOUT = '[RCPM-2-0] remove selected layout',
    CHANGE_SELECTED_LAYOUT = '[RCPM-2-0] change selected layout',
    SET_INITIAL_SELECTED_LAYOUTS = '[RCPM-2-0] set initial selected layouts',
    CREATE_NEW_LAYOUT = '[RCPM-2-0] create new layout',

    UPDATE_LAYOUT_GROUPING = '[RCPM-2-0] update layout grouping',

    LOAD_LAYOUTS = '[Attribution] Load layout',
    LOAD_LAYOUTS_COMPLETE = '[Attribution] Load layout complete',
    LOAD_LAYOUTS_FAILED = '[Attribution] Load layout failed',

    LOAD_DEFAULT_GROUPINGS = '[Attribution] Load default groupings',
    LOAD_DEFAULT_GROUPINGS_COMPLETE = '[Attribution] Load default groupings complete',
    LOAD_DEFAULT_GROUPINGS_FAILED = '[Attribution] Load default groupings failed',

    SAVE_LAYOUT = '[Attribution] Save layout',
    SAVE_LAYOUT_CLOUD = '[Attribution] Save layout to cloud',
    SAVE_LAYOUT_CLOUD_COMPLETE = '[Attribution] Save layout to cloud complete',
    SAVE_LAYOUT_CLOUD_FAILED = '[Attribution] Save layout to cloud failed',

    DELETE_LAYOUT = '[Attribution] Delete layout',
    DELETE_LAYOUT_COMPLETE = '[Attribution] Delete layout complete',
    DELETE_LAYOUT_FAILED = '[Attribution] Delete layout failed',

 }




export class SetActiveLayout {
    readonly type = PnlAttributionUiActionTypes.SET_ACTIVE_LAYOUT;

    constructor(public payload: string) {}
}

export class SetGuid {
    readonly type = PnlAttributionUiActionTypes.SET_GUID;

    constructor(public payload: {layoutName: string; guid: string}) {}
}

export class SetAttributionRequest {
    readonly type = PnlAttributionUiActionTypes.SET_ATTRIBUTION_REQUEST;

    constructor(public payload: {layoutName: string; request: fromModels.IAttributionRequest}) {}
}

export class SetGridDisplayMode {
    readonly type = PnlAttributionUiActionTypes.SET_GRID_DISPLAY_MODE;

    constructor(public payload: {layoutName: string; displayMode: fromModels.GridDisplayMode}) {}
}

export class SetReadOnlyMode {
    readonly type = PnlAttributionUiActionTypes.SET_READ_ONLY_MODE;

    constructor(public payload: boolean) {}
}


export class LoadDefaultGroupings {
    readonly type = PnlAttributionUiActionTypes.LOAD_DEFAULT_GROUPINGS;
}

export class LoadDefaultGroupingsComplete {
    readonly type = PnlAttributionUiActionTypes.LOAD_DEFAULT_GROUPINGS_COMPLETE;

    constructor(public payload: any[]) {}
} 

export class LoadDefaultGroupingsFailed {
    readonly type = PnlAttributionUiActionTypes.LOAD_DEFAULT_GROUPINGS_FAILED;

    constructor(public payload: string) {}
}









export class UpdateLayoutGrouping {
    readonly type = PnlAttributionUiActionTypes.UPDATE_LAYOUT_GROUPING;

    constructor(public payload: {layoutName: string; grouping: string[]}) {}
}





export class SetActiveNodeIdByLayout {
    readonly type = PnlAttributionUiActionTypes.SET_ACTIVE_NODE_ID_BY_LAYOUT;

    constructor(public payload: {layoutName: string; activeNodeId: number}) {}
}

export class SetActiveNodeCellWithMonthYearByLayout {
    readonly type = PnlAttributionUiActionTypes.SET_ACTIVE_NODE_CELL_WITH_MONTH_YEAR_BY_LAYOUT;

    constructor(public payload: {layoutName: string; combineId: string}) {}
}









export class AddSelectedLayout {
    readonly type = PnlAttributionUiActionTypes.ADD_SELECTED_LAYOUT;

    constructor(public payload: string) {}
}

export class RemoveSelectedLayout {
    readonly type = PnlAttributionUiActionTypes.REMOVE_SELECTED_LAYOUT;

    constructor(public payload: string) {}
}

export class ChangeSelectedLayout {
    readonly type = PnlAttributionUiActionTypes.CHANGE_SELECTED_LAYOUT;

    constructor(public payload: {targetLayout: string; targetIndex: number}) {}
}

export class CreateNewLayout {
    readonly type = PnlAttributionUiActionTypes.CREATE_NEW_LAYOUT;

    constructor(public payload: string) {}
}

export class SetInitialSelectedLayouts {
    readonly type = PnlAttributionUiActionTypes.SET_INITIAL_SELECTED_LAYOUTS;

    constructor(public payload: string[]) {}
}






export class LoadLayout {
    readonly type = PnlAttributionUiActionTypes.LOAD_LAYOUTS;
}

export class LoadLayoutComplete {
    readonly type = PnlAttributionUiActionTypes.LOAD_LAYOUTS_COMPLETE;

    constructor(public payload: any[]) {}
}

export class LoadLayoutFailed {
    readonly type = PnlAttributionUiActionTypes.LOAD_LAYOUTS_FAILED;

    constructor(public payload: string) {}
}




export class SaveLayout {
    readonly type = PnlAttributionUiActionTypes.SAVE_LAYOUT;

    constructor(public payload: {layoutName: string, info: fromModels.layoutState}) {}
}

export class SaveLayoutCloud {
    readonly type = PnlAttributionUiActionTypes.SAVE_LAYOUT_CLOUD;

    constructor(public payload: string) {}
}

export class SaveLayoutCloudComplete {
    readonly type = PnlAttributionUiActionTypes.SAVE_LAYOUT_CLOUD_COMPLETE;

    constructor(public payload: any) {}
}

export class SaveLayoutCloudFailed {
    readonly type = PnlAttributionUiActionTypes.SAVE_LAYOUT_CLOUD_FAILED;

    constructor(public payload: string) {}
}





export class DeleteLayout {
    readonly type = PnlAttributionUiActionTypes.DELETE_LAYOUT;

    constructor(public payload: string) {}
}

export class DeleteLayoutComplete {
    readonly type = PnlAttributionUiActionTypes.DELETE_LAYOUT_COMPLETE;

    constructor(public payload: string) {}
}

export class DeleteLayoutFailed {
    readonly type = PnlAttributionUiActionTypes.DELETE_LAYOUT_FAILED;

    constructor(public payload: string) {}
}







export type PnlAttributionUiActions 
    = AddSelectedLayout
    | RemoveSelectedLayout
    | ChangeSelectedLayout
    | CreateNewLayout
    | SetInitialSelectedLayouts

    | SetActiveLayout
    | SetGuid
    | SetActiveNodeIdByLayout
    | SetActiveNodeCellWithMonthYearByLayout
    | SetAttributionRequest
    | SetGridDisplayMode
    | SetReadOnlyMode
    | UpdateLayoutGrouping

    | LoadLayout
    | LoadLayoutComplete
    | LoadLayoutFailed

    | SaveLayout
    | SaveLayoutCloud
    | SaveLayoutCloudComplete
    | SaveLayoutCloudFailed

    | LoadDefaultGroupings
    | LoadDefaultGroupingsComplete
    | LoadDefaultGroupingsFailed

    | DeleteLayout
    | DeleteLayoutComplete
    | DeleteLayoutFailed;

