import * as fromModels from '../../models/allocations.models';
import * as fromActions from '../actions/allocations.actions';

export interface State {

  allocationTriggers: fromModels.IAllocationTrigger[];
  allocationTriggersLoading: boolean;
  allocationTriggersLoaded: boolean;
  allocationTriggersError?: string;

  selectedAllocationTrigger?: fromModels.IAllocationTrigger;

}

const initialState: State = {

    allocationTriggers: [],
    allocationTriggersLoading: false,
    allocationTriggersLoaded: false
};

export function reducer(state = initialState, action: fromActions.AllocationActions): State {
    switch (action.type) {

        case fromActions.AllocationActionTypes.LOAD_ALLOCATION_TRIGGERS: {
            return {
                ...state,
                allocationTriggersLoading: true,
                allocationTriggersLoaded: false,
                allocationTriggersError: null
            };
        }

        case fromActions.AllocationActionTypes.LOAD_ALLOCATION_TRIGGERS_COMPLETE: {
            return {
                ...state,
                allocationTriggers: [...action.payload],
                allocationTriggersLoading: false,
                allocationTriggersLoaded: true
            };
        }

        case fromActions.AllocationActionTypes.LOAD_ALLOCATION_TRIGGERS_FAILED: {
            return {
                ...state,
                allocationTriggersLoading: true,
                allocationTriggersLoaded: false,
                allocationTriggersError: action.payload
            };
        }

        case fromActions.AllocationActionTypes.SELECT_ALLOCATION_TRIGGER: {
            return {
                ...state,
                selectedAllocationTrigger: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getAllocationTriggers = (state: State) => state.allocationTriggers;
export const getAllocationTriggersLoading = (state: State) => state.allocationTriggersLoading;
export const getAllocationTriggersLoaded = (state: State) => state.allocationTriggersLoaded;
export const getAllocationTriggersError = (state: State) => state.allocationTriggersError;
export const getSelectedAllocationTrigger = (state: State) => state.selectedAllocationTrigger;
