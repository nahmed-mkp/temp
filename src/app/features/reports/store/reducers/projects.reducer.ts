import * as fromActions from '../actions';
import * as fromModels from '../../models';

export type Actions = fromActions.ProjectsActions;

export interface ProjectsState {
    result: number[];
    entities: { [id: number]: fromModels.Project };
    loaded: boolean;
    loading: boolean;
    error?: string;
    updateStatus?: string;
}

const initialState: ProjectsState = {
    result: [],
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(state = initialState, action: Actions ): ProjectsState {
    switch (action.type) {

        case fromActions.ProjectsActionTypes.LOAD_PROJECTS: {
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null
            };
        }

        case fromActions.ProjectsActionTypes.LOAD_PROJECTS_COMPLETE: {
            const payload = action.payload;
            const newIds = payload.map((proj) => proj.id);

            // Here we are converting a list of projects in to a map of projects
            const newEntities = payload.reduce(
                (entities: { [id: number]: fromModels.Project }, project: fromModels.Project) => {
                    return Object.assign(entities, {[project.id]: project});
                }, {});

            return {
                ...state,
                result: [...newIds],
                entities: newEntities,
                loading: false,
                loaded: true
            };
        }

        case fromActions.ProjectsActionTypes.LOAD_PROJECTS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case fromActions.ProjectsActionTypes.ADD_PROJECT: {
            return {
                ...state,
                error: null,
                updateStatus: null
            };
        }

        case fromActions.ProjectsActionTypes.ADD_PROJECT_COMPLETE: {
            const project = action.payload;
            return {
                ...state,
                result: [...state.result, project.id],
                entities: Object.assign({}, state.entities, {[project.id]: project}),
                updateStatus: `Successfully added ${project.name}`
            };
        }

        case fromActions.ProjectsActionTypes.ADD_PROJECT_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }

        case fromActions.ProjectsActionTypes.UPDATE_PROJECT_COMPLETE:
        case fromActions.ProjectsActionTypes.TOGGLE_FAVORITE_PROJECT_COMPLETE: {
            const project = action.payload;
            return {
                ...state,
                entities: Object.assign({}, state.entities, {[project.id]: project}),
                updateStatus: `Successfully updated ${project.name}`
            };
        }

        case fromActions.ProjectsActionTypes.DELETE_PROJECT_COMPLETE: {
            const payload = action.payload;
            const results = state.result.filter((id) => id !== payload.id);
            const entities = Object.assign({}, state.entities);
            delete entities[payload.id];
            return {
                ...state,
                result: [...results],
                entities: entities,
                updateStatus: `Successfully deleted project ${payload.name}`
            };
        }

        case fromActions.ProjectsActionTypes.DELETE_PROJECT_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }


        case fromActions.ProjectsActionTypes.CLEAR_PROJECT_STATUS: {
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

export const getIds = (state: ProjectsState) => state.result;
export const getEntities = (state: ProjectsState) => state.entities;
export const getLoadingStatus = (state: ProjectsState) => state.loading;
export const getLoadedStatus = (state: ProjectsState) => state.loaded;
export const getError = (state: ProjectsState) => state.error;
export const getUpdateStatus = (state: ProjectsState) => state.updateStatus;
