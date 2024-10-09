import * as fromModels from './../../models/portfolio-analysis.models';
import * as fromActions from '../actions';

export interface State {
    portfolioAnalysisActiveRequestId: string;

    portfolioAnalysisSecurityList: {
        entities: fromModels.PortfolioAnalysisSecurity[];
        loading: boolean;
        loaded: boolean;
        error?: string;
    }

    portfolioAnalysisResponses: {
        ids: string[];
        entities: {[id: string]: fromModels.PortfolioAnalysisResponse};
        loading: boolean;
        loaded: boolean;
        error?: string;
    }
}

const initialState: State = {

    portfolioAnalysisActiveRequestId: '',

    portfolioAnalysisSecurityList: {
        entities: [],
        loading: false,
        loaded: false,
    },

    portfolioAnalysisResponses: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false,
    }
}

export function reducer(state = initialState, action: fromActions.PortfolioAnalysisActions): State {

    switch(action.type) {

        case fromActions.PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS_SECURITY_LIST: {
            return {
                ...state,
                portfolioAnalysisSecurityList: {
                    ...state.portfolioAnalysisSecurityList,
                    loading: true,
                    loaded: false,
                    error: null
                }
            }
        }

        case fromActions.PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS_SECURITY_LIST_COMPLETE: {
            return {
                ...state,
                portfolioAnalysisSecurityList: {
                    entities: action.payload,
                    loading: false,
                    loaded: true,
                    error: null
                }
            }
        }

        case fromActions.PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS_SECURITY_LIST_FAILED: {
            return {
                ...state,
                portfolioAnalysisSecurityList: {
                    ...state.portfolioAnalysisSecurityList,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            }
        }

        //--------------------------------------------------------------------------------------------


        case fromActions.PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS: {
            const newRequest = action.payload; 

            return {
                ...state,
                portfolioAnalysisActiveRequestId: newRequest.id,
                portfolioAnalysisResponses: {
                    ...state.portfolioAnalysisResponses,
                    loading: true,
                    loaded: false,
                    error: null
                }
            }
        }

        case fromActions.PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS_COMPLETE: {
            const newResponse = action.payload;

            // if(state.portfolioAnalysisResponses.ids.indexOf(newResponse.id) < 0) {
                return {
                    ...state,
                    portfolioAnalysisResponses: {
                        ids: [...state.portfolioAnalysisResponses.ids, newResponse.id],
                        entities: Object.assign({}, state.portfolioAnalysisResponses.entities, {[newResponse.id]: newResponse}),
                        loaded: true,
                        loading: false,
                        error: null
                    }
                }
            // } else {
            //     return state;
            // }
        }

        case fromActions.PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS_FAILED: {
            return {
                ...state,
                portfolioAnalysisResponses: {
                    ...state.portfolioAnalysisResponses,
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


export const getPortfolioAnalysisActiveRequestId = (state: State) => state.portfolioAnalysisActiveRequestId;

export const getPortfolioAnalysisSecurityListEntities = (state: State) => state.portfolioAnalysisSecurityList.entities;
export const getPortfolioAnalysisSecurityListLoading = (state: State) => state.portfolioAnalysisSecurityList.loading;
export const getPortfolioAnalysisSecurityListLoaded = (state: State) => state.portfolioAnalysisSecurityList.loaded;
export const getPortfolioAnalysisSecurityListError = (state: State) => state.portfolioAnalysisSecurityList.error;

export const getPortfolioAnalysisResponsesIds = (state: State) => state.portfolioAnalysisResponses.ids;
export const getPortfolioAnalysisResponsesEntities = (state: State) => state.portfolioAnalysisResponses.entities;
export const getPortfolioAnalysisResponsesError = (state: State) => state.portfolioAnalysisResponses.error;
export const getPortfolioAnalysisResponsesLoading = (state: State) => state.portfolioAnalysisResponses.loading;
export const getPortfolioAnalysisResponsesLoaded = (state: State) => state.portfolioAnalysisResponses.loaded;