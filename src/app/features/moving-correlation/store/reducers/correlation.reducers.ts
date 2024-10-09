import * as fromModels from './../../models/correlation.model';
import * as fromActions from '../actions';

export interface State {

    movingCorrelationActiveRequestId: string;

    movingCorrelationSecurityList: {
        entities: string[];
        loading: boolean;
        loaded: boolean;
        error?: string;
    }

    movingCorrelationResponses: {
        ids: string[];
        entities: {[id: string]: fromModels.CorrelationResponse};
        loading: boolean;
        loaded: boolean;
        error?: string;
    }
}

const initialState: State = {

    movingCorrelationActiveRequestId: '',

    movingCorrelationSecurityList: {
        entities: [],
        loading: false,
        loaded: false
    },

    movingCorrelationResponses: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false
    }
}

export function reducer(state = initialState, action: fromActions.CorrelationActions): State {
    
    switch(action.type) {

        case fromActions.CorrelationTypes.LOAD_MOVING_CORRELATION_SECURITY_LIST: {
            return {
                ...state,
                movingCorrelationSecurityList: {
                    ...state.movingCorrelationSecurityList,
                    loading: true,
                    loaded: false,
                    error: null
                }
            }
        }

        case fromActions.CorrelationTypes.LOAD_MOVING_CORRELATION_SECURITY_LIST_COMPLETE: {
            return {
                ...state,
                movingCorrelationSecurityList: {
                    entities: action.payload,
                    loading: false,
                    loaded: true,
                    error: null
                }
            }
        }

        case fromActions.CorrelationTypes.LOAD_MOVING_CORRELATION_ROLLING_CORRELATION_FAILED: {
            return {
                ...state,
                movingCorrelationSecurityList: {
                    ...state.movingCorrelationSecurityList,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            }
        }

        //-----------------------------------------------------------------------------------------------------


        case fromActions.CorrelationTypes.LOAD_MOVING_CORRELATION_ROLLING_CORRELATION: {
            const newRequest = action.payload;

            return {
                ...state,
                movingCorrelationActiveRequestId: newRequest.id,
                movingCorrelationResponses: {
                    ...state.movingCorrelationResponses,
                    loading: true,
                    loaded: false,
                    error: null
                }
            }
        }

        case fromActions.CorrelationTypes.LOAD_MOVING_CORRELATION_ROLLING_CORRELATION_COMPLETE: {
            const newResponse = action.payload;

            if(state.movingCorrelationResponses.ids.indexOf(newResponse.id) < 0) {
                return {
                    ...state,
                    movingCorrelationResponses: {
                        ids: [...state.movingCorrelationResponses.ids, newResponse.id],
                        entities: Object.assign({}, state.movingCorrelationResponses.entities, {[newResponse.id]: newResponse}),
                        loaded: true,
                        loading: false,
                        error: null
                    }
                }
            } else {
                return state;
            }
        }

        case fromActions.CorrelationTypes.LOAD_MOVING_CORRELATION_ROLLING_CORRELATION_FAILED: {
            return {
                ...state,
                movingCorrelationResponses: {
                    ...state.movingCorrelationResponses,
                    error: action.payload,
                    loaded: false,
                    loading: false
                }
            }
        }

        default: {
            return state;
        }
    }
}

export const getMovingCorrelationActiveRequestId = (state: State) => state.movingCorrelationActiveRequestId;

export const getMovingCorrelationSecurityListEntities = (state: State) => state.movingCorrelationSecurityList.entities;
export const getMovingCorrelationSecurityListLoading = (state: State) => state.movingCorrelationSecurityList.loading;
export const getMovingCorrelationSecurityListLoaded = (state: State) => state.movingCorrelationSecurityList.loaded;
export const getMovingCorrelationSecurityListError = (state: State) => state.movingCorrelationSecurityList.error;

export const getMovingCorrelationResponsesIds = (state: State) => state.movingCorrelationResponses.ids;
export const getMovingCorrelationResponsesEntities = (state: State) => state.movingCorrelationResponses.entities;
export const getMovingCorrelationResponsesError = (state: State) => state.movingCorrelationResponses.error;
export const getMovingCorrelationResponsesLoading = (state: State) => state.movingCorrelationResponses.loading;
export const getMovingCorrelationResponsesLoaded = (state: State) => state.movingCorrelationResponses.loaded;