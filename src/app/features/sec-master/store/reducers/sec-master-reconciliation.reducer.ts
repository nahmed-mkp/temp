import * as fromActions from '../actions/';
import * as fromModels from '../../models';

export interface SecMasterReconciliationState {

    activeRequest: fromModels.ISecMasterRecInput;
    onlyDifferentColumnVisibility: boolean;

    Reconciliation: any;
    ReconciliationLoading: boolean;
    ReconciliationLoaded: boolean;
    ReconciliationError?: string;

    matchedSecurityDetailEntity: {[security: string]: any};
    matchedSecurityDetailLoadingEntity: {[security: string]: boolean};
    matchedSecurityDetailLoadedEntity: {[security: string]: boolean};
    matchedSecurityDetailErrorEntity: {[security: string]: string};

    unmatchedSecurityDetailEntity: {[security: string]: any};
    unmatchedSecurityDetailLoadingEntity: {[security: string]: boolean};
    unmatchedSecurityDetailLoadedEntity: {[security: string]: boolean};
    unmatchedSecurityDetailErrorEntity: {[security: string]: string};
}

export const initialState: SecMasterReconciliationState = {

    activeRequest: null,
    onlyDifferentColumnVisibility: false,

    Reconciliation: {},
    ReconciliationLoading: false,
    ReconciliationLoaded: false,

    matchedSecurityDetailEntity: {},
    matchedSecurityDetailLoadingEntity: {},
    matchedSecurityDetailLoadedEntity: {},
    matchedSecurityDetailErrorEntity: {},

    unmatchedSecurityDetailEntity: {},
    unmatchedSecurityDetailLoadingEntity: {},
    unmatchedSecurityDetailLoadedEntity: {},
    unmatchedSecurityDetailErrorEntity: {},
};

export function reducer(state = initialState, action: fromActions.SecMasterReconciliationActions) {
    switch (action.type) {


        case fromActions.SecMasterReconciliationActionTypes.SET_ONLY_DIFFERENT_COLUMN_VISIBILITY: {
            return {
                ...state,
                onlyDifferentColumnVisibility: action.payload
            }
        }








        case fromActions.SecMasterReconciliationActionTypes.LOAD_RECONCILIATION: {
            return {
                ...state,
                activeRequest: action.payload,
                ReconciliationLoading: true,
                ReconciliationLoaded: false,
                ReconciliationError: null
            };
        }

        case fromActions.SecMasterReconciliationActionTypes.LOAD_RECONCILIATION_COMPLETE: {
            return {
                ...state,
                Reconciliation: action.payload,
                ReconciliationLoading: false,
                ReconciliationLoaded: true,
                ReconciliationError: null
            };
        }

        case fromActions.SecMasterReconciliationActionTypes.LOAD_RECONCILIATION_FAILED: {
            return {
                ...state,
                ReconciliationLoading: false,
                ReconciliationLoaded: false,
                ReconciliationError: action.payload
            };
        }






        case fromActions.SecMasterReconciliationActionTypes.LOAD_RECONCILIATION_SECURITY_DETAIL: {

            if (action.payload.match === true) {
                return {
                    ...state,
                    matchedSecurityDetailLoadingEntity: {...state.matchedSecurityDetailLoadingEntity, [action.payload.securityName]: true},
                    matchedSecurityDetailLoadedEntity: {...state.matchedSecurityDetailLoadedEntity, [action.payload.securityName]: false},
                    matchedSecurityDetailErrorEntity: {...state.matchedSecurityDetailErrorEntity, [action.payload.securityName]: null}
                };
            } else {
                return {
                    ...state,
                    unmatchedSecurityDetailLoadingEntity: {...state.unmatchedSecurityDetailLoadingEntity, [action.payload.securityName]: true},
                    unmatchedSecurityDetailLoadedEntity: {...state.unmatchedSecurityDetailLoadedEntity, [action.payload.securityName]: false},
                    unmatchedSecurityDetailErrorEntity: {...state.unmatchedSecurityDetailErrorEntity, [action.payload.securityName]: null}
                };
            }
        }


        case fromActions.SecMasterReconciliationActionTypes.LOAD_RECONCILIATION_SECURITY_DETAIL_COMPLETE: {

            if (action.payload.match === true) {
                return {
                    ...state,
                    matchedSecurityDetailEntity: {...state.matchedSecurityDetailEntity, [action.payload.securityName]: action.payload.targetData},
                    matchedSecurityDetailLoadingEntity: {...state.matchedSecurityDetailLoadingEntity, [action.payload.securityName]: false},
                    matchedSecurityDetailLoadedEntity: {...state.matchedSecurityDetailLoadedEntity, [action.payload.securityName]: true},
                    matchedSecurityDetailErrorEntity: {...state.matchedSecurityDetailErrorEntity, [action.payload.securityName]: null}
                };
            } else {
                return {
                    ...state,
                    unmatchedSecurityDetailEntity: {...state.unmatchedSecurityDetailEntity, [action.payload.securityName]: action.payload.targetData},
                    unmatchedSecurityDetailLoadingEntity: {...state.unmatchedSecurityDetailLoadingEntity, [action.payload.securityName]: false},
                    unmatchedSecurityDetailLoadedEntity: {...state.unmatchedSecurityDetailLoadedEntity, [action.payload.securityName]: true},
                    unmatchedSecurityDetailErrorEntity: {...state.unmatchedSecurityDetailErrorEntity, [action.payload.securityName]: null}
                };
            }
        }



        case fromActions.SecMasterReconciliationActionTypes.LOAD_RECONCILIATION_SECURITY_DETAIL_FAILED: {

            if (action.payload.match === true) {
                return {
                    ...state,
                    matchedSecurityDetailEntity: {...state.matchedSecurityDetailEntity, [action.payload.SecurityName]: action.payload},
                    matchedSecurityDetailLoadingEntity: {...state.matchedSecurityDetailLoadingEntity, [action.payload.securityName]: false},
                    matchedSecurityDetailLoadedEntity: {...state.matchedSecurityDetailLoadedEntity, [action.payload.securityName]: false},
                    matchedSecurityDetailErrorEntity: {...state.matchedSecurityDetailErrorEntity, [action.payload.securityName]: action.payload.error}
                };
            } else {
                return {
                    ...state,
                    unmatchedSecurityDetailEntity: {...state.unmatchedSecurityDetailEntity, [action.payload.SecurityName]: action.payload},
                    unmatchedSecurityDetailLoadingEntity: {...state.unmatchedSecurityDetailLoadingEntity, [action.payload.securityName]: false},
                    unmatchedSecurityDetailLoadedEntity: {...state.unmatchedSecurityDetailLoadedEntity, [action.payload.securityName]: false},
                    unmatchedSecurityDetailErrorEntity: {...state.unmatchedSecurityDetailErrorEntity, [action.payload.securityName]: action.payload.error}
                };
            }
        }

        default:
            return state;
    }
}

// Bbg Data Map
export const getReconciliationRequest = (state: SecMasterReconciliationState) => state.activeRequest;
export const getOnlyDifferentColumnVisibility = (state: SecMasterReconciliationState) => state.onlyDifferentColumnVisibility;

export const getReconciliation = (state: SecMasterReconciliationState) => state.Reconciliation;
export const getReconciliationLoading = (state: SecMasterReconciliationState) => state.ReconciliationLoading;
export const getReconciliationLoaded = (state: SecMasterReconciliationState) => state.ReconciliationLoaded;
export const getReconciliationError = (state: SecMasterReconciliationState) => state.ReconciliationError;

export const getMatchedSecurityDetailEntity = (state: SecMasterReconciliationState) => state.matchedSecurityDetailEntity;
export const getMatchedSecurityDetailLoadingEntity = (state: SecMasterReconciliationState) => state.matchedSecurityDetailLoadingEntity;
export const getMatchedSecurityDetailLoadedEntity = (state: SecMasterReconciliationState) => state.matchedSecurityDetailLoadedEntity;
export const getMatchedSecurityDetailErrorEntity = (state: SecMasterReconciliationState) => state.matchedSecurityDetailErrorEntity;

export const getUnMatchedSecurityDetailEntity = (state: SecMasterReconciliationState) => state.unmatchedSecurityDetailEntity;
export const getUnMatchedSecurityDetailLoadingEntity = (state: SecMasterReconciliationState) => state.unmatchedSecurityDetailLoadingEntity;
export const getUnMatchedSecurityDetailLoadedEntity = (state: SecMasterReconciliationState) => state.unmatchedSecurityDetailLoadedEntity;
export const getUnMatchedSecurityDetailErrorEntity = (state: SecMasterReconciliationState) => state.unmatchedSecurityDetailErrorEntity;



