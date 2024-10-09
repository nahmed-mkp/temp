import * as fromActions from '../actions/dials.actions';
import * as fromModels from '../../models/dials.models';

export interface State {

    selectedDialsSet?: number;

    dialSets: {
        ids: number[];
        entities: {[id: number]: fromModels.DialsSet};
        loading: boolean;
        loaded: boolean;
        error?: string;
    };
    dials: {
        ids: number[];
        entities: {[id: number]: fromModels.Dial[] };
        loading: boolean;
        loaded: boolean;
        error?: string;
    };
}

const initialState: State = {
    dialSets: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false
    },
    dials: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false
    }
};

export function reducer(state = initialState, action: fromActions.DialsActions): State {
    switch (action.type) {

        case fromActions.DialsActionTypes.LOAD_DIALS_SETS:
        case fromActions.DialsActionTypes.ADD_DIALS_SET:
        case fromActions.DialsActionTypes.UPDATE_DIALS_SET:
        case fromActions.DialsActionTypes.DELETE_DIALS_SET: {
            return {
                ...state,
                dialSets: {
                    ...state.dialSets,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.DialsActionTypes.LOAD_DIALS_SETS_COMPLETE: {
            const payload = action.payload;
            const newIds = action.payload.map((dialSet) => dialSet.yieldbookDialsSetId)
                .filter((id) => state.dialSets.ids.indexOf(id) < 0);

            const newEntities = action.payload.reduce((entities: {[id: string]: fromModels.DialsSet},
                item: fromModels.DialsSet) => {
                    return Object.assign({}, entities, {[item.yieldbookDialsSetId]: item});
                }, state.dialSets.entities);

            return {
                ...state,
                dialSets: {
                    ids: [...state.dialSets.ids, ...newIds],
                    entities: newEntities,
                    loading: false,
                    loaded: true
                }
            };
        }

        case fromActions.DialsActionTypes.LOAD_DIALS_SETS_FAILED:
        case fromActions.DialsActionTypes.ADD_DIALS_SET_FAILED:
        case fromActions.DialsActionTypes.UPDATE_DIALS_SET_FAILED: {
            return {
                ...state,
                dialSets: {
                    ...state.dialSets,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }

        case fromActions.DialsActionTypes.ADD_DIALS_SET_COMPLETE:
        case fromActions.DialsActionTypes.UPDATE_DIALS_SET_COMPLETE: {
            const payload = action.payload;
            const existingIds = state.dialSets.ids.filter((id) => id !== payload.yieldbookDialsSetId);
            return {
                ...state,
                dialSets: {
                    ids: [...existingIds, payload.yieldbookDialsSetId],
                    entities: {
                        ...state.dialSets.entities,
                        [payload.yieldbookDialsSetId]: payload
                    },
                    loading: false,
                    loaded: true
                }
            };
        }

        case fromActions.DialsActionTypes.SELECT_DIALS_SET: {
            return {
                ...state,
                selectedDialsSet: action.payload.yieldbookDialsSetId
            };
        }

        case fromActions.DialsActionTypes.LOAD_DIALS:
        case fromActions.DialsActionTypes.UPDATE_DIAL: {
            return {
                ...state,
                dials: {
                    ...state.dials,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.DialsActionTypes.LOAD_DIALS_COMPLETE:
        case fromActions.DialsActionTypes.UPDATE_DIAL_COMPLETE: {
            const payload = action.payload;
            if (payload && payload.length > 0) {
                const dialsSetId: number = payload[0].yieldbookDialsSetId;
                const existingIds = state.dials.ids.filter((id) => id !== dialsSetId);
                return {
                    ...state,
                    dials: {
                        ids: [...existingIds, dialsSetId],
                        entities: {
                            ...state.dials.entities,
                            [dialsSetId]: action.payload
                        },
                        loading: false,
                        loaded: true
                    }
                };

            } else {
                return state;
            }
        }

        case fromActions.DialsActionTypes.LOAD_DIALS_FAILED:
        case fromActions.DialsActionTypes.UPDATE_DIAL_FAILED: {
            return {
                ...state,
                dials: {
                    ...state.dials,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }

        default: {
            return state;
        }
    }
}


export const getDialSetIds = (state: State) => state.dialSets.ids;
export const getSelectedDialSetId = (state: State) => state.selectedDialsSet;
export const getDialSetEntities = (state: State) => state.dialSets.entities;
export const getDialSetsLoading = (state: State) => state.dialSets.loading;
export const getDialSetsLoaded = (state: State) => state.dialSets.loaded;
export const getDialSetsError = (state: State) => state.dialSets.error;

export const getDialIds = (state: State) => state.dials.ids;
export const getDialEntities = (state: State) => state.dials.entities;
export const getDialsLoading = (state: State) => state.dials.loading;
export const getDialsLoaded = (state: State) => state.dials.loaded;
export const getDialsError = (state: State) => state.dials.error;
