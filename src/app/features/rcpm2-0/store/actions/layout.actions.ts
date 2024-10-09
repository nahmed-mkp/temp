import { Action } from '@ngrx/store';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum LayoutActionTypes {

    // UI --------------------------------------------------------------------

    BACKUP_ALL_LOCAL_LAYOUT = '[RCPM-2-0] Backup all local layout',
    APPLY_COMMON_GROUPING = '[RCPM-2-0] Apply common grouping',
    SET_ACTIVE_LAYOUT = '[RCPM-2-0] Set active layout',
    SET_LAYOUT_GROUPING_ALERT = '[RCPM-2-0] Set layout grouping alert',

    ADD_SELECTED_LAYOUT = '[RCPM-2-0] add selected layout',
    REMOVE_SELECTED_LAYOUT = '[RCPM-2-0] remove selected layout',
    // REMOVE_SELECTED_LAYOUT_MEMORY = '[RCPM-2-0] remove selected layout memory',
    CHANGE_SELECTED_LAYOUT = '[[RCPM-2-0] change selected layout',

    // Data -------------------------------------------------------------------------

    

    BACKUP_ALL_CONFIG_STYLE = '[RCPM-2-0] Backup all config and style',
    BACKUP_ALL_CONFIG_STYLE_COMPLETE = '[RCPM-2-0] Backup all config and style complete',
    BACKUP_ALL_CONFIG_STYLE_FAILED = '[RCPM-2-0] Backup all config and style failed',

    LOAD_CONFIG_AND_STYLE = '[RCPM-2-0] load all config and style',
    LOAD_CONFIG_AND_STYLE_COMPLETE = '[RCPM-2-0] load all config and style complete',
    LOAD_CONFIG_AND_STYLE_FAILED = '[RCPM-2-0] load all config and style failed',

    LOAD_LAYOUT = '[RCPM-2-0] Load layout',
    LOAD_LAYOUT_COMPLETE = '[RCPM-2-0] Load layout complete',
    LOAD_LAYOUT_FAILED = '[RCPM-2-0] Load layout failed',

    SAVE_LAYOUT = '[RCPM-2-0] Save layout',
    SAVE_LAYOUT_COMPLETE = '[RCPM-2-0] Save layout complete',
    SAVE_LAYOUT_FAILED = '[RCPM-2-0] Save layout failed',

    DELETE_LAYOUT = '[RCPM-2-0] Delete layout',
    DELETE_LAYOUT_COMPLETE = '[RCPM-2-0] Delete layout complete',
    DELETE_LAYOUT_FAILED = '[RCPM-2-0] Delete layout failed',

    LOAD_STATIC_LAYOUT = '[RCPM-2-0] Load static layout',
    LOAD_STATIC_LAYOUT_COMPLETE = '[RCPM-2-0] Load static layout complete',
    LOAD_STATIC_LAYOUT_FAILED = '[RCPM-2-0] Load static layout failed',



    UPDATE_GRID_CONFIG = 'update grid config',
    UPDATE_GROUPING_STYLE = 'update grouping style',
    UPDATE_LAYOUT_STYLE = 'update layout style',
    UPDATE_GRID_CONFIG_LAYOUT_STYLE_FAILED = 'update grid config layout style failed'
}


// UI ------------------------------------------------------------------------------


export class BackupAllLocalLayout {
    readonly type = LayoutActionTypes.BACKUP_ALL_LOCAL_LAYOUT;
}

export class SetActiveLayout {
    readonly type = LayoutActionTypes.SET_ACTIVE_LAYOUT;

    constructor(public payload: string) {}
}


export class ApplyCommonGrouping {
    readonly type = LayoutActionTypes.APPLY_COMMON_GROUPING;

    constructor(public payload: string) {}
}

export class SetLayoutGroupingAlert {
    readonly type = LayoutActionTypes.SET_LAYOUT_GROUPING_ALERT;

    constructor(public payload: {layout: string, grouping: string}) {}
}








// UI Layout action specific ------------------------------------------------------------------------------------

export class AddSelectedLayout {
    readonly type = LayoutActionTypes.ADD_SELECTED_LAYOUT;

    constructor(public payload: string) {}
}

export class RemoveSelectedLayout {
    readonly type = LayoutActionTypes.REMOVE_SELECTED_LAYOUT;

    constructor(public payload: string) {}
}

// export class RemoveSelectedLayoutMemory {
//     readonly type = LayoutActionTypes.REMOVE_SELECTED_LAYOUT_MEMORY;

//     constructor(public payload: string) {}
// }

export class ChangeSelectedLayout {
    readonly type = LayoutActionTypes.CHANGE_SELECTED_LAYOUT;

    constructor(public payload: {targetLayout: string; targetIndex: number}) {}
}


// Data ------------------------------------------------------------------------------



export class LoadLayout {
    readonly type = LayoutActionTypes.LOAD_LAYOUT;
}

export class LoadLayoutComplete {
    readonly type = LayoutActionTypes.LOAD_LAYOUT_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadLayoutFailed {
    readonly type = LayoutActionTypes.LOAD_LAYOUT_FAILED;

    constructor(public payload: string) {}
}




export class SaveLayout {
    readonly type = LayoutActionTypes.SAVE_LAYOUT;

    constructor(public payload: any) {}
}

export class SaveLayoutComplete {
    readonly type = LayoutActionTypes.SAVE_LAYOUT_COMPLETE;

    constructor(public payload: any) {}
}

export class SaveLayoutFailed {
    readonly type = LayoutActionTypes.SAVE_LAYOUT_FAILED;

    constructor(public payload: string) {}
}





export class DeleteLayout {
    readonly type = LayoutActionTypes.DELETE_LAYOUT;

    constructor(public payload: any) {}
}

export class DeleteLayoutComplete {
    readonly type = LayoutActionTypes.DELETE_LAYOUT_COMPLETE;

    constructor(public payload: any) {}
}

export class DeleteLayoutFailed {
    readonly type = LayoutActionTypes.DELETE_LAYOUT_FAILED;

    constructor(public payload: string) {}
}






export class LoadStaticLayout {
    readonly type = LayoutActionTypes.LOAD_STATIC_LAYOUT;
}

export class LoadStaticLayoutComplete {
    readonly type = LayoutActionTypes.LOAD_STATIC_LAYOUT_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadStaticLayoutFailed {
    readonly type = LayoutActionTypes.LOAD_STATIC_LAYOUT_FAILED;

    constructor(public payload: string) {}
}









export class BackupAllConfigAndStyle {
    readonly type = LayoutActionTypes.BACKUP_ALL_CONFIG_STYLE;
}

export class BackupAllConfigAndStyleComplete {
    readonly type = LayoutActionTypes.BACKUP_ALL_CONFIG_STYLE_COMPLETE;
}

export class BackupAllConfigAndStyleFail {
    readonly type = LayoutActionTypes.BACKUP_ALL_CONFIG_STYLE_FAILED;

    constructor(public payload: string) {}
}









export class LoadConfigAndStyle {
    readonly type = LayoutActionTypes.LOAD_CONFIG_AND_STYLE;
}

export class LoadConfigAndStyleComplete {
    readonly type = LayoutActionTypes.LOAD_CONFIG_AND_STYLE_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadConfigAndStyleFailed {
    readonly type = LayoutActionTypes.LOAD_CONFIG_AND_STYLE_FAILED;

    constructor(public payload: string) {}
}






export class UpdateGridConfig {
    readonly type = LayoutActionTypes.UPDATE_GRID_CONFIG

    constructor(public payload: any) {}
}


export class UpdateGroupingStyle {
    readonly type = LayoutActionTypes.UPDATE_GROUPING_STYLE

    constructor(public payload: any) {}
}

export class UpdateLayoutStyle {
    readonly type = LayoutActionTypes.UPDATE_LAYOUT_STYLE

    constructor(public payload: {layout: string, style: any}) {}
}

export class UpdateGridConfigLayoutStyleFailed {
    readonly type = LayoutActionTypes.UPDATE_GRID_CONFIG_LAYOUT_STYLE_FAILED

    constructor(public payload: string) {}
}







export type LayoutActions
    = BackupAllLocalLayout
    | SetActiveLayout
    | ApplyCommonGrouping
    | SetLayoutGroupingAlert

    | AddSelectedLayout
    | RemoveSelectedLayout
    // | RemoveSelectedLayoutMemory
    | ChangeSelectedLayout

    | LoadLayout
    | LoadLayoutComplete
    | LoadLayoutFailed

    | SaveLayout
    | SaveLayoutComplete
    | SaveLayoutFailed

    | DeleteLayout
    | DeleteLayoutComplete
    | DeleteLayoutFailed

    | LoadStaticLayout
    | LoadStaticLayoutComplete
    | LoadStaticLayoutFailed



    | BackupAllConfigAndStyle
    | BackupAllConfigAndStyleComplete
    | BackupAllConfigAndStyleFail


    | LoadConfigAndStyle
    | LoadConfigAndStyleComplete
    | LoadConfigAndStyleFailed
    
    | UpdateGridConfig
    | UpdateGroupingStyle
    | UpdateLayoutStyle
    | UpdateGridConfigLayoutStyleFailed
    
    ;
