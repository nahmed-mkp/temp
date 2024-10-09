import * as fromActions from '../actions/prizm-sei-rec.actions';

export interface State {

    uploadFiles: string[];
    uploadFunds: string[];
    filesUploading: boolean;
    filesUploaded: boolean;
    filesUploadError?: string;

    funds: string[];
    seiPnl: any[];

    fundListInDB: string[];
    fundListInDBError?: string;

    selectedFund: string;
    reconciliations: any[];
    reconciliationLoading: boolean;
    reconciliationLoaded: boolean;
    reconciliationError?: string;
}

const initialState: State = {

    uploadFiles: [],
    uploadFunds: [],
    filesUploading: false,
    filesUploaded: false,

    funds: [],
    seiPnl: [],

    fundListInDB: [],

    selectedFund: null,
    reconciliations: [],
    reconciliationLoading: false,
    reconciliationLoaded: false
};

export function reducer(state = initialState, action: fromActions.PrizmSEIPnlRecActions): State {

    switch (action.type) {

        case fromActions.PrizmSEIPnlRecActionTypes.UPLOAD_FILES: {
            return {
                ...state,
                uploadFiles: [...action.payload],
                filesUploading: true,
                filesUploaded: false,
                filesUploadError: null
            };
        }

        case fromActions.PrizmSEIPnlRecActionTypes.UPLOAD_FUNDS: {
            return {
                ...state,
                uploadFunds: [...action.payload],
                filesUploading: true,
                filesUploaded: false,
                filesUploadError: null
            };
        }

        case fromActions.PrizmSEIPnlRecActionTypes.UPLOAD_FILES_COMPLETE:
        case fromActions.PrizmSEIPnlRecActionTypes.UPLOAD_FUNDS_COMPLETE: {
            return {
                ...state,
                filesUploading: false,
                filesUploaded: true,
                funds: [...action.payload.funds],
                seiPnl: [...action.payload.data]
            };
        }

        case fromActions.PrizmSEIPnlRecActionTypes.UPLOAD_FILES_FAILED:
        case fromActions.PrizmSEIPnlRecActionTypes.UPLOAD_FUNDS_FAILED: {
            return {
                ...state,
                filesUploading: false,
                filesUploaded: false,
                filesUploadError: action.payload
            };
        }

        case fromActions.PrizmSEIPnlRecActionTypes.LOAD_FUNDS_FOR_REC_COMPLETE: {
            return {
                ...state,
                fundListInDB: [...action.payload]
            };
        }

        case fromActions.PrizmSEIPnlRecActionTypes.LOAD_FUNDS_FOR_REC_FAILED: {
            return {
                ...state,
                fundListInDBError: action.payload
            };
        }

        case fromActions.PrizmSEIPnlRecActionTypes.RUN_RECONCILIATION: {
            return {
                ...state,
                reconciliationLoading: true,
                reconciliationLoaded: false,
                reconciliationError: null
            };
        }

        case fromActions.PrizmSEIPnlRecActionTypes.RUN_RECONCILIATION_COMPLETE: {
            return {
                ...state,
                reconciliations: [...action.payload],
                reconciliationLoading: false,
                reconciliationLoaded: true
            };
        }

        case fromActions.PrizmSEIPnlRecActionTypes.RUN_RECONCILIATION_FAILED: {
            return {
                ...state,
                reconciliationLoading: false,
                reconciliationLoaded: true,
                reconciliationError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getFilesToUpload = (state: State) => state.uploadFiles;
export const getFilesUploading = (state: State) => state.filesUploading;
export const getFilesUploaded = (state: State) => state.filesUploaded;
export const getFilesUploadError = (state: State) => state.filesUploadError;

export const getFunds = (state: State) => state.funds;
export const getSEIPnl = (state: State) => state.seiPnl;

export const getFundListInDB = (state: State) => state.fundListInDB;
export const getFundListInDBError = (state: State) => state.fundListInDBError;

export const getReconciliations = (state: State) => state.reconciliations;
export const getReconciliationsLoading = (state: State) => state.reconciliationLoading;
export const getReconciliationsLoaded = (state: State) => state.reconciliationLoaded;
export const getReconciliationsError = (state: State) => state.reconciliationError;
