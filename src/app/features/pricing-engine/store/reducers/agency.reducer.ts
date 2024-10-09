import * as fromActions from '../actions';

export interface AgencyState {

    agencyEntity: any;
    agencyLoading: boolean;
    agencyLoaded: boolean;
    agencyError?: string;
}

export const initialState: AgencyState = {
    agencyEntity: {},
    agencyLoading: false,
    agencyLoaded: false,
    agencyError: null,
};

export function reducer(state = initialState, action: fromActions.AgencyActions) {
    switch (action.type) {

        case fromActions.AgencyActionTypes.LOAD_AGENCY: {
            return {
                ...state,
                agencyLoading: true,
                agencyLoaded: false,
                agencyError: null
            };
        }

        case fromActions.AgencyActionTypes.LOAD_AGENCY_COMPLETE: {
            return {
                ...state,
                agencyEntity: action.payload,
                agencyLoading: false,
                agencyLoaded: true,
                agencyError: null
            };
        }

        case fromActions.AgencyActionTypes.LOAD_AGENCY_FAILED: {
            return {
                ...state,
                agencyLoading: false,
                agencyLoaded: false,
                agencyError: action.payload
            };
        }


        default:
            return state;
    }
}

export const getAgencyEntities = (state: AgencyState) => state.agencyEntity;
export const getAgencyLoading = (state: AgencyState) => state.agencyLoading;
export const getAgencyLoaded = (state: AgencyState) => state.agencyLoaded;
export const getAgencyError = (state: AgencyState) => state.agencyError;


