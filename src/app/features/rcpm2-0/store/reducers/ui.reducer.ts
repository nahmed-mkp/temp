import * as fromActions from '../actions/ui.actions';

export interface State {
    executionModeEntity: {
        [layoutName: string]: boolean
    };
    dataRetrievalMethod: 'http' | 'sockets' | null;
    dataRetrievalMethodLoading: boolean;
    dataRetrievalModeLoaded: boolean;
    dataRetrievalModeFailed?: string;
    lastPositionRequestTs?: Date;
}

const initialState: State = {
    executionModeEntity: {},
    dataRetrievalMethod: 'http',
    dataRetrievalMethodLoading: false,
    dataRetrievalModeLoaded: false,
};

export function reducer(state = initialState, action: fromActions.UiActions): State {

    switch (action.type) {

        case fromActions.UiActionTypes.SET_EXECUTION_DISPLAY_MODE: {
            return {
                ...state,
                executionModeEntity: {
                    ...state.executionModeEntity,
                    [action.payload.layoutName]: action.payload.mode
                }
            };
        }

        case fromActions.UiActionTypes.SET_DATA_RETRIEVAL_MODE: {
            return {
                ...state,
                dataRetrievalMethod: action.payload,
                dataRetrievalMethodLoading: false,
                dataRetrievalModeLoaded: false,
                dataRetrievalModeFailed: null
            };
        }

        case fromActions.UiActionTypes.LOAD_DATA_RETRIEVAL_MODE: {
            return {
                ...state,
                dataRetrievalMethodLoading: true,
                dataRetrievalModeLoaded: false,
                dataRetrievalModeFailed: null
            };
        }

        case fromActions.UiActionTypes.LOAD_DATA_RETRIEVAL_MODE_COMPLETE: {
            return {
                ...state,
                dataRetrievalMethod: action.payload,
                dataRetrievalMethodLoading: false,
                dataRetrievalModeLoaded: true,
                dataRetrievalModeFailed: null,
                lastPositionRequestTs: new Date(Date.now())
            };
        }

        case fromActions.UiActionTypes.LOAD_DATA_RETRIEVAL_MODE_FAILED: {
            return {
                ...state,
                dataRetrievalMethod: null,
                dataRetrievalMethodLoading: false,
                dataRetrievalModeLoaded: false,
                dataRetrievalModeFailed: action.payload
            };
        }



        default: {
            return state;
        }
    }
}

export const getExecutionModeEntity = (state: State) => state.executionModeEntity;
export const getDataRetrievalMethod = (state: State) => state.dataRetrievalMethod;
export const getLastPositionRequestTs = (state: State) => state.lastPositionRequestTs;
