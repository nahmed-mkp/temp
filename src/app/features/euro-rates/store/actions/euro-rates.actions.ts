import { Action } from '@ngrx/store';

import * as fromModels from '../../models/euro-rate.models';

export enum EuroRatesActionTypes {
    LOAD_EURO_RATES_FILE_LIST = '[Euro Rate] Load euro rates file list',
    LOAD_EURO_RATES_FILE_LIST_COMPLETE = '[Euro Rate] Load euro rates file list complete',
    LOAD_EURO_RATES_FILE_LIST_FAILED = '[Euro Rate] Load euro rates file list failed',

    DOWNLOAD_FILES = '[Euro Rate] Download euro files',
    DOWNLOAD_FILES_COMPLETE = '[Euro Rate] Download euro files complete',
    DOWNLOAD_FILES_FAILED = '[Euro Rate] Download euro files failed',

    UNQUEUE_DOWNLOADING_FILE = '[Euro Rate] Unqueue downloading file',
    UNQUEUE_DOWNLOADING_FILE_COMPLETE = '[Euro Rate] Unqueue downloading file complete',
    UNQUEUE_DOWNLOADING_FILE_FAILED = '[Euro Rate] Unqueue downloading file failed',

    GET_FILE_DOWNLOAD_PROGRESS = '[Euro Rate] get file download progress',
    GET_FILE_DOWNLOAD_PROGRESS_COMPLETE = '[Euro Rate] get file download progress complete',
    GET_FILE_DOWNLOAD_PROGRESS_FAILED = '[Euro Rate] get file download progress failed',

    RESET_FILE_STATUS = '[Euro Rate] Reset file status back to not donwloaded',
    RESET_FILE_STATUS_COMPLETE = '[Euro Rate] Reset file status back to not donwloaded complete',
    RESET_FILE_STATUS_FAILED = '[Euro Rate] Reset file status back to not donwloaded failed',

    CHANGE_FILE_ORDER = '[Euro Rate] change file order',
    // CHANGE_FILE_ORDER_RECEIVE = '[Euro Rate] change file order receive',

    // CREATE_EURO_RATE_REAL_TIME_CONNECTION = '[Euro Rate] create euro rate real time connection',
    // REMOVE_EURO_RATE_REAL_TIME_CONNECTION = '[Euro Rate] remove euro rate real time connection',
    
    // UPDATE_FILE_DOWNLOAD_PROGRESS = '[Euro Rate] Update files download progress',
    // UPDATE_FILE_DOWNLOAD_PROGRESS_RECEIVE = '[Euro Rate] Update files download progress receive',

    // LISTEN_EURO_RATE_GENERAL_EVENT = '[Euro Rate] Listen Euro rate general event',
    // LISTEN_EURO_RATE_GENERAL_EVENT_PAYLOAD_RECEIVE = '[Euro Rate] Listen Euro rate general event payload receive',
    
    // LISTEN_CHANGE_FILE_ORDER = '[Euro Rate] Listen change file order event',
    // LISTEN_CHANGE_FILE_ORDER_PAYLOAD_RECEIVE = '[Euro Rate] Listen change file order event payload receive',
}


export class LoadEuroRatesFileList implements Action {
    readonly type = EuroRatesActionTypes.LOAD_EURO_RATES_FILE_LIST;
}

export class LoadEuroRatesFileListComplete implements Action {
    readonly type = EuroRatesActionTypes.LOAD_EURO_RATES_FILE_LIST_COMPLETE;

    constructor(public payload: fromModels.EuroRateFile[]) {}
}

export class LoadEuroRatesFileListFailed implements Action {
    readonly type = EuroRatesActionTypes.LOAD_EURO_RATES_FILE_LIST_FAILED;

    constructor(public payload: string) {}
} 



export class DownloadFiles implements Action {
    readonly type = EuroRatesActionTypes.DOWNLOAD_FILES;

    constructor(public payload: fromModels.requestFilesDownloadPayload[]) {}
} 

export class DownloadFilesComplete implements Action {
    readonly type = EuroRatesActionTypes.DOWNLOAD_FILES_COMPLETE;

    constructor(public payload: fromModels.EuroRateFile[]) {}
} 

export class DownloadFilesFailed implements Action {
    readonly type = EuroRatesActionTypes.DOWNLOAD_FILES_FAILED;

    constructor(public payload: string) {}
} 



export class UnqueueDownloadingFile implements Action {
    readonly type = EuroRatesActionTypes.UNQUEUE_DOWNLOADING_FILE

    constructor(public payload: number) {}
}

export class UnqueueDownloadingFileComplete implements Action {
    readonly type = EuroRatesActionTypes.UNQUEUE_DOWNLOADING_FILE_COMPLETE

    constructor(public payload: fromModels.EuroRateFile[]) {}
}

export class UnqueueDownloadingFileFailed implements Action {
    readonly type = EuroRatesActionTypes.UNQUEUE_DOWNLOADING_FILE_FAILED

    constructor(public payload: string) {}
}




export class GetFileDownloadProgress implements Action {
    readonly type = EuroRatesActionTypes.GET_FILE_DOWNLOAD_PROGRESS

    constructor(public payload: number[]) {}
}

export class GetFileDownloadProgressComplete implements Action {
    readonly type = EuroRatesActionTypes.GET_FILE_DOWNLOAD_PROGRESS_COMPLETE

    constructor(public payload: fromModels.fileDownFileProgress[]) {}
}

export class GetFileDownloadProgressFailed implements Action {
    readonly type = EuroRatesActionTypes.GET_FILE_DOWNLOAD_PROGRESS_FAILED

    constructor(public payload: string) {}
}




export class ResetFileStatus implements Action {
    readonly type = EuroRatesActionTypes.RESET_FILE_STATUS

    constructor(public payload: number[]) {}
}

export class ResetFileStatusComplete implements Action {
    readonly type = EuroRatesActionTypes.RESET_FILE_STATUS_COMPLETE

    constructor(public payload: fromModels.EuroRateFile[]) {}
}

export class ResetFileStatusFailed implements Action {
    readonly type = EuroRatesActionTypes.RESET_FILE_STATUS_FAILED

    constructor(public payload: string) {}
}





export class changeFileOrder implements Action {
    readonly type = EuroRatesActionTypes.CHANGE_FILE_ORDER

    constructor(public payload: fromModels.fileOrderChangeRecord) {}
}

// export class CreateEuroRateRealTimeConnection implements Action {
//     readonly type = EuroRatesActionTypes.CREATE_EURO_RATE_REAL_TIME_CONNECTION
// }

// export class RemoveEuroRateRealTimeConnection implements Action {
//     readonly type = EuroRatesActionTypes.REMOVE_EURO_RATE_REAL_TIME_CONNECTION
// }






// export class UpdateFileDownloadProgress implements Action {
//     readonly type = EuroRatesActionTypes.UPDATE_FILE_DOWNLOAD_PROGRESS
// }

// export class UpdateFileDownloadProgressReceive implements Action {
//     readonly type = EuroRatesActionTypes.UPDATE_FILE_DOWNLOAD_PROGRESS_RECEIVE

//     constructor(public payload: number) {}
// }



// export class ListenEuroRateGeneralEvent implements Action {
//     readonly type = EuroRatesActionTypes.LISTEN_EURO_RATE_GENERAL_EVENT
// }

// export class ListenEuroRateGeneralEventPayloadReceive implements Action {
//     readonly type = EuroRatesActionTypes.LISTEN_EURO_RATE_GENERAL_EVENT_PAYLOAD_RECEIVE

//     constructor(public payload: string) {}
// }




// export class changeFileOrder implements Action {
//     readonly type = EuroRatesActionTypes.CHANGE_FILE_ORDER

//     constructor(public payload: any) {}
// }

// export class changeFileOrderReceive implements Action {
//     readonly type = EuroRatesActionTypes.CHANGE_FILE_ORDER_RECEIVE

//     constructor(public payload: any) {}
// }


// export class listenToChangeFileOrder implements Action {
//     readonly type = EuroRatesActionTypes.LISTEN_CHANGE_FILE_ORDER
// }

// export class listenToChangeFileOrderPayloadReceive implements Action {
//     readonly type = EuroRatesActionTypes.LISTEN_CHANGE_FILE_ORDER_PAYLOAD_RECEIVE

//     constructor(public payload: any) {}
// }






export type EuroRatesAction
    = changeFileOrder
    | LoadEuroRatesFileList
    | LoadEuroRatesFileListComplete
    | LoadEuroRatesFileListFailed

    | DownloadFiles
    | DownloadFilesComplete
    | DownloadFilesFailed
    
    | UnqueueDownloadingFile
    | UnqueueDownloadingFileComplete
    | UnqueueDownloadingFileFailed
    
    | GetFileDownloadProgress
    | GetFileDownloadProgressComplete
    | GetFileDownloadProgressFailed

    | ResetFileStatus
    | ResetFileStatusComplete
    | ResetFileStatusFailed

    // // Real time Action
    
    // | CreateEuroRateRealTimeConnection
    // | RemoveEuroRateRealTimeConnection

    // | UpdateFileDownloadProgress //start listen to a streaming event
    // | UpdateFileDownloadProgressReceive // receive the streaming event update

    // | ListenEuroRateGeneralEvent
    // | ListenEuroRateGeneralEventPayloadReceive

    // | changeFileOrder
    // | changeFileOrderReceive

    // | listenToChangeFileOrder
    // | listenToChangeFileOrderPayloadReceive
    ;