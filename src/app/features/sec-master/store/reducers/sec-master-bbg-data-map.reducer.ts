import * as fromActions from '../actions/sec-master-bbg-data-map.action';
import * as fromModels from '../../models';

export interface SecMasterBbgDataMapState {

    bbgDataMap: fromModels.IBbgDataMap[]
    bbgDataMapLoading: boolean;
    bbgDataMapLoaded: boolean;
    bbgDataMapError?: string;
}

export const initialState: SecMasterBbgDataMapState = {

    bbgDataMap: [],
    bbgDataMapLoading: false,
    bbgDataMapLoaded: false
};

export function reducer(state = initialState, action: fromActions.SecMasterBbgDataMapActions) {
    switch (action.type) {

        case fromActions.SecMasterBbgDataMapActionTypes.LOAD_BBG_DATA_MAP: {
            return {
                ...state,
                bbgDataMapLoading: true,
                bbgDataMapLoaded: false,
                bbgDataMapError: null
            };
        }

        case fromActions.SecMasterBbgDataMapActionTypes.LOAD_BBG_DATA_MAP_COMPLETE: {
            return {
                ...state,
                bbgDataMap: action.payload,
                bbgDataMapLoading: false,
                bbgDataMapLoaded: true,
                bbgDataMapError: null
            };
        }

        case fromActions.SecMasterBbgDataMapActionTypes.LOAD_BBG_DATA_MAP_FAILED: {
            return {
                ...state,
                bbgDataMapLoading: false,
                bbgDataMapLoaded: false,
                bbgDataMapError: action.payload
            };
        }

        default:
            return state;
    }
}

// Bbg Data Map
export const getBbgDataMap = (state: SecMasterBbgDataMapState) => state.bbgDataMap;
export const getBbgDataMapLoading = (state: SecMasterBbgDataMapState) => state.bbgDataMapLoading;
export const getBbgDataMapLoaded = (state: SecMasterBbgDataMapState) => state.bbgDataMapLoaded;
export const getBbgDataMapError = (state: SecMasterBbgDataMapState) => state.bbgDataMapError;


