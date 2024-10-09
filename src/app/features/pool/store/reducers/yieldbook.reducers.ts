import * as fromActions from '../actions/yieldbook.actions';
import * as fromModels from '../../models/yieldbook.models';

export interface State {

    selectedDate?: string;
    selectedRequestLog?: number;

    logs: {
        ids: number[];
        entities: {[id: number]: fromModels.IYieldbookRequestLog};
        loading: boolean;
        loaded: boolean;
        error?: string;
    };
    requests: {
        ids: number[];
        entities: {[id: number]: fromModels.IYieldbookRequest };
    };
    responses: {
        ids: number[];
        entities: {[id: number]: fromModels.IYieldbookResponse };
    };

    // ---------------------------------------------------------------------

    yieldbookRequest: {
        [PortfolioId: string]: {
            [RecordId: string]: string; // Status
        }
    };

    yieldbookResponse: {
        [PortfolioId: string]: {
            [RecordId: string]: any; // yieldbook mega result data
        }
    };
}

const initialState: State = {
    logs: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false
    },
    requests: {
        ids: [],
        entities: {}
    },
    responses: {
        ids: [],
        entities: {}
    },

    // ----------------------------------------------------------------------------

    yieldbookRequest: null,
    yieldbookResponse: null,
};

export function reducer(state = initialState, action: fromActions.YieldbookActions): State {
    switch (action.type) {

        case fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_LOGS_BY_DATE: {
            return {
                ...state,
                selectedDate: action.payload,
                logs: {
                    ids: [],
                    entities: {},
                    loading: true,
                    loaded: false,
                    error: null
                },
                requests: {
                    ids: [],
                    entities: {}
                },
                responses: {
                    ids: [],
                    entities: {}
                }
            };
        }

        case fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_LOGS_BY_DATE_COMPLETE: {
            const payload = action.payload;
            const newIds = payload.map((requestLog) => requestLog.yieldBookRequestID)
                .filter((id) => state.logs.ids.indexOf(id) < 0);
            const newEntities = payload.reduce((entities: {[id: string]: fromModels.IYieldbookRequestLog},
                item: fromModels.IYieldbookRequestLog) => {
                    return Object.assign({}, entities, {[item.yieldBookRequestID]: item});
                }, state.logs.entities);
            return {
                ...state,
                logs: {
                    ids: [...state.logs.ids, ...newIds],
                    entities: newEntities,
                    loading: false,
                    loaded: true
                }
            };
        }

        case fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_LOGS_BY_DATE_FAILED: {

            return {
                ...state,
                logs: {
                    ids: [...state.logs.ids],
                    entities: {...state.logs.entities},
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }

        case fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_BY_ID: {
            const payload = action.payload;
            const exists = state.requests.ids.filter((id: number) => id === payload);
            const newIds = state.requests.ids.filter((id: number) => id !== payload);
            const newEntities = Object.assign({}, state.requests.entities);
            if (exists.length > 0) {
                const entity = state.requests.entities[payload];
                if (entity !== undefined) {
                    const newEntity = Object.assign({}, entity, {requestLoading: true, requestLoaded: false, requestError: null});
                    newEntities[newEntity.yieldBookRequestID] = newEntity;
                }
            }
            return {
                ...state,
                selectedRequestLog: action.payload,
                requests: {
                    ids: [payload, ...newIds],
                    entities: newEntities
                }
            };
        }

        case fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_BY_ID_COMPLETE: {
            const payload = Object.assign({}, action.payload, {requestLoading: false, requestLoaded: true});
            const newIds = state.requests.ids.filter((id: number) => id !== payload.yieldBookRequestID);
            const newEntities = Object.assign({}, state.requests.entities, {[payload.yieldBookRequestID]: payload});
            return {
                ...state,
                requests: {
                    ids: [payload.yieldBookRequestID, ...newIds],
                    entities: newEntities
                }
            };
        }

        case fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_BY_ID_FAILED: {
            const payload = Object.assign({}, action.payload, { requestLoading: false, requestLoaded: false, requestError: action.payload });
            const newIds = state.requests.ids.filter((id: number) => id !== payload.yieldBookRequestID);
            const newEntities = Object.assign({}, state.requests.entities, { [payload.yieldBookRequestID]: payload });
            return {
                ...state,
                requests: {
                    ids: [payload.yieldBookRequestID, ...newIds],
                    entities: newEntities
                }
            };
        }


        case fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_RESPONSE_BY_ID: {
            const payload = action.payload;
            const exists = state.requests.ids.filter((id: number) => id === payload);
            const newIds = state.requests.ids.filter((id: number) => id !== payload);
            const newEntities = Object.assign({}, state.requests.entities);
            if (exists.length > 0) {
                const entity = state.requests.entities[payload];
                if (entity !== undefined) {
                    const newEntity = Object.assign({}, entity, { requestLoading: true, requestLoaded: false, requestError: null });
                    newEntities[newEntity.yieldBookRequestID] = newEntity;
                }
            }
            return {
                ...state,
                selectedRequestLog: action.payload,
                responses: {
                    ids: [payload, ...newIds],
                    entities: newEntities
                }
            };
        }

        case fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_RESPONSE_BY_ID_COMPLETE: {
            const payload = Object.assign({}, action.payload, { requestLoading: false, requestLoaded: true });
            const newIds = state.requests.ids.filter((id: number) => id !== payload.yieldBookRequestID);
            const newEntities = Object.assign({}, state.requests.entities, { [payload.yieldBookRequestID]: payload });
            return {
                ...state,
                responses: {
                    ids: [payload.yieldBookRequestID, ...newIds],
                    entities: newEntities
                }
            };
        }

        case fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_RESPONSE_BY_ID_FAILED: {
            const payload = Object.assign({}, action.payload, { requestLoading: false, requestLoaded: false, requestError: action.payload });
            const newIds = state.requests.ids.filter((id: number) => id !== payload.yieldBookRequestID);
            const newEntities = Object.assign({}, state.requests.entities, { [payload.yieldBookRequestID]: payload });
            return {
                ...state,
                responses: {
                    ids: [payload.yieldBookRequestID, ...newIds],
                    entities: newEntities
                }
            };
        }

        // --------------------------------------------------------------------------------------------------------------------

        default: {
            return state;
        }
    }
}

export const getSelectedDate = (state: State) => state.selectedDate;
export const getSelectedRequestLog = (state: State) => state.selectedRequestLog;

export const getRequestLogIds = (state: State) => state.logs.ids;
export const getRequestLogEntities = (state: State) => state.logs.entities;
export const getRequestLogsLoading = (state: State) => state.logs.loading;
export const getRequestLogsLoaded = (state: State) => state.logs.loaded;
export const getRequestLogsError = (state: State) => state.logs.error;

export const getRequestIds = (state: State) => state.requests.ids;
export const getRequestEntities = (state: State) => state.requests.entities;

export const getResponseIds = (state: State) => state.responses.ids;
export const getResponseEntities = (state: State) => state.responses.entities;

// ------------------------------------------------------------------------------

export const getYieldbookRequest = (state: State) => state.yieldbookRequest;
export const getYieldbookResponse = (state: State) => state.yieldbookResponse;

