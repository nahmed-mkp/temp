import * as fromActions from './../actions/drift-new.actions';
import * as fromModels from './../../models/drift-new.models';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';

export interface State {
    request: fromModels.IDriftParams;
    
    fundPodTradeDrift: any[];
    fundPodTradeDriftLoading: boolean;
    fundPodTradeDriftLoaded: boolean;
    fundPodTradeDriftError?: string;
};

const initialState: State = {

    request: {'asOfDate': new Date().toLocaleDateString(), 'mode': 'monthly'},

    fundPodTradeDrift: [],
    fundPodTradeDriftLoading: false,
    fundPodTradeDriftLoaded: false        
};

export function reducer(state = initialState, action: fromActions.DriftNewActions ): State {
    switch (action.type) {
        
        case fromActions.DriftNewActionTypes.LOAD_FUND_POD_TRADE_DRIFT: {
            return {
                ...state,
                fundPodTradeDrift: [],
                fundPodTradeDriftLoading: true,
                fundPodTradeDriftLoaded: false,
                fundPodTradeDriftError: null
            };
        }

        case fromActions.DriftNewActionTypes.LOAD_FUND_POD_TRADE_DRIFT_COMPLETE: {
            return {
                ...state, 
                fundPodTradeDrift: [...action.payload],
                fundPodTradeDriftLoading: false,
                fundPodTradeDriftLoaded: true
            };
        }

        case fromActions.DriftNewActionTypes.LOAD_FUND_POD_TRADE_DRIFT_FAILED: {
            return {
                ...state,
                fundPodTradeDriftLoading: false,
                fundPodTradeDriftLoaded: false,
                fundPodTradeDriftError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getDriftParams = (state: State) => state.request;

export const getFundPodTradeDrift = (state: State) => state.fundPodTradeDrift;
export const getFundPodTradeDriftLoading = (state: State) => state.fundPodTradeDriftLoading;
export const getFundPodTradeDriftLoaded = (state: State) => state.fundPodTradeDriftLoaded;
export const getFundPodTradeDriftError = (state: State) => state.fundPodTradeDriftError;
