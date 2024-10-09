import * as fromActions from '../actions/sec-master-config-downstream-mapping.action';
import * as fromModels from '../../models';

export interface SecMasterConfigDownstreamMappingState {

    downstreamMapping: any[]
    downstreamMappingLoading: boolean;
    downstreamMappingLoaded: boolean;
    downstreamMappingError?: string;
}

export const initialState: SecMasterConfigDownstreamMappingState = {

    downstreamMapping: [],
    downstreamMappingLoading: false,
    downstreamMappingLoaded: false
};

export function reducer(state = initialState, action: fromActions.SecMasterConfigDownstreamMappingActions) {
    switch (action.type) {

        case fromActions.SecMasterConfigDownstreamMappingActionTypes.LOAD_DOWNSTREAM_MAPPING: {
            return {
                ...state,
                downstreamMappingLoading: true,
                downstreamMappingLoaded: false,
                downstreamMappingError: null
            };
        }

        case fromActions.SecMasterConfigDownstreamMappingActionTypes.LOAD_DOWNSTREAM_MAPPING_COMPLETE: {
            return {
                ...state,
                downstreamMapping: action.payload,
                downstreamMappingLoading: false,
                downstreamMappingLoaded: true,
                downstreamMappingError: null
            };
        }

        case fromActions.SecMasterConfigDownstreamMappingActionTypes.LOAD_DOWNSTREAM_MAPPING_FAILED: {
            return {
                ...state,
                downstreamMappingLoading: false,
                downstreamMappingLoaded: false,
                downstreamMappingError: action.payload
            };
        }

        default:
            return state;
    }
}

// Bbg Data Map
export const getDownstreamMapping = (state: SecMasterConfigDownstreamMappingState) => state.downstreamMapping;
export const getDownstreamMappingLoading = (state: SecMasterConfigDownstreamMappingState) => state.downstreamMappingLoading;
export const getDownstreamMappingLoaded = (state: SecMasterConfigDownstreamMappingState) => state.downstreamMappingLoaded;
export const getDownstreamMappingError = (state: SecMasterConfigDownstreamMappingState) => state.downstreamMappingError;


