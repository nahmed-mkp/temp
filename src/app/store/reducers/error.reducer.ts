import * as fromActions from '../actions/error-handle.actions';
import * as fromModels from '../../models/error.models';

export interface State {
    panelDisplay: boolean;
    errorCollection: fromModels.HttpError[];
}

const initialState: State = {
    panelDisplay: false,
    errorCollection: []
};

export function reducer(state = initialState, action: fromActions.ErrorHandleActions ): State {

    switch (action.type) {

        case fromActions.ErrorHandleActionTypes.ADD_ERROR: {

            if (state.errorCollection.length >= 15) {
                state.errorCollection.pop();
            }

            return {
                ...state,
                panelDisplay: true,
                errorCollection: [action.payload, ...state.errorCollection]
            }
        }

        case fromActions.ErrorHandleActionTypes.REMOVE_ERROR: {

            state.errorCollection.splice(action.payload, 1);

            return {
                ...state,
                errorCollection: [...state.errorCollection]
            }
        }

        case fromActions.ErrorHandleActionTypes.REMOVE_ALL_ERRORS: {

            return {
                ...state,
                panelDisplay: false,
                errorCollection: []
            }
        }



        default: {
            return state;
        }
    }
}

export const getErrorCollection = (state: State) => state.errorCollection;
export const getPanelDisplay = (state: State) => state.panelDisplay;