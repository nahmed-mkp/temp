import { createReducer, on } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromActions from '../actions/multi-asset-options.actions';

export interface State {

    multiAssetOptionsEntity: any,
    multiAssetOptionsLoading: boolean;
    multiAssetOptionsLoaded: boolean;
    multiAssetOptionsError?: string;

    multiAssetOptionOwnership: any;
    multiAssetOptionOwnershipLoading: boolean;
    multiAssetOptionOwnershipLoaded: boolean;
    multiAssetOptionOwnershipError?: string;

    securityDetail: any;
    securityDetailLoading: boolean;
    securityDetailLoaded: boolean;
    securityDetailError?: string;

    multiAssetOptionUpdatePending: boolean;
    multiAssetOptionUpdateComplete: boolean;
    multiAssetOptionUpdateError?: string

    multiAssetOptionLegUpdatePending: boolean;
    multiAssetOptionLegUpdateComplete: boolean;
    multiAssetOptionLegUpdateError?: string

}

const initialState: State = {

    multiAssetOptionsEntity: {},
    multiAssetOptionsLoading: false,
    multiAssetOptionsLoaded: false,

    multiAssetOptionOwnership: [],
    multiAssetOptionOwnershipLoading: false,
    multiAssetOptionOwnershipLoaded: false,

    securityDetail: [],
    securityDetailLoading: false,
    securityDetailLoaded: false,

    multiAssetOptionUpdatePending: false,
    multiAssetOptionUpdateComplete: false,

    multiAssetOptionLegUpdatePending: false,
    multiAssetOptionLegUpdateComplete: false

}

export const reducer = createReducer(

    initialState, 

    /* ============ LOAD MULTI ASSET OPTIONS =================== */ 

    on(fromActions.loadMultiAssetOptions, (state) => {
        return {
            ...state,
            multiAssetOptionsLoading: true,
            multiAssetOptionsLoaded: false,
        }
    }),

    on(fromActions.loadMultiAssetOptionsComplete, (state, action) => {

        let incoming_data = action.res;

        // Separate legs into an array (assuming only 2 legs)
        action.res.data.map(opt => {
            let l1 = {};
            let l2 = {};
            Object.keys(opt).map((key:string) => {
                if(key.includes('Leg1')){
                    let trimmedKey = key.replace("Leg1_", "")
                    l1[trimmedKey] = opt[key]; 
                }
                if(key.includes('Leg2')){
                    let trimmedKey = key.replace("Leg2_", "")
                    l2[trimmedKey] = opt[key]
                }
            })
            opt['Legs'] = [l1,l2]
        })

        return {
            ...state,
            multiAssetOptionsEntity: action.res,
            multiAssetOptionsLoading: false,
            multiAssetOptionsLoaded: true,
        }
    }),

    on(fromActions.loadMultiAssetOptionsFailed, (state, action) => {
        return {
            ...state,
            multiAssetOptionsLoading: false,
            multiAssetOptionsLoaded: false,
            multiAssetOptionsError: action.err
        }
    }),

    /* ============ OWNERSHIP =================== */ 

    on(fromActions.loadMultiAssetOptionsOwnership, (state, action) => {
        return {
            ...state,
            multiAssetOptionOwnershipLoading: true,
            multiAssetOptionOwnershipLoaded: false,
            multiAssetOptionOwnershipError: null
        }
    }),

    on(fromActions.loadMultiAssetOptionsOwnershipComplete, (state, action) => {
        return {
            ...state,
            multiAssetOptionOwnership: action.res,
            multiAssetOptionOwnershipLoading: false,
            multiAssetOptionOwnershipLoaded: true
        }
    }),


    on(fromActions.loadMultiAssetOptionsOwnershipFailed, (state, action) => {
        return {
            ...state,
            multiAssetOptionOwnershipLoading: false,
            multiAssetOptionOwnershipLoaded: false,
            multiAssetOptionOwnershipError: action.err
        }
    }),

    /* ============ DETAILS =================== */ 

    on(fromActions.loadMultiAssetOptionsDetail, (state,action) => {
        return {
            ...state,
            securityDetailLoading: true,
            securityDetailLoaded: false,
            securityDetailError: null
        }
    }),

    
    on(fromActions.loadMultiAssetOptionsDetailComplete, (state,action) => {
        return {
            ...state,
            securityDetail: action.res,
            securityDetailLoading: false,
            securityDetailLoaded: true
        }
    }),

    
    on(fromActions.loadMultiAssetOptionsDetailFailed, (state,action) => {
        return {
            ...state,
            securityDetailLoading: false,
            securityDetailLoaded: false,
            securityDetailError: action.err
        }
    }),

    /* ============ UPDATE OPTION =================== */ 

    on(fromActions.updateMultiAssetOption, (state) => {
        return {
            ...state,
            multiAssetOptionUpdatePending: true,
            multiAssetOptionUpdateComplete: false
        }
    }),

    on(fromActions.updateMultiAssetOptionComplete, (state) => {
        return {
            ...state,
            multiAssetOptionUpdatePending: false,
            multiAssetOptionUpdateComplete: true
        }
    }),


    on(fromActions.updateMultiAssetOptionFailed, (state, action) => {
        return {
            ...state,
            multiAssetOptionUpdatePending: false,
            multiAssetOptionUpdateComplete: false,
            multiAssetOptionUpdateError: action.err
        }
    }),
    

)

export const getMultiAssetOptions = (state: State) => state.multiAssetOptionsEntity;
export const getMultiAssetOptionsLoading = (state: State) => state.multiAssetOptionsLoading;
export const getMultiAssetOptionsLoaded = (state: State) => state.multiAssetOptionsLoaded;

export const getMultiAssetOptionsOwnership = (state: State) => state.multiAssetOptionOwnership;
export const getMultiAssetOptionsOwnershipLoading = (state: State) => state.multiAssetOptionOwnershipLoading;
export const getMultiAssetOptionsOwnershipLoaded = (state: State) => state.multiAssetOptionOwnershipLoaded;

export const getMultiAssetOptionSecurityDetail = (state: State) => state.securityDetail;
export const getMultiAssetOptionSecurityDetailLoading = (state: State) => state.securityDetailLoading;
export const getMultiAssetOptionSecurityDetailLoaded = (state: State) => state.securityDetailLoaded;
