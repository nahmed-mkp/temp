import * as fromActions from '../actions';

export interface SyntheticsState {

    syntheticsEntity: any;
    syntheticsLoading: boolean;
    syntheticsLoaded: boolean;
    syntheticsError?: string;
}

export const initialState: SyntheticsState = {
    syntheticsEntity: {},
    syntheticsLoading: false,
    syntheticsLoaded: false,
    syntheticsError: null,
};

export function reducer(state = initialState, action: fromActions.SyntheticsActions) {
    switch (action.type) {

        case fromActions.SyntheticsActionTypes.LOAD_SYNTHETICS: {
            return {
                ...state,
                syntheticsLoading: true,
                syntheticsLoaded: false,
                syntheticsError: null
            };
        }

        case fromActions.SyntheticsActionTypes.LOAD_SYNTHETICS_COMPLETE: {
            return {
                ...state,
                syntheticsEntity: action.payload,
                syntheticsLoading: false,
                syntheticsLoaded: true,
                syntheticsError: null
            };
        }

        case fromActions.SyntheticsActionTypes.LOAD_SYNTHETICS_FAILED: {
            return {
                ...state,
                syntheticsLoading: false,
                syntheticsLoaded: false,
                syntheticsError: action.payload
            };
        }


        default:
            return state;
    }
}

export const getSyntheticsEntities = (state: SyntheticsState) => state.syntheticsEntity;
export const getSyntheticsLoading = (state: SyntheticsState) => state.syntheticsLoading;
export const getSyntheticsLoaded = (state: SyntheticsState) => state.syntheticsLoaded;
export const getSyntheticsError = (state: SyntheticsState) => state.syntheticsError;


