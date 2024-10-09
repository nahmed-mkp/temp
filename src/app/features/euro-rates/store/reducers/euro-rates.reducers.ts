import * as fromActions from '../actions';
import * as fromModels from './../../models/euro-rate.models';

export interface State {

    // Ui State
    fileOrder: fromModels.fileOrderChangeRecord;

    euroRatesFileList: fromModels.EuroRateFile[];
    euroRatesFileEntities: {
        [id: number]: fromModels.EuroRateFile;
    };

    loadingEuroRatesFileList: boolean;
    loadedEuroRatesFileList: boolean;
    loadEuroRatesFileListError?: string;

    downloadingEuroRatesFiles: boolean;
    downloadedEuroRatesFiles: boolean;
    downloadEuroRateFilesError?: string;

    unqueuingDownloadingFile: boolean;
    unqueuedDownloadingFile: boolean;
    unqueueDownloadingFileError?: string;

    fileDownloadProgress: fromModels.fileDownFileProgress[];

    // euroRateRealTimeConnection: boolean;
    // euroRateFileDownloadProgress: number;

    // euroRateGeneralEventUpdate: string;
    // fileOrder: any

    resettingFileStatus: boolean;
    resettedFileStatus: boolean;
    resetFileStatusError?: string;
}

const initialState: State = {
    fileOrder: null,

    euroRatesFileList: [],
    euroRatesFileEntities: {},
    loadingEuroRatesFileList: false,
    loadedEuroRatesFileList: false,

    downloadingEuroRatesFiles: false,
    downloadedEuroRatesFiles: false, 

    unqueuingDownloadingFile: false,
    unqueuedDownloadingFile: false,

    fileDownloadProgress: [],

    resettingFileStatus: false,
    resettedFileStatus: false

    // euroRateRealTimeConnection: false,
    // euroRateFileDownloadProgress: undefined,

    // euroRateGeneralEventUpdate: undefined,
    // fileOrder: undefined
}

export function reducer(state = initialState, action: fromActions.EuroRatesAction): State {
    
    switch(action.type) {

        case fromActions.EuroRatesActionTypes.CHANGE_FILE_ORDER: {
            return {
                ...state,
                fileOrder: Object.assign({}, state.fileOrder, action.payload)
            }
        }

        case fromActions.EuroRatesActionTypes.LOAD_EURO_RATES_FILE_LIST: {
            return {
                ...state,
                loadingEuroRatesFileList: true,
                loadedEuroRatesFileList: false,
                loadEuroRatesFileListError: null,
            }
        }

        case fromActions.EuroRatesActionTypes.LOAD_EURO_RATES_FILE_LIST_COMPLETE: 
        case fromActions.EuroRatesActionTypes.DOWNLOAD_FILES_COMPLETE:  {

            const newEntities = action.payload.reduce((entities: {[id: number]: fromModels.EuroRateFile},
                item: fromModels.EuroRateFile) => {
                    return Object.assign({}, entities, {[item.id]: item});
                }, state.euroRatesFileEntities);

            return {
                ...state,
                euroRatesFileList: action.payload,
                euroRatesFileEntities: newEntities,

                loadingEuroRatesFileList: false,
                loadedEuroRatesFileList: true,
                loadEuroRatesFileListError: null
            }
        }

        case fromActions.EuroRatesActionTypes.LOAD_EURO_RATES_FILE_LIST_FAILED: {
            return {
                ...state,
                loadEuroRatesFileListError: action.payload,
                loadedEuroRatesFileList: false,
                loadingEuroRatesFileList: false,
            }
        }



        case fromActions.EuroRatesActionTypes.DOWNLOAD_FILES: {
            return {
                ...state,
                downloadingEuroRatesFiles: true,
                downloadedEuroRatesFiles: false,
                downloadEuroRateFilesError: null
            }
        }

        case fromActions.EuroRatesActionTypes.DOWNLOAD_FILES_COMPLETE: {
            return {
                ...state,
                downloadingEuroRatesFiles: false,
                downloadedEuroRatesFiles: true,
                downloadEuroRateFilesError: null
            }
        }

        case fromActions.EuroRatesActionTypes.DOWNLOAD_FILES_FAILED: {
            return {
                ...state,
                downloadingEuroRatesFiles: false,
                downloadedEuroRatesFiles: false,
                downloadEuroRateFilesError: action.payload
            }
        }





        case fromActions.EuroRatesActionTypes.UNQUEUE_DOWNLOADING_FILE: {
            return {
                ...state,
                unqueuingDownloadingFile: true,
                unqueuedDownloadingFile: false,
                unqueueDownloadingFileError: null
            }
        }

        case fromActions.EuroRatesActionTypes.UNQUEUE_DOWNLOADING_FILE_COMPLETE: {
            return {
                ...state,
                euroRatesFileList: action.payload,
                unqueuingDownloadingFile: false,
                unqueuedDownloadingFile: true,
                unqueueDownloadingFileError: null
            }
        }

        case fromActions.EuroRatesActionTypes.UNQUEUE_DOWNLOADING_FILE_FAILED: {
            return {
                ...state,
                unqueuingDownloadingFile: false,
                unqueuedDownloadingFile: false,
                unqueueDownloadingFileError: action.payload
            }
        }




        case fromActions.EuroRatesActionTypes.GET_FILE_DOWNLOAD_PROGRESS_COMPLETE: {
            return {
                ...state,
                fileDownloadProgress: action.payload
            }
        }





        case fromActions.EuroRatesActionTypes.RESET_FILE_STATUS: {
            return {
                ...state,
                resettingFileStatus: true,
                resettedFileStatus: false,
                resetFileStatusError: null
            }
        }

        case fromActions.EuroRatesActionTypes.RESET_FILE_STATUS_COMPLETE: {

            // const targeRequestIds = action.payload;
            // const newEuroRateFilesList = state.euroRatesFileList.map(file => {
            //     if(targeRequestIds.indexOf(file.id) !== -1) file.status = 'Not Downloaded';
            //     return file
            // })

            return {
                ...state,
                euroRatesFileList: action.payload,
                resettingFileStatus: false,
                resettedFileStatus: true,
                resetFileStatusError: null,
            }
        }

        case fromActions.EuroRatesActionTypes.RESET_FILE_STATUS_FAILED: {
            return {
                ...state,
                resettingFileStatus: false,
                resettedFileStatus: false,
                resetFileStatusError: action.payload,
            }
        }
    



        // // ------------------------------------------------------------------------

        // case fromActions.EuroRatesActionTypes.CREATE_EURO_RATE_REAL_TIME_CONNECTION: {
        //     return {
        //         ...state,
        //         euroRateRealTimeConnection: true
        //     }
        // }

        // case fromActions.EuroRatesActionTypes.REMOVE_EURO_RATE_REAL_TIME_CONNECTION: {
        //     return {
        //         ...state,
        //         euroRateRealTimeConnection: false
        //     }
        // }

        // case fromActions.EuroRatesActionTypes.UPDATE_FILE_DOWNLOAD_PROGRESS_RECEIVE: {
        //     return {
        //         ...state,
        //         euroRateFileDownloadProgress: action.payload
        //     }
        // }

        // case fromActions.EuroRatesActionTypes.LISTEN_EURO_RATE_GENERAL_EVENT_PAYLOAD_RECEIVE: {
        //     return {
        //         ...state,
        //         euroRateGeneralEventUpdate: action.payload
        //     }
        // }

        // case fromActions.EuroRatesActionTypes.LISTEN_CHANGE_FILE_ORDER_PAYLOAD_RECEIVE: {
        //     return {
        //         ...state,
        //         fileOrder: action.payload
        //     }
        // }

        default: {
            return state;
        }
    }
}

export const getFileOrder = (state: State) => state.fileOrder;

export const getFileDownloadProgress = (state: State) => state.fileDownloadProgress;
export const getEuroRatesFileList = (state: State) => state.euroRatesFileList;
export const getEuroRatesFileEntities = (state: State) => state.euroRatesFileEntities

export const getloadingEuroRatesFileList = (state: State) => state.loadingEuroRatesFileList;
export const getloadEuroRatesFileListError = (state: State) => state.loadEuroRatesFileListError;
export const getloadedEuroRatesFileList = (state: State) => state.loadedEuroRatesFileList;

export const getDownloadingEuroRatesFiles = (state: State) => state.downloadingEuroRatesFiles;
export const getDownloadedEuroRatesFiles = (state: State) => state.downloadedEuroRatesFiles;
export const getDownloadEuroRateFilesError = (state: State) => state.downloadEuroRateFilesError;

export const getUnqueuingDownloadingFile = (state: State) => state.unqueuingDownloadingFile;
export const getUnqueuedDownloadingFile = (state: State) => state.unqueuedDownloadingFile;
export const getUnqueueDownloadingFileError = (state: State) => state.unqueueDownloadingFileError;


// export const getEuroRateRealTimeConnection = (state: State) => state.euroRateRealTimeConnection;
// export const getEuroRateFileDownloadProgress = (state: State) => state.euroRateFileDownloadProgress;
// export const getEuroRateGeneralEventUpdate = (state: State) => state.euroRateGeneralEventUpdate;
// export const getEuroRateFileOrder = (state: State) => state.fileOrder;