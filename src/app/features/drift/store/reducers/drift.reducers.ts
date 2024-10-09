import * as fromActions from './../actions/drift.actions';
import * as fromModels from './../../models/drift.models';

export interface State {

    positionsDriftRequest: fromModels.PositionsDriftRequest;

    fundDriftEntities: any[];
    tradeNameDriftEntities: any[];
    positionDriftEntities: any[];
    positionDriftLoading: boolean;
    positionDriftLoaded: boolean;
    positionDriftError?: string;

    positionDriftRequest?: fromModels.PositionDriftRequest;

    executionDriftEntities: any[];
    executionDriftLoading: boolean;
    executionDriftLoaded: boolean;
    executionDriftError?: string;
}

const initialState: State = {

    positionsDriftRequest: null,

    fundDriftEntities: [],
    tradeNameDriftEntities: [],
    positionDriftEntities: [],
    positionDriftLoading: false,
    positionDriftLoaded: false,

    executionDriftEntities: [],
    executionDriftLoading: false,
    executionDriftLoaded: false
};

export function reducer(state = initialState, action: fromActions.DriftActions): State {

    switch (action.type) {

        case fromActions.DriftActionTypes.CLIENT_SIDE_PARAMETER_CHANGED: {
            return {
                ...state,
                positionsDriftRequest: action.payload,
                positionDriftRequest:
                    state.positionDriftRequest ? Object.assign({}, state.positionDriftRequest, {threshold: action.payload.threshold}) : state.positionDriftRequest
            };
        }

        case fromActions.DriftActionTypes.LOAD_POSITIONS_DRIFT: {
            return {
                ...state,

                positionsDriftRequest: action.payload,

                fundDriftEntities: [],
                tradeNameDriftEntities: [],
                positionDriftEntities: [],

                positionDriftLoading: true,
                positionDriftLoaded: false,
                positionDriftError: null,

                executionDriftEntities: [],
                executionDriftLoading: false,
                executionDriftLoaded: false,
                executionDriftError: null
            };
        }

        case fromActions.DriftActionTypes.LOAD_POSITIONS_DRIFT_COMPLETE: {
            return {
                ...state,
                fundDriftEntities: [...action.payload.fund],
                tradeNameDriftEntities: [...action.payload.tradename],
                positionDriftEntities: [...action.payload.position],
                positionDriftLoading: false,
                positionDriftLoaded: true,
                positionDriftError: null
            };
        }

        case fromActions.DriftActionTypes.LOAD_POSITIONS_DRIFT_FAILED: {
            return {
                ...state,
                positionDriftLoading: false,
                positionDriftLoaded: false,
                positionDriftError: action.payload
            };
        }

        case fromActions.DriftActionTypes.LOAD_POSITION_DRIFT: {
            return {
                ...state,
                positionDriftRequest: action.payload,
                executionDriftLoading: true,
                executionDriftLoaded: false,
                executionDriftError: null
            };
        }

        case fromActions.DriftActionTypes.LOAD_POSITION_DRIFT_COMPLETE: {
            return {
                ...state,
                executionDriftEntities: [...action.payload],
                executionDriftLoading: false,
                executionDriftLoaded: true
            };
        }

        case fromActions.DriftActionTypes.LOAD_POSITIONS_DRIFT_FAILED: {
            return {
                ...state,
                executionDriftLoading: false,
                executionDriftLoaded: false,
                executionDriftError: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

export const getPositionsDriftRequest = (state: State) => state.positionsDriftRequest;
export const getFundDriftEntities = (state: State) => state.fundDriftEntities;
export const getTradeNameDriftEntities = (state: State) => state.tradeNameDriftEntities;
export const getPortfolioDriftEntities = (state: State) => state.positionDriftEntities;
export const getPortfolioDriftLoading = (state: State) => state.positionDriftLoading;
export const getPortfolioDriftLoaded = (state: State) => state.positionDriftLoaded;
export const getPortfolioDriftError = (state: State) => state.positionDriftError;

export const getPositionDriftRequest = (state: State) => state.positionDriftRequest;
export const getExecutionDriftEntities = (state: State) => state.executionDriftEntities;
export const getExecutionDriftLoading = (state: State) => state.executionDriftLoading;
export const getExecutionDriftLoaded = (state: State) => state.executionDriftLoaded;
export const getExecutionDriftError = (state: State) => state.executionDriftError;
