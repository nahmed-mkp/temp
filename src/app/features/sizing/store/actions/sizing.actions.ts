import { Action } from '@ngrx/store';

import * as fromModels from './../../models/sizing.models';

export enum SizingActionTypes {
    LOAD_SIZING_SHEET_ITEMS = '[Sizing] Load sizing sheet itmes',
    LOAD_SIZING_SHEET_ITEMS_COMPLETE = '[Sizing] Load sizing sheet itmes complete',
    LOAD_SIZING_SHEET_ITEMS_FAILED = '[Sizing] Load sizing sheet itmes failed',

    REFRESH_SIZING_SHEET_ITEMS = '[Sizing] Refresh sizing sheet itmes',
    REFRESH_SIZING_SHEET_ITEMS_COMPLETE = '[Sizing] Refresh sizing sheet itmes complete',
    REFRESH_SIZING_SHEET_ITEMS_FAILED = '[Sizing] Refresh sizing sheet itmes failed',

    LOAD_SIZING_CAPITALS = '[Sizing] Load sizing capitals',
    LOAD_SIZING_CAPITALS_COMPLETE = '[Sizing] Load sizing capitals complete',
    LOAD_SIZING_CAPITALS_FAILED = '[Sizing] Load sizing capitals failed',

    LOAD_SIZING_SECURITIES = '[Sizing] Load sizing securities', 
    LOAD_SIZING_SECURITIES_COMPLETE = '[Sizing] Load sizing securities complete', 
    LOAD_SIZING_SECURITIES_FAILED = '[Sizing] Load sizing securities failed',

    ADD_SIZING_SECURITY = '[Sizing] Add sizing security',
    ADD_SIZING_SECURITY_COMPLETE = '[Sizing] Add sizing security complete',
    ADD_SIZING_SECURITY_FAILED = '[Sizing] Add sizing security failed',

    UPDATE_SIZING_SECURITY = '[Sizing] Update sizing security',
    UPDATE_SIZING_SECURITY_COMPLETE = '[Sizing] Update sizing security complete',
    UPDATE_SIZING_SECURITY_FAILED = '[Sizing] Update sizing security failed',

    DELETE_SIZING_SECURITY = '[Sizing] Delete sizing security',
    DELETE_SIZING_SECURITY_COMPLETE = '[Sizing] Delete sizing security complete',
    DELETE_SIZING_SECURITY_FAILED = '[Sizing] Delete sizing security failed',


    SAVE_SIZING_SECURITIES = '[Sizing] save sizing securities',
    SAVE_SIZING_SECURITIES_COMPLETE = '[Sizing] save sizing securities complete',
    SAVE_SIZING_SECURITIES_FAILED = '[Sizing] save sizing securities failed',


    LOAD_DEFAULT_CAPITALS = '[Sizing] Load Default Capitals',
    LOAD_DEFAULT_CAPITALS_COMPLETE = '[Sizing] Load Default Capitals complete',
    LOAD_DEFAULT_CAPITALS_FAILED = '[Sizing] Load Default Capitals failed',

    ADD_DEFAULT_CAPITAL = '[Sizing] Add Default Capitals',
    ADD_DEFAULT_CAPITAL_COMPLETE = '[Sizing] Add Default Capitals complete',
    ADD_DEFAULT_CAPITAL_FAILED = '[Sizing] Add Default Capitals failed',

    UPDATE_DEFAULT_CAPITAL = '[Sizing] Update Default Capitals',
    UPDATE_DEFAULT_CAPITAL_COMPLETE = '[Sizing] Update Default Capitals complete',
    UPDATE_DEFAULT_CAPITAL_FAILED = '[Sizing] Update Default Capitals failed',

    DELETE_DEFAULT_CAPITAL = '[Sizing] Delete Default Capitals',
    DELETE_DEFAULT_CAPITAL_COMPLETE = '[Sizing] Delete Default Capitals complete',
    DELETE_DEFAULT_CAPITAL_FAILED = '[Sizing] Delete Default Capitals failed'
    
}

export class LoadSizingSheetItems implements Action {
    readonly type = SizingActionTypes.LOAD_SIZING_SHEET_ITEMS;
}

export class LoadSizingSheetItemsComplete implements Action {
    readonly type = SizingActionTypes.LOAD_SIZING_SHEET_ITEMS_COMPLETE;

    constructor(public payload: fromModels.SizingResponse) {}
}

export class LoadSizingSheetItemsFailed implements Action {
    readonly type = SizingActionTypes.LOAD_SIZING_SHEET_ITEMS_FAILED;

    constructor(public payload: string) {}
}







export class RefreshSizingSheetItems implements Action {
    readonly type = SizingActionTypes.REFRESH_SIZING_SHEET_ITEMS;
}

export class RefreshSizingSheetItemsComplete implements Action {
    readonly type = SizingActionTypes.REFRESH_SIZING_SHEET_ITEMS_COMPLETE;

    constructor(public payload: fromModels.SizingResponse) {}
}

export class RefreshSizingSheetItemsFailed implements Action {
    readonly type = SizingActionTypes.REFRESH_SIZING_SHEET_ITEMS_FAILED;

    constructor(public payload: string) {}
}




export class LoadSizingCapitals implements Action {
    readonly type = SizingActionTypes.LOAD_SIZING_CAPITALS;
}

export class LoadSizingCapitalsComplete implements Action {
    readonly type = SizingActionTypes.LOAD_SIZING_CAPITALS_COMPLETE;

    constructor(public payload: fromModels.SizingCapital[]) { }
}

export class LoadSizingCapitalsFailed implements Action {
    readonly type = SizingActionTypes.LOAD_SIZING_CAPITALS_FAILED;

    constructor(public payload: string) { }
}

export class LoadSizingSecurities implements Action {
    readonly type = SizingActionTypes.LOAD_SIZING_SECURITIES;
}

export class LoadSizingSecuritiesComplete implements Action {
    readonly type = SizingActionTypes.LOAD_SIZING_SECURITIES_COMPLETE;

    constructor(public payload: fromModels.SizingSecurity[]) {}
}

export class LoadSizingSecuritiesFailed implements Action {
    readonly type = SizingActionTypes.LOAD_SIZING_SECURITIES_FAILED;

    constructor(public payload: string) {}
}

export class AddSizingSecurity implements Action {
    readonly type = SizingActionTypes.ADD_SIZING_SECURITY;

    constructor(public payload: fromModels.SizingSecurity) { }
}

export class AddSizingSecurityComplete implements Action {
    readonly type = SizingActionTypes.ADD_SIZING_SECURITY_COMPLETE;

    constructor(public payload: fromModels.SizingSecurity[]) { }
}

export class AddSizingSecurityFailed implements Action {
    readonly type = SizingActionTypes.ADD_SIZING_SECURITY_FAILED;

    constructor(public payload: string) { }
}

export class UpdateSizingSecurity implements Action {
    readonly type = SizingActionTypes.UPDATE_SIZING_SECURITY;

    constructor(public payload: fromModels.SizingSecurity) { }
}

export class UpdateSizingSecurityComplete implements Action {
    readonly type = SizingActionTypes.UPDATE_SIZING_SECURITY_COMPLETE;

    constructor(public payload: fromModels.SizingSecurity[]) { }
}

export class UpdateSizingSecurityFailed implements Action {
    readonly type = SizingActionTypes.UPDATE_SIZING_SECURITY_FAILED;

    constructor(public payload: string) { }
}




export class DeleteSizingSecurity implements Action {
    readonly type = SizingActionTypes.DELETE_SIZING_SECURITY;

    constructor(public payload: fromModels.SizingSecurity) { }
}

export class DeleteSizingSecurityComplete implements Action {
    readonly type = SizingActionTypes.DELETE_SIZING_SECURITY_COMPLETE;

    constructor(public payload: fromModels.SizingSecurity[]) { }
}

export class DeleteSizingSecurityFailed implements Action {
    readonly type = SizingActionTypes.DELETE_SIZING_SECURITY_FAILED;

    constructor(public payload: string) { }
}







export class SaveSizingSecurities implements Action {
    readonly type = SizingActionTypes.SAVE_SIZING_SECURITIES;

    constructor(public payload: fromModels.SizingSecurity[]) { }
}

export class SaveSizingSecuritiesComplete implements Action {
    readonly type = SizingActionTypes.SAVE_SIZING_SECURITIES_COMPLETE;
}

export class SaveSizingSecuritiesFailed implements Action {
    readonly type = SizingActionTypes.SAVE_SIZING_SECURITIES_FAILED;

    constructor(public payload: string) { }
}











export class LoadDefaultCapitals implements Action {
    readonly type = SizingActionTypes.LOAD_DEFAULT_CAPITALS;
}

export class LoadDefaultCapitalsComplete implements Action {
    readonly type = SizingActionTypes.LOAD_DEFAULT_CAPITALS_COMPLETE;

    constructor(public payload: fromModels.DefaultSizingCapital[]) { }
}

export class LoadDefaultCapitalsFailed implements Action {
    readonly type = SizingActionTypes.LOAD_DEFAULT_CAPITALS_FAILED;

    constructor(public payload: string) { }
}

export class AddDefaultCapital implements Action {
    readonly type = SizingActionTypes.ADD_DEFAULT_CAPITAL;

    constructor(public payload: fromModels.DefaultSizingCapital) { }
}

export class AddDefaultCapitalComplete implements Action {
    readonly type = SizingActionTypes.ADD_DEFAULT_CAPITAL_COMPLETE;

    constructor(public payload: fromModels.DefaultSizingCapital[]) { }
}

export class AddDefaultCapitalFailed implements Action {
    readonly type = SizingActionTypes.ADD_DEFAULT_CAPITAL_FAILED;

    constructor(public payload: string) { }
}

export class UpdateDefaultCapital implements Action {
    readonly type = SizingActionTypes.UPDATE_DEFAULT_CAPITAL;

    constructor(public payload: fromModels.DefaultSizingCapital) { }
}

export class UpdateDefaultCapitalComplete implements Action {
    readonly type = SizingActionTypes.UPDATE_DEFAULT_CAPITAL_COMPLETE;

    constructor(public payload: fromModels.DefaultSizingCapital[]) { }
}

export class UpdateDefaultCapitalFailed implements Action {
    readonly type = SizingActionTypes.UPDATE_DEFAULT_CAPITAL_FAILED

    constructor(public payload: string) { }
}

export class DeleteDefaultCapital implements Action {
    readonly type = SizingActionTypes.DELETE_DEFAULT_CAPITAL;

    constructor(public payload: fromModels.DefaultSizingCapital) { }
}

export class DeleteDefaultCapitalComplete implements Action {
    readonly type = SizingActionTypes.DELETE_DEFAULT_CAPITAL_COMPLETE;

    constructor(public payload: fromModels.DefaultSizingCapital[]) { }
}

export class DeleteDefaultCapitalFailed implements Action {
    readonly type = SizingActionTypes.DELETE_DEFAULT_CAPITAL_FAILED

    constructor(public payload: string) { }
}

export type SizingActions
    = LoadSizingSheetItems
    | LoadSizingSheetItemsComplete
    | LoadSizingSheetItemsFailed

    | RefreshSizingSheetItems
    | RefreshSizingSheetItemsComplete
    | RefreshSizingSheetItemsFailed
    
    | LoadSizingCapitals
    | LoadSizingCapitalsComplete
    | LoadSizingCapitalsFailed
    
    | LoadSizingSecurities
    | LoadSizingSecuritiesComplete
    | LoadSizingSecuritiesFailed
    
    | AddSizingSecurity
    | AddSizingSecurityComplete
    | AddSizingSecurityFailed
    
    | UpdateSizingSecurity
    | UpdateSizingSecurityComplete
    | UpdateSizingSecurityFailed
    
    | DeleteSizingSecurity
    | DeleteSizingSecurityComplete
    | DeleteSizingSecurityFailed

    | SaveSizingSecurities
    | SaveSizingSecuritiesComplete
    | SaveSizingSecuritiesFailed

    | LoadDefaultCapitals
    | LoadDefaultCapitalsComplete
    | LoadDefaultCapitalsFailed

    | AddDefaultCapital
    | AddDefaultCapitalComplete
    | AddDefaultCapitalFailed

    | UpdateDefaultCapital
    | UpdateDefaultCapitalComplete
    | UpdateDefaultCapitalFailed

    | DeleteDefaultCapital
    | DeleteDefaultCapitalComplete
    | DeleteDefaultCapitalFailed; 
