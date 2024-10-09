import * as fromActions from '../actions';

export interface OptionsState {

    inputs: any;
    inputsLoading: boolean;
    inputsLoaded: boolean;
    inputsError?: string;
}

export const initialState: OptionsState = {
    inputs: {},
    inputsLoading: false,
    inputsLoaded: false,
    inputsError: null,
};

export function reducer(state = initialState, action: fromActions.OptionActions) {
    switch (action.type) {

        case fromActions.OptionActionTypes.OPTIONS_LOAD_INPUTS: {
            return {
                ...state,
                inputsLoading: true,
                inputsLoaded: false,
                inputsError: null
            };
        }

        case fromActions.OptionActionTypes.OPTIONS_LOAD_INPUTS_COMPLETE: {
            return {
                ...state,
                inputs: action.payload,
                inputsLoading: false,
                inputsLoaded: true,
                inputsError: null
            };
        }

        case fromActions.OptionActionTypes.OPTIONS_LOAD_INPUTS_FAILED: {
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

export const getOptionsInputs = (state: OptionsState) => state.inputs;
export const getOptionsInputsLoading = (state: OptionsState) => state.inputsLoading;
export const getOptionsInputsLoaded = (state: OptionsState) => state.inputsLoaded;
export const getOptionsInputsError = (state: OptionsState) => state.inputsError;
