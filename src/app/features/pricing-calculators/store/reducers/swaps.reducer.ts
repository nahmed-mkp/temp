import * as fromActions from '../actions';

export interface SwapsState {

    inputs: any;
    inputsLoading: boolean;
    inputsLoaded: boolean;
    inputsError?: string;
}

export const initialState: SwapsState = {
    inputs: {},
    inputsLoading: false,
    inputsLoaded: false,
    inputsError: null,
};

export function reducer(state = initialState, action: fromActions.SwapsActions) {
    switch (action.type) {

        case fromActions.SwapsActionTypes.LOAD_INPUTS: {
            return {
                ...state,
                inputsLoading: true,
                inputsLoaded: false,
                inputsError: null
            };
        }

        case fromActions.SwapsActionTypes.LOAD_INPUTS_COMPLETE: {
            return {
                ...state,
                inputs: action.payload,
                inputsLoading: false,
                inputsLoaded: true,
                inputsError: null
            };
        }

        case fromActions.SwapsActionTypes.LOAD_INPUTS_FAILED: {
            return {
                ...state,
                inputsLoading: false,
                inputsLoaded: false,
                inputsError: action.payload
            };
        }


        default:
            return state;
    }
}

export const getSwapsInputs = (state: SwapsState) => state.inputs;
export const getSwapsInputsLoading = (state: SwapsState) => state.inputsLoading;
export const getSwapsInputsLoaded = (state: SwapsState) => state.inputsLoaded;
export const getSwapsInputsError = (state: SwapsState) => state.inputsError;
