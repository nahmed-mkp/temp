// import * as fromModels from '../../models/rebalancer.models';
import * as _ from 'lodash';
import * as fromActions from '../actions/rebalancer.actions';

export interface State {

    allocations: any[];
    allocationsLoading: boolean;
    allocationsLoaded: boolean;
    allocationsError?: string;

    uniqueStrategyPercentage: any;

    selectedDate?: string;
}

const initialState: State = {

    allocations: [],
    allocationsLoading: false,
    allocationsLoaded: false,

    uniqueStrategyPercentage: null,
};

export function reducer(state = initialState, action: fromActions.TradeNameAllocationRebalancerActions): State {
    switch (action.type) {

        case fromActions.TradeNameAllocationRebalancerActionTypes.LOAD_TRADENAME_ALLOCATIONS:
        {
            return {
                ...state,
                selectedDate: action.payload,
                allocationsLoading: true,
                allocationsLoaded: false,
                allocationsError: null
            };
        }

        case fromActions.TradeNameAllocationRebalancerActionTypes.SAVE_TRADENAME_ALLOCATIONS:
        {
            return {
                ...state,
                allocationsLoading: true,
                allocationsLoaded: false,
                allocationsError: null
            };
        }

        case fromActions.TradeNameAllocationRebalancerActionTypes.LOAD_TRADENAME_ALLOCATIONS_COMPLETE:
        case fromActions.TradeNameAllocationRebalancerActionTypes.SAVE_TRADENAME_ALLOCATIONS_COMPLETE: {

            const uniqueStrategyPercentage = {};
            action.payload.forEach(element => {
                if (uniqueStrategyPercentage[element['Strategy']] === undefined) {
                    uniqueStrategyPercentage[element['Strategy']] = Object.assign({}, element);
                }
            });
            return {
                ...state,
                allocations: [...action.payload],
                allocationsLoading: false,
                allocationsLoaded: true,
                uniqueStrategyPercentage: uniqueStrategyPercentage
            };
        }

        case fromActions.TradeNameAllocationRebalancerActionTypes.LOAD_TRADENAME_ALLOCATIONS_FAILED:
        case fromActions.TradeNameAllocationRebalancerActionTypes.SAVE_TRADENAME_ALLOCATIONS_FAILED: {
            return {
                ...state,
                allocationsLoading: true,
                allocationsLoaded: false,
                allocationsError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedDate = (state: State) => state.selectedDate;
export const getAllocations = (state: State) => state.allocations;
export const getAllocationsLoading = (state: State) => state.allocationsLoading;
export const getAllocationsLoaded = (state: State) => state.allocationsLoaded;
export const getAllocationsError = (state: State) => state.allocationsError;
export const getUniqueStrategyPercentage = (state: State) => state.uniqueStrategyPercentage;

