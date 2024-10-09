import * as fromActions from './../actions/counterparty.actions';

export interface State {
    cdsSpreads: any[];
    cdsSpreadsLoading: boolean;
    cdsSpreadsLoaded: boolean;
    cdsSpreadsError?: string;
}

const initialState: State = {

    cdsSpreads: [],
    cdsSpreadsLoading: false,
    cdsSpreadsLoaded: false
};

export function reducer(state = initialState, action: fromActions.CounterpartyExposureActions): State {
    switch (action.type) {

        case fromActions.CounterpartyExposureActionTypes.LOAD_COUNTERPARTY_CDS_SPREADS: { 
            return {
                ...state, 
                cdsSpreads: [],
                cdsSpreadsLoading: true,
                cdsSpreadsLoaded: false,
                cdsSpreadsError: null
            };
        }

        case fromActions.CounterpartyExposureActionTypes.LOAD_COUNTERPARTY_CDS_SPREADS_COMPLETE: {
            return {
                ...state,
                cdsSpreads: action.payload,
                cdsSpreadsLoading: false,
                cdsSpreadsLoaded: true
            };
        }

        case fromActions.CounterpartyExposureActionTypes.LOAD_COUNTERPARTY_CDS_SPREADS_FAILED: {
            return {
                ...state,
                cdsSpreadsLoading: false,
                cdsSpreadsLoaded: false,
                cdsSpreadsError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getCounterpartyCDSSpreads = (state: State) => state.cdsSpreads;
export const getCounterpartyCDSSpreadsLoading = (state: State) => state.cdsSpreadsLoading;
export const getCounterpartyCDSSpreadsLoaded = (state: State) => state.cdsSpreadsLoaded;
export const getCounterpartyCDSSpreadsError = (state: State) => state.cdsSpreadsError;
