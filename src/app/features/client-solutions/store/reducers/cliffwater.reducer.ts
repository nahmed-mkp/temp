import * as fromActions from '../actions';
import * as fromModels from '../../models';

export interface CliffwaterState {

    params: fromModels.ICliffwaterReq;

    data: string[];
    loading: boolean;
    loaded: boolean;
    error?: string;
}

const initialState: CliffwaterState = {
    params: null,

    data: [],
    loading: false,
    loaded: false,
}

export function reducer(state = initialState, action: fromActions.CliffwaterActions): CliffwaterState {
    
    switch(action.type) {

        case fromActions.CliffwaterActionsType.LOAD_CLIFFWATER_DATA: {
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null,
            }
        }

        case fromActions.CliffwaterActionsType.LOAD_CLIFFWATER_DATA_COMPLETE: {
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.payload,
                error: null,
            }
        }

        case fromActions.CliffwaterActionsType.LOAD_CLIFFWATER_DATA_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload,
            }
        }


        default: {
            return state;
        }
    }
}

export const getData = (state: CliffwaterState) => state.data;
export const getLoading = (state: CliffwaterState) => state.loading;
export const getLoaded = (state: CliffwaterState) => state.loaded;
export const getError = (state: CliffwaterState) => state.error;
