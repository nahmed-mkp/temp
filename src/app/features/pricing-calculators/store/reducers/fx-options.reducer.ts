import * as fromActions from '../actions';

export interface FXOptionState {
    inputs: any;
    inputsLoading: boolean;
    inputsLoaded: boolean;
    inputsError?: string;
    outputs: any;
    outputsLoading: boolean;
    outputsLoaded: boolean;
    outputsError?: string;
}

export const initialState: FXOptionState = {
    inputs: {},
    inputsLoading: false,
    inputsLoaded: false,
    inputsError: null,
    outputs: {},
    outputsLoading: false,
    outputsLoaded: false,
    outputsError: null
};

export function reducer(state = initialState, action: fromActions.FXOptionActions) {
    switch (action.type) {

        case fromActions.FXOptionActionTypes.LOAD_INPUTS: {
            return {
                ...state,
                inputsLoading: true,
                inputsLoaded: false,
                inputsError: null
            };
        }

        case fromActions.FXOptionActionTypes.LOAD_INPUTS_COMPLETE: {
            return {
                ...state,
                inputs: action.payload,
                inputsLoading: false,
                inputsLoaded: true,
                inputsError: null
            };
        }

        case fromActions.FXOptionActionTypes.LOAD_INPUTS_FAILED: {
            return {
                ...state,
                inputsLoading: false,
                inputsLoaded: false,
                inputsError: action.payload
            };
        }

        case fromActions.FXOptionActionTypes.LOAD_OUTPUTS: {
            return {
                ...state,
                outputsLoading: true,
                outputsLoaded: false,
                outputsError: null
            };
        }

        case fromActions.FXOptionActionTypes.LOAD_OUTPUTS_COMPLETE: {
            return {
                ...state,
                outputs: action.payload,
                outputsLoading: false,
                outputsLoaded: true,
                outputsError: null
            };
        }

        case fromActions.FXOptionActionTypes.LOAD_INPUTS_FAILED: {
            return {
                ...state,
                outputsLoading: false,
                outputsLoaded: false,
                outputsError: action.payload
            };
        }

        default:
            return state;
    }
}

export const getInputs = (state: FXOptionState) => state.inputs;
export const getInputsLoading = (state: FXOptionState) => state.inputsLoading;
export const getInputsLoaded = (state: FXOptionState) => state.inputsLoaded;
export const getInputsError = (state: FXOptionState) => state.inputsError;
export const getOutputs = (state: FXOptionState) => state.outputs;
export const getOutputsLoading = (state: FXOptionState) => state.outputsLoading;
export const getOutputsLoaded = (state: FXOptionState) => state.outputsLoaded;
export const getOutputsError = (state: FXOptionState) => state.outputsError;
