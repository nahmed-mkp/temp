import { Action } from '@ngrx/store';

import * as fromModels from './../../models/prizm-sei-rec.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */


export enum PrizmSEIPnlRecActionTypes {

    UPLOAD_FILES = '[Prizm SEI Rec] Upload files',
    UPLOAD_FILES_COMPLETE = '[Prizm SEI Rec] Upload files complete',
    UPLOAD_FILES_FAILED = '[Prizm SEI Rec] Upload files failed',

    LOAD_FUNDS_FOR_REC = '[Prizm SEI Rec] Load funds for rec',
    LOAD_FUNDS_FOR_REC_COMPLETE = '[Prizm SEI Rec] Load funds for rec complete',
    LOAD_FUNDS_FOR_REC_FAILED = '[Prizm SEI Rec] Load funds for rec failed',

    UPLOAD_FUNDS = '[Prizm SEI Rec] Upload funds',
    UPLOAD_FUNDS_COMPLETE = '[Prizm SEI Rec] Upload funds complete',
    UPLOAD_FUNDS_FAILED = '[Prizm SEI Rec] Upload funds failed',

    RUN_RECONCILIATION = '[Prizm SEI Rec] Run reconciliation',
    RUN_RECONCILIATION_COMPLETE = '[Prizm SEI Rec] Run reconciliation complete',
    RUN_RECONCILIATION_FAILED = '[Prizm SEI Rec] Run reconciliation failed',
}


export class UploadFiles {
    readonly type = PrizmSEIPnlRecActionTypes.UPLOAD_FILES;

    constructor(public payload: string[]) { }
}

export class UploadFilesComplete {
    readonly type = PrizmSEIPnlRecActionTypes.UPLOAD_FILES_COMPLETE;

    constructor(public payload: fromModels.PrizmSEIRecUpload) { }
}

export class UploadFilesFailed {
    readonly type = PrizmSEIPnlRecActionTypes.UPLOAD_FILES_FAILED;

    constructor(public payload: string) { }
}

export class UploadFunds {
    readonly type = PrizmSEIPnlRecActionTypes.UPLOAD_FUNDS;

    constructor(public payload: string[]) { }
}

export class UploadFundsComplete {
    readonly type = PrizmSEIPnlRecActionTypes.UPLOAD_FUNDS_COMPLETE;

    constructor(public payload: fromModels.PrizmSEIRecUpload) { }
}

export class UploadFundsFailed {
    readonly type = PrizmSEIPnlRecActionTypes.UPLOAD_FUNDS_FAILED;

    constructor(public payload: string) { }
}

export class LoadFundsForRec {
    readonly type = PrizmSEIPnlRecActionTypes.LOAD_FUNDS_FOR_REC;
}

export class LoadFundsForRecComplete {
    readonly type = PrizmSEIPnlRecActionTypes.LOAD_FUNDS_FOR_REC_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadFundsForRecFailed {
    readonly type = PrizmSEIPnlRecActionTypes.LOAD_FUNDS_FOR_REC_FAILED;

    constructor(public payload: string) { }
}

export class RunReconciliation {
    readonly type = PrizmSEIPnlRecActionTypes.RUN_RECONCILIATION;

    constructor(public payload: string) {} 
}

export class RunReconciliationComplete {
    readonly type = PrizmSEIPnlRecActionTypes.RUN_RECONCILIATION_COMPLETE;

    constructor(public payload: any[]) { }
}

export class RunReconciliationFailed {
    readonly type = PrizmSEIPnlRecActionTypes.RUN_RECONCILIATION_FAILED;

    constructor(public payload: string) { }
}

export type PrizmSEIPnlRecActions
    = UploadFiles
    | UploadFilesComplete
    | UploadFilesFailed

    | LoadFundsForRec
    | LoadFundsForRecComplete
    | LoadFundsForRecFailed

    | UploadFunds
    | UploadFundsComplete
    | UploadFundsFailed

    | RunReconciliation
    | RunReconciliationComplete
    | RunReconciliationFailed;
