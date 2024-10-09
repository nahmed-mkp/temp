import * as fromActions from '../actions';
import * as fromModels from '../../models';

export type Actions = fromActions.ReportsActions;

export interface ReportsState {
    result: number[];
    entities: { [id: number]: fromModels.Report };
    loaded: boolean;
    loading: boolean;
    error?: string;
    updateStatus?: string;
}

const initialState: ReportsState = {
    result: [],
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(state = initialState, action: Actions ): ReportsState {
    switch (action.type) {

        case fromActions.ReportsActionTypes.LOAD_REPORTS: {
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null
            };
        }

        case fromActions.ReportsActionTypes.LOAD_REPORTS_COMPLETE: {
            const payload = action.payload;
            const newIds = payload.map((report) => report.id);

            const newEntities = payload.reduce(
                (entities: { [id: number]: fromModels.Report }, report: fromModels.Report) => {
                    return Object.assign(entities, {[report.id]: report});
                }, {});

            return {
                ...state,
                result: [...newIds],
                entities: newEntities,
                loading: false,
                loaded: true
            };
        }

        case fromActions.ReportsActionTypes.LOAD_REPORTS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case fromActions.ReportsActionTypes.ADD_REPORT: {
            return {
                ...state,
                error: null,
                updateStatus: null
            };
        }

        case fromActions.ReportsActionTypes.ADD_REPORT_COMPLETE: {
            const payload = action.payload;
            return {
                ...state,
                result: [...state.result, payload.id],
                entities: Object.assign({}, state.entities, {[payload.id]: payload}),
                updateStatus: `Successfully added report ${payload.name}`
            };
        }

        case fromActions.ReportsActionTypes.ADD_REPORT_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }

        case fromActions.ReportsActionTypes.UPDATE_REPORT:
        case fromActions.ReportsActionTypes.TOGGLE_FAVORITE_REPORT:
        case fromActions.ReportsActionTypes.VIEW_REPORT: {
            const payload = action.payload;
            return {
                ...state,
                updateStatus: null,
                error: null
            };
        }

        case fromActions.ReportsActionTypes.UPDATE_REPORT_COMPLETE:
        case fromActions.ReportsActionTypes.TOGGLE_FAVORITE_REPORT_COMPLETE:
        case fromActions.ReportsActionTypes.VIEW_REPORT_COMPLETE: {
            const report = action.payload;
            return {
                ...state,
                entities: Object.assign({}, state.entities, {[report.id]: report}),
                updateStatus: `Successfully updated ${report.name}`
            };
        }

        case fromActions.ReportsActionTypes.UPDATE_REPORT_FAILED:
        case fromActions.ReportsActionTypes.TOGGLE_FAVORITE_REPORT_FAILED:
        case fromActions.ReportsActionTypes.VIEW_REPORT_FAILED: {
            const report = action.payload;
            return {
                ...state,
                entities: Object.assign({}, state.entities, {[report.id]: report}),
                error: `Failed to update updated ${report.name}`
            };
        }

        case fromActions.ReportsActionTypes.DELETE_REPORT_COMPLETE: {
            const payload = action.payload;
            const results = state.result.filter((id) => id !== payload.id);
            const entities = Object.assign({}, state.entities);
            delete entities[payload.id];
            return {
                ...state,
                result: [...results],
                entities: entities,
                updateStatus: `Successfully deleted report ${payload.name}`
            };
        }

        case fromActions.ReportsActionTypes.CLEAR_REPORT_STATUS: {
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

export const getIds = (state: ReportsState) => state.result;
export const getEntities = (state: ReportsState) => state.entities;
export const getLoadingStatus = (state: ReportsState) => state.loading;
export const getLoadedStatus = (state: ReportsState) => state.loaded;
export const getError = (state: ReportsState) => state.error;
export const getUpdateStatus = (state: ReportsState) => state.updateStatus;
