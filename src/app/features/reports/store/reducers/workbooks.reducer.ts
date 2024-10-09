import * as fromActions from '../actions';
import * as fromModels from '../../models';

export type Actions = fromActions.WorkbooksActions;

export interface WorkbooksState {
    result: number[];
    entities: { [id: number]: fromModels.Workbook };
    loaded: boolean;
    loading: boolean;
    error?: string;
    updateStatus?: string;
}

const initialState: WorkbooksState = {
    result: [],
    entities: {},
    loaded: false,
    loading: false,
    error: null
};

export function reducer(state = initialState, action: Actions ): WorkbooksState {
    switch (action.type) {

        case fromActions.WorkbookActionTypes.LOAD_WORKBOOKS: {
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null
            };
        }

        case fromActions.WorkbookActionTypes.LOAD_WORKBOOKS_COMPLETE: {
            const payload = action.payload;
            const newIds = payload.map((workbook) => workbook.id);
            // Here we are converting a list of projects in to a map of projects
            const newEntities = payload.reduce(
                (entities: { [id: number]: fromModels.Workbook }, workbook: fromModels.Workbook) => {
                    return Object.assign(entities, {[workbook.id]: workbook});
                }, {});

            return {
                ...state,
                result: [...newIds],
                entities: newEntities,
                loading: false,
                loaded: true
            };
        }

        case fromActions.WorkbookActionTypes.LOAD_WORKBOOKS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case fromActions.WorkbookActionTypes.ADD_WORKBOOK: {
            return {
                ...state,
                error: null,
                updateStatus: null
            };
        }

        case fromActions.WorkbookActionTypes.ADD_WORKBOOK_COMPLETE: {
            const payload = action.payload;
            return {
                ...state,
                result: [...state.result, payload.id],
                entities: Object.assign({}, state.entities, {[payload.id]: payload}),
                updateStatus: `Successfully added ${payload.name}`
            };
        }

        case fromActions.WorkbookActionTypes.ADD_WORKBOOK_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }

        case fromActions.WorkbookActionTypes.UPDATE_WORKBOOK_COMPLETE:
        case fromActions.WorkbookActionTypes.TOGGLE_FAVORITE_WORKBOOK_COMPLETE: {
            const project = action.payload;
            return {
                ...state,
                entities: Object.assign({}, state.entities, {[project.id]: project}),
                updateStatus: `Successfully updated ${project.name}`
            };
        }

        case fromActions.WorkbookActionTypes.DELETE_WORKBOOK_COMPLETE: {
            const payload = action.payload;
            const results = state.result.filter((id) => id !== payload.id);
            const entities = Object.assign({}, state.entities);
            delete entities[payload.id];
            return {
                ...state,
                result: [...results],
                entities: entities,
                updateStatus: `Successfully deleted workbook ${payload.name}`
            };
        }

        case fromActions.WorkbookActionTypes.DELETE_WORKBOOK_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }


        case fromActions.WorkbookActionTypes.CLEAR_WORKBOOK_STATUS: {
            return {
                ...state,
                error: null,
                updateStatus: null
            };
        }


        default: {
            return state;
        }
    }
}

export const getIds = (state: WorkbooksState) => state.result;
export const getEntities = (state: WorkbooksState) => state.entities;
export const getLoadingStatus = (state: WorkbooksState) => state.loading;
export const getLoadedStatus = (state: WorkbooksState) => state.loaded;
export const getError = (state: WorkbooksState) => state.error;
export const getUpdateStatus = (state: WorkbooksState) => state.updateStatus;
