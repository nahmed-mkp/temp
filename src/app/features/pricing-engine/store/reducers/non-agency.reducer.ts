import * as fromActions from '../actions';

export interface NonAgencyState {

    nonAgencyEntity: any;
    nonAgencyLoading: boolean;
    nonAgencyLoaded: boolean;
    nonAgencyError?: string;
}

export const initialState: NonAgencyState = {
    nonAgencyEntity: {},
    nonAgencyLoading: false,
    nonAgencyLoaded: false,
    nonAgencyError: null,
};

export function reducer(state = initialState, action: fromActions.NonAgencyActions) {
    switch (action.type) {

        case fromActions.NonAgencyActionTypes.LOAD_NON_AGENCY: {
            return {
                ...state,
                nonAgencyLoading: true,
                nonAgencyLoaded: false,
                nonAgencyError: null
            };
        }

        case fromActions.NonAgencyActionTypes.LOAD_NON_AGENCY_COMPLETE: {
            return {
                ...state,
                nonAgencyEntity: action.payload,
                nonAgencyLoading: false,
                nonAgencyLoaded: true,
                nonAgencyError: null
            };
        }

        case fromActions.NonAgencyActionTypes.LOAD_NON_AGENCY_FAILED: {
            return {
                ...state,
                nonAgencyLoading: false,
                nonAgencyLoaded: false,
                nonAgencyError: action.payload
            };
        }


        default:
            return state;
    }
}

export const getNonAgencyEntities = (state: NonAgencyState) => state.nonAgencyEntity;
export const getNonAgencyLoading = (state: NonAgencyState) => state.nonAgencyLoading;
export const getNonAgencyLoaded = (state: NonAgencyState) => state.nonAgencyLoaded;
export const getNonAgencyError = (state: NonAgencyState) => state.nonAgencyError;


