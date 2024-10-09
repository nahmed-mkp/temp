import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromModels from '../../models';
import * as fromServices from './../../services/agency-dials.service';
import * as fromActions from './../actions/agency-dials.actions';

@Injectable()
export class AgencyDialsEffects {

    @Effect()
    loadDefaultTemplate$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyDialsActionTypes.LOAD_DEFAULT_TEMPLATE),
            switchMap(() => {
                return this.agencyDialsService$
                    .loadDefaultTemplate()
                    .pipe(
                        map((res: fromModels.IDialDetail) => new fromActions.LoadDefaultTemplateComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDefaultTemplateFailed(err))
                        ));
            })
        );

    @Effect()
    loadDials$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyDialsActionTypes.LOAD_DIALS),
            switchMap(() => {
                return this.agencyDialsService$
                    .loadDials()
                    .pipe(
                        map((res: fromModels.IDial[]) => new fromActions.LoadDialsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDialsFailed(err))
                        ));
            })
    );

    @Effect()
    loadDial$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyDialsActionTypes.LOAD_DIAL),
            map((action: fromActions.LoadDial) => action.payload),
            switchMap((payload: string) => {
                return this.agencyDialsService$
                    .loadDial(payload)
                    .pipe(
                        map((res: fromModels.IDialDetail) => new fromActions.LoadDialComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDialFailed(err))
                        ));
            })
        );

    @Effect()
    addDial$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyDialsActionTypes.ADD_DIAL),
            map((action: fromActions.AddDial) => action.payload),
            switchMap((payload: fromModels.INewDialDetail) => {
                return this.agencyDialsService$
                    .addDial(payload)
                    .pipe(
                        map((res: fromModels.IDialDetail) => new fromActions.AddDialComplete(res)),
                        catchError((err: string) => of(new fromActions.AddDialFailed(err))
                        ));
            })
        );

    @Effect()
    updateDial$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyDialsActionTypes.UPDATE_DIAL),
            map((action: fromActions.UpdateDial) => action.payload),
            switchMap((payload: any) => {
                return this.agencyDialsService$
                    .updateDial(payload)
                    .pipe(
                        map((res: fromModels.IDialDetail) => new fromActions.UpdateDialComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateDialFailed(err))
                        ));
            })
        );

    @Effect()
    deleteDial$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyDialsActionTypes.DELETE_DIAL),
            map((action: fromActions.DeleteDial) => action.payload),
            switchMap((payload: any) => {
                return this.agencyDialsService$
                    .deleteDial(payload)
                    .pipe(
                        map((res: fromModels.IDialDetail) => new fromActions.DeleteDialComplete(res)),
                        catchError((err: string) => of(new fromActions.DeleteDialFailed(err))
                        ));
            })
        );

    constructor(private actions$: Actions,
        private agencyDialsService$: fromServices.AgencyDialsService) { }
}