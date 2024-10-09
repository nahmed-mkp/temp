import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromModels from '../../models';
import * as fromStore from '..';

@Injectable()
export class WorkbooksEffects {

    @Effect()
    loadWorkbooks$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.WorkbookActionTypes.LOAD_WORKBOOKS),
            map((action: fromActions.LoadWorkbooks) => action.payload),
            mergeMap((payload: fromModels.Project) => {
                return this.workbooksService
                    .loadWorkbooks(payload)
                    .pipe(
                        map((res: fromModels.Workbook[]) => new fromActions.LoadWorkbooksComplete(res)),
                        catchError(err => of(new fromActions.LoadWorkbooksComplete(err)))
                    );
            })
        );

    @Effect({ dispatch: false })
    loadWorkbooksComplete$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.WorkbookActionTypes.LOAD_WORKBOOKS_COMPLETE),
            map((action: fromActions.LoadWorkbooksComplete) => action.payload),
            switchMap((payload: fromModels.Workbook[]) => {
                payload.map((workbook) => this.store.dispatch(new fromActions.LoadReports(workbook)));
                return EMPTY;
            })
        );

    @Effect()
    addWorkbook$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.WorkbookActionTypes.ADD_WORKBOOK),
            map((action: fromActions.AddWorkbook) => action.payload),
            switchMap((payload: fromModels.Workbook) => {
                return this.workbooksService
                    .addWorkbook(payload)
                    .pipe(
                        map((res: fromModels.Workbook) => new fromActions.AddWorkbookComplete(res)),
                        catchError(err => of(new fromActions.AddWorkbookFailed(err)))
                    );
            })
        );

    @Effect()
    updateWorkbook$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.WorkbookActionTypes.UPDATE_WORKBOOK),
            map((action: fromActions.UpdateWorkbook) => action.payload),
            switchMap((payload: fromModels.Workbook) => {
                return this.workbooksService
                    .updateWorkbook(payload)
                    .pipe(
                        map((res: fromModels.Workbook) => new fromActions.UpdateWorkbookComplete(res)),
                        catchError(err => of(new fromActions.UpdateWorkbookFailed(err)))
                    );
            })
        );

    @Effect()
    deleteWorkbook$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.WorkbookActionTypes.DELETE_WORKBOOK),
            map((action: fromActions.DeleteWorkbook) => action.payload),
            switchMap((payload: fromModels.Workbook) => {
                return this.workbooksService
                    .deleteWorkbook(payload)
                    .pipe(
                        map((res: fromModels.Workbook) => new fromActions.DeleteWorkbookComplete(res)),
                        catchError(err => of(new fromActions.DeleteWorkbookFailed(err)))
                    );
            })
        );

    @Effect()
    toggleFavorite$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.WorkbookActionTypes.TOGGLE_FAVORITE_WORKBOOK),
            map((action: fromActions.ToggleFavoriteWorkbook) => action.payload),
            switchMap((payload: fromModels.Workbook) => {
                return this.workbooksService
                    .toggleFavorite(payload)
                    .pipe(
                        map((res: fromModels.Workbook) => new fromActions.ToggleFavoriteWorkbookComplete(res)),
                        catchError(err => of(new fromActions.ToggleFavoriteWorkbookFailed(err)))
                    );
            })
        );

    constructor(private actions$: Actions,
        private store: Store<fromStore.ExternalReportsState>,
        private workbooksService: fromServices.WorkbooksService) { }

}
