import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum ProjectsActionTypes {

    LOAD_PROJECTS = '[ExternalReports] Load projects',
    LOAD_PROJECTS_COMPLETE = '[ExternalReports] Load projects complete',
    LOAD_PROJECTS_FAILED = '[ExternalReports] Load projects failed',

    ADD_PROJECT = '[ExternalReports] Add project',
    ADD_PROJECT_COMPLETE = '[ExternalReports] Add project complete',
    ADD_PROJECT_FAILED = '[ExternalReports] Add project failed',

    UPDATE_PROJECT = '[ExternalReports] Update project',
    UPDATE_PROJECT_COMPLETE = '[ExternalReports] Update project complete',
    UPDATE_PROJECT_FAILED = '[ExternalReports] Update project failed',

    DELETE_PROJECT = '[ExternalReports] Delete project',
    DELETE_PROJECT_COMPLETE = '[ExternalReports] Delete project complete',
    DELETE_PROJECT_FAILED = '[ExternalReports] Delete project failed',

    TOGGLE_FAVORITE_PROJECT = '[ExternalReports] Toggle favorite project',
    TOGGLE_FAVORITE_PROJECT_COMPLETE = '[ExternalReports] Toggle favorite project complete',
    TOGGLE_FAVORITE_PROJECT_FAILED = '[ExternalReports] Toggle favorite project failed',

    CLEAR_PROJECT_STATUS = '[ExternalReports] Clear project status'

}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadProjects implements Action {
    readonly type = ProjectsActionTypes.LOAD_PROJECTS;
}

export class LoadProjectsComplete implements Action {
    readonly type = ProjectsActionTypes.LOAD_PROJECTS_COMPLETE;

    constructor(public payload: fromModels.Project[]) { }
}

export class LoadProjectsFailed implements Action {
    readonly type = ProjectsActionTypes.LOAD_PROJECTS_FAILED;

    constructor(public payload?: any) { }
}

export class AddProject implements Action {
    readonly type = ProjectsActionTypes.ADD_PROJECT;

    constructor(public payload: fromModels.Project) { }
}

export class AddProjectComplete implements Action {
    readonly type = ProjectsActionTypes.ADD_PROJECT_COMPLETE;

    constructor(public payload: fromModels.Project) { }
}

export class AddProjectFailed implements Action {
    readonly type = ProjectsActionTypes.ADD_PROJECT_FAILED;

    constructor(public payload: any) { }
}


export class UpdateProject implements Action {
    readonly type = ProjectsActionTypes.UPDATE_PROJECT;

    constructor(public payload: fromModels.Project) { }
}

export class UpdateProjectComplete implements Action {
    readonly type = ProjectsActionTypes.UPDATE_PROJECT_COMPLETE;

    constructor(public payload: fromModels.Project) { }
}

export class UpdateProjectFailed implements Action {
    readonly type = ProjectsActionTypes.UPDATE_PROJECT_FAILED;

    constructor(public payload: any) { }
}

export class DeleteProject implements Action {
    readonly type = ProjectsActionTypes.DELETE_PROJECT;

    constructor(public payload: fromModels.Project) { }
}

export class DeleteProjectComplete implements Action {
    readonly type = ProjectsActionTypes.DELETE_PROJECT_COMPLETE;

    constructor(public payload: fromModels.Project) { }
}

export class DeleteProjectFailed implements Action {
    readonly type = ProjectsActionTypes.DELETE_PROJECT_FAILED;

    constructor(public payload: any) { }
}

export class ClearProjectStatus implements Action {
    readonly type = ProjectsActionTypes.CLEAR_PROJECT_STATUS;
}

export class ToggleFavoriteProject implements Action {
    readonly type = ProjectsActionTypes.TOGGLE_FAVORITE_PROJECT;

    constructor(public payload: fromModels.Project) { }
}

export class ToggleFavoriteProjectComplete implements Action {
    readonly type = ProjectsActionTypes.TOGGLE_FAVORITE_PROJECT_COMPLETE;

    constructor(public payload: fromModels.Project) { }
}

export class ToggleFavoriteProjectFailed implements Action {
    readonly type = ProjectsActionTypes.TOGGLE_FAVORITE_PROJECT_FAILED;

    constructor(public payload: any) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ProjectsActions
    = LoadProjects
    | LoadProjectsComplete
    | LoadProjectsFailed

    | AddProject
    | AddProjectComplete
    | AddProjectFailed

    | UpdateProject
    | UpdateProjectComplete
    | UpdateProjectFailed

    | DeleteProject
    | DeleteProjectComplete
    | DeleteProjectFailed

    | ToggleFavoriteProject
    | ToggleFavoriteProjectComplete
    | ToggleFavoriteProjectFailed

    | ClearProjectStatus;

