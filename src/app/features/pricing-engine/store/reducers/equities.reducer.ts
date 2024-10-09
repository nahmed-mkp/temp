import * as fromActions from '../actions';

export interface EquitiesState {

    equitiesEntity: any;
    equitiesLoading: boolean;
    equitiesLoaded: boolean;
    equitiesError?: string;
}

export const initialState: EquitiesState = {
    equitiesEntity: {},
    equitiesLoading: false,
    equitiesLoaded: false,
    equitiesError: null,
};

export function reducer(state = initialState, action: fromActions.EquitiesActions) {
    switch (action.type) {

        case fromActions.EquitiesActionTypes.LOAD_EQUITIES: {
            return {
                ...state,
                equitiesLoading: true,
                equitiesLoaded: false,
                equitiesError: null
            };
        }

        case fromActions.EquitiesActionTypes.LOAD_EQUITIES_COMPLETE: {
            return {
                ...state,
                equitiesEntity: action.payload,
                equitiesLoading: false,
                equitiesLoaded: true,
                equitiesError: null
            };
        }

        case fromActions.EquitiesActionTypes.LOAD_EQUITIES_FAILED: {
            return {
                ...state,
                equitiesLoading: false,
                equitiesLoaded: false,
                equitiesError: action.payload
            };
        }


        default:
            return state;
    }
}

export const getEquitiesEntities = (state: EquitiesState) => state.equitiesEntity;
export const getEquitiesLoading = (state: EquitiesState) => state.equitiesLoading;
export const getEquitiesLoaded = (state: EquitiesState) => state.equitiesLoaded;
export const getEquitiesError = (state: EquitiesState) => state.equitiesError;


