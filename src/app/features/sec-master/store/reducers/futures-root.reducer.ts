import * as fromActions from '../actions/futures-root.actions';
import * as fromModels from '../../models/futures-root.models';

export interface FuturesRootState {

    futuresRootIds: number[];
    futuresRootEntities: { [id: number]: fromModels.IFutureRoot };
    futuresRootLoading: boolean;
    futuresRootLoaded: boolean;
    futuresRootError?: string;
}

export const initialState: FuturesRootState = {
    futuresRootIds: [],
    futuresRootEntities: {},
    futuresRootLoading: false,
    futuresRootLoaded: false
};

export function reducer(state = initialState, action: fromActions.FuturesRootActions) {
    switch (action.type) {

        case fromActions.FuturesRootActionTypes.LOAD_FUTURES_ROOTS: {
            return {
                ...state,
                futuresRootLoading: true,
                futuresRootLoaded: false,
                futuresRootError: null
            };
        }

        case fromActions.FuturesRootActionTypes.LOAD_FUTURES_ROOTS_COMPLETE: {
            const payload = action.payload;
            const ids = payload.map((map) => map.futures_id);
            const newEntities = payload.reduce((entities: { [id: number]: fromModels.IFutureRoot },
                item: fromModels.IFutureRoot) => {
                return Object.assign({}, entities, { [item.futures_id]: item });
            }, {});

            return {
                ...state,
                futuresRootLoading: false,
                futuresRootLoaded: true,
                futuresRootIds: [...ids],
                futuresRootEntities: newEntities
            };
        }

        case fromActions.FuturesRootActionTypes.LOAD_FUTURES_ROOTS_FAILED: {
            return {
                ...state,
                futuresRootLoading: false,
                futuresRootLoaded: false,
                futuresRootError: action.payload
            };
        }

        case fromActions.FuturesRootActionTypes.LOAD_FUTURES_ROOT:
        case fromActions.FuturesRootActionTypes.ADD_FUTURES_ROOT:
        case fromActions.FuturesRootActionTypes.UPDATE_FUTURES_ROOT: {
            return {
                ...state,
                futuresRootLoading: true,
                futuresRootLoaded: false,
                futuresRootError: null
            };
        }

        case fromActions.FuturesRootActionTypes.LOAD_FUTURES_ROOT_COMPLETE:
        case fromActions.FuturesRootActionTypes.ADD_FUTURES_ROOT_COMPLETE:
        case fromActions.FuturesRootActionTypes.UPDATE_FUTURES_ROOT_COMPLETE: {
            const payload = action.payload;
            const ids = state.futuresRootIds.filter((id) => id !== payload.futures_id);
            const newEntities = Object.assign({}, state.futuresRootEntities, { [payload.futures_id]: payload });
            return {
                ...state,
                futuresRootLoading: false,
                futuresRootLoaded: true,
                futuresRootIds: [payload.futures_id, ...ids],
                futuresRootEntities: newEntities
            };
        }

        case fromActions.FuturesRootActionTypes.LOAD_FUTURES_ROOTS_FAILED:
        case fromActions.FuturesRootActionTypes.LOAD_FUTURES_ROOT_FAILED:
        case fromActions.FuturesRootActionTypes.ADD_FUTURES_ROOT_FAILED:
        case fromActions.FuturesRootActionTypes.UPDATE_FUTURES_ROOT_FAILED:
        case fromActions.FuturesRootActionTypes.DELETE_FUTURES_ROOT_FAILED: {
            return {
                ...state,
                futuresRootLoading: false,
                futuresRootLoaded: false,
                futuresRootError: action.payload
            };
        }

        case fromActions.FuturesRootActionTypes.DELETE_FUTURES_ROOT_COMPLETE: {
            const payload = action.payload;
            const ids = state.futuresRootIds.filter((id) => id !== payload.futures_id);
            const newEntities = ids.map((id) => state.futuresRootEntities[id]);
            return {
                ...state,
                futuresRootLoading: false,
                futuresRootLoaded: true,
                futuresRootIds: [...ids],
                futuresRootEntities: newEntities
            };
        }

        default:
            return state;
    }
}

// Futures Roots
export const getFuturesRootIds = (state: FuturesRootState) => state.futuresRootIds;
export const getFuturesRootEntities = (state: FuturesRootState) => state.futuresRootEntities;
export const getFuturesRootLoading = (state: FuturesRootState) => state.futuresRootLoading;
export const getFuturesRootLoaded = (state: FuturesRootState) => state.futuresRootLoaded;
export const getFuturesRootError = (state: FuturesRootState) => state.futuresRootError;


