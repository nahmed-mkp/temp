import * as fromActions from '../actions';

export interface AssetSwapsState {

    assetSwapsEntity: any;
    assetSwapsLoading: boolean;
    assetSwapsLoaded: boolean;
    assetSwapsError?: string;
}

export const initialState: AssetSwapsState = {
    assetSwapsEntity: {},
    assetSwapsLoading: false,
    assetSwapsLoaded: false,
    assetSwapsError: null,
};

export function reducer(state = initialState, action: fromActions.AssetSwapsActions) {
    switch (action.type) {

        case fromActions.AssetSwapsActionTypes.LOAD_ASSET_SWAPS: {
            return {
                ...state,
                assetSwapsLoading: true,
                assetSwapsLoaded: false,
                assetSwapsError: null
            };
        }

        case fromActions.AssetSwapsActionTypes.LOAD_ASSET_SWAPS_COMPLETE: {
            return {
                ...state,
                assetSwapsEntity: action.payload,
                assetSwapsLoading: false,
                assetSwapsLoaded: true,
                assetSwapsError: null
            };
        }

        case fromActions.AssetSwapsActionTypes.LOAD_ASSET_SWAPS_FAILED: {
            return {
                ...state,
                assetSwapsLoading: false,
                assetSwapsLoaded: false,
                assetSwapsError: action.payload
            };
        }


        default:
            return state;
    }
}

export const getAssetSwapsEntities = (state: AssetSwapsState) => state.assetSwapsEntity;
export const getAssetSwapsLoading = (state: AssetSwapsState) => state.assetSwapsLoading;
export const getAssetSwapsLoaded = (state: AssetSwapsState) => state.assetSwapsLoaded;
export const getAssetSwapsError = (state: AssetSwapsState) => state.assetSwapsError;


