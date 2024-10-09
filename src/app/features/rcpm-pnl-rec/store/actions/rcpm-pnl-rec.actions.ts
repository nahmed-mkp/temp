import { Action } from '@ngrx/store';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */


export enum RCPMPnlRecActionTypes {

    SET_ACTIVE_DATE = '[Rcpm Pnl Rec] set active date',

    LOAD_PNL_REC_DATA = '[Rcpm Pnl Rec] load pnl rec data',
    LOAD_PNL_REC_DATA_COMPLETE = '[Rcpm Pnl Rec] load pnl rec data complete',
    LOAD_PNL_REC_DATA_FAILED = '[Rcpm Pnl Rec] load pnl rec data failed',

    LOAD_CRD_POS_REC_DATA = '[Rcpm Pnl Rec] load crd pos rec data',
    LOAD_CRD_POS_REC_DATA_COMPLETE = '[Rcpm Pnl Rec] load crd pos rec data complete',
    LOAD_CRD_POS_REC_DATA_FAILED = '[Rcpm Pnl Rec] load crd pos rec data failed',

    LOAD_PRICER_REC_DATA = '[Rcpm Pnl Rec] load pricer (Prizm vs RCPM) rec data',
    LOAD_PRICER_REC_DATA_COMPLETE = '[Rcpm Pnl Rec] load pricer (Prizm vs RCPM) rec data complete',
    LOAD_PRICER_REC_DATA_FAILED = '[Rcpm Pnl Rec] load pricer (Prizm vs RCPM) rec data failed',
}

export class SetActiveDate {
    readonly type = RCPMPnlRecActionTypes.SET_ACTIVE_DATE;

    constructor(public payload: Date) {}
}





export class LoadPnlRecData {
    readonly type = RCPMPnlRecActionTypes.LOAD_PNL_REC_DATA;

    constructor(public payload: Date) {}
}

export class LoadPnlRecDataComplete {
    readonly type = RCPMPnlRecActionTypes.LOAD_PNL_REC_DATA_COMPLETE;

    constructor(public payload: any[]) {}
}

export class LoadPnlRecDataFailed {
    readonly type = RCPMPnlRecActionTypes.LOAD_PNL_REC_DATA_FAILED;

    constructor(public payload: string) {}
}






export class LoadCRDPosRecData {
    readonly type = RCPMPnlRecActionTypes.LOAD_CRD_POS_REC_DATA;

    constructor(public payload: Date) { }
}

export class LoadCRDPosRecDataComplete {
    readonly type = RCPMPnlRecActionTypes.LOAD_CRD_POS_REC_DATA_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadCRDPosRecDataFailed {
    readonly type = RCPMPnlRecActionTypes.LOAD_CRD_POS_REC_DATA_FAILED;

    constructor(public payload: string) { }
}





export class LoadPricerRecData {
    readonly type = RCPMPnlRecActionTypes.LOAD_PRICER_REC_DATA;

    constructor(public payload: Date) {}
}

export class LoadPricerRecDataComplete {
    readonly type = RCPMPnlRecActionTypes.LOAD_PRICER_REC_DATA_COMPLETE;

    constructor(public payload: any[]) {}
}

export class LoadPricerRecDataFailed {
    readonly type = RCPMPnlRecActionTypes.LOAD_PRICER_REC_DATA_FAILED;

    constructor(public payload: string) {}
}

export type RCPMPnlRecActions
    = SetActiveDate

    | LoadPnlRecData
    | LoadPnlRecDataComplete
    | LoadPnlRecDataFailed

    | LoadCRDPosRecData
    | LoadCRDPosRecDataComplete
    | LoadCRDPosRecDataFailed

    | LoadPricerRecData
    | LoadPricerRecDataComplete
    | LoadPricerRecDataFailed;

