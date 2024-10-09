import * as fromModels from '../../models/capitals.models';
import * as fromActions from '../actions/capitals.actions';

import * as moment from 'moment';
export interface State {

    // --------------------------------------------------------

    fundMapping: any;
    crossPodMapping: any;

    // --------------------------------------------------------

    fundComplexes: string[];
    fundComplexesLoading: boolean;
    fundComplexesLoaded: boolean;
    fundComplexesError?: string;

    input?: fromModels.ICapitalInput;

    capitalMatrixLoading: boolean;
    capitalMatrixLoaded: boolean;
    capitalMatrixError?: string;

    capitalMatrixFunds: string[];
    capitalMatrix: any[];
    capitalMatrixNew: any[];
    capitalMatrixDiff: any[];

    capitalMatrixPct: any[];
    capitalMatrixPctNew: any[];
    capitalMatrixPctDiff: any[];

    fundCapitalChangePreview: any[];
    podCapitalChangePreview: any[];

    flowsInput?: fromModels.ICapitalFlowInput;
    capitalHistoryInput?: fromModels.ICapitalHistoryInput;

    fundCapitalFlows: any[];
    fundCapitalFlowsLoading: boolean;
    fundCapitalFlowsLoaded: boolean;
    fundCapitalFlowsError?: string;

    podCapitalFlows: any[];
    podCapitalFlowsLoading: boolean;
    podCapitalFlowsLoaded: boolean;
    podCapitalFlowsError?: string;

    fundCapitalHistory: any[];
    fundCapitalHistoryLoading: boolean;
    fundCapitalHistoryLoaded: boolean;
    fundCapitalHistoryError?: string;

    podCapitalHistoryFundIDs: number[];
    podCapitalHistory: any[];
    podCapitalHistoryLoading: boolean;
    podCapitalHistoryLoaded: boolean;
    podCapitalHistoryError?: string;

    // ------------------------

    updateCrosspodCapitalPending: boolean;
    updateCrosspodCapitalFinished: boolean;
    updateCrosspodCapitalError?: string;

    updateFundCapitalPending: boolean;
    updateFundCapitalFinished: boolean;
    updateFundCapitalError?: string;

    resetCapitalChangesPending: boolean;
    resetCapitalChangesFinished: boolean;
    resetCapitalChangesError?: string;

    previewCapitalChangesPending: boolean;
    previewCapitalChangesFinished: boolean;
    previewCapitalChangesError?: string;

    saveCapitalChangesPending: boolean;
    saveCapitalChangesFinished: boolean;
    saveCapitalChangesResult?: fromModels.ISaveCapitalResult;
}

const initialState: State = {

    fundMapping: {},
    crossPodMapping: {},

    fundComplexes: [],
    fundComplexesLoading: false,
    fundComplexesLoaded: false,

    capitalMatrixLoading: false,
    capitalMatrixLoaded: false,

    capitalMatrixFunds: [],
    capitalMatrix: [],
    capitalMatrixNew: [],
    capitalMatrixDiff: [],

    capitalMatrixPct: [],
    capitalMatrixPctNew: [],
    capitalMatrixPctDiff: [],

    fundCapitalChangePreview: [],
    podCapitalChangePreview: [],

    flowsInput: {
        startDate: moment().subtract(1, 'year').format('MM-DD-YYYY'),
        endDate: moment().format('MM-DD-YYYY'),
    },
    capitalHistoryInput: {
        startDate: moment().subtract(1, 'year').format('MM-DD-YYYY'),
        endDate: moment().format('MM-DD-YYYY'),
        activeOnly: true,
        fundId: null
    },

    fundCapitalFlows: [],
    fundCapitalFlowsLoading: false,
    fundCapitalFlowsLoaded: false,

    podCapitalFlows: [],
    podCapitalFlowsLoading: false,
    podCapitalFlowsLoaded: false,

    fundCapitalHistory: [],
    fundCapitalHistoryLoading: false,
    fundCapitalHistoryLoaded: false,

    podCapitalHistoryFundIDs: [],
    podCapitalHistory: [],
    podCapitalHistoryLoading: false,
    podCapitalHistoryLoaded: false,

    updateCrosspodCapitalPending: false,
    updateCrosspodCapitalFinished: false,

    updateFundCapitalPending: false,
    updateFundCapitalFinished: false,

    resetCapitalChangesPending: false,
    resetCapitalChangesFinished: false,

    previewCapitalChangesPending: false,
    previewCapitalChangesFinished: false,

    saveCapitalChangesPending: false,
    saveCapitalChangesFinished: false
};

export function reducer(state = initialState, action: fromActions.CapitalsActions): State {
    switch (action.type) {

        case fromActions.CapitalsActionTypes.LOAD_FUND_COMPLEXES: {
            return {
                ...state,
                fundComplexesLoading: true,
                fundComplexesLoaded: false,
                fundComplexesError: null
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_FUND_COMPLEXES_COMPLETE: {
            return {
                ...state,
                fundComplexesLoading: false,
                fundComplexesLoaded: true,
                fundComplexes: [...action.payload],
                input: {'asOfDate': moment().format('MM-DD-YYYY'), 'fundComplex': action.payload[0] }
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_FUND_COMPLEXES_FAILED: {
            return {
                ...state,
                fundComplexesLoading: false,
                fundComplexesLoaded: false,
                fundComplexesError: action.payload
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_CAPITAL_MATRIX: {
            return {
                ...state,
                capitalMatrixLoading: true,
                capitalMatrixLoaded: false,
                capitalMatrixError: null,

                capitalMatrixFunds: [],
                capitalMatrix: [],
                capitalMatrixNew: [],
                capitalMatrixDiff: [],

                capitalMatrixPct: [],
                capitalMatrixPctNew: [],
                capitalMatrixPctDiff: []
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_CAPITAL_MATRIX_COMPLETE:
        case fromActions.CapitalsActionTypes.UPDATE_FUND_CAPITAL_COMPLETE:
        case fromActions.CapitalsActionTypes.UPDATE_CROSSPOD_CAPITAL_COMPLETE:
        case fromActions.CapitalsActionTypes.RESET_CAPITAL_CHANGES_COMPLETE: {
            const payload = action.payload;
            const funds = payload['funds'];
            const matrix = payload['matrix'];
            const matrixNew = payload['matrixNew'];
            const matrixDiff = payload['matrixDiff'];

            const matrixPct = payload['matrixPct'];
            const matrixPctNew = payload['matrixPctNew'];
            const matrixPctDiff = payload['matrixPctDiff'];

            const fundMapping = payload['fundMap'];
            const crossPodMapping = payload['crossPodMap'];



            const input = Object.assign({}, state.input, {'guid': payload['guid'], 'asOfDate': payload['asOfDate']});
            return {
                ...state,
                input: {...input},
                capitalMatrixLoading: false,
                capitalMatrixLoaded: true,
                capitalMatrixFunds: [...funds],
                capitalMatrix: [...matrix],
                capitalMatrixNew: [...matrixNew],
                capitalMatrixDiff: [...matrixDiff],

                capitalMatrixPct: [...matrixPct],
                capitalMatrixPctNew: [...matrixPctNew],
                capitalMatrixPctDiff: [...matrixPctDiff],

                fundMapping: fundMapping,
                crossPodMapping: crossPodMapping,
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_CAPITAL_MATRIX_FAILED: {
            return {
                ...state,
                capitalMatrixLoading: false,
                capitalMatrixLoaded: false,
                capitalMatrixError: action.payload
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_FUND_CAPITAL_FLOWS: {
            return {
                ...state,
                flowsInput: action.payload,
                fundCapitalFlowsLoading: true,
                fundCapitalFlowsLoaded: false,
                fundCapitalFlowsError: null
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_FUND_CAPITAL_FLOWS_COMPLETE: {
            return {
                ...state,
                fundCapitalFlowsLoading: false,
                fundCapitalFlowsLoaded: true,
                fundCapitalFlows: [...action.payload]
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_FUND_CAPITAL_FLOWS_FAILED: {
            return {
                ...state,
                fundCapitalFlowsLoading: false,
                fundCapitalFlowsLoaded: false,
                fundCapitalFlowsError: action.payload
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_POD_CAPITAL_FLOWS: {
            return {
                ...state,
                flowsInput: action.payload,
                podCapitalFlowsLoading: true,
                podCapitalFlowsLoaded: false,
                podCapitalFlowsError: null
            };
        }


        case fromActions.CapitalsActionTypes.LOAD_POD_CAPITAL_FLOWS_COMPLETE: {
            return {
                ...state,
                podCapitalFlowsLoading: false,
                podCapitalFlowsLoaded: true,
                podCapitalFlows: [...action.payload]
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_POD_CAPITAL_FLOWS_FAILED: {
            return {
                ...state,
                podCapitalFlowsLoading: false,
                podCapitalFlowsLoaded: false,
                podCapitalFlowsError: action.payload
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_FUND_CAPITAL_HISTORY: {
            return {
                ...state,
                capitalHistoryInput: action.payload,
                fundCapitalHistoryLoading: true,
                fundCapitalHistoryLoaded: false,
                fundCapitalHistoryError: null
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_FUND_CAPITAL_HISTORY_COMPLETE: {
            return {
                ...state,
                fundCapitalHistoryLoading: false,
                fundCapitalHistoryLoaded: true,
                fundCapitalHistory: [...action.payload]
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_FUND_CAPITAL_HISTORY_FAILED: {
            return {
                ...state,
                fundCapitalHistoryLoading: false,
                fundCapitalHistoryLoaded: false,
                fundCapitalHistoryError: action.payload
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_POD_CAPITAL_HISTORY: {
            return {
                ...state,
                capitalHistoryInput: action.payload,
                podCapitalHistoryLoading: true,
                podCapitalHistoryLoaded: false,
                podCapitalHistoryError: null
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_POD_CAPITAL_HISTORY_COMPLETE: {
            // const newEntities = Object.assign({}, state.podCapitalHistoryEntities, {[action.payload.fundID]: action.payload.history});
            return {
                ...state,
                podCapitalHistoryLoading: false,
                podCapitalHistoryLoaded: true,
                // podCapitalHistoryEntities: newEntities
                podCapitalHistory: action.payload.history,
            };
        }

        case fromActions.CapitalsActionTypes.LOAD_POD_CAPITAL_HISTORY_FAILED: {
            return {
                ...state,
                podCapitalHistoryLoading: false,
                podCapitalHistoryLoaded: false,
                podCapitalHistoryError: action.payload
            };
        }



        // ------------------------------------------------------------------------

        case fromActions.CapitalsActionTypes.UPDATE_CROSSPOD_CAPITAL: {
            return {
                ...state,
                updateCrosspodCapitalPending: true,
                updateCrosspodCapitalFinished: false,
                updateCrosspodCapitalError: null
            };
        }

        case fromActions.CapitalsActionTypes.UPDATE_CROSSPOD_CAPITAL_FAILED: {
            return {
                ...state,
                updateCrosspodCapitalPending: false,
                updateCrosspodCapitalFinished: false,
                updateCrosspodCapitalError: action.payload
            };
        }

        // -----------------------------------------------------------------------------

        case fromActions.CapitalsActionTypes.UPDATE_FUND_CAPITAL: {
            return {
                ...state,
                updateFundCapitalPending: true,
                updateFundCapitalFinished: false,
                updateFundCapitalError: null
            };
        }

        case fromActions.CapitalsActionTypes.UPDATE_FUND_CAPITAL_FAILED: {
            return {
                ...state,
                updateFundCapitalPending: false,
                updateFundCapitalFinished: false,
                updateFundCapitalError: action.payload
            };
        }

        // ------------------------------------------------------------------------

        case fromActions.CapitalsActionTypes.RESET_CAPITAL_CHANGES: {
            return {
                ...state,
                resetCapitalChangesPending: true,
                resetCapitalChangesFinished: false,
                resetCapitalChangesError: null
            };
        }

        case fromActions.CapitalsActionTypes.UPDATE_CROSSPOD_CAPITAL_FAILED: {
            return {
                ...state,
                resetCapitalChangesPending: false,
                resetCapitalChangesFinished: false,
                resetCapitalChangesError: action.payload
            };
        }

        case fromActions.CapitalsActionTypes.PREVIEW_CAPITAL_CHANGES: {
            return {
                ...state,
                previewCapitalChangesPending: true,
                previewCapitalChangesFinished: false,
                previewCapitalChangesError: null
            };
        }

        case fromActions.CapitalsActionTypes.PREVIEW_CAPITAL_CHANGES_COMPLETE: {
            const payload = action.payload;
            const fundCapitalChanges = payload['fundCapital'];
            const podCapitalChanges = payload['podCapital'];
            return {
                ...state,
                previewCapitalChangesPending: false,
                previewCapitalChangesFinished: true,
                fundCapitalChangePreview: [...fundCapitalChanges],
                podCapitalChangePreview: [...podCapitalChanges]
            };
        }


        case fromActions.CapitalsActionTypes.PREVIEW_CAPITAL_CHANGES_FAILED: {
            const payload = action.payload;
            return {
                ...state,
                previewCapitalChangesPending: false,
                previewCapitalChangesFinished: false,
                previewCapitalChangesError: action.payload
            };
        }

        case fromActions.CapitalsActionTypes.SAVE_CAPITAL_CHANGES: {
            return {
                ...state,
                saveCapitalChangesPending: true,
                saveCapitalChangesFinished: false,
                saveCapitalChangesResult: null
            };
        }

        case fromActions.CapitalsActionTypes.SAVE_CAPITAL_CHANGES_COMPLETE:
        case fromActions.CapitalsActionTypes.SAVE_CAPITAL_CHANGES_FAILED: {
            return {
                ...state,
                saveCapitalChangesPending: false,
                saveCapitalChangesFinished: true,
                saveCapitalChangesResult: action.payload
            };
        }

        case fromActions.CapitalsActionTypes.RESET_CAPITAL_CHANGES_RESULT: {
            return {
                ...state,
                saveCapitalChangesPending: false,
                saveCapitalChangesFinished: false,
                saveCapitalChangesResult: null
            };
        }

        default: {
            return state;
        }
    }
}

export const getFundMapping = (state: State) => state.fundMapping;
export const getCrossPodMapping = (state: State) => state.crossPodMapping;

export const getFundComplexes = (state: State) => state.fundComplexes;
export const getFundComplexesLoading = (state: State) => state.fundComplexesLoading;
export const getFundComplexesLoaded = (state: State) => state.fundComplexesLoaded;
export const getFundComplexesError = (state: State) => state.fundComplexesError;

export const getCapitalsInput = (state: State) => state.input;

export const getCapitalMatrixLoading = (state: State) => state.capitalMatrixLoading;
export const getCapitalMatrixLoaded = (state: State) => state.capitalMatrixLoaded;
export const getCapitalMatrixError = (state: State) => state.capitalMatrixError;

export const getCapitalMatrixFunds = (state: State) => state.capitalMatrixFunds;
export const getCapitalMatrix = (state: State) => state.capitalMatrix;
export const getCapitalMatrixNew = (state: State) => state.capitalMatrixNew;
export const getCapitalMatrixDiff = (state: State) => state.capitalMatrixDiff;

export const getCapitalMatrixPct = (state: State) => state.capitalMatrixPct;
export const getCapitalMatrixPctNew = (state: State) => state.capitalMatrixPctNew;
export const getCapitalMatrixPctDiff = (state: State) => state.capitalMatrixPctDiff;

export const getPreviewFundCapitalChanges = (state: State) => state.fundCapitalChangePreview;
export const getPreviewPodCapitalChanges = (state: State) => state.podCapitalChangePreview;
export const getPreviewCapitalChangesLoading = (state: State) => state.previewCapitalChangesPending;
export const getPreviewCapitalChangesLoaded = (state: State) => state.previewCapitalChangesFinished;
export const getPreviewCapitalChangesError = (state: State) => state.previewCapitalChangesError;

export const getSaveCapitalChangesResult = (state: State) => state.saveCapitalChangesResult;
export const getSaveCapitalChangesLoading = (state: State) => state.saveCapitalChangesPending;
export const getSaveCapitalChangesLoaded = (state: State) => state.saveCapitalChangesFinished;

export const getCapitalFlowInput = (state: State) => state.flowsInput;
export const getFundCapitalFlows = (state: State) => state.fundCapitalFlows;
export const getFundCapitalFlowsLoading = (state: State) => state.fundCapitalFlowsLoading;
export const getFundCapitalFlowsLoaded = (state: State) => state.fundCapitalFlowsLoaded;
export const getFundCapitalFlowsError = (state: State) => state.fundCapitalFlowsError;

export const getPodCapitalFlows = (state: State) => state.podCapitalFlows;
export const getPodCapitalFlowsLoading = (state: State) => state.podCapitalFlowsLoading;
export const getPodCapitalFlowsLoaded = (state: State) => state.podCapitalFlowsLoaded;
export const getPodCapitalFlowsError = (state: State) => state.podCapitalFlowsError;

export const getCapitalHistoryInput = (state: State) => state.capitalHistoryInput;
export const getFundCapitalHistory = (state: State) => state.fundCapitalHistory;
export const getFundCapitalHistoryLoading = (state: State) => state.fundCapitalHistoryLoading;
export const getFundCapitalHistoryLoaded = (state: State) => state.fundCapitalHistoryLoaded;
export const getFundCapitalHistoryError = (state: State) => state.fundCapitalHistoryError;

export const getPodCapitalHistoryFundIDs = (state: State) => state.podCapitalHistoryFundIDs;
export const getPodCapitalHistory = (state: State) => state.podCapitalHistory;
export const getPodCapitalHistoryLoading = (state: State) => state.podCapitalHistoryLoading;
export const getPodCapitalHistoryLoaded = (state: State) => state.podCapitalHistoryLoaded;
export const getPodCapitalHistoryError = (state: State) => state.podCapitalHistoryError;

export const getUpdateCrosspodCapitalPending = (state: State) => state.updateCrosspodCapitalPending;
export const getUpdateCrosspodCapitalFinished = (state: State) => state.updateCrosspodCapitalFinished;
export const getUpdateCrosspodCapitalError = (state: State) => state.updateCrosspodCapitalError;

export const getUpdateFundCapitalPending = (state: State) => state.updateFundCapitalPending;
export const getUpdateFundCapitalFinished = (state: State) => state.updateFundCapitalFinished;
export const getUpdateFundCapitalError = (state: State) => state.updateFundCapitalError;

export const getResetCapitalChangesPending = (state: State) => state.resetCapitalChangesPending;
export const getResetCapitalChangesFinished = (state: State) => state.resetCapitalChangesFinished;
export const getResetCapitalChangesError = (state: State) => state.resetCapitalChangesError;
