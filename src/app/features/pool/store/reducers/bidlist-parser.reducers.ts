import * as fromActions from '../actions/bidlist-parser.actions';
import * as fromModels from '../../models/bidlist-parser.models';

export interface State {

    expressions: fromModels.IBidlistParserExpression[];
    expressionsLoading: boolean;
    expressionsLoaded: boolean;
    expressionsError?: string;

    selectedPortfolioId?: string | number;

    portfolioIds: any[];
    portfolioEntities: {[id: string]: fromModels.IBidlistParserResult[]};
    requestLoading: boolean;
    requestLoaded: boolean;
    requestError?: string;
}

const initialState: State = {

    expressions: [],
    expressionsLoading: false,
    expressionsLoaded: false,

    portfolioIds: [],
    portfolioEntities: {},
    requestLoading: false,
    requestLoaded: false

};

export function reducer(state = initialState, action: fromActions.BidlistParserActions): State {
    switch (action.type) {

        case fromActions.BidlistParserActionTypes.LOAD_EXPRESSIONS: {
            return {
                ...state,
                expressionsLoading: true,
                expressionsLoaded: false,
                expressionsError: null
            };
        }

        case fromActions.BidlistParserActionTypes.LOAD_EXPRESSIONS_COMPLETE: {
            return {
                ...state,
                expressionsLoading: false,
                expressionsLoaded: true,
                expressions: action.payload
            };
        }

        case fromActions.BidlistParserActionTypes.LOAD_EXPRESSIONS_FAILED: {
            return {
                ...state,
                expressionsLoading: false,
                expressionsLoaded: false,
                expressionsError: action.payload
            };
        }

        case fromActions.BidlistParserActionTypes.PARSE_USER_INPUT: {
            const payload = action.payload;
            return {
                ...state,
                selectedPortfolioId: payload.portfolioId || payload.portfolioGuid,
                requestLoading: true,
                requestLoaded: false,
                requestError: null
            };
        }

        case fromActions.BidlistParserActionTypes.PARSE_USER_INPUT_COMPLETE: {
            const payload = action.payload;
            if (payload.length > 0) {
                const newId = payload[0].PortfolioId || payload[0].PortfolioGuid;
                const existingIds = state.portfolioIds.filter((id) => id !== newId);
                const newEntities = Object.assign({}, state.portfolioEntities, {[newId]: payload});
                return {
                    ...state,
                    portfolioIds: [newId, ...existingIds],
                    portfolioEntities: newEntities,
                    requestLoading: false,
                    requestLoaded: true
                };
            } else {
                return {
                    ...state
                };
            }
        }

        case fromActions.BidlistParserActionTypes.PARSE_USER_INPUT_FAILED: {
            return {
                ...state,
                requestLoading: false,
                requestLoaded: false,
                requestError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getExpressions = (state: State) => state.expressions;
export const getExpressionsLoaded = (state: State) => state.expressionsLoaded;
export const getExpressionsLoading = (state: State) => state.expressionsLoading;
export const getExpressionsError = (state: State) => state.expressionsError;

export const getPortfolioIds = (state: State) => state.portfolioIds;
export const getPortfolioEntities = (state: State) => state.portfolioEntities;
export const getPortfolioRequestLoading = (state: State) => state.requestLoading;
export const getPortfolioRequestLoaded = (state: State) => state.requestLoaded;
export const getPortfolioRequestError = (state: State) => state.requestError;
export const getPortfolioRequestSelectedPortfolioId = (state: State) => state.selectedPortfolioId;
