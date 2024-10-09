import { createReducer, on } from '@ngrx/store';
import * as fromModels from '../../models/tradename.models';
import * as fromActions from '../actions/tradename.actions';

export interface State {

    pmPodDetails: any[];
    crossPodStratergyMapping: any;
    detailsLoading: boolean;
    detailsLoaded: boolean;
    detailsError?: string;

    clientServicesTradeThemes: any[],
    clientServicesTradeThemesLoading: boolean;
    clientServicesTradeThemesLoaded: boolean;
    clientServicesTradeThemesError?: string;

    creatingTradeName: boolean;
    createdTradeName: boolean;
    createTradeNameSuccessMessage?: string;
    createTradeNameFailureMessage?: string;

    multiAllocTradeNames: fromModels.IMultiAllocTradeName[];
    multiAllocTradeNamesLoading: boolean;
    multiAllocTradeNamesLoaded: boolean;
    multiAllocTradeNamesError?: string;

    multiAllocationSplit: fromModels.IMultiAllocationSplit[];
    multiAllocationSplitLoading: boolean;
    multiAllocationSplitLoaded: boolean;
    multiAllocationSplitError?: string;
    multiAllocationSplitStatus?: string;

}

const initialState: State = {

    pmPodDetails: [],
    crossPodStratergyMapping: null,
    detailsLoading: false,
    detailsLoaded: false,

    clientServicesTradeThemes: [],
    clientServicesTradeThemesLoading: false,
    clientServicesTradeThemesLoaded: false,

    creatingTradeName: false,
    createdTradeName: false,

    multiAllocTradeNames: [],
    multiAllocTradeNamesLoading: false,
    multiAllocTradeNamesLoaded: false,

    multiAllocationSplit: [],
    multiAllocationSplitLoading: false,
    multiAllocationSplitLoaded: false,
    multiAllocationSplitStatus: null
};

export const reducer = createReducer(
   
    initialState,

    on(fromActions.loadPmPodDetails, (state) => {
        return {
            ...state,
            detailsLoading: true, 
            detailsLoaded: false,
            detailsError: null
        }
    }),

    on(fromActions.loadPmPodDetailsComplete, (state, action) => {

        const crossPodStratergyMapping = {};
        if (action.res.allocations) {
            Object.keys(action.res.allocations).forEach(key => {
                if (action.res.allocations[key] && action.res.allocations[key].length && action.res.allocations[key].length > 0) {
                    const targetObject = action.res.allocations[key][0];
                    if (crossPodStratergyMapping[targetObject.CrossPodName] === undefined) {
                        crossPodStratergyMapping[targetObject.CrossPodName] = [targetObject.TradeType];
                    } else {
                        crossPodStratergyMapping[targetObject.CrossPodName].push(targetObject.TradeType);
                    }
                }
            });
        }

        return {
            ...state,
            pmPodDetails: action.res,
            detailsLoading: false,
            detailsLoaded: true,
            crossPodStratergyMapping: crossPodStratergyMapping
        };
    }),

    on(fromActions.loadPmPodDetailsFailed, (state, action) => {
        return {
            ...state,
            detailsLoading: false, 
            detailsLoaded: false,
            detailsError: action.err
        }
    }),

    on(fromActions.loadClientServicesTradeThemes, (state) => {
        return {
            ...state,
            clientServicesTradeThemesLoading: true,
            clientServicesTradeThemesLoaded: false
        }
    }),

    on(fromActions.loadClientServicesTradeThemesComplete, (state, action) => {
        return {
            ...state,
            clientServicesTradeThemes: action.res,
            clientServicesTradeThemesLoading: false,
            clientServicesTradeThemesLoaded: true
        }
    }),

    on(fromActions.loadClientServicesTradeThemesFailed, (state, action) => {
        return {
            ...state,
            clientServicesTradeThemesLoading: false,
            clientServicesTradeThemesLoaded: false,
            clientServicesTradeThemesError: action.err
        }
    }),

    on(fromActions.createTradeName, (state, action) => {
        return {
            ...state,
            creatingTradeName: true,
            createdTradeName: false,
            createTradeNameSuccessMessage: null,
            createTradeNameFailureMessage: null
        }
    }),

    on(fromActions.createTradeNameComplete, (state, action) => {
        const result = action.res;
        const status = result.status;
        const message = result.message;

        if (status === 'success') {
            return {
                ...state,
                creatingTradeName: false,
                createdTradeName: true,
                createTradeNameSuccessMessage: message
            };

        } else {
            return {
                ...state,
                creatingTradeName: false,
                createdTradeName: false,
                createTradeNameFailureMessage: message
            };
        }
    }),

    on(fromActions.createTradeNameFailed, (state, action) => {
        return {
            ...state,
            creatingTradeName: false,
            createdTradeName: false,
            createTradeNameFailureMessage: action.err
        };
    }),

    on(fromActions.clearTradeNameCreateMessage, (state) => {
        return {
            ...state,
            createTradeNameSuccessMessage: null,
            createTradeNameFailureMessage: null,
        }
    }),

    on(fromActions.loadMultipleAllocTradeNames, (state) => {
        return {
            ...state,
            multiAllocTradeNames: [],
            multiAllocTradeNamesLoading: true,
            multiAllocTradeNamesLoaded: false,
            multiAllocTradeNamesError: null,

            multiAllocationSplit: [],
            multiAllocationSplitLoading: false,
            multiAllocationSplitLoaded: false,
            multiAllocationSplitError: null,

            multiAllocationSplitStatus:  null
        }
    }),

    on(fromActions.loadMultipleAllocTradeNamesComplete, (state,action) => {
        return {
            ...state,
            multiAllocTradeNames: action.res,
            multiAllocTradeNamesLoading: false,
            multiAllocTradeNamesLoaded: true,

            multiAllocationSplit: [],
            multiAllocationSplitLoading: false,
            multiAllocationSplitLoaded: false,
            multiAllocationSplitError: null,
            multiAllocationSplitStatus: null
        };
    }),

    on(fromActions.loadMultipleAllocTradeNamesFailed, (state,action) => {
        return {
            ...state,
            multiAllocTradeNames: [],
            multiAllocTradeNamesLoading: false,
            multiAllocTradeNamesLoaded: false,
            multiAllocTradeNamesError: action.err,

            multiAllocationSplit: [],
            multiAllocationSplitLoading: false,
            multiAllocationSplitLoaded: false,
            multiAllocationSplitError: null
        }
    }),
    
    on(fromActions.loadMultipleAllocTradeNameSplit, (state) => {
        return {
            ...state,
            multiAllocationSplit: [],
            multiAllocationSplitLoading: true,
            multiAllocationSplitLoaded: false,
            multiAllocationSplitError: null,
            multiAllocationSplitStatus: null
        }
    }),

    on(fromActions.loadMultipleAllocTradeNameSplitComplete, (state,action) => {
        return {
            ...state,
            multiAllocationSplit: [...action.res],
            multiAllocationSplitLoading: false,
            multiAllocationSplitLoaded: true,
            multiAllocationSplitStatus: null
        }
    }),

    on(fromActions.loadMultipleAllocTradeNameSplitFailed,
        fromActions.createMultipleAllocTradeNameSplitFailed,
        fromActions.updateMultipleAllocTradeNameSplitFailed, (state,action) => {
            return {
                ...state,
                multiAllocationSplit: [],
                multiAllocationSplitLoading: false,
                multiAllocationSplitLoaded: false,
                multiAllocationSplitError: action.err
            };
        }
    ),

    on(fromActions.createMultipleAllocTradeNameSplit,
        fromActions.updateMultipleAllocTradeNameSplit, (state,action) => {
            return {
                ...state,
                multiAllocationSplitStatus: 'Saving...'
            }
        }
    ),

    on(fromActions.createMultipleAllocTradeNameSplitComplete,
        fromActions.updateMultipleAllocTradeNameSplitComplete, (state,action) => {
            const payload = action.res;
            const split: fromModels.IMultiAllocationSplit[] = payload.split;
            const multiAllocTradeName: fromModels.IMultiAllocTradeName = {'tid': payload.tid, 'tradeID': payload.tradeID, 'tradeName': payload.tradeName};
            const existingTradeNamesExPayload = state.multiAllocTradeNames.filter((tradeName) => tradeName.tid !== multiAllocTradeName.tid);
            existingTradeNamesExPayload.unshift(multiAllocTradeName);
            return {
                ...state,
                multiAllocTradeNames: [...existingTradeNamesExPayload],
                multiAllocationSplit: [...split],
                multiAllocationSplitLoading: false,
                multiAllocTradeNamesLoaded: true,
                multiAllocationSplitStatus: 'Successfully saved allocation splits!'
            };
        }
    )
)


export const getPMPodDetails = (state: State) => state.pmPodDetails;
export const getDetailsLoading = (state: State) => state.detailsLoading;
export const getDetailsLoaded = (state: State) => state.detailsLoaded;
export const getDetailsError = (state: State) => state.detailsError;
export const getCrossPodStratergyMapping = (state: State) => state.crossPodStratergyMapping;

export const getClientServicesTradeThemes = (state: State) => state.clientServicesTradeThemes;
export const getClientServicesTradeThemesLoading = (state: State) => state.clientServicesTradeThemesLoading;
export const getClientServicesTradeThemesLoaded = (state: State) => state.clientServicesTradeThemesLoaded;
export const getClientServicesTradeThemeErrror = (state: State) => state.clientServicesTradeThemesError;

export const getCreatingTradeNameStatus = (state: State) => state.creatingTradeName;
export const getCreatedTradeNameStatus = (state: State) => state.createdTradeName;
export const getCreateTradeNameSuccessMessage = (state: State) => state.createTradeNameSuccessMessage;
export const getCreateTradeNameFailureMessage = (state: State) => state.createTradeNameFailureMessage;

// Multiple alloc tradenames
export const getMultipleAllocTradeNames = (state: State) => state.multiAllocTradeNames;
export const getMultipleAllocTradeNamesLoading = (state: State) => state.multiAllocTradeNamesLoading;
export const getMultipleAllocTradeNamesLoaded = (state: State) => state.multiAllocTradeNamesLoaded;
export const getMultipleAllocTradeNamesError = (state: State) => state.multiAllocTradeNamesError;

export const getMultipleAllocationSplit = (state: State) => state.multiAllocationSplit;
export const getMultipleAllocationSplitLoading = (state: State) => state.multiAllocationSplitLoading;
export const getMultipleAllocationSplitLoaded = (state: State) => state.multiAllocationSplitLoaded;
export const getMultipleAllocationSplitError = (state: State) => state.multiAllocationSplitError;
export const getMultipleAllocationSplitStatus = (state: State) => state.multiAllocationSplitStatus;




