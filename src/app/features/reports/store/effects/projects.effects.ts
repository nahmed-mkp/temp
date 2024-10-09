import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';


import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromModels from '../../models';
import * as fromStore from '..';

@Injectable()
export class ProjectsEffects {

    @Effect()
    loadProjects$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ProjectsActionTypes.LOAD_PROJECTS),
            switchMap(() => {
                return this.projectsService
                    .loadProjects()
                    .pipe(
                        map((res: fromModels.Project[]) => new fromActions.LoadProjectsComplete(res)),
                        catchError(err => of(new fromActions.LoadProjectsComplete(err)))
                    );
            })
        );

    @Effect({ dispatch: false })
    loadProjectsComplete$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ProjectsActionTypes.LOAD_PROJECTS_COMPLETE),
            map((action: fromActions.LoadProjectsComplete) => action.payload),
            switchMap((payload: fromModels.Project[]) => {
                payload.map((project) => this.store.dispatch(new fromActions.LoadWorkbooks(project)));
                return EMPTY;
            })
        );

    @Effect()
    addProjects$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ProjectsActionTypes.ADD_PROJECT),
            map((action: fromActions.AddProject) => action.payload),
            switchMap((payload: fromModels.Project) => {
                return this.projectsService
                    .addProject(payload)
                    .pipe(
                        map((res: fromModels.Project) => new fromActions.AddProjectComplete(res)),
                        catchError(err => of(new fromActions.AddProjectFailed(err)))
                    );
            })
        );


    @Effect()
    updateProjects$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ProjectsActionTypes.UPDATE_PROJECT),
            map((action: fromActions.UpdateProject) => action.payload),
            switchMap((payload: fromModels.Project) => {
                return this.projectsService
                    .updateProject(payload)
                    .pipe(
                        map((res: fromModels.Project) => new fromActions.UpdateProjectComplete(res)),
                        catchError(err => of(new fromActions.UpdateProjectFailed(err)))
                    );
            })
        );

    @Effect()
    deleteProject$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ProjectsActionTypes.DELETE_PROJECT),
            map((action: fromActions.DeleteProject) => action.payload),
            switchMap((payload: fromModels.Project) => {
                return this.projectsService
                    .deleteProject(payload)
                    .pipe(
                        map((res: fromModels.Project) => new fromActions.DeleteProjectComplete(res)),
                        catchError(err => of(new fromActions.DeleteProjectFailed(err)))
                    );
            })
        );

    @Effect()
    toggleFavorite$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ProjectsActionTypes.TOGGLE_FAVORITE_PROJECT),
            map((action: fromActions.ToggleFavoriteProject) => action.payload),
            switchMap((payload: fromModels.Project) => {
                return this.projectsService
                    .toggleFavorite(payload)
                    .pipe(
                        map((res: fromModels.Project) => new fromActions.ToggleFavoriteProjectComplete(res)),
                        catchError(err => of(new fromActions.ToggleFavoriteProjectFailed(err)))
                    );
            })
        );

    constructor(private actions$: Actions,
        private store: Store<fromStore.ExternalReportsState>,
        private projectsService: fromServices.ProjectsService) { }

}
