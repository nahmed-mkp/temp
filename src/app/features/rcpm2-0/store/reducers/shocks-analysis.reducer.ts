import * as fromActions from '../actions/shock-analysis.actions';
import * as _ from 'lodash';

export interface State {
    shockInfo: any;
    shockInfoLoading: boolean;
    shockInfoLoaded: boolean;
    shockInfoError?: string;

    shockAssetClass: any;
    shockAssetClassLoading: boolean;
    shockAssetClassLoaded: boolean;
    shockAssetClassError?: string;

    shockTriggerPending: boolean;
    shockTriggerComplete: boolean;
    shockTriggerError?: string;
}

const initialState: State = {
    shockInfo: null,
    shockInfoLoading: false,
    shockInfoLoaded: false,

    shockAssetClass: null,
    shockAssetClassLoading: false,
    shockAssetClassLoaded: false,

    shockTriggerPending: false,
    shockTriggerComplete: false,
}

export function reducer(state = initialState, action: fromActions.ShockAnalysisActions): State {

    switch (action.type) {

        case fromActions.ShockAnalysisActionTypes.LOAD_SHOCK_INFO: {
            return {
                ...state,
                shockInfoLoading: true,
                shockInfoLoaded: false,
                shockInfoError: null
            };
        }

        case fromActions.ShockAnalysisActionTypes.LOAD_SHOCK_INFO_COMPLETE: {
            return {
                ...state,
                shockInfoLoading: false,
                shockInfoLoaded: true,
                shockInfo: action.payload,
                shockInfoError: null
            };
        }

        case fromActions.ShockAnalysisActionTypes.LOAD_SHOCK_INFO_FAILED: {
            return {
                ...state,
                shockInfoLoading: false,
                shockInfoLoaded: false,
                shockInfoError: action.payload,
            };
        }







        case fromActions.ShockAnalysisActionTypes.LOAD_SHOCK_ASSET_CLASS: {
            return {
                ...state,
                shockAssetClassLoading: true,
                shockAssetClassLoaded: false,
                shockAssetClassError: null
            };
        }

        case fromActions.ShockAnalysisActionTypes.LOAD_SHOCK_ASSET_CLASS_COMPLETE: {
            return {
                ...state,
                shockAssetClassLoading: false,
                shockAssetClassLoaded: true,
                shockAssetClass: action.payload,
                shockAssetClassError: null
            };
        }

        case fromActions.ShockAnalysisActionTypes.LOAD_SHOCK_ASSET_CLASS_FAILED: {
            return {
                ...state,
                shockAssetClassLoading: false,
                shockAssetClassLoaded: false,
                shockAssetClassError: action.payload,
            };
        }






        case fromActions.ShockAnalysisActionTypes.HIT_SHOCK_TRIGGER: {
            return {
                ...state,
                shockTriggerPending: true,
                shockTriggerComplete: false,
                shockTriggerError: null
            };
        }

        case fromActions.ShockAnalysisActionTypes.HIT_SHOCK_TRIGGER_COMPLETE: {
            return {
                ...state,
                shockTriggerPending: false,
                shockTriggerComplete: true,
                shockTriggerError: null
            };
        }

        case fromActions.ShockAnalysisActionTypes.HIT_SHOCK_TRIGGER_FAILED: {
            return {
                ...state,
                shockTriggerPending: false,
                shockTriggerComplete: false,
                shockTriggerError: action.payload,
            };
        }


        default: {
            return state;
        }
    }
}


export const getShockInfo = (state: State) => state.shockInfo;
export const getShockInfoLoading = (state: State) => state.shockInfoLoading;
export const getShockInfoLoaded = (state: State) => state.shockInfoLoaded;
export const getShockInfoError = (state: State) => state.shockInfoError;

export const getShockAssetClass = (state: State) => state.shockAssetClass;
export const getShockAssetClassLoading = (state: State) => state.shockAssetClassLoading;
export const getShockAssetClassLoaded = (state: State) => state.shockAssetClassLoaded;
export const getShockAssetClassError = (state: State) => state.shockAssetClassError;

export const getShockTriggerPending = (state: State) => state.shockTriggerPending;
export const getShockTriggerComplete = (state: State) => state.shockTriggerComplete;
export const getShockTriggerError = (state: State) => state.shockTriggerError;
