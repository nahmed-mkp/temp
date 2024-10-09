import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import moment from 'moment';

export interface BluePearlSyntheticTradesState {

    syntheticTrades: any;
    syntheticTradesLoading: boolean;
    syntheticTradesLoaded: boolean;
    syntheticTradesError?: string;

}

const initialState: BluePearlSyntheticTradesState = {

    syntheticTrades: [],
    syntheticTradesLoading: false,
    syntheticTradesLoaded: false,

};


export const reducer = createReducer(
    initialState, 

    /* ============ SYNTHETIC TRADES ================== */

    on(fromActions.loadSyntheticTrades, (state) => {
        return ({
            ...state,
            syntheticTradesLoading: true,
            syntheticTradesLoaded: false
        })
    }),

    on(fromActions.loadSyntheticTradesComplete, (state, action) => {
        return ({
            ...state,
            syntheticTrades: action.res,
            syntheticTradesLoading: false,
            syntheticTradesLoaded: true
        })
    }),

    on(fromActions.loadSyntheticTradesFailed, (state, action) => {
        return ({
            ...state,
            syntheticTradesLoading: false,
            syntheticTradesLoaded: false,
            syntheticTradesError: action.err
        })
    }),

)

export const getSyntheticTrades = (state: BluePearlSyntheticTradesState) => state.syntheticTrades;
