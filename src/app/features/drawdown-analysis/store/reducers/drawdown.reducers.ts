import * as fromModels from './../../models/drawdown.models';
import * as fromActions from '../actions';

export interface State {

    drawDownAnalysisActiveRequestId: string;

    drawDownSecurity: {
        ids: number[];
        entities: {[id: number]: fromModels.DrawDownSecurity},
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    drawDownAnalysisRequests: {
        ids: string[];
        entities: {[id: string]: fromModels.DrawDownAnalysisRequestWithID};
    }

    drawDownAnalysisTableResponses: {
        ids: string[];
        entities: {[id: string]: fromModels.DrawDownAnalysisResponse[]},
        loading: boolean;
        loaded: boolean;
        error?: string;
    }

    drawDownAnalysisTimeseriesResponses: {
        ids: string[];
        entities: {[id: string]: fromModels.DrawDownTimeSeriesResponse[]},
        loading: boolean;
        loaded: boolean;
        error?: string;
    }
}

const initialState: State = {

    drawDownAnalysisActiveRequestId: '',

    drawDownSecurity: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false
    },

    drawDownAnalysisRequests: {
        ids: [],
        entities: {}
    },

    drawDownAnalysisTableResponses: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false,
    },

    drawDownAnalysisTimeseriesResponses: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false,
    }
}


export function reducer(state = initialState, action: fromActions.DrawdownActions): State {
    switch(action.type) {

        case fromActions.DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_SECURITY: {
            return {
                ...state,
                drawDownSecurity: {
                    ...state.drawDownSecurity,
                    loading: true,
                    loaded: false,
                    error: null
                }
            }
        }

        case fromActions.DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_SECURITY_COMPLETE: {
            const securityList = action.payload;
            const newIds = securityList.map(security => security.sec_id).filter(id => state.drawDownSecurity.ids.indexOf(id)<0);
            const newEntiies = securityList.reduce((entities, security) => {
                return Object.assign({}, entities, {[security.sec_id]: security});
            }, state.drawDownSecurity.entities)

            return {
                ...state,
                drawDownSecurity: {
                    ids: [...state.drawDownSecurity.ids, ...newIds],
                    entities: newEntiies,
                    loading: false,
                    loaded: true,
                    error: null
                }
            }
        }

        case fromActions.DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_SECURITY_FAILED: {
            return {
                ...state,
                drawDownSecurity: {
                    ...state.drawDownSecurity,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            }
        }

        //-------------------------------------------------------------------------------------------------------------------

        case fromActions.DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS: {
            const newRequest = action.payload;

            if(state.drawDownAnalysisRequests.ids.indexOf(newRequest.id) < 0) {
                return {
                    ...state,
                    drawDownAnalysisActiveRequestId: newRequest.id,
                    drawDownAnalysisRequests: {
                        ids: [...state.drawDownAnalysisRequests.ids, newRequest.id],
                        entities: Object.assign({}, state.drawDownAnalysisRequests.entities, {[newRequest.id]: newRequest})
                    },
                    drawDownAnalysisTableResponses: {
                        ...state.drawDownAnalysisTableResponses,
                        loaded: false,
                        loading: true
                    },
                    drawDownAnalysisTimeseriesResponses: {
                        ...state.drawDownAnalysisTimeseriesResponses,
                        loaded: false,
                        loading: true
                    }
                }
            } else {
                return {
                    ...state,
                    drawDownAnalysisActiveRequestId: newRequest.id,
                }
            }
        }

        //--------------------------------------------------------------------------------------------------------------


        case fromActions.DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_TABLES_COMPLETE: {
            const newDrawdownTableResponse = action.payload

            if(state.drawDownAnalysisTableResponses.ids.indexOf(newDrawdownTableResponse.id) < 0) {
                return {
                    ...state,
                    drawDownAnalysisTableResponses: {
                        ...state.drawDownAnalysisTableResponses,
                        ids: [...state.drawDownAnalysisTableResponses.ids, newDrawdownTableResponse.id],
                        entities: Object.assign({}, state.drawDownAnalysisTableResponses.entities, {[newDrawdownTableResponse.id]: newDrawdownTableResponse.payload}),
                        loaded: true,
                        loading: false,
                        error: null
                    }
                }
            } else {
                return state;
            }
        }

        case fromActions.DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_TABLES_FAILED: {
            return {
                ...state,
                drawDownAnalysisTableResponses: {
                    ...state.drawDownAnalysisTableResponses,
                    error: action.payload,
                    loaded: false,
                    loading: false
                }
            }
        }

        //---------------------------------------------------------------------------------------------------------------



        case fromActions.DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_TIMESERIES_COMPLETE: {
            const newDrawdownTimeseriesResponse = action.payload

            if(state.drawDownAnalysisTimeseriesResponses.ids.indexOf(newDrawdownTimeseriesResponse.id) < 0) {
                return {
                    ...state,
                    drawDownAnalysisTimeseriesResponses: {
                        ...state.drawDownAnalysisTimeseriesResponses,
                        ids: [...state.drawDownAnalysisTimeseriesResponses.ids, newDrawdownTimeseriesResponse.id],
                        entities: Object.assign({}, state.drawDownAnalysisTimeseriesResponses.entities, {[newDrawdownTimeseriesResponse.id]: newDrawdownTimeseriesResponse.payload}),
                        loaded: true,
                        loading: false,
                        error: null
                    }
                }
            } else {
                return state;
            }
        }

        case fromActions.DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_TIMESERIES_FAILED: {
            return {
                ...state,
                drawDownAnalysisTimeseriesResponses: {
                    ...state.drawDownAnalysisTimeseriesResponses,
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


export const getDrawdownAnalysisActiveRequestId = (state: State) => state.drawDownAnalysisActiveRequestId;

export const getDrawDownSecurityIds = (state: State) => state.drawDownSecurity.ids;
export const getDrawDownSecurityEntities = (state: State) => state.drawDownSecurity.entities;
export const getDrawDownSecurityLoading = (state: State) => state.drawDownSecurity.loading;
export const getDrawDownSecurityLoaded = (state: State) => state.drawDownSecurity.loaded;
export const getDrawDownSecurityError = (state: State) => state.drawDownSecurity.error;

export const getDrawDownAnalysisRequestsIds = (state: State) => state.drawDownAnalysisRequests.ids;
export const getDrawDownAnalysisRequestsEntities = (state: State) => state.drawDownAnalysisRequests.entities;

export const getDrawDownAnalysisTableResponsesIds = (state: State) => state.drawDownAnalysisTableResponses.ids;
export const getDrawDownAnalysisTableResponsesEntities = (state: State) => state.drawDownAnalysisTableResponses.entities;
export const getDrawDownAnalysisTableResponsesError = (state: State) => state.drawDownAnalysisTableResponses.error;
export const getDrawDownAnalysisTableResponsesLoading = (state: State) => state.drawDownAnalysisTableResponses.loading;
export const getDrawDownAnalysisTableResponsesLoaded = (state: State) => state.drawDownAnalysisTableResponses.loaded;


export const getDrawDownAnalysisTimeseriesResponsesIds = (state: State) => state.drawDownAnalysisTimeseriesResponses.ids;
export const getDrawDownAnalysisTimeseriesResponsesEntities = (state: State) => state.drawDownAnalysisTimeseriesResponses.entities;
export const getDrawDownAnalysisTimeseriesResponsesError = (state: State) => state.drawDownAnalysisTimeseriesResponses.error;
export const getDrawDownAnalysisTimeseriesResponsesLoading = (state: State) => state.drawDownAnalysisTimeseriesResponses.loading;
export const getDrawDownAnalysisTimeseriesResponsesLoaded = (state: State) => state.drawDownAnalysisTimeseriesResponses.loaded;



